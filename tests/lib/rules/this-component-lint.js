/**
 * @fileoverview &#34;Replace &lt;this.Component /&gt; with {this.Component}&#34;
 * @author Venkata Chaithanya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/this_component_lint"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("this-component-lint", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "Undefined Components will Pop Up",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
