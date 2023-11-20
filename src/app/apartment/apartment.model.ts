import * as dayjs from 'dayjs';
import { IBuilding } from '../building/building.model';
import { ApartmentTypes } from '../enums/apartment-types.model';
import { IFloor } from '../floor/floor.model';

export interface IApartment {
    id?: number;
    number?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
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
    expiredContracts?: any[];
    futureContracts?: any[];
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
