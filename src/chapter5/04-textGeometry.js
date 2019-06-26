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
  camera.position.x = 120
  camera.position.y = 20
  camera.position.z = 100
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

  const loader = new THREE.FontLoader()
  loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {

    const geometry = new THREE.TextGeometry( 'Hello!', {
      font: font,
      size: 40,
      height: 10
    });
    const material = new THREE.MeshBasicMaterial({ color: 0x7B68EE })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh);

    // render
    renderer.render(scene, camera);
  })

  const axes = new THREE.AxesHelper(500, 500)
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
  initRenderer()
  animate()
}

window.onload = startThree