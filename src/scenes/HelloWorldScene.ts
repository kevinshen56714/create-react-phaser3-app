import Phaser, { Tilemaps } from 'phaser'
import easystarjs, { js } from 'easystarjs';

export default class HelloWorldScene extends Phaser.Scene {
  map!: Tilemaps.Tilemap;
  layer!: Tilemaps.TilemapLayer;
  player!: Phaser.GameObjects.Image;
  easystar!: js;
  constructor() {
    super('helloworld')
  }

  preload() {
    this.load.image('tiles', 'assets/drawtiles-spaced.png');
    this.load.tilemapCSV('map', 'assets/grid.csv');
    this.load.image('car', 'assets/car90.png');
  }

  create() {
    this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    
    var tileset = this.map.addTilesetImage('tiles', 'tiles', 32, 32, 1, 2);
    this.layer = this.map.createLayer(0, tileset, 0, 0);
    console.log(this.layer);
    this.player = this.add.image(32+16, 32+16, 'car');

    this.easystar = new easystarjs.js();
  }

  update () {
    var worldPoint: Phaser.Math.Vector2 = this.input.activePointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

    // Force snapping to base tile size
    var pointerTileX = this.map.worldToTileX(worldPoint.x, true, this.cameras.main, this.layer);
    var pointerTileY = this.map.worldToTileY(worldPoint.y, true, this.cameras.main, this.layer);

    if (this.input.manager.activePointer.isDown)
    {
        var tile = this.map.getTileAtWorldXY(worldPoint.x, worldPoint.y);
        console.log(tile);
        if (tile.index === 0)
        {
          var tween = this.tweens.add({
            targets: this.player,
            x: this.map.tileToWorldX(pointerTileX) + 16,
            y: this.map.tileToWorldX(pointerTileY) + 16,
            ease: 'Linear',
        });
        }
    }
    // console.log(pointerTileX, pointerTileY);
  }
}
