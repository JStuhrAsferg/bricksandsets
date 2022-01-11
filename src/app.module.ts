import { ColourService } from './service/colour.service';
import { SetService } from './service/set.service';
import { UserService } from './service/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    ColourService,
    SetService,
    UserService, AppService],
})
export class AppModule { }
