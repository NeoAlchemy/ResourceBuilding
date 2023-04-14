
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

		// maleFarmer (components)
		new AIRandomWalking(maleFarmer);

		this.base = base;
		this.buildings = buildings;
		this.maleFarmer = maleFarmer;
		this.grassWorld = grassWorld;

		this.events.emit("scene-awake");
	}

	private base!: Phaser.Tilemaps.TilemapLayer;
	private buildings!: Phaser.Tilemaps.TilemapLayer;
	private maleFarmer!: Phaser.Physics.Arcade.Sprite;
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



		//let objects: any = [];

		/*this.grassWorld.getObjectLayer("Tent").objects.forEach((startingObject) => {
			console.log(startingObject);


			collisionLayer.push(this.grassWorld.createFromObjects("Tent", {
			  name: startingObject.name
			}));
		});*/

		/*const map = this.make.tilemap({ key: "GrassWorld" });
	    const tileset = map.addTilesetImage("Grasslands", "grassland_tiles");
		let collisionLayer: Phaser.Tilemaps.TilemapLayer = this.grassWorld.createBlankLayer("CollisionObjects", tileset, 0, 0)

		collisionLayer.setCollisionByProperty({ collides: true }, true);
		this.matter.world.convertTilemapLayer(collisionLayer);*/

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
		//this.matter.world.convertTilemapLayer(this.buildings);

		/*this.buildings.forEachTile(function(tile: any) {
			if (tile && tile.physics && tile.physics.matterBody) {
				tile.physics.matterBody.body.parts.forEach((part: any) => {
					//console.log(part);
					//part.isSensor = false;
					//part.isStatic = false;
				});
			}
		});*/

		/*const debugGraphics = this.add.graphics().setAlpha(0.75);
		this.buildings.renderDebug(debugGraphics, {
		  tileColor: null, // Color of non-colliding tiles
		  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
		  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});*/

		/*const _maleFarmer: Phaser.Physics.Matter.Sprite = this.matter.add.sprite(82, 104, "MaleFarmer");
		_maleFarmer.setCollidesWith(1);
		_maleFarmer.scaleX = 0.75;
		_maleFarmer.scaleY = 0.75;
		_maleFarmer.setStatic(true);*/

		//this.circle = this.matter.add.circle(82, 104, 10, {  });



		/*let aMaleFarmer = this.matter.add.sprite(82, 204, "MaleFarmer");
		aMaleFarmer.scaleX = 0.75;
		aMaleFarmer.scaleY = 0.75;*/

		// maleFarmer (components)
		//new AIRandomWalking(_maleFarmer);

		/*this.matter.world.on("collisionstart", (e: any, o1: any, o2: any) => {
			console.log("Collision Start: ", o1, o2)
		});

		this.matter.world.on("collisionactive", (e: any, o1: any, o2: any) => {
			console.log("Collision Active: ", o1, o2)
		});*/

		//console.log("All Matter Bodies: ", this.matter.world.getAllBodies());


		/*var graphics = this.add.graphics();

		// Loop over each tile and visualize its collision shape (if it has one)
		this.buildings.forEachTile((tile: any) => {
			var tileWorldPos: any = this.buildings.tileToWorldXY(tile.x, tile.y);
			var collisionGroup: any = tileset.getTileCollisionGroup(tile.index);

			if (!collisionGroup || collisionGroup.objects.length === 0) { return; }

			// You can assign custom properties to the whole collision object layer (or even to
			// individual objects within the layer). Here, use a custom property to change the color of
			// the stroke.
			if (collisionGroup.properties && collisionGroup.properties.isInteractive)
			{
				graphics.lineStyle(5, 0x00ff00, 1);
			}
			else
			{
				graphics.lineStyle(5, 0x00ffff, 1);
			}

			// The group will have an array of objects - these are the individual collision shapes
			var objects = collisionGroup.objects;



			for (var i = 0; i < objects.length; i++)
			{
				var object = objects[i];
				var objectX = tileWorldPos.x + object.x;
				var objectY = tileWorldPos.y + object.y;

				// When objects are parsed by Phaser, they will be guaranteed to have one of the
				// following properties if they are a rectangle/ellipse/polygon/polyline.
				if (object.rectangle)
				{
					graphics.strokeRect(objectX, objectY, object.width, object.height);
				}
				else if (object.ellipse)
				{
					// Ellipses in Tiled have a top-left origin, while ellipses in Phaser have a center
					// origin
					graphics.strokeEllipse(
						objectX + object.width / 2, objectY + object.height / 2,
						object.width, object.height
					);
				}
				else if (object.polygon || object.polyline)
				{
					var originalPoints = object.polygon ? object.polygon : object.polyline;
					var points = [];
					for (var j = 0; j < originalPoints.length; j++)
					{
						var point = originalPoints[j];
						points.push({
							x: objectX + point.x,
							y: objectY + point.y
						});
					}
					graphics.strokePoints(points);
				}
			}
		});

		this.physics.add.collider(this.maleFarmer, this.buildings, () => {
			console.log("test");
		});*/

		/*objects = objects.flat()

		objects.forEach((obj: Phaser.GameObjects.Polygon) => {
			console.log(obj)
			this.physics.world.enable(obj);
			obj.visible = false;
			obj.depth = 100;
			obj.strokeColor = 0xFF0000

			console.log(obj.x + "," + obj.y)

			var isoPoint = this.cartesianToIsometric({x:obj.x, y:obj.y});
			console.log(isoPoint.x + "," + isoPoint.y)

			var middleOfBuildingsX = this.buildings.x;
			var middleOfBuildingsY = this.buildings.y + (this.buildings.height / 2);
			console.log("middleOfBuildingsX: " + middleOfBuildingsX);
			console.log("middleOfBuildingsY: " + middleOfBuildingsY);
			var buildingOffsetPoint = this.cartesianToIsometric({x: middleOfBuildingsX, y:  middleOfBuildingsY});
			console.log(buildingOffsetPoint.x + "," + buildingOffsetPoint.y)

			obj.x = isoPoint.x + buildingOffsetPoint.x;
			obj.y = isoPoint.y + buildingOffsetPoint.y;

			this.physics.add.collider(this.maleFarmer, obj, ()=> { 
				//this.maleFarmer.changePositions();
			})
		})*/


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
