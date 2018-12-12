describe('convertStringToTemplateString', () => {
  let convertStringToTemplateString;

  beforeEach(() => {
    convertStringToTemplateString = require('./convertStringToTemplateString');
  });

  [
    {
      input: "numberOfItems + ' items'",
      expectedOutput: '`${numberOfItems} items`'
    },
    {
      input: "'List contains ' + numberOfItems + ' items'",
      expectedOutput: '`List contains ${numberOfItems} items`'
    },
    {
      input:
        "'Attempted to hit the endpoint: (' + contentPersonalizationResource + ') but encountered an error'",
      expectedOutput:
        '`Attempted to hit the endpoint: (${contentPersonalizationResource}) but encountered an error`'
    },
    {
      input:
        "performance.now() + ' session lock in ' + sessionKeepTime.toFixed(2) + ' m'",
      expectedOutput:
        '`${performance.now()} session lock in ${sessionKeepTime.toFixed(2)} m`'
    },
    {
      input:
        "'this ' + 'is ' + 'a ' + 'string. ' + testVariable + (testVariable ? 'foo' : 'bar')",
      expectedOutput:
        "`this is a string. ${testVariable}${(testVariable ? 'foo' : 'bar')}`"
    },
    { input: '', expectedOutput: '' }
  ].forEach(({ input, expectedOutput }) => {
    it(`when using "${input}" as input for convert, returns with "${expectedOutput}"`, () => {
      const actual = convertStringToTemplateString(input);

      expect(actual).toBe(expectedOutput);
    });
  });
});
