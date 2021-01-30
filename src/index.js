import Phaser from 'phaser';
import Player from './player';
import Enemy from './enemy';
import TargetCursor from './targetCursor';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('doggo', 'src/assets/sea_doggo.png');
        this.load.image('doggo2', 'src/assets/sea_doggo-frame2.png');
        this.load.image('doggo-rear', 'src/assets/sea_doggo-rearview.png');
        this.load.image('bubble', 'src/assets/bubble.png');
        this.load.image('pufferfish', 'src/assets/kugelfisch.png');
        this.load.image('pufferfishSpike', 'src/assets/kugelfisch-bullet.png');
        this.load.audio('bark', 'src/assets/bark.wav');
        this.load.audio('puff', 'src/assets/puff.wav');
        this.load.audio('dash', 'src/assets/dash.wav');
    }
      
    create ()
    {
        this.player = this.add.existing(new Player(this, 400, 150));
        this.player.cursor = this.targetCursor = this.add.existing(new TargetCursor(this, this.player)).setDepth(999999999999);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
        this.enemy = this.add.existing(new Enemy(this, 400, 150));
    }

    update ()
    {
        let now = Date.now();
        let dt = (now - (this.lastFrame || 0)) / 1000;
        this.targetCursor.update(dt);
        this.player.update(dt);
        this.enemy.update(dt);

        this.lastFrame = now;
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: MyGame
};

const game = new Phaser.Game(config);