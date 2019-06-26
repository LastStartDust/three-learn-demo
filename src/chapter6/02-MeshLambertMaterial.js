/// <reference path="../../node_modules/@types/three/index.d.ts" />

let scene
let camera
let renderer
let width
let height

// 初始化场景
function initScene () {
  scene = new THREE.Scene()
  width = window.innerWidth
  height = window.innerHeight
}

// 初始化相机
function initCamera () {
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  // 设置相机位置,将相机指向场景中心
  camera.position.x = 50
  camera.position.y = 50
  camera.position.z = 50
  camera.lookAt(0, 0, 0)
  scene.add(camera)
}

// 初始化渲染器
function initRenderer () {
  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0x000000)
  renderer.setSize(width, height)
  // 渲染器开启阴影渲染
  renderer.shadowMapEnabled = true
  document.body.appendChild(renderer.domElement)
}

function initObject () {

  const geometry = new THREE.BoxGeometry(30, 30, 30)
  const material = new THREE.MeshLambertMaterial({ 
    // color: 0xff0000,
    emissive: 0x00ff00
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh);
}

function initLight () {
  const light = new THREE.SpotLight(0xffffff)
  light.position.set(20,30,50)
  scene.add(light)
}

// 渲染动画
function animate () {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function startThree () {
  initScene()
  initCamera()
  initObject()
  initLight()
  initRenderer()
  animate()
}

window.onload = startThree