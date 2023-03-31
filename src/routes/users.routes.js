const router = require("express").Router();
const { celebrate } = require("celebrate");

const { login, signup } = require("../controllers/users.controller");

const { VALIDATION } = require("../common/validation.common");

router.post(
  "/login",
  celebrate({
    body: {
      email: VALIDATION.USER.EMAIL.required(),
      password: VALIDATION.USER.PASSWORD.required(),
    },
  }),
  login
);

router.post(
  "/register",
  celebrate({
    body: {
      name: VALIDATION.USER.NAME.required(),
      email: VALIDATION.USER.EMAIL.required(),
      password: VALIDATION.USER.PASSWORD.required(),
    },
  }),
  signup
);

module.exports = router;
