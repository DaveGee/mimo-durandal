/**
 * MoneyUnit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var moment = require('moment');

module.exports = {

    attributes: {

        day: {
            type: 'date',
            required: true,
            defaultsTo: new Date()
        },

        monthId: {
            type: 'integer',
            required: true,
            defaultsTo: 0
        },

        guessedAmount: {
            type: 'float',
            required: true
        },

        realAmount: {type: 'float'},

        isMonthly: {
            type: 'boolean',
            defaultsTo: false
        },

        description: {type: 'string'},

        budget: {
            model: 'budget',
            required: true
        }
    },

    beforeCreate: function(values, cb) {
        setMonth(values);
        cb();
    },

    beforeUpdate: function(values, cb) {
        setMonth(values);
        cb();
    }
};

function setMonth(values) {
    var date = moment(values.day);

    values.monthId = date.month();
}