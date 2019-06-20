/// <reference path="../../node_modules/@types/three/index.d.ts" />
let scene
let camera
let renderer
let threeCanvas

function init() {
  // 初始化性能监视器
  const stats = initStats()
  // 初始化dat.gui
  const controls = initDatGUI()

  // 获取canvas画布
  threeCanvas = document.getElementById("three-canvas")
  // 设置canvas的大小和窗口大小一致
  threeCanvas.width = window.innerWidth
  threeCanvas.height = window.innerHeight
  const width = threeCanvas.width
  const height = threeCanvas.height

  // 创建场景
  scene = new THREE.Scene()
  // 创建相机 视角, 宽高比, 最近距离,最远距离
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

  // 创建渲染器, 指定渲染的canvas
  renderer = new THREE.WebGLRenderer({ canvas: threeCanvas })

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
  plane.rotation.x = -Math.PI * 0.5
  // 定义plane在场景中的位置
  plane.position.x = 15
  plane.position.y = 0
  plane.position.z = 0

  scene.add(plane)

  // 创建立方体 wireframe是否将几何体渲染为线框
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e90ff,
    wireframe: true
  })

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.x = -4
  cube.position.y = 3
  cube.position.z = 0

  scene.add(cube)

  // 创建一个球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xffa500,
    wireframe: true
  })
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
  function renderScene() {
    // 旋转立方体,取出控制器的值赋给立方体
    cube.rotation.x += controls.rotationSpeed
    cube.rotation.y += controls.rotationSpeed
    cube.rotation.z += controls.rotationSpeed
    // 小球弹跳
    step += controls.bouncingSpeed
    sphere.position.x = 20 + 10 * Math.cos(step)
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(renderScene)
    // 开始渲染场景和相机
  }

  // 初始化帧数显示器
  function initStats() {
    const stats = new Stats()
    stats.setMode(0) // 显示FPS

    stats.domElement.style.position = "absolute"
    stats.domElement.style.left = "0px"
    stats.domElement.style.top = "0px"
    document.getElementById("stats-output").appendChild(stats.domElement)
    return stats
  }

  // 初始化dat.gui,获得一个控制器
  function initDatGUI() {
    // 创建一个控制器对象
    const controls = new (function() {
      this.rotationSpeed = 0.02
      this.bouncingSpeed = 0.03
    })()

    // 创建data.GUI对象
    const gui = new dat.GUI()
    // 添加控制器到GUI中,设置控制器和立方体旋转范围,在渲染场景的时候,取出这两个值,实现改变gui的数据,影响我们的渲染物体
    gui.add(controls, "rotationSpeed", 0, 0.5)
    // 球体旋转范围
    gui.add(controls, "bouncingSpeed", 0, 0.5)

    return controls
  }

  renderScene()
}

function onResize() {
  threeCanvas.width = window.innerWidth
  threeCanvas.height = window.innerHeight

  width = threeCanvas.width
  height = threeCanvas.height
  // 重新设置相机宽高比
  camera.aspect = width / height
  // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用
  camera.updateProjectionMatrix()
  // 重新设置场景大小
  renderer.setSize(width, height)
  console.log(width, height)
}

window.onload = init
// 自适应屏幕大小
window.addEventListener("resize", onResize, false)
