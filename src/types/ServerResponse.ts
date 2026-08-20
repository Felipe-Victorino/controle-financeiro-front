export interface AuthForgotResponse {
    message: string,
    token: string
}

export interface AuthLoginResponse {
    expiresIn: string,
}

export interface AuthRegisterResponse {
    id: number,
    name: string,
    email: string,
    createdAt: string,
}

export interface AuthResetResponse {
    message: string
}