<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, X-Auth-Token");// Add this line
header("Content-Type: application/json");

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     // Just return an OK response for preflight requests
//     header("HTTP/1.1 200 OK");
//     exit(0);
// }


// Database configuration
$host = 'localhost';
$db_name = 'voting_system';
$username = 'root';
$password = 'root';

// Create a connection
$conn = new mysqli($host, $username, $password, $db_name);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Capture JSON input from the frontend
$data = json_decode(file_get_contents("php://input"), true);

// Ensure all required fields are provided
if (isset($data['name']) && isset($data['dob']) && isset($data['email']) && isset($data['username']) && isset($data['password'])) {
    $name = $conn->real_escape_string($data['name']);
    $dob = $conn->real_escape_string($data['dob']);
    $email = $conn->real_escape_string($data['email']);
    $username = $conn->real_escape_string($data['username']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash password for security

    // Step 1: Check if the person exists in the Person table with the provided details
    $sql = "SELECT person_id FROM Person WHERE name = '$name' AND dob = '$dob' AND email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Step 2: Fetch the person_id from the Person table
        $row = $result->fetch_assoc();
        $person_id = $row['person_id'];

        // Step 3: Insert the data into the Voter table
        $voter_sql = "INSERT INTO Voter (person_id, username, password) VALUES ('$person_id', '$username', '$password')";
        if ($conn->query($voter_sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "User registered successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error inserting into Voter table: " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No matching person found in the database"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}

$conn->close();
?>

