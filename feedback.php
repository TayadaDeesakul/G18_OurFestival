<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// รองรับ OPTIONS (มือถือ / iPad ส่ง Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// รับข้อมูล JSON
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// ตรวจข้อมูลที่จำเป็น
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

// ทำความสะอาดข้อมูล
$fullname = trim(strip_tags($data['fullname']));
$email    = trim(strip_tags($data['email']));
$feedback = trim(strip_tags($data['feedback'] ?? ''));
$rating   = trim(strip_tags($data['rating']));
$created  = date("Y-m-d H:i:s");

// ไฟล์เก็บข้อมูล
$dataFile = __DIR__ . "/feedback_data.json";

// ถ้ายังไม่มีไฟล์ → สร้างไฟล์เปล่า
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// โหลดข้อมูลเก่า
$existing = json_decode(file_get_contents($dataFile), true);
if (!is_array($existing)) $existing = [];

// สร้างข้อมูลใหม่
$newEntry = [
    "fullname" => $fullname,
    "email"    => $email,
    "rating"   => $rating,
    "feedback" => $feedback,
    "createdAt"=> $created
];

// เพิ่มข้อมูลเข้า array
$existing[] = $newEntry;

// บันทึกลงไฟล์
file_put_contents(
    $dataFile,
    json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

// ส่งผลลัพธ์กลับไปให้ JS
echo json_encode([
    "status"  => "success",
    "message" => "บันทึกข้อมูลเรียบร้อย",
    "entry"   => $newEntry
], JSON_UNESCAPED_UNICODE);

?>
