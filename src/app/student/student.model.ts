import { IBaseModel } from '../core/base.model';
import { Gender } from '../enums/gender-types.model';

export interface IStudent extends IBaseModel {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    birthDate?: string;
    gender?: Gender;
    activeContract?: any;
    nrContracts?: number;
}

export class Student implements IStudent {
    constructor(
        public number?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public birthDate?: string,
        public gender?: Gender,
        public description?: string
    ) {}
}
