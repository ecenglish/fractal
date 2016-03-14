'use strict';

const chalk   = require('chalk');
const _       = require('lodash');
const shell   = require('shelljs');
const console = require('../console');

module.exports = {

    command: 'reboot',

    config: {
        description: 'Reboot Fractal. Use if you have made changes to your fractal.js file',
        scope: ['project'],
        hidden: false
    },

    action: function (args, done) {
       // this.console.notice('Rebooting... [any running servers will need to be restarted individually]');
        this.console.notice('NOT Supported');
        //kexec('fractal', ['--reboot']);
        done();
    }

};
