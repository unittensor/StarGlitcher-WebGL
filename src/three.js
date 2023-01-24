import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = new THREE.Scene()
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000)

const Renderer = new THREE.WebGLRenderer({antialias: false})
Renderer.setPixelRatio(window.devicePixelRatio)
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)

const GridHelper = new THREE.GridHelper(200, 50)
Scene.add(GridHelper)

const AmbientLight = new THREE.AmbientLight(0xffffff)
Scene.add(AmbientLight)

const AxesHelper = new THREE.AxesHelper(20)
Scene.add(AxesHelper)

// Star Glitcher assets
const GLTF_Importer = new GLTFLoader()

GLTF_Importer.load('./assets/3D/gltf/Wing.gltf', (gltf_obj) => {
    const Material = new THREE.MeshStandardMaterial({color: 0xff0000})
    const gltf_Mesh = gltf_obj.scene

    gltf_Mesh.traverse((obj) => {
        if (obj.isMesh) {
            obj.material = Material
        }
    })
    Scene.add(gltf_Mesh)
})

let Wings = {
    Left: [],
    Right: []
}
// --

Camera.position.set(-20.4, 4.7, 0.1)

const Controls = new OrbitControls(Camera, Renderer.domElement)

Renderer.setAnimationLoop((deltaTime) => {
    Controls.update()
	Renderer.render(Scene, Camera)
})

window.addEventListener("resize", () => {
    Camera.aspect = window.innerWidth/window.innerHeight
    Camera.updateProjectionMatrix()
    Renderer.setSize(window.innerWidth, window.innerHeight)
})