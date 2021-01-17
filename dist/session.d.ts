/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionConfig, SessionContext } from './supertokens';
import { PublicData } from './types';
declare type JwtPayload = AnonymousSessionPayload | null;
declare type AnonSessionKernel = {
    handle: string;
    publicData: PublicData;
    jwtPayload: JwtPayload;
    antiCSRFToken: string;
    anonymousSessionToken: string;
};
declare type AuthedSessionKernel = {
    handle: string;
    publicData: PublicData;
    jwtPayload: JwtPayload;
    antiCSRFToken: string;
    sessionToken: string;
};
declare type SessionKernel = AnonSessionKernel | AuthedSessionKernel;
export declare function getSessionContext(prisma: any, req: NextApiRequest | IncomingMessage, res: NextApiResponse | ServerResponse): Promise<SessionContext>;
export declare class SessionContextClass implements SessionContext {
    private config;
    private _req;
    private _res;
    private _kernel;
    constructor(config: SessionConfig, req: IncomingMessage, res: ServerResponse, kernel: SessionKernel);
    get handle(): string;
    get userId(): any;
    get roles(): string[];
    get publicData(): PublicData;
    authorize(input?: any): void;
    isAuthorized(input?: any): boolean;
    create(publicData: PublicData, privateData?: Record<any, any>): Promise<void>;
    revoke(): Promise<void>;
    revokeAll(): Promise<void>;
    setPublicData(data: Record<any, any>): Promise<void>;
    getPrivateData(): Promise<Record<any, any>>;
    setPrivateData(data: Record<any, any>): Promise<void>;
}
export declare const generateEssentialSessionHandle: () => string;
export declare const generateAnonymousSessionHandle: () => string;
export declare const createSessionToken: (handle: string, publicData: PublicData | string) => string;
export declare const parseSessionToken: (token: string) => {
    handle: string;
    id: string;
    hashedPublicData: string;
    version: string;
};
export declare const createPublicDataToken: (publicData: string | PublicData) => string;
export declare const createAntiCSRFToken: () => string;
export declare type AnonymousSessionPayload = {
    isAnonymous: true;
    handle: string;
    publicData: PublicData;
    antiCSRFToken: string;
};
export declare const getSessionSecretKey: () => string;
export declare const createAnonymousSessionToken: (payload: AnonymousSessionPayload) => string;
export declare const parseAnonymousSessionToken: (token: string) => AnonymousSessionPayload;
export declare const setCookie: (res: ServerResponse, cookie: string) => void;
export declare const setHeader: (res: ServerResponse, name: string, value: string) => void;
export declare const removeHeader: (res: ServerResponse, name: string) => void;
export declare const setSessionCookie: (config: SessionConfig, req: IncomingMessage, res: ServerResponse, sessionToken: string, expiresAt: Date) => void;
export declare const setAnonymousSessionCookie: (config: SessionConfig, req: IncomingMessage, res: ServerResponse, token: string, expiresAt: Date) => void;
export declare const setCSRFCookie: (config: SessionConfig, req: IncomingMessage, res: ServerResponse, antiCSRFToken: string, expiresAt: Date) => void;
export declare const setPublicDataCookie: (config: SessionConfig, req: IncomingMessage, res: ServerResponse, publicDataToken: string, expiresAt: Date) => void;
export declare function getSession(config: SessionConfig, req: NextApiRequest, res: ServerResponse): Promise<SessionKernel | null>;
export declare function createNewSession(config: SessionConfig, req: IncomingMessage, res: ServerResponse, publicData: PublicData, privateData?: Record<any, any>, opts?: {
    anonymous?: boolean;
    jwtPayload?: JwtPayload;
}): Promise<SessionKernel>;
export declare function createAnonymousSession(config: SessionConfig, req: IncomingMessage, res: ServerResponse): Promise<SessionKernel>;
export declare function refreshSession(config: SessionConfig, req: IncomingMessage, res: ServerResponse, sessionKernel: SessionKernel, { publicDataChanged }: {
    publicDataChanged: boolean;
}): Promise<void>;
export declare function getAllSessionHandlesForUser(config: SessionConfig, userId: string): Promise<string[]>;
export declare function updateAllPublicDataRolesForUser(config: SessionConfig, userId: string | number, roles: string[]): Promise<void>;
export declare function revokeSession(config: SessionConfig, req: IncomingMessage, res: ServerResponse, handle: string, anonymous?: boolean): Promise<void>;
export declare function revokeMultipleSessions(config: SessionConfig, req: IncomingMessage, res: ServerResponse, sessionHandles: string[]): Promise<string[]>;
export declare function revokeAllSessionsForUser(config: SessionConfig, req: IncomingMessage, res: ServerResponse, userId: string | number): Promise<string[]>;
export declare function getPublicData(config: SessionConfig, sessionKernel: SessionKernel): Promise<PublicData>;
export declare function getPrivateData(config: SessionConfig, handle: string): Promise<Record<any, any> | null>;
export declare function setPrivateData(config: SessionConfig, sessionKernel: SessionKernel, data: Record<any, any>): Promise<void>;
export declare function setPublicData(config: SessionConfig, req: IncomingMessage, res: ServerResponse, sessionKernel: SessionKernel, data: Record<any, any>): Promise<PublicData>;
/**
 * Append additional header `field` with value `val`.
 *
 * Example:
 *
 *    append(res, 'Set-Cookie', 'foo=bar; Path=/; HttpOnly');
 *
 * @param {ServerResponse} res
 * @param {string} field
 * @param {string| string[]} val
 */
export declare function append(res: ServerResponse, field: string, val: string | string[]): ServerResponse;
export {};
