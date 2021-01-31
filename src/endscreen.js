import Phaser from 'phaser';
import backgroundImage from './assets/End.png';


class EndScene extends Phaser.Scene{
    constructor(){
        super({key:'EndScene'});
    }

    preload(){
        this.load.image('end_screen', backgroundImage);
    }

    create(){
        var background = this.add.image(0, 0, 'end_screen');
        background.setOrigin(0, 0);
    }
}

export default EndScene