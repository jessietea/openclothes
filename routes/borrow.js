var models = require('../models');

exports.view = function(req, res){
	var username = req.session.username;
	if (username != undefined) {
		var itemID = req.query.itemID;
		models.Item.findById(itemID, function(err, item) {
			res.render('borrow', item);
		});
	} else {
		res.render('accessdenied');
	}
};

// find the item that goes along with the id
// render page


exports.ask = function(req, res) {
	var username = req.session.username;
	var date = req.body.date;
	var itemID = req.body.itemID;
	models.Item.findById(itemID, function(err, item) {
		var borrowreq = new models.Notification({
			"recipient": item.ownedby,
			"sender": username,
			"borrow": true,
			"date": date,
			"itemID": item._id,
			"friend": false,
		});
		borrowreq.save(function(err) {
			res.render('requestsent');
		});
	});
	
}
