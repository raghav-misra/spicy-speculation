interface IDialogState {
    isShowing: boolean;
    title: string;
    text: string;
    buttons: {
        text: string;
        accent: string;
        responseType: string;
    }[];
}

export const useDialogState = () => useState<IDialogState>("dialogState", () => ({
    isShowing: false,
    title: "Renegade Raider",
    text: "Would you like to purchase the battle pass?",
    buttons: [
        {
            text: "Yes, of course!!",
            accent: "var(--green)",
            responseType: "SUCCESS",
        }, {
            text: "No bozo",
            accent: "var(--red)",
            responseType: "FAILURE",
        }
    ]
}));

export const useDialogCallback = () => useState<null | ((type: string) => any)>(
    "dialogCallback", 
    null
);

export const showDialog = (newDialogState: Omit<IDialogState, "isShowing">) => {
    const dialogState = useDialogState();
    const dialogCallback = useDialogCallback();

    dialogState.value = {
        ...newDialogState,
        isShowing: true,
    };

    return new Promise<string>(resolve => {
        dialogCallback.value = resolve;
    });
};

export const showConversation = async (name: string, text: string[]) => {
    for (const speech of text) {
        await showDialog({
            title: name,
            text: speech,
            buttons: [{ text: "Ok", accent: "white", responseType: "TEXT"  }]
        });
    }
}