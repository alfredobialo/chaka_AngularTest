(function (ng, window) {
    ng.module("stockApiModule", [])
        .factory("StockServicesApi", ["$http","$q","StockCacheService","StockOverviewCacheService", StockServiceApi])
        .factory("StockCacheService", ["$cacheFactory", StockCacheService])
        .factory("StockOverviewCacheService", ["$cacheFactory", StockOverviewCacheService])
    ;

    function StockCacheService($cacheFactory){
        return $cacheFactory("stockApiCache");
    }
    function StockOverviewCacheService($cacheFactory){
        return $cacheFactory("stockOverviewApiCache");
    }
    // Stock Api: base url and api Token are made visible since we don't have a keyvault

    function StockServiceApi($http,$q,StockCacheService,StockOverviewCacheService) {
        var baseUrl  = "https://www.alphavantage.co/query?function=", token ="&apikey=R0VELXWZN90OIL1P";

        function getStockQuote(symbol){
            //Check if we already have the item in cache by the symbol
            var item = StockCacheService.get(symbol);
            if(!_.isEmpty(item)){
                // return the cached data
               return $q.resolve({ data : item} );
            }
            var url  = baseUrl+"GLOBAL_QUOTE&symbol="+symbol+token;
            var request = $http.get(url);
            request.then(function (response){
                if(ng.isDefined(response.data["Global Quote"])){
                    StockCacheService.put(symbol, response.data);
                }
            })
            return request;
        }
        function getStockDetail(symbol){
            var item = StockOverviewCacheService.get(symbol);
            if(!_.isEmpty(item)){
                // return the cached data
                return $q.resolve({ data : item} );
            }

            var url  = baseUrl+"OVERVIEW&symbol="+symbol+token;
            var request  = $http.get(url);
                request.then(function (response){
                    console.log(response,"OVERVIEW from API");
                    if(!_.isEmpty(response.data["Symbol"])){
                        StockOverviewCacheService.put(symbol, response.data);
                    }
                    else{
                        console.log("Lodash isEmpty check failed", response.data);
                    }
                });
            return request;
        }
        return {
            searchSymbol : getStockQuote,
            getStockDetail : getStockDetail,

        }

    }

})(angular, window);
