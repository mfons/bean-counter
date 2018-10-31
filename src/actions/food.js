export const SEARCH_FOR_FOODS_BY_STRING = 'SEARCH_FOR_FOODS_BY_STRING';


const _goGetFoodsBySearch = (searchString, isStandardReference) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let url = new URL("https://api.nal.usda.gov/ndb/search");
    const params = {
        "format": "json", 
        "q": searchString, 
        "sort": "n",
        "max": "500", 
        "offset": "0", 
        "api_key": "JrBeMt1k9YsrhBrqfbt2GmmQJAu7XVgt3ttjAxJt",
        "ds": (isStandardReference ? "Standard Reference" : "")
    };
    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));

    return fetch(url /*,myInit*/).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    });
}


export const searchForFoodsByString = (searchString, isStandardReference) => (dispatch, getState) => {
    // Here you would normally get the data from the server. We're simulating
    // that by dispatching an async action (that you would dispatch when you
    // succesfully got the data back)
    _goGetFoodsBySearch(searchString, isStandardReference)
        .then((data) => {
            console.log("nc-ajax-get-possible-nutrients._tasksLoaded() data was: ", data);
            let searchResults = {};
            if (data.list  && data.list.item) {
                // You could reformat the data in the right format as well:
                searchResults = data.list.item
                    .reduce((obj, foodItem) => {
                        obj[foodItem.ndbno] = foodItem;
                        return obj
                    }, {});
                dispatch({
                    type: SEARCH_FOR_FOODS_BY_STRING,
                    latestFoodList:  data.list.item,
                    latestFoodMap: searchResults,
                    latestQueryBroughtBackNoFoodList: false,
                    latestFoodListQueryString: searchString 
                  });
            }
            else if (typeof data.errors !== "undefined" && data.errors.error[0].status === 400) {
                dispatch({
                    type: SEARCH_FOR_FOODS_BY_STRING,
                    latestFoodList:  [],
                    latestFoodMap: {},
                    latestQueryBroughtBackNoFoodList: true,
                    latestFoodListQueryString: searchString 
                  });
            }
        })
        .catch((error) => {
            console.warn('There has been a problem with your fetch operation: ', error.message);
        });
};



