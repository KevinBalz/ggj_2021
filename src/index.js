import Phaser from 'phaser';
import Player from './player';
import Enemy from './enemy';
import UIScene from './ui';
import TargetCursor from './targetCursor';
import Obstacle from './obstacle.js'
import TitleScene from './titlescreen';
import EndScene from './endscreen';

import logoImg from './assets/logo.png';
import doggoImg from './assets/sea_doggo-sideview.png';
import doggo2Img from './assets/sea_doggo-sideview.png';
import doggoDownImg from './assets/sea_doggo-downwards.png';
import doggoDown2Img from './assets/sea_doggo-frame2.png';
import doggo_rearImg from './assets/sea_doggo-rearview.png';
import doggo_deadImg from './assets/sea_doggo-dead.png';
import bubbleImg from './assets/bubble.png';
import pufferfishImg from './assets/kugelfisch.png';
import pufferfishSpikeImg from './assets/kugelfisch-bullet.png';
import tileColliderImg from './assets/tile-collider.png';
import cursorImg from './assets/seadoggo-weapon.png';
import barkClip from './assets/bark.wav';
import puffClip from './assets/puff.wav';
import dashClip from './assets/dash.wav';
import hitClip from './assets/hit.wav';
import hurtClip from './assets/hurt.wav';
import popClip from './assets/pop.wav';
import dedClip from './assets/ded.wav';
import mainTheme from './assets/sea_doggo_theme-mastered.mp3';

import tilesPng from './assets/map/Tilemap.png';
import tiles2Png from './assets/map/Tilemap2.png';
import tiles3Png from './assets/map/Tilemap3.png';
import atlantisPng from './assets/map/Atlantis.png';
import tilemapTiledJSON from './assets/map/Testmap3.json';

