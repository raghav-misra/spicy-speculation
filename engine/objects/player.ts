export default class Player extends Phaser.GameObjects.Rectangle{

    keys: Record<string,Phaser.Input.Keyboard.Key> = {}

    constructor(scene:Phaser.Scene){
        super(scene,1000,800,32,48,0xff0000)
        this.create()
        scene.cameras.main.startFollow(this,false,0.3)
        scene.add.existing(this)
    }

    create(){
        this.keys = this.scene.input.keyboard.addKeys("W,A,S,D,E,space",false) as Record<string,Phaser.Input.Keyboard.Key>
        
    }

    update(time: number, delta: number): void {
        if(this.keys.W.isDown){
            this.y -= 10
        }

        if(this.keys.A.isDown){
            this.x -= 10
        }

        if(this.keys.S.isDown){
            this.y += 10
        }

        if(this.keys.D.isDown){
            this.x += 10
        }
    }
}