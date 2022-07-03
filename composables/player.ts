import type { ShipState } from "../engine/objects/ship";

export interface PortState{
    direction:'import'|'export',
    ship:ShipState
}

export const usePlayer = () => useState("playerState", () => ({
    money: 10000,
    isTutorial: true,
    days: 0,
    x:null,
    y:null,
    inventory: {
        Pepper: 2,
    } as Record<string, number>,
    ports: [{
        direction: "export",
        ship:{
            name:"Peptopia Charters",
            type:"med",
            direction:"export",
            shopItems:[],
            ready:true
        }
    },{
        direction: "import",
        ship:{
            name:"Trader's Union",
            type:"small",
            direction:"import",
            ready:true,
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