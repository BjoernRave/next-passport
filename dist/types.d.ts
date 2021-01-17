/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { AuthenticateOptions, Strategy } from 'passport';
import { NextApiRequest, NextApiResponse } from 'next';
export interface DefaultPublicData {
    userId: any;
    roles: string[];
}
export interface PublicData extends DefaultPublicData {
}
export declare type ConnectMiddleware = (req: IncomingMessage, res: ServerResponse, next: (error?: Error) => void) => void;
export declare type BlitzPassportStrategy = {
    authenticateOptions?: AuthenticateOptions;
    strategy: Strategy;
};
export declare type BlitzPassportConfig = {
    successRedirectUrl?: string;
    errorRedirectUrl?: string;
    strategies: BlitzPassportStrategy[];
    secureProxy?: boolean;
};
export declare type VerifyCallbackResult = {
    publicData: PublicData;
    privateData?: Record<string, any>;
    redirectUrl?: string;
};
export interface MiddlewareRequest extends NextApiRequest {
    protocol?: string;
}
export interface MiddlewareResponse extends NextApiResponse {
    /**
     * This will be passed as the second argument to Blitz queries/mutations.
     *
     * You must set blitzCtx BEFORE calling next()
     */
    blitzCtx: Record<string, unknown>;
    /**
     * This is the exact result returned from the Blitz query/mutation
     *
     * You must first `await next()` before reading this
     */
    blitzResult: unknown;
}
export declare type MiddlewareNext = (error?: Error) => Promise<void> | void;
export declare type Middleware = (req: MiddlewareRequest, res: MiddlewareResponse, next: MiddlewareNext) => Promise<void> | void;
export declare type Resolver<TInput, TResult> = (input: TInput, ctx?: any) => Promise<TResult>;
export declare type ResolverType = 'query' | 'mutation';
export interface ResolverEnhancement {
    _meta: {
        name: string;
        type: ResolverType;
        filePath: string;
        apiUrl: string;
    };
}
export interface EnhancedResolver<TInput, TResult> extends Resolver<TInput, TResult>, ResolverEnhancement {
    middleware?: Middleware[];
}
