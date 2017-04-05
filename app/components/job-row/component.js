import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  actions: {

    select(job) {
      let row = Ember.$(event.target).parent();

      if(row.hasClass('bg-info')) {
        row.removeClass('bg-info');
        this.sendAction('action', job, false, row);
      }
      else {
        row.addClass('bg-info');
        this.sendAction('action', job, true, row);
      }

    },
  }

});
