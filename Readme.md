# Ext JS webpack App

A simple demonstration of using [webpack](https://webpack.js.org/) to build an
app bundle to go along with the pre-built Ext JS library.

The goal here is to use fully modern build tools, avoiding Sencha Cmd, so that
we get `import`, `export` and sourcemaps.

## Getting Started

Make an `ext` folder that links to your Ext JS download content. In the
checkout directory, run a command like this:

    $ ln -s ../../sdks/ext-6.5.3 ext

On Windows:

    > mklink /D ext ..\..\sdks\ext-6.5.3

Then run `npm run build`:

    $ npm run build

    > app@1.0.0 build ..../extjs-webpack
    > webpack

    Hash: 514ce3b213ceda0e6dbe
    Version: webpack 4.42.1
    Time: 99ms
    Built at: 04/05/2020 6:17:04 PM
        Asset      Size  Chunks             Chunk Names
    bundle.js  4.98 KiB    main  [emitted]  main
    Entrypoint main = bundle.js
    [./src/app.js] 300 bytes {main} [built]
    [./src/view/Main.js] 245 bytes {main} [built]

That's all. Now load in browser.

## Linking It Up

I've added the theme build to the index file:

    <head>
        ...
        <link href="ext/build/modern/theme-material/resources/theme-material-all.css"
            rel="stylesheet"></link>
    </head>

I added the Ext JS build and theme override just before the webpack `bundle.js`:

    <body>
        <script src="ext/build/ext-modern-all-debug.js"></script>
        <script src="ext/build/modern/theme-material/theme-material-debug.js"></script>
        <script src="dist/bundle.js"></script>
    </body>

For a production build, I'd swap the `*-debug.js` files for the optimized/minified
files.

## Going Forward

First thing to note is that all app files are modules and you `import` them. They can
export their constructors like I did in `Main.js`:

    export default
    Ext.define('App.view.Main, {
        ...
    });

The `Ext.define()` function needs to be used to extend Ext JS classes and it returns
the class constructor. We export it so that other modules can get it in an ES6 way
as I do in `app.js`:

    import Main from './view/Main.js'

The class is still placed on the global scope as `App.view.Main`, but following the
ES6 way will clarify relationships for the bundler.

### Strict Mode

Modules use strict mode, so be aware that `callParent` cannot be called from a
function declared in such places. This is easy to work around as I do in `Main`:

    const Panel = Ext.Panel;
    const superCls = Panel.prototype;

    export default
    Ext.define('App.view.Main', {
        extend: Panel,

        title : 'App',

        constructor(...args) {
            superCls.constructor.call(this, ...args);
        }
    });

Normally, in Ext JS, the `constructor` override would have used `callParent` to
call the `Panel` super class.

## Conclusion

Using Sencha Themer would be great partner here. Just build your theme and link
it in via the index file.

I'd love to hear what folks think of this approach!
