import Phaser from "phaser";

export default class Bubble extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
    }

    destroyBubble(){
        this.destroy();
    }

    shootBubble(speed, player, sound){
        //const speed = 500;
        const off = new Phaser.Math.Vector2(50, 0 * (player.flipY ? -1 : 1)).rotate(player.rotation);
        const spawn = new Phaser.Math.Vector2(player.x + off.x, player.y + off.y);
        const direction = new Phaser.Math.Vector2(player.cursor.x - player.x, player.cursor.y - player.y).normalize();

        const bubble = this.scene.physics.add.image(player.x + off.x, player.y + off.y, 'bubble')
        
        player.scene.getBubbleGroup().add(bubble);

        bubble.setScale(0.025, 0.025)
                .setVelocity(speed * direction.x, speed * direction.y)

        player.scene.cameras.main.shake(40, 0.025);
        //this.scene.cameras.main.flash(1, 100, 100, 255);
        player.scene.sound.play(sound);

        player.scene.tweens.add({
            targets: bubble,
            scale: 0.05,
            duration: 200,
            repeat: 1337,
            yoyo: true
        });
    }
}