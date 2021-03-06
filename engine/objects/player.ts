export default class Player extends Phaser.GameObjects.Sprite{

    keys: Record<string,Phaser.Input.Keyboard.Key> = {}
    setVelocityY: (y)=>void
    setVelocityX: (x)=>void

    gender = "male"
    spriteKey = "A"
    speed = 2.25

    constructor(scene:Phaser.Scene,x,y){
        super(scene,x,y,"male_1")
        this.create()
        scene.cameras.main.startFollow(this,false,0.3)
        scene.matter.add.gameObject(this,scene.matter.bodies.rectangle(x,y,16,32,{
            inertia: Infinity,
            mass:100,
            label: "Player",
        }))
        this.originY = 0.6

        scene.add.existing(this)
    }

    create(){
        this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,E,space",false) as Record<string,Phaser.Input.Keyboard.Key>
        this.buildAllAnimations(this.scene)

        this.setScale(1.5)
        this.setDepth(3)

        //Idle animations
        this.keys.W.on('up',()=>this.anims.play(`${this.gender}_${this.spriteKey}_up_idle`))
        this.keys.A.on('up',()=>this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`))
        this.keys.D.on('up',()=>this.anims.play(`${this.gender}_${this.spriteKey}_side_idle`))
        this.keys.S.on('up',()=>this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`))

        this.anims.play(`${this.gender}_${this.spriteKey}_down_idle`)

        //Tick the market
        this.scene.time.addEvent({
            callback: ()=>{
                stepMarket()
                saveGame()
            },
            delay:5 * 1000,
            loop:true
        })
        
    }

    update(time: number, delta: number): void {
        const player = usePlayer()
        const isLocked = useMovementLocked().value        
        if(isLocked) return

        if(this.keys.W.isDown){
            this.setVelocityY(-this.speed)
            this.anims.play(`${this.gender}_${this.spriteKey}_up_walk`,true)
        }
        else if(this.keys.A.isDown){
            this.setVelocityX(-this.speed)
            this.anims.play(`${this.gender}_${this.spriteKey}_side_walk`,true)
            this.setFlipX(false)
        }
        else if(this.keys.S.isDown){
            this.setVelocityY(this.speed)
            this.anims.play(`${this.gender}_${this.spriteKey}_down_walk`,true)
        }
        else if(this.keys.D.isDown){
            this.setVelocityX(this.speed)
            this.anims.play(`${this.gender}_${this.spriteKey}_side_walk`,true)
            this.setFlipX(true)
        }

        if(!this.keys.A.isDown && !this.keys.D.isDown){
            this.setVelocityX(0)
        }
        
        if(!this.keys.W.isDown && !this.keys.S.isDown){
            this.setVelocityY(0)
        }

        player.value.x = this.x
        player.value.y = this.y
    }

    buildAllAnimations(scene:Phaser.Scene){
        this.createHumanAnimation(scene,"male","A",0)
        this.createHumanAnimation(scene,"male","B",24)
        this.createHumanAnimation(scene,"male","C",48)
        this.createHumanAnimation(scene,"male","D",72)

        this.createHumanAnimation(scene,"female","A",0)
        this.createHumanAnimation(scene,"female","B",24)
        this.createHumanAnimation(scene,"female","C",48)
        this.createHumanAnimation(scene,"female","D",72)
        
    }

    createHumanAnimation(scene:Phaser.Scene,gender:string,key:string,startFrame:number){
        let frame = startFrame
    
        scene.anims.create({
            key: `${gender}_${key}_side_idle`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
    
        frame += 4
    
        scene.anims.create({
            key: `${gender}_${key}_side_walk`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
    
        frame += 4
    
        scene.anims.create({
            key: `${gender}_${key}_down_idle`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
        
        frame += 4
    
        scene.anims.create({
            key: `${gender}_${key}_down_walk`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
    
    
        frame += 4
    
        scene.anims.create({
            key: `${gender}_${key}_up_idle`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
    
        frame += 4
    
        scene.anims.create({
            key: `${gender}_${key}_up_walk`,
            frames: this.anims.generateFrameNumbers(`${gender}_1`,{start:frame,end:frame+3}),
            repeat: -1,
            frameRate: 10
        })
    }
}




