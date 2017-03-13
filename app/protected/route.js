import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return Ember.RSVP.hash({
      jobs: this.get('store').query('job', {
        orderBy: "assignedTo",
        equalTo: "maudevolk",
      }),
      workers: this.get('store').query('worker', {
        orderBy: "isAvailable",
        equalTo: true,
      }),
    });
  },
});
