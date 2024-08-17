import { Entity } from "../types";
import { Component, Constructor, InitParameter } from "../types/ComponentTypes";
import { ComponentArray, IComponentArray } from "./ComponentArray";

export class ComponentManager {
    private componentsPool: IComponentArray[];
    private componentId: number;
    private maxComponent: number;

    public constructor(maxComponent: number) {
        this.componentsPool = [];
        this.maxComponent = maxComponent;
        this.componentId = 0;
    }

    public hasComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): boolean {
        const pool: ComponentArray<T> = this.getComponentArray(ctor);
        return pool.has(entity);
    }

    public getComponentId<T extends Component>(ctor: Constructor<T>): number {
        if (ctor["id"] == undefined) throw new Error(`Component ${ctor.name} is not registered`);
        return ctor["id"];
    }

    public registerComponent<T extends Component>(ctor: Constructor<T>): void {
        if (this.componentId >= this.maxComponent) throw new Error(`Already reached max component`);
        if (ctor["id"] != undefined) throw new Error(`Component ${ctor.name} already registered`);

        const pool: ComponentArray<T> = new ComponentArray<T>(ctor);
        const componentId: number = this.componentId;

        ctor["id"] = componentId;
        
        this.componentsPool.push(pool);
        this.componentId++;
    }

    public addComponent<T extends Component>(entity: Entity, ctor: Constructor<T>, ...args: InitParameter<T>): T {
        const pool: ComponentArray<T> = this.getComponentArray(ctor);
        return pool.add(entity, ...args);
    }

    public getComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): T {
        const pool: ComponentArray<T> = this.getComponentArray(ctor);
        return pool.get(entity);
    }

    public removeComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): void {
        const pool: ComponentArray<T> = this.getComponentArray(ctor);
        pool.remove(entity);
    }

    public destroyEntity(entity: Entity): void {
        for (let i: number = 0; i < this.componentsPool.length; i++) {
            const pool: IComponentArray = this.componentsPool[i];
            if (pool.has(entity)) {
                pool.remove(entity);
                console.log(pool);
            }
        }
    }

    private getComponentArray<T extends Component>(ctor: Constructor<T>): ComponentArray<T> {
        if (ctor["id"] == undefined) throw new Error(`Component ${ctor.name} is not registered`);
        const componentId: number = ctor["id"];
        return <ComponentArray<T>>this.componentsPool[componentId];
    }
}