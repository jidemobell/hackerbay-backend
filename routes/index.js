const express = require('express');
const Jimp = require('jimp');
const jsonpatch = require('fast-json-patch');
const { createUser, login } = require('../controllers/users');
const authenticate = require('../middleware/authenticate');

const routes = express.Router();

routes.post('/signup', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  createUser(user)
    .then(() => {
      res.status(200).json({
        message: 'user created',
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

routes.post('/signin', (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  login(credentials)
    .then((token) => {
      res.status(200).json({
        success: true,
        token,
      });
    }).catch((err) => { res.status(400).send(err); });
});

routes.patch('/jsonpatch', authenticate, (req, res) => {
  let doc = req.body.document;
  const patch = req.body.patch;
  doc = jsonpatch.applyPatch(doc, patch).newDocument;
  res.status(200).json({
    message: 'successfully patched',
    doc,
  });
});

/**
 * The thumbnail route gets the public image from
 * the request body query,download then resizes to
 * an images folder
 * sample pubic image url : https://www.google.com/images/srpr/logo3w.png
 */

routes.get('/thumbnail', authenticate, (req, res) => {
  const url = req.query.url;
  Jimp.read(url)
    .then((image) => {
      image.resize(50, 50)
        .write('../images/temp.js');
      res.status(200).send(image);
    }).catch(err => res.status(400).send(err));
});

module.exports = routes;
