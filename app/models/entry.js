var Alloy = require("alloy");

// Using https://github.com/viezel/napp.alloy.adapter.restapi to call API for paging entries [assets/alloy/sync/restapi.js]
exports.definition = {
      config: {
        "URL": "http://lvapi.eu01.aws.af.cm",
        "debug": 0,
        "adapter": {
            "type": "restapi",
            "collection_name": "MyCollection",
            "idAttribute": "Id"
      },
      parentNode: function (data) {
        if(data.code === 500) {
          alert('API communication error:: ' +data.message);
        } else {
            var entries = [];

            _.each(data.entries, function(_entry) {
                var entry = {}

                entry.title = _entry.title;
                entry.subtitle = _entry.subtitle;
                entry.image = _entry.image;

                entries.push(entry);
            });

            return entries;
        }
      }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};