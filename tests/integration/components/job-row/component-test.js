import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-row', 'Integration | Component | job row', {
  integration: true
});

test('select action fires', function(assert) {

  this.render(hbs`{{job-row job=job select="selectJobAction"}}`);
  assert.ok(true);

});
