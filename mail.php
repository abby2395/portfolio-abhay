<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $gender = $_POST["gender"];
    $message = $_POST["message"];

    $errorEmpty = false;
    $errorEmail = false;
    $response = "";

    // Check for empty fields
    if (empty($name) || empty($email) || empty($gender) || empty($message)) {
        $response = "Fill in all fields!";
        $errorEmpty = true;
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = "Enter a valid email address!";
        $errorEmail = true;
    } else {
        // All fields are valid, proceed with sending the email
        $to = "abhaysrivastava518@gmal.com"; // Replace with your email address
        $subject = "New Contact Form Submission";
        $email_body = "Name: $name\nEmail: $email\nGender: $gender\nMessage:\n$message";

        // Attempt to send the email
        if (mail($to, $subject, $email_body)) {
            $response = "Message sent successfully!";
        } else {
            $response = "Oops! Something went wrong. Please try again later.";
        }
    }

    // Prepare the JSON response
    $responseData = array(
        'success' => !$errorEmpty && !$errorEmail,
        'message' => $response
    );

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($responseData);
} else {
    echo "Method not allowed!";
}
?>
