import Phaser from "phaser";

const moveSpeed = 100;

export default class Player extends Phaser.GameObjects.Image {
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

        this.shootCooldown = 0;
        this.animCooldown = 0;
        this.dashWasDown = scene.input.mousePointer.rightButtonDown();

        var obstacles = this.scene.physics.add.staticGroup();
        obstacle = obstacles.create(600, 500, 'logo');
    }

    update(dt) {
        let moveX = 0;
        let moveY = 0;
        this.shootCooldown -= dt;

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

        if (!this.dashWasDown && this.scene.input.mousePointer.rightButtonDown()) {
            this.scene.tweens.add({
                targets: this,
                x: this.x + moveX * 100,
                y: this.y + moveY * 100,
                duration: 100
            });
        }

        if (this.scene.input.mousePointer.leftButtonDown() && this.shootCooldown <= 0) {
            const speed = 500;
            const off = new Phaser.Math.Vector2(50, 0 * (this.flipY ? -1 : 1)).rotate(this.rotation);
            const spawn = new Phaser.Math.Vector2(this.x + off.x, this.y + off.y);
            const direction = new Phaser.Math.Vector2(this.cursor.x - this.x, this.cursor.y - this.y).normalize();
            const bubble = this.scene.physics.add.image(this.x + off.x, this.y + off.y, 'bubble')
                .setScale(0.025, 0.025)
                .setVelocity(speed * direction.x, speed * direction.y)
            this.shootCooldown = 0.25;
            this.scene.cameras.main.shake(40, 0.025);
            //this.scene.cameras.main.flash(1, 100, 100, 255);
            this.scene.sound.play('bark');

            this.scene.tweens.add({
                targets: bubble,
                scale: 0.05,
                duration: 200,
                repeat: 1337,
                yoyo: true
            });
            this.shootCooldown = 0.2;
            this.scene.physics.add.collider(bubble, obstacle, bulletHitObstacle, null, obstacle);
        }

        this.x += moveX * moveSpeed * dt;
        this.y += moveY * moveSpeed * dt;
    }
}
function bulletHitObstacle(params) {
        //
}