import { Body, Controller, Inject, OnModuleInit, Post, UnauthorizedException, BadRequestException, HttpCode, ConflictException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthServiceClient, RegisterResponse, RegisterRequest, AUTH_SERVICE_NAME, LoginRequest, LoginResponse } from './auth.pb';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController implements OnModuleInit {
    private service: AuthServiceClient;

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.service = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    @Post('register')
    @HttpCode(200)
    private async register(@Body() body: RegisterRequest): Promise<RegisterResponse> {
        
        let response = firstValueFrom(this.service.register(body));

        let data = await response;

        if(data.status === 400){
            throw new BadRequestException(data);
        }
        else if(data.status === 409){
            throw new ConflictException(data);
        }

        return response;
    }

    @Post('login')
    @HttpCode(200)
    private async login(@Body() body: LoginRequest): Promise<LoginResponse> {
        let response = firstValueFrom(this.service.login(body));

        let data = await response;

        if(data.status === 401){
            throw new UnauthorizedException(data);
        }
        else if(data.status === 400){
            throw new BadRequestException(data);
        }

        return response;
    }
}