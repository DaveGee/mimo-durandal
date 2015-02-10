define(['plugins/dialog'], function (dialog) {

    var ComposedDialog = function (title, target, buttons) {
        this.autoclose = true;

        this.title = title;
        this.target = target;

        this.buttons = buttons;
    };

    ComposedDialog.prototype.action = function(button) {
        dialog.close(this, button.id || button.label);
    };

    ComposedDialog.prototype.close = function () {
        dialog.close(this, null);
    };

    return ComposedDialog;
});
