import Ember from 'ember';

export default Ember.Route.extend({

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

    actions: {

        logout() {
            this.get('session').close().then(() => {
                this.transitionTo('login');
            });

        },

        selectWorker(username) {
          this.controllerFor('application').set('selectedWorker', username);
        },

        selectJob(job, selected) {

          let jobs = this.controllerFor('application').get('jobs');

          if(selected) {
            jobs.pushObject(job);
          }
          else {
            jobs.removeObject(job);
          }

        },

        assignJob() {

          let selectedWorker = this.controllerFor('application').get('selectedWorker');
          let jobs = this.controllerFor('application').get('jobs');
          let store = this.store;

          jobs.forEach(function(job) {
            store.findRecord('job', job.get('id')).then(function(job) {

              job.set('assignedTo', selectedWorker);

              job.save();

            });
          });



        }
    }

});
