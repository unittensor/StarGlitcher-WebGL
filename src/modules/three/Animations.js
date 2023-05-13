import { Euler, Vector3 } from 'three'
import { CharacterMesh } from './rhpidEngine/rE_Character'
import { WingAssets } from './Wings'

const Joints = CharacterMesh.RIG_Joints
const WingJoints = WingAssets.Union

const rad = (x) => x*Math.PI/180
const vlerp = (Vector, Alpha) => new Vector3().lerp(Vector, Alpha)
const elerp = (Euler_v, Alpha) => new Euler().lerp(Euler_v, Alpha)

const AnimationTypes = (_this) => {
	return {
		Mayhem: {
			Idle: () => {

			}
		}
	}
}

const WingDelta = 850
const WingTransSpeed = .5

const Animations = class {
	constructor(deltaTime, delta) {
		this.deltaTime = deltaTime
		this.delta = delta
	}

	Rig(Mode) {
		return AnimationTypes(this)[Mode]
	}
 
	Wings() {
		WingJoints.WingLC03.C0(vlerp(new Vector3(Math.cos(this.delta/WingDelta)-1.5,-Math.cos(this.delta/WingDelta)*3,0),WingTransSpeed), 
			new Euler(rad((15*Math.cos(this.delta/WingDelta)-30)-3),rad(10*Math.cos(this.delta/WingDelta)),0))
		WingJoints.WingLC02.C0(vlerp(new Vector3(1.5*Math.cos(this.delta/WingDelta)-1.8,-Math.cos(this.delta/WingDelta),0),WingTransSpeed), 
			new Euler((rad(20*Math.cos(this.delta/WingDelta)-25)/1.8),rad(5*Math.cos(this.delta/WingDelta))/2.5,0))
		// WingJoints.WingLC01.C0(vlerp(new Vector3(2*Math.cos(this.delta/WingDelta)-2,-Math.cos(this.delta/WingDelta),0),WingTransSpeed), 
		// 	new Euler((rad(20*Math.cos(this.delta/WingDelta)-25)/4.5),rad(5*Math.cos(this.delta/WingDelta))/4.5,0))
		// WingJoints.WingRC03.C0(vlerp(new Vector3(2*Math.cos(this.delta/WingDelta)-2,-Math.cos(this.delta/WingDelta),0),WingTransSpeed))
		// WingJoints.WingRC02.C0(vlerp(new Vector3(2*Math.cos(this.delta/WingDelta)-2,-Math.cos(this.delta/WingDelta),0),WingTransSpeed))
		// WingJoints.WingRC01.C0(vlerp(new Vector3(2*Math.cos(this.delta/WingDelta)-2,-Math.cos(this.delta/WingDelta),0),WingTransSpeed))
	}
}

export {
	Animations
}