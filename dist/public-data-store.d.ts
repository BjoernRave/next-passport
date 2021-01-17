import { PublicData } from "./types";
declare class PublicDataStore {
    private eventKey;
    readonly emptyPublicData: PublicData;
    readonly observable: {
        next: (n: PublicData) => void;
        subscribe: (fn: import("bad-behavior").ISubscriber<PublicData>) => {
            unsubscribe(): void;
        };
    };
    constructor();
    updateState(value?: PublicData, opts?: {
        suppressEvent: boolean;
    }): void;
    clear(): void;
    getData(): PublicData;
    private getToken;
}
export declare const publicDataStore: PublicDataStore;
export {};
