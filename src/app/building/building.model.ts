import { IBaseModel } from '../core/base.model';
import { IFloor } from '../floor/floor.model';
import { IParkingFloor } from '../parking-floor/parking-floor.model';

export interface IBuilding extends IBaseModel {
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
    parkingFloors?: IParkingFloor[];
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
