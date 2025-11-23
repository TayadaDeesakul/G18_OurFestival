<?php
header("Content-Type: application/json; charset=utf-8");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (
    !$data ||
    !isset($data['fullname']) ||
    !isset($data['email']) ||
    !isset($data['rating'])
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "ข้อมูลไม่ครบ"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$fullname = trim(strip_tags($data['fullname']));
$email    = trim(strip_tags($data['email']));
$feedback = trim(strip_tags($data['feedback'] ?? ''));
$rating   = trim(strip_tags($data['rating']));
$created  = date("Y-m-d H:i:s");

$dataFile = __DIR__ . "/feedback_data.json";

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$existing = json_decode(file_get_contents($dataFile), true);
if (!is_array($existing)) {
    $existing = [];
}

$newEntry = [
    "fullname" => $fullname,
    "email"    => $email,
    "rating"   => $rating,
    "feedback" => $feedback,
    "createdAt"=> $created
];

$existing[] = $newEntry;

file_put_contents($dataFile,
    json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

echo json_encode([
    "status"  => "success",
    "message" => "บันทึกข้อมูลเรียบร้อย",
    "entry"   => $newEntry
], JSON_UNESCAPED_UNICODE);
