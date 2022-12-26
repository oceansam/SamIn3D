import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
	constructor() {
		super();

		// Setup
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);

		// Resize event reapply dimensions
		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);

			// Emit to other classes dependent on window size
			this.trigger("resize");
		});
	}
}
