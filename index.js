"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

var Timer = function Timer(interval) {
  var _this = this;

  _classCallCheck(this, Timer);

  this.start = function () {
    _this.internalTickHandler = _this.onTickHandler;
    _this.absoluteStartTime = _this.absoluteStartTime || Date.now();
    _this.source = _this.source || setInterval(function () {
      _this.currentTimeOffset = Date.now() + _this.seekOffset - _this.absoluteStartTime;
      _this.internalTickHandler(_this.currentTimeOffset);
    }, _this.interval);
    _this.onStartHandler(_this.currentTimeOffset);
  };

  this.pause = function () {
    _this.currentTimeOffset = Date.now() - _this.absoluteStartTime;
    _this.internalTickHandler = noop;
    _this.onPauseHandler(_this.currentTimeOffset);
    return _this.currentTimeOffset;
  };

  this.seekBy = function (milliseconds) {
    _this.seekOffset = milliseconds;
    _this.onSeekHandler(milliseconds);
  };

  this.stop = function () {
    clearInterval(_this.source);
    _this.source = null;
    _this.currentTimeOffset = 0;
    _this.currentIntervalOffset = 0;
    var totalDuration = Date.now() - _this.absoluteStartTime;
    _this.absoluteStartTime = 0;
    _this.onStopHandler(totalDuration);
    return totalDuration;
  };

  this.setOnTickHandler = function () {
    var onTickHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _this.onTickHandler = onTickHandler;
  };

  this.setOnStartHandler = function () {
    var onStartHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _this.onStartHandler = onStartHandler;
  };

  this.setOnPauseHandler = function () {
    var onPauseHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _this.onPauseHandler = onPauseHandler;
  };

  this.setOnStopHandler = function () {
    var onStopHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _this.onStopHandler = onStopHandler;
  };

  this.setOnSeekHandler = function () {
    var onSeekHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    _this.onSeekHandler = onSeekHandler;
  };

  this.source = null;
  this.interval = interval;
  this.absoluteStartTime = null;
  this.currentTimeOffset = 0;
  this.seekOffset = 0;
  this.internalTickHandler = noop;
  this.onTickHandler = noop;
  this.onStartHandler = noop;
  this.onPauseHandler = noop;
  this.onStopHandler = noop;
  this.onSeekHandler = noop;
};

module.exports = Timer;
