export declare enum BIT {
    DOWN = 0,
    UP = 1
}
export declare class EntitySignature {
    static readonly INT32_SIZE: number;
    private buffer;
    private maxSize;
    private bufferSize;
    constructor(size: number);
    copy(): EntitySignature;
    getSize(): number;
    get(bit: number): boolean;
    equal(other: EntitySignature): boolean;
    and(other: EntitySignature): EntitySignature;
    or(other: EntitySignature): EntitySignature;
    xor(other: EntitySignature): EntitySignature;
    set(buffer: number[]): EntitySignature;
    up(bit: number): EntitySignature;
    down(bit: number): EntitySignature;
    clear(): EntitySignature;
}
