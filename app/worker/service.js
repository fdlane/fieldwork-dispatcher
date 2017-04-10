import Ember from 'ember';

export default Ember.Service.extend({

  workers: [],
  selectedWorkers: Ember.computed.alias('tableState.selectedItems'),

  hasSelectedWorker: Ember.computed.notEmpty('selectedWorkers'),

  selectWorker(tableState) {
      this.set('tableState', tableState);
    
  },

});
