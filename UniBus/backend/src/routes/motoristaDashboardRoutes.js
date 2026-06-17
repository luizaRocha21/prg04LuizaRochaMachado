const express = require('express');

const router = express.Router();


const controller =
require('../controllers/motoristaDashboardController');



router.get(
'/:id/dashboard',
controller.dashboardMotorista
);



module.exports = router;