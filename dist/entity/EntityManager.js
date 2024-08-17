"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityManager = void 0;
const SignatureArray_1 = require("./SignatureArray");
const EntitySignature_1 = require("./EntitySignature");
class EntityManager {
    constructor(signatureSize) {
        this.signatureSize = signatureSize;
        this.entitiesSignature = new SignatureArray_1.SignatureArray();
    }
    getSignatureSize() {
        return this.signatureSize;
    }
    entityExist(entity) {
        return this.entitiesSignature.has(entity);
    }
    createEntity() {
        const signature = new EntitySignature_1.EntitySignature(this.signatureSize);
        const entity = this.entitiesSignature.add(signature);
        return entity;
    }
    getSignature(entity) {
        const signature = this.entitiesSignature.get(entity);
        return signature.copy();
    }
    setSignature(entity, newSignature) {
        this.entitiesSignature.set(entity, newSignature);
    }
    destroyEntity(entity) {
        this.entitiesSignature.remove(entity);
    }
}
exports.EntityManager = EntityManager;
