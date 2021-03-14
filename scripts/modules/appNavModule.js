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
                        template: "<div class=\'mb-6 mb-lg-10 bg-white mt-17\'>\n    <chaka-stock-item-list\n            symbols=\'[\"BNGO\", \"AAPL\", \"INTC\", \"IBM\", \"GEVO\", \"FCEL\",\"SNAP\",\"AAL\",\"OCGN\",\"PLTR\",\"GE\"]\'></chaka-stock-item-list>\n    <div>\n        <div class=\"sector-highlight \">\n            <div class=\"row\">\n                <div class=\"col-md-8 col-xxl-8 col-12\">\n                    <hr>\n                    <div class=\"mb-8\">\n\n                        <h4 class=\"font-size-h4-md \">Sector Highlights</h4>\n                        <span class=\"text-muted\">Dec 29 2020 09:10:28 pm</span>\n                    </div>\n                    <div class=\"mb-lg-15 mb-9\">\n                        <div class=\"row\">\n                            <div class=\"col-6\">\n                                <div class=\"d-flex justify-content-between flex-column align-content-between\" style=\"\n                                    height:150px;\n                                    background-color: rgba(131,118,118,0.64)\">\n\n                                    <span class=\"text-white font-weight-bolder m-6\">Health Care</span>\n                                    <span class=\"align-self-end text-white font-weight-bolder bg-success p-3 m-6\">+0.46%</span>\n\n                                </div>\n                            </div>\n                            <div class=\"col-6\">\n                                <div class=\"d-flex justify-content-between flex-column align-content-between\" style=\"\n                                    height:150px;\n                                    background-color: rgb(9,65,96)\">\n\n                                    <span class=\"text-white font-weight-bolder m-6\">Industrials</span>\n                                    <span class=\"align-self-end text-white font-weight-bolder bg-danger p-3 m-6\">-0.78%</span>\n\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"mb-10\">\n                        <hr>\n                        <h4 class=\"font-size-h4-md\">Ex-Dividends</h4>\n                        <span>Symbol</span>\n                        <hr>\n                        <p class=\"text-muted\">There are no upcoming dividends</p>\n                    </div>\n\n                </div>\n                <div class=\"col-md-4 col-xxl-4 col-12\">\n                    <div class=\"border-1 border-dark\">\n                        <h4 class=\"font-size-h4-md mb-4 \">My Watchlist</h4>\n                        <span class=\"text-muted\">Your watchlist is empty. build your watchlist <br> by starring the stocks you want to watch</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n"
                    }
                }
            },
            stockState = {
                name: "home.stock",
                url: "stock?{symbol}&{pos}&{neg}&{vol}&{prevClose}",
                views: {
                    "@": {
                        template: "<chaka-stock-item-detail></chaka-stock-item-detail>\n"
                    }
                }
            },
            aboutState = {
                name: "about",
                url: "/about-me",
                views: {
                    "" : {
                        template:"\n<div class=\'mt-10 mt-lg-17 p-5\'>\n    <my-directive data=\'Alfred Obialo\'></my-directive>\n</div>\n"
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
        $urlProvider.otherwise("/")
    }

})(angular, window);

