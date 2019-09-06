var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.redirect("burgers")
});

router.get("/burgers", function (req, res) {
    burgers.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
});

router.post("/burgers/create", function (req, res) {
    burgers.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {

            res.redirect("/burgers");
        });
});

router.put("/burgers/eat/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burgers.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
