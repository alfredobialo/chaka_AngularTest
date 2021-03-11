(function (ng, window) {
    ng.module("appNavModule", [])
        .config(["$stateProvider", "$urlRouterProvider", ConfigFunc])
    ;

    function ConfigFunc($stateProvider, $urlProvider) {

        var homeState = {
                name: "home",
                url: "/",
                views: {
                    "": {
                        template: "\n<div>\n    <h1>Home Page</h1>\n    <div class=\"row\">\n        <div class=\"col-xl-4\">\n            <div class=\"card card-custom bg-gray-100 gutter-b card-stretch\">\n                <div class=\"card-header bg-danger py-5\">\n                    <div class=\"card-title text-white\">Built with AngularJs</div>\n                </div>\n                <div class=\"card-body p-0 position-relative overflow-hidden\">\n                    <div class=\"p-6\">\n                        <my-directive data=\"Alfred Obialo\"></my-directive>\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n        <div class=\"col-7  col-lg-9\">\n\n\n        </div>\n\n    </div>\n</div>"
                    }
                }
            },
            aboutState = {
                name: "about",
                url: "/about-me",
                views: {
                    "" : {
                        template:"<div class=\'row\'>\n    <div class=\'col-xl-4\'>\n        \n    </div>\n</div>"
                    }
                }
            }

        ;


        $stateProvider
            .state(homeState)
            .state(aboutState)

        ;
        $urlProvider.otherwise("/home")
    }

})(angular, window);

