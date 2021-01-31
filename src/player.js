import Phaser from "phaser";
import Bubble from "./bubble";

const moveSpeed = 100;

export default class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'doggo', 0);
        this.life = 5;
        this.setScale(0.1, 0.1);

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

        this.dashWasDown = this.scene.input.mousePointer.rightButtonDown();
        this.dashing = false;
    }

    update(dt) {
        let moveX = 0;
        let moveY = 0;
        this.shootCooldown -= dt;
        this.animCooldown -= dt;
        this.rotation = Math.atan2(this.cursor.y - this.y, this.cursor.x - this.x);
        if (this.angle < 0) {
            this.setTexture('doggo-rear');
        }
        else if (this.angle > 45 && this.angle < 135) {
            this.setTexture('doggoDown');
        }
        else if (this.texture.key !== 'doggo' && this.texture.key !== 'doggo2'){
            this.setTexture('doggo');
        }

        if ((this.angle > -90 && this.angle < 90) || (this.texture.key !== 'doggo' && this.texture.key !== 'doggo2' && this.texture.key !== 'doggo-rear')) {
            this.flipY = false;
        }
        else {
            this.flipY = true;
        }

        if (this.animCooldown <= 0 && (this.texture.key === 'doggo' || this.texture.key === 'doggo2')) {
            //this.setTexture(this.texture.key === 'doggo' ? 'doggo2' : 'doggo');
            //this.animCooldown = 0.5;
        }

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

        if (!this.dashing && !this.dashWasDown && this.scene.input.mousePointer.rightButtonDown()) {
            this.dashing = true;
            this.scene.tweens.add({
                targets: this,
                x: this.x + moveX * 200,
                y: this.y + moveY * 200,
                duration: 300,
                onComplete: () => this.dashing = false
            });
            this.scene.sound.play('dash');
        }

        if (!this.dashing && this.scene.input.mousePointer.leftButtonDown() && this.shootCooldown <= 0) {
            const speed = 1000;
            var bubble = this.scene.add.existing(new Bubble(this.scene, this.x, this.y));
            bubble.shootBubble(speed, this, 'bark');
            const off = new Phaser.Math.Vector2(50, 0 * (this.flipY ? -1 : 1)).rotate(this.rotation);
            const spawn = new Phaser.Math.Vector2(this.x + off.x, this.y + off.y);
            const direction = new Phaser.Math.Vector2(this.cursor.x - this.x, this.cursor.y - this.y).normalize();
            //const bubble = this.scene.physics.add.image(this.x + off.x, this.y + off.y, 'bubble')
            //    .setScale(0.025, 0.025)
            //    .setVelocity(speed * direction.x, speed * direction.y)
            this.shootCooldown = 0.5;
            this.scene.cameras.main.shake(40, 0.005);
            //this.scene.cameras.main.flash(1, 100, 100, 255);
            this.scene.sound.play('bark');

            this.scene.tweens.add({
                targets: bubble,
                scale: 0.05,
                duration: 200,
                repeat: 1337,
                yoyo: true
            });
            //this.scene.physics.add.collider(bubble, this.scene.staticGroup, (bubble) => bubble.destroy(), null, this.scene);
        }


        this.body.setVelocity(moveX * moveSpeed, moveY * moveSpeed);
        //this.x += moveX * moveSpeed * dt;
        //this.y += moveY * moveSpeed * dt;
        this.dashWasDown = this.scene.input.mousePointer.rightButtonDown();
    }

    hurt() {
        this.scene.sound.play('hurt');
        this.scene.cameras.main.flash(5);
        this.scene.cameras.main.shake(200, 0.05);
        this.life--;
    }
}