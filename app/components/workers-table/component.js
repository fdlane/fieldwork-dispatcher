import Ember from 'ember';

export default Ember.Component.extend({

  workerService: Ember.inject.service('worker'),

  columns: [
    {
      "propertyName": "username",
      "title": "Name",
      "sortDirection": "asc",
      "sortPrecedence": 1,
    },

    {
      "propertyName": "available",
      "title": "Available",
    },

    {
      "propertyName": "jobCount",
      "title": "Job Count",
    }
  ],

  tableClasses: Ember.Object.create({
    "table": "table  table-bordered table-condensed",
    "footerSummaryNumericPagination": "col-md-4 col-sm-4 col-xs-4", // Show 1-n of n
    "pageSizeWrapper": "col-md-3 col-sm-3 col-xs-3", // Page dropdown
    "paginationWrapperNumeric": "col-md-5 col-sm-5 col-xs-5", // Page

  }),

  actions: {

    selectWorker(tableState) {
      this.get('workerService').selectWorker(tableState);
    }
  }
});
