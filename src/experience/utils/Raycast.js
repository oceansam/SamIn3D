import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import Experience from "../Experience";

import { gsap } from "gsap";
import { polaroid } from "../Locations";
export default class Raycast extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera.instance;
		this.state = this.experience.state;
		this.materials = this.experience.materials;
		this.menuInteractables = ["FloatInfo", "MenuText", "Polaroid"];
		this.polaroidInteractables = ["nextButton", "prevButton"];
		this.resources = this.experience.resources;
		// Setup
		this.hoverSound = new Audio("sounds/MenuHover.mp3"); // TODO
		this.raycaster = new THREE.Raycaster();
		this.mouse = {};

		// listen for mouse move & raycast intersection
		window.addEventListener("mousemove", (e) => {
			if (!this.resources.screenLoader.didEnter) {
				return;
			}
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
			this.raycaster.setFromCamera(this.mouse, this.camera);
			const intersects = this.raycaster.intersectObjects(this.scene.children);
			const isInteractable = this.canShowPointer(intersects);
			// Handle interaction cursor sound
			if (isInteractable && document.body.style.cursor === "default") {
				this.playSound();
			}
			document.body.style.cursor = isInteractable ? "pointer" : "default";
		});
	}

	playSound() {
		this.hoverSound.play();
	}

	canShowPointer(intersects) {
		if (this.state.currentState === "Spawn") {
			return intersects.find((_c) =>
				this.menuInteractables.includes(_c.object.name)
			);
		}
		if (this.state.currentState === "Polaroid") {
			return intersects.find((_c) =>
				this.polaroidInteractables.includes(_c.object.name)
			);
		}
		return false;
	}

	removeHitBoxes() {
		this.scene.remove(this.polaroidNav);
	}

	setPolaroidControls() {
		// Polaroid hitbox setup
		const hitBoxMaterial = new THREE.MeshBasicMaterial({
			visible: false,
			color: 0xff1f1f,
		});
		this.polaroidNav = new THREE.Group();

		const { x, y, z } = polaroid.POSITION;
		const boxScale = 0.3;
		this.polaroidHitBox_next = new THREE.Mesh(
			new THREE.BoxGeometry(boxScale, boxScale, boxScale),
			hitBoxMaterial
		);
		this.polaroidHitBox_prev = new THREE.Mesh(
			new THREE.BoxGeometry(boxScale, boxScale, boxScale),
			hitBoxMaterial
		);
		this.polaroidHitBox_next.position.set(x - 0.59, y - 5, z - 0.51);

		this.polaroidHitBox_prev.position.set(x + 0.68, y - 5, z + 0.4);

		this.polaroidHitBox_next.name = "nextButton";
		this.polaroidHitBox_prev.name = "prevButton";

		this.polaroidNav.add(this.polaroidHitBox_next);
		this.polaroidNav.add(this.polaroidHitBox_prev);
		this.scene.add(this.polaroidNav);
	}

	updatePolaroid(polarity) {
		const polaroid = this.scene.getObjectByName("Polaroid");
		const totalMaterials = this.materials.polaroidTextures.length - 1;
		const currentIndex = this.materials.polaroidTextures.findIndex(
			(_m) => polaroid.material.uuid === _m.uuid
		);
		let index = polarity + currentIndex;

		if (index > totalMaterials) {
			index = 0;
		} else if (index < 0) {
			index = totalMaterials;
		}
		polaroid.material = this.materials.polaroidTextures[index];
	}

	setInfoHtml() {
		const infoSheet = document.querySelector(".info-sheet");
		gsap.delayedCall(0.5, () => {
			this.openInfo = gsap.fromTo(
				infoSheet,
				{ height: 0 },
				{ height: "80%", duration: 1 }
			);
		});
	}
	removeInfoHtml() {
		this.openInfo.kill();
		const infoSheet = document.querySelector(".info-sheet");
		gsap.to(infoSheet, { height: 0, duration: 0.5 });
	}
}
