import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AppService } from '../service/app.service';

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [AppService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  
});
