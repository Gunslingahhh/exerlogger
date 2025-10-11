const totalSegments = 24; // number of dashes/dots
const segThickness = 20; // width of each segment
const segLength = 45; // length of each segment
const radius = 200; // distance from the center of the circle

const center = document.getElementById("center-point");
const exerciseName = document.getElementById("exerciseName");
const timer = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const restText = document.getElementById("restText");
const setsCount = document.getElementById("setsCount");

// CREATE SEGMENT
for (let i = 0; i < totalSegments; i++) {
    // Create a wrapper for each segment. This wrapper will handle the rotation.
    const segWrapper = document.createElement("div");
    segWrapper.className = "segment-wrapper";

    // Create the segment itself.
    const seg = document.createElement("div");
    seg.className = "segment";

    // Size of segment
    seg.style.width = segThickness + "px";
    seg.style.height = segLength + "px";
    
    // Position the segment inside the wrapper based on the radius.
    // The negative value moves it "up" from the center of the container.
    seg.style.transform = `translateY(-${radius}px)`;
    
    // Rotate the wrapper around the center.
    const angle = (360 / totalSegments) * i;
    segWrapper.style.transform = `rotate(${angle}deg) translateX(-${segThickness / 2}px)`;

    // Append the segment to the wrapper, and the wrapper to the container.
    segWrapper.appendChild(seg);
    center.appendChild(segWrapper);
}

//Collect all array with class "segment" and put it all in an array
const segments = Array.from(document.querySelectorAll(".segment"));

const state=["active", "inactive"];

function countdown(time) {
    // Allow countdowns within 1 second to 7200 seconds (2 hours)
    if (time > 0 && time <= 7200) {
        for (let i = time; i >= 0; i--) {
            setTimeout(() => {
                const hours = Math.floor(i / 3600);
                const minutes = Math.floor((i % 3600) / 60);
                const seconds = i % 60;

                // Build format dynamically
                let formattedTime;
                if (hours > 0) {
                    // Show HH:MM:SS if there are hours
                    formattedTime =
                        String(hours).padStart(2, "0") + ":" +
                        String(minutes).padStart(2, "0") + ":" +
                        String(seconds).padStart(2, "0");
                } else {
                    // Show MM:SS if there are no hours
                    formattedTime =
                        String(minutes).padStart(2, "0") + ":" +
                        String(seconds).padStart(2, "0");
                }

                timer.innerHTML = formattedTime;
            }, (time - i) * 1000);
        }
    } else {
        timer.innerHTML = "Over limit";
    }
}


function stopwatch(){
    let second=0;
    const interval = setInterval(() =>{
        second++;
        console.log(`${second}`);
    }, 1000);
}

function allSegment(className){
    resetSegment();
    for (let l=0; l < segments.length; l++){
        segments[l].classList.add(className);
    }
}

function resetSegment(){
    for (let l=0; l < segments.length; l++){
        segments[l].classList.remove("active", "inactive");
    }
}

var setCount=0;
function startRepsBased(numberOfSet, restTime, className, direction){
    if (setCount == 0){
        allSegment("active");
        startButton.innerHTML = "Start!";
    }
    else{
        resetSegment();
        rotationSegment(className, direction, restTime);
        countdown(restTime);
        
        if (setCount <= numberOfSet*2){ // Overlimit just like in Solo Leveling
            setsCount.innerHTML = `Sets: [ ${setCount} / ${numberOfSet} ]`;
        }
    }
    setCount++;
}

/* function startTimerBased(){


} */

function rotationSegment(className, direction, time){
    const seconds = time * 1000; 
    const duration = seconds / (segments.length-1);

    startButton.style.display = "none";
    restText.style.display = "block";
    timer.style.display = "block";

    if (direction=="clockwise"){
        const startIndex=1;
        //Clockwise
        for (let j=0; j < segments.length; j++){
            const index = (startIndex + j) % segments.length; 
            setTimeout(() => {
                segments[index].classList.add(className);
                
                // remove all other classes in "state" that are not the desired class
                state.forEach(c => {
                    if (c !== className) {
                        segments[index].classList.remove(c);
                        if (j == segments.length-1){
                            startButton.style.display = "block";
                            restText.style.display = "none";
                            timer.style.display = "none";
                            setTimeout(()=>{allSegment(c);},80);               
                        }
                    }
                });
            }, j * duration);        }
    }
    else if(direction=="anticlockwise"){
        const startIndex=23;
        // Anticlockwise
        for (let k=0; k < segments.length; k++){
            const index = (startIndex - k + segments.length) % segments.length;
            setTimeout(() => {
                segments[index].classList.add(className);

                // remove all other classes in "state" that are not the desired class
                state.forEach(c => {
                    if (c !== className) {
                        segments[index].classList.remove(c);
                        if (k == segments.length-1){
                            startButton.style.display = "block";
                            restText.style.display = "none";
                            timer.style.display = "none";
                            setTimeout(()=>{allSegment(c);},80);               
                        }
                    }
                });
            }, k * duration);
        }
    }
}