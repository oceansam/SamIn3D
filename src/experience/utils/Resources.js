import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import Loader from "../Loader";

import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
	constructor(sources) {
		super();
		this.sources = sources;
		this.screenLoader = new Loader();
		// Setup
		this.items = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;
		this.setLoaders();
		this.startLoading();
	}

	setLoaders() {
		this.loaders = {};
		this.loaders.dracoLoader = new GLTFLoader().setDRACOLoader(
			new DRACOLoader().setDecoderPath("draco/")
		);
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.FontLoader = new FontLoader();
	}

	startLoading() {
		for (const source of this.sources) {
			if (source.type === "gltfCompressed") {
				this.loaders.dracoLoader.load(source.path, (file) =>
					this.sourceLoaded(source, file)
				);
			} else if (source.type === "font") {
				this.loaders.FontLoader.load(source.path, (file) =>
					this.sourceLoaded(source, file)
				);
			} else if (source.type === "textureMap") {
				this.loaders.textureLoader.load(source.path, (file) => {
					// texture setup
					file.flipY = false;
					file.encoding = THREE.sRGBEncoding;
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source, file) {
		const priorLoad = Math.floor(this.loaded / this.toLoad) * 75;

		this.items[source.name] = file;
		this.loaded++;
		const postLoad = Math.round((this.loaded / this.toLoad) * 75);

		this.screenLoader.updateProgressModel((1 - 1) * priorLoad + 1 * postLoad);
		if (this.loaded === this.toLoad) {
			// console.log("Finished Loading");
			// const loadScreen = document.querySelector(".loading-screen");
			// const loadingScreen = document.querySelector(".loader");
			// const enterScreen = document.querySelector(".loader-start");
			// loadingScreen.style.opacity = "0";
			// setTimeout(() => loadingScreen.remove(), 1500);
			// setTimeout(() => enterScreen.classList.add("fade"), 1500);
			// enterScreen.addEventListener("click", () => loadScreen.remove());

			this.trigger("ready");
		}
	}
}
