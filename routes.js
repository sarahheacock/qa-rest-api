'use strict';

var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
  res.json({response: "You sent me a GET request"});
});

router.get("/:qid", function(req, res){
  res.json({
    response: "You sent me a GET request for an ID" + req.params.qid,
  });
});

router.post("/", function(req, res){
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

router.post("/:qid/answers", function(req, res){
  res.json({
    response: "You sent me a POST request to /answers",
    questionID: req.params.qid,
    body: req.body
  });
});

router.put("/:qid/answers/:aid", function(req, res){
  res.json({
    response: "You sent me a PUT request to /answers",
    questionID: req.params.qid,
    answerID: req.params.aid,
    body: req.body
  });
});

router.delete(":/qid/answers/:aid", function(req, res){
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionID: req.params.qid,
    answerID: req.params.aid,
  });
});

router.post("/:qid/answers/:aid/vote-:dir", function(req, res, next){
    if(req.params.dir.search(/^(up|down)$/) === -1){
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    }
    else {
      next();
    }
  }, function(req, res){
    res.json({
      response: "You sent me a POST request to /vote-" + req.params.dir,
      questionID: req.params.qid,
      answerID: req.params.aid,
      vote: req.params.dir
    });
});


module.exports = router;
