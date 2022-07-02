type OverlayState = Record<string, {
    isShowing: boolean;
    isPulsing: boolean;
}>

export const useOverlayState = () => useState<OverlayState>("overlayState", () => ({
    moneyBox: {
        isShowing: true,
        isPulsing: false,
    },
    inventoryBox: {
        isShowing: true,
        isPulsing: false,
    },
    newsOpenBox: {
        isShowing: true,
        isPulsing: false,
    },
    marketPriceBox: {
        isShowing: true,
        isPulsing: false,
    },
}));