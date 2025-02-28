<?php
require_once __DIR__ . "/../vendor/autoload.php";

use App\Controller\AlertController;
use App\Service\AlertService;
use App\Repository\AlertRepository;

// Configure PDO connection (update DSN, username, and password as needed)
\$db = new PDO("mysql:host=localhost;dbname=your_db", "username", "password");

// Dependency Injection
\$alertRepository = new AlertRepository(\$db);
\$alertService = new AlertService(\$alertRepository);
\$alertController = new AlertController(\$alertService);

// Dispatch the alert sending logic
\$alertController->sendAlert();
