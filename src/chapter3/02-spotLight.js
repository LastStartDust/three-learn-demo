/// <reference path="../../node_modules/@types/three/index.d.ts" />

let scene
let camera
let renderer
let controls
let plane
let planeGeometry
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
  const spotLight = new THREE.SpotLight(0xFF69B4)
  spotLight.position.set(0, 1, 0) // 将灯放到顶部(Y轴上),往下照射
  scene.add(spotLight)

  const spotLight2 = new THREE.SpotLight()
  spotLight2.position.set(1, 0, 1)
  scene.add(spotLight2)
}

function initObject () {
  const cubeGemo = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(cubeGemo, material)
  cube.position.set(0, 0, 0)

  scene.add(cube)
}

// 渲染动画
function animate () {
  renderer.render(scene, camera)
  // requestAnimationFrame(animate)
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