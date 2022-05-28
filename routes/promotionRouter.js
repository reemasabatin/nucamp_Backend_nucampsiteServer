//TASK 3
const express = require("express");
// add itong nasa baba
const Promotion = require("../models/promotion");

const promotionsRouter = express.Router();

promotionsRouter
  .route("/")
  //delete .all
  //change .get to this
  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  //delete .post and change to this
  .post((req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log("Promotion Created", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })

  //change .delete
  .delete((req, res, next) => {
    Promotion.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

promotionsRouter
  .route("/:promotionId")
  //delete .all
  //change .get to this

  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  //delete put and change
  .put((req, res, next) => {
    Promotion.findById(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })

  //delete .delete change to this
  .delete((req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = promotionsRouter;
