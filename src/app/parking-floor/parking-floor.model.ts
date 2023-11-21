import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';
import { IParkingSpot } from '../parking-spot/parking-spot.model';

export interface IParkingFloor extends IBaseModel {
    building?: IBuilding;
    buildingId?: number;
    parkingSpots?: IParkingSpot[];
    buildingNumber?: string;
    nrParkingSpots?: number;
}
export class ParkingFloor implements IParkingFloor {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number,
        public nrParkingSpots?: number
    ) {}
}
