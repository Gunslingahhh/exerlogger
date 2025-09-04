<?php
// You can add PHP logic here later if needed (for saving clicks, etc.)
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Timer Click App</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="circle-container" id="circleContainer">
      <svg id="svg">
        <circle class="bg" cx="150" cy="150" r="130"></circle>
        <circle class="progress" cx="150" cy="150" r="130"></circle>
      </svg>

      <div id="overlay">
        <div id="timeText"></div>
        <button id="startBtn">Start</button>
      </div>
    </div>

    <div id="clicks">Clicks: 0</div>
  </div>

  <script src="script.js"></script>
</body>
</html>
