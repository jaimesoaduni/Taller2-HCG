import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'

let scene, camera, renderer, controls, obama, earth

init()
animate()

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(0, 50, 40)
    camera.lookAt(scene.position)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)

    // Luz que alumbra toda la escena por igual.
    const light = new THREE.AmbientLight(0xffffff, 1)
    light.castShadow = true
    light.decay = 2
    scene.add(light)

    const pLight = new THREE.PointLight(0x4287f5, 5)
    pLight.position.set(50, 10, 50)
    scene.add(pLight)

    const planeGeo = new THREE.PlaneGeometry(100, 100)
    const planeMat = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0x323232
    })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.rotation.x = Math.PI * -.5
    scene.add(plane)

    const earthGeo = new THREE.SphereGeometry(10, 30, 30)
    const earthTex = new THREE.TextureLoader().load("img/Earth.jpg")
    const earthMat = new THREE.MeshLambertMaterial({
        map: earthTex,
    })
    earth = new THREE.Mesh(earthGeo, earthMat)
    earth.position.y = 12
    earth.castShadow = true
    earth.receiveShadow = true
    scene.add(earth)

    const obamaGeo = new THREE.ConeGeometry(10, 10, 4)
    const obamaTex = new THREE.TextureLoader().load("img/obamiumT1.png")
    obamaTex.wrapS = THREE.RepeatWrapping
    obamaTex.wrapT = THREE.RepeatWrapping
    obamaTex.repeat.x = 4
    const obamaMat = new THREE.MeshStandardMaterial({
        map: obamaTex,
        side: THREE.DoubleSide
    })
    obama = new THREE.Mesh(obamaGeo, obamaMat)
    obama.position.y = 30
    obama.castShadow = true
    obama.receiveShadow = true
    scene.add(obama)

    const amogusGeo = new THREE.PlaneGeometry(10, 10)
    const amogusTex = new THREE.TextureLoader().load("img/amogus.webp")
    const amogusMat = new THREE.MeshLambertMaterial({
        map: amogusTex,
        side: THREE.DoubleSide,
        transparent: true
    })
    const amogus = new THREE.Mesh(amogusGeo, amogusMat)
    amogus.position.y = -.1
    amogus.rotation.x = Math.PI / 2
    scene.add(amogus)
}

function animate() {
    requestAnimationFrame(animate)
    obama.rotation.y -= 0.025
    earth.rotation.y += 0.01
    renderer.render(scene, camera)
    controls.update()
}