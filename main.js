Webcam.set({
    width: 350,
    height: 300,
    image_formate:"png",
    png_quality:90
});
camera=document.getElementById("camera");

Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'/>"
    })

}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bU6-dXgg9/model.json",modelLoaded);

function modelLoaded(){
    console.log("model ready")
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult)
}
function gotresult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label=="happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji1").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}