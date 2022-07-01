interface PortConfig{
    scene:Phaser.Scene,
    x:number,
    y:number,
    direction:'import'|'export',
}

export default class Port extends Phaser.GameObjects.Sprite{
    constructor({x,y,direction,scene}:PortConfig){
        super(scene,x,y,"port")

        this.scene.matter.add.gameObject(this,{
            isSensor: true
        })

        this.x = this.width/2 + x
        this.y = this.height/2 + y

        if(direction === 'export') this.setFlipX(true)

        this.scene.add.existing(this)
        //Get anything body is touching
        const body = this.body as MatterJS.BodyType
        body.onCollideCallback = (event:any) => {
            if(event.bodyA.label != `Player`){
                //Destroy body
                this.scene.matter.world.remove(event.bodyA)
            }
        }

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

    }   
}