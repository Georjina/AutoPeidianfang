import {
    AmbientLight,
    DirectionalLight, GridHelper, Mesh, MeshBasicMaterial, MeshPhongMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    Vector3,
    WebGLRenderer
} from "./lib/three.module.js"
import {OrbitControls} from "./lib/OrbitControls.js";
import {Drawdiban, DrawOutline, DrawPianyi, Drawwall, DrawYuanjiao} from "./DrawSketch.js";
import {createWallMaterail} from "./AutoMat.js";

let scene,camera,renderer,controls,container;

function init(){
    initScene();
    initRenderer("scene");
    initCamera();
    initLight();
    initControls();
    initPlane();
    document.addEventListener('resize', onWindowResize, false);


    createWallMaterail();

  // DrawOutline();
    // DrawYuanjiao();
    //DrawPianyi();
    Drawdiban();
     Drawwall();

}

function initScene() {
    scene = new Scene();
}

// 初始化相机
function initCamera() {
    camera = new PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 10, 100000);
}

// 初始化灯光
function initLight() {
    var directionalLight = new DirectionalLight(0xffffff, 0.3); //模拟远处类似太阳的光源
    directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(0, 200, 0).normalize();
    scene.add(directionalLight);

    var ambient = new AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
    ambient.position.set(0, 0, 0);
    scene.add(ambient);
}

// 初始化渲染器
function initRenderer(id) {
    container = document.getElementById(id);
    renderer = new WebGLRenderer({
        antialias: true
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xfffffff, 1.0);
    container.appendChild(renderer.domElement)
}
// 初始化轨迹球控件
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    // 视角最小距离
    controls.minDistance = 100;
    // 视角最远距离
    controls.maxDistance = 100000;
    // controls.enableRotate=false;
}
function initPlane(){
    const gridLength = 5000;
    let planeGeometry = new PlaneGeometry(gridLength, gridLength);
    let plane = new Mesh(planeGeometry, new MeshBasicMaterial({color: 0xBDBDBD, depthWrite: true}));
    plane.rotation.x = -Math.PI * 0.5;
    plane.receiveShadow = true;
    plane.castShadow = true;
   scene.add(plane);

    const gridHelper = new GridHelper( gridLength, 10 );
    scene.add( gridHelper );
}

// 窗口变动触发的方法
function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();

export {scene,container}
