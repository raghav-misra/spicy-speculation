interface IPortDisplayState {
    isShowing: boolean;
    message: string | null;
}

export const usePortDisplayState = () => useState<IPortDisplayState>("portDisplay", () => ({
    isShowing: false,
    message: null,
}));