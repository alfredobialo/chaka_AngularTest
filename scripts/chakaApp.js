(function (ng, window) {
    ng.module("chakaApp", [ "ui.router", "appNavModule","stockModule"])
        .directive("myDirective", [MyDirectiveFunction])
        .directive("progressBar", [ProgressBar])
        .factory("ProgressBarService", ["$rootScope",ProgressBarService])
        .run(["$state","$rootScope",RunApp])
      ;

    function MyDirectiveFunction() {
        return {
            replace: true,
            scope: {
                data: "@?"
            },
            template: "\n    <div class=\"row\">\n        <div class=\"col-xl-4\">\n            <div class=\"card card-custom bg-light gutter-b card-stretch \">\n                <div class=\"card-header bg-danger py-5\">\n                    <div class=\"card-title text-white\">Built with AngularJs 1.5</div>\n                </div>\n                <div class=\"card-body bg-white p-0 position-relative overflow-hidden\">\n                    <div class=\"p-6\">\n                        <div class=\'lead\'>\n                            By <span class=\'font-weight-bold text-danger lead\'>{{data }}</span> \n                            <br>\n                            Email: alfrdcsdinc@gmail.com\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n"
        }
    }
    function ProgressBarService($rootScope){

        return {
            show: function(){
                $rootScope.processing = true;
            },
            hide: function(){
                $rootScope.processing = false;
            }
        }
    }
    function ProgressBar() {
        return  {
            replace:true,
            restrict:"E",
            template  : "<div ng-if=\'processing\' class=\"progressbar-header-container\">\n    <div class=\"asom-progress\">\n        <div class=\"indeterminate\"></div>\n    </div>\n</div>"
        }

    }

    function RunApp($state, $rootScope){
        //$state.go("home");
        $rootScope.processing = false;
    }

})(angular, window);
