// TASK 3
const express = require("express");
const partnerRouter = express.Router();

// #1 Updates: For both the partnerRouter and promotionRouter, update the response to each defined endpoint using the new Partner and Promotion Models, exactly as you did with the campsiteRouter in the final two exercises this week.

const Partner = require("../models/partner");

partnerRouter
  .route("/")
  //delete .all and .get and then change the .get to this
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })

  //add itong .post
  .post((req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        console.log("Partner Created", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })

  //stay lang ang .put
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })

  //delete yung delete then change to this
  .delete((req, res, next) => {
    Partner.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")

  // delete. all and add this .get
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })

  // change post and put to this
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partner/${req.params.partnerId}`);
  })
  .put((req, res, next) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((partner) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })

  //change delete
  .delete((req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = partnerRouter;
