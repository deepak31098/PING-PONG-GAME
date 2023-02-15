//Rod, ball and their dimension
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var ball = document.getElementById('ball');
var rodDimension = rod2.getBoundingClientRect();
var ballDimension = ball.getBoundingClientRect();

//Inital Position
var rodIntialPosition = (window.innerWidth-rodDimension.width)/2
var ballIntialPosition = (window.innerWidth-ballDimension.width)/2

//Storing wins
localStorage.setItem("totalWins1", 0);
localStorage.setItem("totalWins2", 0); 

//Initail ball move
var directionUp = false;

//Game Rule
alert("Press 'a' for left and 'd' for right. Game will start once you press enter.");
alert("Don't be slow because ball is fast")

// Handling Rod movement and messages
document.addEventListener('keypress',function(e)
{
  
  //Left Position of rod
  let leftOffset = rod1.offsetLeft;

  //For message
  let twin1 = localStorage.getItem("totalWins1");
  let twin2 = localStorage.getItem("totalWins2");

  if(e.key === 'Enter'){
    if(twin1 != 0 || twin2 != 0){
      if( twin1 > twin2){
        alert('Rod 1 has maximum Score ' + twin1)
      }
      else if( twin1 < twin2){
        alert('Rod 2 has maximum Score ' + twin2)
      }
      else{
        alert("😉 It's a tie");
      }
    }
    else{
      alert('This is your first time');
    }
    
    ball.style.left = ballIntialPosition + 'px';  
    rod1.style.left = rodIntialPosition + 'px';  
    rod2.style.left = rodIntialPosition + 'px';  

    if(directionUp){
      ball.style.top = rod2.offsetTop - ballDimension.height+ 'px'; 
      moveUp();
      moveRight();
    }
    else{
      let temp = rod1.offsetTop+ rodDimension.height;
      ball.style.top = temp + 'px';  
      moveDown();
      moveRight();

    }
  }
  else if( e.key === 'd'){
    let actualRightPosition = Math.min(leftOffset+10,window.innerWidth-rodDimension.width);
    rod1.style.left = actualRightPosition + 'px';
    rod2.style.left = actualRightPosition + 'px';  
  }

  else if( e.key ==='a'){
    let actualLeftPosition = Math.max(leftOffset-10,0);
    rod1.style.left = actualLeftPosition + 'px';
    rod2.style.left = actualLeftPosition + 'px';  
  }
})



//Ball Movement

//Check if ball strike at right position

function checkValidRod1Position(ballTopOffset){
  if(ballTopOffset -rodDimension.height <= 0 && ball.offsetLeft >= rod1.offsetLeft && ball.offsetLeft <= rod1.offsetLeft + rodDimension.width){
    return true;
  }
  return false;
}

function checkValidRod2Position(ballTopOffset){
  if( (ballTopOffset +ballDimension.height) - rod2.offsetTop >= 0 && ball.offsetLeft >= rod2.offsetLeft && ball.offsetLeft <= rod2.offsetLeft + rodDimension.width){
    return true;
  }
  return false;
}



//Catering Vertical movement

//Move North function
function moveUp()
{
    let ballTopOffset = ball.offsetTop;
    var temp = setInterval(() => {
      if(checkValidRod1Position(ballTopOffset)){
        clearInterval(temp);
        moveDown();
        return;
      }

      if(ballTopOffset <= 0){
        clearInterval(temp);
        let twin2 = localStorage.getItem("totalWins2");
        localStorage.setItem("totalWins2", parseInt(twin2)+1);
        directionUp=false;
        alert('🥴 Better Luck Next Time');
        return;
      }
      ball.style.top = ballTopOffset + 'px';
      ballTopOffset--;
    },2);

    return true;
}

//Move South function
function moveDown()
{
    let ballTopOffset = ball.offsetTop;
    var temp = setInterval(() => {
      if(checkValidRod2Position(ballTopOffset)){
        clearInterval(temp);
        moveUp();
        return;
      }

      if(ballTopOffset + ballDimension.height>= window.innerHeight){
        clearInterval(temp);
        let twin1 = localStorage.getItem("totalWins1");
        localStorage.setItem("totalWins1", parseInt(twin1) +1);
        directionUp=true;
        alert('🥴 Better Luck Next Time');
        return;
      }
      ball.style.top = ballTopOffset + 'px';
      ballTopOffset++;
    },2);

  
    return true;
}

//Catering horizontal movement
//Move West function
function moveLeft()
{
  var temp = setInterval(() => {

    if(ball.offsetTop < rodDimension.height){
        clearInterval(temp);
        return;
    }

    if(ball.offsetTop + ballDimension.height > window.innerHeight - rodDimension.height){
        clearInterval(temp);
        return;
    }
    if(ball.offsetLeft<=0){
        clearInterval(temp);
        moveRight();
        return;
    }
    let pos = ball.offsetLeft-1;
    ball.style.left = pos + 'px';
  },2);
}


//Move East function
function moveRight()
{
  
  var temp = setInterval(() => {

      if(ball.offsetTop < rodDimension.height){
        clearInterval(temp);
        
        return;
      }

      if(ball.offsetTop + ballDimension.height > window.innerHeight - rodDimension.height){
        clearInterval(temp);
        return;
      }

    if(ball.offsetLeft + ballDimension.width >= window.innerWidth){
        clearInterval(temp);
        moveLeft();
        return;
    }
    let pos = ball.offsetLeft+1;
    ball.style.left = pos  + 'px';
    
  },2);
}


