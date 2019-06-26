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
  // camera.position.x = 1000
  camera.position.y = 300
  // camera.position.z = 1000
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  var helper = new THREE.CameraHelper( camera );
  scene.add( helper );
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
  light.position.set(0, 0, 0)
  scene.add(light)
}

// let cube
var mixers = [];
function initObject () {

  const loader = new THREE.FBXLoader()

  loader.load(
    "./blue-rose-sword/source/maya2sketchfab.fbx",
    function(gltf) {
      console.log(gltf)
      gltf.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add( gltf.scene);
    },
    undefined,
    function(error) {
      console.error(error)
    }
  )
}

// 渲染动画
function animate () {
  // cube.rotation.y += 0.01
  // cube.rotation.z += 0.01
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