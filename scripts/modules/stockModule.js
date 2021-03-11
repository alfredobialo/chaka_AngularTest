(function (ng,window){
    ng.module("stockModule", ["stockApiModule"])
        .directive("stockItem",["StockServicesApi", StockItemFunc])
        .directive("stockItemList",["StockServicesApi", StockItemListFunc])
        ;

    function StockItemFunc(StockServiceApi){
        function ctl(scope, $state, $stateParams){
            console.log($state, $stateParams);
        }
        return {
            scope: {
            },
            template:"<div></div>",
            controller: ["$scope","$state","$stateParams", ctl]
        }
    }
    function StockItemListFunc(StockServiceApi){
        function ctl(scope, $state, $stateParams){
            console.log($state, $stateParams);
            var defaultStockSymbol = ["BNGO","AAPL","INTC","IBM","GEVO","FCEL","SNAP","AAL","OCGN","PLTR","GE"];
        }

        return {
            scope: {
                title:"@?",
                subTitle:"@?",
                stockSymbol:"=?"
            },
            template:"<div></div>",
            controller: ["$scope","$state","$stateParams", ctl]
        }
    }
})(angular, window);
