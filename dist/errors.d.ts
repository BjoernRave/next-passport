export declare class AuthenticationError extends Error {
    name: string;
    statusCode: number;
    constructor(message?: string);
    get _clearStack(): boolean;
}
export declare class CSRFTokenMismatchError extends Error {
    name: string;
    statusCode: number;
    get _clearStack(): boolean;
}
export declare class AuthorizationError extends Error {
    name: string;
    statusCode: number;
    constructor(message?: string);
    get _clearStack(): boolean;
}
export declare class NotFoundError extends Error {
    name: string;
    statusCode: number;
    constructor(message?: string);
    get _clearStack(): boolean;
}
