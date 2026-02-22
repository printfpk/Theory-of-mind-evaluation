const express = require('express');
const router = express.Router();
const { evaluateScenario, getEvaluations } = require('../controllers/evaluationController');

router.post('/', evaluateScenario);
router.get('/', getEvaluations);

module.exports = router;
