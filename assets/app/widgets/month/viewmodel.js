define(['moment'], function(moment) {
  var monthWidget = function() {

    this.month = 0;
    this.year = moment().year();

  };

  monthWidget.prototype.active = function (settings) {
    this.month = settings.month;
    this.year = settings.year || moment().year;
  };

  return monthWidget;
});
