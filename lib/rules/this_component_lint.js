/**
 * @fileoverview "Replace <this.Component /> with {this.Component}"
 * @author Venkata Chaithanya
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "\"Replace <this.Component /> with {this.Component}\"",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      "messageId": 'Please replace the <this.{{tagName}} /> with {this.{{tagName}}()} {{extraData}}',
    },
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      JSXOpeningElement(node) {
        const { name, attributes } = node;
        if (name.object && (name.object.name === 'this' || name.object.name === 'thisItem')) {
          const sourceCode = context.sourceCode;
          const lines = sourceCode.lines
          const arrowFunctionName = name.property.name;
          const arrowFunctions = [];

          if (context.getAncestors()[0].type == "Program") {
            const [classFunction] = context.getAncestors()[0].body.filter(element => element.type == "ExportDefaultDeclaration")
            if (classFunction) findFunction(classFunction.declaration, arrowFunctions, arrowFunctionName)
          } else {
            context.getAncestors().forEach(ancestor => {
              findFunction(ancestor, arrowFunctions, arrowFunctionName)
            });
          }
          // Traverse the AST to find the corresponding arrow function

          const [arrowFunction] = arrowFunctions;
          // const fixerArrow = context.sourceCode.getTokenBefore(arrowFunction);
          context.report({
            node,
            messageId: `messageId`,
            data: { tagName: name.property.name, extraData: arrowFunction ? arrowFunction.key.name : 'Function Not Found in Class' },
            fix(fixer) {
              const fixes = []
              fixes.push(fixer.replaceText(node, sourceCode.getText(node).replace("this.", '').replace("thisItem.", '').replace("/>", `thisItem={${name.object.name === 'thisItem' ? "thisItem" : "this"}} />`)))
              if (arrowFunction) {
                fixes.push(fixer.replaceText(arrowFunction, ""));
                let arrowFunctionText = context.sourceCode.getText(arrowFunction);
                arrowFunctionText = arrowFunctionText.replace(/this\./g, 'thisItem.')
                const arrowFunctionLines = arrowFunctionText.split('\n');
                const paramBracIndex = arrowFunctionLines[0].indexOf("}) => {")
                const digitRegex = /\d|[a-zA-Z]/;
                if (paramBracIndex > 0) {
                  if (digitRegex.test(arrowFunctionLines[0].charAt(paramBracIndex - 1)) || digitRegex.test(arrowFunctionLines[0].charAt(paramBracIndex - 2))) arrowFunctionText = arrowFunctionText.replace("}) => {", ", thisItem}) => {");
                  else arrowFunctionText = arrowFunctionText.replace("}) => {", "thisItem}) => {")
                } else {
                  const paramIndex = arrowFunctionLines[0].indexOf("() => {");
                  if (paramIndex > 0) {
                    arrowFunctionText = arrowFunctionText.replace(") => {", "{thisItem}) => {")
                  }
                }
                fixes.push(fixer.insertTextAfter(context.sourceCode.ast, `\n\nconst ${arrowFunctionText}`));
              }
              return fixes;
            },
          });
        }
      },
    };
  },
};

function findFunction(ancestor, arrowFunctions, arrowFunctionName) {
  if (ancestor.type == "ClassDeclaration") {
    ancestor.body.body.forEach(element => {
      if (isFunctionWithName(element, arrowFunctionName)) arrowFunctions.push(element);
    })
  }
}

function isArrowFunction(node) {
  return node.type === 'PropertyDefinition';
}

function isFunctionWithName(node, name) {
  return (
    isArrowFunction(node) &&
    node.key &&
    node.key.name === name
  );
}

function getTextInRange(sourceCode, startLine, startColumn, endLine, endColumn) {
  try {

    // Extract text from the specified range
    const textInRange = sourceCode.text.slice(
      sourceCode.getIndexFromLoc({ line: startLine, column: startColumn }),
      sourceCode.getIndexFromLoc({ line: endLine, column: endColumn })
    );

    return textInRange;
  } catch (error) {
    return error.toString();
  }
}