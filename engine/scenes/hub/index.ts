import Player from "~~/engine/objects/player"

export default class Hub extends Phaser.Scene{
    player:Player;

    create(){
        this.buildLayers()
        this.cameras.main.roundPixels = true
        this.cameras.main.setBounds(0,0,2464,864)
        this.player = new Player(this)
    }

    buildLayers(){
        const map = this.make.tilemap({key: 'hubMap'})

        const buildingsSet = map.addTilesetImage('CL_Buildings','buildingsTiles',undefined,undefined)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined)

        map.createLayer("OCEAN", islandSet, 0, 0)
        map.createLayer("ISLAND_1", islandSet, 0, 0)
        map.createLayer("ISLAND_2", islandSet, 0, 0).setDepth(5)

        map.createLayer("ISLAND_BUILDINGS_1", buildingsSet, 0, 0).setDepth(5)
        map.createLayer("ISLAND_BUILDINGS_2", buildingsSet, 0, 0).setDepth(5)

        const collisions = map.createLayer('COLLISIONS', null, 0, 0)
        collisions.setCollisionByExclusion([-1])
        this.matter.world.convertTilemapLayer(collisions)

    }

    update(time: number, delta: number): void {
        this.player.update(time,delta)
    }
}