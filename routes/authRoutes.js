const { Router } = require('express');
const controllers = require('../controllers/authController');
const router = Router();

router.get('/signup',controllers.signup_get);
router.post('/signup',controllers.signup_post);
router.get('/login',controllers.login_get);
router.post('/login',controllers.login_post);
router.get('/logout',controllers.logout_get);

module.exports = router;