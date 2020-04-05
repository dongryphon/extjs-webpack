import Main from './view/Main.js';

/*
 * This call registers your application to be launched when the browser is ready.
 */
Ext.application({
    name: 'App',

    requires: [
        'Ext.MessageBox'
    ],

    launch: function () {
        Ext.Viewport.add(new Main());
    }
});
