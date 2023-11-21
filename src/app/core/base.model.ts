import * as dayjs from 'dayjs';

export interface IBaseModel {
    id?: number;
    number?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    createdBy?: string;
    updatedBy?: string;
    deleted?: boolean;
}
