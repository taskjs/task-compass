# task-compass
> Compile Sass to CSS using Compass.

[Compass](http://compass-style.org/) is an open-source authoring framework for the [Sass](http://sass-lang.com/) css preprocessor.
It helps you build stylesheets faster with a huge library of Sass mixins and functions, advanced tools for spriting,
and workflow improvements including file based Sass configuration and a simple pattern for building and using Compass extensions.

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Sass](http://sass-lang.com/tutorial.html),
and [Compass](http://compass-style.org/install/) >=0.12.2 installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal.
When you've confirmed you have Ruby installed, run `gem update --system && gem install compass` to install Compass and Sass.

Compass operates on a folder level. Because of this you don't specify an, but instead define the `sassDir` and `cssDir` options.

## The "compass" task

### Usage Examples

```js
var compass = new (require('task-compass'))
compass.run([], {
        projectPath: __dirname,
        environment: 'development',
        sassDir: 'style',
        cssDir: 'style'
    })
```

### Options

[See Compass Configuration Reference](http://compass-style.org/help/tutorials/configuration-reference/)

## Release History
* 2014-05-24 0.1.0 Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
