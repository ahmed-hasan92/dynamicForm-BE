const express = require('express');
const passport = require('passport');
const { createForm } = require('./dynamicForm.controllers');

const router = express.Router();

router.post(
  '/form',
  passport.authenticate('jwt', { session: false }),
  createForm,
);

module.exports = router;
