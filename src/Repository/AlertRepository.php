<?php
namespace App\Repository;

use PDO;
use Exception;

class AlertRepository {
    private \$db; // Instance of PDO

    public function __construct(PDO \$db) {
        \$this->db = \$db;
    }

    public function saveAlert(\$userId, \$message) {
        \$stmt = \$this->db->prepare("INSERT INTO alerts (user_id, message, created_at) VALUES (:user_id, :message, NOW())");
        
        if (\$stmt->execute([
            "user_id" => \$userId,
            "message" => \$message
        ])) {
            return \$this->db->lastInsertId();
        } else {
            throw new Exception("Failed to insert alert");
        }
    }
}
