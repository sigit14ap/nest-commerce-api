import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from '../controllers/area.controller';
import { Province } from '../entities/province.entity';
import { City } from '../entities/city.entity';
import { AreaService } from '../services/area.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Province, City]),
    ],
    controllers: [AreaController],
    providers: [AreaService],
})
export class AreaModule {}
