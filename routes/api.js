
module.exports = {
    register: function(req, res){
        console.log(req.body);

        // Get our form values. These rely on the "name" attributes
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
            "phone" : phone,
            "password" : password
        }, function (err, doc) {
            if (err) {
                //Return Error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                //Success
                console.log(doc);
                res.json({
                    'success': true,
                    'accountId': '12345'
                });
            }
        });
    }
};