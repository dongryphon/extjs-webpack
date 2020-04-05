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
