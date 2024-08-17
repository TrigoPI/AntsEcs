"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitySignature = exports.BIT = void 0;
var BIT;
(function (BIT) {
    BIT[BIT["DOWN"] = 0] = "DOWN";
    BIT[BIT["UP"] = 1] = "UP";
})(BIT || (exports.BIT = BIT = {}));
class EntitySignature {
    constructor(size) {
        this.buffer = new Uint32Array(size);
        this.bufferSize = size;
        this.maxSize = EntitySignature.INT32_SIZE * size;
    }
    copy() {
        const copy = new EntitySignature(this.bufferSize);
        copy.set([...this.buffer]);
        return copy;
    }
    getSize() {
        return this.bufferSize;
    }
    get(bit) {
        if (bit >= this.maxSize)
            throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);
        const bufferIndex = Math.floor(bit / 32);
        const position = bit % 32;
        return (this.buffer[bufferIndex] & (1 << position)) !== 0;
    }
    equal(other) {
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] !== other.buffer[i]) {
                return false;
            }
        }
        return true;
    }
    and(other) {
        if (other.bufferSize != this.bufferSize)
            throw new Error('Signature size is different');
        for (let i; i < this.buffer.length; i++) {
            this.buffer[i] &= other.buffer[i];
        }
        return this;
    }
    or(other) {
        if (other.bufferSize != this.bufferSize)
            throw new Error('Signature size is different');
        for (let i; i < this.buffer.length; i++) {
            this.buffer[i] |= other.buffer[i];
        }
        return this;
    }
    xor(other) {
        if (other.bufferSize != this.bufferSize)
            throw new Error('Signature size is different');
        for (let i; i < this.buffer.length; i++) {
            this.buffer[i] ^= other.buffer[i];
        }
        return this;
    }
    set(buffer) {
        this.buffer.set(buffer);
        return this;
    }
    up(bit) {
        if (bit >= this.maxSize)
            throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);
        const bufferIndex = Math.floor(bit / EntitySignature.INT32_SIZE);
        const position = bit % EntitySignature.INT32_SIZE;
        this.buffer[bufferIndex] |= (1 << position);
        return this;
    }
    down(bit) {
        if (bit >= this.maxSize)
            throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);
        const index = Math.floor(bit / 32);
        const position = bit % 32;
        this.buffer[index] &= ~(1 << position);
        return this;
    }
    clear() {
        this.buffer = new Uint32Array(this.bufferSize);
        return this;
    }
}
exports.EntitySignature = EntitySignature;
EntitySignature.INT32_SIZE = 32;
