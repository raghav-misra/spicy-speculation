export default class StartScene extends Phaser.Scene{
    create(){
        //Stops other scenes
        this.scene.stop("Hub")
        this.scene.stop("Docks")

        this.time.delayedCall(100,()=>{
            //@ts-ignore
            this.scene.start("Docks",true)
        })
    }
}