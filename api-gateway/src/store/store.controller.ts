import { Body, Controller, Inject, OnModuleInit, Post, BadRequestException, HttpCode, ConflictException, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { StoreServiceCilent, STORE_SERVICE_NAME } from './store.interface';
import { firstValueFrom} from 'rxjs';
import { RegisterRequest } from './store.interface';
import { DefaultResponse } from '../app.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('store')
export class StoreController implements OnModuleInit {

    private service: StoreServiceCilent;

    @Inject(STORE_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.service = this.client.getService<StoreServiceCilent>(STORE_SERVICE_NAME);
    }
    
    @Post('register')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    private async register(@Body() body: RegisterRequest): Promise<DefaultResponse> {
        
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
}
