const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Task = require('../models/taskModels');
const verifyToken = require('../helper');
const log = require('../logger/log');
const router = express.Router();

router.get('/tasks', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'user', async (err) => {
    const docs = await Task.find();
    try {
      if (err) {
        log.debug('Denial of access to data');
        res.status(403);
      } else {
        res.status(200).json(docs);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

router.post('/tasks', verifyToken, (req, res, next) => {
  const task = new Task({
    content: req.body.content,
    _id: new mongoose.Types.ObjectId(),
    checked: req.body.checked,
    categoryId: req.body.categoryId,
    description: req.body.description
  });
  jwt.verify(req.token, 'user', async (err) => {
    const result = await task.save();
    try {
      if (err) {
        log.debug('Denial of access to data');
        res.status(403);
      } else {
        res.status(200).send({
          message: 'Handling post request to /tasks',
          createdTask: result
        });
      }
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  });
});

router.get('/tasks/:id', verifyToken, (req, res, next) => {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const doc = Task.findById(id);
    try {
      if (err) {
        log.debug('No valid entry id');
        res.status(404).json({
          message: 'No valid entry id'
        });
      } else {
        console.log(doc);
        res.status(200).json(doc);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

router.put('/tasks/:id', verifyToken, function (req, res) {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const result = Task.update({ _id: id }, { $set: req.body });
    try {
      if (err) {
        log.debug('No valid entry id');
        res.status(403);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

router.delete('/tasks/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const result = Task.remove({ _id: id });
    try {
      if (err) {
        log.debug('No valid entry id');
        res.status(403);
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

module.exports = router;