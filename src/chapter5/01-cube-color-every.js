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

  const cubeGemo = new THREE.BoxGeometry(100, 100, 100)
  // 正方体6个面,每个面由2个三角形组成,faces.length = 12
  // 将Geometry中的每两三角面赋予随机的一种颜色
  for (let i = 0, len = cubeGemo.faces.length; i < len; i += 2) {
    const hexColor = Math.random() * 0xffffff
    cubeGemo.faces[i].color.setHex(hexColor)
    cubeGemo.faces[i+1].color.setHex(hexColor)
  }
  const material = new THREE.MeshBasicMaterial({ 
    // 顶点使用cubeGemo.faces[i].color的颜色
    // vertexColors: THREE.FaceColors 指定一个面中4个顶点的颜色,在渲染的时候，面的颜色就取四个顶点的插值
    vertexColors: THREE.FaceColors 
  })
  cube = new THREE.Mesh(cubeGemo, material)
  cube.position.set(0, 0, 0)

  scene.add(cube)
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
  initGrid()
  initRenderer()
  animate()
}

window.onload = startThree