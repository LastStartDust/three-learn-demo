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
  // camera.position.x = 3
  // camera.position.y = 4
  camera.position.z = 800
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

let texture
let cube
function initObject () {
  texture = new THREE.Texture(canvas)
  const cubeGemo = new THREE.CubeGeometry(150, 150, 150)
  const material = new THREE.MeshLambertMaterial({ 
    map: texture // 纹理应用于材质上
  })
  texture.needsUpdate = true
  cube = new THREE.Mesh(cubeGemo, material)
  cube.position.set(0, 0, 0)

  scene.add(cube)
}

// 轨道控制
let controls
function initOrbiControls () {
  controls = new THREE.OrbitControls( camera, renderer.domElement )
}

// 渲染动画
function animate () {
  // 更新控制器
  controls.update()
  texture.needsUpdate = true
  renderer.render(scene, camera)
  cube.rotation.y += 0.01
  cube.rotation.z += 0.01
  requestAnimationFrame(animate)
}

function startThree () {
  clock() // 创建时钟,成功创建后放到canvas变量中
  initScene()
  initCamera()
  initObject()
  initLight()
  initRenderer()
  initOrbiControls()
  animate()
}

window.onload = startThree