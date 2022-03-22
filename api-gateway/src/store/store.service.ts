import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { StoreServiceCilent, STORE_SERVICE_NAME } from './store.interface';

@Injectable()
export class StoreService {
    private service: StoreServiceCilent;

    @Inject(STORE_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.service = this.client.getService<StoreServiceCilent>(STORE_SERVICE_NAME);
    }
}
