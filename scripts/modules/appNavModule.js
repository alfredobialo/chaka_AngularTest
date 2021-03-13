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
                        template: "<div class=\'mb-6 mb-lg-10 bg-white mt-17\'>\n    <chaka-stock-item-list\n            symbols=\'[\"BNGO\", \"AAPL\", \"INTC\", \"IBM\", \"GEVO\", \"FCEL\",\"SNAP\",\"AAL\",\"OCGN\",\"PLTR\",\"GE\"]\'></chaka-stock-item-list>\n\n</div>\n"
                    }
                }
            },
            stockState = {
                name: "stock",
                url: "/stock?symbol",
                views: {
                    "": {
                        template: "<h1>State params</h1>\n"
                    }
                }
            },
            aboutState = {
                name: "about",
                url: "/about-me",
                views: {
                    "" : {
                        template:"\n<div class=\'\'>\n    <my-directive data=\'Alfred Obialo\'></my-directive>\n</div>\n"
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
            .state(stockState)

        ;
        $urlProvider.otherwise("/home")
    }

})(angular, window);

