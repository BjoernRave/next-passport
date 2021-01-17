/// <reference types="node" />
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
export declare const isServer: boolean;
export declare const isClient: boolean;
export declare function isLocalhost(req: NextApiRequest | IncomingMessage): boolean;
export declare function clientDebug(...args: any): void;
