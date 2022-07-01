import Phaser from "phaser";

//Scenes
import BootScene from "~~/engine/scenes/boot";
import HubScene from "~~/engine/scenes/hub";
import DocksScene from "~~/engine/scenes/docks";
import NextDayScene from "~~/engine/scenes/nextDay";

export const usePhaser = ()=> useState<Phaser.Game>("game",()=>null)
export const createPhaser = ()=>{
    const game = usePhaser()
    game.value = new Phaser.Game({
        type: Phaser.CANVAS,
        pixelArt: true,
        width: 640,
        height: 360,
        backgroundColor: "#0F6463",
        scale: {
            mode: Phaser.Scale.ENVELOP,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics:{
            default: 'matter',
            matter:{
                gravity: {
                    y: 0
                },
                autoUpdate: true,
                enableSleeping: false
            }
        },
        canvas: document.querySelector("#canvas"),
    })

    game.value.scene.add('Boot',BootScene)
    game.value.scene.add('Hub',HubScene)
    game.value.scene.add('Docks',DocksScene)
    game.value.scene.add('NextDay',NextDayScene)

    game.value.scene.start('Boot')
}