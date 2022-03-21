import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "./jwt.service";
import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from "../auth.dto";
import { Auth } from "../auth.entity";
import { LoginResponse, RegisterResponse, ValidateResponse } from "../auth.pb";

@Injectable()
export class AuthService {
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register({ email, password }: RegisterRequestDto): Promise<RegisterResponse> {
        let auth: Auth = await this.repository.findOne({ where: { email } });
        
        if (auth) {
            return { status: HttpStatus.CONFLICT, message: 'Email already exists', data: {}, error: [] };
        }

        auth = new Auth();
        auth.email = email;
        auth.password = this.jwtService.encodePassword(password);

        let result = await this.repository.save(auth);
        delete result.password;

        return { 
            status: HttpStatus.OK, 
            message: 'Success Register', 
            data: result,
            error: []
        };
    }

    public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
        const auth: Auth = await this.repository.findOne({ where: { email } });
        
        if(!auth) {
            return { status: HttpStatus.UNAUTHORIZED, message: 'Email not found', data: {}, error: [] };
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);

        if(!isPasswordValid) {
            return { status: HttpStatus.UNAUTHORIZED, message: 'Wrong password', data: {}, error: [] };
        }

        const token: string = this.jwtService.generateToken(auth);

        return { 
            status: HttpStatus.OK, 
            message: 'Success Login', 
            data: { access_token: token },
            error: []
        };
    }

    public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
        const decoded: Auth = await this.jwtService.verify(token);

        if (!decoded) {
        return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
        }

        const auth: Auth = await this.jwtService.validateUser(decoded);

        if (!auth) {
        return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
        }

        return { status: HttpStatus.OK, error: null, userId: decoded.id };
    }
}