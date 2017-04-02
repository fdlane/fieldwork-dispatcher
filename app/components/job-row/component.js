import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  actions: {

    select(job, target) {
      let row = Ember.$(event.target).parent();
      row.addClass('bg-info').siblings().removeClass('bg-info');
      this.sendAction('action', job);
    }
  }

});
