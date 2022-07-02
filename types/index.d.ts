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

declare interface IShopState {
    isShowing: boolean;
    callback: null | ((item: IShopItem, amount: number) => string);
    title: string;
    items: IShopItem[];
}

declare interface IShopItem {
    name: string;
    price: number;
    stock: number;
    description: string;
}