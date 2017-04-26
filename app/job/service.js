import Ember from 'ember';

export default Ember.Service.extend({

  store: Ember.inject.service(),

  workerService: Ember.inject.service('worker'),

  jobs: [],
  selectedJobs: Ember.computed.alias('tableState.selectedItems'),
  hasSelectedJob: Ember.computed.notEmpty('selectedJobs'),

  canAssignJob: Ember.computed.and('hasSelectedJob', 'workerService.hasSelectedWorker'),
  canUnassignJob: Ember.computed.alias('hasSelectedJob'),
  canCancelJob: Ember.computed.alias('hasSelectedJob'),

  filterValue: "",

  jobCounts: Ember.computed.filterBy('jobs', 'assignedTo', 'amberolive'),

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

  setJobCounts() {
    let jobs = this.get('jobs');
    let workers = this.get('workerService.workers').toArray();
    let jobCount = 0;
    workers.forEach(function(worker) {

      let jobCountAssigned = jobs.filterBy('assignedTo', worker.get('username')).length;
      let jobCountCompleted = jobs.filterBy('status', 'Completed').length;
      jobCount = jobCountAssigned - jobCountCompleted;
      if(jobCount < 0)
        jobCount = 0;

      worker.set('jobCount', jobCount);
      worker.save();
    });
  },

  selectJob(tableState) {

      this.set('tableState', tableState);

  },

  assignJob() {

    let selectedWorker = this.get('workerService.selectedWorkers.firstObject');

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', selectedWorker.get('username'));
      job.set('status', 'Acknowledged');
      job.save();

    });

    this.get('selectedJobs').clear();
    this.setJobCounts();
  },

  unassignJob() {

    this.get('selectedJobs').forEach(function(job) {

      job.set('assignedTo', 'UNASSIGNED');
      job.set('status', 'Pending');
      job.save();

    });

    this.get('selectedJobs').clear();
    this.setJobCounts();

  },

  cancelJob() {

    this.get('selectedJobs').forEach(function(job) {

      job.set('isActive', false);

      job.save();

    });
    this.get('selectedJobs').clear();
    this.setJobCounts();

  },



});
