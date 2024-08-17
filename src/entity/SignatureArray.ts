import { EntitySignature } from "./EntitySignature";

export class SignatureArray {
    private datas: EntitySignature[];
    private uuidToIndex: Record<string, number>;
    private indexToUuid: Record<number, string>;

    public constructor() {
        this.datas = [];
        this.uuidToIndex = {};
        this.indexToUuid = {};
    }

    public has(uuid: string): boolean {
        return this.uuidToIndex[uuid] != undefined;
    }

    public add(data: EntitySignature): string {
        const uuid: string = crypto.randomUUID();
        const lastIndex: number = this.datas.length;
        
        this.uuidToIndex[uuid] = lastIndex;
        this.indexToUuid[lastIndex] = uuid;
        this.datas.push(data);

        return uuid;
    }

    public get(uuid: string): EntitySignature {
        if (this.uuidToIndex[uuid] == undefined) throw new Error(`Cannot find ${uuid}`);
        const index: number = this.uuidToIndex[uuid];
        return this.datas[index];
    }

    public set(uuid: string, signature: EntitySignature): void {
        if (this.uuidToIndex[uuid] == undefined) throw new Error(`Cannot find ${uuid}`);
        const index: number = this.uuidToIndex[uuid];
        this.datas[index] = signature;
    }

    public remove(uuid: string): void {
        if (!this.uuidToIndex[uuid] == undefined) throw new Error(`Cannot find ${uuid}`);

        const indexOfRemovedUuid: number = this.uuidToIndex[uuid];
        const indexOfLastUuid: number = this.datas.length - 1;
        const lastUuid: string = this.indexToUuid[indexOfLastUuid];

        this.datas[indexOfRemovedUuid] = this.datas[indexOfLastUuid];
        this.indexToUuid[indexOfRemovedUuid] = lastUuid;
        this.uuidToIndex[lastUuid] = indexOfRemovedUuid;

        delete this.indexToUuid[indexOfLastUuid];
        delete this.uuidToIndex[uuid];

        this.datas.pop();
    }
}