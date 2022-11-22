//-------------------------------------//

//console.log(mesh);
const canvasMain = document.getElementById("canvasMain");
const ctxMain = canvasMain.getContext("2d");

const canvasJoystick = document.getElementById("canvasJoystick");
const ctxJoystick = canvasJoystick.getContext("2d");

//-------------------------------------//

var scale = 70;
var offset = 110;
var howFar=10;
var camera={x:0,y:0,z:-1};
var d= new Date();
var angleX = Math.PI / 180;
var angleY = Math.PI / 180;
var angleZ = Math.PI / 180;
var z = Math.PI / 180;
var cos = Math.cos(angleX);
var sin = Math.sin(angleX);

var fov=90;
var f= 1/Math.tan(fov/2*z);
var a=innerHeight/innerWidth;
var zNear=1;
var zFar=100;
var q= zFar/(zFar-zNear);

//-------------------------------------//

var obj="obj/teapot.obj";

var mesh=loadObject(obj);

//LOADER

function loadObject(file)
{
  var request = new XMLHttpRequest();
  
  let mesh= [];
  request.open("GET", file, false);
 
  request.onreadystatechange = function()
  {
    
    if (request.readyState === 4)
    {
      if (request.status === 200 || request.status == 0)
      {
    var obj=request.responseText;
    var str=String(obj);
    
    //console.log(str);
    
   let arr= str.split(/\n/);
   let vectors=[];
   
    //VECTORS
    for(let i=0;i<arr.length;i++)
    {
      
      //vectors
      if (arr[i].match(/^v\s/))
      {
        //erase
         let p= arr[i].replace("v ","");
         let s=p.replace("v ","");
         //change "," with "."
          s= p.replace(/\,/gm,".");
        //split into 3 coords
        let   v= s.split(/\s/);
        //fill in vector coords in numbers
        let  c={x:(+v[0]),y:(+v[1]),z:(+v[2])};
        
      
        
        //add vectors
        
        vectors.push(c);
        
      }
      
    }//VECTORS
   
   //TRIANGLES
   for(let i=0;i<arr.length;i++)
    {
    //triangles
    if(arr[i].match(/^f/))
      {
        //clean
        let clean= arr[i].replace("f ","");
        //split
        let split= clean.split(/\s/);
        
       //take the first value
        let index1= +split[0].match(/\d+/m); 
        let index2= +split[1].match(/\d+/m);
        let index3= +split[2].match(/\d+/m);
          
        let triangle=[];
        
  
        triangle.push(vectors[index1-1],vectors[index2-1],vectors[index3-1]);

        mesh.push(triangle);
      }
    }//TRIANGLES i loop
   
   
  }
  
    }
  }
  request.send(null);
 
  return mesh;
};


//-------------------------------------//
//-------------------------------------//
//-------------------------------------//
//-------------------------------------//
/*

//LOADER 2
function loadObject2(file)
{
  var request = new XMLHttpRequest();
  let mesh= [];
  request.open("GET", file, false);
 
  request.onreadystatechange = function()
  {
    
    if (request.readyState === 4)
    {
      if (request.status === 200 || request.status == 0)
      {
       
    
    
    
    var obj=request.responseText;
    var str=String(obj);
    
    //console.log(str);
    
   let arr= str.split(/\n/);
   let vectors=[];
  // let mesh=[];
   //console.log(arr[0]);
   
   
   
   
   //VECTORS
    for(let i=0;i<arr.length;i++)
    {
      
      //vectors
      if (arr[i].match(/^v\s/))
      {
        //erase
         let p= arr[i].replace("v ","");
         let s=p.replace("v ","");
         //change "," with "."
          s= p.replace(/\,/gm,".");
        //split into 3 coords
        let   v= s.split(/\s/);
        //fill in vector coords in numbers
        let  c={x:(+v[0]),y:(+v[1]),z:(+v[2])};
        

        //add vectors
        vectors.push(c);
        
      }
      
    }//VECTORS
    
    //vectors.sort();
   
   //TRIANGLES
   for(let i=0;i<arr.length;i++)
    {
    //triangles
    if(arr[i].match(/^f/))
      {
        //clean
        let clean= arr[i].replace("f ","");
        //split
        let split= clean.split(/\s/);
        
       // take the first value
        let index1= +split[0].match(/\d+/m); 
        let index2= +split[1].match(/\d+/m);
        let index3= +split[2].match(/\d+/m);
          
        let triangle=[];
        
  
        triangle.push(vectors[index1-1],vectors[index2-1],vectors[index3-1]);
        
        mesh.push(triangle);
        
       // console.log(index1);
       // console.log(index2);
       // console.log(index3);
      }
    }//TRIANGLES
   
    
  }
  
    }
  }
  request.send(null);
  
 
  return mesh;
};// LOADER 2
*/
//-------------------------------------//
//-------------------------------------//


