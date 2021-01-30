import Phaser from "phaser";
import doggoLifeImg from './assets/sea_doggo-life.png';

export default class UIScene extends Phaser.Scene
{
    constructor ()
    {
        super('ui');
        this.lifeUI = [];
    }

    preload ()
    {
        this.load.image('doggo-life', doggoLifeImg);
    }

    create ()
    {
        this.player = this.scene.get('main').player;
        for (var i = 0; i < this.player.life; i++) {
            this.lifeUI.push(this.add.image(40 + i * 60, 40, 'doggo-life').setScale(0.1));
        }
    }

    update ()
    {
        if (this.player.life < this.lifeUI.length && this.lifeUI.length > 0) {
            this.lifeUI.pop().destroy();
        }
    }
}