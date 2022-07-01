import type { ShipState } from "../engine/objects/ship";

interface PortState{
    direction:'import'|'export',
    ship:ShipState
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
        ship: null
    },{
        direction: "export",
        ship:{
            name:"Peptopia Charters",
            type:"med",
            prices:{
                pepper:20,
                saffron:1000
            },
        }
    }] as PortState[]
}));