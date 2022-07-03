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
        
        new PlayerHouse(this)

        this.spawnNpcs()

        const playerState = usePlayer();
        
        if (playerState.value.isTutorial) {
            this.startTutorial();
            this.player = new Player(this,1071,82)
        } else{
            this.player = new Player(this,803,439)
        }

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

    async startTutorial() {
        const player = usePlayer();
        const lockPlayer = useMovementLocked();
        const overlayState = useOverlayState();

        lockPlayer.value = true;
        await showConversation(info.tutorialName, [
            `Welcome to your island's hub! 
            This is where you can trade with 
            merchants and rest after a spicy day's work.`,
            `Before I send you off to explore, let's go over the
            ever-competitive global spice economy that ${info.country}
            needs ${info.country}'s help to dominate.
            `
        ]);

        overlayState.value.moneyBox = {
            isShowing: true,
            isPulsing: true,
        }

        await showConversation(info.tutorialName, [
            `In the top left, is the balance in ${info.island}'s official colony bank account.
            As the generous minister I am, I've given you $${player.value.money.toLocaleString()} to start off.`
        ]);

        overlayState.value.inventoryBox = {
            isShowing: true,
            isPulsing: true,
        }

        await showConversation(info.tutorialName, [
            `Right under your account balance, is your island's spice rack.
            This displays how much of each spice you have available to sell.`,
            `Right now, you have 2 peppers, provided complimentary by the spiciest minister alive.
            You have two sources to increase the spices in your rack: by importing from foreign trade ships, 
            or trading with merchants on the island.`,
            `As the days go by, ${info.country}'s top economists will find you more spices, 
            increasing the diversity of your sales and creating more revenue sources.`,
        ]);

        overlayState.value.newsOpenBox = {
            isShowing: true,
            isPulsing: true,
        }

        await showConversation(info.tutorialName, [
            `You see that? In the top right? That's your goto source for updates on the state of the island and the world!`,
            `Keep an eye on your newspaper, as spice prices tend to change based on the state of the world.`
        ]);

        overlayState.value.marketPriceBox = {
            isShowing: true,
            isPulsing: true,
        }

        await showConversation(info.tutorialName, [
            `Lastly but most importantly, are your market prices. 
            These show the current prices of individual spices in the market.`,
            `As more spices are discovered, they'll add to the market. 
            You'll buy and sell all your spices at their market price, 
            so rule of thumb: buy low & sell high.`,
            `We have just begun the process of transforming this island into a globally dominant trade center!`,
            `Your MISSION: Build FOUR more ports & make $1,000,000 to cement ${info.country}'s stance as a economic powerhouse!`,
            `We're rooting for you and ${info.island}.
            Make your nation proud!`,
        ]);

        const market = useMarket();
        market.value.isEnabled = true;
        lockPlayer.value = false;
        player.value.isTutorial = false;
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