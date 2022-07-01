interface IStoreState {
    isShowing: boolean;
    title: string;
    items: {
        name: string;
        description: string;
        displayPrice: string;
        responseType: string;
    }[];
}

export const useStoreState = () => useState<IStoreState>("dialogState", () => ({
    isShowing: false,
    title: "Fortnite Item Shop",
    items: [
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            responseType: "RENEGADE"
        },
        {
            name: "Renegade Raider",
            description: "Oh what a rare skin, only been in Fortnite once, get it in Spice Race",
            displayPrice: "$100",
            responseType: "RENEGADE"
        },
    ]
}));

export const useStoreCallback = () => useState<null | ((type: string) => any)>(
    "storeCallback", 
    null
);

export const showStore = <T = string>(newStoreState: Omit<IStoreState, "isShowing">) => {
    const storeState = useStoreState();
    const storeCallback = useStoreCallback();

    storeState.value = {
        ...newStoreState,
        isShowing: true,
    };

    return new Promise<T>(resolve => {
        storeCallback.value = resolve as any;
    });
};