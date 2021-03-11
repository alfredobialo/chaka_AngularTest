(function (ng, window) {
    ng.module("chakaApp", [ "ui.router", "appNavModule","stockModule"])
        .directive("myDirective", [MyDirectiveFunction])
        .run(["$state",RunApp])
      ;

    function MyDirectiveFunction() {
        return {
            replace: true,
            scope: {
                data: "@?"
            },
            template: "\n    <div class=\"row\">\n        <div class=\"col-xl-4\">\n            <div class=\"card card-custom bg-gray-100 gutter-b card-stretch shadow-sm\">\n                <div class=\"card-header bg-danger py-5\">\n                    <div class=\"card-title text-white\">Built with AngularJs 1.5</div>\n                </div>\n                <div class=\"card-body p-0 position-relative overflow-hidden\">\n                    <div class=\"p-6\">\n                        <div class=\'lead\'>\n                            By <span class=\'font-weight-bold text-danger lead\'>{{data }}</span> \n                            <br>\n                            Email: alfrdcsdinc@gmail.com\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n"
        }
    }

    function RunApp($state){
        $state.go("home");
    }

})(angular, window);
