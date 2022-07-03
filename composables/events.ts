import type { SpicePricing } from "./market";

export const useEvent = ()=> useState<Event|null>("event",()=>null)

interface EventPhase{    
    /** Function to handle adding trends based on an event */
    genTrend(spice:SpicePricing)

    dialogBank: string[]
    headline: string
    step:number
    chance:number
    endsEvent?:boolean
}

interface Event {
    name: string
    phases: EventPhase[]
    currentStep: number
    currentPhase?: EventPhase
}

export function stepEvent(){
    const event = useEvent()
    const market = useMarket()

    //@TODO: Add in a random chance for diff events to occur
    if(!event.value) event.value = pickRandom([
        genBlizzardEvent(),
        genWarEvent(pickRandom(info.rivalNations)),
        genHealthySpiceEvent(),
        genBadHarvestEvent(),
        genRebellion(),
        genShipSinkEvent()
  ])

    event.value.currentStep++

    const nextSteps = event.value.phases.filter(p=>p.step === event.value.currentStep)

    const nextStep = weightedRandom(nextSteps)

    event.value.currentPhase = nextStep
    if(nextStep){
        //Add to news
        addNewsArticle(event.value.currentPhase.headline)
        //Add trend to spices
        market.value.prices.forEach(p=>{
            p.trend = nextStep.genTrend(p)
        })
    }
}



function weightedRandom(choices: EventPhase[]) {
    const random = Math.random()
    const sortedChoices = choices.sort((a, b) => b.chance - a.chance);
    
    let total = 0;
    for (const choice of sortedChoices) {
        total += choice.chance;
      if (random <= total) {
        return choice;
      } 
    }
  }


