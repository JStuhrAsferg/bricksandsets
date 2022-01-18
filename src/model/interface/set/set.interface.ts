import { SetPart } from "./setPart.interface";

export interface LegoSet{
    id:string;
    name: string;
    setNumber: string;
    pieces: Array<SetPart>;
}