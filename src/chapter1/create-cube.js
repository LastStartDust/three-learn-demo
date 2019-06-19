/// <reference path="../../node_modules/@types/three/index.d.ts" />
// 获取canvas画布
const threeCanvas = document.getElementById('three-canvas')
const width = threeCanvas.clientWidth
const height = threeCanvas.clientHeight

// 创建场景
const scene = new THREE.Scene()
// 创建相机 视角, 宽高比, 最近距离,最远距离
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

// 场景渲染器, 指定渲染的canvas
const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas
})

// 设置背景色和透明度
renderer.setClearColor(0xeeeeee, 1.0)
// 设置渲染大小
renderer.setSize(width, height)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00BFFF })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 设置相机位置,将相机指向场景中心
camera.position.x = -3
camera.position.y = 4
camera.position.z = 3
camera.lookAt(scene.position)

// 开始渲染场景和相机
renderer.render(scene, camera)