//War Event
function genWarEvent(enemyName:string){
    const warEvent: Event = {
        currentStep: 0,
        name: "War",
        phases: [
            {
                headline:  `${enemyName} CAPTURES soldiers from ${info.country}! Held HOSTAGE`,
                step: 1,
                chance: 1,
                dialogBank: [
                    `Did you hear what ${enemyName} is doing to our country?`,
                    `${enemyName} is acting up once again...`,
                    `Can you belive the news? What were soldiers thinking when they crossed the border?`,
                ],
                genTrend(spice){
                    //Slighty up the price of spice
                    const price = spice.price

                    const price1 = price + randomInteger(5,10)
                    const price2 = price1 + randomInteger(5,10)
                    const price3 = price2 + randomInteger(5,10)
                    const price4 = price3 + randomInteger(5,10)


                    return normalizeTrend([price1, price2,price3,price4])
                }
            },
            {
                headline:  `${info.country} and ${enemyName} agree to open talks about captured soldiers.`,
                step: 2,
                chance: 1,
                dialogBank: [
                    `The hostages are still alive.... Turns out ${enemyName} has some commonsense.`,
                    `${enemyName} realizes that they can't compete with ${info.country} right? They are walking on thin ice.`,
                    `I'm positive that ${info.country} won't let ${enemyName} off the hook this easily!`,
                    `If ${enemyName} refuses to free the soldiers, ${info.country} will have to fight them!`,
                    `I don't trust the ${enemyName} to be honest.`,
                    `I don't believe in war. ${info.country} has a great diplomatic skill, and they will be able to handle whatever ${enemyName} throws their way.`,
                ],
                genTrend(spice){
                    //Slighty up the price of spice
                    const price = spice.price

                    const price1 = price + randomInteger(5,10)
                    const price2 = price1 + randomInteger(5,10)
                    const price3 = price2 + randomInteger(5,10)
                    const price4 = price3 + randomInteger(5,10)


                    return normalizeTrend([price1, price2,price3,price4])
                }
            },{
                headline: `${enemyName} agree to release captured ${info.country} soldiers!`,
                step: 3,
                chance: 0.4,
                endsEvent: true,
                dialogBank: [
                    `I'm just happy that there won't be any war in ${info.country} for a while.`,
                    `Why didn't ${info.country} go all the away? I'm sure they will be able to handle whatever ${enemyName} throws their way.`,
                    `I wonder why ${enemyName} even bothered to make a fuss if they are just going to release the soldiers...`,
                    `Boring... all this diplomatic stuff goes over my head haha!`   
                ],
                //Slightly drop the price of spice
                genTrend(spice){
                    const price = spice.price
                    const price1 = price - randomInteger(8,15)
                    const price2 = price1 - randomInteger(8,15)
                    const price3 = price2 - randomInteger(8,15)
                    const price4 = price3 - randomInteger(8,15)

                    return normalizeTrend([price1, price2,price3,price4])
                }
            },{
                headline: `${enemyName} REFUSES to release ${info.country} soldiers. ${info.country} begins preparing for WAR!`,
                step:3,
                chance: 0.6,
                dialogBank: [
                    `${info.country} is going to have to fight ${enemyName}! That's crazy news!`,
                    `I'm going to be rich! I have a ton of medical spices to sell!`,
                    `With this upcoming war, I'm planning on stocking up on medical spices like Saffron.`,
                    `Another day, another war. I'm not from either of these empires so personally, it doesn't matter to me.`,
                    `Did you hear that ${info.country} has weaponized spices? They're so powerful!`
                ],
                //Up prices of spice, surge war spices
                genTrend(spice){
                    const price = spice.price
                    const warSurge = ["Cayenne","Saffron"]
                    const isWarSpice = warSurge.includes(spice.name)
                    const min = (isWarSpice) ? 100 : 10
                    const max = (isWarSpice) ? 200 : 25

                    const price1 = price + randomInteger(min,max)
                    const price2 = price1 + randomInteger(min,max)
                    const price3 = price2 + randomInteger(min,max)
                    const price4 = price3 + randomInteger(min,max)

                    return normalizeTrend([price1, price2,price3,price4])
                }
            },{
                step: 4,
                chance: 0.7,
                headline: `${info.country} and ${enemyName} are fully engaged in a BLOODY conflict.`,
                dialogBank: [
                    `${info.country} and ${enemyName} are fighting for their lives.`,
                    `${enemyName} got what they deserved...`,
                    `${info.country} has a great military skill, and they will be able to handle whatever ${enemyName} throws their way.`,
                    `I don't trust the ${enemyName} to be honest anymore.`,
                    `More needless wars. What a waste of time.`,
                    `Both nations will need a ton of medicine to win this war. Lucky me, I have a lot of Saffron to sell.`,
                ],
                //Up prices of spice, surge war spices
                genTrend(spice){
                    const price = spice.price
                    const warSurge = ["Saffron"]
                    const isWarSpice = warSurge.includes(spice.name)
                    const min = (isWarSpice) ? 100 : 10
                    const max = (isWarSpice) ? 500 : 25

                    const price1 = price + randomInteger(min,max)
                    const price2 = price1 + randomInteger(min,max)
                    const price3 = price2 + randomInteger(min,max)
                    const price4 = price3 + randomInteger(min,max)

                    return normalizeTrend([price1, price2,price3,price4])
                }
            },{
                step: 4,
                chance: 0.3,
                headline:`${info.country} and ${enemyName} are fully engaged in BATTLE. Very little casualties have been reported.`,
                dialogBank: [
                    "What kind of battle is this? There's no way anyone is acutally fighting.",
                    `This war is a true display of tactics. They are fighting very efficiently with little losses.`,
                    `I shouldnt't have bought all of this Saffron...`,
                ],
                //Crash Saffron, slightly up other spices
                genTrend(spice){
                    const price = spice.price
                    const warCrash = ["Saffron"]
                    const isWarSpice = warCrash.includes(spice.name)

                    const min = (isWarSpice) ? -100 : 10
                    const max = (isWarSpice) ? -200 : 25

                    const price1 = price + randomInteger(min,max)
                    const price2 = price1 + randomInteger(min,max)
                    const price3 = price2 + randomInteger(min,max)
                    const price4 = price3 + randomInteger(min,max)

                    return normalizeTrend([price1, price2,price3,price4])
                }
                    
            },{
                step: 5,
                headline: `${info.country} SAVES hostages from ${enemyName}! ${info.country} is VICTORIOUS!`,
                chance: 1,
                endsEvent: true,
                dialogBank: [
                    "I'm happy to see that the war is over.",
                    `I'm glad that ${info.country} has managed to win the war.`
                ],
                //Drop prices of spice, crash war spices
                genTrend(spice){
                    const price = spice.price
                    const warCrash = ["Saffron","Cayenne"]
                    const isWarSpice = warCrash.includes(spice.name)

                    const min = (isWarSpice) ? -20 : -20
                    const max = (isWarSpice) ? -100 : -50

                    const price1 = price + randomInteger(min,max)
                    const price2 = price1 + randomInteger(min,max)
                    const price3 = price2 + randomInteger(min,max)
                    const price4 = price3 + randomInteger(min,max)

                    return normalizeTrend([price1, price2,price3,price4])
                }


            }]
    }

    return warEvent
            

}

