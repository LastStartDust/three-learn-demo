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
  camera.position.x = 300
  camera.position.y = 300
  camera.position.z = 500
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

let cube
function initObject () {

  // const cubeGemo = new THREE.BoxGeometry(100, 100, 100, 1, 2, 3)
  // const material = new THREE.MeshBasicMaterial({ 
  //   color: 0x00ff00,
  //   wireframe: true
  // })
  // cube = new THREE.Mesh(cubeGemo, material)
  // cube.position.set(0, 0, 0)

  // scene.add(cube)

  const planeGemo = new THREE.PlaneGeometry(400, 200)
  const material = new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
    wireframe: true
  })
  const plane = new THREE.Mesh(planeGemo, material)
  plane.position.set(0, 0, 0)
  scene.add(plane)

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
  // cube.rotation.y += 0.01
  cube.rotateY(0.02)
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