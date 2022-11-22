 //TOUCH EVENTS//

//touch start event 
ontouchstart = function touchStart(event)
 {

 touchX = event.touches[0].clientX;
 touchY = event.touches[0].clientY;
 
 if (event.touches[1]) 
 {
 touchX2 = event.touches[1].clientX;
 touchY2 = event.touches[1].clientY;
 };
 
 

 };

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

 //touch move event
ontouchmove = function touchMove(event)
 { 
 touchX = event.touches[0].clientX;
 touchY = event.touches[0].clientY;

 if (event.touches[1]) 
 {
 touchX2 = event.touches[1].clientX;
 touchY2 = event.touches[1].clientY;
 };
 
 };

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//touch end event
ontouchend = function touchEnd(event)
 { 
 if (!event.touches[0])
 {
 touchX = 0;
 touchY = 0;
 };

 if (!event.touches[1])
 {
 touchX2 = 0;
 touchY2 = 0;
 };
 
};
