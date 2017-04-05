import Ember from 'ember';

export default Ember.Component.extend({

  disableAssign: true,

  actions: {
    assign() {
      this.sendAction('assign');
    },

    unassign() {
      this.sendAction('unassign');
    }
  }
});
