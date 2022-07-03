import { ShipState } from "./ship"
import Ship from "./ship"

interface PortConfig{
    scene:Phaser.Scene,
    x:number,
    y:number,
    direction:"import"|"export",
    ship?:ShipState,
    index:number
}

export default class Port extends Phaser.GameObjects.Sprite{
    shipObject: Ship|null
    isNearPlayer: boolean = false
    constructor({x,y,direction,scene,ship,index}:PortConfig){
        super(scene,x,y,"port")

        const hint = useState("hint")
        
        this.scene.matter.add.gameObject(this,{
            isSensor: true,
            label:"port"
        })

        this.x = this.width/2 + x
        this.y = this.height/2 + y

        if(direction === 'export') this.setFlipX(true)

        this.scene.add.existing(this)
        //Get anything body is touching
        const body = this.body as MatterJS.BodyType

        body.onCollideCallback = (event:any) => {
            if(event.bodyA.label != `Player` && event.bodyA.label != `port` && event.bodyA.label != `npc`){
                //Destroy body
                this.scene.matter.world.remove(event.bodyA)
            }else if(event.bodyA.label === `Player`){
                this.isNearPlayer = true
                if(!this.shipObject) return
                if(this.shipObject.ready){
                    hint.value = `Press T to ${(direction === 'import') ? 'buy' : 'sell'} spices`
                }else{
                    hint.value = `This ship has sailed! It will be back tomorrow.`
                }
            }
        }

        body.onCollideEndCallback = (event:any) => {
            if(event.bodyA.label === "Player" || event.bodyB.label === "Player"){
                this.isNearPlayer = false
                hint.value = null
                
            }
        }

        this.scene.input.keyboard.on("keydown-T", () => {
            const player = usePlayer()
            const hint = useState("hint")
            const market = useMarket()

            if (!this.isNearPlayer) return;
            hint.value = null

            if(!this.shipObject.ready) return;
            
            if(ship.direction === 'import'){
                //If doing tutorial do not allow import
                if(player.value.isTutorial){
                    showConversation("The Trader's Union",[
                        "Hey! I'm sorry, but this ship is closed right now.",
                        "I mean literally closed... the captain accidently dropped the key somewhere in our pepper pile.",
                        "So until we find it, we can't leave the ship to trade.",
                        "It probably won't take long... I hope."
                    ])
                    return
                }
                showShop({
                    title: `Ship Of ${ship.name}`,
                    items:ship.shopItems
                }, (item, amount) => {
                    const totalPrice = (item.price * amount);
                    if (totalPrice <= player.value.money) {
                        player.value.money -= totalPrice;
                        if(!player.value.inventory[item.name]) player.value.inventory[item.name] = 0
                        player.value.inventory[item.name] += amount;
                        const indexToUpdate = ship.shopItems.findIndex(f => f.name === item.name);
                        ship.shopItems[indexToUpdate].stock -= amount;
                        return "Thanks for that.";
                    } else {
                        return "Aw shucks, you're broke bozo!"
                    }
                })
            } else {
                 //If doing tutorial do not allow export
                 if(player.value.isTutorial){
                    showConversation(ship.name,[
                        "We will be ready for you when you want to sell spices!"
                    ])
                    return
                 }
                showExportDisplay(this, ship);
            }
        })

        if (direction === 'import') {
            //Top wall
            this.scene.matter.add.rectangle(this.x + 55, this.y - 38, this.width, 6, {
                isStatic: true
            })

            //Stair wall top
            this.scene.matter.add.rectangle(this.x - this.width / 2 +50 / 2, this.y - 50, 40, 10, {
                angle: 23,
                isStatic: true
            })

             //Stair bpttom
             this.scene.matter.add.rectangle(this.x - this.width / 2 +30 / 2, this.y + 20, 40, 10, {
                angle: 23,
                isStatic: true
            })

            //Bottom wall
            this.scene.matter.add.rectangle(this.x, this.y + this.height - 64, this.width, 16, {
                isStatic: true
            })
            //Right wall
            this.scene.matter.add.rectangle(this.x + this.width / 1.9, this.y, 16, this.height, {
                isStatic: true
            })
        }else{
            //Top wall
            this.scene.matter.add.rectangle(this.x - 50, this.y - 38, this.width, 6, {
                isStatic: true
            })

            //Stair wall top
            this.scene.matter.add.rectangle(this.x + this.width / 2 - 50 / 2, this.y - 50, 40, 10, {
                angle: -23,
                isStatic: true
            })

            //Stair wall bottom
            this.scene.matter.add.rectangle(this.x + this.width / 2 - 30 / 2, this.y + 20, 40, 10, {
                angle: -23,
                isStatic: true
            })

            //Bottom wall
            this.scene.matter.add.rectangle(this.x, this.y + this.height - 64, this.width, 16, {
                isStatic: true
            })
            //Right wall
            this.scene.matter.add.rectangle(this.x - this.width / 1.9, this.y, 16, this.height, {
                isStatic: true
            })
        }

        //Create a ship
        if(!ship) return
         
        this.shipObject = new Ship({
            scene:this.scene,
            x:(direction === 'export') ?this.x +  -30 : this.x + 30,
            y:this.y - 10,
            ...ship
        })
        this.shipObject.setDepth(5-index)

        if(!ship.ready){
            this.shipObject.sail(direction)
        }
    }   
}