//-------------------------------------//
//MATRICES

//z rotation
var zMatrix = [
          [cos, -sin, 0, 0],
          [sin, cos, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0]];
 //x rotation   
  var  xMatrix = [
          [1, 0, 0, 0],
          [0, cos, -sin, 0],
          [0, sin, cos, 0],
          [0, 0, 0, 0]];
  //y rotation  
  var  yMatrix = [
          [cos, 0, -sin, 0],
          [0, 1, 0, 0],
          [sin, 0, cos, 0],
          [0, 0, 0, 0]];
    
  //scale matrix      
  var sMatrix=
  [[scale, 0, 0,0],
  [0, scale, 0, 0 ],
  [0, 0, scale, 0],
  [0, 0, 0,0]];
    
      
  //translation matrix      
  var tMatrix=
  [[1, 0, 0,-offset],
  [0, 1, 0, -offset ],
  [0, 0, 0, 0],
  [0, 0, 0,0]];
    
    
    
 //  var copyMatrix = [[1, 0, 0,0],[0, 1, 0,0 ],[0, 0, 1, 0],[0, 0, 0,0]];
    
    //projection matrix
  var  pMatrix = 
  [[a * f, 0, 0, 0], 
  [0, f, 0, 0], 
  [0, 0, q, -q * zNear], 
  [0, 0,0 ,0]];
//-------------------------------------//
   
function updateMatrix()
{
   cos = Math.cos(angleZ);
   sin = Math.sin(angleZ);
  
  zMatrix = [
      [cos,-sin, 0,0],
      [sin,cos, 0, 0],
      [0,  0,  1,  0],
      [0,  0,  0, 0]];
      
   cos = Math.cos(angleX);
   sin = Math.sin(angleX);
  
   xMatrix = [
      [1,  0,  0,  0],
      [0, cos,-sin,0],
      [0, sin, cos,0],
      [0,   0,  0, 0]];
  
  cos = Math.cos(angleY);
  sin = Math.sin(angleY);
  
   yMatrix = [
      [cos, 0,-sin, 0],
      [0,   1,  0,  0],
      [sin, 0, cos, 0],
      [0,   0,  0, 0]];
  

  //translation matrix      
  tMatrix=
  [[1, 0, 0,-offset],
  [0, 1, 0,-offset],
  [0, 0, 0, 0],
  [0,0, 0,0]];
    
    
  
//copyMatrix = [[1, 0, 0,0],[0, 1, 0,0 ],[0, 0, 1, 0],[0, 0, 0,0]];
  
   
//pMatrix = [[1, 0, 0,0],[0, 1, 0,0 ],[0, 0, 0, 0],[0, 0, .01,0]];
    
    pMatrix= 
    [[a*f, 0, 0,0], 
    [0, f, 0, 0], 
    [0, 0, q,-q*zNear], 
    [0, 0,0,-1]];
      
    
}//updtate Matrix values


//-------------------------------------//


//multiMatrix
function multiMatrix(mesh,matrix)
{

let meshT= [];

for(let t of mesh)
{
  let tri=[];
  
  for (let v of t)
  {
    
    let x1 = v.x * matrix[0][0] + v.y * matrix[0][1] + v.z * matrix[0][2]+matrix[0][3];

    let y1 = v.x * matrix[1][0] + v.y * matrix[1][1] + v.z * matrix[1][2]+matrix[1][3];

    let z1 = v.x * matrix[2][0] + v.y * matrix[2][1] + v.z * matrix[2][2]+matrix[2][3];
    
    let w=v.x * matrix[3][0] + v.y * matrix[3][1] + v.z * matrix[3][2]+matrix[3][3];
    
    let vec = { x: x1, y: y1, z: z1};

    if(w!=0)
    {
      vec.x/=w;
      vec.y/=w;
      vec.z/=w;
    }
    
    tri.push(vec);
    
  };//triangle loop
  
  meshT.push(tri);
  
};//mesh loop

  return meshT;
  
} //multiply Matrix

//-------------------------------------//

  
//-------------------------------------//


