import { Component, Constructor, InitParameter } from "./ComponentTypes";
import { Entity } from "../entity/EntityTypes";

export interface IComponentArray {
    has(entity: Entity): boolean;
    remove(entity: Entity): void;
}

export class ComponentArray<T extends Component> implements IComponentArray {
    private pool: T[];
    private entityToIndex: Record<Entity, number>;
    private indexToEntity: Record<number, Entity>;
    private ctor: Constructor<T>;

    public constructor(ctor: Constructor<T>) {
        this.pool = [];
        this.entityToIndex = {};
        this.indexToEntity = {};
        this.ctor = ctor;
    }

    public has(entity: Entity): boolean {
        return this.entityToIndex[entity] != undefined;
    }

    public add(entity: Entity, ...args: InitParameter<T>): T {
        if (this.entityToIndex[entity] != undefined) throw new Error(`Entity ${entity} already have component ${this.ctor.name}`);
        
        const component: T = new this.ctor();
        const lastIndex: number = this.pool.length;

        this.entityToIndex[entity] = lastIndex;
        this.indexToEntity[lastIndex] = entity;
        this.pool.push(component);

        component.init(...args);

        return component;
    }

    public get(entity: Entity): T {
        if (this.entityToIndex[entity] == undefined) throw new Error(`Entity ${entity} doesn't have component ${this.ctor.name}`);
        const componentIndex: number = this.entityToIndex[entity];
        return this.pool[componentIndex];
    }

    public remove(entity: Entity): void {
        if (this.entityToIndex[entity] == undefined) throw new Error(`Entity ${entity} doesn't have component ${this.ctor.name}`);

        const indexOfRemovedEntity: number = this.entityToIndex[entity];
        const indexOfLastEntity: number = this.pool.length - 1;
        const lastEntity: Entity = this.indexToEntity[indexOfLastEntity];

        this.pool[indexOfRemovedEntity] = this.pool[indexOfLastEntity];
        this.indexToEntity[indexOfRemovedEntity] = lastEntity;
        this.entityToIndex[lastEntity] = indexOfRemovedEntity;

        delete this.indexToEntity[indexOfLastEntity];
        delete this.entityToIndex[entity];

        this.pool.pop();
        
    }
}