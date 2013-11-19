define(function(require) {
    'use strict';

    var $ = require('jquery'),
        kb = require('knockback');

    return kb.ViewModel.extend({
        constructor: function(model, options) {
            kb.ViewModel.prototype.constructor.call(this, model, options);

            if (this.templateName && this.template) {
                if (!$('script#' + this.templateName).length) {
                    $(document.body).append('<script type="text/html" id="' + this.templateName + '">' + this.template + '</script>');
                }
            }
        },

        $: function(selector) {
            return this.$el.find(selector);
        },

        render: function() {
            if (this.templateName) {
                this.el = kb.renderTemplate(this.templateName, this);
                this.$el = $(this.el);
            }

            return this;
        }
    });
});
