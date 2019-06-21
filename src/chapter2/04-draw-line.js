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
  camera.position.set( 200, 500, 500 )
  camera.lookAt( 0, 0, 0 );
}

// 初始化场景
function initScene () {
  scene = new THREE.Scene()
}

function initObject () {
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({ 
    vertexColors: true // 根据顶点颜色进行着色
  })

  // 定义顶点颜色
  const color1 = new THREE.Color(0x444444)
  const color2 = new THREE.Color(0xff0000)

  // 定义点
  const p1 = new THREE.Vector3(-100, 0, 100)
  const p2 = new THREE.Vector3(100, 0, -100)

  geometry.vertices.push(p1)
  geometry.vertices.push(p2)
  geometry.colors.push(color1, color2)

  // 生成线
  const line = new THREE.Line(geometry, material, THREE.LineSegments)
  scene.add(line)

  // const axes = new THREE.AxesHelper(300)
  // scene.add(axes)
}

function initLight () {
  const light = new THREE.DirectionalLight(0xff0000, 1.0, 0)
  light.position.set(100, 100, 200)
  scene.add(light)
}

function render () {
  renderer.clear() // 清除颜色、深度或模板缓存
  renderer.render(scene, camera)
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