import DS from 'ember-data';

export default DS.RESTSerializer.extend({ 
 serialize: function(record, options) {
    var data = this._super(record, options);
    data.meta = record.get('meta');
    return data;
  },
 normalizeHash: {
    posts: function(hash) {
     hash.id = hash._id;
     return hash;
    }
 }
});
