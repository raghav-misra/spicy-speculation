import { ShipState } from "./ship"
import Ship from "./ship"

interface PortConfig{
    scene:Phaser.Scene,
    x:number,
    y:number,
    direction:"import"|"export",
    ship?:ShipState
}

export default class Port extends Phaser.GameObjects.Sprite{
    shipObject: Ship|null
    constructor({x,y,direction,scene,ship}:PortConfig){
        super(scene,x,y,"port")

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
            console.log(event.bodyA.label)
            if(event.bodyA.label != `Player` && event.bodyA.label != `port`){
                //Destroy body
                this.scene.matter.world.remove(event.bodyA)
            }else if(event.bodyA.label === `Player`){
                //@TODO Trigger import/export ui
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

        //Create a ship
        if(!ship) return
         
        this.shipObject = new Ship({
            scene:this.scene,
            x:(direction === 'export') ?this.x +  -30 : this.x + 30,
            y:this.y - 10,
            ...ship
        })
    }   
}