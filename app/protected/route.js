import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return Ember.RSVP.hash({
      jobs: this.get('store').query('job', {
        orderBy: "isActive",
        equalTo: true,
      }),
      workers: this.get('store').query('worker', {
        orderBy: "isActive",
        equalTo: true,
      }),
    });
  },
});
