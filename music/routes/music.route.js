const express = require('express');
const router = express.Router();

// Require the controllers!!
const { music_all, music_create, music_details, test } = require('../controllers/music.controller');
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', test);
//create 
router.post('/create', music_create);
//get all records
router.get('/getAll', music_all);
//get single record
router.get('/:id', music_details);

module.exports = router;