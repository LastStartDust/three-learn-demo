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
  const light = new THREE.AmbientLight(0xffffff, 1, 1000)
  light.position.set(2, 3, 5)
  scene.add(light)
}


let cube
function initObject () {

  // 加载图片,导入纹理中,在加载成功后重新渲染,避免出现什么都看不到情况
  // 一片黑原因: 在导入纹理之前，已经完成渲染
  // const texture = new THREE.TextureLoader().load('../images/纹理.jpg', () => {
  //   renderer.render(scene, camera)
  // })

  const texture = new THREE.TextureLoader().load('../images/纹理.jpg')

  const cubeGemo = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ 
    map: texture // 纹理应用于材质上
  })
  cube = new THREE.Mesh(cubeGemo, material)
  cube.position.set(0, 0, 0)

  scene.add(cube)
}

// 渲染动画
function animate () {
  renderer.render(scene, camera)
  cube.rotation.y += 0.01
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