import { Component, Constructor, Entity } from "../types";
import { ComponentManager } from "../component";
import { BIT, EntityManager, EntitySignature } from "../entity";
import { InitParameter } from "../types/ComponentTypes";

export class AntsEcs {
    private entityManager: EntityManager;
    private componentManager: ComponentManager;

    public constructor(signatureSize: number = 1) {
        this.entityManager = new EntityManager(signatureSize);
        this.componentManager = new ComponentManager(signatureSize * EntitySignature.INT32_SIZE);
    }

    public createEntity(): Entity {
        return this.entityManager.createEntity();
    }

    public getComponent<T extends Component>(entity: Entity, ctor: Constructor<T>) {
        return this.componentManager.getComponent(entity, ctor);
    }


    public addComponent<T extends Component>(entity: Entity, ctor: Constructor<T>, ...args: InitParameter<T>): T {
        const componentId: number = this.componentManager.getComponentId(ctor);
        const oldSignature: EntitySignature = this.entityManager.getSignature(entity);
        const component: T = this.componentManager.addComponent(entity, ctor, ...args);
        const newSignature: EntitySignature = oldSignature.up(componentId);

        this.entityManager.setSignature(entity, newSignature);
        
        return component;
    }

    public removeComponent<T extends Component>(entity: Entity, ctor: Constructor<T>): void {
        const componentId: number = this.componentManager.getComponentId(ctor);
        const oldSignature: EntitySignature = this.entityManager.getSignature(entity);
        const newSignature: EntitySignature = oldSignature.down(componentId);

        this.entityManager.setSignature(entity, newSignature);
        this.componentManager.removeComponent(entity, ctor);
    }

    public registerComponent<T extends Component>(ctor: Constructor<T>): void {
        this.componentManager.registerComponent(ctor);
    }

    public destroyEntity(entity: Entity): void {
        this.entityManager.destroyEntity(entity);
        this.componentManager.destroyEntity(entity);
    }
}