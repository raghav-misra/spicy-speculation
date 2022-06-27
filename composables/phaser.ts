import Phaser from "phaser";

//Scenes
import BootScene from "~~/engine/scenes/boot";
import HubScene from "~~/engine/scenes/hub";

export const usePhaser = ()=> useState<Phaser.Game>("game",()=>null)
export const createPhaser = ()=>{
    const game = usePhaser()
    game.value = new Phaser.Game({
        type: Phaser.WEBGL,
        pixelArt: true,
        width: 640,
        height: 360,
        backgroundColor: "#0F6463",
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        canvas: document.querySelector("#canvas"),
    })

    game.value.scene.add('Boot',BootScene)
    game.value.scene.add('Hub',HubScene)

    game.value.scene.start('Boot')
}