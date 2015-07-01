path = require('path');
color = require('mocha').reporters.Base.color
format = require('sf')
writer = require('./console-writer')
_ = require('lodash/object')

class ReportWriter

  defaultOptions: {
    critical: 30.0,
    satisfactory: 70.0
  }

  constructor: (options) ->
    @mergeOptions(options)

  mergeOptions: (options) ->
    @options = _.merge({}, @defaultOptions, options)
    @options.critical = parseFloat(@options.critical)
    @options.satisfactory = parseFloat(@options.satisfactory)

  writeReport: (result) ->
    divider = "--------------------------------------------------------------------------------"
    writer.writeln divider
    writer.writeln "  Code Coverage Results:\n"
    result.files.forEach @formatFileResult, @

    coverage = @colorize(result.coverage)

    writer.writeEOL()
    writer.writeln "  Total Coverage: " + coverage
    writer.writeln divider
    writer.writeEOL()

  formatFileResult: (file) ->
    coverage = @colorize(file.coverage)
    @writeFileResult coverage, file.executed, file.total, file.fileName

  colorize: (coverage) ->
    percent = format '  {0}%', [coverage]

    if coverage >= @options.satisfactory
      color('green', percent)
    else if coverage < @options.critical
      color('fail', percent)
    else
      color('bright yellow', percent)

  writeFileResult: (values...) ->
    ratio = format '{0}/{1}', values[1], values[2]
    indent = '          '
    output = format '  {0} {1} {2}', values[0], (indent + ratio).slice(-indent.length), values[3]
    writer.writeln output

module.exports = ReportWriter
