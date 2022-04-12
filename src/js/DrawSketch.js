// 第一步 画轮廓线
import {createArcWall, createCubeWall, createDimian, LineObj, returnWallObject} from "./AutoObj.js";
import {
    ArcCurve, BoxGeometry, BufferGeometry, DoubleSide,
    ExtrudeBufferGeometry,
    ExtrudeGeometry, Line, LineBasicMaterial, LineCurve,
    Mesh,
    MeshBasicMaterial, RepeatWrapping,
    Shape, ShapeGeometry, TextureLoader, Vector2,
    Vector3
} from "./lib/three.module.js";
import {dimianMat, matArrayA, matArrayB, matArrayC} from "./AutoMat.js";
import {scene} from "./index.js";
import {LineMaterial} from "./lib/LineMaterial.js";

let weight = 100;
let offset = 5;
let arcRadius = 50;
let height = 100;

let walls = [];
//多边形线
function DrawOutline() {
    //
    let lines = [
        new LineObj(new Vector3(-weight, 0, -weight), new Vector3(weight, 0, -weight)),//1
        new LineObj(new Vector3(weight, 0, -weight), new Vector3(weight, 0, weight)),//2
        new LineObj(new Vector3(weight, 0, weight), new Vector3(0, 0, weight)),//3
        new LineObj(new Vector3(0, 0, weight), new Vector3(0, 0, 0)),//4
        new LineObj(new Vector3(0, 0, 0), new Vector3(-weight, 0, 0)),//5
        new LineObj(new Vector3(-weight, 0, 0), new Vector3(-weight, 0, -weight))//6
    ]

    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }

    // let arcCurve = new ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    // let arcLine = new LineObj();
    // arcLine.getManyMesh(arcCurve.getPoints(weight));
    // arcLine.draw();
}

//圆角
function DrawYuanjiao() {
    let arcCurve = new ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    let arcLine = new LineObj();
    let arcPoints=arcCurve.getPoints(weight)
    arcLine.getManyMesh(arcPoints);
    arcLine.draw();

    let lines = [
        new LineObj(new Vector3(-weight, 0, -weight), new Vector3(weight, 0, -weight)),//1
        new LineObj(new Vector3(weight, 0, -weight), new Vector3(weight, 0, weight)),//2
        new LineObj(new Vector3(weight, 0, weight), new Vector3(0, 0, weight)),//3
        new LineObj(new Vector3(0, 0, weight), new Vector3(arcPoints[0].x,0,arcPoints[0].y)),//4
        new LineObj(new Vector3(arcPoints[arcPoints.length-1].x,0,arcPoints[arcPoints.length-1].y), new Vector3(-weight, 0, 0)),//5
        new LineObj(new Vector3(-weight, 0, 0), new Vector3(-weight, 0, -weight))//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}
//偏移
function DrawPianyi(){
    DrawYuanjiao();
    let arcCurve = new ArcCurve(-(arcRadius-offset), (arcRadius-offset), arcRadius, 0, -0.5 * Math.PI, true);
    let arcLine = new LineObj();
    let arcPoints=arcCurve.getPoints(weight);
    arcLine.getManyMesh(arcPoints);
    arcLine.draw();

    let lines = [
        new LineObj(new Vector3(-(weight-offset), 0, -(weight-offset)), new Vector3((weight-offset), 0, -(weight-offset))),//1
        new LineObj(new Vector3((weight-offset), 0, -(weight-offset)), new Vector3((weight-offset), 0, (weight-offset))),//2
        new LineObj(new Vector3((weight-offset), 0, (weight-offset)), new Vector3(offset, 0, (weight-offset))),//3
        new LineObj(new Vector3(offset, 0, (weight-offset)), new Vector3(arcPoints[0].x,0,arcPoints[0].y)),//4
        new LineObj(new Vector3(arcPoints[arcPoints.length-1].x,0,arcPoints[arcPoints.length-1].y), new Vector3(-(weight-offset), 0, -offset)),//5
        new LineObj(new Vector3(-(weight-offset), 0, -offset), new Vector3(-(weight-offset), 0, -(weight-offset)))//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}
//画墙
function Drawwall(){

    let arcCurve1 = new ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    let arcCurve2 = new ArcCurve(-(arcRadius-offset), (arcRadius-offset), arcRadius, 0, -0.5 * Math.PI, true);
    let arcPointArray = arcCurve1.getPoints(50);
    arcPointArray.push(...arcCurve2.getPoints(50).reverse());
    createArcWall(arcPointArray,height,0.5,matArrayC,"墙面");

    let CubeWall=[];
    CubeWall.push(createCubeWall(offset, height, weight*2, 0.5, matArrayB, 0, 0.5*height, -(weight-0.5*offset), "墙面"));//1
    CubeWall.push(createCubeWall(offset, height, weight*2, 0, matArrayB, (weight-0.5*offset), 0.5*height, 0, "墙面"));//2
    CubeWall.push(createCubeWall(offset, height, weight, -0.5, matArrayB, 0.5*weight, 0.5*height, (weight-0.5*offset), "墙面"));//3
    CubeWall.push(createCubeWall(offset, height, weight-arcRadius, 1, matArrayB, 0.5*offset, 0.5*height, 0.5*(weight+arcRadius)-offset, "墙面"));//4
    CubeWall.push(createCubeWall(offset, height, weight-arcRadius, -0.5, matArrayB, -(0.5*(weight+arcRadius)-offset), 0.5*height, -0.5*offset, "墙面"));//5
    CubeWall.push(createCubeWall(offset, height, weight, 1, matArrayB, -(weight-0.5*offset), 0.5*height, -0.5*weight, "墙面"));//6

    walls = CubeWall;
}
function Drawdiban(){
    let arcCurve1 = new ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    let arcCurve2 = new ArcCurve(-(arcRadius-offset), (arcRadius-offset), arcRadius, 0, -0.5 * Math.PI, true);
    let arcPointArray = arcCurve1.getPoints(50);
    arcPointArray.push(...arcCurve2.getPoints(50).reverse());

    let lines = [
       new Vector2(-weight,-weight), new Vector2(weight,-weight),
       new Vector2(weight,-weight), new Vector2(weight,weight),
       new Vector2(weight,weight), new Vector2(0,weight),
       new Vector2(0,weight), new Vector2(0,arcRadius),
        ...arcCurve1.getPoints(arcRadius),
       new Vector2(-arcRadius,0), new Vector2(-weight,0),
       new Vector2(-weight,0), new Vector2(-weight,-weight)
    ]

    createDimian(lines,0.5,0.2,dimianMat,"地面");
}
function DigWall(){
    let wall = returnWallObject(offset,height,20,1,matArrayA,-100,0,-50,"窗子");
    let objects_cube = [];
    objects_cube.push(wall);
    createResultBsp(walls, objects_cube);
}
export {DrawOutline,DrawYuanjiao,DrawPianyi,Drawwall,Drawdiban}
