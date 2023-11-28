export interface IResetPassword {
    newPassword: string;
}

export interface IActivateUser {
    password: string;
}

export interface IForgotPassword {
    email: string;
}

export interface ILogin {
    email: string;
    password: string;
}
