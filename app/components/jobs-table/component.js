import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    assign() {
      this.sendAction('assign');
    },

    unassign() {
      this.sendAction('unassign');
    }
  }
});
