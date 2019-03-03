const music = require('../models/music.model');
//Simple version, without validation or sanitation
test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
//create
music_create = function (req, res) {
    let musicName = new music(
        {
            name: req.body.name,
            length: req.body.length,
            artist: req.body.artist,
            genre: req.body.genre,
            path: req.body.path,
        }
    );

    musicName.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('music instance Created successfully')
    })
};

// get list of all records
music_all = function (req, res) {
    music.find().lean().then(chaptersFound => {
        // if (err) return next(err);
        const sendData = {
            success: 1,
            status:200,
            message: "List fetched successfully.",
            data: chaptersFound
        }
        res.send(sendData);
        // res.send(chaptersFound);
    })
};

//read single record
music_details = function (req, res) {
    music.findById(req.params.id, function (err, music) {
        if (err) return next(err);
        const sendData = {
            success: 1,
            status:200,
            message: "List fetched successfully.",
            data: music
        }
        res.send(sendData);
    })
};

module.exports = {
    test, music_create, music_details, music_all
};