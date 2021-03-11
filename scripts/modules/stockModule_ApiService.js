(function (ng, window) {
    ng.module("stockApiModule", [])
        .factory("StockServicesApi", ["$http", StockServiceApi])
    ;

    // Stock Api: base url and api Token are made available sin
    function StockServiceApi($http) {
        var baseUrl  = "https://www.alphavantage.co/query&function?=", token ="&apikey=R0VELXWZN90OIL1P";

        function searchStock(symbol){
            var url  = baseUrl+"SYMBOL_SEARCH&keywords="+symbol+token;
            return $http.get(url);
        }
        function getStockDetail(symbol){
            var url  = baseUrl+"OVERVIEW&symbol="+symbol+token;
            return $http.get(url);
        }
        return {
            searchSymbol : searchStock,
            getStockDetail : getStockDetail,

        }

    }

})(angular, window);
