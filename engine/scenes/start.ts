export default class StartScene extends Phaser.Scene{
    create(){
        const player = usePlayer()
        //Stops other scenes
        this.scene.stop("Hub")
        this.scene.stop("Docks")

        this.time.delayedCall(100,()=>{
            if(player.value.isTutorial){
                //@ts-ignore
                this.scene.start("Docks",true)
            }else{
                this.scene.start("Hub")
            }
        })
    }
}