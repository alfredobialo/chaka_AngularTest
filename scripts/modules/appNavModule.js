(function (ng, window) {
    ng.module("appNavModule", [])
        .config(["$stateProvider", "$urlRouterProvider", ConfigFunc])
        .directive("chakaNavLink", [ChakaNavLink])
    ;

    function ChakaNavLink() {
        return {

            replace: true,
            template: "\n<div>\n    <a ui-sref=\"home\" class=\"btn \" ui-sref-active=\"btn-primary\">Home</a>\n    <a ui-sref=\"news\" class=\"btn \" ui-sref-active=\"btn-primary\">News</a>\n    <a ui-sref=\"about\" class=\"btn\" ui-sref-active=\"btn-primary\">About</a> \n</div>\n",
            scope:{}

        }
    }
    function ConfigFunc($stateProvider, $urlProvider) {

        var homeState = {
                name: "home",
                url: "/",
                views: {
                    "": {
                        template: "\n<div>\n    <h1>Home Page</h1>\n    <div class=\"row\">\n        <div class=\"col-xl-4\">\n            <div class=\"card card-custom bg-gray-100 gutter-b card-stretch\">\n                <div class=\"card-header bg-danger py-5\">\n                    <div class=\"card-title text-white\">List Of Stocks</div>\n                </div>\n                <div class=\"card-body p-0 position-relative overflow-hidden\">\n                    <div class=\"p-6\">\n                       \n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n        <div class=\"col-7  col-lg-9\">\n\n\n        </div>\n\n    </div>\n</div>"
                    }
                }
            },
            aboutState = {
                name: "about",
                url: "/about-me",
                views: {
                    "" : {
                        template:"<my-directive data=\'Alfred Obialo\'></my-directive>\n"
                    }
                }
            },
        newsState = {
            name: "news",
            url: "/news",
            views: {
                "" : {
                    template:"<div class=\'\'>\n    <h1>News Component Goes here</h1>\n</div>"
                }
            }
        }

        ;


        $stateProvider
            .state(homeState)
            .state(aboutState)
            .state(newsState)

        ;
        $urlProvider.otherwise("/home")
    }

})(angular, window);

