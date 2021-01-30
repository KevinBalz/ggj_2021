import Phaser from "phaser";

const targetRadius = 100;

export default class TargetCursor extends Phaser.GameObjects.Image {
    constructor(scene, player) {
        super(scene, 0, 0, 'logo', 0)
        this.setScale(0.1, 0.1);
        this.setVisible(false);
        this.player = player;
        this.pointer = new Phaser.Math.Vector2();

        scene.input.on('pointerdown', function (pointer) {
            if (!this.scene.input.mouse.locked) {
                this.pointer = new Phaser.Math.Vector2(pointer.x - player.x, pointer.y - player.y);
                this.limitPointer();
            }
            scene.input.mouse.requestPointerLock();
        }, this);

        scene.input.keyboard.on('keydown-Q', function (event) {
            if (this.scene.input.mouse.locked)
            {
                this.scene.input.mouse.releasePointerLock();
            }
        }, this);

        scene.input.on('pointermove', function (pointer) {
            if (this.scene.input.mouse.locked)
            {
                this.pointer = new Phaser.Math.Vector2(this.pointer.x + pointer.movementX, this.pointer.y + pointer.movementY);
                this.limitPointer();
            }
        }, this);
    }

    update(dt) {
        this.visible = this.scene.input.mouse.locked;
        this.x = this.player.x + this.pointer.x;
        this.y = this.player.y + this.pointer.y;
    }

    limitPointer() {
        //console.log(this.pointer.limit);
        this.pointer.limit(targetRadius);
    }

}