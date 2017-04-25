import Ember from 'ember';

export default Ember.Component.extend({

  jobService: Ember.inject.service('job'),

  columns: [
    {
      "propertyName": "assignedTo",
      "title": "Assigned To",
      "sortDirection": "asc",
      "sortPrecedence": 1,
    },

    {
      "propertyName": "location",
      "title": "Location",
    },

    {
      "propertyName": "status",
      "title": "Status"
    }
  ],

  tableClasses: Ember.Object.create({
    "table": "table  table-bordered table-condensed",

  }),


  actions: {
    selectJob(table) {
      this.get('jobService').selectJob(table);
    },

    assign() {
      this.get('jobService').assignJob();
    },

    unassign() {
      this.get('jobService').unassignJob();
    },

    cancel() {
      this.get('jobService').cancelJob();
    }
  }
});
