import { IBaseModel } from '../core/base.model';
import { IParkingFloor } from '../parking-floor/parking-floor.model';

export interface IParkingSpot extends IBaseModel {
    parkingFloor?: IParkingFloor;
    parkingFloorId?: number;
    activeContract?: any;
    parkingFloorNumber?: string;
    nrContracts?: number;
}
export class ParkingSpot implements IParkingSpot {
    constructor(
        public number?: string,
        public description?: string | null,
        public parkingFloorId?: number
    ) {}
}
