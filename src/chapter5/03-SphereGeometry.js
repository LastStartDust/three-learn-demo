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
  camera.position.x = 0
  camera.position.y = 500
  camera.position.z = 0
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
  const light = new THREE.AmbientLight(0xffffff, 1, 1000)
  light.position.set(2, 3, 5)
  scene.add(light)
}

function initObject () {

  const sphereGeometry = new THREE.SphereGeometry(200, 4, 100)
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xffff00,
    wireframe: true
  })
  const sphere = new THREE.Mesh(sphereGeometry, material)
  sphere.position.set(0,0,0)
  scene.add(sphere)

  const axes = new THREE.AxesHelper(500, 500)
  scene.add(axes)
}

// 绘制网格
function initGrid () {
  // 网格总长度1000, 每个小格子50长
  const helper = new THREE.GridHelper(500, 4, 0xff0000, 0xffffff)
  scene.add(helper)
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
  // initLight()
  // initGrid()
  initRenderer()
  animate()
}

window.onload = startThree