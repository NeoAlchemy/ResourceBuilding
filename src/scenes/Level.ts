
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import AIRandomWalking from "../components/AIRandomWalking";
/* START-USER-IMPORTS */
import MapTileMarker from "../tools/MapTileMarker";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// grassWorld
		const grassWorld = this.add.tilemap("GrassWorld");
		grassWorld.addTilesetImage("Grasslands", "grassland_tiles");

		// base
		const base = grassWorld.createLayer("base", ["Grasslands"], 0, 0);

		// buildings
		const buildings = grassWorld.createLayer("tent1", ["Grasslands"], 0, 0);

		// maleFarmer
		const maleFarmer = this.physics.add.sprite(82, 104, "MaleFarmer");
		maleFarmer.scaleX = 0.75;
		maleFarmer.scaleY = 0.75;
		maleFarmer.body.setSize(128, 128, false);

		// scroll
		const scroll = this.add.image(700, 500, "scroll");
		scroll.scaleX = 0.5;
		scroll.scaleY = 0.5;

		// maleFarmer (components)
		new AIRandomWalking(maleFarmer);

		this.base = base;
		this.buildings = buildings;
		this.maleFarmer = maleFarmer;
		this.scroll = scroll;
		this.grassWorld = grassWorld;

		this.events.emit("scene-awake");
	}

	private base!: Phaser.Tilemaps.TilemapLayer;
	private buildings!: Phaser.Tilemaps.TilemapLayer;
	private maleFarmer!: Phaser.Physics.Arcade.Sprite;
	private scroll!: Phaser.GameObjects.Image;
	private grassWorld!: Phaser.Tilemaps.Tilemap;

	/* START-USER-CODE */

	// Write your code here

	private foregroundLayer0!: any;
	private foregroundLayer1!: any;
	private foregroundLayer2!: any;
	private foregroundLayer3!: any;
	private foregroundLayer4!: any;
	private mapTileMarker!: MapTileMarker;
	private controls: any;
	private circle: any;

	create() {

		this.editorCreate();

		this.cameras.main.setZoom(1)
		this.cameras.main.startFollow(this.maleFarmer);
		//this.matter.world.setBounds();
		this.maleFarmer.setCollideWorldBounds(true);
		this.scroll.setScrollFactor(0,0)

		this.buildings.setCollisionByProperty({ collides: true }, true);
		let tiles: Array<Phaser.Tilemaps.Tile> = this.buildings.getTilesWithinWorldXY(0,0, 800, 600, { isColliding: true});
		this.physics.world.collideTiles(this.maleFarmer, tiles, () => {
			console.log("collide with tiles");
		});
		this.physics.world.collide(this.maleFarmer, this.buildings, () => {
			console.log("collide with tilemaplayer");
		});
		this.physics.world.overlap(this.maleFarmer, this.buildings, () => {
			console.log("overlap");
		});

		this.mapTileMarker = new MapTileMarker(this, this.grassWorld);

		const map = this.make.tilemap({ key: "GrassWorld" });
	    const tileset = map.addTilesetImage("Grasslands", "grassland_tiles");
		this.foregroundLayer0 = this.grassWorld.createBlankLayer("foreground0", tileset, 0, 0)
		this.foregroundLayer1 = this.grassWorld.createBlankLayer("foreground1", tileset, 0, 0)
		this.foregroundLayer2 = this.grassWorld.createBlankLayer("foreground2", tileset, 0, 0)
		this.foregroundLayer3 = this.grassWorld.createBlankLayer("foreground3", tileset, 0, 0)
		this.foregroundLayer4 = this.grassWorld.createBlankLayer("foreground4", tileset, 0, 0)



	}

	update() {
		//this.circle.position.y += 0.1;

		this.mapTileMarker.update();

		const worldPoint: any = this.input.activePointer.positionToCamera(this.cameras.main);


		// Draw tiles (only within the foregroundLayer)
		if (this.input.manager.activePointer.isDown) {
			this.foregroundLayer0.putTileAtWorldXY(665, worldPoint.x, worldPoint.y);
			this.foregroundLayer0.putTileAtWorldXY(666, worldPoint.x+64, worldPoint.y);
			this.foregroundLayer1.putTileAtWorldXY(649, worldPoint.x, worldPoint.y-(32*1));
			this.foregroundLayer1.putTileAtWorldXY(650, worldPoint.x+64, worldPoint.y-(32*1));
			this.foregroundLayer2.putTileAtWorldXY(633, worldPoint.x, worldPoint.y-(32*2));
			this.foregroundLayer2.putTileAtWorldXY(634, worldPoint.x+64, worldPoint.y-(32*2));
			this.foregroundLayer3.putTileAtWorldXY(617, worldPoint.x, worldPoint.y-(32*3));
			this.foregroundLayer3.putTileAtWorldXY(618, worldPoint.x+64, worldPoint.y-(32*3));
			this.foregroundLayer4.putTileAtWorldXY(601, worldPoint.x, worldPoint.y-(32*4));
			this.foregroundLayer4.putTileAtWorldXY(602, worldPoint.x+64, worldPoint.y-(32*4));
		}	
	}

	cartesianToIsometric(cartPt:any) {
		var tempPt=new Phaser.Geom.Point();
		tempPt.x=cartPt.x-cartPt.y;
		tempPt.y=(cartPt.x+cartPt.y)/2;
		return (tempPt);
	}	


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
