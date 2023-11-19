import * as dayjs from 'dayjs';

export interface IBuilding {
    id?: number;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    number?: string;
    latitude?: number | null;
    longitude?: number | null;
    color?: string;
    nrFloors?: number;
    nrElevators?: number;
    nrParkingFloors?: number;
}
export class Building implements IBuilding {
    constructor(
        public id?: number,
        public description?: string | null,
        public createdAt?: dayjs.Dayjs,
        public updatedAt?: dayjs.Dayjs,
        public number?: string,
        public latitude?: number | null,
        public longitude?: number | null,
        public color?: string,
        public nrFloors?: number,
        public nrElevators?: number,
        public nrParkingFloors?: number
    ) {}
}
