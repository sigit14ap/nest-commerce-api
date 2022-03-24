import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [AuthModule, StoreModule, AreaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
