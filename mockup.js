module.exports = function mockup() {
    var app=require('./server')
        app.route('/book')
            .get(function (req, res) {
                res.send('Get a random book');
            })
    
}