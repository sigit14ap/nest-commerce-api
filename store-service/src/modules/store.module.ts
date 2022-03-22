import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from 'src/controllers/store.controller';
import { Store } from 'src/entities/store.entity';
import { StoreService } from 'src/services/store.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Store]),
    ],
    controllers: [StoreController],
    providers: [StoreService],
})
export class StoreModule {}
