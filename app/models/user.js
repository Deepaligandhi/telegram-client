import DS from 'ember-data';
 
var User = DS.Model.extend({
    userName: DS.attr('string'),
    name: DS.attr('string'),
    password: DS.attr('string'),
    email: DS.attr('string'),
    photo: DS.attr('string'),
    followedByCurrentUser: DS.attr('boolean', {defaultValue: false}),
    followingCurrentUser: DS.attr('boolean', {defaultValue: false})
});

export default User;

User.reopenClass({
    FIXTURES: [
        {
            id: 1,
            userName: "deepali",
        },
        {
            id: 2,
            userName: "prashant",
        },
        {
            id: 3,
            userName: "varun",
        }
    ]
});
