


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
    confirmPasswd: string
}