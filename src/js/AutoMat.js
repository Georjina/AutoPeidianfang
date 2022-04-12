import {DoubleSide, MeshPhongMaterial} from "./lib/three.module.js";
let matArrayA=[],matArrayB=[],matArrayC=[];
let dimianMat;
function createWallMaterail(){
    matArrayA.push(new MeshPhongMaterial({color: 0xafc0ca}));  //前  0xafc0ca :灰色
    matArrayA.push(new MeshPhongMaterial({color: 0xafc0ca}));  //后
    matArrayA.push(new MeshPhongMaterial({color: 0xd6e4ec}));  //上  0xd6e4ec： 偏白色
    matArrayA.push(new MeshPhongMaterial({color: 0xd6e4ec}));  //下
    matArrayA.push(new MeshPhongMaterial({color: 0xafc0ca}));  //左    0xafc0ca :灰色
    matArrayA.push(new MeshPhongMaterial({color: 0xafc0ca}));  //右

    matArrayB.push(new MeshPhongMaterial({color: 0x9cb2d1}));  //前  0xafc0ca :灰色
    matArrayB.push(new MeshPhongMaterial({color: 0x9cb2d1}));  //后  0x9cb2d1：淡紫
    matArrayB.push(new MeshPhongMaterial({color: 0xffffff}));  //上  0x9cb2d1：淡紫
    matArrayB.push(new MeshPhongMaterial({color: 0xffffff}));  //下  0xd6e4ec： 偏白色
    matArrayB.push(new MeshPhongMaterial({color: 0x9cb2d1}));  //左
    matArrayB.push(new MeshPhongMaterial({color: 0x9cb2d1}));  //右   0xafc0ca :灰色

    matArrayC.push(new MeshPhongMaterial({color: 0xffffff}));  //shape颜色  白色
    matArrayC.push(new MeshPhongMaterial({color: 0x9cb2d1}));  //挤压边的颜色  0x9cb2d1：淡紫

    dimianMat = new MeshPhongMaterial({color: 0x9cb2d1,side: DoubleSide});//浅灰色
}
export {createWallMaterail,matArrayA,matArrayB,matArrayC,dimianMat}
