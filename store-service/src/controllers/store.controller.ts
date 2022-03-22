import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StoreService } from 'src/services/store.service';
import { STORE_SERVICE_NAME } from 'src/interfaces/store.interface';
import { RegisterRequestDto } from 'src/dto/store.dto';
import { DefaultResponse } from 'src/app.interface';

@Controller()
export class StoreController {
    @Inject(StoreService)
    private readonly service: StoreService;

    @GrpcMethod(STORE_SERVICE_NAME, 'Register')
    private register(payload: RegisterRequestDto): Promise<DefaultResponse> {
        return this.service.register(payload);
    }
}
