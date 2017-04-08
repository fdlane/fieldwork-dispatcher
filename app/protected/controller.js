import Ember from 'ember';

export default Ember.Controller.extend({

  disableAssign: true,

  jobColumns: [
    {
      "propertyName": "assignedTo",
      "title": "Assigned To",
      "sortDirection": "asc",
      "sortPrecedence": 1,
    },

    {
      "propertyName": "location",
      "title": "Location",
      "disableSorting": true,
    },

    {
      "propertyName": "status",
      "title": "Status"
    }
  ],

  workerColumns: [
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

  jobClasses: Ember.Object.create({
    "outerTableWrapper": "",
    "innerTableWrapper": "inner-table-wrapper",
    "table": "table  table-bordered",
    "globalFilterWrapper": "pull-left",
    "columnsDropdownWrapper": "pull-right columns-dropdown",
    "columnsDropdownButtonWrapper": "btn-group",
    "columnsDropdown": "dropdown-menu pull-right",
    "theadCell": "table-header",
    "theadCellNoSorting": "table-header-no-sorting",
    "theadCellNoFiltering": "table-header-no-filtering",
    "tfooterWrapper": "table-footer clearfix",
    "footerSummary": "table-summary",
    "footerSummaryNumericPagination": "col-md-4 col-sm-4 col-xs-4",
    "footerSummaryDefaultPagination": "col-md-5 col-sm-5 col-xs-5",
    "pageSizeWrapper": "col-md-2 col-sm-2 col-xs-2",
    "pageSizeSelectWrapper": "pull-right",
    "paginationWrapper": "table-nav",
    "paginationWrapperNumeric": "col-md-6 col-sm-6 col-xs-6",
    "paginationWrapperDefault": "col-md-5 col-sm-5 col-xs-5",
    "buttonDefault": "btn btn-default",
    "noDataCell": "",
    "collapseRow": "collapse-row",
    "expandRow": "expand-row",
    "thead": "",
    "input": "form-control",
    "clearFilterIcon": "glyphicon glyphicon-remove-sign form-control-feedback",
    "clearAllFiltersIcon": "glyphicon glyphicon-remove-circle",

  }),

  workerClasses: Ember.Object.create({
    "outerTableWrapper": "",
    "innerTableWrapper": "inner-table-wrapper",
    "table": "table  table-bordered",
    "globalFilterWrapper": "pull-left",
    "columnsDropdownWrapper": "pull-right columns-dropdown",
    "columnsDropdownButtonWrapper": "btn-group",
    "columnsDropdown": "dropdown-menu pull-right",
    "theadCell": "table-header",
    "theadCellNoSorting": "table-header-no-sorting",
    "theadCellNoFiltering": "table-header-no-filtering",
    "tfooterWrapper": "table-footer clearfix",
    "footerSummary": "table-summary",
    "footerSummaryNumericPagination": "col-md-4 col-sm-4 col-xs-4", // Show 1-n of n
    "footerSummaryDefaultPagination": "col-md-5 col-sm-5 col-xs-5",
    "pageSizeWrapper": "col-md-3 col-sm-3 col-xs-3", // Page dropdown
    "pageSizeSelectWrapper": "pull-right",
    "paginationWrapper": "table-nav",
    "paginationWrapperNumeric": "col-md-5 col-sm-5 col-xs-5", // Page
    "paginationWrapperDefault": "col-md-5 col-sm-5 col-xs-5",
    "buttonDefault": "btn btn-default",
    "noDataCell": "",
    "collapseRow": "collapse-row",
    "expandRow": "expand-row",
    "thead": "",
    "input": "form-control",
    "clearFilterIcon": "glyphicon glyphicon-remove-sign form-control-feedback",
    "clearAllFiltersIcon": "glyphicon glyphicon-remove-circle",

  })

});
