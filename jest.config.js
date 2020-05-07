module.exports = {
    reporters: [
      [ 'jest-junit', {
        includeConsoleOutput: true,
        outputName: 'output.xml',
      } ]
    ]
  };