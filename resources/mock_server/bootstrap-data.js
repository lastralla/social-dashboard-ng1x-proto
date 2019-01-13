(function() {
  'use strict';

  angular
    .module('soApp.dataStore')
    .value('appData', getPageData());

  ////////// Functions //////////

  function getPageData() {
    return {

      currentUser: {
        userId: 'c6a06b49-3ba3-4fc4-bc09-aefe39b5eb82',
        email: 'here@there.com',
        name: 'John Osbourne',
        // firstName: 'John',
        // lastName: 'Osbourne',
        // fullName: 'John Osbourne',
        avatarUrl: '',
        timezone: '-4',
        brands: [
          'Pepsi',
          'Coke',
          'RC Cola',
          'Joey\'s Pizzeria'
        ],
        loginInfo: {
          providerID: "facebook",
          providerKey: "10156155143235607"
        }
      },

      activeBrand: {
        name: 'Pepsi',
        meta: {
          channels: {
            facebook: {
              handle: 'pepsi',
              token: '174195171257533'
            },
            twitter: {
              handle: 'pepsi',
              token: '141279517125373'
            }
          }
        },
        posts: [{
          postId: '4031',
          postType: 'image',
          status: 'request',
          approver: '12',
          lastUpdate: '2015-08-28',
          scheduleTime: '2015-10-01',
          keywords: ['Twerk'],
          content: {
            previewImage: 'https://placeimg.com/40/40/nature',
            media: 'https://placeimg.com/40/40/tech',
            channels: {
              twitter: {
                body: 'hipsters rule'
              }
            }
          },
          messages: [{
            messageId: '01',
            name: 'System',
            status: 'read',
            time: '2017-08-23',
            body: 'Draft post 4031 created'
          }, {
            messageId: '02',
            name: 'System',
            status: 'read',
            time: '2017-08-26',
            body: 'Post 4031 now pending'
          }, {
            messageId: '03',
            userId: '11',
            name: 'Sharon O.',
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
            status: 'unread',
            time: '2017-08-28',
            body: 'is it ready to go'
          }]
        }]
      }
    };

  }

})();
