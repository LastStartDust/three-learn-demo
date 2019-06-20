/// <reference path="../../node_modules/@types/three/index.d.ts" />
const stats = initStats()

// 获取canvas画布
const threeCanvas = document.getElementById('three-canvas')
const width = threeCanvas.clientWidth
const height = threeCanvas.clientHeight

// 创建场景
const scene = new THREE.Scene()
// 创建相机 视角, 宽高比, 最近距离,最远距离
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

// 创建渲染器, 指定渲染的canvas
const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas })

// 设置背景色和透明度
renderer.setClearColor(0xeeeeee, 1.0)
// 设置渲染大小
renderer.setSize(width, height)
// 渲染阴影
renderer.shadowMapEnabled = true

// 创建坐标轴,进行辅助,方便查看
const axes = new THREE.AxesHelper(20)
scene.add(axes)

// 创建平面几何
const planeGeometry = new THREE.PlaneGeometry(60, 20)
// 创建平面材质
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
// 创建平面对象
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

// 沿着x轴选择-90度
plane.rotation.x = - Math.PI * 0.5
// 定义plane在场景中的位置
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0

scene.add(plane)

// 创建立方体 wireframe是否将几何体渲染为线框
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1E90FF, wireframe: true })
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.x = -4
cube.position.y = 3
cube.position.z = 0

scene.add(cube)

// 创建一个球体 
const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xFFA500, wireframe: true })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 20
sphere.position.y = 4
sphere.position.z = 2
scene.add(sphere)

// 设置相机位置,将相机指向场景中心
camera.position.x = -30
camera.position.y = 40
camera.position.z = 30
camera.lookAt(scene.position)

// 创建白色的聚光灯,设置在场景中的位置并添加到创建中
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(-40, 60, -10)
scene.add(spotLight)

// 指定阴影投射的发出和接收者
plane.receiveShadow = true
cube.castShadow = true
sphere.castShadow = true

// 光源产生阴影
spotLight.castShadow = true

// 小球弹跳速度
let step = 0

// 使用requestAnimationFrame让物体动起来
function renderScene () {
  // 旋转立方体
  cube.rotation.y += 0.01
  cube.rotation.z += 0.02
  // 小球弹跳
  step += 0.04
  sphere.position.x = 20 + (10 * (Math.cos(step)))
  sphere.position.y = 2 + (10 * (Math.abs(Math.sin(step))))

  renderer.render(scene, camera)
  // 刷新时间
  stats.update()
  requestAnimationFrame(renderScene)
  // 开始渲染场景和相机
}

// 初始化帧数显示器
function initStats () {
  const stats = new Stats()
  stats.setMode(0) // 显示FPS

  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.getElementById('stats-output').appendChild(stats.domElement)
  return stats
}

renderScene()




