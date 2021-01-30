import Phaser from 'phaser';
import Player from './player';
import Enemy from './enemy';
import UIScene from './ui';
import TargetCursor from './targetCursor';

import logoImg from './assets/logo.png';
import doggoImg from './assets/sea_doggo.png';
import doggo2Img from './assets/sea_doggo-frame2.png';
import doggo_rearImg from './assets/sea_doggo-rearview.png';
import bubbleImg from './assets/bubble.png';
import pufferfishImg from './assets/kugelfisch.png';
import pufferfishSpikeImg from './assets/kugelfisch-bullet.png';
import barkClip from './assets/bark.wav';
import puffClip from './assets/puff.wav';
import dashClip from './assets/dash.wav';
import hitClip from './assets/hit.wav';
import hurtClip from './assets/hurt.wav';
import mainTheme from './assets/sea_doggo_theme-mastered.mp3';

import tilesPng from './assets/map/Tilemap.png';
import tiles2Png from './assets/map/Tilemap2.png';
import tilemapTiledJSON from './assets/map/Testmap2.json';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super('main');
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('doggo', doggoImg);
        this.load.image('doggo2', doggo2Img);
        this.load.image('doggo-rear', doggo_rearImg);
        this.load.image('bubble', bubbleImg);
        this.load.image('pufferfish', pufferfishImg);
        this.load.image('pufferfishSpike', pufferfishSpikeImg);
        this.load.audio('bark', barkClip);
        this.load.audio('puff', puffClip);
        this.load.audio('dash', dashClip);
        this.load.audio('hit', hitClip);
        this.load.audio('hurt', hurtClip);
        this.load.audio('theme', mainTheme);

        this.load.image('tiles', tilesPng);
        this.load.image('tiles2', tiles2Png);
        this.load.tilemapTiledJSON('map', tilemapTiledJSON);
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
        this.player.cursor = this.targetCursor = this.add.existing(new TargetCursor(this, this.player)).setDepth(999999999999);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
        this.enemy = this.add.existing(new Enemy(this, 400, 150));

        this.scene.run('ui');

        var music = this.sound.add('theme');
        music.play('', {loop: true, volume: 0.2});
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
    scene: [MyGame, UIScene]
};

const game = new Phaser.Game(config);