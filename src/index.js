import Phaser from 'phaser';
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
        this.load.image('logo', 'src/assets/logo.png');
        this.load.image('doggo', 'src/assets/sea_doggo.png');
        this.load.image('doggo2', 'src/assets/sea_doggo-frame2.png');
        this.load.image('doggo-rear', 'src/assets/sea_doggo-rearview.png');
        this.load.image('bubble', 'src/assets/bubble.png');
        this.load.audio('bark', 'src/assets/bark.wav');

        this.load.image('tiles', 'src/assets/map/Tilemap.png');
        this.load.image('tiles2', 'src/assets/map/Tilemap2.png');
        this.load.tilemapTiledJSON('map', 'src/assets/map/Testmap2.json');
    }
      
    create ()
    {
        var map = this.add.tilemap('map');
        var tileset1 = map.addTilesetImage('Tilemap', 'tiles');
        var tileset2 = map.addTilesetImage('Tilemap2', 'tiles2');
        // Bodenlayer
        var layer1 = map.createLayer('ground', [ tileset1, tileset2 ]);
        // Hindernisse, diese Tiles können nicht betreten werden
        var layer2 = map.createLayer('impassable', [ tileset1, tileset2 ]);
        // Kosmetische Tiles, hoher Anteil von Hindernissen, der den Spieler verdeckt.
        var layer3 = map.createLayer('passable', [ tileset1, tileset2 ]);
        // Karte skalieren, damit es zur Figur passt
        layer1.setScale(0.5);
        layer2.setScale(0.5);
        layer3.setScale(0.5);

        this.player = this.add.existing(new Player(this, 400, 150));
        this.player.cursor = this.targetCursor = this.add.existing(new TargetCursor(this, this.player));
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);


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
    scene: MyGame,
};

const game = new Phaser.Game(config);