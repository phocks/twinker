if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    var Twit = require('twit');

    // console.log(Meteor.user()); 

    var T = new Twit({
      consumer_key:         Meteor.settings.consumerKey,
      consumer_secret:      Meteor.settings.consumerSecret,
      access_token:         Meteor.settings.accessToken,
      access_token_secret:  Meteor.settings.accessTokenSecret,
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    });

    //  search twitter for all tweets containing the word 'banana'
    //  since Nov. 11, 2011
    T.get('search/tweets',
        {
            q: 'banana since:2011-11-11',
            count: 1
        },
        function(err, data, response) {
            console.log(data);
        }
    );



  });

  Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: { 
      'services.twitter.profile_image_url_https': 1,
      'services.twitter.profile_image_url': 1,
      'services.twitter.screenName': 1,
      'profile': 1}});
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("allUserData");

  Template.list.helpers({
    userInCollection() {
      return Meteor.users.find({}).fetch().reverse();
    }
  });
}