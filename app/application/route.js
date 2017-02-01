import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return [{
      name: 'Semantic-Org/Semantic-UI',
      lastUpdated: '10 minutes ago',
    },{
      name: 'Semantic-Org/Semantic-UI',
      lastUpdated: '24 minutes ago',
    },{
      name: 'Semantic-Org/Semantic-UI',
      lastUpdated: '50 minutes ago',
    }];
  },
});
