export interface IAuthError {
    status: number;
    message: string;
}

export interface IAuthError2 {
    status: number;
    message: { [key: string]: string };
}

