// Init function called from onOpen in index.xml
function init() {
    pager = new Pager(); // init pager function which we pass into API call

    fetchResults();  // Fetch initial results
}

// Function to track the page of data we are on
var Pager = function() {
    var page = 1;
    this.next = function() {
        page ++;
        return page;
    };
    this.reset = function() {
        page = 0;
        return page;
    };
    this.page = function() {
      return page;
    };
};

// Function to load more results from the API
function fetchResults() {
    // Backbone fetch for more results from API
    Alloy.Collections.entry.fetch({
        urlparams: {
            "numResults":10,
            "page":pager.page()
        },

        add: true,  // Don't reset the collection, but add to it (in theory to prevent setItems and use appendItems...?)

        silent: true,  // Don't trigger an "add" event for every model, but just one "fetch" (prevent multiple binding events)

        success : function(e) {
          //Ti.API.log(JSON.stringify(e));

          // init setMarker of ListView for lazy loading of more entries
          var markerVal = pager.page() * 10 -1; // always 1 less than length of list
          $.lvEntries.setMarker({sectionIndex:0, itemIndex: markerVal });

          // Move on pager for next API call
          pager.next();

        }, error : function() {
          alert('error');
        }
    });
}

// setMarker EventListener for ListView
$.lvEntries.addEventListener('marker', fetchResults);

$.index.open();
