//-------------------------------------//

//console.log(mesh);
const canvasMain = document.getElementById("canvasMain");
const ctxMain = canvasMain.getContext("2d");

const canvasJoystick = document.getElementById("canvasJoystick");
const ctxJoystick = canvasJoystick.getContext("2d");

//-------------------------------------//

//-------------------------------------//

var scale = 100;
var offset = 100;
var howFar=10;

//cam values
var camera={x:0,y:0,z:-1};
var camFwd={x:0,y:0,z:1};
var camUp={x:0,y:1,z:0};

var z = Math.PI / 180;

//y camera rotation
var yaw=z;
var pitch=z; 

//velocity vector
var forwardV={x:0,y:0,z:.1};

camUp= vectorAdd(camera, camUp);
var camRight= cross(camFwd,camUp);

var d= new Date();
var angle = Math.PI / 180;

var cos = Math.cos(angle);
var sin = Math.sin(angle);

var fov=90;
var f= 1/Math.tan(fov/2*z);
var a=innerHeight/innerWidth;
var zNear=1;
var zFar=100;
var q=zFar/(zNear-zFar);

//-------------------------------------//



var mesh=loadObject2("obj/axis.obj");
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
    
   let arr= str.split(/\n/gm);
   let vectors=[];
  // let mesh=[];
   //console.log(arr[0]);
   
   
   
   
   //VECTORS
    for(let i=arr.length-1;i>=0;i--)
    {
      
      //vectors
      if (arr[i].match(/^v\s/gm))
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
   for(let i=arr.length-1;i>=0;i--)
    {
    //triangles
    if(arr[i].match(/^f/gm))
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
        
       // console.log(index1);
       // console.log(index2);
       // console.log(index3);
      }
    }//TRIANGLES
   
    
    //console.log(mesh[0]);
    
    //console.log(vectors[0]);
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
   
    
    //console.log(mesh[0]);
    
    //console.log(vectors[0]);
  }
  
    }
  }
  request.send(null);
  
  return mesh;
};// LOADER 2

//-------------------------------------//
//-------------------------------------//


//-------------------------------------//
//MATRICES
var zMatrix=[
    [cos, -sin, 0],
    [sin,  cos, 0],
    [0,   0,   1]];

var xMatrix = [
    [1,   0,   0],
    [0,cos, -sin],
    [0,sin, cos]];
    
var yMatrix = [
    [cos, 0, -sin],
    [0,   1,    0],
    [sin, 0, cos]];
    
var pMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]];

