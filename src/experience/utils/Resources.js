import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
	constructor(sources) {
		super();
		this.sources = sources;

		// Setup
		this.items = { materials: {} };
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
		this.items[source.name] = file;
		this.loaded++;
		if (this.loaded === this.toLoad) {
			console.log("Finished Loading");
			this.trigger("ready");
		}
	}
}
