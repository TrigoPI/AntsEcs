"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntsEcs = void 0;
const component_1 = require("../component");
const entity_1 = require("../entity");
class AntsEcs {
    constructor(signatureSize = 1) {
        this.entityManager = new entity_1.EntityManager(signatureSize);
        this.componentManager = new component_1.ComponentManager(signatureSize * entity_1.EntitySignature.INT32_SIZE);
    }
    createEntity() {
        return this.entityManager.createEntity();
    }
    getComponent(entity, ctor) {
        return this.componentManager.getComponent(entity, ctor);
    }
    addComponent(entity, ctor, ...args) {
        const componentId = this.componentManager.getComponentId(ctor);
        const oldSignature = this.entityManager.getSignature(entity);
        const component = this.componentManager.addComponent(entity, ctor, ...args);
        const newSignature = oldSignature.up(componentId);
        this.entityManager.setSignature(entity, newSignature);
        return component;
    }
    removeComponent(entity, ctor) {
        const componentId = this.componentManager.getComponentId(ctor);
        const oldSignature = this.entityManager.getSignature(entity);
        const newSignature = oldSignature.down(componentId);
        this.entityManager.setSignature(entity, newSignature);
        this.componentManager.removeComponent(entity, ctor);
    }
    registerComponent(ctor) {
        this.componentManager.registerComponent(ctor);
    }
    destroyEntity(entity) {
        this.entityManager.destroyEntity(entity);
        this.componentManager.destroyEntity(entity);
    }
}
exports.AntsEcs = AntsEcs;
