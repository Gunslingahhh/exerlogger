const totalSegments = 24; // number of dashes/dots
const segThickness = 20; // width of each segment
const segLength = 45; // length of each segment
const radius = 200; // distance from the center of the circle

const center = document.getElementById("center-point");
const exerciseName = document.getElementById("exerciseName");
const timer = document.getElementById("timer");
const startButton = document.getElementById("startButton");
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

function rotationSegment(className, direction, time) {
    const seconds = time * 1000; 
    const duration = seconds / segments.length;
    const startIndex=0;

    startButton.style.display = "none";
    timer.style.display = "block";

    if (direction=="clockwise"){
        //Clockwise
        for (let j=0; j < segments.length; j++){
            const index = (startIndex + j) % segments.length; 
            setTimeout(() => {
                segments[index].classList.add(className);
                
                // remove all other classes in "state" that are not the desired class
                state.forEach(c => {
                    if (c !== className) {
                    segments[index].classList.remove(c);
                    }
                });

                if (j == segments.length-1){
                    startButton.style.display = "block";
                    timer.style.display = "none";
                }
            }, j * duration);        }
    }
    else if(direction=="anticlockwise"){
        // Anticlockwise
        for (let k=0; k < segments.length; k++){
            const index = (startIndex - k + segments.length) % segments.length;
            setTimeout(() => {
                segments[index].classList.add(className);

                // remove all other classes in "state" that are not the desired class
                state.forEach(c => {
                    if (c !== className) {
                    segments[index].classList.remove(c);
                    }
                });

                if (k == segments.length-1){
                    startButton.style.display = "block";
                    timer.style.display = "none";
                }
            }, k * duration);
        }
    }
}

function resetSegment(){
    for (let l=0; l < segments.length; l++){
        segments[l].classList.remove("active", "inactive");
    }
}

var setCount=0;
function startRepsBased(numberOfSet, restTime){
    setCount++;

    resetSegment();
    rotationSegment("active", "anticlockwise", restTime);
    countdown(restTime);


    if (setCount <= numberOfSet*2){ // Overlimit just like in Solo Leveling
        setsCount.innerHTML = `Sets: [ ${setCount} / ${numberOfSet} ]`;
    }
}

/* function startTimerBased(){

} */

function countdown(time){
    // Only allow countdowns within a reasonable range (1 second to 1 day)
    if (time > 0 && time <= 86400) {
        for (let i = time; i >= 0; i--) {
            setTimeout(() => {
                const days = Math.floor(i / 86400);
                const hours = Math.floor((i % 86400) / 3600);
                const minutes = Math.floor((i % 3600) / 60);
                const seconds = i % 60;

                // Build the display format dynamically
                let parts = [];
                if (days > 0) parts.push(String(days).padStart(2, "0"));
                if (hours > 0 || days > 0) parts.push(String(hours).padStart(2, "0"));
                parts.push(String(minutes).padStart(2, "0"));
                parts.push(String(seconds).padStart(2, "0"));

                const formattedTime = parts.join(":");
                timer.innerHTML = formattedTime;
            }, (time - i) * 1000);
        }
    } else {
        console.log("Over limit");
    }
}



/* function stopwatch(){

} */