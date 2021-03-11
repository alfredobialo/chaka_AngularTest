(function (ng,window){
    ng.module("appLayoutModule", [])
        .directive("chakaAppLayout", [ChakaAppLayoutDirectiveFunc]);

    function ChakaAppLayoutDirectiveFunc(){
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

})(angular, window);
