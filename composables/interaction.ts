export const useDialogState = () => useState<IDialogState>("dialogState", () => ({
    isShowing: false,
    callback: null,
    title: "Renegade Raider",
    text: "Would you like to purchase the battle pass?",
    buttons: [
        {
            text: "Yes, of course!!",
            accent: "var(--green)",
            id: "SUCCESS",
        }, {
            text: "No bozo",
            accent: "var(--red)",
            id: "FAILURE",
        }
    ]
}));

export const showDialog = (newDialogState: Omit<Omit<IDialogState, "isShowing">, "callback">) => {
    const dialogState = useDialogState();

    return new Promise<string>(resolve => {
        dialogState.value = {
            ...newDialogState,
            isShowing: true,
            callback: resolve
        };
    });
};

export const showConversation = async (name: string, text: string[]) => {
    for (const speech of text) {
        await showDialog({
            title: name,
            text: speech,
            buttons: [{ text: "Ok", accent: "white", id: "TEXT" }]
        });
    }
}

export const useShopState = () => useState<IShopState<any>>("ShopState", () => ({
    isShowing: false,
    callback: null,
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

export const showShop = <T>(
    newStoreState: Omit<Omit<IShopState<T>, "isShowing">, "callback">, 
    purchasedItemCallback: (res: IShopItem<T>) => string
) => {
    const shopState = useShopState();

    shopState.value = {
        ...newStoreState,
        isShowing: true,
        callback: purchasedItemCallback,
    };
};

export const triggerInteraction = async (gender: string, spriteKey: string) => {
    const name = getNpcInfo(gender, spriteKey);
    
    await showDialog({
        title: name,
        text: "New to these parts are you? Worry not, I'm sure you'll pick up quickly.",
        buttons: []
    });
};