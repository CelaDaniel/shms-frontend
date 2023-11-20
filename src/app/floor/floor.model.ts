import * as dayjs from 'dayjs';
import { IBuilding } from '../building/building.model';

export interface IFloor {
    id?: number;
    number?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    nrApartments?: number;
    nrElevators?: number;
    apartments?: any[];
    building?: IBuilding;
}
export class Floor implements IFloor {
    constructor(
        public number?: string,
        public description?: string | null,
        public nrApartments?: number
    ) {}
}
