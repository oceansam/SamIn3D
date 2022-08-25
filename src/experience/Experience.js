// Libraries
import * as THREE from "three";

// Utils
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import State from "./utils/State";
import Raycast from "./utils/Raycast";
import Resources from "./utils/Resources";
import Camera from "./Camera";
import Renderer from "../Renderer";
import World from "./world/World";
import Menu from "./world/Menu";
import Materials from "./world/Materials";

// Data
import sources from "./sources";

// Styles
import "../style.css";

let instance = null;

export default class Experience {
	constructor(canvas) {
		// Singleton
		if (instance) return instance;

		instance = this;

		this.canvas = canvas;

		// Setup
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();
		this.materials = new Materials();
		this.state = new State();
		this.raycast = new Raycast(this.camera);
		this.menu = new Menu();

		this.menu.on("updateState", (newState) => {
			console.log("updating state", newState);
			this.updateState(newState);
			if (newState === "Spawn") {
				this.raycast.removeHitBoxes();
			}
			if (newState === "Polaroid") {
				this.raycast.setHitBoxes();
			}
		});

		this.menu.on("menuTransition", (menuText) => {
			this.cameraTransition(menuText);
		});
		this.menu.on("updatePolaroid", (cycle) => {
			this.raycast.updatePolaroid(cycle);
		});
		// Sizes change event
		this.sizes.on("resize", () => {
			this.resize();
		});

		// Time delta tick event
		this.time.on("tick", () => {
			this.update();
		});
	}

	/**
	 * Resize the experience viewport and propogate to child
	 */
	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	/**
	 * Animate menu transitions
	 */
	cameraTransition(name) {
		this.camera.animateNavigation(name);
	}
	updateState(state) {
		this.state.setState(state);
	}
	/**
	 * Update the animation
	 */
	update() {
		this.camera.update();
		this.renderer.update();
		this.menu.update();
	}
}
