<?php
namespace App\Controller;

use App\Service\AlertService;
use Exception;

class AlertController {
    private \$alertService;

    public function __construct(AlertService \$alertService) {
        \$this->alertService = \$alertService;
    }

    public function sendAlert() {
        try {
            \$input = file_get_contents("php://input");
            \$data = json_decode(\$input, true);
            
            if (!\$data || !isset(\$data["userId"]) || !isset(\$data["message"])) {
                http_response_code(400);
                echo json_encode(["error" => "Invalid input"]);
                return;
            }
            
            \$userId = \$data["userId"];
            \$message = \$data["message"];
            
            \$alertId = \$this->alertService->createAlert(\$userId, \$message);
            
            echo json_encode([
                "status" => "Alert created",
                "alertId" => \$alertId
            ]);
        } catch (Exception \$e) {
            http_response_code(500);
            echo json_encode(["error" => "Server error"]);
        }
    }
}
