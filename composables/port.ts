import Port from "~~/engine/objects/port";
import { ShipState } from "~~/engine/objects/ship";

interface IPortDisplayState {
    isShowing: boolean;
    message: string | null;
}

export const usePortDisplayState = () => useState<IPortDisplayState>("portDisplay", () => ({
    isShowing: false,
    message: null,
}));

interface IExportDisplayState {
    isShowing: boolean;
    port: Port | null;
    ship: ShipState | null;
    message: string | null;
}

export const useExportDisplayState = () => useState<IExportDisplayState>("exportDisplay", () => ({
    isShowing: false,
    port: null,
    ship: null,
    message: null,
}));

export const showExportDisplay = (port: Port, ship: ShipState) => {
    const exportSettings = useExportDisplayState();
    const lockPlayer = useMovementLocked();
    const market = useMarket();
    market.value.isEnabled = false;
    lockPlayer.value = true;
    exportSettings.value = {
        isShowing: true,
        port,
        ship,
        message: null,
    };
}