var iMatrix = [
    [-1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

var tCamMatrix = [
        [1, 0, 0, -camera.x],
        [0, 1, 0, -camera.y],
        [0, 0, 1, -camera.z],
        [0, 0, 0, 0]
    
        ];
    
//-------------------------------------//
   
function updateMatrix()
{
   cos = Math.cos(angle);
   sin = Math.sin(angle);
  
  zMatrix = [
      [cos, -sin, 0,0],
      [sin, cos, 0,0],
      [0, 0, 1,0],
       [0, 0, 0,0]];
  
   xMatrix = [
      [1,  0,  0,  0],
      [0, cos,-sin,0],
      [0, sin, cos,0],
      [0,   0,  0, 0]];
  
   yMatrix = [
      [cos, 0, -sin,0],
      [0,   1,  0,  0],
      [sin, 0, cos, 0],
      [0,   0,  0, 0]];
  
  tCamMatrix = [
           [1, 0, 0, -camera.x],
           [0, 1, 0, -camera.y],
           [0, 0, 1, -camera.z],
           [0, 0, 0, 0]
           ];
           
   pMatrix =
    [[a*f, 0, 0,0],
    [0, f, 0,0],
    [0, 0, q,(-zFar*zNear)/(zFar-zNear)],
    [0, 0, .1,0]];
    
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


function drawMesh(m,dotTable,zmesh)
{
  
for(let i=0;i<m.length;i++)
{

if(dotTable[i]>0)
{
 
      let x1 = (m[i][0].x + 1) / 2 * scale + offset;
      let y1 = (m[i][0].y + 1) / 2 * scale + offset;
      let x2 = (m[i][1].x + 1) / 2 * scale + offset;
      let y2 = (m[i][1].y + 1) / 2 * scale + offset;
      let x3 = (m[i][2].x + 1) / 2 * scale + offset;
      let y3 = (m[i][2].y + 1) / 2 * scale + offset;
 

     
let zmed = ((zmesh[i][0].z) + (zmesh[i][1].z) + (zmesh[i][2].z)) / 3;
      
let rgb=((zmed)*100+1220+zmed*2);

ctxMain.fillStyle =`rgb(${255},${rgb},${255})`;


      ctxMain.globalAlpha=1;
      ctxMain.beginPath();
      ctxMain.moveTo(x1,y1);
      ctxMain.lineTo(x2,y2);
      ctxMain.lineTo(x3,y3);
      ctxMain.lineTo(x1,y1);
      ctxMain.closePath();
      ctxMain.stroke();
      ctxMain.fill();

  }
  }
}//DRAW MESH

//-------------------------------------//



//-------------------------------------//

function fdotProduct(normal, vector, camera)
{
  let result=
    normal.x*(vector.x-camera.x)+
    normal.y*(vector.y-camera.y)+
    normal.z*(vector.z-camera.z);
  
  return result;
}

//-------------------------------------//

function orderMeshByZ(zmesh)
{
 zmesh.sort((a, b) => {return b[0].z - a[0].z;});
 
}//sort array

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
      
    let hyp=Math.sqrt(normal.x*normal.x+normal.y*normal.y+normal.z*normal.z);
    
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
//MAIN

drawJoystick(ctxJoystick);

setInterval(function(){
 
//clear screen 
ctxMain.clearRect(0,0,320,320); 

//change angle
//angle+=2*z;



//update matrix values after angle change
updateMatrix();

//calculations

let meshI= multiMatrix(mesh,iMatrix);
let meshX=multiMatrix(meshI,xMatrix);
let meshY=multiMatrix(meshX,yMatrix);
let meshZ=multiMatrix(meshY,zMatrix);
orderMeshByZ(meshZ);
moveFarAway(meshZ,howFar);

//-------------------------------------//

cosPitch= Math.cos(pitch);
sinPitch= Math.sin(pitch);

cosYaw = Math.cos(yaw);
sinYaw = Math.sin(yaw);

//-------------------------------------//


/*
yMatrix = [
      [cosYaw, 0, -sinYaw, 0],
      [0, 1, 0, 0],
      [sinYaw, 0, cosYaw, 0],
      [0, 0, 0, 0]];
 */     

//rotate by Yaw
//meshR = multiMatrix(meshZ,yMatrix);

//-------------------------------------//

let xAxis= {x:cosYaw,y:0,z:-sinYaw};
let yAxis= {x:sinYaw*sinPitch,y:cosPitch,z:cosYaw*sinPitch};
let zAxis= {x:sinYaw*cosPitch,y:-sinPitch,z:cosPitch*cosYaw};


tCamMatrix = [
[xAxis.x, xAxis.y, xAxis.z, -dotP(camera,xAxis)],
[yAxis.x, yAxis.y, yAxis.z, -dotP(camera,yAxis)],
[zAxis.x, zAxis.y, zAxis.z, -dotP(camera,zAxis)],
[0, 0, 0, 1]

        ];
        
        
//transform
meshCam = multiMatrix(meshZ, tCamMatrix);

joystick(xAxis,yAxis,zAxis);
//-------------------------------------//

let dotTable=crossProduct(meshCam);

//projection 
let meshP=multiMatrix(meshCam,pMatrix);
//DRAW
drawMesh(meshP,dotTable,meshCam);

ctxMain.fillStyle="red";

ctxMain.fillText("x: "+camera.x,20,240);
ctxMain.fillText("y: "+camera.y,20,260);
ctxMain.fillText("z: "+camera.z,20,280);
ctxMain.fillText("yaw: "+yaw,20,300);

},100);

//-------------------------------------//
