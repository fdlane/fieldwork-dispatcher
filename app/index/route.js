import Ember from 'ember';

export default Ember.Route.extend({

    jobService: Ember.inject.service('job'),
    workerService: Ember.inject.service('worker'),

    model() {

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

    afterModel(model) {
      this.set('workerService.workers', model.workers);
      this.set('jobService.jobs', model.jobs);
    },

    actions: {

        logout() {
            this.get('session').close().then(() => {
                this.transitionTo('login');
            });

        },
    }

});
