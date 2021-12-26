var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/download', async function(req, res, next) {
  const fs = require('fs');
  const fileName = `public/videos/yt_${new Date().getTime()}.mp4`;

  const ytdl = require('ytdl-core');
  let stream = ytdl(req.query.target)
    .pipe(fs.createWriteStream(fileName));
  stream.on('finish', function() {
    res.download(fileName, 'download.mp4', function () {
      fs.unlinkSync(fileName);
    });
  });
});

module.exports = router;
