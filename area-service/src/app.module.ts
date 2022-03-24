import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './modules/area.module';
import { ConfigModule } from '@nestjs/config';
// import { dataSource} from './config/database.config'
import { DatabaseConfig } from './config/orm.config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseConfig),
    AreaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}