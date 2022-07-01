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
        direction: "export",
        ship:{
            name:"Peptopia Charters",
            type:"med",
            direction:"export",
            inventory:{}
        }
    },{
        direction: "import",
        ship:{
            name:"Trader's Union",
            type:"small",
            direction:"export",
            inventory:{
                pepper:1000,
            },
            prices:{
                pepper:100
            },
        }
    }] as PortState[]
}));