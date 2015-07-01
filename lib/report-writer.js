var ReportWriter, _, color, format, path, writer,
  slice = [].slice;

path = require('path');

color = require('mocha').reporters.Base.color;

format = require('sf');

writer = require('./console-writer');

_ = require('lodash/object');

ReportWriter = (function() {
  ReportWriter.prototype.defaultOptions = {
    critical: 30.0,
    satisfactory: 70.0
  };

  function ReportWriter(options) {
    this.mergeOptions(options);
  }

  ReportWriter.prototype.mergeOptions = function(options) {
    this.options = _.merge({}, this.defaultOptions, options);
    this.options.critical = parseFloat(this.options.critical);
    return this.options.satisfactory = parseFloat(this.options.satisfactory);
  };

  ReportWriter.prototype.writeReport = function(result) {
    var coverage, divider;
    divider = "--------------------------------------------------------------------------------";
    writer.writeln(divider);
    writer.writeln("  Code Coverage Results:\n");
    result.files.forEach(this.formatFileResult, this);
    coverage = this.colorize(result.coverage);
    writer.writeEOL();
    writer.writeln("  Total Coverage: " + coverage);
    writer.writeln(divider);
    return writer.writeEOL();
  };

  ReportWriter.prototype.formatFileResult = function(file) {
    var coverage;
    coverage = this.colorize(file.coverage);
    return this.writeFileResult(coverage, file.executed, file.total, file.fileName);
  };

  ReportWriter.prototype.colorize = function(coverage) {
    var percent;
    percent = format('  {0}%', [coverage]);
    if (coverage >= this.options.satisfactory) {
      return color('green', percent);
    } else if (coverage < this.options.critical) {
      return color('fail', percent);
    } else {
      return color('bright yellow', percent);
    }
  };

  ReportWriter.prototype.writeFileResult = function() {
    var indent, output, ratio, values;
    values = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ratio = format('{0}/{1}', values[1], values[2]);
    indent = '          ';
    output = format('  {0} {1} {2}', values[0], (indent + ratio).slice(-indent.length), values[3]);
    return writer.writeln(output);
  };

  return ReportWriter;

})();

module.exports = ReportWriter;

//# sourceMappingURL=../sourcemap/report-writer.js.map