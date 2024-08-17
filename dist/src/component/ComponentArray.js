"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentArray = void 0;
class ComponentArray {
    constructor(ctor) {
        this.pool = [];
        this.entityToIndex = {};
        this.indexToEntity = {};
        this.ctor = ctor;
    }
    has(entity) {
        return this.entityToIndex[entity] != undefined;
    }
    add(entity, ...args) {
        if (this.entityToIndex[entity] != undefined)
            throw new Error(`Entity ${entity} already have component ${this.ctor.name}`);
        const component = new this.ctor();
        const lastIndex = this.pool.length;
        this.entityToIndex[entity] = lastIndex;
        this.indexToEntity[lastIndex] = entity;
        this.pool.push(component);
        component.init(...args);
        return component;
    }
    get(entity) {
        if (this.entityToIndex[entity] == undefined)
            throw new Error(`Entity ${entity} doesn't have component ${this.ctor.name}`);
        const componentIndex = this.entityToIndex[entity];
        return this.pool[componentIndex];
    }
    remove(entity) {
        if (this.entityToIndex[entity] == undefined)
            throw new Error(`Entity ${entity} doesn't have component ${this.ctor.name}`);
        const indexOfRemovedEntity = this.entityToIndex[entity];
        const indexOfLastEntity = this.pool.length - 1;
        const lastEntity = this.indexToEntity[indexOfLastEntity];
        this.pool[indexOfRemovedEntity] = this.pool[indexOfLastEntity];
        this.indexToEntity[indexOfRemovedEntity] = lastEntity;
        this.entityToIndex[lastEntity] = indexOfRemovedEntity;
        delete this.indexToEntity[indexOfLastEntity];
        delete this.entityToIndex[entity];
        this.pool.pop();
    }
}
exports.ComponentArray = ComponentArray;
