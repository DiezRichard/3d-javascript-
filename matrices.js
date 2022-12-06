

//-------------------------------------//
function pointAtMatrix(camPos,target,camUp)
{
  //normalize
 let newDir=normV(vectorAdd(camPos, target));
//let newRight=(cross(newDir,camUp));
//let newUp=normV(cross(newRight,newDir));
  
let a1= (vectorMultif(newDir, dotP(camUp, newDir)));
 
 //normalize
let newUp=normV(vectorSub(camUp,a1));
let newRight=cross(newDir,newUp);
  
let viewMatrix=[
  [newRight.x,newRight.y,newRight.z, -dotP(newRight, camPos)],
  [newUp.x,newUp.y,newUp.z,-dotP(newUp,camPos)],
  [newDir.x,newDir.y,newDir.z,-dotP(newDir,camPos)],
  [0,0,0,1]
  ];


//return viewMatrix;
 
 let pointAtM = [
[newRight.x, newUp.x, newDir.x, camPos.x],
[newRight.y, newUp.y, newDir.y, camPos.y],
[newRight.z, newUp.z, newDir.z, camPos.z],
    [camPos.x, camPos.y, -camPos.z, 1]
    ];
  
  //return pointAtM;
  
  let A=newRight;
  let B=newUp;
  let C=newDir;
  let T=camPos;
  
  let lookAtMatrix = [
    [A.x, A.y, A.z, -dotP(T.x,A.x)],
    [B.x, B.y, B.z, -dotP(T.y,B.y)],
    [C.x, C.y, C.z, -dotP(T.z,C.z)],
    [0 , 0, 0 , -1]
  
    ];
//return lookAtMatrix;

 let tMatrix = [
    [1, 0, 0, -camera.x],
    [0, 1, 0, -camera.y],
    [0, 0, 1, -camera.z],
    [0, 0, 0,  0]

    ];
 return tMatrix;
    
}


//-------------------------------------//



//UTILITIES

function matrixTimesVector(v,matrix)
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
    
    return vec;
  
} //matrix times vector

//-------------------------------------//
function cross(v1,v2)
{
  let vx = v1.y*v2.z-v1.z*v2.y;
  let vy = v1.x*v2.z-v1.z*v2.x;
  let vz = v1.x*v2.y-v1.y*v2.x;
  
  let newV={x:vx,y:vy,z:vz};
  
  return newV;
};

function vectorSub(v1,v2)
{
  let newV={x:(v1.x-v2.x),y:(v1.y-v2.y),z:(v1.z-v2.z)};
  
  return newV;
}

function vectorAdd(v1, v2)
{
  let newV = { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };

  return newV;
}

function normV(v)
{
  let len=Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z)
  
  let newV={x:v.x/len,y:v.y/len,z:v.z/len};
  
  return newV;
}

function dotP(v1,v2)
{
  let result= v1.x*v2.x+v1.y*v2.y+v1.z*v2.z;
  
  return result;
}

function vectorMultif(v, f)
{
  let newV= {x:v.x*f,y:v.y*f,z:v.z*f};
  
  return newV;
}
