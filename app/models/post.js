import DS from 'ember-data';
 
var Post = DS.Model.extend({
    ownedBy: DS.belongsTo('user', {async:true}),
    body: DS.attr('string'),
    createdDate: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      }),
});

export default Post;

Post.reopenClass({
    FIXTURES: [
        {
            id: 1,
            ownedBy: "1",
            body: "rrrrrrasfdsfds"
        },
        {
            id: 2,
            ownedBy: "2",
            body: "shfjdsfkjdshkdsa"
        },
        {
            id: 3,
            ownedBy: "1",
            body: "sdfdsdkkkkllkdfldsdf"
        }
    ]
});

