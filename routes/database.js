
module.exports = {
    userlist: function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.json(docs);
        });
    }
};