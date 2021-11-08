objects=[];
video="";
status="";

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
    
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects detect";
            document.getElementById("number_of_objects").innerHTML="number of objects detected :"+ objects.length;
             
            fill("red");
            percent=floor(objects[i].confidenece*100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResult(error,result){
if(error){
    console.log(error);
}
console.log(result);
objects=result;
}