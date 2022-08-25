// Libraries
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import gsap from "gsap";

// Utils
import Experience from "./Experience";
import { monitor1, polaroid, spawn } from "./Locations";
export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.setInstance();
		this.setOrbitControls();
	}
	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			45,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);

		this.instance.position.set(-2.2, 3.2, 0.5);
		const gui = new dat.GUI({
			width: 400,
		});

		gui.add(this.instance.position, "x", -50, 50, 0.01);
		gui.add(this.instance.position, "y", -50, 50, 0.01);
		gui.add(this.instance.position, "z", -50, 50, 0.01);
	}
	// const worldIndex = this.scene.children.findIndex(
	// 	(_child) => _child instanceof THREE.Group
	// );
	// console.log(this.scene.children);
	// const mesh = this.scene.children[worldIndex].children.filter(
	// 	(child) => child.name == "MenuNav1"
	// )[0];
	// console.log(mesh.position);

	setOrbitControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.target = new THREE.Vector3(-5, 0.5, 4.2);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}

	/**
	 * Route Determination
	 * @param {String} navName
	 */
	animateNavigation(navName) {
		let pos;
		let tar;

		switch (navName) {
			case "Projects":
				pos = monitor1.POSITION;
				tar = monitor1.TARGET;
				break;
			case "Polaroid":
				pos = polaroid.POSITION;
				tar = polaroid.TARGET;
				break;
			case "Spawn":
				pos = spawn.POSITION;
				tar = spawn.TARGET;
			default:
				break;
		}

		// Determine navigation route

		// Animate and change camera target
		gsap.to(this.instance.position, {
			x: pos.x,
			y: pos.y,
			z: pos.z,
		});

		gsap.to(this.controls.target, { x: tar.x, y: tar.y, z: tar.z });
		this.resize();
	}
}
