interface DoorConfig{
    scene:Phaser.Scene,
    x:number,
    y:number,
    width:number,
    height:number,
    to:string
}


export default class Door extends Phaser.GameObjects.Rectangle{
    constructor({scene,x,y,width,height,to}:DoorConfig){
        super(scene,x,y,width,height,0xffffff,0)
        this.scene.add.existing(this)
        this.scene.matter.add.gameObject(this,scene.matter.bodies.rectangle(x,y,width,height,{
            isSensor: true
        }))
        

        //Collision events
        const body = this.body as MatterJS.BodyType
        //Detect if player is near
        body.onCollideCallback = (event:any) => {
            if(event.bodyA.label === `Player`){
                //@ts-ignore
                scene.pause && scene.pause()
                this.scene.scene.switch(to)
            }
        }
    }
}