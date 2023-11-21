import * as dayjs from 'dayjs';
import { UserStatus } from '../enums/user-status.model';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    description?: string | null;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
    email?: string;
    roles?: string[];
    deleted?: boolean;
    userStatus?: UserStatus;
}

export interface IChangePassword {
    old_password?: string;
    new_password?: string;
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
