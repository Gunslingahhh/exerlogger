<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Container</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body{
            background-color: black;
        }

       .container {
            min-height: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            margin-bottom: 10px;
            border: 1px solid white;
            cursor: pointer;
        }

        /* Define background colors for different screen sizes */
        @media (max-width: 575.98px) { /* Extra small screens */
            .container { background-color: #6c757d; /* gray */ }
        }
        @media (min-width: 576px) and (max-width: 767.98px) { /* Small screens */
            .container { background-color: #0b5ed7; /* Blue */ }
        }
        @media (min-width: 768px) and (max-width: 991.98px) { /* Medium screens */
            .container { background-color: #20c997; /* Teal */ }
        }
        @media (min-width: 992px) { /* Large screens */
            .container { background-color: #d63384; /* Pink */ }
        }

        /* Remove top margin from the first container */
        .container:first-child {
            margin-top: 0;
        }
        /* Remove bottom margin from the last container */
        .container:last-child {
            margin-bottom: 0;
        }
        .modal-content {
            background-color: #343a40;
            color: #fff;
        }
        .modal-header {
            border-bottom: 1px solid #495057;
        }
        .modal-footer{
            border-top: 1px solid #495057;
        }
        .form-label{
            color: #fff;
        }

    </style>
</head>
<body>
    <div class="container rep-based" data-bs-toggle="modal" data-bs-target="#repModal">
        <p>Rep-based?</p>
    </div>
    <div class="container time-based" data-bs-toggle="modal" data-bs-target="#timeModal">
        <p>Time-based?</p>
    </div>
    <div class="container cyop-based" data-bs-toggle="modal" data-bs-target="#infoModal">
        <p>Create your own plan (Coming Soon)</p>
    </div>

    <div class="modal fade" id="repModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="repModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="repModalLabel">Rep-Based Workout</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="repForm">
                        <div class="mb-3">
                            <label for="reps" class="form-label">Reps:</label>
                            <input type="number" class="form-control" id="reps" required min="1">
                        </div>
                        <div class="mb-3">
                            <label for="sets" class="form-label">Sets:</label>
                            <input type="number" class="form-control" id="sets" required min="1">
                        </div>
                        <div class="mb-3">
                            <label for="restTimeRep" class="form-label">Rest Time (Short/Long):</label>
                            <select class="form-select" id="restTimeRep">
                                <option value="30">Short (30 seconds)</option>
                                <option value="60">Long (60 seconds)</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="startRepWorkout">Start Workout</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="timeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="timeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="timeModalLabel">Time-Based Workout</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="timeForm">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration (seconds):</label>
                            <input type="number" class="form-control" id="duration" required min="1">
                        </div>
                        <div class="mb-3">
                            <label for="sets" class="form-label">Sets:</label>
                            <input type="number" class="form-control" id="sets" required min="1">
                        </div>
                        <div class="mb-3">
                            <label for="restTimeTime" class="form-label">Rest Time (Short/Long):</label>
                            <select class="form-select" id="restTimeTime">
                                <option value="30">Short (30 seconds)</option>
                                <option value="60">Long (60 seconds)</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="startTimeWorkout">Start Workout</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="infoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="infoModalLabel">Information</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="infoModalBody">
                    <p>Feature Coming Soon!</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const repModalEl = document.getElementById('repModal');
            const timeModalEl = document.getElementById('timeModal');
            const infoModalEl = document.getElementById('infoModal');
            const infoModalBody = document.getElementById('infoModalBody');
            const repForm = document.getElementById('repForm');
            const timeForm = document.getElementById('timeForm');



            repModalEl.addEventListener('hidden.bs.modal', () => {
                repForm.reset();
            });

            timeModalEl.addEventListener('hidden.bs.modal', () => {
                timeForm.reset();
            });



            document.getElementById('startRepWorkout').addEventListener('click', function() {
                const reps = document.getElementById('reps').value;
                const sets = document.getElementById('sets').value;
                const restTime = document.getElementById('restTimeRep').value;

                if (!reps || !sets) {
                    displayInfoModal("Please fill in all fields.");
                    return;
                }

                // Basic input validation
                if (reps <= 0 || sets <= 0) {
                    displayInfoModal("Please enter valid positive numbers.");
                    return;
                }

                startRepWorkout(reps, sets, restTime);
            });

            document.getElementById('startTimeWorkout').addEventListener('click', function() {
                const duration = document.getElementById('duration').value;
                const sets = document.getElementById('sets').value;
                const restTime = document.getElementById('restTimeTime').value;


                if (!duration || !sets) {
                    displayInfoModal("Please fill in all fields.");
                    return;
                }

                // Basic input validation
                if (duration <= 0 || sets <= 0) {
                    displayInfoModal("Please enter valid positive numbers.");
                    return;
                }

                startTimeWorkout(duration, sets, restTime);
            });

            function startRepWorkout(reps, sets, restTime) {
                let currentSet = 1;
                displayInfoModal(`Starting rep-based workout: ${reps} reps x ${sets} sets, with ${restTime} seconds rest.`);

                const intervalId = setInterval(() => {
                    displayInfoModal(`Set ${currentSet}: Do ${reps} reps.`);
                    if (currentSet < sets) {
                        displayInfoModal(`Rest for ${restTime} seconds.`);
                        currentSet++;
                    } else {
                        clearInterval(intervalId);
                        displayInfoModal("Congratulations! You have completed your rep-based workout.");
                         // Close modal after workout completion
                        const repModal = bootstrap.Modal.getInstance(repModalEl);
                        repModal.hide();
                    }
                }, (parseInt(restTime) + 1) * 1000); // Added 1 second to show alert message.  Parse restTime to integer.
            }

            function startTimeWorkout(duration, sets, restTime) {
                let currentSet = 1;
                displayInfoModal(`Starting time-based workout: ${duration} seconds x ${sets} sets, with ${restTime} seconds rest.`);

                const intervalId = setInterval(() => {
                    displayInfoModal(`Set ${currentSet}: Exercise for ${duration} seconds.`);
                    if (currentSet < sets) {
                        displayInfoModal(`Rest for ${restTime} seconds.`);
                        currentSet++;
                    } else {
                        clearInterval(intervalId);
                        displayInfoModal("Congratulations! You have completed your time-based workout.");
                        // Close modal after workout completion
                        const timeModal = bootstrap.Modal.getInstance(timeModalEl);
                        timeModal.hide();
                    }
                }, (parseInt(duration) + parseInt(restTime) + 1) * 1000); // added 1 second. Parse restTime to integer.
            }



            function cyopFunction() {
                displayInfoModal("Feature coming soon!");
            }

            function displayInfoModal(message) {
                infoModalBody.innerHTML = `<p>${message}</p>`;
                const infoModal = new bootstrap.Modal(infoModalEl);
                infoModal.show();
            }
        });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
