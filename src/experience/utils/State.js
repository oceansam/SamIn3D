import * as THREE from "three";
import EventEmitter from "./EventEmitter";
import Experience from "../Experience";
import { gsap } from "gsap";
export default class State extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.currentState = "Spawn";
	}

	setState(state) {
		this.currentState = state;
		this.trigger("stateUpdated");
	}
	getCurrentState() {
		return this.currentState;
	}
}
