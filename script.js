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

//KEEP THE SCREEN AWAKE
// --- SCREEN WAKE LOCK API ---
// Prevents the screen from turning off during the workout.

let wakeLock = null;

// Function to request a wake lock
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen Wake Lock acquired.');

      // Listen for the lock to be released by the browser (e.g., tab minimized)
      wakeLock.addEventListener('release', () => {
        console.log('Screen Wake Lock released by the system.');
      });
      
    } catch (err) {
      // The user may have denied the request or the feature is unavailable
      console.error(`Wake Lock request failed: ${err.name}, ${err.message}`);
    }
  } else {
    console.warn('Screen Wake Lock API not supported in this browser.');
  }
}

// Function to release the wake lock
function releaseWakeLock() {
  if (wakeLock) {
    // Check if wakeLock is defined before attempting to release
    wakeLock.release()
      .then(() => {
        wakeLock = null;
        console.log('Screen Wake Lock released manually.');
      })
      .catch(err => {
          console.error(`Error releasing wake lock: ${err.message}`);
      });
  }
}
// ----------------------------

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
                if (i == 0){
                  startButton.style.display = "block";
                  restText.style.display = "none";
                  timer.style.display = "none";
                }
            }, (time - i) * 1000);
        }
    } else {
        timer.innerHTML = "Over limit";
    }
}

// Global variable to store the ID returned by setInterval()
// This must be declared outside any function so both start/stop can access it.
let startTime; 
let stopwatchInterval; 

function startStopwatch(){
    clearInterval(stopwatchInterval); 
    
    // 1. Record the precise start time (in milliseconds)
    startTime = Date.now(); 
    
    // 2. We can still use setInterval to log the time, 
    // but the final duration is calculated using Date.now()
    stopwatchInterval = setInterval(() =>{
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        console.log(`Time elapsed: ${elapsed} seconds`);
    }, 1000);
}

function endStopwatch(){
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        
        // 1. Record the precise end time
        const endTime = Date.now();
        
        // 2. Calculate the difference
        const rawDurationMs = endTime - startTime;
        
        // 3. Round to the nearest whole second
        const totalDurationSeconds = Math.round(rawDurationMs / 1000);

        console.log(`Stopwatch stopped. Total time logged to console: ${totalDurationSeconds} seconds.`);
        
        stopwatchInterval = null; 
    } else {
        console.log("Stopwatch was not running.");
    }
}

//Core Function
async function rotationSegment(direction, time, action) {
  return new Promise((resolve) => { // ✅ Make it return a Promise
    const seconds = time * 1000;
    const duration = seconds / (segments.length - 1);

    for (let j = 0; j < segments.length; j++) {
      setTimeout(() => {
        const startIndex = direction === "clockwise" ? 1 : segments.length;
        const index =
          direction === "clockwise"
            ? (startIndex + j) % segments.length
            : (startIndex - j + segments.length) % segments.length;

        segments[index].classList[action]("active");

        if (j === segments.length - 1) {
          resolve(); // ✅ Tell JS this async task is done
        }
      }, j * duration);
    }
  });
}

async function processCommandQueue(queue) {
  // console.log("\n--- PROCESSOR STARTED ---");

  for (const command of queue) {
      // 'await' waits for either the function to finish instantly (sync) 
      // or for the Promise to resolve (async).
      await command(); 
  }

  // console.log("--- ALL COMMANDS COMPLETE ---\n");
}

let flowInterval;
async function flowEffect() {
  let head1 = 0;
  let head2 = Math.floor(segments.length / 2);
  const trailLength = 5;
  const speed = 85;

  clearInterval(flowInterval);

  flowInterval = setInterval(() => {
    segments.forEach((seg, i) => {
      const diff1 = (i - head1 + segments.length) % segments.length;
      const diff2 = (i - head2 + segments.length) % segments.length;

      if (diff1 < trailLength || diff2 < trailLength) {
        seg.classList.add("active");
        // seg.style.opacity = 1;
      } else {
        seg.classList.remove("active");
        // seg.style.opacity = 0;
      }
    });

    head1 = (head1 + 1) % segments.length;
    head2 = (head2 + 1) % segments.length;
  }, speed);
}

function stopFlowEffect() {
  return new Promise((resolve) => { // ✅ Also return a Promise
    clearInterval(flowInterval);
    segments.forEach(seg => {
        seg.classList.remove("active");
        seg.style.opacity = 1;
    });
    resolve();
  });
}

async function exercise(exerName, exerType, exerSets, exerTime, restTime){ 
  // The Queue Builder: Defines the entire sequence of sets and rest periods,
  // populating the global workoutQueue array with commands.
}

async function workout(exerType, exerSets, exerTime, restTime){ 
  // The Basic Unit of Work: Executes all asynchronous tasks for one work period 
  // (e.g., visual timer + countdown) and resolves only upon completion.

  if (exerType == "reps"){
    console.log("reps");
  } else if (exerType == "timer"){
    for (let i=0; i<exerSets; i++){
      // 1. Setup UI for Rest (Synchronous, instant)
      rotationSegment("clockwise", 0, "remove")     // Visual timer (The animation)
      startButton.style.display="none"; // Hide 'Finish Set' button
      restText.style.display="block";   // Show 'Resting' text
      restText.innerHTML="Finish Set!";   // Show 'Finish Set!' text
      timer.style.display="block";      // Show the countdown numbers

      // 2. Run the Visual and Numerical Timers Concurrently
      // We use Promise.all to ensure the function PAUSES until BOTH promises resolve
      // after the full restTime duration.
      await Promise.all([
          countdown(exerTime),                                 // Actual timer (The duration gate)
          rotationSegment("anticlockwise", exerTime, "add"),     // Visual timer (The animation)
          
      ]);
      
      // 3. Cleanup UI after Rest is complete (Synchronous, instant)
      startButton.style.display="block";
      restText.style.display="none";
      timer.style.display="none";
      setsCount.innerHTML = `Sets: [ ${i+1} / ${exerSets} ]`,
      await rest(restTime);
    }
  }
}

async function rest(restTime){ 
  // The Basic Unit of Rest: Executes the rest sequence, including awaiting 
  // the concurrent countdown and rotationSegment promises.

  // 1. Setup UI for Rest (Synchronous, instant)
  rotationSegment("clockwise", 0, "add")     // Visual timer (The animation)
  startButton.style.display="none"; // Hide 'Finish Set' button
  restText.style.display="block";   // Show 'Resting' text
  restText.innerHTML="Resting";     // Show "Resting" text
  timer.style.display="block";      // Show the countdown numbers

  // 2. Run the Visual and Numerical Timers Concurrently
  // We use Promise.all to ensure the function PAUSES until BOTH promises resolve
  // after the full restTime duration.
  await Promise.all([
      countdown(restTime),                                 // Actual timer (The duration gate)
      rotationSegment("clockwise", restTime, "remove")     // Visual timer (The animation)
  ]);
  
  // 3. Cleanup UI after Rest is complete (Synchronous, instant)
  startButton.style.display="block";
  restText.style.display="none";
  timer.style.display="none";
  
  // Note: The function resolves here, allowing the queue to move to the next command.
}