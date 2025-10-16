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

//Core Function
function rotationSegment(className, direction, time){
    resetSegment();
    const seconds = time * 1000; //Convert milisecond to second
    const duration = seconds / (segments.length-1); //Duration of the rotation around the segments

    if (direction=="clockwise"){ //If direction is clockwise
        const startIndex=1; //Starting point of the rotation

        //Clockwise
        for (let j=0; j < segments.length; j++){ //Loop
            const index = (startIndex + j) % segments.length; //Select each segment

            setTimeout(() => {
                segments[index].classList.add(className); //Light up each segment according to className
                
                if (j == segments.length-1){ //If its at the very last segment
                    startButton.style.display = "block"; //Show Start button
                    restText.style.display = "none"; //Hide Rest text
                    timer.style.display = "none"; //Hide timer
                }
            }, j * duration);        } //Duration of the rotation
    }
    else if(direction=="anticlockwise"){ //If direction is anticlockwise
        const startIndex=23; //Starting point of the rotation

        // Anticlockwise
        for (let k=0; k < segments.length; k++){ //Loop
            const index = (startIndex - k + segments.length) % segments.length; //Select each segment

            setTimeout(() => {
                segments[index].classList.add(className); //Light up each segment according to className

                if (k == segments.length-1){ //If its at the very last segment
                    startButton.style.display = "block"; //Show Start button
                    restText.style.display = "none"; //Hide Rest text
                    timer.style.display = "none"; //Hide timer
                }
            }, k * duration); //Duration of the rotation
        }
    }
}

function resetSegment(){
    for (let l=0; l < segments.length; l++){
        segments[l].classList.remove("active", "inactive");
    }
}

//Custom Function
var setCount=0;
function repsBased(numberOfSet, restTime){
    if (setCount == 0){
        rotationSegment("active", "clockwise", 0.5);
        startButton.innerHTML = "Start!";
    }
    else{
        rotationSegment("active", "clockwise", restTime);
        startButton.style.display = "none";
        restText.style.display = "block";
        timer.style.display = "block";
        countdown(restTime);
        
        if (setCount <= numberOfSet*2){ // Overlimit just like in Solo Leveling
            setsCount.innerHTML = `Sets: [ ${setCount} / ${numberOfSet} ]`;
        }
    }
    setCount++;
}

/* function timerBased(){


} */

let flowInterval;

function flowEffect() {
    let head1 = 0;
    let head2 = Math.floor(segments.length / 2); // opposite side
    const trailLength = 5; // shorter trails look more like “tails”
    const speed = 85; // lower = faster

    clearInterval(flowInterval);

    flowInterval = setInterval(() => {
        segments.forEach((seg, i) => {
            // Calculate distance from each head
            const diff1 = (i - head1 + segments.length) % segments.length;
            const diff2 = (i - head2 + segments.length) % segments.length;

            // Segment glows if it's part of either koi's trail
            if (diff1 < trailLength || diff2 < trailLength) {
                seg.classList.add("active");
                seg.style.opacity = 1;
            } else {
                seg.classList.remove("active");
                seg.style.opacity = 0.3;
            }
        });

        // Move both heads
        head1 = (head1 + 1) % segments.length;
        head2 = (head2 + 1) % segments.length;
    }, speed);
}


function stopFlowEffect() {
    clearInterval(flowInterval);
    segments.forEach(seg => {
        seg.classList.remove("active");
        seg.style.opacity = 1;
    });
}
