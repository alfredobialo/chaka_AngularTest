(function (ng, window) {
    ng.module("stockModule", ["stockApiModule"])
        .controller("StockItemDetailController", ["$scope", "StockServicesApi", StockItemDetailController])
        .directive("chakaStockItem", ["StockServicesApi", "$timeout", StockItemFunc])
        .directive("chakaStockItemDetail", [StockItemDetailDirectiveFunc])
        .directive("chakaStockItemList", ["StockServicesApi", StockItemListFunc])
    ;
    function StockItemDetailController(scope, StockServiceApi){

    }
    function StockItemDetailDirectiveFunc(){
        return {
            scope :{},
            template: "",
            replace: true
        }
    }

    function StockItemFunc(StockServiceApi, $timeout) {
        var queue = [];
        function ctl(scope, $state, $stateParams) {

            scope.stock = {};
            scope.loading = false;

            scope.getStockOverview = getStockOverview;

            function getStockOverview(symbol) {
                if (!scope.loading) {
                    $state.go("stock", {symbol: symbol});
                    console.log($stateParams, $state);
                }
            }

            //timer();
            function timer() {
                // batch five Symbol
                $timeout(getStockInfo, 3000);
            }

            getStockInfo();


            function getStockInfo() {
                scope.loading = true;
                queue.push(scope.symbol);
                console.log(queue);
                return;
                StockServiceApi.searchSymbol(scope.symbol)
                    .then(function (response) {
                        scope.loading = false;
                        console.log(response.data);
                        if (ng.isDefined(response.data["Global Quote"])) {
                            scope.stock.pos = response.data["Global Quote"]["02. open"];
                            scope.stock.neg = response.data["Global Quote"]["10. change percent"];

                        }
                        //timer();
                    }, function (failedResponse) {
                        scope.loading = false;
                        console.log(failedResponse, "failed request");
                    })
            }
        }

        return {
            replace: true,
            scope: {
                symbol: "=?"
            },
            template: "<div class=\"stock-item mr-3 mb-3 p-3 d-flex flex-column flex-grow-1 justify-content-between align-items-start\"\n     ng-click=\'getStockOverview(symbol)\'>\n    <div>\n        <h5 class=\'stock-header mb-n1\'>{{symbol}}</h5>\n        <div ng-if=\'loading\' class=\'d-flex flex-column mt-2 pt-2 justify-content-center align-items-center w-100\'>\n            <div  class=\"spinner spinner-success spinner-border-sm\">\n                \n            </div>\n        </div>\n        <span class=\'stock-name\' style=\'font-size: 0.78rem\'>{{stock.companyName}}</span>\n    </div>\n    <div class=\"d-flex flex-column justify-content-end align-items-end pr-3 w-100\">\n        <span class=\"valuation\">{{stock.pos}}</span>\n        <span class=\"valuation-pt\">{{stock.neg}}</span>\n    </div>\n</div>",
            controller: ["$scope", "$state", "$stateParams", ctl]
        }
    }

    function StockItemListFunc(StockServiceApi) {
        function ctl(scope, $state, $stateParams) {
            console.log($state, $stateParams);
            var defaultStockSymbol = ["BNGO", "AAPL", "INTC", "IBM", "GEVO", "FCEL", "SNAP", "AAL", "OCGN", "PLTR", "GE"];
            scope.symbols = ng.isDefined(scope.symbols) ? scope.symbols : defaultStockSymbol;
            scope.title = ng.isDefined(scope.title) ? scope.title : "Today's marketing briefing.";
            scope.subTitle = ng.isDefined(scope.subTitle) ? scope.subTitle : "Market View";
        }

        return {
            scope: {
                title: "@?",
                subTitle: "@?",
                symbols: "=?"
            },
            template: "<div class=\"mb-6 mb-lg-10 bg-white mt-17 px-3\" >\n    <span class=\"lead text-muted text-uppercase\">{{subTitle}}</span>\n    <h1 class=\"mb-5 mb-lg-10 \">{{title}}</h1>\n    <div class=\"d-flex flex-row justify-content-around align-items-center flex-wrap\">\n        <chaka-stock-item symbol=\'s\' ng-repeat=\'s in symbols\'></chaka-stock-item>\n    </div>\n</div>",
            controller: ["$scope", "$state", "$stateParams", ctl]
        }
    }
})(angular, window);
