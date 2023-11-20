import * as dayjs from 'dayjs';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    email?: string;
    roles?: string[];
}
export class User implements IUser {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public description?: string | null,
        public email?: string,
        public roles?: string[]
    ) {}
}
