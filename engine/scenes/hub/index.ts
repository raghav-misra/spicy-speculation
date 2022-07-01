import Player from "~~/engine/objects/player"
import Npc from "~~/engine/objects/npc"
import Door from "~~/engine/objects/door";
import PlayerHouse from "~~/engine/objects/playerHouse";

export default class Hub extends Phaser.Scene{
    player:Player;
    npcs:Npc[] = []

    create(){
        this.buildLayers()
        this.cameras.main.roundPixels = true

        this.cameras.main.setBounds(0,0,2464,864)
        this.matter.world.setBounds(0,0,2464,864)
        
        this.player = new Player(this,803,439)
        new PlayerHouse(this)

        this.spawnNpcs()

        //To Docks
        new Door({
            scene:this,
            x:34 * 32,
            y:0,
            width:7*32,
            height:2*32,
            to:"Docks"
        })
    }

    spawnNpcs(){
        const ports = usePlayer().value.ports
        const points = [
            {x:1151,y:270},
            {x:1251,y:370},
            {x:1526,y:555}
        ]

        const importPorts = ports.filter(p=>p.direction === "import")

        const numToSpawn = (importPorts.length  * 2) / 2

        for(let i = 0; i < numToSpawn; i++){
            const point = points[i]
            this.npcs.push(new Npc({
                scene:this,
                x:point.x,
                y:point.y
            }))
        }
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