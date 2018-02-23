module.exports = [
  { prefix: '/', router: require('./root') },
  { prefix: '/articles', router: require('./articles') }
];
