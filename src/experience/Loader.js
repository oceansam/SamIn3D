import EventEmitter from "./utils/EventEmitter";
import { gsap } from "gsap";
export default class Loader extends EventEmitter {
	constructor(sources) {
		super();

		this.lastProgress = 0;

		// Progressive Loader
		this.loadContainer = document.querySelector(".loading-screen");
		this.loadProgress = document.querySelector(".load-progress");
		this.loadBar = document.querySelector(".load-bar");

		// Enter Screen
		this.enterBtn = document.querySelector(".enter-btn");
		this.enterScreen = document.querySelector(".enter-screen");
		this.enterBtn.addEventListener("click", (e) => {
			gsap.to(this.enterScreen, {
				opacity: 0,
				display: "none",
				duration: 1,
			});
		});
	}

	updateProgressModel(value) {
		this.loadProgress.innerHTML = value;
		gsap.fromTo(
			this.loadBar,
			{ width: this.lastProgress + "%" },
			{ width: value + "%", duration: 1 }
		);
		this.lastProgress = value;
	}
	updateProgressTexture(value) {
		this.loadProgress.innerHTML = this.lastProgress + value;
		gsap.fromTo(
			this.loadBar,
			{ width: this.lastProgress + "%" },
			{ width: this.lastProgress + value + "%", duration: 1 }
		);

		if (value + this.lastProgress >= 100) {
			gsap.to(this.loadContainer, {
				opacity: 0,
				duration: 1,
				onComplete: () => {
					this.loadContainer.style.display = "none";
				},
			});
		}
	}
}
