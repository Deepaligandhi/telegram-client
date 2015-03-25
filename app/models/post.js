import DS from 'ember-data';
 
var Post = DS.Model.extend({
    author: DS.belongsTo('user', {async:true}),
    body: DS.attr('string'),
    createdDate: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      }),
    repostedFromAuthor: DS.attr('string'),   
});


Post.reopenClass({
    FIXTURES: [
        {
            id: 1,
            author: "deepali",
            body: "rrrrrrasfdsfds"
        },
        {
            id: 2,
            author: "prashant",
            body: "shfjdsfkjdshkdsa"
        },
        {
            id: 3,
            author: "deepali",
            body: "sdfdsdkkkkllkdfldsdf"
        }
    ]
});

export default Post;

