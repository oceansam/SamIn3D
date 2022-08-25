import * as THREE from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Experience from "./experience/Experience";
export default class Renderer {
	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.setInstance();
	}

	setInstance() {
		// WebGL
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.instanceHTML = new CSS3DRenderer();
		this.instanceHTML.domElement.style.position = "absolute";
		this.instanceHTML.domElement.style.zIndex = 0;
		this.instanceHTML.domElement.style.top = 0;

		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instanceHTML.setSize(this.sizes.width, this.sizes.height);

		this.instance.setPixelRatio(this.sizes.pixelRatio);

		const container = document.querySelector(".css3D");
		container.appendChild(this.instanceHTML.domElement);
		this.instance.outputEncoding = THREE.sRGBEncoding;
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instanceHTML.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}
	update() {
		this.instance.render(this.scene, this.camera.instance);
		this.instanceHTML.render(this.scene, this.camera.instance);
	}
}
