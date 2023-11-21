import { ApartmentTypes } from '../enums/apartment-types.model';
import { IFloor } from '../floor/floor.model';
import { IBaseModel } from '../core/base.model';

export interface IApartment extends IBaseModel {
    area?: number | null;
    apartmentType?: ApartmentTypes | null;
    balconyNr?: number;
    windowNr?: number;
    toiletsNr?: number;
    capacity?: number;
    hasKitchen?: boolean;
    floorNumber?: string;
    nrContracts?: number;
    floor?: IFloor;
    floorId?: number;
    activeContracts?: any[];
}
export class Apartment implements IApartment {
    constructor(
        public number?: string,
        public description?: string | null,
        public area?: number | null,
        public apartmentType?: ApartmentTypes | null,
        public balconyNr?: number,
        public windowNr?: number,
        public toiletsNr?: number,
        public capacity?: number,
        public hasKitchen?: boolean,
        public floorId?: number
    ) {}
}
