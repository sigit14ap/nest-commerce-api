import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './modules/store.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DatabaseConfig),
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
