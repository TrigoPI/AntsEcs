import { Entity } from "../types";
import { Component, Constructor, InitParameter } from "../types/ComponentTypes";
export declare class ComponentManager {
    private componentsPool;
    private componentId;
    private maxComponent;
    constructor(maxComponent: number);
    hasComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): boolean;
    getComponentId<T extends Component>(ctor: Constructor<T>): number;
    registerComponent<T extends Component>(ctor: Constructor<T>): void;
    addComponent<T extends Component>(entity: Entity, ctor: Constructor<T>, ...args: InitParameter<T>): T;
    getComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): T;
    removeComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): void;
    destroyEntity(entity: Entity): void;
    private getComponentArray;
}
