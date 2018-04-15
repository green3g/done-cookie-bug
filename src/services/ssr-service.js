const ssr = require('done-ssr-middleware');
const cookieParser = require('cookie-parser');

module.exports = function(app){
    app.use('/', cookieParser(), ssr({
        config: __dirname + '../../../public/package.json!npm',
        liveReload: true
    }));
}; 