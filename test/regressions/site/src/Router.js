// @flow weak

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import TestViewer from './TestViewer';

const requireTest = require.context('./tests', true, /js$/);
const testFiles = requireTest.keys();
const tests = testFiles.reduce((res, n) => {
  res.push({
    path: n,
    routePath: n.replace('./', '').replace('.js', ''),
    name: n.replace(/.*\//, '').replace('.js', ''),
  });
  return res;
}, []);

export default function RootRouter() {
  return (
    <Router>
      <Route
        title="Material UI Regression Tests"
        path="/"
        component={TestViewer}
        numTests={tests.length}
      >
        {tests.map(((test, index) => {
          return (
            <Route
              key={test.name}
              title={test.name}
              testIndex={index}
              path={`/${test.routePath}`}
              component={requireTest(test.path).default}
            />
          );
        }))}
      </Route>
    </Router>
  );
}
