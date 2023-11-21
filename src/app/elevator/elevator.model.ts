import { IApartment } from '../apartment/apartment.model';
import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';

export interface IElevator extends IBaseModel {
    capacity?: number;
    maxWeight?: number;
    building?: IBuilding;
    buildingId?: number;
    buildingNumber?: string;
}
export class Elevator implements IElevator {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number,
        public capacity?: number,
        public maxWeight?: number
    ) {}
}
