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
		this.loadManager = new THREE.LoadingManager(
			() => {
				window.setTimeout(() => {
					this.screenLoader.removeLoader();
				}, 500);
			},
			(itemUrl, itemLoaded, itemsTotal) => {
				let ratio = itemLoaded / itemsTotal;
				this.screenLoader.updateProgress(ratio.toFixed(2) * 100);
			}
		);

		this.loaders = {};
		this.loaders.dracoLoader = new GLTFLoader(this.loadManager).setDRACOLoader(
			new DRACOLoader().setDecoderPath("draco/")
		);
		this.loaders.textureLoader = new THREE.TextureLoader(this.loadManager);
		this.loaders.FontLoader = new FontLoader(this.loadManager);
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
		this.items[source.name] = file;
		this.loaded++;

		if (this.loaded === this.toLoad) {
			this.trigger("ready");
		}
	}
}
