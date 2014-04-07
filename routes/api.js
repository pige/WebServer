
module.exports = {
    register: function(req, res){
        console.log(req);
        res.json({
            'success': true,
            'accountId': '12345'
        })
    }

};