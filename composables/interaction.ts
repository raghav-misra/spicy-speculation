import NPC from "~~/engine/objects/npc";

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

export const useShopState = () => useState<IShopState>("ShopState", () => ({
    isShowing: false,
    callback: null,
    title: "Fortnite Item Shop",
    items: []
}));

export const showShop = (
    newStoreState: Omit<Omit<IShopState, "isShowing">, "callback">, 
    purchasedItemCallback: (res: IShopItem, amount: number) => string
) => {
    const shopState = useShopState();

    shopState.value = {
        ...newStoreState,
        isShowing: true,
        callback: purchasedItemCallback,
    };
};

export const triggerInteraction = async (npc: NPC) => {
    const name = getNpcInfo(npc.gender, npc.spriteKey);
    const event = useEvent()

    if(event.value?.currentPhase){
        await showConversation(name,[pickRandom(event.value.currentPhase.dialogBank),"Anyways, here's what I brought with me today."])
    }else{
        await showConversation(name,[
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
    }


    

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
        const player = usePlayer();

        showShop({
            title: `${name}'s Shop`,
            //@ts-ignore
            items: npc.shopItems || []
        }, (item, amount) => {
            const totalPrice = (item.price * amount);
            if (totalPrice <= player.value.money) {
                player.value.money -= totalPrice;
                if(!player.value.inventory[item.name]) player.value.inventory[item.name] = 0
                player.value.inventory[item.name] += amount;
                return "Thanks for that.";
            } else {
                return "Aw shucks, you're broke bozo!"
            }
        });
    }
};