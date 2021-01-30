import Phaser from "phaser";

const movementSpeed = 20;
const targetDistance = 300;
const normalScale = 0.1;

export default class Enemy extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'pufferfish', 0);
        this.setScale(normalScale);
        this.shootCooldown = 0;
    }

    update(dt) {
        this.shootCooldown -= dt;
        const diff = new Phaser.Math.Vector2(this.scene.player.x - this.x, this.scene.player.y - this.y);
        if (diff.length() > targetDistance) {
            if (this.blowUp) {
                this.blowUp.stop();
                delete this.blowUp;
                this.startBlowDown();
                return;
            }
            if (!this.blowDown) {
                const direction = diff.normalize();

                this.x += direction.x * movementSpeed * dt;
                this.y += direction.y * movementSpeed * dt;
            }
        }
        else if (!this.blowUp && this.shootCooldown <= 0) {
            if (this.blowDown) {
                this.blowDown.stop();
                delete this.blowDown;
            }
            this.blowUp = this.scene.tweens.add({
                targets: this,
                scale: normalScale * 2,
                duration: 3000,
                onComplete: onCompleteBlowUp,
                onCompleteParams: [ this ]
            });
        }

    }

    startBlowDown() {
        this.blowDown = this.scene.tweens.add({
            targets: this,
            scale: normalScale,
            duration: 1000,
            onComplete: onCompleteBlowDown,
            onCompleteParams: [ this ]
        });
    }
}

function onCompleteBlowDown(tween, targets, enemy)
{
    delete enemy.blowDown;
}

const bulletOff = 80;
const bulletSpeed = 100;

function onCompleteBlowUp(tween, targets, enemy)
{
    delete enemy.blowUp;
    for (let i = 0; i < 8; i++) {
        let rad = i * Math.PI / 4;
        let spawn = new Phaser.Math.Vector2(enemy.x + bulletOff * Math.cos(rad), enemy.y + bulletOff * Math.sin(rad));
        let direction = spawn.clone().subtract(new Phaser.Math.Vector2(enemy.x, enemy.y)).normalize();
        enemy.scene.physics.add.image(spawn.x, spawn.y, 'pufferfishSpike')
        .setVelocity(direction.x * bulletSpeed, direction.y * bulletSpeed)
        .setScale(0.1)
        .setRotation(Math.atan2(direction.y, direction.x))
        .setFlipX(true);
    }

    enemy.scene.sound.play('puff')
    enemy.startBlowDown();
    enemy.shootCooldown = 1.5;
}