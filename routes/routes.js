const express = require('express');

const handler = require('../handler/handler.js');

const userRoutes = () => {
  const router = express.Router();

  router.get('/wow', handler.wow);
  router.post('/', handler.postUser);
  router.get('/', handler.getUsers);
  router.get('/:userId', handler.getById);
  router.post('/attempt', handler.postAttempt);
  router.put('/:userId', handler.updateUser);
  router.delete('/:userId', handler.deleteUser);
  router.post('/login', handler.loginUser);
  router.post('/money', handler.updateMoney);
  router.get('/uName/:username', handler.getByUname);
  router.post('/signin/:username', handler.signIn);
  router.get('/attempt/:username', handler.getAttempt);
  router.get('/all/attempt', handler.getAllAttempt);

  return router;
};

module.exports = {userRoutes};