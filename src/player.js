import Phaser from "phaser";

const moveSpeed = 100;

export default class extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'logo', 0)

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(dt) {
        let moveX = 0;
        let moveY = 0;

        if (this.keyW.isDown || this.keyUp.isDown) {
            moveY -= 1;
        }
        if (this.keyS.isDown || this.keyDown.isDown) {
            moveY += 1;
        }
        if (this.keyA.isDown || this.keyLeft.isDown) {
            moveX -= 1;
        }
        if (this.keyD.isDown || this.keyRight.isDown) {
            moveX += 1;
        }

        this.x += moveX * moveSpeed * dt;
        this.y += moveY * moveSpeed * dt;
    }
}