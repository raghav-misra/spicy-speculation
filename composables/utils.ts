export function pickRandom<T>(array: T[]) {
    if(array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)]
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const npcMap = {
    male: {
        B: "Kraft Lawrence",
        C: "Jonesy Jackson",
        D: "Quandale Dingle"
    },
    female: {
        B: "Kara Lroft",
        C: "Pepper Potts",
        D: "Scary Spice"
    }
};

export function getNpcInfo(gender: string, spriteKey: string) {
    return npcMap[gender][spriteKey];
}

export let currentNpcs = []

export function createNpc(){
    const possibleNpcs = []
    Object.keys(npcMap).forEach(gender=>{
        const keys = Object.keys(npcMap[gender])
        keys.forEach(k=>{
            possibleNpcs.push(`${gender}-${k}`)
        })
    })
    const availableNpcs = possibleNpcs.filter(n=>!currentNpcs.includes(n)) 

    const npc = pickRandom(availableNpcs)
    currentNpcs.push(npc)

    return{
        gender:npc.split("-")[0],
        spriteKey:npc.split("-")[1]
    }
}

export function resetNpcs(){
    currentNpcs=[]
}

export function saveGame(){
    const market = useMarket().value
    const player = usePlayer().value
    const history = useMarketHistory().value

    localStorage.setItem("market", JSON.stringify(market))
    localStorage.setItem("player", JSON.stringify(player))
    localStorage.setItem("history", JSON.stringify(history))

}

export function loadGame(){
    const market = localStorage.getItem("market")
    const player = localStorage.getItem("player")
    const history = localStorage.getItem("history")

    if(market){
        useMarket().value = JSON.parse(market)
        useMarket().value.stepsUntilEvent = 8
    }
    if(player){
        usePlayer().value = JSON.parse(player)
    }
    if(history){
        useMarketHistory().value = JSON.parse(history)
    }
}

