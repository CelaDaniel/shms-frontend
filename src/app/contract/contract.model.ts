import { IApartment } from '../apartment/apartment.model';
import { IBaseModel } from '../core/base.model';
import { IParkingSpot } from '../parking-spot/parking-spot.model';
import { IStudent } from '../student/student.model';

export interface IContract extends IBaseModel {
    initialValidDate?: string;
    endValidDate?: string;
    fee?: number;
    signDate?: string;
    apartment?: IApartment;
    student?: IStudent;
    parkingSpot?: IParkingSpot;
    apartmentNumber?: string;
    studentEmail?: string;
    parkingSpotNumber?: string;
    apartmentId?: number;
    parkingSpotId?: number;
    studentId?: number;
    file?: File;
    apartmentFee?: number;
    parkingSpotFee?: number;
    discount?: number;
}

export class Contract implements IContract {
    constructor(
        public number?: string,
        public initialValidDate?: string,
        public endValidDate?: string,
        public fee?: number,
        public signDate?: string,
        public apartmentId?: number,
        public parkingSpotId?: number,
        public studentId?: number,
        public description?: string,
        public file?: File
    ) {}
}
