import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthenticateOptions, Strategy } from 'passport';

export interface DefaultPublicData {
  userId: any;
  roles: string[];
}

export interface PublicData extends DefaultPublicData {}

export type ConnectMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: Error) => void
) => void;

export type PassportStrategy = {
  authenticateOptions?: AuthenticateOptions;
  strategy: Strategy;
};

export type PassportConfig = {
  successRedirectUrl?: string;
  errorRedirectUrl?: string;
  strategies: PassportStrategy[];
  secureProxy?: boolean;
};

export type VerifyCallbackResult = {
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
export type MiddlewareNext = (error?: Error) => Promise<void> | void;

export type Middleware = (
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext
) => Promise<void> | void;

export type Resolver<TInput, TResult> = (
  input: TInput,
  ctx?: any
) => Promise<TResult>;

export type ResolverType = 'query' | 'mutation';

export interface ResolverEnhancement {
  _meta: {
    name: string;
    type: ResolverType;
    filePath: string;
    apiUrl: string;
  };
}

export interface EnhancedResolver<TInput, TResult>
  extends Resolver<TInput, TResult>,
    ResolverEnhancement {
  middleware?: Middleware[];
}
