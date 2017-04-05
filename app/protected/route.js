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
          this.controller.set('disableAssign', false);
        },

        selectJob(job, selected, row) {

          let jobs = this.controllerFor('application').get('jobs');
          let selectedRows = this.controllerFor('application').get('selectedRows');

          if(selected) {
            jobs.pushObject(job);
            selectedRows.pushObject(row);
          }
          else {
            jobs.removeObject(job);
            selectedRows.removeObject(row);
          }

        },

        assignJob() {

          const applicationController = this.controllerFor('application');
          let selectedWorker = this.controllerFor('application').get('selectedWorker');
          let jobs = this.controllerFor('application').get('jobs');
          let store = this.store;

          jobs.forEach(function(job) {
            store.findRecord('job', job.get('id')).then(function(job) {

              job.set('assignedTo', selectedWorker);

              job.save();

            });
          });

          applicationController.set('jobs', []);
          this.send('deselectRows');

        },

        unassignJob() {

          const applicationController = this.controllerFor('application');
          let jobs = this.controllerFor('application').get('jobs');
          let store = this.store;

          jobs.forEach(function(job) {
            store.findRecord('job', job.get('id')).then(function(job) {

              job.set('assignedTo', 'UNASSIGNED');

              job.save();

            });
          });

          applicationController.set('jobs', []);
          this.send('deselectRows');

        },

        deselectRows() {
          this.controllerFor('application').selectedRows.forEach(function(row) {
            row.removeClass('bg-info');
          });
        }
    }

});
