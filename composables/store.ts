export interface IStoreState<T> {
    isShowing: boolean;
    title: string;
    items: IStoreItem<T>[];
}

export interface IStoreItem<T> {
    name: string;
    description: string;
    displayPrice: string;
    id: T;
}

export const useStoreState = () => useState<IStoreState<any>>("storeState", () => ({
    isShowing: false,
    title: "Fortnite Item Shop",
    items: [
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            id: "RENEGADE"
        },
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            id: "RENEGADE"
        },
    ]
}));

export const useStoreCallback = () => useState<null | ((type: unknown) => string)>(
    "storeCallback", 
    null
);

export const showStore = <T>(
    newStoreState: Omit<IStoreState<T>, "isShowing">, 
    purchasedItemCallback: (res: IStoreItem<T>) => string
) => {
    const storeState = useStoreState();
    const storeCallback = useStoreCallback();

    storeState.value = {
        ...newStoreState,
        isShowing: true,
    };

    storeCallback.value = purchasedItemCallback;
};