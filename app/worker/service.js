import Ember from 'ember';

export default Ember.Service.extend({

  workers: [],
  selectedWorker: null,

  hasSelectedWorker: Ember.computed.notEmpty('selectedWorker'),
});
