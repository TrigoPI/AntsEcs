"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentManager = void 0;
const ComponentArray_1 = require("./ComponentArray");
class ComponentManager {
    constructor(maxComponent) {
        this.componentsPool = [];
        this.maxComponent = maxComponent;
        this.componentId = 0;
    }
    hasComponent(entity, ctor) {
        const pool = this.getComponentArray(ctor);
        return pool.has(entity);
    }
    getComponentId(ctor) {
        if (ctor["id"] == undefined)
            throw new Error(`Component ${ctor.name} is not registered`);
        return ctor["id"];
    }
    registerComponent(ctor) {
        if (this.componentId >= this.maxComponent)
            throw new Error(`Already reached max component`);
        if (ctor["id"] != undefined)
            throw new Error(`Component ${ctor.name} already registered`);
        const pool = new ComponentArray_1.ComponentArray(ctor);
        const componentId = this.componentId;
        ctor["id"] = componentId;
        this.componentsPool.push(pool);
        this.componentId++;
    }
    addComponent(entity, ctor, ...args) {
        const pool = this.getComponentArray(ctor);
        return pool.add(entity, ...args);
    }
    getComponent(entity, ctor) {
        const pool = this.getComponentArray(ctor);
        return pool.get(entity);
    }
    removeComponent(entity, ctor) {
        const pool = this.getComponentArray(ctor);
        pool.remove(entity);
    }
    destroyEntity(entity) {
        for (let i = 0; i < this.componentsPool.length; i++) {
            const pool = this.componentsPool[i];
            if (pool.has(entity)) {
                pool.remove(entity);
                console.log(pool);
            }
        }
    }
    getComponentArray(ctor) {
        if (ctor["id"] == undefined)
            throw new Error(`Component ${ctor.name} is not registered`);
        const componentId = ctor["id"];
        return this.componentsPool[componentId];
    }
}
exports.ComponentManager = ComponentManager;
