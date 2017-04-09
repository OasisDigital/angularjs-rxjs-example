# AngularJS Promise / RxJS Comparison

## Introduction

This small example application is meant to illustrate that:

* Straightforward AngularJS 1.x promise-based application often have defects in
  real-world conditions.
* These can be easily avoided using RxJS...
* ... which is also more future-ready anyway.

Blog post: TODO

Video: TODO

## Running the demo

```
npm install
npm start
```

Then navigate to:

http://localhost:3000

## Demo application features

This is a very simple demo application. It presents a list of people, offering
simple filter and sort controls.

The actual filtering occurs on the server side - this example application ships
with an off-the-shelf `json-server`, which has built in filtering capability.

## Two approaches

The application is coded two different ways. Other than the bits listed in the
headings below, the code is shared between the two approaches, and is vanilla
AngularJS code. There are a a few bits worthy of note:

* ES2015 classes are used - these work fine, right in the browser, for AngularJS
  controllers and services. (To support IE though, a compiler would be needed -
  and easily provided in a real project.)
* In `js/random-promise-delay.js` there are promise gymnastics, a function which
  can be inserted in a promise chain to delay values.

### Promises

The promise-based code is in the `employee-list-promise` directory. It is very
straightforward to read, and in casual use, appears to function correctly.

Unfortunately, this code has a defect, shared with **numberous** production AngularJS applications - i

To see this glitch occur:

* Edit `employee-loader.js` as below.
* Reload the page.
* Click quickly between the first few names.
* Observe that sometimes, the most recent name you clicked on does not match the
  name on the right side of the screen!

```
  const API_LATENCY = 100;
  const API_JITTER = 100;
```

The cause of this trouble is invisible with an instatanous server over a fast
network - and hard to avoid in production deployment, where load and latency can
and do vary. HTTP requests can complete in a different order than they were
started, and promises do nothing to prevent that.

It is possible to avoid these glitches with a promise-based approach, but it is
tedious and more work than the alternative.

### RxJS

The RxJS-based code is in the `employee-list-rxjs-async` directory.

Promises are about single events; RxJS observables are about a series of values.
Important, an observable stream automatically, always keeps its value in order.
This ordering property turns out to be vital to correct operation in real-world
asyncronous code. It easily solves the defects demonstrated here.

The RxJS-based code is also slighlty *shorter* than the typical AngularJS 1.x
promise-centric solution, and the template is the same length. To achieve that,
the follow backport of the `async` Pipe from Angular 2 is very useful:

https://github.com/cvuorinen/angular1-async-filter

See the video for much more explanation.
