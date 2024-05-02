const {Router} = require("express");
const { signUp, login } = require("../controllers/user.controllers.js");

const router = new Router();

router.route('/sign-up').post(signUp);
router.route('/sign-in').post(login);

module.exports = router;