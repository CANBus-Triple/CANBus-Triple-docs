# A Simple Grunt + Assemble boilerplate
0.7.0

This is a simple boilerplate I cooked up for static site projects. It's nothing too fancy, but it uses [Grunt](http://gruntjs.com/) and [Assemble](http://assemble.io/). 

Assemble is a great tool to build static sites. You could compare it to Jekyll, but it serves a slightly different purpose. Think "non-blog static site". Assemble will crunch your templates and content into HTML and grunt and its bevy of plug-ins will do the rest.

Grunt will: 
- process your SASS, autoprefix and minify your CSS
- lint, concatenate, and minify your JavaScript
- minify your HTML
- create a local server for you to develop
- Live reload!

You'll need [Node](http://nodejs.org/), [Node-Sass](https://npmjs.org/package/node-sass), the [Grunt-cli](http://gruntjs.com/), and the [Live Reload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

After cloning, use your terminal to navigate to the directory, give it an old `npm install` and you'll be off to the races.

Some commands:
- `grunt` will compile your site into the "./dist" directory
- `grunt serve` will throw a server up at http://localhost:8000 and watch for changes
- `grunt html` will package up your site templates and minify
- `grunt clean` will delete all of the HTML files in "./dist"
- `grunt style` will convert your SASS, autoprefix, and minify your CSS 
- `grunt js` will lint, concatenate, and uglify your JS.

Make sure to update the info in the `package.json` file with your site's name, your name, etc. 

Grunt's really flexible, so feel free to change whatever you'd like. This boilerplate reflects my way of working, and by no means is it gospel.