import Phaser from 'phaser';
import backgroundImage from './assets/title_screen.png';
import titleImage from './assets/doggolantis.png';


class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('title_screen', backgroundImage);
        this.load.image('doggolantis', titleImage);
    }

    create(){
        var background = this.add.image(0, 0, 'title_screen');
        background.setOrigin(0, 0);

        var title = this. add.image(60, 70, 'doggolantis');
        title.scale = title.scale * 0.85;
        title.setOrigin(0, 0);

        //var startButton = new startButton(MyGame, 100, 100, )
        const startButton = this.add.text(60, 480, 'Start Game', { fill: '#fff' });
        startButton.setInteractive()
                    .on('pointerdown', () => this.scene.start('main'));
        startButton.scale = startButton.scale * 2.3;
    }
}

export default TitleScene