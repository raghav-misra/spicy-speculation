import Player from "~~/engine/objects/player"
import Npc from "~~/engine/objects/npc"
import Door from "~~/engine/objects/door";
import Port from "~~/engine/objects/port";
import Builder from "~~/engine/objects/builder";

export default class Docks extends Phaser.Scene{
    player:Player;
    npcs:Npc[] = []

    pause(){
        audio.waves.stop()
    }

    create(){
        audio.waves.play()
        audio.waves.fade(0,0.2,1000)
        this.buildLayers()
        this.cameras.main.roundPixels = true

        this.cameras.main.setBounds(0,0,1472,1456)
        this.matter.world.setBounds(0,0,1472,1456)
        
        const playerState = usePlayer();

        if(playerState.value.isTutorial){
            this.player = new Player(this,709,48)
            this.startTutorial()
        }else{
            this.player = new Player(this,22.5*32,43*32)
        }
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
                ship:port.ship,
                index:i
            })
        })

        exportPorts.forEach((port,i)=>{
            new Port({
                scene:this,
                x:256,
                y:500 - (200*i),
                direction:'export',
                ship:port.ship,
                index:i
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
            {x:709,y:1000},
            {x:1088,y:960},
            {x:192,y:768}
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

        new Builder(this)
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

    async startTutorial(){
        const lockPlayer = useMovementLocked()
        const market = useMarket() 
        const overlayState = useOverlayState();

        for (const key in overlayState.value) {
            overlayState.value[key].isShowing = false;
        }

        market.value.isEnabled = false
        lockPlayer.value = true

        await showConversation(info.tutorialName,[
            "Welcome to Isla Chipotle! This island is located in the center of the spice trade, and you will turn it into a prosperous trading hub!",
            "You can use the W,A,S,D keys to move around.",
        ])

        lockPlayer.value = false

        while(this.player.y < 400){
            await wait(100)
        }

        lockPlayer.value = true
        await showConversation(info.tutorialName,[
            "How does one turn an island into a trading hub?",
            "It's simple! Buy and sell spices to make money!",
            "For example, to buy spices you can talk with traders roaming around the island.",
            "You can also check out ports on the RIGHT which will sell spices in BULK quantities.",
            "When the time is right, you can use ports on the LEFT to sell spices!",
            "We have provided two ports for you to use, but you are free to upgrade your docks to add more ports!"
        ])
        lockPlayer.value = false

        while(this.player.y < 900 || (this.player.x  > 778 || this.player.x < 628)){
            await wait(100)
        }

        lockPlayer.value = true
        await showConversation(info.tutorialName,[
            `We anticipate that Isla Chipotle will be a popular destination for spice traders, 
            as it's dead center in the ${info.ocean}.`,
            "You can talk to other traders to hear the latest news and conduct business!",
            "As you expand and build your port, more people will stop by to trade with you!",
        ])

        lockPlayer.value = false

        while(this.player.y < 1091)
        {
            await wait(100)
        }

        lockPlayer.value = true
        await showConversation(info.tutorialName,[
            "To your left, you can find our trusty construction company!",
            "If you ever want to expand your operation, you can purchase a new dock here.",
            "If you continue walking, you will reach this island's hub!",
            "This is an area where traders mingle. We have also built a house there for you to live in!",
            "Ships arrive daily, so if you finish everything you can, take a rest and come back tomorrow!",
            "Let's checkout the hub now!"
        ])

        //@ts-ignore
        this.scene.switch("Hub",true)
    }
}