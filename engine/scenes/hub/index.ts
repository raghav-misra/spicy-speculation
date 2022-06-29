import Player from "~~/engine/objects/player"
import Npc from "~~/engine/objects/npc"

export default class Hub extends Phaser.Scene{
    player:Player;
    npcs:Npc[] = []

    create(){
        this.buildLayers()
        this.cameras.main.roundPixels = true

        this.cameras.main.setBounds(0,0,2464,864)
        this.matter.world.setBounds(0,0,2464,864)
        
        this.player = new Player(this,803,439)
        this.npcs.push(new Npc({
            scene:this,
            x:1151,
            y:270,
            gender:"male",
            spriteKey:"B",
            sprite:"male_1"
        }))

        this.npcs.push(new Npc({
            scene:this,
            x:1251,
            y:370,
            gender:"male",
            spriteKey:"C",
            sprite:"male_1"
        }))
    }

    buildLayers(){
        const map = this.make.tilemap({key: 'hubMap'})

        const buildingsSet = map.addTilesetImage('CL_Buildings','buildingsTiles',undefined,undefined)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined)

        map.createLayer("OCEAN", islandSet, 0, 0)
        map.createLayer("ISLAND_1", islandSet, 0, 0)
        map.createLayer("ISLAND_TOP", islandSet, 0, 0).setDepth(5)

        map.createLayer("ISLAND_BUILDINGS_1", buildingsSet, 0, 0)
        map.createLayer("ISLAND_BUILDINGS_TOP", buildingsSet, 0, 0).setDepth(5)

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