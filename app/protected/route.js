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

        selectWorker(tableState) {
          if(tableState.selectedItems.length > 0) {
            let username = tableState.selectedItems.getEach('username').objectAt(0);
            this.controllerFor('application').set('selectedWorker', username);
            this.controller.set('disableAssign', false);
          }
          else {
            this.controller.set('disableAssign', true);
          }

          console.log(tableState);
        },

        selectJob(tableState) {
          const applicationController = this.controllerFor('application');

          applicationController.set('table', tableState);


          console.log(tableState);
          console.log(tableState.selectedItems);

        },

        assignJob() {

          const applicationController = this.controllerFor('application');
          let store = this.store;
          let table = applicationController.get('table');
          let selectedWorker = applicationController.get('selectedWorker');

          table.selectedItems.getEach('id').forEach(function(id) {

              console.log(id);
              store.findRecord('job', id).then(function(job) {
                job.set('assignedTo', selectedWorker);
                job.set('status', 'Acknowledged');
                job.save();
              });
            });

            table.selectedItems.clear();

        },

        unassignJob() {

          const applicationController = this.controllerFor('application');
          let store = this.store;
          let table = applicationController.get('table');

          table.selectedItems.getEach('id').forEach(function(id) {
            store.findRecord('job', id).then(function(job) {
              job.set('assignedTo', 'UNASSIGNED');
              job.set('status', 'Pending');
              job.save();
            });
          });

          table.selectedItems.clear();

        },

        cancelJob() {

          const applicationController = this.controllerFor('application');
          let store = this.store;
          let table = applicationController.get('table');

          table.selectedItems.getEach('id').forEach(function(id) {
            store.findRecord('job', id).then(function(job) {
              job.set('isActive', false);

              job.save();
            });
          });

          table.selectedItems.clear();

        },
    }

});
