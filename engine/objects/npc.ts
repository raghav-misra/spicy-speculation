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
            const gender = pickRandom(["male","female"])
            super(scene,x,y,`${gender}_1`)

            this.gender = gender
            this.spriteKey = pickRandom(["B","C","D"])

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

        //Idle animations
        this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`)

        this.randomWalk()

        //Interact body
        this.interactBody = this.scene.matter.add.circle(this.x,this.y,30,{
            isSensor: true,
            label: "npc"
        })

         //Detect if player is near
        this.interactBody.onCollideCallback = (event:any) => {
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = true
            }
        }
        this.interactBody.onCollideEndCallback = (event:any) => {
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = false
            }
        }

        //Handle interaction
        this.scene.input.keyboard.on("keydown-T",()=>{
            if(!this.isNearPlayer) return

            //@TODO: Add functions for dialogue
        })
        
    }

    randomWalk(){
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
}




