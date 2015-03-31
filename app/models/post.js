import DS from 'ember-data';
 
var Post = DS.Model.extend({
    author: DS.belongsTo('user', {async:true}),
    body: DS.attr('string'),
    createdDate: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      }),
    repostedFrom: DS.attr('string'),   
});


export default Post;

