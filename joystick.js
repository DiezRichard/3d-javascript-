 //JOYSTICK V5//
//touch variables
var touchX=0;
var touchY=0;
var touchX2=0;
var touchY2=0;


function joystick(xAxis,yAxis,zAxis)
{


//UP
if(touchX>upBtn.x1 && touchY > upBtn.y1 && touchX < upBtn.x2 && touchY < upBtn.y2 || touchX2>upBtn.x1 && touchY2 > upBtn.y1 && touchX2 < upBtn.x2 && touchY2 < upBtn.y2)
{

//angleX+=1*z;
//camera.y+=.1;
//camera =vectorAdd(camera, forwardV);
camera =vectorSub(camera, yAxis);

};//UP

//-----------------------------//

//DOWN
if(touchX>dwnBtn.x1 && touchY > dwnBtn.y1 && touchX < dwnBtn.x2 && touchY < dwnBtn.y2 || touchX2>dwnBtn.x1 && touchY2 > dwnBtn.y1 && touchX2 < dwnBtn.x2 && touchY2 < dwnBtn.y2)
{
//angleX-=1*z;
//camera.y-=.1;
camera =vectorAdd(camera, yAxis);
//camera =vectorSub(camera, forwardV);


};//DOWN

//---------------------------//

// LEFT
if (touchX > lftBtn.x1 && touchY > lftBtn.y1 && touchX < lftBtn.x2 && touchY < lftBtn.y2 || touchX2 > lftBtn.x1 && touchY2 > lftBtn.y1 && touchX2 < lftBtn.x2 && touchY2 < lftBtn.y2)
{
//angleY += .1 * z;
//camera.x-=.1;
camera =vectorSub(camera, xAxis);

};// LEFT

//-----------------------------//

  // RIGHT
if(touchX>rgtBtn.x1 && touchY > rgtBtn.y1 && touchX < rgtBtn.x2 && touchY < rgtBtn.y2 || touchX2>rgtBtn.x1 && touchY2 > rgtBtn.y1 && touchX2 < rgtBtn.x2 && touchY2 < rgtBtn.y2)
{
//angleY -= .1 * z;
//camera.x+=.1;
camera =vectorAdd(camera, xAxis);
};// RIGHT


//STRAFE RIGHT
if (touchX > stRgtBtn.x1 && touchY > stRgtBtn.y1 && touchX < stRgtBtn.x2 && touchY < stRgtBtn.y2 || touchX2 > stRgtBtn.x1 && touchY2 > stRgtBtn.y1 && touchX2 < stRgtBtn.x2 && touchY2 < stRgtBtn.y2)
{

//angleZ+=.1*z;
//camera.z+=.1;
yaw+=1*z;
}; //strafe right


//---------------------------//


//STRAFE LEFT
if (touchX > stLftBtn.x1 && touchY > stLftBtn.y1 && touchX < stLftBtn.x2 && touchY < stLftBtn.y2 || touchX2 > stLftBtn.x1 && touchY2 > stLftBtn.y1 && touchX2 < stLftBtn.x2 && touchY2 < stLftBtn.y2)
{

//angleZ-=.1*z;
//camera.z-=.1;
yaw-=1*z;
}; //STRAFE LEFT

//ACTION
if (touchX > actionBtn.x1 && touchY > actionBtn.y1 && touchX < actionBtn.x2 && touchY < actionBtn.y2 || touchX2 > actionBtn.x1 && touchY2 > actionBtn.y1 && touchX2 < actionBtn.x2 && touchY2 < actionBtn.y2)
{
  
camera =vectorAdd(camera, zAxis);
  
  
}// action

//---------------------------//
};//end joystick function

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawJoystick(ctx)
{
	
	 ctx.fillStyle = "black";
	 ctx.fillRect(0, 0, 320, 320);
	
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.strokeStyle="white";
	ctx.beginPath();
ctx.rect(upBtn.x1-offsetXJ,upBtn.y1-320,40,40);
ctx.rect(dwnBtn.x1-offsetXJ,dwnBtn.y1-320,40,40);
ctx.rect(lftBtn.x1-offsetXJ,lftBtn.y1-320,40,40);
ctx.rect(rgtBtn.x1-offsetXJ,rgtBtn.y1-320,40,40);
ctx.rect(stLftBtn.x1-offsetXJ,stLftBtn.y1-320,80,80);
ctx.rect(stRgtBtn.x1-offsetXJ,stRgtBtn.y1-320,80,80);


ctx.rect(actionBtn.x1-offsetXJ,actionBtn.y1-320,80,80);



	ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle="blue";
	ctx.font="50px Verdana";
	ctx.fillText("A",223,75);
	
	
	//restore values
	ctx.shadowBlur = 0;
};


//---------------------------//
