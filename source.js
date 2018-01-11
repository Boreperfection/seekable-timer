const noop = ()=>{};

class Timer {
  constructor (interval) {
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
  }
  start = () => {
    this.internalTickHandler = this.onTickHandler;
    this.absoluteStartTime = this.absoluteStartTime || Date.now();
    this.source = this.source || setInterval(() => {
      this.currentTimeOffset = Date.now() + this.seekOffset - this.absoluteStartTime;
      this.internalTickHandler(this.currentTimeOffset);
    }, this.interval);
    this.onStartHandler(this.currentTimeOffset);
  }
  pause = () => {
    this.currentTimeOffset = Date.now() - this.absoluteStartTime;
    this.internalTickHandler = noop;
    this.onPauseHandler(this.currentTimeOffset);
    return this.currentTimeOffset;
  }
  seekBy = (milliseconds) => {
    this.seekOffset = milliseconds;
    this.onSeekHandler(milliseconds);
  }
  stop = () => {
    clearInterval(this.source);
    this.source = null;
    this.currentTimeOffset = 0;
    this.currentIntervalOffset = 0;
    const totalDuration = Date.now() - this.absoluteStartTime;
    this.absoluteStartTime = 0;
    this.onStopHandler(totalDuration);
    return totalDuration;
  }
  setOnTickHandler = (onTickHandler = noop) => {
    this.onTickHandler = onTickHandler;
  }
  setOnStartHandler = (onStartHandler = noop) => {
    this.onStartHandler = onStartHandler;
  }
  setOnPauseHandler = (onPauseHandler = noop) => {
    this.onPauseHandler = onPauseHandler;
  }
  setOnStopHandler = (onStopHandler = noop) => {
    this.onStopHandler = onStopHandler;
  }
  setOnSeekHandler = (onSeekHandler = noop) => {
    this.onSeekHandler = onSeekHandler;
  }
}

module.exports = Timer;
