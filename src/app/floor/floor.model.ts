import { IApartment } from '../apartment/apartment.model';
import { IBuilding } from '../building/building.model';
import { IBaseModel } from '../core/base.model';

export interface IFloor extends IBaseModel {
    nrApartments?: number;
    apartments?: IApartment[];
    building?: IBuilding;
    buildingId?: number;
    buildingNumber?: string;
}
export class Floor implements IFloor {
    constructor(
        public number?: string,
        public description?: string | null,
        public buildingId?: number,
        public nrApartments?: number
    ) {}
}
