interface ShipConfig{
    type:"med"|"small",
    scene:Phaser.Scene,
    x:number,
    y:number
}

export interface ShipState{
    direction: 'import'|'export',
    prices?: {[key:string]:number},
    type: 'med'|'small',
    name: string,
    inventory: {[key:string]:number}
}

export default class Ship extends Phaser.GameObjects.Sprite{
    constructor({type,scene,x,y}:ShipConfig){
            super(scene,x,y,`ship_${type}`)
            this.scene.add.existing(this)

            this.setDepth(5)
    }

    sail(direction:"import"|"export"){
        //Tween away from port
        this.scene.tweens.add({
            targets: this,
            x: direction === "export" ? -500 : 2000,
            duration: 10000,
            ease: 'Sine.easeInQuad'
        })
    }
}