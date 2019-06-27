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
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  // 设置相机位置,将相机指向场景中心
  camera.position.x = 3
  camera.position.y = 4
  camera.position.z = 5
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

function initLight() {
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(10, 30, 50)
  scene.add(light)
}

function initObject () {

  const cubeGemo = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ 
    color: 0xffff00
  })
  const cube = new THREE.Mesh(cubeGemo, material)
  cube.position.set(0, 0, 0)

  scene.add(cube)
}

// 初始化轨道控制器
let orbitControls
function initOrbitControls () {
  orbitControls = new THREE.OrbitControls(camera, renderer.domElement)
}

// 渲染动画
function animate () {
  renderer.render(scene, camera)
  
  orbitControls.update()
  requestAnimationFrame(animate)
}

function startThree () {
  initScene()
  initCamera()
  initObject()
  initLight()
  initRenderer()
  initOrbitControls()
  animate()
}

window.onload = startThree