const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/categoryModels');
const router = express.Router();
const verifyToken = require('../helper');
const log = require('../logger/log');
const jwt = require('jsonwebtoken');

router.get('/category', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'user', async (err) => {
    const docs = await Category.find();
    try {
      if (err) {
        res.status(403);
      } else {
        log.debug('Denial of access to data');
        res.status(200).json(docs);
      }
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  });
});

router.post('/category', verifyToken, (req, res, next) => {
  const category = new Category({
    content: req.body.content,
    _id: new mongoose.Types.ObjectId(),
  });
  jwt.verify(req.token, 'user', async (err) => {
    const result = category.save();
    try {
      if (err) {
        log.debug('Denial of access to data');
        res.status(403);
      } else {
        res.status(200).send({
          message: 'Handling post request to /category',
          createdCategory: result
        });
      }
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  });
});

router.get('/category/:id', verifyToken, (req, res, next) => {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const doc = await Category.findById(id);
    try {
      if (err) {
        log.debug('No valid entry id');
        res.status(404).json({
          message: 'No valid entry id'
        });
      } else {
        res.status(200).json(doc);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
});

router.put('/category/:id', verifyToken, function (req, res) {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const result = await Category.update({
      _id: id
    }, {
      $set: req.body
    });
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

router.delete('/category/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  jwt.verify(req.token, 'user', async (err) => {
    const result = await Category.remove({
      _id: id
    });
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