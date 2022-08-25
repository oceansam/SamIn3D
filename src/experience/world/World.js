import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
	constructor() {
		this.experinece = new Experience();
		this.scene = this.experinece.scene;
		this.resources = this.experinece.resources;

		// Add stuff to scene;
		this.resources.on("ready", () => {
			// Setup
			console.log("Starting Env");
			this.environment = new Environment();
		});
	}
}
