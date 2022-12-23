import * as THREE from "three";

import Experience from "../Experience";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { monitor1 } from "../Locations";
import gsap from "gsap";
const SCREEN_SIZE = { w: 5, h: 5 };

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

			// Create container
			const container = document.createElement("div");
			container.style.width = this.screenSize.width + "px";
			container.style.height = this.screenSize.height + "px";
			container.style.opacity = "1";
			container.style.background = "#ff0f0f";

			// // Create iframe
			// const iframe = document.createElement("iframe");

			// // Set iframe attributes
			// // PROD
			// iframe.src = "https://bejewelled-dodol-39bae3.netlify.app";

			// iframe.style.width = this.screenSize.width + "px";
			// iframe.style.height = this.screenSize.height + "px";
			// iframe.style.boxSizing = "border-box";
			// iframe.style.opacity = "1";
			// iframe.className = "jitter";
			// iframe.id = "computer-screen";
			// iframe.frame = "0";
			// iframe.title = "HeffernanOS";

			// Add iframe to container
			// container.appendChild(iframe);

			// Create CSS plane
			this.createCssPlane(container);

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

	createCssPlane(element) {
		// Create CSS3D object
		const object = new CSS3DObject(element);

		// copy monitor position and rotation
		const { x, y, z } = monitor1.POSITION;
		object.position.set(x - 0.5, y, z);
		object.rotation.set(0, (Math.PI * 90) / 180, 0);

		// Add to CSS scene
		this.cssScene.add(object);

		// Create GL plane
		const material = new THREE.MeshLambertMaterial();
		material.side = THREE.DoubleSide;
		material.opacity = 0;
		material.transparent = true;
		material.blending = THREE.NoBlending; // <- Blending mode

		// Create plane geometry
		const geometry = new THREE.PlaneGeometry(
			this.screenSize.width,
			this.screenSize.height
		);

		// Create the GL plane mesh
		const mesh = new THREE.Mesh(geometry, material);

		// Copy the position, rotation and scale of the CSS plane to the GL plane
		mesh.position.copy(object.position);
		mesh.rotation.copy(object.rotation);
		mesh.scale.copy(object.scale);

		// Add to gl scene
		this.scene.add(mesh);
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
