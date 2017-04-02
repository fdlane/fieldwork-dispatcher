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

        selectJob(job) {
          this.controllerFor('application').set('job', job);
        },

        assignJob() {

          let selectedWorker = this.controllerFor('application').get('selectedWorker');
          let job = this.controllerFor('application').get('job');
          this.store.findRecord('job', job.get('id')).then(function(job) {

            job.set('assignedTo', selectedWorker);

            job.save();

          });


        }
    }

});
