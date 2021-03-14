(function (ng, window) {
    ng.module("stockModule", ["stockApiModule"])
        .controller("StockItemDetailController", ["$scope", "$state", "$stateParams", "ProgressBarService", "StockServicesApi", StockItemDetailController])
        .directive("chakaStockItem", ["StockServicesApi", "$timeout", StockItemFunc])
        .directive("chakaStockItemDetail", [StockItemDetailDirectiveFunc])
        .directive("chakaStockItemList", ["StockServicesApi", StockItemListFunc])
    ;

    function StockItemDetailController(scope, $state, $stateParams,ProgressBarService, StockServiceApi) {
        scope.param = $stateParams;
        scope.data = {};
        scope.loading = false;

        console.log($stateParams, "State Params")

        function init() {
            getSymbolOverview();
        }

        init();

        function getSymbolOverview() {
           ProgressBarService.show();
            StockServiceApi.getStockDetail(scope.param.symbol)
                .then(function (response) {
                    console.log(response);
                    ProgressBarService.hide();
                    if (ng.isDefined(response.data.Symbol)) {
                        transformData(response.data);
                        scope.hasError = false;
                    } else if (ng.isDefined(response.data.Note)) {
                        scope.hasError = true;
                        scope.errMessage = "Due to Api Request Limitation, your request was aborted"
                    }
                }, function (errResponse) {
                    console.log(errResponse);
                })
        }

        function transformData(data) {
            scope.data = {
                symbol: data.Symbol,
                assetType: data.AssetType,
                name: data.Name,
                description: data.Description,
                address: data.Address,
                exchange: data.Exchange,
                currency: data.Currency,
                country: data.Country,
                sector: data.Sector,
                industry: data.Industry,
                noOfEmployee: _.toNumber(data.FullTimeEmployees),
                outstandingShares: _.toNumber(data.SharesOutstanding),
                sharesFloat: _.toNumber(data.SharesFloat),
                exDividendDate: (data.ExDividendDate),
                weekRange52: data["52WeekLow"] + " - " + data["52WeekHigh"],
                dividendYield: data.DividendYield,
                dividendPerShare: data.DividendPerShare,
                marketCap: _.toNumber(data.MarketCapitalization),
                eps: data.EPS,
                peRatio: data.PERatio,
                beta: data.Beta,
            };
            console.log(scope.data);
        }

    }

    function StockItemDetailDirectiveFunc() {
        return {
            scope: {},
            template: "<div class=\'bg-white px-6 px-lg-10 my-10 my-lg-15\'>\n    <div class=\"\">\n        <h4 class=\"font-weight-bolder  \" style=\'font-size: 1.9rem;\'>{{data.name}} ({{data.symbol}})</h4>\n        <h1 class=\"font-weight-bolder \" style=\'font-size: 4.6rem;\'>{{param.prevClose}}\n            <span class=\"font-size-h6-xxl font-size-h6-sm\">{{param.pos}}</span>\n            <span class=\"font-size-h6-xxl font-size-h6-sm text-danger\">({{param.neg}})</span>\n        </h1>\n        <div class=\'mt-n3\'>\n            <span class=\"font-size-sm text-dark-65\">IEX real time price as of [3:15:01 PM].</span>\n        </div>\n        <div class=\"mt-10\">\n            <div class=\"row\">\n                <div class=\"col-xl-12\">\n                    <div class=\"chart-container d-flex flex-column justify-content-center align-items-center\">\n<p class=\'lead text-muted\'>Chart Goes here</p>\n                        <span>Data Visualization</span>\n                    </div>\n                    <div class=\"chart-container-bar-chart d-flex flex-column justify-content-center align-items-center\">\n                        <span class=\'text-muted\'>Mini Candle stick chart Goes here</span>\n                    </div>\n                    <div class=\"chart-time-series d-flex justify-content-start align-items-center\">\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">1D</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">1M</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">3M</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">6M</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">YTD</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">1Y</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">2Y</a>\n                        <a href=\"\" class=\"py-4 px-4 bg-light\">5Y</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"mt-7\">\n\n            <div class=\"row\">\n                <div class=\"col-6\">\n                    <h3>Profile</h3>\n                    <div \n                         ng-class=\'{\"expand-content\":showMore, \"contract-content\":!showMore}\'\n                         class=\'d-flex flex-column justify-content-between align-items-start mb-2\'>\n                        <p class=\"lead\" ng-bind=\"data.description\"></p>\n                    </div>\n                    <button class=\'btn btn-outline-danger btn-xs\' ng-click=\'showMore = !showMore\'>\n                        <span ng-show=\'!showMore\'>Show More</span>\n                        <span ng-show=\'showMore\'>Show Less</span>\n                    </button>\n                   \n                    <hr>\n                    <div class=\'row\'>\n                        <div class=\"col-md-6 col-12\">\n                            <span class=\"text-uppercase\">Exchange</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.exchange\">---</p>\n                            <span class=\"text-uppercase\">Float</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.sharesFloat\">---</p>\n                            <span class=\"text-uppercase\">Sector</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.sector\">---</p>\n                            <span class=\"text-uppercase\">Address</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.address\">--</p>\n\n                        </div>\n                        <div class=\"col-md-6 col-12\">\n                            <span class=\"text-uppercase\">Number Of Employees</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.noOfEmployee | number\">---</p>\n                            <span class=\"text-uppercase\">Shares Outstanding</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.outstandingShares | number\">--</p>\n                            <span class=\"text-uppercase\">Industry</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.industry\">--</p>\n\n                        </div>  \n                    </div>\n                    \n                </div>\n                <div class=\"col-6\">\n                    <hr>\n                    <div class=\"row\">\n                        <div class=\"col-md-4 col-12\">\n                            <span class=\"text-uppercase\">Volumn</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"param.volume\">--</p>\n                            <span class=\"text-uppercase\" >52 Week Range</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.weekRange52\">--</p>\n                            <span class=\"text-uppercase\">Beta</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.beta\">--</p>\n                            <span class=\"text-uppercase\">Dividend & Yield</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.dividendYield\">--</p>\n\n                        </div>\n                        <div class=\"col-md-4 col-12\"><span class=\"text-uppercase\">Avg Daily Volumn</span>\n                            <p class=\"font-weight-bold mb-7\">00000</p>\n                            <span class=\"text-uppercase\">Market Cap</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.marketCap | number\">--</p>\n                            <span class=\"text-uppercase\">Lastest Quarterly EPS</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.eps\">--</p>\n                            <span class=\"text-uppercase\">Ex-Dividend Date</span>\n                            <p class=\"font-weight-bold mb-7\">--</p>\n                            <span class=\"text-uppercase\">IEX MKT Share</span>\n                            <p class=\"font-weight-bold mb-7\">--</p>\n                        </div>\n                        <div class=\"col-md-4 col-12\"><span class=\"text-uppercase\">volumn</span>\n                            <p class=\"font-weight-bold mb-7\">00000</p>\n                            <span class=\"text-uppercase\">volumn</span>\n                            <p class=\"font-weight-bold mb-7\">00000</p>\n                            <span class=\"text-uppercase\">Lastest EPS Quarter</span>\n                            <p class=\"font-weight-bold mb-7\" >--</p>\n                            <span class=\"text-uppercase\">P/E Ratio</span>\n                            <p class=\"font-weight-bold mb-7\" ng-bind=\"data.peRatio\">--</p>\n                            \n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>",
            replace: true,
            controller: "StockItemDetailController"
        }
    }

    function StockItemFunc(StockServiceApi, $timeout) {
        var queue = [];
        var counter = 0;

        function ctl(scope, $state, $stateParams) {

            scope.stock = {};
            scope.loading = false;
            scope.failed = false;
            scope.gotoToStockOverviewPage = gotoToStockOverviewPage;
            queue.push(scope.symbol);
            console.log(queue);
            function gotoToStockOverviewPage(symbol) {
                if (!scope.loading) {
                    var params = {
                        symbol: symbol,
                        pos: scope.stock.pos,
                        neg: scope.stock.neg,
                        vol: scope.stock.volume,
                        prevClose: scope.stock.prevClose
                    };
                    $state.go("home.stock", params);

                }
            }

            /*
            Due to Alpha Vantage Api Request Limitation for Demo Account, I have to batch some request to the server
            This will be better when abstracted to a seperate service
            *
            * */
           // timer();

            function timer() {
                // batch five Symbol
                if (counter >= queue.length) {
                    queue =[];
                    counter = 0;
                    return;
                }
                window.setTimeout(
                    function () {
                        console.log("Counter Is= " , counter);
                        getStockInfo(queue[counter])
                    }, 3000);
            }

            getStockInfo()
            function getStockInfo() {
                var symbol = scope.symbol;
                scope.loading = true;
                console.log(symbol, counter,"counter");
                //return;
                StockServiceApi.searchSymbol(symbol)
                    .then(function (response) {
                        scope.loading = false;
                       // console.log(response.data);
                        if (ng.isDefined(response.data["Global Quote"])) {
                            scope.stock.pos = response.data["Global Quote"]["02. open"];
                            scope.stock.neg = response.data["Global Quote"]["10. change percent"];
                            scope.stock.prevClose = response.data["Global Quote"]["08. previous close"];
                            scope.stock.volume = response.data["Global Quote"]["06. volume"];
                            scope.failed = false;
                        } else {
                            scope.failed = true;
                        }
                      /*  counter += 1;
                        timer();*/
                    }, function (failedResponse) {
                        scope.loading = false;
                        scope.failed = true;
                        console.log(failedResponse, "failed request");
                    })
            }
        }

        return {
            replace: true,
            scope: {
                symbol: "=?"
            },
            template: "<div class=\"stock-item mr-3 mb-3 p-3 d-flex flex-column flex-grow-1 justify-content-between align-items-start\"\n     ng-click=\'gotoToStockOverviewPage(symbol)\' ng-class=\'{\"border-2 border-danger\": failed}\'>\n    <div>\n        <h5 class=\'stock-header mb-n1\'>{{symbol}}</h5>\n        <div ng-if=\'loading\' class=\'d-flex flex-column mt-2 pt-2 justify-content-center align-items-center w-100\'>\n            <div  class=\"spinner spinner-success spinner-border-sm\">\n                \n            </div>\n        </div>\n        <span class=\'stock-name\' style=\'font-size: 0.78rem\'>{{stock.companyName}}</span>\n    </div>\n    <div class=\"d-flex flex-column justify-content-end align-items-end pr-3 w-100\">\n        <span class=\'text-danger\' ng-if=\'failed\'>Request failed!</span>\n        <span class=\"valuation\">{{stock.pos}}</span>\n        <span class=\"valuation-pt\">{{stock.neg}}</span>\n    </div>\n</div>",
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
            template: "<div class=\"mb-6 mb-lg-10 bg-white mt-17 px-3\" >\n    <span class=\"lead text-muted text-uppercase\">{{subTitle}}</span>\n    <h1 class=\"mb-5 mb-lg-10 \">{{title}}</h1>\n    <div class=\"d-flex flex-row justify-content-around align-items-center flex-md-wrap\">\n        <chaka-stock-item symbol=\'s\' ng-repeat=\'s in symbols\'></chaka-stock-item>\n    </div>\n</div>",
            controller: ["$scope", "$state", "$stateParams", ctl]
        }
    }
})(angular, window);
