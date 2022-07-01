interface PortState{
    direction:'import'|'export',
    hasShip:boolean
}

export const usePlayer = () => useState("playerState", () => ({
    money: 0,
    x:null,
    y:null,
    inventory: {
        pepper: 69,
        vbucks: 420
    },
    ports: [{
        direction: "import",
        hasShip: false
    },{
        direction: "export",
        hasShip: false
}] as PortState[]
}));