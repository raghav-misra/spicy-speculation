export default class PlayerHouse extends Phaser.GameObjects.Rectangle{
    isNearPlayer:boolean = false

    constructor(scene:Phaser.Scene){
        super(scene,810,439,50,16,0xffffff,0)
        this.scene.add.existing(this)
        this.scene.matter.add.gameObject(this,{
            isSensor: true
        })
        
        const hint = useState("hint")

        //Collision events
        const body = this.body as MatterJS.BodyType

        //Detect if player is near
        body.onCollideCallback = (event:any) => {
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = true
                hint.value = "Press T to sleep until tomorrow"
            }
        }
        body.onCollideEndCallback = (event:any) => {
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = false
                hint.value = null
                
            }
        }

        //Handle interaction
        this.scene.input.keyboard.on("keydown-T", () => {
            if (!this.isNearPlayer) return;
            hint.value = null
            this.scene.scene.start("NextDay")
        })
    }
}