// DRAW 
function drawMesh(m,dotTable,zmesh)
{
  let index=1;

  for(let i=0;i<m.length;i++)
  {
  
  
    if(dotTable[i]>0)
    {
 
      let x1 = m[i][0].x;
      let y1 = m[i][0].y ;
      let x2 = m[i][1].x ;
      let y2 = m[i][1].y ;
      let x3 = m[i][2].x ;
      let y3 = m[i][2].y ;
      
      let zmed = ((zmesh[i][0].z-howFar) + (zmesh[i][1].z-howFar) + (zmesh[i][2].z-howFar)) / 3;
      
      rgb=(-zmed+150);
  
      ctxMain.globalAlpha=1;
     
      ctxMain.beginPath();
      ctxMain.moveTo(x1,y1);
      ctxMain.lineTo(x2,y2);
      ctxMain.lineTo(x3,y3);
      ctxMain.lineTo(x1,y1);
      ctxMain.closePath();


      ctxMain.fillStyle =`rgb(${255},${rgb},${255})`;
      
      if(index>=20)
      {
        index=1;
      }
      
      index++;
      
      ctxMain.globalAlpha=1;
      ctxMain.strokeStyle=ctxMain.fillStyle;
      //ctxMain.fillStyle="white";
      
      ctxMain.lineWidth=1;
   
  
      ctxMain.strokeStyle=ctxMain.fillstyle;
      ctxMain.stroke();
      ctxMain.fill();
   
   //console.log(zmed);
   
  }
  }
}//DRAW MESH

//-------------------------------------//



//-------------------------------------//

function fdotProduct(normal, vector, camera)
{
  //I got the opposite considering the negative camera position, and the far z positive direction.
  let result=-(
    normal.x*(vector.x-camera.x)+
    normal.y*(vector.y-camera.y)+
    normal.z*(vector.z-camera.z));
  
  return result;
}

//-------------------------------------//




function orderMeshByZ(zmesh)
{
  zmesh.sort((a, b) => {return b[0].z - a[0].z;});
  
}//sort array

//-------------------------------------//

//-------------------------------------//

//cross product
function crossProduct(mesh)
{
  let dotTable=[];
  
  for(let t of mesh)
  {
    let tri=[];
    
    let line1={
      x:t[1].x-t[0].x,
      y:t[1].y-t[0].y,
      z:t[1].z-t[0].z};
      
    let line2={
      x:t[2].x-t[0].x,
      y:t[2].y-t[0].y,
      z:t[2].z-t[0].z};
      
    let normal={
      x:line1.y*line2.z-line1.z*line2.y,
      y:line1.x*line2.z-line1.z*line2.x,
      z:line1.x*line2.y-line1.y*line2.x};
      
    let hyp=(Math.sqrt(normal.x*normal.x+normal.y*normal.y+normal.z*normal.z));
    
    let normal2={
      x:normal.x/hyp,
      y:normal.y/hyp,
      z:normal.z/hyp};
      
     let dotProduct = fdotProduct(normal2,t[0],camera);
      
      dotTable.push(dotProduct);
      
  }
 
  return dotTable;
}


//-------------------------------------//

function moveFarAway(mesh, value)
{
  
  for(let t of mesh)
  {
    for(let v of t)
    {
      v.z+=value;
    }
  }
}

//-------------------------------------//

function copyMesh(inmesh)
{
  let outmesh=[];
  
  for(let t of inmesh)
  {
    let tri=[];
    for(let v of t)
    {
      tri.push(v);
    }
   outmesh.push(tri);
  }
  
  return outmesh;
}


//-------------------------------------//
drawJoystick(ctxJoystick);

//-------------------------------------//
//MAIN

requestAnimationFrame(main);

function main()
{
  
//clear screen 
ctxMain.clearRect(0,0,320,320); 

//change angle
//angle+=2*z;

joystick();



//update matrix values after angle change
updateMatrix();

//calculations

let meshS=multiMatrix(mesh,sMatrix);
let meshX=multiMatrix(meshS,xMatrix);
let meshY=multiMatrix(meshX,yMatrix);
let meshZ=multiMatrix(meshY,zMatrix);
orderMeshByZ(meshZ);

let meshT=multiMatrix(meshZ,tMatrix);
moveFarAway(meshT,8);


let dotTable=crossProduct(meshT);




let meshP=multiMatrix(meshT,pMatrix);

//DRAW
drawMesh(meshP,dotTable,meshZ);

requestAnimationFrame(main);

};//main
