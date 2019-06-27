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
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
  // 设置相机位置,将相机指向场景中心
  camera.position.x = 100
  camera.position.y = 100
  camera.position.z = 300
  // camera.position.z = 1000
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
  const light = new THREE.SpotLight(0xffffff)
  light.position.set(0, 100, 100)
  scene.add(light)

  const light2 = new THREE.SpotLight(0xffffff)
  light2.position.set(0, 100, -100)
  scene.add(light2)

  const axes = new THREE.AxesHelper(100)
  scene.add(axes)
}

function initObject () {

  const loader = new THREE.GLTFLoader()
  const url = "./blue_rose_sword/scene.gltf"
  loader.load(
    url,
    function(gltf) {
      gltf.scene.scale.set(0.1, 0.1, 0.1)
      gltf.scene.position.set(-18, 18, 0)
      gltf.scene.rotation.y = Math.PI / 5.6
      gltf.scene.rotation.x = -Math.PI / 2
      scene.add( gltf.scene);
    },
    undefined,
    function(error) {
      console.error(error)
    }
  )

  // 平面
  const planeGemo = new THREE.PlaneGeometry(100, 180)
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  })
  const plane = new THREE.Mesh(planeGemo, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -5
  scene.add(plane)
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
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function startThree () {
  initScene()
  initCamera()
  initObject()
  initLight()
  initRenderer()
  initOrbiControls()
  animate()
}

window.onload = startThree