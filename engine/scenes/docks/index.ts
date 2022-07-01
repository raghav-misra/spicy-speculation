import Player from "~~/engine/objects/player"
import Npc from "~~/engine/objects/npc"
import Door from "~~/engine/objects/door";

export default class Docks extends Phaser.Scene{
    player:Player;
    npcs:Npc[] = []

    create(){
        this.buildLayers()
        this.cameras.main.roundPixels = true

        this.cameras.main.setBounds(0,0,1472,1456)
        this.matter.world.setBounds(0,0,1472,1456)
        
        this.player = new Player(this,22.5*32,43*32)
        this.player.speed = 1.5

        this.npcs.push(new Npc({
            scene:this,
            x:1088,
            y:960
        }))

        this.npcs.push(new Npc({
            scene:this,
            x:192,
            y:768
        }))

        //To Hub
        new Door({
            scene:this,
            to:"Hub",
            x:23*32,
            y:45*32,
            width:9*32,
            height:32
        })
    }

    buildLayers(){
        const map = this.make.tilemap({key: 'docksMap'})

        const harborSet = map.addTilesetImage('Harbor','harborTiles',undefined,undefined)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined)

        map.createLayer("OCEAN", islandSet, 0, 0)
        map.createLayer("ISLAND", islandSet, 0, 0)
        map.createLayer("HARBOR_TOP", harborSet, 0, 0).setDepth(5)
        map.createLayer("HARBOR_STAIRS", harborSet, 0, 0).setDepth(2)
        map.createLayer("HARBOR", harborSet, 0, 0)
        

        const collisions = map.createLayer('COLLISIONS', null, 0, 0)
        collisions.setCollisionByExclusion([-1])
        this.matter.world.convertTilemapLayer(collisions)

    }

    update(time: number, delta: number): void {
        this.player.update(time,delta)
        this.npcs.forEach(npc=>{
            npc.update(time,delta)
        })
    }
}