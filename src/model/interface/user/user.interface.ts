import { brick } from "./brick.interface";

export interface User {
    id: string;
    username: string;
    location: string;
    brickcount: number;
    collection: brick[];
}