import explosion00 from './assets/explosion/explosion00.png';
import explosion01 from './assets/explosion/explosion01.png';
import explosion02 from './assets/explosion/explosion02.png';
import explosion03 from './assets/explosion/explosion03.png';
import explosion04 from './assets/explosion/explosion04.png';
import explosion05 from './assets/explosion/explosion05.png';
import explosion06 from './assets/explosion/explosion06.png';
import explosion07 from './assets/explosion/explosion07.png';
import explosion08 from './assets/explosion/explosion08.png';
import explosion09 from './assets/explosion/explosion09.png';
import explosion10 from './assets/explosion/explosion10.png';
import explosion11 from './assets/explosion/explosion11.png';
import explosion12 from './assets/explosion/explosion12.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super('main', { key: 'game' });
        this.enemies = [];
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('doggo', doggoImg);
        this.load.image('doggo2', doggo2Img);
        this.load.image('doggoDown', doggoDownImg);
        this.load.image('doggoDown2', doggoDown2Img);
        this.load.image('doggo-rear', doggo_rearImg);
        this.load.image('doggo-dead', doggo_deadImg);
        this.load.image('bubble', bubbleImg);
        this.load.image('pufferfish', pufferfishImg);
        this.load.image('pufferfishSpike', pufferfishSpikeImg);
        this.load.image('tileCollider', tileColliderImg);
        this.load.image('cursor', cursorImg);
        this.load.audio('bark', barkClip);
        this.load.audio('puff', puffClip);
        this.load.audio('dash', dashClip);
        this.load.audio('hit', hitClip);
        this.load.audio('hurt', hurtClip);
        this.load.audio('pop', popClip);
        this.load.audio('ded', dedClip);
        this.load.audio('theme', mainTheme);

        this.load.image('tiles', tilesPng);
        this.load.image('tiles2', tiles2Png);
        this.load.image('tiles3', tiles3Png);
        this.load.image('atlantis', atlantisPng);
        this.load.tilemapTiledJSON('map', tilemapTiledJSON);

        this.load.image('explosion00', explosion00);
        this.load.image('explosion01', explosion01);
        this.load.image('explosion02', explosion02);
        this.load.image('explosion03', explosion03);
        this.load.image('explosion04', explosion04);
        this.load.image('explosion05', explosion05);
        this.load.image('explosion06', explosion06);
        this.load.image('explosion07', explosion07);
        this.load.image('explosion08', explosion08);
        this.load.image('explosion09', explosion09);
        this.load.image('explosion10', explosion10);
        this.load.image('explosion11', explosion11);
        this.load.image('explosion12', explosion12);
    }
      
    create ()
    {
        // physics Gruppen
        bubbleGroup = this.physics.add.group();
        obstacleGroup = this.physics.add.group();

        var map = this.add.tilemap('map');
        map.setRenderOrder(1);
        var tileset1 = map.addTilesetImage('Tilemap', 'tiles');
        var tileset2 = map.addTilesetImage('Tilemap2', 'tiles2');
        var tileset3 = map.addTilesetImage('Tilemap3', 'tiles3');
        var atlantis = map.addTilesetImage('Atlantis', 'atlantis');
        // Bodenlayer
        var layer1 = map.createLayer('ground', [ tileset1, tileset2, tileset3 ]);
        // Hindernisse, diese Tiles können nicht betreten werden
        var layer2 = map.createLayer('impassable', [ tileset1, tileset2, tileset3, atlantis ]);
        // Kosmetische Tiles, hoher Anteil von Hindernissen, der den Spieler verdeckt.
        var layer3 = map.createLayer('passable', [ tileset1, tileset2, tileset3 ]);
        var layer4 = map.createLayer('passable2', [ tileset1, tileset2, tileset3 ]);
        var layer5 = map.createLayer('passable3', [ tileset1, tileset2, tileset3 ]);

        this.staticGroup = this.physics.add.staticGroup();
        this.enemyGroup = this.physics.add.group();
        // Karte skalieren, damit es zur Figur passt
        layer1.setScale(0.5);
        layer2.setScale(0.5);
        layer3.setScale(0.5).setDepth(9990);
        layer4.setScale(0.5).setDepth(9991);
        layer5.setScale(0.5).setDepth(9992);
        
        for (var i = 0; i < layer2.layer.data.length; i++) {
            const d = layer2.layer.data[i];
            for (var j = 0; j < d.length; j++) {
                const tile = d[j];
                if (tile.index === -1) continue;
                const body = this.physics.add.staticImage(tile.pixelX/2 + tile.width/4, tile.pixelY/2 + tile.height/8,'tileCollider').setScale(0.25, 0.25).refreshBody();
                this.staticGroup.add(body);
            }
        }

        // Zum Testen, bessere Übersicht.
        //this.cameras.main.setZoom(0.1);

        this.player = this.physics.add.existing(new Player(this, 3900, 1700));
        this.add.existing(this.player);
        this.player.cursor = this.targetCursor = this.add.existing(new TargetCursor(this, this.player)).setDepth(999999999999);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

        const spawnEnemy = (x, y) => {
            var enemy = this.physics.add.existing(new Enemy(this, x, y));
            this.add.existing(enemy);
            this.enemyGroup.add(enemy);
            this.enemies.push(enemy);
        }
        spawnEnemy(3615, 1453);
        spawnEnemy(4192, 1471);
        spawnEnemy(4710, 1521);
        spawnEnemy(4446, 2166);
        spawnEnemy(5153, 1847);
        spawnEnemy(5646, 1534);
        spawnEnemy(5650, 1119);
        spawnEnemy(6134, 2158);
        spawnEnemy(5868, 2543);
        spawnEnemy(6014, 3003);
        spawnEnemy(5805, 3465);
        spawnEnemy(6719, 2418);
        spawnEnemy(7612, 1102);
        spawnEnemy(8854, 2316);
        spawnEnemy(10830, 1633);
        spawnEnemy(12572, 2516);
        spawnEnemy(14346, 3274);
        spawnEnemy(14246, 3224);
        spawnEnemy(14446, 3224);

        this.bulletGroup = this.physics.add.group();
        this.physics.add.collider(this.player, this.staticGroup);
        this.physics.add.overlap(this.player, this.bulletGroup, (player, bullet) => { player.hurt(); bullet.destroy();}, null, this);
        this.physics.add.overlap(this.bulletGroup, this.staticGroup, bubbleHitObstacle, null, this);
        this.physics.add.overlap(bubbleGroup, this.staticGroup, bubbleHitObstacle, null, this);
        this.physics.add.overlap(bubbleGroup, this.enemyGroup, bubbleHitEnemy, null, this);
        this.physics.add.collider(this.enemyGroup, this.staticGroup);

        this.anims.create({
            key: 'explode',
            frames: [
                { key: 'explosion00' },
                { key: 'explosion01' },
                { key: 'explosion02' },
                { key: 'explosion03' },
                { key: 'explosion04' },
                { key: 'explosion05' },
                { key: 'explosion06' },
                { key: 'explosion07' },
                { key: 'explosion08' },
                { key: 'explosion09' },
                { key: 'explosion10' },
                { key: 'explosion11' },
                { key: 'explosion12', duration: 50 }
            ],
            frameRate: 8//,
            //repeat: 0
        });

        this.scene.run('ui');

        var music = this.sound.add('theme');
        music.play('', {loop: true, volume: 0.2});
    }

    update ()
    {
        let now = Date.now();
        let dt = (now - (this.lastFrame || 0)) / 1000;
        this.targetCursor.update(dt);
        this.player && this.player.update(dt);
        this.enemies.forEach(e => e.update(dt));

        this.enemies = this.enemies.filter(e => {
            if (e.life <= 0) {
                e.destroy();
                var expl = this.add.sprite(e.x, e.y, 'explosion00')
                    .play('explode', 8, false, true);
                return false;
            }
            return true;
        });

        this.lastFrame = now;
    }

    getBubbleGroup(){
        return bubbleGroup;
    }
}

function bubbleHitObstacle(bubble, obstacle) {
    if (!(bubble && bubble.scene)) return;
    bubble.scene.sound.play('pop');
    bubble.scene.cameras.main.shake(40, 0.01);
    bubble.destroy();
}

function bubbleHitEnemy(bubble, enemy) {
    bubble.destroy();
    enemy.hurt();
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {debug: false},
    },
    scene: [TitleScene, MyGame, UIScene, EndScene]
};

const game = new Phaser.Game(config);

var bubbleGroup;
var obstacleGroup;
