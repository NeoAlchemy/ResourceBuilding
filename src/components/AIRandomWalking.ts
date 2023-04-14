
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class AIRandomWalking extends UserComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__AIRandomWalking"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): AIRandomWalking {
		return (gameObject as any)["__AIRandomWalking"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	// Write your code here.

	private currentDirection: string = "South"

	awake() {
		this.gameObject.anims.play("FarmerWalkingSouth");
		this.scene.time.addEvent({
			delay: 2000,
			callback: this.changePositions,
			callbackScope: this,
			loop: true
		})
	}

	update() {
		let SPEED = 0.75;
		switch (this.currentDirection) {
			case "North":
				this.gameObject.y -= SPEED;
				break;
			case "South":
				this.gameObject.y += SPEED;
				break;
			case "West":
				this.gameObject.x -= SPEED;
				break;
			case "East":
				this.gameObject.x += SPEED;
				break;
			
		}
		this.scene.physics.world.on('collide', () => {
			this.oppositePosition();
		})
	}


	changePositions() {
		let directions = ["North", "South", "East", "West"]
		let nextDirection = directions[Phaser.Math.Between(0,3)]
		this.gameObject.anims.play("FarmerWalking"+nextDirection);
		this.currentDirection = nextDirection;
	}

	oppositePosition() {
		let nextDirection: string = "North";
		switch (this.currentDirection) {
			case "North":
				nextDirection = "South";
				break;
			case "South":
				nextDirection = "North";
				break;
			case "West":
				nextDirection = "East";
				break;
			case "East":
				nextDirection = "West";
				break;
		}
		this.gameObject.anims.play("FarmerWalking"+nextDirection);
		this.currentDirection = nextDirection;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
