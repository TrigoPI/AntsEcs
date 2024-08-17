"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureArray = void 0;
class SignatureArray {
    constructor() {
        this.datas = [];
        this.uuidToIndex = {};
        this.indexToUuid = {};
    }
    has(uuid) {
        return this.uuidToIndex[uuid] != undefined;
    }
    add(data) {
        const uuid = crypto.randomUUID();
        const lastIndex = this.datas.length;
        this.uuidToIndex[uuid] = lastIndex;
        this.indexToUuid[lastIndex] = uuid;
        this.datas.push(data);
        return uuid;
    }
    get(uuid) {
        if (this.uuidToIndex[uuid] == undefined)
            throw new Error(`Cannot find ${uuid}`);
        const index = this.uuidToIndex[uuid];
        return this.datas[index];
    }
    set(uuid, signature) {
        if (this.uuidToIndex[uuid] == undefined)
            throw new Error(`Cannot find ${uuid}`);
        const index = this.uuidToIndex[uuid];
        this.datas[index] = signature;
    }
    remove(uuid) {
        if (!this.uuidToIndex[uuid] == undefined)
            throw new Error(`Cannot find ${uuid}`);
        const indexOfRemovedUuid = this.uuidToIndex[uuid];
        const indexOfLastUuid = this.datas.length - 1;
        const lastUuid = this.indexToUuid[indexOfLastUuid];
        this.datas[indexOfRemovedUuid] = this.datas[indexOfLastUuid];
        this.indexToUuid[indexOfRemovedUuid] = lastUuid;
        this.uuidToIndex[lastUuid] = indexOfRemovedUuid;
        delete this.indexToUuid[indexOfLastUuid];
        delete this.uuidToIndex[uuid];
        this.datas.pop();
    }
}
exports.SignatureArray = SignatureArray;
