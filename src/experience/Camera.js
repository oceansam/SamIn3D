// Libraries
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "@tweenjs/tween.js";
// Utils
import Experience from "./Experience";
import { info, polaroid, spawn } from "./Locations";
import * as dat from "lil-gui";
import { Vector3 } from "three";
export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.renderer = this.experience.renderer;
		this.monitor = this.scene.getObjectByName("monitorView");
		this.setInstance();
	}
	setInstance() {
		const aspectRatio = this.sizes.width / this.sizes.height;
		const fov = aspectRatio < 0.6 ? 100 : 45;
		this.instance = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 5000);

		this.instance.position.copy(spawn.POSITION);
		// this.gui = new dat.GUI({
		// 	width: 400,
		// });

		// this.gui.add(this.instance.position, "x", -200, 200, 0.01);
		// this.gui.add(this.instance.position, "y", -200, 200, 0.01);
		// this.gui.add(this.instance.position, "z", -200, 200, 0.01);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(
			this.instance,
			this.experience.renderer.rendererGl.domElement
		);
		const { x, y, z } = spawn.TARGET;
		this.controls.target = new THREE.Vector3(x, y, z);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.fov = this.instance.aspect < 0.6 ? 100 : 45;

		this.instance.updateProjectionMatrix();
	}

	update() {
		TWEEN.update();
		this.controls.update();
	}

	/**
	 * Route Determination
	 * @param {String} navName
	 */
	animateNavigation(navName) {
		let pos;
		let tar;
		const monitor = this.scene.getObjectByName("monitorView");
		switch (navName) {
			case "Projects":
				pos = { x: -27.5, y: 27.92, z: 1 };
				tar = { x: -45, y: 25.83, z: -28.93 };
				break;
			case "Github":
				window.open("https://github.com/oceansam", "_blank").focus();
				break;
			case "Linkedin":
				window
					.open("https://www.linkedin.com/in/samee-chowdhury", "_blank")
					.focus();
				break;
			case "Polaroid":
				pos = polaroid.POSITION;
				tar = polaroid.TARGET;
				break;
			case "Spawn":
				pos = spawn.POSITION;
				tar = spawn.TARGET;
				break;
			case "FloatInfo":
				pos = info.POSITION;
				tar = info.TARGET;
				break;
			default:
				break;
		}
		if (pos && tar) {
			const duration = 1000;
			const keyframe = {
				position: new THREE.Vector3(pos.x, pos.y, pos.z),
				focalPoint: new THREE.Vector3(tar.x, tar.y, tar.z),
			};
			const posTween = new TWEEN.Tween(this.instance.position)
				.to(keyframe.position, duration)
				.easing(TWEEN.Easing.Quintic.InOut);

			const focTween = new TWEEN.Tween(this.controls.target)
				.to(keyframe.focalPoint, duration)
				.easing(TWEEN.Easing.Quintic.InOut);

			posTween.start();
			focTween.start();
		}
		this.resize();
	}
}
