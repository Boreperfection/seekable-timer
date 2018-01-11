# Seekable Timer

A pure Javascript timer with support for seeking.

Works on browser(webpack), electron and node.

## Installation
```
 yarn add seekable-timer
```
or
```
 npm install --save seekable-timer
```

## Usage
A basic example:

```
const Timer = require('seekable-timer');

const timer = new Timer(1000); // This will give a new timer instance with 1000ms step

timer.setOnTickHandler((timeOffset)=>{
  console.log(timeOffset, 'ms');
  if(timeOffset > 15000){ //once timer has passed 15secs since starting
    timer.stop(); //stops the timer
  }
});

timer.start(); //starts the timer
```


Functions:

- `timer.start()` - starts or resumes a paused timer. No return value. Here onStartHandler is called.
- `timer.stop()` - stops the timer. returns the total duration in milliseconds for which the timer ran. Here onStopHandler is called.
- `timer.pause()` - pauses the timer. returns the current time offset from starting. Here onPauseHandler is called.
Difference between stop and pause is that pause will not reset the timer offset whereas stop will reset the timer itself.
- `timer.seekBy(milliseconds)` = seeks the timers by the amount of milliseconds passed. You can pass a positive value to seek to future. Or you can pass a negative value to seek to past.

- ```
timer.setOnTickHandler((timeoffset)=> {

  })
```
sets an on onTickHandler that is called on every tick you specified on the initialisation of timer.

- ```
timer.setOnStartHandler((timeoffset)=> {

  })
```
sets an on onStartHandler that is called on `timer.start()` of timer.

- ```
timer.setOnPauseHandler((timeoffset)=> {
    // timeOffset is calculated from the time when we did start.
  })
```
- ```
timer.setOnStopHandler((timeoffset)=> {
    // timeOffset is calculated from the time when we did start.
  })
```
- ```
timer.setOnSeekHandler((seekedMilliseconds)=> {

  })
```
