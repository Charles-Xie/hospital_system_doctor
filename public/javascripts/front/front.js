var front = (function() {
    var $container;
    var init = function(container) {
        $container = container;
        dashboard.init(container);
        front.shell.init(container);
        front.modal.init(container);
    };
    return {
        init: init
    };
})();