//Blizzard event
function genBlizzardEvent(){
    const blizzardEvent:Event = {
        name: "Blizzard",
        currentStep: 0,
        phases: [{
            step: 0,
            chance:1,
            headline: `Winter projected to last EXTRA long this year.`,
            dialogBank: [
                `It's been quite chilly around here lately.`,
                `The water around ${info.island} has been pretty cold recently.`,
                `I can't wait to see the frozen lakes back in ${info.country}`,
                `With this cold weather, spices are a great way to keep the people warm.`,
                `Does it ever snow in ${info.island}?`,
                `It's getting colder. While some people don't like it, I do because it makes my spices more lucrative`
            ],
            //Up the price of all spices, surge Cardamom
            genTrend(spice){
                const price = spice.price
                const winterSurge = ["Cardamon","Wolf's Spice"]
                const isWarSpice = winterSurge.includes(spice.name)
                const min = (isWarSpice) ? 100 : 10
                const max = (isWarSpice) ? 200 : 25

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        },{
            step: 1,
            headline: `${info.country} receives HEAVY snowfall.`,
            chance: 0.7,
            dialogBank: [
                `Do you know how to make cardamom tea? It's very popular during cold winters.`,
                `I'm sure ${info.country} could use a lot of spice to stay warm.`,
                `${info.island} is a great place to escape the snow! It's sunny year round.`,
                `I just came from ${info.country}... there's so much snow!`
            ],
            //Up the price of all spices, surge Cardamom
            genTrend(spice){
            const price = spice.price
            const winterSurge = ["Cardamon","Wolf's Spice"]
            const isWarSpice = winterSurge.includes(spice.name)
            const min = (isWarSpice) ? 100 : 10
            const max = (isWarSpice) ? 200 : 25

            const price1 = price + randomInteger(min,max)
            const price2 = price1 + randomInteger(min,max)
            const price3 = price2 + randomInteger(min,max)
            const price4 = price3 + randomInteger(min,max)

            return normalizeTrend([price1, price2,price3,price4])
            }
        },{
            step: 1,
            chance:0.3,
            endsEvent: true,
            headline: `Weather predictions WRONG ${info.country} expected to receive EARLY Spring Season`,
            dialogBank: [
                `I stocked up on a ton of Cardamom... what am I doing?`,
                `It turns out the winter season was cut short in ${info.country}.`,
                `Did you see that the weather forecast was wrong? This is why I never read the FAKE news.`,
                `I'm thinking of selling all of my excess firewood. I won't need it anymore...`,
                `I guess the weather was too spicy for the winter haha.`
            ],
            //Down the price of all spices, crash Cardamom
            genTrend(spice){
                const price = spice.price
                const winterCrash = ["Cardamon","Wolf's Spice"]
                const isWinterSpice = winterCrash.includes(spice.name)
                const min = (isWinterSpice) ? -100 : -10
                const max = (isWinterSpice) ? -200 : -25

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        },{
            step: 2,
            headline: `HUGE BLIZZARD burries ${info.country}!`,
            chance: 1,
            dialogBank: [
                `I'm so sorry for ${info.country}... I can't imagine what it would be like living under a Blizzard.`,
                `This blizzard is our chance as spice traders to make HUGE profits off of the suffering of others!!!!`,
                `Thank goodness we have ${info.island} to escape the blizzard.`,
                `I'm selling all of my Wolf's Spice. It's going to save people's lives when it reaches the Blizzard in ${info.country}.`
            ],
            //Surge all spices
            genTrend(spice){
                const price = spice.price
                const min = 50
                const max = 100

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        },{
            step:3,
            headline: `Spice overflow MELTS Blizzard in ${info.country}!`,
            chance: 1,
            endsEvent: true,
            dialogBank: [
                `Us spice traders have a huge impact on the world if we can make Blizzards disappear.`,
                `It looks like the snow in ${info.country} is going to melt soon. I'll be sailing there shortly!`,
                `Did you see the power of the blizzard? The damages it caused are huge!`,
                `The chill of the blizzard was no match for the spice of global trade.`
            ],
        //Down the price of all spices, crash Cardamom and Wolf's Spice
        genTrend(spice){
            const price = spice.price
            const winterCrash = ["Cardamon","Wolf's Spice"]
            const isWinterSpice = winterCrash.includes(spice.name)
            const min = (isWinterSpice) ? -100 : -10
            const max = (isWinterSpice) ? -200 : -25

            const price1 = price + randomInteger(min,max)
            const price2 = price1 + randomInteger(min,max)
            const price3 = price2 + randomInteger(min,max)
            const price4 = price3 + randomInteger(min,max)

            return normalizeTrend([price1, price2,price3,price4])
        }
    }]
  }

  return blizzardEvent
}

//Healthy Spice Event
function genHealthySpiceEvent(){
    const market = useMarket()
    const discoveredSpices = market.value.prices.map(p=>p.name)
    const healthySpice = pickRandom(discoveredSpices)

    const healthySpiceEvent:Event = {
        name: "Healthy Spice",
        currentStep: 0,
        phases: [{
            step: 1,
            headline: `Ministry of Health declares ${healthySpice} as a SUPERFOOD!`,
            chance: 1,
            endsEvent: true,
            dialogBank: [
                `I ate a ton of ${healthySpice} at once would I gain powers?`,
                `Pick up some ${healthySpice} today! It's a superfood that tastes great with anything`,
                `I'm so glad I stocked up on ${healthySpice}! It always makes me feel better!`,
                `${healthySpice} is a great food to eat! I'm so glad I ate a ton of ${healthySpice} today.`,
                `Finally, a spice that is healthy! Want to try some ${healthySpice}?`
            ],
            //Up price of healthy spice
            genTrend(spice){
                const price = spice.price
                const min = (spice.name === healthySpice) ? 10 : -5
                const max = (spice.name === healthySpice) ? 20 : 5

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        }]
    }

    return healthySpiceEvent
}

//Bad Harvest Event
function genBadHarvestEvent(){
    const market = useMarket()
    const discoveredSpices = market.value.prices.map(p=>p.name)
    const lowSupplySpice = pickRandom(discoveredSpices)

    const badHarvestSpice:Event = {
        name: "Bad Harvest",
        currentStep: 0,
        phases: [{
            step: 1,
            headline: `Poor Harvest of ${lowSupplySpice} Results in a SHORTAGE!`,
            endsEvent: true,
            chance: 1,
            dialogBank: [
                `There's a shortage of ${lowSupplySpice}... luckily I still have some.`,
                `Did you see what happened with ${lowSupplySpice}? Did the farmers eat everything?`,
                `Looks like the crops for ${lowSupplySpice} are less spicy this season.`,
                `Can you imagine being a ${lowSupplySpice} farmer? I feel so bad for them!`,
                `It's a bad time to be a fan of ${lowSupplySpice}...`
            ],
             //Up price of shortage spice
             genTrend(spice){
                const price = spice.price
                const min = (spice.name === lowSupplySpice) ? 10 : -5
                const max = (spice.name === lowSupplySpice) ? 20 : 5

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        }]
    }

    return badHarvestSpice
}

//Rebellion Event
function genRebellion(){
    const rebellionEvent:Event = {
        name: "Rebellion",
        currentStep: 0,
        phases: [{
            step: 1,
            headline: `BOYCOTTS and RIOTING in ${info.country} Over New Spice Taxes! `,
            chance: 1,
            dialogBank: [
                `Did you see the new spice taxes? This will tank the demand for spices! We are in trouble if this continues...`,
                `People would rather risk their lives than pay a small fee to enjoy our spices? What an embarassment!`,
                `Can you imagine the people who are boycotting our spices? They are not happy about the new taxes!`,
                `${info.country} is in trouble with their new spice taxes.`
            ],
            //Crash all spices
            genTrend(spice){
                const price = spice.price
                const min = -10
                const max = -50

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        },{
            step:2,
            chance:0.5,
            headline: `${info.country} Gives in and REPEALS On the New Spice Taxes!`,
            endsEvent: true,
            dialogBank: [
                `${info.country} is giving up on the new spice taxes! Demand for spices is back to normal!`,
                `If ${info.country} wants to grow, they need new taxes. The repeal will only be temporary.`,
                `Did you see the news? ${info.country} is repealing the new spice taxes. The government acutally listens to the people.`,
                `Get your spice exports ready, us traders are back in business!`
            ],
            //Up price of all spices
            genTrend(spice){
                const price = spice.price
                const min = 10
                const max = 50

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }

        },{
            step:2,
            chance:0.5,
            headline: `MASSACRE as ${info.country} Opens FIRE on Tax Protesters!`,
            endsEvent: true,
            dialogBank: [
                `Things have been getting out of hand. The people of ${info.country} will just become more angry.`,
                `Looks these new taxes are getting a bit spicy....`,
                `This massacre will only fuel the boycott. Spice is off the menu for a while!`,
                `They impose new taxes one day, then open fire the next. We are living in a TYRANNY.`,
                `Spices might be going out of fashion, but the ones with medical effects are still in demand.`
            ],
            //Crash all spices, surge Saffron
            genTrend(spice){
                const price = spice.price
                const isSaffron = (spice.name === "Saffron") ? true : false
                const min = (isSaffron) ? -10 : 10
                const max = (isSaffron) ? -100 : 50

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        }]
    }

    return rebellionEvent
}

//Bad Harvest Event
function genShipSinkEvent(){
    const market = useMarket()
    const discoveredSpices = market.value.prices.map(p=>p.name)
    const lostSpices = pickRandom(discoveredSpices)

    const sinkEvent:Event = {
        name: "Ship Sink",
        currentStep: 0,
        phases: [{
            step: 1,
            headline: `Mass Shipments of ${lostSpices} Lost At Sea!`,
            endsEvent: true,
            chance: 1,
            dialogBank: [
                `Did you see what happened with ${lostSpices}? Did the traders sink?`,
                `And now the sailors are sinking. They have ONE job.`,
                `It wasn't very spicy of those sailors to sink the supply of ${lostSpices}...`,
                `People out here worrying about sinking ships, but I only worry about sinking markets.`
            ],
             //Up price of lostSpice spice
             genTrend(spice){
                const price = spice.price
                const min = (spice.name === lostSpices) ? 10 : -5
                const max = (spice.name === lostSpices) ? 20 : 5

                const price1 = price + randomInteger(min,max)
                const price2 = price1 + randomInteger(min,max)
                const price3 = price2 + randomInteger(min,max)
                const price4 = price3 + randomInteger(min,max)

                return normalizeTrend([price1, price2,price3,price4])
            }
        }]
    }

    return sinkEvent
}