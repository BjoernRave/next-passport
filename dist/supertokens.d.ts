import { PublicData } from './types';
export interface SessionModel extends Record<any, any> {
    handle: string;
    userId?: PublicData['userId'];
    expiresAt?: Date;
    hashedSessionToken?: string;
    antiCSRFToken?: string;
    publicData?: string;
    privateData?: string;
}
export declare type SessionConfig = {
    sessionExpiryMinutes?: number;
    method?: 'essential' | 'advanced';
    sameSite?: 'none' | 'lax' | 'strict';
    domain?: string;
    getSession: (handle: string) => Promise<SessionModel | null>;
    getSessions: (userId: PublicData['userId']) => Promise<SessionModel[]>;
    createSession: (session: SessionModel) => Promise<SessionModel>;
    updateSession: (handle: string, session: Partial<SessionModel>) => Promise<SessionModel>;
    deleteSession: (handle: string) => Promise<SessionModel>;
    isAuthorized: (userRoles: string[], input?: any) => boolean;
};
export interface SessionContextBase {
    userId: unknown;
    roles: string[];
    handle: string | null;
    publicData: unknown;
    authorize(input?: any): asserts this is AuthenticatedSessionContext;
    isAuthorized(input?: any): boolean;
    create: (publicData: PublicData, privateData?: Record<any, any>) => Promise<void>;
    revoke: () => Promise<void>;
    revokeAll: () => Promise<void>;
    getPrivateData: () => Promise<Record<any, any>>;
    setPrivateData: (data: Record<any, any>) => Promise<void>;
    setPublicData: (data: Partial<Omit<PublicData, 'userId'>>) => Promise<void>;
}
export interface SessionContext extends SessionContextBase {
    userId: PublicData['userId'] | null;
    publicData: Partial<PublicData>;
}
export interface AuthenticatedSessionContext extends SessionContextBase {
    userId: PublicData['userId'];
    publicData: PublicData;
}
export declare const getAntiCSRFToken: () => any;
export interface PublicDataWithLoading extends PublicData {
    isLoading: boolean;
}
export declare const useSession: () => PublicDataWithLoading;
