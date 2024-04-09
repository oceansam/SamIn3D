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

		this.backBtn = document.querySelector(".back-btn");
		this.state = this.experience.state;
		// Setup

		window.addEventListener("click", (e) => {
			if (this.state.currentState == "MenuText") {
				return true;
			}
			this.raycast.raycaster.setFromCamera(this.mouse, this.camera);
			const intersects = this.raycast.raycaster.intersectObjects(
				this.scene.children
			);
			for (let i = 0; i < intersects.length; i++) {
				let intersectObj = intersects[i].object;

				const isLocationCurrent = this.state.currentState == intersectObj.name;
				switch (intersectObj.name) {
					case "MenuText":
						this.trigger("updateState", [intersectObj.name]);
						this.trigger("menuTransition", [intersectObj.text]);
						break;
					case !isLocationCurrent && "Polaroid":
						this.trigger("updateState", [intersectObj.name]);
						this.trigger("menuTransition", [intersectObj.name]);
						break;
					case "nextButton":
						this.trigger("updatePolaroid", [1]);
						break;
					case "prevButton":
						this.trigger("updatePolaroid", [-1]);
						break;
					case !isLocationCurrent && "FloatInfo":
						this.trigger("updateState", [intersectObj.name]);
						this.trigger("menuTransition", [intersectObj.name]);
						break;
					default:
						break;
				}
			}
		});

		this.backBtn.addEventListener("click", (e) => {
			this.trigger("updateState", ["Spawn"]);
			this.trigger("menuTransition", ["Spawn"]);
		});
		// Menu navigation back
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.trigger("updateState", ["Spawn"]);
				this.trigger("menuTransition", ["Spawn"]);
			}
		});
		this.resources.on("texturesReady", () => {
			this.setHeader();
			this.setHtmlMenu();
		});
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
		troikaText.font = "Oswald.ttf";
		troikaText.sync();
		const boundingBox = new THREE.Box3();
		boundingBox.setFromObject(troikaText);
		this.scene.add(troikaText);
	}
	setHeader() {
		this.createText(
			"Samee Chowdhury",
			1.2,
			0xffffff,
			{ x: -23.5, y: 23, z: 24.5 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"Title"
		);
	}
	setHtmlMenu() {
		this.createText(
			"Projects",
			1,
			0xffffff,
			{ x: -23.5, y: 23, z: 22 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },
			"MenuText"
		);
		this.createText(
			"Github",
			1,
			0xffffff,
			{ x: -23.5, y: 23, z: 20.5 },
			{ x: (-90 * Math.PI) / 180, y: 0, z: (180 * Math.PI) / 180 },

			"MenuText"
		);
		this.createText(
			"Linkedin",
			1,
			0xffffff,
			{ x: -23.5, y: 23, z: 19 },
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
