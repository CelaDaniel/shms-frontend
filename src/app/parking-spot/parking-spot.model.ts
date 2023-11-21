import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';

export interface IParkingSpot extends IBaseModel {
    building?: IBuilding;
    buildingId?: number;
    parkingSpots?: any[];
}
export class ParkingSpot implements IParkingSpot {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number
    ) {}
}
