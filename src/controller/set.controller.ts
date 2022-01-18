/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { SetService } from 'src/service/set.service';

@Controller('sets')
export class SetController { 
    constructor(private setService:SetService) {}
 
    
    @Get('/all')
    getAllSets(){
        return this.setService.findAll()
    }

    @Get('/simple/:setName')
    getSetBySetname(@Param() params){
        return this.setService.findOneSimpleBySetName(params.setName);
    }

    @Get('/detailed/:setName')
    getDetailedSetBySetname(@Param() params) {
        return this.setService.findDetailedOneBySetname(params.setName);
    }
}

