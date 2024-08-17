import { Entity } from "../types/EntityTypes";
import { SignatureArray } from "./SignatureArray";
import { EntitySignature } from "./EntitySignature";

export class EntityManager {
    private entitiesSignature: SignatureArray;
    private signatureSize: number;

    public constructor(signatureSize: number) {
        this.signatureSize = signatureSize;
        this.entitiesSignature = new SignatureArray();
    }

    public getSignatureSize(): number {
        return this.signatureSize;
    }

    public entityExist(entity: Entity): boolean {
        return this.entitiesSignature.has(entity);
    }

    public createEntity(): Entity {
        const signature: EntitySignature = new EntitySignature(this.signatureSize);
        const entity: Entity = this.entitiesSignature.add(signature);
        return entity;
    }

    public getSignature(entity: Entity): EntitySignature {
        const signature: EntitySignature = this.entitiesSignature.get(entity);
        return signature.copy();
    }

    public setSignature(entity: Entity, newSignature: EntitySignature): void {
        this.entitiesSignature.set(entity, newSignature);
    }

    public destroyEntity(entity: Entity): void {
        this.entitiesSignature.remove(entity);
    }
} 