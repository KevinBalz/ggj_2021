import Phaser from "phaser";

export default class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'logo', 0);
    }

    create(){
    }

    setObstacleGroup(obstacleGroup){
        obstacleGroup.add(this);
    }
}