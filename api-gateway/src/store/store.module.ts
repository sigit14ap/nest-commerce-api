import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StoreController } from './store.controller';
import { STORE_SERVICE_NAME, STORE_PACKAGE_NAME } from './store.interface';
import { StoreService } from './store.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: STORE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: STORE_PACKAGE_NAME,
          protoPath: join(__dirname, '../proto/store.proto'),
          loader: { keepCase: true },
        }
      }
    ])
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}