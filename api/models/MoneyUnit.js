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

        guessedAmount: {
            type: 'float',
            required: true
        },

        realAmount: {type: 'float'},

        isMonthly: {
            type: 'boolean',
            defaultsTo: false
        },

        type: {
            type: 'string',
            enum: ['debit', 'credit'],
            defaultsTo: 'debit',
            required: true
        },

        description: {type: 'string'},

        budget: {
            model: 'budget'
        }

    }
};
