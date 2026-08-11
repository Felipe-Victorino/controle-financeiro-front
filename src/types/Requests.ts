export interface RegisterValues {
    name: string,
    email: string,
    passwd: string
    passwdConfirm: string
}

export interface LoginValues {
    email: string,
    passwd: string,
}

export interface ForgotValues {
    email: string
}

export interface ResetValues {
    token: string,
    newPasswd: string
}