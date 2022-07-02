export interface SpicePricing{
    name:string
    price:number
    trend:number[]
}

export const useMarket = ()=> useState("market",()=>{
    return{
        prices:[] as SpicePricing[],
        stepsUntilEvent:8,
        isEnabled:true
    }
})

export const initMarket = () => {
    const market = useMarket();

    market.value.prices.push({
        name:"Pepper",
        price:120,
        trend:[]
    },
    {
        name:"Saffron",
        price:3400,
        trend:[]
    })
}

/** Tick prices of the spice market */
export const stepMarket = ()=>{
    const market = useMarket()
    const event = useEvent()
    if(!market.value.isEnabled) return
    
    market.value.stepsUntilEvent -= 1
    if(market.value.stepsUntilEvent === 0){
        stepEvent()
    }else if(event.value){
        //If spices still have trends, step it
        const hasTrend = market.value.prices.some(spice=>spice.trend.length > 0)
        if(!hasTrend){
            if(event.value.currentPhase?.endsEvent){
                event.value = null
                market.value.stepsUntilEvent = 8
                return
            }
            stepEvent()

        }
        
        market.value.prices.forEach(spice=>{
            if(spice.trend.length > 0){
                spice.price = spice.trend.shift()
            }
        })
    }else{
        market.value.prices.forEach(spice=>{
            const isFad = info.fadSpices.includes(spice.name)
            if(spice.trend.length === 0) spice.trend = (isFad) ? generateFadTrend(spice.price) : generateTrend(spice.price)
    
             spice.price = spice.trend.shift()
        })
    }
}

export const nextDay = ()=>{
    discoverNewSpice()

    //Restock the import ships
    const market = useMarket()
    const importPorts = usePlayer().value.ports.filter(port=>port.direction === "import")

    importPorts.forEach(port=>{
        const size = pickRandom(["med","small"]) as "med" | "small"

        port.ship.shopItems = []

        const spiceName = pickRandom(market.value.prices.map(spice=>spice.name))
        port.ship.type = size
        const stock = (size === "med") ? 10000 : 1000
        const price = market.value.prices.find(spice=>spice.name === spiceName).price + randomInteger(100,500)

        port.ship.shopItems.push({
            name:spiceName,
            price,
            stock,
            description:info.spiceDescriptions[spiceName]
        })
    })
}

const generateTrend = (price:number)=>{
    const choice = Math.random()

    //Surge
    if(choice <=0.1){
        const price1 = price + randomInteger(1,20)
        const price2 = price1 + randomInteger(10,30)
        const price3 = price1 + randomInteger(10,30)
        const price4 = price1 + randomInteger(100,200)
        return normalizeTrend([price1, price2,price3,price4])
    }

    //Crash
    if(choice<=0.2){
        const price1 = price - randomInteger(1,20)
        const price2 = price1 - randomInteger(10,30)
        const price3 = price1 - randomInteger(10,30)
        const price4 = price1 - randomInteger(50,200)
        return normalizeTrend([price1, price2,price3,price4])
    }

    //Flucuate
    if(choice<=0.7){
        const price1 = price + randomInteger(-10,10)
        const price2 = price1 + randomInteger(-10,10)
        const price3 = price1 + randomInteger(-12,12)
        const price4 = price1 + randomInteger(5,15)
        return normalizeTrend([price1, price2,price3,price4])
    }

    //Uptrend
    if(choice <= 0.8){
        const price1 = price + randomInteger(1,10)
        const price2 = price1 + randomInteger(1,10)
        const price3 = price1 + randomInteger(1,12)
        const price4 = price1 + randomInteger(1,15)
        return normalizeTrend([price1, price2,price3,price4])
    }

    //Downtrend
    if(choice <= 1){
        const price1 = price + randomInteger(-8,-1)
        const price2 = price1 + randomInteger(-8,-1)
        const price3 = price1 + randomInteger(-10,-1)
        const price4 = price1 + randomInteger(-12,-1)
        return normalizeTrend([price1, price2,price3,price4])
    }
}

const generateFadTrend = (price:number)=>{
    const price1 = price + randomInteger(-100,500)
    const price2 = price1 + randomInteger(-20,50)
    const price3 = price1 + randomInteger(-5000,5000)
    const price4 = price1 + randomInteger(-1000,1000)
    return normalizeTrend([price1, price2,price3,price4])
}

export function normalizeTrend(trend:number[]){
    return trend.map(p=>Math.max(5,p))
}

function discoverNewSpice(){
    const market = useMarket()
    const disoveredSpices = market.value.prices.map(spice=>spice.name)

    const stableSpices = info.stableSpices.filter(spice=>!disoveredSpices.includes(spice))
    const fadSpices = info.fadSpices.filter(spice=>!disoveredSpices.includes(spice))

    const potentialNext = [
        {type:"stable",name:pickRandom(stableSpices)},
        {type:"fad",name:pickRandom(fadSpices)}
    ].filter(s=>s != null)

    if(potentialNext.length === 0) return

    const spice = pickRandom(potentialNext)

    if(spice.type === "stable"){
        const price = randomInteger(100,200)
        market.value.prices.push({
            name:spice.name,
            price,
            trend:generateTrend(price)
        })
    }else{
        const price = randomInteger(200,6000)
        market.value.prices.push({
            name:spice.name,
            price,
            trend:generateFadTrend(price)
        })
    }
    

}
