export type Component = {
    init(...args: any[]): void;
};
export type Constructor<T extends Component> = {
    new (...args: any[]): T;
};
export type InitParameter<T extends Component> = Parameters<T["init"]>;
