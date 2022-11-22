//---------------------------//
const offsetY = canvasMain.offsetTop;

const offsetX = canvasMain.offsetLeft;

const offsetYJ = canvasJoystick.offsetTop;
const offsetXJ = canvasJoystick.offsetLeft;

//---------------------------//

//defines a button
var Button = function(x1, y1, width, height)
{
 this.x1= x1;
 this.y1= y1;
 this.width= width;
 this.height= height;
 this.x2=x1+width+offsetX;
 this.y2=y1+height+offsetY;
      
};
 
//---------------------------//
// buttons


var upBtn= new Button(55+offsetXJ,340,40-offsetXJ,40);
var dwnBtn= new Button(55+offsetXJ,420,40-offsetXJ,40);
var lftBtn= new Button(10+offsetXJ,380,40-offsetXJ,40);
var rgtBtn= new Button(100+offsetXJ,380,40-offsetXJ,40);
var stLftBtn= new Button(160+offsetXJ,450,80-offsetXJ,80);
var stRgtBtn= new Button(240+offsetXJ,450,80-offsetXJ,80);

var actionBtn= new Button(200+offsetXJ,340,80-offsetXJ,80);

//---------------------------//
