import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'public/models/test';

F.attach(QUnit);

QUnit.module('public functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('public main page shows up', function() {
  F('title').text('public', 'Title is set');
});
