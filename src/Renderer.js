import * as THREE from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Experience from "./experience/Experience";
export default class Renderer {
	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.cssScene = this.experience.cssScene;
		this.camera = this.experience.camera;
		this.setInstance();
	}

	setInstance() {
		this.rendererCss = new CSS3DRenderer();
		this.rendererCss.setSize(window.innerWidth, window.innerHeight);
		this.rendererCss.domElement.style.position = "absolute";
		this.rendererCss.domElement.style.position = "absolute";
		this.rendererCss.domElement.style.top = 0;
		document.querySelector("#css3d").appendChild(this.rendererCss.domElement);

		this.rendererGl = new THREE.WebGLRenderer({ alpha: true });
		this.rendererGl.setSize(window.innerWidth, window.innerHeight);
		this.rendererGl.setClearColor(0x000000, 0.0);
		this.rendererGl.shadowMap.enabled = true;
		this.rendererGl.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		this.rendererGl.outputEncoding = THREE.sRGBEncoding;

		document.querySelector("#webgl").appendChild(this.rendererGl.domElement);
		// this.rendererCss.domElement.appendChild(this.rendererGl.domElement);

		// document.body.appendChild(this.rendererCss.domElement);
	}

	resize() {
		this.rendererGl.setSize(this.sizes.width, this.sizes.height);
		this.rendererCss.setSize(this.sizes.width, this.sizes.height);
		this.rendererGl.setPixelRatio(this.sizes.pixelRatio);
	}
	update() {
		this.rendererGl.render(this.scene, this.camera.instance);
		this.rendererCss.render(this.scene, this.camera.instance);
	}
}
/**
 * 		this.rendererCss = new CSS3DRenderer();
		this.rendererCss.setSize(window.innerWidth, window.innerHeight);
		this.rendererCss.domElement.style.position = "absolute";
		this.rendererCss.domElement.style.top = 0;
		this.rendererGl = new THREE.WebGLRenderer({ alpha: true });
		this.rendererGl.setClearColor(0x000000, 0.0);
		this.rendererGl.outputEncoding = THREE.sRGBEncoding;

		this.rendererGl.setSize(window.innerWidth, window.innerHeight);

		this.rendererGl.domElement.style.position = "absolute";
		this.rendererGl.domElement.style.zIndex = 1;
		this.rendererGl.domElement.style.top = 0;

		// this.rendererGl.domElement.appendChild(this.rendererCss.domElement);
		document.body.appendChild(this.rendererCss.domElement);
		document.body.appendChild(this.rendererGl.domElement);
 */
