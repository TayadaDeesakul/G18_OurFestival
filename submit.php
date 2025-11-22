<?php
header("Content-Type: application/json; charset=utf-8");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data || !isset($data['fullname'])) {
    http_response_code(400);
    echo json_encode(["status"=>"error","message"=>"ข้อมูลไม่ครบ"]);
    exit;
}

$fullname = trim(strip_tags($data['fullname']));
$email = trim(strip_tags($data['email'] ?? ''));
$phone = trim(strip_tags($data['phone'] ?? ''));
$age = trim(strip_tags($data['age'] ?? ''));
$gender = trim(strip_tags($data['gender'] ?? ''));
$dateAtd = trim(strip_tags($data['dateAtd'] ?? ''));

$dataFile = __DIR__ . "/data.json";

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
}

$old = json_decode(file_get_contents($dataFile), true);
if (!is_array($old)) $old = [];

$newEntry = [
    "fullname"=>$fullname,
    "email"=>$email,
    "phone"=>$phone,
    "age"=>$age,
    "gender"=>$gender,
    "dateAtd"=>$dateAtd,
    "created_at"=>date("Y-m-d H:i:s")
];
$old[] = $newEntry;

file_put_contents($dataFile, json_encode($old, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE), LOCK_EX);

echo json_encode(["status"=>"success","message"=>"ลงทะเบียนสำเร็จ","entry"=>$newEntry], JSON_UNESCAPED_UNICODE);
