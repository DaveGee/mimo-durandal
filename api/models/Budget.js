/**
* Budget.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      name: {
          type: 'string',
          defaultsTo: 'Sans titre',
          required: true
      },

      starts: {
          type: 'date',
          required: true,
          before: function() {
              return this.ends;
          }
      },

      ends: {
          type: 'date',
          required: true,
          after: function() {
              return this.starts;
          }
      },

      owner: {
          type: 'string',
          required: true
      },

      money: {
          collection: 'moneyunit',
          via: 'budget'
      }
  }
};

