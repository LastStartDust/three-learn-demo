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

// 初始化Tween引擎
function initTween() {
  // 传入需要改变的对象: 这里我们传入cube的position属性, 
  new TWEEN.Tween( cube.position)
    .to( { x: 500 }, 3000 ) // 动画结束时移动到x轴的500位置, 动画耗时3000ms
    .repeat( Infinity ).start(); // repeat 重复次数 start开始动画
}

function render () {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  TWEEN.update(); // 更新动画,让物体移动
}


function startThree () {
  initRenderer()
  initScene()
  initCamera()
  initLight()
  initObject()
  initTween()
  renderer.clear() // 清除颜色、深度或模板缓存
  render()
}

window.onload = startThree