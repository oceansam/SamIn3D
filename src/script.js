import Experience from "./experience/Experience";

const experience = new Experience();
// ----------------------------------------
// import "./style.css";
// import * as dat from "lil-gui";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// // import {
// 	CSS3DRenderer,
// 	CSS3DObject,
// } from "three/examples/jsm/renderers/CSS3DRenderer.js";
// import { gsap } from "gsap";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// // /**
// //  * Spector JS
// //  */
// // const SPECTOR = require('spectorjs')
// // const spector = new SPECTOR.Spector()
// // spector.displayUI()

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI({
// 	width: 400,
// });

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// const textCanvas = document.querySelector("canvas.menu");
// // Scene
// const scene = new THREE.Scene();
// const sceneCSS = new THREE.Scene();

// /**
//  * Loaders
//  */
// // Texture loader
// const textureLoader = new THREE.TextureLoader();

// Draco loader
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("draco/");

// // GLTF loader
// const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader);
// /**
//  * Textures
//  */
// const backedTexture = textureLoader.load("bakedMap.jpg");
// backedTexture.flipY = false;
// backedTexture.encoding = THREE.sRGBEncoding;
// const bakedMaterial = new THREE.MeshBasicMaterial({ map: backedTexture });

// /**
//  * Model
//  */
// gltfLoader.load("TrainTest.glb", (gltf) => {
// 	// const lightA = gltf.scene.children.find((child) => child.name == "Light");
// 	// console.log(lightA);

// 	// gui.add(rectLight.position, "x").min(0).max(3);
// 	// gui.add(rectLight.position, "y").min(0).max(3);
// 	// gui.add(rectLight.position, "z").min(-2).max(2);

// 	// poleLightAMesh.material = poleLightMaterial;
// 	// const pointLight = new THREE.
// 	const light = new THREE.AmbientLight(0xffffff, 1);
// 	scene.add(light);
// 	gltf.scene.traverse((child) => {
// 		child.material = bakedMaterial;
// 	});
// 	scene.add(gltf.scene);
// });

// /**
//  * Sizes
//  */
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
// 	// Update sizes
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;

// 	// Update camera
// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();

// 	// Update renderer
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// 	renderer.outputEncoding = THREE.sRGBEncoding;

// 	// Update renderer
// 	renderer2.setSize(sizes.width, sizes.height);
// });

// // const light = new THREE.AmbientLight(0xffffff, 1);
// // scene.add(light);
// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	sizes.width / sizes.height,
// 	0.1,
// 	100
// );
// camera.position.x = 6;
// camera.position.y = 1.5;
// camera.position.z = 1;
// camera.lookAt(-20, -10, -20);
// gui.add(camera.position, "x").min(-50).max(50).step(1);
// gui.add(camera.position, "y").min(-50).max(50).step(1);
// gui.add(camera.position, "z").min(-50).max(50).step(1);

// gui.add(camera.rotation, "x").min(-10).max(10).step(0.1);
// gui.add(camera.rotation, "y").min(-10).max(10).step(0.1);
// gui.add(camera.rotation, "z").min(-10).max(10).step(0.1);
// scene.add(camera);

// // // Controls
// // const controls = new OrbitControls(camera, canvas);
// // controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
// 	canvas: canvas,
// 	antialias: true,
// });

// const renderer2 = new CSS3DRenderer();
// renderer2.setSize(window.innerWidth, window.innerHeight);
// renderer2.domElement.style.position = "absolute";
// renderer2.domElement.style.top = 0;
// document.querySelector(".css3d").appendChild(renderer2.domElement);

// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.outputEncoding = THREE.sRGBEncoding;
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// /**
//  * Text
//  */
// function createText(text, posObj, className, rotObj, handleClick) {
// 	var element = document.createElement("div");

// 	element.innerText = text;
// 	element.className = className;
// 	element.style.color = "white";
// 	element.style.border = "2px solid blue;";
// 	element.onclick = handleClick;
// 	const domObject = new CSS3DObject(element);

// 	const { xPos, yPos, zPos } = posObj;
// 	const { xRot, yRot, zRot } = rotObj;
// 	// domObject.position.set(xPos, yPos, zPos);
// 	domObject.translateX(xPos);
// 	domObject.translateY(yPos);
// 	domObject.translateZ(zPos);
// 	domObject.rotation.set(xRot, yRot, zRot);

// 	return { domObject, element };
// }

// // const group = new THREE.Group();
// // function animateCamera() {
// // 	gsap.to(camera.position, { x: 1 });
// // }
// // const project = createText(
// // 	"Projects",
// // 	{ xPos: -80, yPos: -80, zPos: -90 },
// // 	"menu-item",
// // 	{
// // 		xRot: -Math.PI / 2,
// // 		yRot: 0,
// // 		zRot: Math.PI / 2,
// // 	},
// // 	animateCamera
// // );
// // group.add(project.domObject);
// var load2 = new FontLoader();
// let planes = [];
// load2.load("open-sans.json", function (font) {
// 	var textGeo = new TextGeometry("Projects", {
// 		font: font,
// 		size: 0.2,
// 		height: 0.01,
// 	});

// 	var textMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd });
// 	var mesh = new THREE.Mesh(textGeo, textMaterial);
// 	mesh.position.set(4.2, 0, -0.5);
// 	mesh.rotation.set(4.8, 0, 0);
// 	const temp = gui.addFolder("TextMenu");
// 	const rotation = temp.addFolder("rotation");
// 	rotation.add(mesh.rotation, "x", -50, 50, 0.1);
// 	rotation.add(mesh.rotation, "y", -50, 50, 0.1);
// 	rotation.add(mesh.rotation, "z", -50, 50, 0.1);
// 	const position = temp.addFolder("position");
// 	position.add(mesh.position, "x", -50, 50, 0.1);
// 	position.add(mesh.position, "y", -50, 50, 0.1);
// 	position.add(mesh.position, "z", -50, 50, 0.1);
// 	scene.add(mesh);
// 	planes.push(mesh);
// });
// /**
//  * Raycast onClick Handler
//  */

// const raycaster = new THREE.Raycaster();

// // group.add(
// // 	createText("Experience", { xPos: -70, yPos: -100, zPos: -70 }, "menu-item", {
// // 		xRot: -Math.PI / 2,
// // 		yRot: 0,
// // 		zRot: 1,
// // 	})
// // );
// // group.add(
// // 	createText("Github", { xPos: -150, yPos: -100, zPos: -30 }, "menu-item", {
// // 		xRot: -Math.PI / 2,
// // 		yRot: 0,
// // 		zRot: 0.8,
// // 	})
// // );
// // sceneCSS.add(group);
// // createText(
// // 	"Work Experience",
// // 	{ xPos: -40, yPos: -60, zPos: -50 },
// // 	"menu-item",
// // 	{
// // 		xRot: -Math.PI / 2,
// // 		yRot: 0,
// // 		zRot: 1,
// // 	}
// // );
// // createText("Github", { xPos: -100, yPos: -50, zPos: -20 }, "menu-item", {
// // 	xRot: -Math.PI / 2,
// // 	yRot: 0,
// // 	zRot: 1.5,
// // });

// // Debug UI
// // const CSSElements = gui.addFolder("CSS3D");
// // const positionCSS = CSSElements.addFolder("Position");
// // const rotationCSS = CSSElements.addFolder("Rotation");

// // positionCSS.add(domObject.position, "x", -50, 50, 1);
// // positionCSS.add(domObject.position, "y", -50, 50, 1);
// // positionCSS.add(domObject.position, "z", -50, 50, 1);

// // rotationCSS.add(domObject.rotation, "x", -Math.PI * 2, Math.PI * 2);
// // rotationCSS.add(domObject.rotation, "y", -Math.PI * 2, Math.PI * 2);
// // rotationCSS.add(domObject.rotation, "z", -Math.PI * 2, Math.PI * 2);
// /**
//  * Mouse
//  */
// function handleClick(e) {
// 	const mouse = new THREE.Vector2();
// mouse.x = (e.clientX / sizes.width) * 2 - 1;
// mouse.y = -(e.clientY / sizes.height) * 2 + 1;
// 	// Raycaster
// 	raycaster.setFromCamera(mouse, camera);
// 	const intersections = raycaster.intersectObjects(planes, true);
// 	if (intersections.length > 0) {
// 		alert("clicked");
// 	}
// }
// window.addEventListener("click", handleClick, true);

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// const tick = () => {
// 	// Update controls
// 	// controls.update();
// 	// for (const child of group.children) {
// 	// 	const screenPosition = child.position.clone();
// 	// 	screenPosition.project(camera);
// 	// 	const translateX = screenPosition.x * (sizes.width / 2);
// 	// 	const translateY = screenPosition.y * (sizes.height / 2);

// 	// 	project.element.style.translate = `translate(${translateX}px, ${translateY}px)`;
// 	// }

// 	// Render
// 	renderer.render(scene, camera);
// 	renderer2.render(sceneCSS, camera);
// 	// Call tick again on the next frame
// 	window.requestAnimationFrame(tick);
// };

// tick();
