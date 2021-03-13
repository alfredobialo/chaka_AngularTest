(function (ng, window) {
    ng.module("stockApiModule", [])
        .factory("StockServicesApi", ["$http", StockServiceApi])
    ;

    // Stock Api: base url and api Token are made visible since we don't have a keyvault

    function StockServiceApi($http) {
        var baseUrl  = "https://www.alphavantage.co/query?function=", token ="&apikey=R0VELXWZN90OIL1P";

        function getStockQuote(symbol){
            var url  = baseUrl+"GLOBAL_QUOTE&symbol="+symbol+token;
            console.log(url);
            return $http.get(url);
        }
        function getStockDetail(symbol){
            var url  = baseUrl+"OVERVIEW&symbol="+symbol+token;
            return $http.get(url);
        }
        return {
            searchSymbol : getStockQuote,
            getStockDetail : getStockDetail,

        }

    }

})(angular, window);
