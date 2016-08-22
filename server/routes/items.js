module.exports = function (app) {
    var GroceryItem = require('./../models/GroceryItem.js');

    app.route('/api/items')
        .get(function (req, res) {
            GroceryItem.find(function (error, items) {
                res.send(items);
            })
        })
        .post(function (req, res) {
            var item = req.body;
            var groceryItem = new GroceryItem(item);
            groceryItem.save(function (error, data) {
                res.status(200).send();
            })
        });

    app.route('/api/items/:id')
        .delete(function (req, res) {
            GroceryItem.findOne({
                _id: req.params.id
            }).remove();
        })
        .patch(function (req, res) {
            GroceryItem.findOne({
                _id: req.params.id
            }, function (error, data) {
                for (var key in req.body) {
                    doc[key] = req.body[key];
                }
                data.save();
                res.status(200).send();
            })
        })
};