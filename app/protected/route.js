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

        selectJob(row) {
          const applicationController = this.controllerFor('application');
          let jobs = this.controllerFor('application').get('jobs');
          let selectedRows = this.controllerFor('application').get('selectedRows');

          /*if(selected) {
            jobs.pushObject(job);
            selectedRows.pushObject(row);
          }
          else {
            jobs.removeObject(job);
            selectedRows.removeObject(row);
          }*/
          applicationController.set('tableState', row);
        
          console.log(row);
          console.log(row.selectedItems);

        },

        assignJob() {

          const applicationController = this.controllerFor('application');
          // let selectedWorker = applicationController.get('selectedWorker');
          // let jobs = applicationController.get('jobs');
          let store = this.store;
          //
          // jobs.forEach(function(job) {
          //   store.findRecord('job', job.get('id')).then(function(job) {
          //
          //     job.set('assignedTo', selectedWorker);
          //     job.set('status', 'Acknowledged');
          //
          //     job.save();
          //
          //   });
          // });
          //
          // applicationController.set('jobs', []);
          // this.send('deselectRows');

          let table = applicationController.get('tableState');
          table.selectedItems.getEach('id').forEach(function(id) {

              console.log(id);
              store.findRecord('job', id).then(function(job) {
                job.set('assignedTo', 'maudevolk');
                job.set('status', 'Acknowledged');
              });
            });

        },

        unassignJob() {

          const applicationController = this.controllerFor('application');
          let jobs = applicationController.get('jobs');
          let store = this.store;

          jobs.forEach(function(job) {
            store.findRecord('job', job.get('id')).then(function(job) {

              job.set('assignedTo', 'UNASSIGNED');
              job.set('status', 'Pending');

              job.save();

            });
          });

          applicationController.set('jobs', []);
          this.send('deselectRows');

        },

        cancelJob() {

          const applicationController = this.controllerFor('application');
          let jobs = applicationController.get('jobs');
          let store = this.store;

          jobs.forEach(function(job) {
            store.findRecord('job', job.get('id')).then(function(job) {

              job.set('isActive', false);

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
