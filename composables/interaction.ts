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
            buttons: [{ text: "Okay", accent: "white", id: "TEXT" }]
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
    
    await showConversation(name, [
        `
            New to these parts are you? Worry not, I'm sure you'll pick up quickly. 
            I'm always here if you're in need of some help.
        `,
        `
            From ${info.island}, huh? My great grandfather Bruhngis Khan conquered that land
            a few decades ago. If it were 40 years ago, you'd be bowing to me. Anyhow, I'm a
            trader who stumbled on a new settlement here.
        `,
        `
            Dang, this island is yours? Didn't think you'd have it in you. Regardless, I have the most unique
            items you can find in these parts of ${info.island}.
        `
    ]);

    const doDisplayShop = await showDialog({
        title: name,
        text: `
            So, what do you think? Want to check out what I have to offer?
            Beware of being totally awestuck by my awesome stuff!
        `,
        buttons: [
            {
                text: "For sure!",
                accent: "var(--green)",
                id: "ACCEPT_SHOP"     
            }, 
            {
                text: "Not really.",
                accent: "var(--blue)",
                id: "REJECT_SHOP"
            }
        ]
    });

    if (doDisplayShop === "REJECT_SHOP") {
        await showConversation(name, [
            `Oh alright, suit yourself. If you change your mind, you know where I'll be.`
        ]);
    } else {
        await showShop({
            title: `${name}'s Shop`,
            items: []
        }, (item) => "Whatever.");
    }
};