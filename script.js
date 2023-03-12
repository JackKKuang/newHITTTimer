let buttons;
let timeBox;
let interval;

let isWarmup = true;
let isInterval = false;
let isRecovery = false;
let intervalNumber;
let controls;

let warmupTime2 = "3:00";
let intervalTime2 = "3:00";
let recoveryTime2 = "3:00";

let onMinute = false;
let onSecond = 0;

let start = false;
let stop = false;
let reset = false;

let timer;
let mySound = new sound("click.mp3");

window.onload = function() {
  buttons = document.querySelectorAll(".button");
  timeBox = document.querySelectorAll(".intervalTime"); 
  interval = document.getElementById("interval");
  controls = document.querySelectorAll(".controls");
  
  console.log(timeBox.length);
    for(let x = 0; x < timeBox.length; x++){
      
      console.log(timeBox[x]);
      timeBox[x].addEventListener("input", function(changed){
          
          if (timeBox[x].value == changed.data){
            timeBox[x].value = "0:00";
          }else{
            let newText = "";

            for(let i = 0; i < timeBox[x].value.split("").length - 1; i++){
              newText += timeBox[x].value.split("")[i];
            }
            
            timeBox[x].value = newText;
          }
          
          let minutes = timeBox[x].value.split(":")[0];
          let seconds = timeBox[x].value.split(":")[1];
          let newTime;  
        
          if (onSecond == 0){
            timeBox[x].value = minutes + ":" + seconds.split("")[0] + changed.data;
            onSecond++;
          }else if (onSecond == 1){
            timeBox[x].value = minutes + ":" + seconds.split("")[1] + changed.data;
            onSecond++;
            onMinute = true;
          }else if(onMinute == true){
            timeBox[x].value = seconds.split("")[0] + ":" + seconds.split("")[1] + changed.data;
            onMinute = false;
            onSecond -= 2;
          }
          
          console.log(timeBox[x].id);
          console.log(timeBox[x]);
          console.log(timeBox[x].value);  
        
          if(timeBox[x].id == "intervalTime"){
            intervalTime2 = timeBox[x].value;
          }else if(timeBox[x].id == "recoveryTime"){
            recoveryTime2 = timeBox[x].value;
          }else if(timeBox[x].id == "warmupTime"){
            warmupTime2 = timeBox[x].value;
          }
        
          console.log(warmupTime2, + " " + intervalTime2 + " " + recoveryTime2);
      });
      
      timeBox[x].addEventListener("click", function(){
        timeBox[x].value = "";
      });
    }
  
  console.log(interval.value = "0/12");
  
  for(let i = 0; i < controls.length; i++){
    controls[i].addEventListener("click", function(){

	  mySound.play();
	  
      let text = controls[i].innerHTML;
      if (text == "START"){  
        warmupTime = document.getElementById("warmupTime");
        intervalTime = document.getElementById("intervalTime");
        recoveryTime = document.getElementById("recoveryTime");
        
        clearInterval(timer);
        
        timer = setInterval(function(){
          let minutes;
          let seconds;
          let toChange;
          
         if(isWarmup == true){
           console.log("warmup");
           
           minutes = warmupTime.value.split(":")[0];
           seconds = warmupTime.value.split(":")[1];
           console.log(seconds);
           toChange = warmupTime;
         }else if (isInterval == true){
           console.log("interval");
           minutes = intervalTime.value.split(":")[0];
           seconds = intervalTime.value.split(":")[1];
           toChange = intervalTime;
         }else{
           console.log("recovery");
           minutes = recoveryTime.value.split(":")[0];
           seconds = recoveryTime.value.split(":")[1];
           toChange = recoveryTime;
         }
         
         console.log(warmupTime2 + " WARMUPTIME " + intervalTime2 + " INTERVALTIME" + " " + recoveryTime2 + " RECOVERYTIME " );
          
         if (seconds != "00"){
           
           if(seconds.split("")[1] != "0"){
             toChange.value = minutes + ":" + seconds[0] + (parseInt(seconds[1]) - 1).toString();
           }else{
             toChange.value = minutes + ":" + (parseInt(seconds[0]) - 1) + "9";
           }
         }else if(minutes != "0"){
           toChange.value = (parseInt(minutes) - 1).toString() + ":59";
         }else{
			
			let ring = new sound("bell.mp3");
			ring.play();
			 
           if(isWarmup ==  true){
             isWarmup = false;
             isInterval = true;
           }else if(isInterval == true){
             isInterval = false;
             isRecovery = true;
           }else{
             isRecovery = false;
             let sets = document.getElementById("interval");
              
             if(parseInt(sets.value.split(":")[0]) - parseInt(sets.value.split("/")[1]) < 0){
               sets.value = (parseInt(sets.value.split(":")[0]) + 1).toString() + "/" + sets.value.split("/")[1];
               
               for(let i = 0; i < timeBox.length; i++){
                 
                 console.log("resetting");
                 
                  if(timeBox[i].id == "recoveryTime"){
                    timeBox[i].value = recoveryTime2;
                  }else if(timeBox[i].id == "intervalTime"){
                    timeBox[i].value = intervalTime2;
                  }
               }
               
               isInterval = true;

             }
           }
         }
          
        }, 1000);
        
      }else if(text == "STOP"){
        
        clearInterval(timer);

      }else if(text == "RESET"){
               
         clearInterval(timer);        

        for(let i = 0; i < timeBox.length; i++){
          timeBox[i].value = "3:00";
        }
        
        interval.value = "0/12"
        
        let warmupTime = "3:00";
        let intervalTime = "3:00";
        let recoveryTime = "3:00";
        
      }
    });
  }
  
  for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
      
	  newSound = new sound("click.mp3");
	  
	  newSound.play();
	  
      let children = buttons[i].parentElement.parentElement.children
      for(let v = 0; v < children.length; v++){
        if(children[v].className == "intervalTimeBox"){
          let timeBox = children[v].children[0];
          
          if(timeBox.value == ""){
            timeBox.value = "0:00";
          }
          
          let minutes = timeBox.value.split(":")[0];
          let seconds = timeBox.value.split(":")[1];
          
          console.log(parseInt(seconds));
          console.log(parseInt(buttons[i].innerHTML.split("+")[1]));
          seconds = parseInt(seconds) + parseInt(buttons[i].innerHTML.split("+")[1]);
          
          if(seconds > 60){
            seconds -= 60;
            minutes++;
          }
          
          timeBox.value = minutes + ":" + seconds
          
          
          if(timeBox.id == "intervalTime"){
            intervalTime2 = timeBox.value;
          }else if(timeBox.id == "recoveryTime"){
            recoveryTime2 = timeBox.value;
          }else if(timeBox.id == "warmupTime"){
            warmupTime2 = timeBox.value;
          }
         
          console.log(warmupTime2 + " WARMUPTIME " + intervalTime2 + " INTERVALTIME" + " " + recoveryTime2 + " RECOVERYTIME " );
        }
      } 
    });
    
    
  }
  
  //console.log(timeBox);
  
  for(let i = 0; i < timeBox.length; i++){
    timeBox[i].value = "3:00";
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

window.onload = function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};