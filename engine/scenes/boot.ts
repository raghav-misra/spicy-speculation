import buildingsTiles from "../../art_source/tilesets/CL_Buildings.png"
import islandTiles from "../../art_source/tilesets/CL_MainLev.png"
import harborTiles from "../../art_source/tilesets/Harbor.png"

import hubMap from "./hub/hub.json"
import docksMap from "./docks/docks.json"


export default class BootScene extends Phaser.Scene{
    preload(){
        this.load.image('buildingsTiles', buildingsTiles)
        this.load.image('islandTiles', islandTiles)
        this.load.image('harborTiles', harborTiles)
        
        this.load.image('ship_med','/sprites/ship_med.png')
        this.load.image('ship_small','/sprites/ship_small.png')
        this.load.image('port','/sprites/port.png')

        this.load.tilemapTiledJSON('hubMap', hubMap)
        this.load.tilemapTiledJSON('docksMap', docksMap)

        this.load.spritesheet('male_1',"/sprites/Male1.png",{frameWidth:32,frameHeight:48})
        this.load.spritesheet('female_1',"/sprites/Female1.png",{frameWidth:32,frameHeight:48})
        
    }
    create(){
    }
}