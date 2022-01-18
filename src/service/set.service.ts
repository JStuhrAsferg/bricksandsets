/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { LegoSet } from 'src/model/interface/set/set.interface';

@Injectable()
export class SetService {

    constructor(private httpService: HttpService) {}

    async findAll() : Promise<Array<LegoSet>>{
        const response = await lastValueFrom(this.httpService.get('https://d38ft3dyqnj9vm.cloudfront.net/api/sets').pipe(
            map((axiosResponse : AxiosResponse) => {
                return axiosResponse.data.Sets
            })
        ));
        return response;
    }

    async findOneSimpleBySetName(setName: string) : Promise<LegoSet>{
        const response = await lastValueFrom (this.httpService.get("https://d38ft3dyqnj9vm.cloudfront.net/api/set/by-name/" + setName).pipe(
            map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
        })));
        return response;
    }

    async findDetailedOneBySetname(setName: string) : Promise<LegoSet> {
        var set = this.findOneSimpleBySetName(setName);
        let setId:string = (await set).id;
        const response = await lastValueFrom(this.httpService.get("https://d38ft3dyqnj9vm.cloudfront.net/api/set/by-id/" + setId).pipe(
            map((axiosResponse: AxiosResponse) => {
                return axiosResponse.data
            })
        ));
        set = response
        return set;  
    }
}
