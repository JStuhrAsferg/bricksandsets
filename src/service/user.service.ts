/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { LegoSet } from 'src/model/interface/set/set.interface';
import { SetPart } from 'src/model/interface/set/setPart.interface';
import { Brick } from 'src/model/interface/user/brick.interface';
import { User } from 'src/model/interface/user/user.interface';
import { variant } from 'src/model/interface/user/variant.interface';
import { SetService } from './set.service';

@Injectable()
export class UserService {
    constructor(private httpService: HttpService, private setService: SetService) {}

    async findAll(): Promise<Array<User>> {
        const response = await lastValueFrom(this.httpService.get('https://d38ft3dyqnj9vm.cloudfront.net/api/users').pipe(
            map((axiosResponse : AxiosResponse) => {
                return axiosResponse.data
            })
        ));
        return response;
    }

    async findOneByUsername(username: string): Promise<User>{
        const response = await lastValueFrom (this.httpService.get("https://d38ft3dyqnj9vm.cloudfront.net/api/user/by-username/" + username).pipe(
            map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
        })));
        return response;
    }

    async findDetailedOneByUsername(username: string): Promise<User> {
        var user = this.findOneByUsername(username);
        let userId:string = (await user).id;
        const response = await lastValueFrom(this.httpService.get("https://d38ft3dyqnj9vm.cloudfront.net/api/user/by-id/" + userId).pipe(
            map((axiosResponse: AxiosResponse) => {
                return axiosResponse.data
            })
        ));
        user = response
        return user;
    }

    async getAvailableSetsByUsername(username: string) : Promise<Array<string>> {
        var userCollection : Brick[]= (await this.findDetailedOneByUsername(username)).collection;
        var userCollectionMap : Map<string, Brick> = new Map(userCollection.map(i => [i.pieceId, i] as [string, Brick]));
        var allSets : LegoSet[] = await this.setService.findAll();
        let possibleSets:Array<string> = new Array<string>();
        for (var i = 0; i < allSets.length; i++){
            let detailedLegoSet = await this.setService.findDetailedOneBySetname(allSets[i].name);
            if(this.doesUserHaveBricksForLegoSet(detailedLegoSet,userCollectionMap)){
                possibleSets.push(detailedLegoSet.name);
            }
        }
        return possibleSets;
    }

    doesUserHaveBricksForLegoSet(legoSet: LegoSet, userCollection : Map<string,Brick>): boolean{
        var result : boolean = true;
        for(var i = 0; i < legoSet.pieces.length; i++){
            var userBrick : Brick = userCollection.get(legoSet.pieces[i].part.designID);
            var userBrickVariantsMap: Map<string,variant> = new Map(userBrick.variants.map(i => [i.color, i] as [string, variant]));
            if(this.doesUserHaveBricksForPieceInLegoSet(legoSet.pieces[i],userBrickVariantsMap)){
                result = true;
            } else {
                return false;
            }
        }
        return true;
    }

    doesUserHaveBricksForPieceInLegoSet(setPiece: SetPart, userBrickVariantsMap : Map<string,variant>):boolean{
        try{
            var variant = userBrickVariantsMap.get(setPiece.part.material.toString());
            if(variant.count >= setPiece.quantity){
                return true;
            } else {
                return false;
            }
        } catch (e){
            var result = e.message as string // error under useUnknownInCatchVariables 
            if(!result.includes("Cannot read properties of undefined")){
                //this is to make sure if unexpected errors is still thrown
                throw new e;
            }
            return false;
        }
    }

}
