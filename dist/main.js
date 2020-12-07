/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");

document.querySelector('button').addEventListener('click', function () {
  if (ac.state === 'suspended') ac.resume();
});
document.getElementById('ppButton1').addEventListener('click', function () {
  playOrPause(1);
});
document.getElementById('ppButton2').addEventListener('click', function () {
  playOrPause(2);
});
var ac = new (window.AudioContext || window.webkitAudioContext)();
var track1 = ac.createMediaElementSource(document.getElementById("track1"));
var track2 = ac.createMediaElementSource(document.getElementById("track2"));
var gainNode1 = ac.createGain();
var gainNode2 = ac.createGain();
track1.connect(gainNode1).connect(ac.destination);
track2.connect(gainNode2).connect(ac.destination);
var crossfader = document.getElementById("crossfader");
crossfader.addEventListener("input", function (e) {
  var inputValue = e.currentTarget.value;
  gainNode1.gain.value = 1.0 - inputValue;
  gainNode2.gain.value = inputValue;
});
var speed1 = document.getElementById("speed1");
var speed2 = document.getElementById("speed2");
speed1.addEventListener("input", function (e) {
  changeSpeed(1, e.currentTarget.value);
});
speed2.addEventListener("input", function (e) {
  changeSpeed(2, e.currentTarget.value);
});

var changeSpeed = function changeSpeed(n, speed) {
  var audio = n === 1 ? track1.mediaElement : track2.mediaElement;
  audio.playbackRate = speed;
};

var playOrPause = function playOrPause(n) {
  var ppButton = document.getElementById("ppButton".concat(n));
  var audio = n === 1 ? track1.mediaElement : track2.mediaElement;

  if (audio.paused) {
    audio.play();
    ppButton.innerHTML = "pause";
  } else {
    audio.pause();
    ppButton.innerHTML = "play";
  }
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiYWMiLCJzdGF0ZSIsInJlc3VtZSIsImdldEVsZW1lbnRCeUlkIiwicGxheU9yUGF1c2UiLCJ3aW5kb3ciLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJ0cmFjazEiLCJjcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UiLCJ0cmFjazIiLCJnYWluTm9kZTEiLCJjcmVhdGVHYWluIiwiZ2Fpbk5vZGUyIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwiY3Jvc3NmYWRlciIsImUiLCJpbnB1dFZhbHVlIiwiY3VycmVudFRhcmdldCIsInZhbHVlIiwiZ2FpbiIsInNwZWVkMSIsInNwZWVkMiIsImNoYW5nZVNwZWVkIiwibiIsInNwZWVkIiwiYXVkaW8iLCJtZWRpYUVsZW1lbnQiLCJwbGF5YmFja1JhdGUiLCJwcEJ1dHRvbiIsInBhdXNlZCIsInBsYXkiLCJpbm5lckhUTUwiLCJwYXVzZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFp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QixNQUFNLENBQUNrQixZQUFyRDtBQUNBRCxPQUFLLENBQUNFLFlBQU4sR0FBcUJILEtBQXJCO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNdEIsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3FCLENBQUQsRUFBTztBQUN6QixNQUFNSyxRQUFRLEdBQUdqQyxRQUFRLENBQUNNLGNBQVQsbUJBQW1Dc0IsQ0FBbkMsRUFBakI7QUFDQSxNQUFNRSxLQUFLLEdBQUdGLENBQUMsS0FBSyxDQUFOLEdBQVVqQixNQUFNLENBQUNvQixZQUFqQixHQUFnQ2xCLE1BQU0sQ0FBQ2tCLFlBQXJEOztBQUNBLE1BQUlELEtBQUssQ0FBQ0ksTUFBVixFQUFrQjtBQUNoQkosU0FBSyxDQUFDSyxJQUFOO0FBQ0FGLFlBQVEsQ0FBQ0csU0FBVCxHQUFxQixPQUFyQjtBQUNELEdBSEQsTUFHTztBQUNMTixTQUFLLENBQUNPLEtBQU47QUFDQUosWUFBUSxDQUFDRyxTQUFULEdBQXFCLE1BQXJCO0FBQ0Q7QUFDRixDQVZELEM7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUFBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChhYy5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIGFjLnJlc3VtZSgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcEJ1dHRvbjEnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcGxheU9yUGF1c2UoMSk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BwQnV0dG9uMicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwbGF5T3JQYXVzZSgyKTtcbn0pO1xuXG5jb25zdCBhYyA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xuY29uc3QgdHJhY2sxID0gYWMuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhY2sxXCIpKTtcbmNvbnN0IHRyYWNrMiA9IGFjLmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWNrMlwiKSk7XG5cbmNvbnN0IGdhaW5Ob2RlMSA9IGFjLmNyZWF0ZUdhaW4oKTtcbmNvbnN0IGdhaW5Ob2RlMiA9IGFjLmNyZWF0ZUdhaW4oKTtcblxudHJhY2sxLmNvbm5lY3QoZ2Fpbk5vZGUxKS5jb25uZWN0KGFjLmRlc3RpbmF0aW9uKTtcbnRyYWNrMi5jb25uZWN0KGdhaW5Ob2RlMikuY29ubmVjdChhYy5kZXN0aW5hdGlvbik7XG5cbmNvbnN0IGNyb3NzZmFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyb3NzZmFkZXJcIik7XG5cbmNyb3NzZmFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGUgPT4ge1xuICBjb25zdCBpbnB1dFZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICBnYWluTm9kZTEuZ2Fpbi52YWx1ZSA9IDEuMCAtIGlucHV0VmFsdWU7XG4gIGdhaW5Ob2RlMi5nYWluLnZhbHVlID0gaW5wdXRWYWx1ZTtcbn0pO1xuXG5jb25zdCBzcGVlZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwZWVkMVwiKTtcbmNvbnN0IHNwZWVkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BlZWQyXCIpO1xuXG5zcGVlZDEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGUgPT4ge1xuICBjaGFuZ2VTcGVlZCgxLCBlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xufSk7XG5cbnNwZWVkMi5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZSA9PiB7XG4gIGNoYW5nZVNwZWVkKDIsIGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG59KTtcblxuY29uc3QgY2hhbmdlU3BlZWQgPSAobiwgc3BlZWQpID0+IHtcbiAgY29uc3QgYXVkaW8gPSBuID09PSAxID8gdHJhY2sxLm1lZGlhRWxlbWVudCA6IHRyYWNrMi5tZWRpYUVsZW1lbnQ7XG4gIGF1ZGlvLnBsYXliYWNrUmF0ZSA9IHNwZWVkO1xufVxuXG5jb25zdCBwbGF5T3JQYXVzZSA9IChuKSA9PiB7XG4gIGNvbnN0IHBwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBwQnV0dG9uJHtufWApO1xuICBjb25zdCBhdWRpbyA9IG4gPT09IDEgPyB0cmFjazEubWVkaWFFbGVtZW50IDogdHJhY2syLm1lZGlhRWxlbWVudDtcbiAgaWYgKGF1ZGlvLnBhdXNlZCkge1xuICAgIGF1ZGlvLnBsYXkoKTtcbiAgICBwcEJ1dHRvbi5pbm5lckhUTUwgPSBcInBhdXNlXCI7XG4gIH0gZWxzZSB7XG4gICAgYXVkaW8ucGF1c2UoKTtcbiAgICBwcEJ1dHRvbi5pbm5lckhUTUwgPSBcInBsYXlcIjtcbiAgfVxufTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9