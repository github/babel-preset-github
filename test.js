const {loadOptions, transformSync} = require('@babel/core')
const fail = process.stdout.isTTY ? '\x1b[0;31mx\x1b[0m' : 'x'
const pass = process.stdout.isTTY ? '\x1b[0;32m✔\x1b[0m' : '✔'
let exit = 0

const test = (name, pre, expected, options = { presets: ["./"] }) => {
  try {
    const actual = transformSync(pre, options).code
    if (expected instanceof RegExp) {
      if (!expected.test(actual)) throw new Error(`No match ${expected}:\n ${actual}`)
    } else if (typeof expected === 'string') {
      if (actual !== expected) throw new Error(`Actual: \`\`\`\n${actual}\n\`\`\`\nExpected: \`\`\`\n${expected}\n\`\`\``)
    } else {
      throw new Error(`Actual: \`\`\`\n${actual}\n\`\`\``)
    }
    console.log(`${pass} ${name}`)
  } catch (e) {
    console.log(`${fail} ${name}`)
    console.log(e.stack)
    exit = 1
  }
}
const testFail = (name, pre, ctor, options = { presets: ["./"] }) => {
  try {
    const actual = transformSync(pre, options).code
    const err = new Error(`Actual: \`\`\`\n${actual}\n\`\`\`\n`)
    console.log(`${fail} ${name}`)
    console.log(`Expected transform to fail with ${ctor.name}`)
    console.log(err.stack)
    exit = 1
  } catch (err) {
    if (!(err instanceof ctor)) {
      console.log(`${fail} ${name}`)
      console.log(`Expected ${ctor.name} but got ${err.constructor.name}`)
      exit = 1
    } else {
      console.log(`${pass} ${name}`)
    }
  }
}

test(
  'json-strings works',
  `"a b"`,
  `"a\\u2028b";`
)

test(
  'optional-catch works',
  `try { throw '' } catch {}`,
  `try {
  throw '';
} catch (_unused) {}`,
)

test(
  'import.meta works',
  `import.meta.foo`,
  `import.meta.foo;`
)

test(
  'dynamic import works',
  `import('foo')`,
  `import('foo');`
)

test(
  'flow gets stripped',
  `var a: string = 'hello'`,
  `var a = 'hello';`
)

test(
  'babel-plugin-transform-invariant works',
  `invariant(false)`,
  `invariant(false, "null.js:1");`
)

test(
  'Imports are not transformed',
  `import foo from "bar"`,
  `import foo from "bar";`
)

test(
  'Imports can be transformed setting `modules`',
  `import {foo} from "bar"`,
  `"use strict";

var _bar = require("bar");`,
  { presets: [["./", { modules: 'commonjs' }]]}
)

test(
  'classes dont get transformed down on desktop',
  `class Foo {}`,
  `class Foo {}`,
)

test(
  'classes get transformed with custom profile',
  `class Foo {}`,
  /_classCallCheck/,
  { presets: [["./", { targets: { browsers: 'IE 11' } }]]}
)

test(
  'classes dont get transformed on mobile',
  `class Foo {}`,
  `class Foo {}`,
  { presets: [["./", { targets: { browsers: 'mobile' } }]]}
)

test(
  'async does not get transformed on desktop',
  `async function foo() {}`,
  `async function foo() {}`,
)

test(
  'async gets transformed with custom profile',
  `async function foo() {}`,
  /asyncGeneratorStep/,
  { presets: [["./", { targets: { browsers: 'IE 11' } }]]}
)

test(
  'async does not get transformed on mobile',
  `async function foo() {}`,
  `async function foo() {}`,
  { presets: [["./", { targets: { browsers: 'mobile' } }]]}
)

testFail(
  'class properties are not supported',
  `class Foo { x = 1; }`,
  SyntaxError
)

testFail(
  'class properties are not supported on mobile',
  `class Foo { x = 1; }`,
  SyntaxError,
  { presets: [["./", { targets: { browsers: 'mobile' } }]]}
)

process.exit(exit)
