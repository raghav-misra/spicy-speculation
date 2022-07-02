interface NPCConfig{
    gender?:string,
    sprite?:string,
    spriteKey?:string,
    x:number,
    y:number,
    scene:Phaser.Scene
}

export default class NPC extends Phaser.GameObjects.Sprite{

    keys: Record<string,Phaser.Input.Keyboard.Key> = {}
    setVelocityY: (y)=>void
    setVelocityX: (x)=>void

    gender:string;
    spriteKey:string;
    interactBody: MatterJS.BodyType;

    speed = 1.5
    shopItems: IShopItem[] = []
    isNearPlayer = false

    allowRoam = true
    velocity = {
        x:0,
        y:0
    }
    
    constructor({scene,x,y,sprite,spriteKey,gender}:NPCConfig){

        if(sprite && spriteKey && gender){
            super(scene,x,y,sprite)
            this.spriteKey = spriteKey
            this.gender = gender
        }else{
            const { gender,spriteKey } = createNpc()
            super(scene,x,y,`${gender}_1`)

            this.gender = gender
            this.spriteKey = spriteKey

        }



        this.create()
        scene.matter.add.gameObject(this,scene.matter.bodies.rectangle(x,y,16,32,{
            inertia: Infinity,
            mass:100,
            label: "NPC",
        }))
        this.originY = 0.6

        scene.add.existing(this)
    }

    create(){
        this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,E,space",false) as Record<string,Phaser.Input.Keyboard.Key>

        this.setScale(1.5)
        this.setDepth(3)

        this.generateShop()

        //Idle animations
        this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`)

        this.randomWalk()

        //Interact body
        this.interactBody = this.scene.matter.add.circle(this.x,this.y,50,{
            isSensor: true,
            label: "npc"
        })

         //Detect if player is near
        this.interactBody.onCollideCallback = (event:any) => {
            const hint = useState("hint")
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = true
                hint.value = "Press T to talk"
            }
        }
        this.interactBody.onCollideEndCallback = (event:any) => {
            const hint = useState("hint")
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = false
                hint.value = null
                
            }
        }

        //Handle interaction
        this.scene.input.keyboard.on("keydown-T", () => {
            const hint = useState("hint")
            if (!this.isNearPlayer) return;
            hint.value = null
            this.facePlayer()
            this.updateShopPrices()
            triggerInteraction(this)
        })
        
    }

    randomWalk(){
        const dialogue = useDialogState()
        if(dialogue.value.isShowing) return

        const direction = (Math.random() > 0.5) ? "x" : "y"
        this.velocity[direction] =(Math.random() > 0.5) ? this.speed : -this.speed

        const walkTime = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)
        const lookTime = walkTime + Math.floor(Math.random() * (2500 - 2000 + 1) + 2000)
        const waitTime = lookTime  + Math.floor(Math.random() * (5000 - 2000 + 1) + 2000)

        this.scene.time.addEvent({
            delay: walkTime,
            callback: ()=>{
                const velocitySign = Math.sign(this.velocity[direction])
                this.velocity[direction] = 0 

                if(direction === 'x'){
                    this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`)
                }else if(velocitySign === -1){
                    this.anims.play(`${this.gender}_${this.spriteKey}_up_idle`)
                }else{
                    this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`)
                }
            }
        })

        this.scene.time.addEvent({
            delay:lookTime,
            callback:()=>{
                if(this.isNearPlayer) return
                this.anims.play(pickRandom([`${this.gender}_${this.spriteKey}_side_idle`,`${this.gender}_${this.spriteKey}_up_idle`,`${this.gender}_${this.spriteKey}_down_idle`]))
            }
        })

        this.scene.time.addEvent({
            delay:waitTime,
            callback:()=>{
                this.randomWalk()
            }
        })
    }

    facePlayer(){
        const player = usePlayer().value

        //Calculate angle
        const angle = Math.atan2(player.y - this.y,player.x - this.x)
        const angleDeg = angle * (180 / Math.PI)

        if(angleDeg < -115){
            this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`, true)
            this.setFlipX(false)
        }else if (angleDeg < 5){
            this.anims.play(`${this.gender}_${this.spriteKey}_up_idle`, true)
        }else if(angleDeg < 95){
            this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`, true)
            this.setFlipX(true)
        }else if(angleDeg < 180){
            this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`, true)
        }
        
    }

    update(time: number, delta: number): void {
        if(!this || !this.interactBody) return
        //Move interact body
        this.interactBody.position.x = this.x
        this.interactBody.position.y = this.y

        if(this.isNearPlayer){
            this.setVelocityX(0)
            this.setVelocityY(0)

            if(this.velocity.x === 0 && this.velocity.y === 0) return

            const direction = this.velocity.x > 0 ? "x" : "y"
            const velocitySign = Math.sign(this.velocity[direction])

            if(direction === 'x'){
                this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`)
            }else if(velocitySign === -1){
                this.anims.play(`${this.gender}_${this.spriteKey}_up_idle`)
            }else{
                this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`)
            }


            return
        }

        this.setVelocityY(this.velocity.y)
        this.setVelocityX(this.velocity.x)


        if(this.velocity.y < 0){
            this.anims.play(`${this.gender}_${this.spriteKey}_up_walk`,true)
        }
        else if(this.velocity.x < 0){
            this.anims.play(`${this.gender}_${this.spriteKey}_side_walk`,true)
            this.setFlipX(false)
        }
        else if(this.velocity.y > 0){
            this.anims.play(`${this.gender}_${this.spriteKey}_down_walk`,true)
        }
        else if(this.velocity.x > 0){
            this.anims.play(`${this.gender}_${this.spriteKey}_side_walk`,true)
            this.setFlipX(true)
        }
    }

    generateShop(){
        const market = useMarket()

        //Generate stock
        const discoveredSpices = market.value.prices.map(p=>p.name)
        const spiceStock = {} as Record<string, number>
        discoveredSpices.forEach(s=>{
            spiceStock[s] = randomInteger(10,100)
        })

        //Map to shop
        this.shopItems =  Object.entries(spiceStock).map(([spiceName,stock])=>{
            const price = market.value.prices.find(spice => spice.name === spiceName).price
                return{
                    name: spiceName,
                    price: price,
                    stock: stock,
                    description:info.spiceDescriptions[spiceName]
                }
        }) as IShopItem[]
    }

    //Update shop prices based on market prices
    updateShopPrices(){
        this.shopItems.forEach(spice=>{
            const marketPrice = useMarket().value.prices.find(p=>p.name === spice.name).price
            spice.price = marketPrice + randomInteger(10,20)
        })
    }
}




