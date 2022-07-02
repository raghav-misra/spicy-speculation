import type { ShipState } from "../engine/objects/ship";

export interface PortState{
    direction:'import'|'export',
    ship:ShipState
}

export const usePlayer = () => useState("playerState", () => ({
    money: 1000000,
    days: 0,
    x:null,
    y:null,
    inventory: {} as Record<string, number>,
    ports: [{
        direction: "export",
        ship:{
            name:"Peptopia Charters",
            type:"med",
            direction:"export",
            shopItems:[]
        }
    },{
        direction: "import",
        ship:{
            name:"Trader's Union",
            type:"small",
            direction:"import",
            shopItems:[{
                price:200,
                name:"Pepper",
                stock:1000,
                description:info.spiceDescriptions.Pepper
            }]
        }
    }] as PortState[]
}));

export const useMovementLocked = () => useState("movementLocked", () => false)

export const setMovementLocked = (locked:boolean) => {
    useMovementLocked().value = locked
}