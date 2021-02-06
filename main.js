status="";
video="";
objects=[];


function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO)
video.size(480,380)
video.hide()
}
function start(){

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";
object2=document.getElementById("object_input").value
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
    if(error){
        console.error;
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,480,380);
if(status!=""){
    objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:objects detected";
      
        fill("blue")
        percent=floor(objects[i].confidence*100)
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
        noFill();
        stroke("red")
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        if(objects[i].label==object2){
            video.stop()
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML=object2+" "+"is found"
            synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(object2+" "+"is found");
synth.speak(utterThis);
       
    }
}
}

else{
    document.getElementById("status").innerHTML="object not found"
}
}