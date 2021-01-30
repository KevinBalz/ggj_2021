import Phaser from "phaser";

const moveSpeed = 100;
var obstacle;

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

        if (this.scene.input.activePointer.isDown && this.shootCooldown <= 0) {
            const speed = 1000;
            const direction = this.cursor.pointer.clone().normalize();
            var bullet = this.scene.physics.add.image(this.cursor.x, this.cursor.y, 'logo')
                .setScale(0.1, 0.1)
                .setVelocity(speed * direction.x, speed * direction.y)
            this.shootCooldown = 0.2;
            this.scene.physics.add.collider(bullet, obstacle, bulletHitObstacle, null, obstacle);
        }

        this.x += moveX * moveSpeed * dt;
        this.y += moveY * moveSpeed * dt;
    } 
}
function bulletHitObstacle(params) {
        //
}