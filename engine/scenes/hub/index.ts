export default class Hub extends Phaser.Scene{
    create(){
        this.buildLayers()
    }

    buildLayers(){
        const map = this.make.tilemap({key: 'hubMap'})
        const buildingsSet = map.addTilesetImage('CL_Buildings','buildingsTiles',undefined,undefined,1,2)
        const islandSet = map.addTilesetImage('CL_MainLev','islandTiles',undefined,undefined,1,2)
        
        map.createLayer("ISLAND_1", islandSet, 0, 0)
        map.createLayer("ISLAND_2", islandSet, 0, 0)
        map.createLayer("ISLAND_3", islandSet, 0, 0)

        map.createLayer("OCEAN", islandSet, 0, 0)

        map.createLayer("ISLAND_BUILDINGS_1", buildingsSet, 0, 0)
        map.createLayer("ISLAND_BUILDINGS_2", buildingsSet, 0, 0)
    }
}