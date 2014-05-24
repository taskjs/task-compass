var Execution = require('execution');

function convertOptions(options, excludes) {
    var args = [];

    Object.keys(options).forEach(function (key) {
        var flag;
        var val = options[key];

        if (Array.isArray(excludes) && excludes.indexOf(key) !== -1) {
            return;
        }

        flag = key.replace(/[A-Z]/g, '-$&').toLowerCase();

        if (val === true) {
            args.push('--' + flag);
        }

        if (typeof val === 'string') {
            args.push('--' + flag, val);
        }

        if (typeof val === 'number' && isNaN(val) === false) {
            args.push('--' + flag, '' + val);
        }

        if (Array.isArray(val)) {
            val.forEach(function (arrVal) {
                args.push('--' + flag, arrVal);
            });
        }
    });

    return args;
};

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        projectPath: {
            label: 'Base Path',
            type: 'dir',
            placeholder: 'The root of the project.'
        },
        environment: {
            label: 'Environment Mode',
            type: 'select',
            default: 'production',
            options: ['production', 'development']
        },
        sassDir: {
            label: 'Sass Dir',
            type: 'string',
            default: 'sass',
            placeholder: 'The directory where the sass stylesheets are kept.'
        },
        cssDir: {
            label: 'CSS Dir',
            type: 'string',
            default: 'css',
            placeholder: 'The directory where the css stylesheets are kept.'
        },
        imagesDir: {
            label: 'Images Dir',
            type: 'string',
            default: 'images',
            placeholder: 'The directory where the images are kept.'
        }
    },
    run: function (inputs, options, logger, settings) {
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var spawn = require('child_process').spawn;
        var command = process.platform == 'win32'? 'compass.bat': 'compass';

        var args = ['compile'];
        if (options.clean) {
            args = ['clean'];
        } else if (options.watch) {
            args = ['watch'];
        }

        if (options.projectPath) {
            args.push(options.projectPath);
        }

        // Add converted options
        [].push.apply(args, convertOptions(options, [
            'clean',
            'projectPath',
            'watch'
        ]));

        var child = spawn(command, args);

        child.on('close', function (code) {
            if (code === 127) {
                logger.error('You need to have Ruby and Compass installed and in your system PATH for this task to work.');
            }

            resolve(inputs);
        });

        if (child) {
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }
    }
})
