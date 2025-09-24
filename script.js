const totalSegments = 24; // number of dashes/dots
const segThickness = 20; // width of each segment
const segLength = 50; // length of each segment
const radius = 180; // distance from the center of the circle
const container = document.getElementById("container");

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
    container.appendChild(segWrapper);
}
