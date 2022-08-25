import Experience from "../Experience";
import * as THREE from "three";
export default class Materials {
	constructor() {
		this.experinece = new Experience();
		this.scene = this.experinece.scene;
		this.resources = this.experinece.resources;
		// Setup
		this.materials = this.resources.items;

		this.resources.on("ready", () => {
			console.log("Setting Env Materials");
			this.mapTextures();
			this.resources.trigger("texturesReady");
		});
	}

	mapTextures() {
		this.roomTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedRoom,
		});

		this.deskTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedDesk,
		});

		this.chipTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedChips,
		});

		this.bookTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedBook,
		});

		this.paddleTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedPaddle,
		});

		this.deskPropTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedProps,
		});

		this.haikyuPoster = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedHaikyu,
		});

		this.mobPoster = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedMob,
		});

		this.frameTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedFrame,
		});
		this.iconTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedIcon,
		});
		this.ballTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedBall,
		});
		this.screenTexture = new THREE.MeshBasicMaterial({
			map: this.resources.items.BakedScreen1,
		});
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
		this.scene.add(new THREE.AmbientLight(0xffffff, 1));
	}
}
