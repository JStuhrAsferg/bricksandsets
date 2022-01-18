/*
https://docs.nestjs.com/modules
*/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SetService } from 'src/service/set.service';
import { UserService } from 'src/service/user.service';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [UserService,SetService],
})
export class UserModule {}
