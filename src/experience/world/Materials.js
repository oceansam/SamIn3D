import Experience from "../Experience";
import * as THREE from "three";
export default class Materials {
	constructor() {
		this.experinece = new Experience();
		this.scene = this.experinece.scene;
		this.resources = this.experinece.resources;
		this.screenLoader = this.resources.screenLoader;
		this.loaded = 0;
		// Setup

		this.textures = {};
		this.resources.on("ready", () => {
			this.toLoad = Object.keys(this.resources.items).length;
			this.mapTextures();
			this.resources.trigger("texturesReady");
		});
	}

	mapTextures() {
		for (var mat in this.resources.items) {
			const matName = mat.split("Baked")[1];
			if (!matName || matName.includes("Polaroid")) {
				continue;
			}
			this.textures[`${matName.toLowerCase()}Texture`] =
				new THREE.MeshBasicMaterial({
					map: this.resources.items[mat],
				});
		}

		// Polaroids
		this.polaroidTextures = [
			new THREE.MeshBasicMaterial({
				map: this.resources.items.BakedPolaroid0,
			}),
			new THREE.MeshBasicMaterial({
				map: this.resources.items.BakedPolaroid1,
			}),
			new THREE.MeshBasicMaterial({
				map: this.resources.items.BakedPolaroid2,
			}),
			new THREE.MeshBasicMaterial({
				map: this.resources.items.BakedPolaroid3,
			}),
			new THREE.MeshBasicMaterial({
				map: this.resources.items.BakedPolaroid4,
			}),
		];
	}
}
