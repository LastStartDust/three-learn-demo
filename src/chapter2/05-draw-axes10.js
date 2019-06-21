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
  camera.position.set( 400, 1000, 1000 )
  camera.lookAt( 0, 0, 0 );
}

// 初始化场景
function initScene () {
  scene = new THREE.Scene()
}

function initObject () {
  const geometry = new THREE.Geometry()
  const material = new THREE.LineBasicMaterial({ 
    color: 0x000000,
    opacity: 0.2
  })

  // 定义点
  const p1 = new THREE.Vector3(-500, 0, 0)
  const p2 = new THREE.Vector3(500, 0, 0)

  geometry.vertices.push(p1)
  geometry.vertices.push(p2)


  for (let i = 0; i < 10; i++) {
    const line1 = new THREE.Line(geometry, material)
    line1.position.z = (i * 100) - 500
    scene.add(line1)

    const line2 = new THREE.Line(geometry, material)
    line2.rotation.y = 90 * Math.PI / 180 // 绕y轴旋转90度
    line2.position.x = (i * 100) - 500
    scene.add(line2)
  }

  const axes = new THREE.AxesHelper(600)
  scene.add(axes)
}

function initLight () {
  light = new THREE.AmbientLight(0xFFFFFF);
  light.position.set(100, 100, 200);
  scene.add(light);
  light = new THREE.PointLight(0x00FF00);
  light.position.set(0, 0,300);
  scene.add(light);
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