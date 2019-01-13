import angular from 'angular';

angular
  .module('sdApp.posts');
// .filter('latestMessage', latestMessageFilter);

////////// Functions //////////

/* @ngInject */
function latestMessageFilter(messaging) {
  return function(messages) {
    let sortedMessages = messaging.sortMessagesByTime(messages);

    return sortedMessages[0];
  };
}
