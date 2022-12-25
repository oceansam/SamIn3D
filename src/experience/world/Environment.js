import * as THREE from "three";

import Experience from "../Experience";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { monitor1 } from "../Locations";
import gsap from "gsap";
const SCREEN_SIZE = { w: 2080, h: 1080 };
import * as dat from "lil-gui";

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.camera = this.experience.camera.instance;
		this.cssScene = this.experience.cssScene;
		this.resources = this.experience.resources;
		this.materials = this.experience.materials;
		this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
		this.resource = this.resources.items.RoomModel;

		// window.addEventListener("click", (e) => {
		// 	this.raycaster.setFromCamera(this.mouse, this.camera);
		// 	const intersects = this.raycaster.intersectObjects(this.scene.children);
		// 	for (let i = 0; i < intersects.length; i++) {
		// 		let intersectObj = intersects[i].object;
		// 		if (intersectObj.name == "MenuText") {
		// 			this.trigger("menuTransition", [intersectObj.text]);
		// 		}
		// 	}
		// });
		this.setEnvironmentModel();
		this.setEnvironmentMaterial();
	}
	/**
	 * Load and store model data
	 */
	setEnvironmentModel() {
		// Base model
		this.model = this.resource.scene;

		this.room = this.model.children.find(
			(_child) => _child.name === "Interior"
		);
		this.desk = this.model.children.find((_child) => _child.name === "Desk");
		this.paddle = this.model.children.find(
			(_child) => _child.name === "Paddle"
		);
		this.book = this.model.children.find((_child) => _child.name === "Book");
		this.lamp = this.model.children.find((_child) => _child.name === "Lamp");
		this.plant = this.model.children.find((_child) => _child.name === "Plant");
		this.haikyuPoster = this.model.children.find(
			(_child) => _child.name === "haikyuPoster"
		);
		this.mobPoster = this.model.children.find(
			(_child) => _child.name === "mobPoster"
		);
		this.blackFrame = this.model.children.find(
			(_child) => _child.name === "BlackFrame"
		);

		this.polaroid = this.model.children.find(
			(_child) => _child.name === "Polaroid"
		);

		this.infoIcon = this.model.children.find(
			(_child) => _child.name === "InfoFloat"
		);

		this.paddleBall = this.model.children.find(
			(_child) => _child.name === "PaddleBall"
		);
		this.monitor1 = this.model.children.find(
			(_child) => _child.name === "MenuNav1"
		);

		this.door = this.model.children.find((_child) => _child.name === "Door");
		this.model.scale.set(10, 10, 10);
	}

	/**
	 * Set model material
	 */
	setEnvironmentMaterial() {
		this.resources.on("texturesReady", () => {
			console.log("Setting Materials");

			this.room.traverse((e) => {
				e.material = this.materials.textures.roomTexture;
			});

			this.paddle.traverse((e) => {
				e.material = this.materials.textures.paddleTexture;
			});

			this.desk.traverse((e) => {
				e.material = this.materials.textures.deskTexture;
			});

			this.book.traverse((e) => {
				e.material = this.materials.textures.propsTexture;
			});

			this.plant.traverse((e) => {
				e.material = this.materials.textures.propsTexture;
			});

			this.lamp.traverse((e) => {
				e.material = this.materials.textures.propsTexture;
			});
			this.book.traverse((e) => {
				e.material = this.materials.textures.propsTexture;
			});

			this.door.material = this.materials.textures.doorTexture;

			this.blackFrame.traverse((e) => {
				e.material = this.materials.textures.frameTexture;
			});

			this.haikyuPoster.material = this.materials.textures.haikyuTexture;
			this.mobPoster.material = this.materials.textures.mobTexture;
			this.polaroid.material = this.materials.polaroidTextures[0];

			this.infoIcon.traverse((e) => {
				e.material = this.materials.textures.iconTexture;
			});
			this.paddleBall.material = this.materials.textures.ballTexture;

			// Iframe
			var iframeObj = this.makeElementObject(
				"iframe",
				this.screenSize.width,
				this.screenSize.height
			);
			iframeObj.css3dObject.element.src =
				"https://bejewelled-dodol-39bae3.netlify.app/";
			iframeObj.css3dObject.element.setAttribute("contenteditable", "");
			const { x, y, z } = monitor1.POSITION;
			iframeObj.position.set(x - 6.5, y + 0.05, z - 14);

			iframeObj.rotation.y = (Math.PI * 45) / 180;
			var scaleAmount = 0.0074;
			iframeObj.scale.set(scaleAmount, scaleAmount, scaleAmount);
			this.scene.add(this.model);
			this.scene.add(iframeObj);
			this.setIdleAnimations();
		});
	}

	// @JoePea thanks!
	makeElementObject(type, width, height) {
		const obj = new THREE.Object3D();

		const element = document.createElement(type);

		element.style.width = width + "px";
		element.style.height = height + "px";
		element.style.opacity = 0.999;

		var css3dObject = new CSS3DObject(element);
		console.log(obj);
		obj.css3dObject = css3dObject;
		obj.add(css3dObject);

		var geometry = new THREE.BoxGeometry(width, height, 1);
		var mesh = new THREE.Mesh(geometry);

		obj.lightShadowMesh = mesh;
		obj.add(mesh);

		return obj;
	}

	setIdleAnimations() {
		gsap.to(this.infoIcon.rotation, {
			z: this.infoIcon.rotation.z * Math.PI * 2,
			repeat: -1,
			duration: 5,
			ease: "none",
		});

		gsap.to(this.paddleBall.position, {
			y: this.paddleBall.position.y + 0.2,
			yoyo: true,
			ease: "power3",
			duration: 0.3,
			repeat: -1,
		});
	}
}
