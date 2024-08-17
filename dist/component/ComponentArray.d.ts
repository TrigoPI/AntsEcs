import { Component, Constructor, InitParameter } from "./ComponentTypes";
import { Entity } from "../entity/EntityTypes";
export interface IComponentArray {
    has(entity: Entity): boolean;
    remove(entity: Entity): void;
}
export declare class ComponentArray<T extends Component> implements IComponentArray {
    private pool;
    private entityToIndex;
    private indexToEntity;
    private ctor;
    constructor(ctor: Constructor<T>);
    has(entity: Entity): boolean;
    add(entity: Entity, ...args: InitParameter<T>): T;
    get(entity: Entity): T;
    remove(entity: Entity): void;
}
