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
    if(!event.value) event.value = genWarEvent(pickRandom(info.rivalNations))

    event.value.currentStep++

    const nextSteps = event.value.phases.filter(p=>p.step === event.value.currentStep)

    const nextStep = weightedRandom(nextSteps)

    event.value.currentPhase = nextStep
    if(nextStep){
        //Add to news
        addNewsArticle({
            title:event.value.currentPhase.headline,
            text:"bruh",
        })
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
