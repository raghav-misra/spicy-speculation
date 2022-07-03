export default class NextDayScene extends Phaser.Scene{
    create(){
        const player = usePlayer()
        player.value.days += 1
        audio.bg.fade(0.1,0,4000)
        resetNpcs()
        
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
            duration:200,
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
            audio.bg.seek(0)
            audio.bg.fade(0,0.1,2000)
            nextDay()
            saveGame()
            this.scene.start("Hub")
        })
    }
}