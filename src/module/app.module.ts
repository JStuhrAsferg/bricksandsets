import { SetController } from './../controller/set.controller';
import { UserModule } from './user.module';
import { SetService } from '../service/set.service';
import { UserService } from '../service/user.service';
import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule, HttpModule],
  controllers: [
    SetController, UserController],
  providers: [
    SetService,
    UserService],
})
export class AppModule { }
