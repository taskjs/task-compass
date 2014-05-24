'use strict';

var assert = require('assert');
var Compass = require('../lib/compass');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Compass).run(
    [], // inputs
    {
        projectPath: __dirname,
        environment: 'development',
        sassDir: 'style',
        cssDir: 'style'
    }, // options
    console // logger
).then(function(inputs){
    console.log('Done')
}).catch(errorHandler)
