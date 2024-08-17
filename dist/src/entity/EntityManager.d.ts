import { Entity } from "../types/EntityTypes";
import { EntitySignature } from "./EntitySignature";
export declare class EntityManager {
    private entitiesSignature;
    private signatureSize;
    constructor(signatureSize: number);
    getSignatureSize(): number;
    entityExist(entity: Entity): boolean;
    createEntity(): Entity;
    getSignature(entity: Entity): EntitySignature;
    setSignature(entity: Entity, newSignature: EntitySignature): void;
    destroyEntity(entity: Entity): void;
}
