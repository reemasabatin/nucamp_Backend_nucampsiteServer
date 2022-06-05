//Task 2: Create a favoriteRouter: In the routes folder favoriteRouter.js
const express = require("express"); //Import/Export: Using the require function, import express
const cors = require("./cors"); //Import cors, authenticate, and favorite.
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");

const favoriteRouter = express.Router(); //Create the favoriteRouter using express.Router()

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.find({
      //GET...retrieve the favorite document for that user using Favorite.find(), passing to the find method the object { user: req.user._id } as its only argument.
      user: req.user_.id,
    }) //To the retrieved favorite document, chain two populate() methods to populate the user and campsites refs. To the res object, set an appropriate Content-Type header and a status code of 200. Return the favorite document using the res.json() method with the appropriate argument.
      .populate("user")
      .populate("campsites")
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id }) //POST to /favorite: When the user does a POST operation on '/favorite' by including a message in the format of [{"_id":"campsite ObjectId"},  . . . , {"_id":"campsite ObjectId"}] in the body of the message (see Testing section for example), you will check if the user has an associated favorite document. Use Favorite.findOne({user: req.user._id }) for this.
      .then((favorite) => {
        if (favorite) {
          req.body.forEach((favorite) => {
            if (favorite.campsites.includes(favorite._id)) {
              favorite.campsites.push(favorite._id);
            }
          });
          favorite
            .save()
            .then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        } else {
          Favorite.create({
            user: req.user._id,
            campsites: req.body,
          })
            .then((favorite) => {
              console.log("Favorite Created ", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorite`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //DELETE to /favorite: When the user performs a DELETE operation on '/favorite', use findOneAndDelete to locate the favorite document corresponding to this user and delete it. For the response, set a status code of 200. If a favorite document was found, then set the Content-Type header to "application/json" and return the favorite document with res.json(). If no favorite document was found, then set the Content-Type header to 'text/plain' and use res.end() to send the response 'You do not have any favorite to delete.'
    Favorite.findOne({ user: req.user._id }).then((favorite) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.send("favorite have been deleted.");
    });
  });

favoriteRouter
  .route("/:campsiteId") //Routes: Set up 2 routes using favoriteRouter.route('/') and yung route('/:campsiteID)
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) //Preflight requests to both routes using .options(), cors.corsWithOptions
  .get(cors.cors, authenticate.verifyUser, (req, res) => {
    //chain .get(),.post(),.put() and .delete() methods with the cors.cors function.
    res.statusCode = 403;
    res.end(
      `GET operation not supported on /favorite/${req.params.campsiteId}`
    );
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id }) //POST to /favorite/:campsiteId: When the user performs a POST operation on '/favorite/:campsiteId', use findOne to locate the favorite document for the user. Then you will add the campsite specified in the URL parameter to the favorite.campsites array, if it's not already there. If the campsite is already in the array, then respond with a message saying "That campsite is already in the list of favorite!" If the user has not previously defined any favorite, then you will need to create a new Favorite document for this user and add the campsite to it. Note: As a bonus challenge, you could add error checking to make sure that the campsiteId in the URL parameter corresponds to
      .then((favorite) => {
        if (favorite) {
          if (favorite.campsites.includes(req.params.campsiteId)) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.send("The Campsite already in your favorite.");
          } else {
            favorite.campsites.push(req.params.campsiteId);
            favorite.save().then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            });
          }
        } else {
          Favorite.create({ user: req.user._id, campsites: req.body }).then(
            (favorite) => {
              console.log("Favorite added", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            }
          );
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    //use the authenticate.verifyUser function
    res.statusCode = 403; //or the GET request to '/favorites/:campsiteId' and the PUT request to '/favorites' and '/favorites/:campsiteId', return a response with a status code of 403 and a message that the operation is not supported.
    res.end(
      `PUT operation not supported on /favorite/${req.params.campsiteId}`
    );
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //Give the function arguments of req, res, and next as appropriate.
    Favorite.findByIdAndDelete(req.params.favoriteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response); //DELETE to /favorites: When the user performs a DELETE operation on '/favorites', use findOneAndDelete to locate the favorite document corresponding to this user and delete it. For the response, set a status code of 200. If a favorite document was found, then set the Content-Type header to "application/json" and return the favorite document with res.json(). If no favorite document was found, then set the Content-Type header to 'text/plain' and use res.end() to send the response 'You do not have any favorites to delete.'
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter; // Export favoriteRouter
