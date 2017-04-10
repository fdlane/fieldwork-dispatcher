import Ember from 'ember';

export default Ember.Service.extend({

  workerService: Ember.inject.service('worker'),

  jobs: [],
  selectedJobs: Ember.computed.alias('tableState.selectedItems'),
  hasSelectedJob: Ember.computed.notEmpty('selectedJobs'),

  canAssignJob: Ember.computed.and('hasSelectedJob', 'workerService.hasSelectedWorker'),
  canUnassignJob: Ember.computed.alias('hasSelectedJob'),
  canCancelJob: Ember.computed.alias('hasSelectedJob'),

  selectJob(tableState) {

    this.set('tableState', tableState);


    console.log(tableState);
    console.log(tableState.selectedItems);

  },

  assignJob() {

    let selectedWorker = this.get('workerService.selectedWorker');

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', selectedWorker);
      job.set('status', 'Acknowledged');
      job.save();

    });

    this.get('selectedJobs').clear();

  },

  unassignJob() {

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', 'UNASSIGNED');
      job.set('status', 'Pending');
      job.save();

    });

    this.get('selectedJobs').clear();

  },

  cancelJob() {

    this.get('selectedJobs').forEach(function(job) {

      job.set('isActive', false);

      job.save();

    });
    this.get('selectedJobs').clear();

  },



});
