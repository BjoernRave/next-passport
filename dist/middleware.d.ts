/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { ConnectMiddleware, EnhancedResolver, Middleware } from './types';
export interface DefaultCtx {
}
export interface Ctx extends DefaultCtx {
}
export declare function getAllMiddlewareForModule<TInput, TResult>(resolverModule: EnhancedResolver<TInput, TResult>): Middleware[];
export declare function handleRequestWithMiddleware(req: NextApiRequest | IncomingMessage, res: NextApiResponse | ServerResponse, middleware: Middleware | Middleware[], { throwOnError, stackPrintOnError, }?: {
    throwOnError?: boolean;
    stackPrintOnError?: boolean;
}): Promise<void>;
export declare function compose(middleware: Middleware[]): Middleware;
/**
 * Returns a Blitz middleware function that varies its async logic based on if the
 * given middleware function declares at least 3 parameters, i.e. includes
 * the `next` callback function
 */
export declare function connectMiddleware(middleware: ConnectMiddleware): Middleware;
