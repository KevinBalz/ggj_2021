import Phaser from 'phaser';
import backgroundImage from './assets/title_screen.png';


class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('title_screen', backgroundImage);
    }

    create(){
        var background = this.add.image(0, 0, 'title_screen');
        background.setOrigin(0, 0);

        //var startButton = new startButton(MyGame, 100, 100, )
        const startButton = this.add.text(100, 100, 'Start Game', { fill: '#fff' });
        startButton.setInteractive()
                    .on('pointerdown', () => this.scene.start('main'));
    }
}

export default TitleScene