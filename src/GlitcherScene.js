import * as THREE        from 'three'
import { CreateImport }  from '/modules/three/GLTFImport'
import { FPS_Stats }     from './UI'
// Engine
import { 
    RootObject, 
    RootMovement, 
    CameraControls } from '/modules/three/rhpidEngine/rE_Root'

const WebGL_Renderer = new THREE.WebGLRenderer({antialias: false})
const Scene          = new THREE.Scene()
const Camera         = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)
const GridHelper     = new THREE.GridHelper(200, 50)
const AmbientLight   = new THREE.AmbientLight(0xffffff)
const AxesHelper     = new THREE.AxesHelper(20)

// Create the mover for the player character
const RootMover = new RootObject(Scene).Create()
const RootMove  = new RootMovement(RootMover)
RootMover.position.y = 10
// --

// Star Glitcher assets
const GLTFImport = new CreateImport(Scene)
const Assets = {
    WingsLeft: [],
    WingsRight: [],
    Ring: null
}

async function CreateWing(Color, LeftSided) {
    const WingGLTF = await GLTFImport.GLTF('/3D/gltf/Wing.gltf')
    const Side = LeftSided && Assets.WingsLeft || Assets.WingsRight
    let WingObject = null

    WingGLTF.scene.traverse((Object) => {
        Object.material = new THREE.MeshStandardMaterial({color: Color})
        Object.position.z = LeftSided && -Side.length-1.7 || Side.length+1.7
        WingObject = Object
    })
    Side.push(WingGLTF.scene)
    return {
        GLTF: WingGLTF,
        Object: WingObject
    }
}

async function CreateRing(Color) {
    const RingGLTF = await GLTFImport.GLTF('/3D/gltf/Ring.gltf')
    let RingObject = null

    RingGLTF.scene.traverse((Object) => {
        Object.material = new THREE.MeshStandardMaterial({color: Color})
        RingObject = Object
    })
    Assets.Ring = RingGLTF.scene
    return {
        GLTF: RingGLTF,
        Object: RingObject
    }
}

async function CreateGlitcherAssets() {
    const DEF_ModeColor = 0xff0000 //Mayhem
    const Ring = await CreateRing(DEF_ModeColor)
    Ring.Object.rotation.z = Math.PI/2
    Ring.Object.position.y = 1.5
    Ring.Object.scale.set(3,3,3)

    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
    CreateWing(DEF_ModeColor, true)
}

Scene.add(
    GridHelper,
    AmbientLight,
    AxesHelper
)
CreateGlitcherAssets()

Camera.position.set(-20.4, 4.7, 0.1)

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
}, false)

WebGL_Renderer.setPixelRatio(window.devicePixelRatio)
WebGL_Renderer.setSize(window.innerWidth, window.innerHeight)
WebGL_Renderer.domElement.style.zIndex   = 1
WebGL_Renderer.domElement.style.position = 'absolute'
document.body.appendChild(WebGL_Renderer.domElement)

WebGL_Renderer.setAnimationLoop((deltaTime) => {
    CameraControls.update()
    

    WebGL_Renderer.render(Scene, Camera)
    FPS_Stats.update()
})

export {
    Assets,
    CreateWing,
    CreateRing
}