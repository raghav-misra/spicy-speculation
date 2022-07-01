declare module "*.png" {
    const data: string;
    export default data;
}

declare interface IDialogState {
    isShowing: boolean;
    callback: null | ((type: string) => unknown),
    title: string;
    text: string;
    buttons: {
        text: string;
        accent: string;
        id: string;
    }[];
}

declare interface IShopState<T> {
    isShowing: boolean;
    callback: null | ((item: IShopItem<T>) => string);
    title: string;
    items: IShopItem<T>[];
}

declare interface IShopItem<T> {
    name: string;
    description: string;
    displayPrice: string;
    id: T;
}