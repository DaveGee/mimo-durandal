
define(function() {
    var iterator = function(arr) {
        this._array = arr || [];

        this._index = 0;
    };

    iterator.prototype.next = function() {
        return this._array[this._index++];
    };

    iterator.prototype.current = function() {
        return this._array[this._index];
    }

    iterator.prototype.reset = function() {

        this._index = 0;
    };

    return iterator;
});