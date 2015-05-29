define(function(require, exports, module) {
    main.consumes = ['Plugin', 'ui', 'layout', 'api'];
    main.provides = ['ethergit.guests.count'];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var ui = imports.ui;
        var layout = imports.layout;
        var api = imports.api;
        
        var plugin = new Plugin('Ethergit', main.consumes);
        var emit = plugin.getEmitter();

        var label;
        
        function load() {
            label = ui.insertByIndex(
                layout.getElement('barExtras'),
                new ui.label({
                    id: 'guestCount',
                    caption: '0',
                    class: 'guest-count',
                    tooltip: 'Guests number'
                }),
                601, plugin
            );
            ui.insertCss(require('text!./style.css'), false, plugin);
            update();
            setInterval(update, 10000);
        }

        function update() {
            api.collab.get('guest-count', function(err, data) {
                if (err) return console.error(err);
                label.setAttribute('caption', data.count);
            });
        }
        
        plugin.on('load', function() {
            load();
        });
        plugin.on('unload', function() {
        
        });
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            'ethergit.guests.count': plugin
        });
    }
});
