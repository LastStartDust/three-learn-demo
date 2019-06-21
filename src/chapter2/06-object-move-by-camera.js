/// <reference path="../../node_modules/@types/three/index.d.ts" />
let scene
let camera
let renderer
let width
let height

// 初始化渲染器
function initRenderer () {
  const canvasFrame = document.getElementById('canvas-frame')
  width = canvasFrame.clientWidth
  height = canvasFrame.clientHeight
  renderer = new THREE.WebGLRenderer()

  renderer.setClearColor(0xFFFFF0, 1.0)
  renderer.setSize(width, height)
  document.getElementById('canvas-frame').appendChild(renderer.domElement)
}

// 初始化相机
function initCamera () {
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
  // 设置相机位置,将相机指向场景中心
  camera.position.set( 0, 0, 1200 )
  camera.lookAt( 0, 0, 0 );
}

// 初始化场景
function initScene () {
  scene = new THREE.Scene()
}

let cube
function initObject () {
  const cubeGeom = new THREE.CylinderGeometry(100, 150, 400)
  const material = new THREE.MeshLambertMaterial({
    color: 0xCD853F
  })

  cube = new THREE.Mesh(cubeGeom, material)
  scene.add(cube)
  
  const axes = new THREE.AxesHelper(600)
  scene.add(axes)
}

function initLight () {
  const light = new THREE.DirectionalLight(0xffffff, 1.0, 0)
  light.position.set(100, 100, 200)
  scene.add(light)
}

function render () {
  renderer.clear() // 清除颜色、深度或模板缓存
  // 移动到-500 复位
  camera.position.x = camera.position.x < -500 ? 0 : camera.position.x
  // 相机往左移动,看到物体相对往右移动
  camera.position.x -= 2
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

function startThree () {
  initRenderer()
  initScene()
  initCamera()
  initLight()
  initObject()
  render()
}

window.onload = startThree