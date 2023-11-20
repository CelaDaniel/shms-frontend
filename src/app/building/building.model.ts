import * as dayjs from 'dayjs';
import { IFloor } from '../floor/floor.model';

export interface IBuilding {
    id?: number;
    number?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    latitude?: number | null;
    longitude?: number | null;
    color?: string;
    nrFloors?: number;
    nrElevators?: number;
    nrParkingFloors?: number;
    nrApartmentsPerFloor?: number;
    nrParkingSpotsPerParkingFloor?: number;
    floors?: IFloor[];
    elevators?: any[];
    parkingFloors?: any[];
}
export class Building implements IBuilding {
    constructor(
        public number?: string,
        public description?: string | null,
        public latitude?: number | null,
        public longitude?: number | null,
        public color?: string,
        public nrFloors?: number,
        public nrElevators?: number,
        public nrParkingFloors?: number,
        public nrApartmentsPerFloor?: number,
        public nrParkingSpotsPerParkingFloor?: number
    ) {}
}
