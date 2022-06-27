import Player from "~~/engine/objects/player"

export default class Hub extends Phaser.Scene{
    player:Player;

    create(){
        this.buildLayers()
        this.cameras.main.roundPixels = true
        this.player = new Player(this)
    }

    buildLayers(){
        const map = this.make.tilemap({key: 'hubMap'})
        const buildingsSet = map.addTilesetImage('CL_Buildings','buildingsTiles',undefined,undefined)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined)

        map.createLayer("ISLAND_1", islandSet, 0, 0)
        map.createLayer("ISLAND_2", islandSet, 0, 0)

        map.createLayer("ISLAND_BUILDINGS_1", buildingsSet, 0, 0)
        map.createLayer("ISLAND_BUILDINGS_2", buildingsSet, 0, 0)
    }

    update(time: number, delta: number): void {
        this.player.update(time,delta)
    }
}