(function (ng, window) {
    ng.module("chakaApp", ["ui.bootstrap","ui.router","appLayoutModule","appNavModule","stockModule"])
        .directive("myDirective",[MyDirectiveFunction])
        .directive("chakaPageContainer", ["$rootScope", ChakaPageContainer])
    ;

    function ChakaPageContainer($rootScope) {

        function control(scope) {

        }
        return {
            transclude : {
                topNav : "?topNav",
                pageContent :"pageContent"
            },
            replace : true,
            scope : {
                nav : "=?",
                toolbar: "=?"

            },
            controller : ["$scope", control],
            template : "<div class=\"kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor\" id=\"kt_content\">\n    <ng-transclude ng-transclude-slot=\"topNav\" ng-if=\'nav\'>\n    </ng-transclude>\n    <!-- begin:: Content -->\n    <div ng-transclude=\'pageContent\' class=\"kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid\">\n        \n    </div>\n    <!-- end:: Content -->\n</div>"
        }
    }

    function MyDirectiveFunction(){
        return {
            replace:true,
            scope :{
                data : "@?"
            },
            template : "<div>\n    <p class=\'lead\'>Built with Angular 1.5</p>\n    <br>\n   \n    <div class=\"row\">\n        <div class=\"col-xl-4\">\n            <div class=\"card card-custom bg-gray-100 gutter-b card-stretch\">\n                <div class=\"card-header bg-danger py-5\">\n                    <div class=\"card-title text-white\">Built with AngularJs 1.5</div>\n                </div>\n                <div class=\"card-body p-0 position-relative overflow-hidden\">\n                    <div class=\"p-6\">\n                        <div class=\'lead\'>\n                            By <span class=\'font-weight-bold text-danger lead\'>{{data }}</span> \n                            <br>\n                            Email: alfrdcsdinc@gmail.com\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n</div>"
        }
    }

})(angular, window);
