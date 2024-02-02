/**
 * @fileoverview To Parse the &lt;this.Component /&gt; and replace with {this.Component()}
 * @author Venkata Chaithanya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const this_component_lint = require("./rules/this_component_lint");

// import processors
module.exports.processors = {
  // add your processors here
};

module.exports = {
  rules: {
    "this-component-lint": this_component_lint
  },
};

