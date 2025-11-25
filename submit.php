<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// รองรับมือถือ / iPad (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data || !isset($data['fullname'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบ"], JSON_UNESCAPED_UNICODE);
    exit;
}

$fullname = trim(strip_tags($data['fullname']));
$email = trim(strip_tags($data['email'] ?? ''));
$type = trim(strip_tags($data['type'] ?? 'registration'));

$newEntry = [
    "fullname" => $fullname,
    "email" => $email,
    "type" => $type,
    "created_at" => date("Y-m-d H:i:s")
];

// กรณี feedback
if ($type === 'feedback') {
    $newEntry['satisfaction'] = trim(strip_tags($data['satisfaction'] ?? ''));
    $newEntry['message']      = trim(strip_tags($data['message'] ?? ''));

// กรณี registration
} else {
    $newEntry['phone']   = trim(strip_tags($data['phone'] ?? ''));
    $newEntry['age']     = trim(strip_tags($data['age'] ?? ''));
    $newEntry['gender']  = trim(strip_tags($data['gender'] ?? ''));
    $newEntry['dateAtd'] = trim(strip_tags($data['dateAtd'] ?? ''));
}

// ที่เก็บข้อมูล
$dataFile = __DIR__ . "/data.json";

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$old = json_decode(file_get_contents($dataFile), true);
if (!is_array($old)) $old = [];

$old[] = $newEntry;

// เขียนลงไฟล์
file_put_contents(
    $dataFile,
    json_encode($old, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

// ตอบกลับ
echo json_encode([
    "status" => "success",
    "message" => "บันทึกข้อมูลสำเร็จ",
    "entry" => $newEntry
], JSON_UNESCAPED_UNICODE);
