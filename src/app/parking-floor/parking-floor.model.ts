import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';

export interface IParkingFloor extends IBaseModel {
    building?: IBuilding;
    buildingId?: number;
    parkingSpots?: any[];
}
export class ParkingFloor implements IParkingFloor {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number
    ) {}
}
