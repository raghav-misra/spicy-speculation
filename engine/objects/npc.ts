interface NPCConfig{
    gender?:string,
    sprite?:string,
    spriteKey?:string,
    x:number,
    y:number,
    scene:Phaser.Scene
}

export default class Player extends Phaser.GameObjects.Sprite{

    keys: Record<string,Phaser.Input.Keyboard.Key> = {}
    setVelocityY: (y)=>void
    setVelocityX: (x)=>void

    gender:string;
    spriteKey:string;

    speed = 1.5

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
        
    }

    randomWalk(){
        const direction = (Math.random() > 0.5) ? "x" : "y"
        this.velocity[direction] =(Math.random() > 0.5) ? this.speed : -this.speed

        const walkTime = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)
        const waitTime = walkTime  + Math.floor(Math.random() * (5000 - 2000 + 1) + 2000)

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
            delay:waitTime,
            callback:()=>{
                this.randomWalk()
            }
        })
    }

    update(time: number, delta: number): void {
        if(!this) return
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




