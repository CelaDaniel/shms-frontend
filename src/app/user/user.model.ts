import { UserStatus } from '../enums/user-status.model';
import { IBaseModel } from '../core/base.model';

export interface IUser extends IBaseModel {
    firstName?: string;
    lastName?: string;
    email?: string;
    roles?: string[];
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
