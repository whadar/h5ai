// @include "lib/modernizr-*.js"
// @include "lib/jquery-*.js"
// @include "lib/jquery.*.js"
// @include "lib/lodash-*.js"
// @include "lib/marked-*.js"
// @include "lib/modulejs-*.js"
// @include "lib/moment-*.js"
// @include "lib/prism-*.js"

(function () {
'use strict';

    /*global jQuery, marked, Modernizr, moment, Prism, _ */
    modulejs.define('$', function () { return jQuery; });
    modulejs.define('marked', function () { return marked; });
    modulejs.define('modernizr', function () { return Modernizr; });
    modulejs.define('moment', function () { return moment; });
    modulejs.define('prism', function () { return Prism; });
    modulejs.define('_', function () { return _; });

    // @include "inc/**/*.js"

    var $ = jQuery;
    
        //load peer5 with caching
        $.ajax({
            url: '//api.peer5.com/peer5.js?id=z142i5n5qypq4cxr',
            dataType: "script",
            cache:true
        });
        //attach to file items, once the DOM is ready
        $(document).ready(function() {
            $('body').on('click', '.item.file > a', function (e) {
                if (window.peer5) {
                    e.preventDefault();
                    var url = e.currentTarget.href;
                    window.peer5.download(url);
                    return false;
                }
            });
        });

    if ($('html').hasClass('no-browser')) {
        return;
    }

    var module = $('script[data-module]').data('module');
    var data = {action: 'get', setup: true, options: true, types: true, theme: true, langs: true};
    var url;

    if (module === 'main') {
        url = '.';
    } else if (module === 'info') {
        data.updatecmds = true;
        url = 'server/php/index.php';
    } else {
        return;
    }

    $.ajax({
        url: url,
        data: data,
        type: 'POST',
        dataType: 'json'
    }).done(function (config) {

        modulejs.define('config', config);
        $(function () { modulejs.require(module); });
    });
}());
