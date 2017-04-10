import Ember from 'ember';

export default Ember.Service.extend({

  workerService: Ember.inject.service('worker'),

  jobs: [],
  selectedJobs: Ember.computed.alias('tableState.selectedItems'),
  hasSelectedJob: Ember.computed.notEmpty('selectedJobs'),

  canAssignJob: Ember.computed.and('hasSelectedJob', 'workerService.hasSelectedWorker'),
  canUnassignJob: Ember.computed.alias('hasSelectedJob'),
  canCancelJob: Ember.computed.alias('hasSelectedJob'),

  filterValue: "",

  filteredJobs: Ember.computed('jobs.[]', 'filterValue', function(){
    let jobs = this.get('jobs');
    let filterValue = this.get('filterValue').toLowerCase();
    return jobs.filter(job => {
      if(job.get('location').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }
      if(job.get('assignedTo').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }
      if(job.get('status').toLowerCase().indexOf(filterValue) !== -1){
        return true;
      }

      return false;
    });
  }),

  selectJob(tableState) {

      this.set('tableState', tableState);


    console.log(tableState);
    console.log(tableState.selectedItems);

  },

  assignJob() {

    let selectedWorker = this.get('workerService.selectedWorkers.firstObject');

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', selectedWorker.get('username'));
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
