export default class NextDayScene extends Phaser.Scene{
    create(){
        //Stops other scenes
        this.scene.stop("Hub")
        this.scene.stop("Docks")

        //Add black background
        this.add.rectangle(0,0,10000,10000,0x000000)
        
        //Add text
        const text = this.add.text(400,300,"The Next Day...",{
            fontSize:"64",
            color:"#ffffff"
        })
        this.tweens.add({
            targets:text,
            duration:5000,
            alpha:0
        })

        const scenes = [this.scene.get("Hub").scene,this.scene.get("Docks").scene]
        scenes.forEach(scene=>{
            //@ts-ignore
            scene.scene.npcs = []
            //@ts-ignore
            scene.scene.player = null

            scene.stop()
        })

        this.time.delayedCall(5000,()=>{
            nextDay()
            this.scene.start("Hub")
        })
    }
}