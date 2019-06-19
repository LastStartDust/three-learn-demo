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

// 设置清屏色并清屏
renderer.setClearColor('0xeeeeee')
renderer.clearColor()
// 设置场景大小
renderer.setSize(width, height)

// 创建坐标轴,进行辅助,方便查看
const axes = new THREE.AxesHelper(20)
scene.add(axes)

// 创建平面几何
const planeGeometry = new THREE.PlaneGeometry(60, 20)
// 创建平面材质
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc })
// 创建平面对象
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

// 沿着x轴选择-90度
plane.rotation.x = - Math.PI * 0.5
// 定义plane在场景中的位置
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0
scene.add(plane)

// 设置相机位置,将相机指向场景中心
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)

renderer.render(scene, camera)


