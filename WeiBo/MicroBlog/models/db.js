/**
 * Created by Jx on 2017-06-24.
 */
var settings = require('../settings'),
    server = new require('mongodb').Server(settings.host, settings.port, {auto_reconnect:true}),
    Db = new require('mongodb').Db(settings.db, server, {safe:true});

module.exports = Db;