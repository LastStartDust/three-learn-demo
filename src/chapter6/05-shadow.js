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
  camera.position.z = 50
  camera.position.x = 50
  camera.position.y = 50
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
  
  // 创建立方体
  const cubeGeometry = new THREE.BoxGeometry(10, 10, 10)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
  })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(0, 20, 20)
  cube.castShadow = true // 产生阴影
  scene.add(cube)

  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(50, 80)
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xeeeeee
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2 // 因为平面默认是在xy的平面上,选择90度,放到xz平面
  plane.position.y = -1 // 方面看到阴影
  plane.receiveShadow = true
  scene.add(plane)
}

function initLight () {
  const light = new THREE.SpotLight(0xffffff)
  light.position.set(0, 50, 40)
  light.castShadow = true
  scene.add(light)

  const axes = new THREE.AxesHelper(50)
  scene.add(axes)
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