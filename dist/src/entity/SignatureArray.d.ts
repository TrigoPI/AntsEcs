import { EntitySignature } from "./EntitySignature";
export declare class SignatureArray {
    private datas;
    private uuidToIndex;
    private indexToUuid;
    constructor();
    has(uuid: string): boolean;
    add(data: EntitySignature): string;
    get(uuid: string): EntitySignature;
    set(uuid: string, signature: EntitySignature): void;
    remove(uuid: string): void;
}
