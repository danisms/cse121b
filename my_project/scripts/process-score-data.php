<?php
// IMPORTANT VARIABLES
$add_score = 'add_score';

// CHECK FOR UPLOAD (ADD) REQUEST AND PERFORM TASK BASED ON REQUEST RECEIVED
if (isset($_POST[$add_score])) {
    // get values
    // create success & error messages
    $upload_success_msg = 'New Score Added Successfully';
    $upload_fail_msg = 'There was an error adding score.<br>Please try again';

    // get values
    $player_name = $_POST['player_name'];
    $difficulty = $_POST['difficulty'];
    $player_score = $_POST['player_score'];
    $computer_score = $_POST['computer_score'];
    $total_round = $_POST['total_round'];
    $timestamp = $_POST['timestamp'];

    echo "I'm here about to upload data!";
}

