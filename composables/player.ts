interface PortState{
    direction:'import'|'export',
    hasShip:boolean
}

export const usePlayer = () => useState("playerState", () => ({
    money: 0,
    inventory: {
        pepper: 69,
        vbucks: 420
    },
    ports: [] as PortState[]
}));