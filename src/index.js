import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Player from './player';
import TargetCursor from './targetCursor';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        this.player = this.add.existing(new Player(this, 400, 150)).setScale(0.4, 0.4);
        this.player.cursor = this.targetCursor = this.add.existing(new TargetCursor(this, this.player));
    }

    update ()
    {
        let now = Date.now();
        let dt = (now - (this.lastFrame || 0)) / 1000;
        this.targetCursor.update(dt);
        this.player.update(dt);

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