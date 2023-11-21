import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';

export interface IFloor extends IBaseModel {
    nrApartments?: number;
    nrElevators?: number;
    apartments?: any[];
    building?: IBuilding;
    buildingId?: number;
}
export class Floor implements IFloor {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number
    ) {}
}
