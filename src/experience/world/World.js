import Experience from "../Experience";
import Environment from "./Environment";

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Add stuff to scene;
		this.resources.on("ready", () => {
			// Setup
			console.log("Starting Env");
			this.environment = new Environment();
		});
	}
}
