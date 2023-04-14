/**
 * A class that visualizes the mouse position within a tilemap. Call its update method from the
 * scene's update and call its destroy method when you're done with it.
 */
export default class MapTileMarker {
	
  private map!: Phaser.Tilemaps.Tilemap;
  private scene!: Phaser.Scene;
  private graphics: any;

  constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
    this.map = map;
    this.scene = scene;

    this.graphics = scene.add.graphics();
    this.graphics.lineStyle(5, 0xffffff, 1);
    this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    this.graphics.lineStyle(3, 0xff4f78, 1);
    this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);
  }

  update() {
    const pointer = this.scene.input.activePointer;
    const worldPoint: any = pointer.positionToCamera(this.scene.cameras.main);
	const pointerTileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y, true);
	const snappedWorldPoint = this.map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
	this.graphics.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
  }

  destroy() {
    this.graphics.destroy();
  }

  cartesianToIsometric(cartPt:any) {
	var tempPt=new Phaser.Geom.Point();
	tempPt.x=cartPt.x-cartPt.y;
	tempPt.y=(cartPt.x+cartPt.y)/2;
	return (tempPt);
  }	

  isometricToCartesian(isoPt: any){
    var tempPt=new Phaser.Geom.Point();
	tempPt.x=(2*isoPt.y+isoPt.x)/2;
	tempPt.y=(2*isoPt.y-isoPt.x)/2;
	return (tempPt);
  }

  getTileCoordinates(cartPt: any, tileHeight: number){
    var tempPt=new Phaser.Geom.Point();
    tempPt.x=Math.floor(cartPt.x/tileHeight);
    tempPt.y=Math.floor(cartPt.y/tileHeight);
    return(tempPt);
  }
}
