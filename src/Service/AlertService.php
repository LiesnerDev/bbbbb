<?php
namespace App\Service;

use App\Repository\AlertRepository;
use Exception;

class AlertService {
    private \$alertRepository;

    public function __construct(AlertRepository \$alertRepository) {
        \$this->alertRepository = \$alertRepository;
    }

    public function createAlert(\$userId, \$message) {
        if (empty(\$userId) || empty(\$message)) {
            throw new Exception("Invalid parameters for alert");
        }
        
        \$alertId = \$this->alertRepository->saveAlert(\$userId, \$message);
        return \$alertId;
    }
}
