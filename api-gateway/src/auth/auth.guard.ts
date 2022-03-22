
import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ValidateResponse } from './auth.pb';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject(AuthService)
    public readonly service: AuthService;

    public async canActivate(context: ExecutionContext): Promise<boolean> | never {
        const request = context.switchToHttp().getRequest();
        const authorization: string = request.headers['authorization'];

        if(!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');

        if(!bearer || bearer.length < 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];
        
        const { status, userId }: ValidateResponse = await this.service.validate(token);

        request.body.user_id = userId;
        
        if(status !== HttpStatus.OK) {
            throw new UnauthorizedException();
        }

        return true;
    }
}