import { Component, Constructor, Entity } from "../types";
import { InitParameter } from "../types/ComponentTypes";
export declare class AntsEcs {
    private entityManager;
    private componentManager;
    constructor(signatureSize?: number);
    createEntity(): Entity;
    getComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): T;
    addComponent<T extends Component>(entity: Entity, ctor: Constructor<T>, ...args: InitParameter<T>): T;
    removeComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): void;
    registerComponent<T extends Component>(ctor: Constructor<T>): void;
    destroyEntity(entity: Entity): void;
}
