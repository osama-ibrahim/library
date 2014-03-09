define(function(require) {
    'use strict';

    var _ = require('underscore'),
        ko = require('knockout'),
        Backbone = require('backbone'),
        kb = {};

    kb.ViewModel = function(model) {
        if (model) {
            this.model = ko.observable(model);

            var attrs = model.toJSON();

            _.each(attrs, function(attr, key) {
                this[key] = ko.observable(attr);

                model.on('change:' + key, function(model, value) {
                    this[key](value);
                }, this);

                this[key].subscribe(function(newValue) {
                    model.set(key, newValue);
                });
            }, this);
        }
    };

    kb.ViewModel.extend = Backbone.View.extend;

    kb.collectionObservable = function(collection) {
        var observable = ko.observableArray(collection.map(function(model) {
            return new kb.ViewModel(model);
        }));

        observable.collection = ko.observable(collection);

        collection.on('reset', function(col) {
            observable(col.map(function(model) {
                return new kb.ViewModel(model);
            }));
        }, this);

        collection.on('add', function(model) {
            observable.push(new kb.ViewModel(model));
        }, this);

        return observable;
    };

    kb.renderTemplate = function(template, viewModel) {
        var el = document.createElement('div');
        ko.renderTemplate(template, viewModel, {}, el, 'replaceChildren');
        return el;
    };

    return kb;
});
