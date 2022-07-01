import Player from "~~/engine/objects/player"
import Npc from "~~/engine/objects/npc"
import Door from "~~/engine/objects/door";
import Port from "~~/engine/objects/port";

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

        const player = usePlayer()

        this.spawnNpcs()

        const importPorts = player.value.ports.filter(port=>port.direction === "import")
        const exportPorts = player.value.ports.filter(port=>port.direction === "export")
        
        importPorts.forEach((port,i)=>{
            new Port({
                scene:this,
                x:800,
                y:500 - (200*i),
                direction:'import',
                ship:port.ship
            })
        })

        exportPorts.forEach((port,i)=>{
            new Port({
                scene:this,
                x:256,
                y:500 - (200*i),
                direction:'export',
                ship:port.ship
            })
        })

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

    spawnNpcs(){
        const ports = usePlayer().value.ports
        const points = [
            {x:1088,y:960},
            {x:192,y:768},
            {x:709,y:695}
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
        const map = this.make.tilemap({key: 'docksMap'})

        const harborSet = map.addTilesetImage('Harbor','harborTiles',undefined,undefined)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined)

        map.createLayer("OCEAN", islandSet, 0, 0)
        map.createLayer("ISLAND", islandSet, 0, 0)
        map.createLayer("HARBOR_TOP", harborSet, 0, 0).setDepth(6)
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