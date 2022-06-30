interface SpicePricing{
    name:string
    price:number
    trend:number[]
}

export const useMarket = () => useState<SpicePricing[]>("market",()=>[])

export const initMarket = () => {
    const market = useMarket();

    market.value.push({
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
    market.value.forEach(spice=>{
        if(spice.trend.length === 0) spice.trend = generateTrend(spice.price)

         spice.price = spice.trend.shift()
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


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizeTrend(trend:number[]){
    return trend.map(p=>Math.max(5,p))
}
