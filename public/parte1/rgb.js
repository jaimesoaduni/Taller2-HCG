import * as THREE from 'three'
import { OrbitControls } from 'orbitcontrols'
import Stats from 'stats'
import { GUI } from 'gui'

let scene, camera, renderer, controls

const stats = new Stats()
document.body.appendChild(stats.dom)

init()
animate()

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 50, 40)
    camera.lookAt(scene.position)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)

    const light1 = new THREE.PointLight(0xff0000, 5)
    const light2 = new THREE.PointLight(0x00ff00, 5)
    const light3 = new THREE.PointLight(0x0000ff, 5)

    light1.position.set(10, 15, 10)
    light2.position.set(10, 15, -10)
    light3.position.set(-10, 15, 0)

    light1.castShadow = true
    light2.castShadow = true
    light3.castShadow = true

    scene.add(light1)
    scene.add(light2)
    scene.add(light3)

    const planeGeo = new THREE.PlaneGeometry(100, 100)
    const planeMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0x323232
    })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.rotation.x = Math.PI * -.5
    plane.receiveShadow = true
    scene.add(plane)

    const cubeGeo = new THREE.BoxGeometry(10, 10, 10)
    const cubeMat = new THREE.MeshLambertMaterial({
        color: 0x202020
    })
    const cube = new THREE.Mesh(cubeGeo, cubeMat)
    cube.position.y = 5
    cube.receiveShadow = true
    cube.castShadow = true
    scene.add(cube)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const gui = new GUI()
    const light1Folder = gui.addFolder('light1 (red)')
    const light2Folder = gui.addFolder('light2 (green)')
    const light3Folder = gui.addFolder('light3 (blue)')

    light1Folder.add(light1.position, 'x', -50, 50)
    light1Folder.add(light1.position, 'y', 1, 50)
    light1Folder.add(light1.position, 'z', -50, 50)

    light2Folder.add(light2.position, 'x', -50, 50)
    light2Folder.add(light2.position, 'y', 1, 50)
    light2Folder.add(light2.position, 'z', -50, 50)

    light3Folder.add(light3.position, 'x', -50, 50)
    light3Folder.add(light3.position, 'y', 1, 50)
    light3Folder.add(light3.position, 'z', -50, 50)

    light1Folder.open()
    light2Folder.open()
    light3Folder.open()
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    controls.update()
    stats.update()
}