export interface ServerErrorResponse {
    status: number,
    description: string,
    dateTime: string
}

export interface NetworkErrorResponse {
    status?: number,
    message: string,
    dateTime: string,
    isNetworkIssue: boolean
}