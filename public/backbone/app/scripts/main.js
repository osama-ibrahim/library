(function(oldAjax) {
    Backbone.ajax = function(options) {
        options.url = 'https://library-js.aws.af.cm/api/v1' + options.url + '';
        options.crossDomain = true;
        oldAjax.apply(this, arguments);
    };
})(Backbone.ajax);

$(function() {
    var router = new Router();
    Backbone.history.start();
});
