import Phaser from "phaser";

const moveSpeed = 100;

export default class extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'logo', 0)

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(dt) {
        let moveX = 0;
        let moveY = 0;

        if (this.keyW.isDown) {
            moveY -= 1;
        }
        if (this.keyS.isDown) {
            moveY += 1;
        }
        if (this.keyA.isDown) {
            moveX -= 1;
        }
        if (this.keyD.isDown) {
            moveX += 1;
        }

        this.x += moveX * moveSpeed * dt;
        this.y += moveY * moveSpeed * dt;
    }
}