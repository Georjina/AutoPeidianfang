import {container, scene} from "./index.js";
import {
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    Color, DoubleSide,
    ExtrudeGeometry, Line, LineCurve,
    Mesh, MeshBasicMaterial, MeshPhongMaterial,
    Shape, ShapeGeometry, Vector2,
    Vector3
} from "./lib/three.module.js";
import {LineGeometry} from "./lib/LineGeometry.js";
import {LineMaterial} from "./lib/LineMaterial.js";
import {Line2} from "./lib/Line2.js";

let lineColor = new Color(0,0,0);//黑色

class Obj {
    constructor() {
        this.mesh = null;
    }

    getMesh() {
        return this.mesh;
    }

    draw() {
        if (scene.children.indexOf(this.mesh) === -1) {
            scene.add(this.mesh);
        }
    }

    delete() {
        if (scene.children.indexOf(this.mesh) > -1) {
            scene.remove(this.mesh);
        }
    }
}

class LineObj extends Obj {
    constructor(start, end, color) {
        super();
        this.start = start;
        this.end = end;
        if(start && end){
            this.mesh = this.getMesh(start, end, color);
        }
    }

    getMesh(start, end, color) {
        color = color ? color : lineColor;
        start = start ? start : this.start;
        end = end ? end : this.end;

        let geometry = new LineGeometry();
        let pointArr = [].concat(start.toArray(), end.toArray());
        geometry.setPositions(pointArr);
        let material = new LineMaterial({
            color: color,
            linewidth: 5
        })
        material.resolution.set(container.offsetWidth, container.offsetHeight)
        let line = new Line2(geometry, material)
        line.computeLineDistances()
        return line;
    }
    getManyMesh(p) {
        let color =  lineColor;
        let geometry = new LineGeometry();
        let pArray=[];
        for(let i=0;i<p.length;i++){
            pArray.push(p[i].x,0,p[i].y);
        }
        geometry.setPositions(pArray);
        let material = new LineMaterial({
            color: color,
            linewidth: 5
        })
        material.resolution.set(container.offsetWidth, container.offsetHeight)
        let line = new Line2(geometry, material)
        line.computeLineDistances()
        this.mesh = line;
        return line;
    }
}
function createCubeWall(width, height, depth, angle, material, x, y, z, name) {
    var cubeGeometry = new BoxGeometry(width, height, depth);
    var cube = new Mesh(cubeGeometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
    cube.name = name;
    scene.add(cube);

    return cube;
}
function createArcWall(arcPointArray, height, angle, material, name) {
    let arcShape  = new Shape(arcPointArray);
    const extrudeSettings = {
        steps: 2,
        depth: height,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1
    };
    let arcGeometry = new ExtrudeGeometry(arcShape,extrudeSettings);
    const mesh = new Mesh( arcGeometry, material ) ;
    mesh.rotateX(angle*Math.PI);
    mesh.position.y+=height;
    mesh.name = name;
    scene.add( mesh );
}
function createDimian(pointArray, angle,y, material, name) {
    let dimianShape = new Shape(pointArray);
    let geometry = new ShapeGeometry(dimianShape);
    var mesh = new Mesh(geometry, material);
    mesh.rotateX(angle*Math.PI);
    mesh.position.y+=y;
    scene.add(mesh);
}
function returnWallObject(width, height, depth, angle, material, x, y, z, name) {
    var cubeGeometry = new BoxGeometry(width, height, depth);
    var cube = new Mesh(cubeGeometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.rotation.y += angle * Math.PI;
    cube.name = name;
    return cube;
}
//墙上挖门，通过两个几何体生成BSP对象
function createResultBsp(bsp, objects_cube) {
    var material = new MeshPhongMaterial({
        color: 0x9cb2d1,
        specular: 0x9cb2d1,
        shininess: 30,
        transparent: true,
        opacity: 1
    });
    var BSP = new ThreeBSP(bsp);
    for (var i = 0; i < objects_cube.length; i++) {
        var less_bsp = new ThreeBSP(objects_cube[i]);
        BSP = BSP.subtract(less_bsp);
    }
    var result = BSP.toMesh(material);
    result.material.flatshading = FlatShading;
    result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
    result.geometry.computeVertexNormals();
    result.material.needsUpdate = true; //更新纹理
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;
    scene.add(result);
}


export {LineObj,createCubeWall,createArcWall,createDimian,returnWallObject,createResultBsp}
