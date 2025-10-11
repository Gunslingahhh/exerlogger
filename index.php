<?php
// You can add PHP logic here later if needed (for saving clicks, etc.)
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Exerlogger</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div id="center-point">
            
        </div>

        <div id="container">
            <p id="exerciseName">Exercise</p>
            <br>
            <p id="startButton" onclick="startRepsBased(10, 2, 'inactive', 'clockwise')">Start?</p>
            <p id="restText">Rest</p>
            <br>
            <p id="timer"></p>
            <br>
            <p id="setsCount"></p>
        </div>

        <script src="script.js"></script>
    </body>
</html>
