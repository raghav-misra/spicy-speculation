import buildingsTiles from "../../art_source/tilesets/CL_Buildings.png"
import islandTiles from "../../art_source/tilesets/CL_MainLev.png.png"
import harborTiles from "../../art_source/tilesets/Harbor.png"

import hubMap from "./hub/hub.json"


export default class BootScene extends Phaser.Scene{
    preload(){
        this.load.image('buildingsTiles', buildingsTiles)
        this.load.image('islandTiles', buildingsTiles)
        this.load.image('harborTiles', harborTiles)

        this.load.tilemapTiledJSON('hubMap', hubMap)
        
    }
    create(){
    }
}