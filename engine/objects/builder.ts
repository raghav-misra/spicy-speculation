import { usePortDisplayState } from "~~/composables/port";

export default class Builder extends Phaser.GameObjects.Sprite{

    isNearPlayer = false
    interactBody: MatterJS.BodyType;

    constructor(scene){
        super(scene,497,1255,"builder")

        this.create()
        scene.matter.add.gameObject(this,scene.matter.bodies.circle(this.x,this.y,30,{
            isSensor:true
        }))

        this.scene.add.existing(this)
    }

    create(){
        this.scene.anims.create({
            key: `builder_idle`,
            frames: this.anims.generateFrameNumbers("builder",{start:0,end:3}),
            repeat: -1,
            frameRate: 10
        })

        this.anims.play("builder_idle")

        this.setScale(1.5)
        this.setDepth(1)

        //Interact body
        this.interactBody = this.scene.matter.add.circle(this.x,this.y+20,50,{
            isSensor: true,
            label: "builder"
        })

         //Detect if player is near
         this.interactBody.onCollideCallback = (event:any) => {
            const hint = useState("hint")
            if(event.bodyA.label === "Player"){
                this.isNearPlayer = true
                hint.value = "Press T to modify your port"
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
            const hint = useState("hint");
            const isPortBoxShowing = usePortDisplayState();
            if (!this.isNearPlayer) return;
            hint.value = null;
            isPortBoxShowing.value.isShowing = true;
        })
        
    }
}




