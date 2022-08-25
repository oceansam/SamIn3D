// Libraries
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";
import { Text } from "troika-three-text";
import { gsap } from "gsap";
// Utils
import Experience from "../Experience";
import EventEmitter from "../utils/EventEmitter";

export default class Menu extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.sizes = this.experience.sizes;
		this.camera = this.experience.camera.instance;
		this.raycast = this.experience.raycast;
		this.mouse = this.experience.raycast.mouse;

		this.state = this.experience.state;
		// Setup
		this.resourceFont = this.resources.items.FontText;

		window.addEventListener("click", (e) => {
			console.log(this.mouse);
			this.raycast.raycaster.setFromCamera(this.mouse, this.camera);
			const intersects = this.raycast.raycaster.intersectObjects(
				this.scene.children
			);
			for (let i = 0; i < intersects.length; i++) {
				let intersectObj = intersects[i].object;
				const isLocationCurrent = this.state.currentState == intersectObj.name;
				console.log(intersectObj.name);
				switch (intersectObj.name) {
					case "MenuText":
						console.log("MENU SWITCH");
						this.trigger("updateState", [intersectObj.name]);
						this.trigger("menuTransition", [intersectObj.text]);
						break;
					case !isLocationCurrent && "Polaroid":
						console.log("POLAROID SWITCH");
						this.trigger("updateState", [intersectObj.name]);
						this.trigger("menuTransition", [intersectObj.name]);
						break;
					case "nextButton":
						console.log("next switch");
						this.trigger("updatePolaroid", [1]);
						break;
					case "prevButton":
						this.trigger("updatePolaroid", [-1]);
						break;
					default:
						break;
				}
			}
		});

		// Menu navigation back
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.trigger("menuTransition", ["Spawn"]);
				this.trigger("updateState", ["Spawn"]);
			}
		});

		this.setHeader();
		this.setHtmlMenu();
	}
	resetHover() {
		for (let i = 0; i < this.scene.children.length; i++) {
			let sceneObject = this.scene.children[i];
			if (sceneObject.name == "MenuText") {
				gsap.to(sceneObject, { letterSpacing: 0 });
			}
		}
	}
	/**
	 * Called every animation tick. Used for hovering
	 */
	update() {
		this.raycast.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycast.raycaster.intersectObjects(
			this.scene.children
		);
		this.resetHover();
		for (let i = 0; i < intersects.length; i++) {
			let intersectObj = intersects[i].object;
			if (intersectObj.name == "MenuText") {
				gsap.to(intersectObj, { letterSpacing: 0.1 });
			}
		}
	}
	createText(text, fontSize, color, pos, rot, objName) {
		const troikaText = new Text();
		troikaText.text = text;
		troikaText.fontSize = fontSize;
		troikaText.color = color;
		troikaText.position.set(pos.x, pos.y, pos.z);
		troikaText.rotation.set(rot.x, rot.y, rot.z);
		troikaText.name = objName;
		troikaText.sync();
		const boundingBox = new THREE.Box3();
		boundingBox.setFromObject(troikaText);
		this.scene.add(troikaText);
	}
	setHeader() {
		this.createText(
			"Samee Chowdhury",
			0.15,
			0xffffff,
			{ x: -2.4, y: 2.25, z: 2.5 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"Title"
		);
	}
	setHtmlMenu() {
		this.createText(
			"Projects",
			0.1,
			0xffffff,
			{ x: -2.4, y: 2.25, z: 2.2 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"MenuText"
		);
		this.createText(
			"Experience",
			0.1,
			0xffffff,
			{ x: -2.4, y: 2.25, z: 2.05 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"MenuText"
		);
		this.createText(
			"Github",
			0.1,
			0xffffff,
			{ x: -2.4, y: 2.25, z: 1.9 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"MenuText"
		);
		this.createText(
			"Linkedin",
			0.1,
			0xffffff,
			{ x: -2.4, y: 2.25, z: 1.75 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"MenuText"
		);

		// const material = new THREE.LineBasicMaterial({
		// 	color: 0xffffff,
		// });
		// const points = [];

		// points.push(new THREE.Vector3(75, 0, 105));
		// points.push(new THREE.Vector3(0, 0, 0));
		// const geometry = new THREE.BufferGeometry().setFromPoints(points);
		// var line = new THREE.Line(geometry, material);
		// const scaleAmount = 0.005;
		// line.position.set(-3.05, 2.25, 0.55);

		// const gui = new dat.GUI({
		// 	width: 400,
		// });
		// gui.add(line.position, "x", -50, 50, 0.000001);
		// gui.add(line.position, "y", -50, 50, 0.001);
		// gui.add(line.position, "z", -50, 50, 0.001);

		// line.scale.set(scaleAmount, scaleAmount, scaleAmount);
		// this.scene.add(line);
	}
}
