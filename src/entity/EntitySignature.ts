export enum BIT {
    DOWN = 0,
    UP   = 1,
}

export class EntitySignature {
    public static readonly INT32_SIZE: number = 32;

    private buffer: Uint32Array;
    private maxSize: number;
    private bufferSize: number;

    public constructor(size: number) {
        this.buffer = new Uint32Array(size);
        this.bufferSize = size;
        this.maxSize = EntitySignature.INT32_SIZE * size;
    }

    public copy(): EntitySignature {
        const copy: EntitySignature = new EntitySignature(this.bufferSize);
        copy.set([...this.buffer]);
        return copy;
    }

    public getSize(): number {
        return this.bufferSize;
    }

    public get(bit: number): boolean {
        if (bit >= this.maxSize) throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);

        const bufferIndex = Math.floor(bit / 32);
        const position = bit % 32;
        return (this.buffer[bufferIndex] & (1 << position)) !== 0;
    }

    public equal(other: EntitySignature): boolean {
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] !== other.buffer[i]) {
                return false;
            }
        }
        
        return true;
    }

    public and(other: EntitySignature): EntitySignature {
        if (other.bufferSize != this.bufferSize) throw new Error('Signature size is different');
        
        for (let i: number; i < this.buffer.length; i++) {
            this.buffer[i] &= other.buffer[i];
        }
        
        return this;
    }

    public or(other: EntitySignature): EntitySignature {
        if (other.bufferSize != this.bufferSize) throw new Error('Signature size is different');
        
        for (let i: number; i < this.buffer.length; i++) {
            this.buffer[i] |= other.buffer[i];
        }
        
        return this;
    }

    public xor(other: EntitySignature): EntitySignature {
        if (other.bufferSize != this.bufferSize) throw new Error('Signature size is different');
        
        for (let i: number; i < this.buffer.length; i++) {
            this.buffer[i] ^= other.buffer[i];
        }
        
        return this;
    }

    public set(buffer: number[]): EntitySignature {
        this.buffer.set(buffer);
        return this;
    }

    public up(bit: number): EntitySignature {
        if (bit >= this.maxSize) throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);
        
        const bufferIndex: number = Math.floor(bit / EntitySignature.INT32_SIZE);
        const position: number = bit % EntitySignature.INT32_SIZE; 
        
        this.buffer[bufferIndex] |= (1 << position);

        return this;
    }

    public down(bit: number): EntitySignature {
        if (bit >= this.maxSize) throw new Error(`Signature max index : ${this.maxSize - 1} given : $${bit}`);

        const index = Math.floor(bit / 32);
        const position = bit % 32;

        this.buffer[index] &= ~(1 << position);

        return this;
    }

    public clear(): EntitySignature {
        this.buffer = new Uint32Array(this.bufferSize);
        return this;
    }
}