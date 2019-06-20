/// <reference path="../../node_modules/@types/three/index.d.ts" />
let scene
let camera
let renderer
let stats
let controls
let plane
let planeGeometry
let width
let height


// 初始性能监视器
function initStats() {
  stats = new Stats()
  stats.setMode(0) // 显示FPS

  stats.domElement.style.position = "absolute"
  stats.domElement.style.left = "0px"
  stats.domElement.style.top = "0px"
  document.getElementById("stats-output").appendChild(stats.domElement)
}

// 初始化场景
function initScene () {
  scene = new THREE.Scene()
  // 场景中添加雾化效果,模拟真实世界的雾
  // 方式1 Fog(雾的颜色, 生效最小距离,生效最大距离) 线性雾-雾的密度是随着距离线性增大
  // scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
  // 方式2 FogExp2(雾的颜色, 雾的密度增长速度) 指数雾-雾的密度是随着距离指数增大的
  scene.fog = new THREE.FogExp2(0xffffff, 0.015)
  width = window.innerWidth
  height = window.innerHeight
}

// 初始化相机
function initCamera () {
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  // 设置相机位置,将相机指向场景中心
  camera.position.x = -30
  camera.position.y = 40
  camera.position.z = 30
  camera.lookAt(scene.position)
  scene.add(camera)
}

// 初始化渲染器
function initRenderer () {
  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xcce0ff)
  renderer.setSize(width, height)
  // 渲染器开启阴影渲染
  renderer.shadowMapEnabled = true
  document.body.appendChild(renderer.domElement)
}

function initPlaneAndLight() {

  // 创建平面几何
  planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
  // 创建平面材质
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
  // 创建平面对象
  plane = new THREE.Mesh(planeGeometry, planeMaterial)

  // 沿着x轴选择-90度
  plane.rotation.x = -Math.PI * 0.5
  // 定义plane在场景中的位置
  plane.position.x = 0
  plane.position.y = 0
  plane.position.z = 0
  // 指定阴影投射的发出和接收者
  plane.receiveShadow = true
  scene.add(plane)

  // 创建白色的聚光灯,设置在场景中的位置并添加到创建中
  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-40, 60, -10)
  scene.add(spotLight)
  // 光源产生阴影
  spotLight.castShadow = true

  // 创建环境光源
  const ambientLight = new THREE.AmbientLight(0x0c0c0c)
  scene.add(ambientLight)
}

// 初始化dat.gui,获得一个控制器
function initDatGUI() {
  // 创建一个控制器对象
  controls = new function() {
    this.rotationSpeed = 0.02
    // 统计场景中的物体数量
    this.numberOfObjects = scene.children.length

    // 新增一个立方体
    this.addCube = function () {
      // 随机大小和颜色
      const cubeSize = Math.ceil(Math.random() * 3) // [0 - 3)
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      // 产生阴影和命名
      cube.castShadow = true
      cube.name = `cube${scene.children.length}`

      cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width)); // [-30, -30 + width]
      cube.position.y = Math.round((Math.random() * 5)); // [0, 5)
      cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height)); // [-20, -20 + height]

      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    }
    // 移除最新添加的立方体
    this.removeCube = function () {
      const allChildrens = scene.children
      // 取出最新添加的物体
      const lastObject = allChildrens[allChildrens.length - 1]
      // 判断是否是几何体,是-移除
      if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject)
        this.numberOfObjects = scene.children.length
      }
    }
    // 控制台打印出场景中所有的物体
    this.output = function () {
      console.log(scene.children)
    }
  }

  // 创建data.GUI对象
  const gui = new dat.GUI()
  // 添加控制器到GUI中,设置控制器和立方体旋转范围,在渲染场景的时候,取出这两个值,实现改变gui的数据,影响我们的渲染物体
  gui.add(controls, "rotationSpeed", 0, 0.5)
  // 球体旋转范围
  gui.add(controls, "addCube")
  gui.add(controls, "removeCube")
  gui.add(controls, "output")
  gui.add(controls, "numberOfObjects").listen()
}

// 渲染动画
function animate () {
  stats.update()
  // 旋转所有立方体
  scene.traverse(e => {
    if (e instanceof THREE.Mesh && e != plane) {
      e.rotation.x += controls.rotationSpeed
      e.rotation.y += controls.rotationSpeed
      e.rotation.z += controls.rotationSpeed
    }
  })

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function startThree () {
  initStats()
  initScene()
  initCamera()
  initPlaneAndLight()
  initRenderer()
  initDatGUI()
  animate()
}

window.onload = startThree