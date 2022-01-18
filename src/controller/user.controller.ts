import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/service/user.service';


@Controller('user')
export class UserController {
  constructor(private userService:UserService) {}

  @Get('/all')
  getAllUsers(){
    return this.userService.findAll()
  }

  @Get('/simple/:username')
  getUserByUsername(@Param() params){
    return this.userService.findOneByUsername(params.username);
  }

  @Get('/detailed/:username')
  getDetailedUserByUsername(@Param() params) {
    return this.userService.findDetailedOneByUsername(params.username);
  }

  @Get('/available-sets/by-username/:username')
  getAvailableSetsByUsername(@Param() params){
    return this.userService.getAvailableSetsByUsername(params.username);
  }
}
