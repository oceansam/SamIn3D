import * as THREE from "three";

import Experience from "../Experience";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import gsap from "gsap";
export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.materials = this.experience.materials;

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
	}

	/**
	 * Set model material
	 */
	setEnvironmentMaterial() {
		this.resources.on("texturesReady", () => {
			console.log("Setting Materials");
			// this.room.material = this.materials.roomTexture;
			// this.desk.material = this.materials.deskTexture;
			this.room.traverse((e) => {
				e.material = this.materials.roomTexture;
			});

			this.paddle.traverse((e) => {
				e.material = this.materials.paddleTexture;
			});

			this.desk.traverse((e) => {
				e.material = this.materials.deskTexture;
			});

			this.book.traverse((e) => {
				e.material = this.materials.deskPropTexture;
			});

			this.plant.traverse((e) => {
				e.material = this.materials.deskPropTexture;
			});

			this.lamp.traverse((e) => {
				e.material = this.materials.deskPropTexture;
			});
			this.book.traverse((e) => {
				e.material = this.materials.deskPropTexture;
			});

			this.blackFrame.traverse((e) => {
				e.material = this.materials.frameTexture;
			});
			this.haikyuPoster.material = this.materials.haikyuPoster;
			this.mobPoster.material = this.materials.mobPoster;
			this.polaroid.material = this.materials.polaroidTextures[0];

			this.infoIcon.traverse((e) => {
				e.material = this.materials.iconTexture;
			});
			this.paddleBall.material = this.materials.ballTexture;
			// HTML Renderer
			const width = "5";
			const height = "5";

			var iframe = document.createElement("iframe");
			iframe.style.width = width + "px";
			iframe.style.height = height + "px";
			iframe.style.border = "0px";
			iframe.allow = "autoplay";
			iframe.src = ["https://www.w3schools.com"];

			const cssObject = new CSS3DObject(iframe);
			const { x, y, z } = this.monitor1.position;
			cssObject.position.set(x - 0.05, y + 0.59, z);
			// cssObject.scale.y = 0.79;
			// cssObject.scale.z = 0.5;

			cssObject.rotation.y = (Math.PI * 90) / 180;
			// this.scene.add(cssObject);
			this.scene.add(this.model);
			this.setIdleAnimations();
		});
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

// this.environmentMap.texture = this.resources.items.BakedTexture;

// this.environmentMap.texture.encoding = THREE.sRGBEncoding;

// this.scene.environment = this.environmentMap.texture;

// this.setEnvironmentModel.updateMaterials = () => {
// 	this.scene.traverse((child) => {
// 		console.log(child);
// 	});
// };

// this.setEnvironmentModel.updateMaterials();
