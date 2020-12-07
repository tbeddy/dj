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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2Nzcz9lNGFhIl0sIm5hbWVzIjpbImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJhYyIsInN0YXRlIiwicmVzdW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJwbGF5T3JQYXVzZSIsIndpbmRvdyIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsInRyYWNrMSIsImNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZSIsInRyYWNrMiIsImdhaW5Ob2RlMSIsImNyZWF0ZUdhaW4iLCJnYWluTm9kZTIiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJjcm9zc2ZhZGVyIiwiZSIsImlucHV0VmFsdWUiLCJjdXJyZW50VGFyZ2V0IiwidmFsdWUiLCJnYWluIiwic3BlZWQxIiwic3BlZWQyIiwiY2hhbmdlU3BlZWQiLCJuIiwic3BlZWQiLCJhdWRpbyIsIm1lZGlhRWxlbWVudCIsInBsYXliYWNrUmF0ZSIsInBwQnV0dG9uIiwicGF1c2VkIiwicGxheSIsImlubmVySFRNTCIsInBhdXNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMs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QUFnQ2xCLE1BQU0sQ0FBQ2tCLFlBQXJEO0FBQ0FELE9BQUssQ0FBQ0UsWUFBTixHQUFxQkgsS0FBckI7QUFDRCxDQUhEOztBQUtBLElBQU10QixXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDcUIsQ0FBRCxFQUFPO0FBQ3pCLE1BQU1LLFFBQVEsR0FBR2pDLFFBQVEsQ0FBQ00sY0FBVCxtQkFBbUNzQixDQUFuQyxFQUFqQjtBQUNBLE1BQU1FLEtBQUssR0FBR0YsQ0FBQyxLQUFLLENBQU4sR0FBVWpCLE1BQU0sQ0FBQ29CLFlBQWpCLEdBQWdDbEIsTUFBTSxDQUFDa0IsWUFBckQ7O0FBQ0EsTUFBSUQsS0FBSyxDQUFDSSxNQUFWLEVBQWtCO0FBQ2hCSixTQUFLLENBQUNLLElBQU47QUFDQUYsWUFBUSxDQUFDRyxTQUFULEdBQXFCLE9BQXJCO0FBQ0QsR0FIRCxNQUdPO0FBQ0xOLFNBQUssQ0FBQ08sS0FBTjtBQUNBSixZQUFRLENBQUNHLFNBQVQsR0FBcUIsTUFBckI7QUFDRDtBQUNGLENBVkQsQzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFjLnN0YXRlID09PSAnc3VzcGVuZGVkJykgYWMucmVzdW1lKCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BwQnV0dG9uMScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwbGF5T3JQYXVzZSgxKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHBCdXR0b24yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHBsYXlPclBhdXNlKDIpO1xufSk7XG5cbmNvbnN0IGFjID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XG5jb25zdCB0cmFjazEgPSBhYy5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFjazFcIikpO1xuY29uc3QgdHJhY2syID0gYWMuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhY2syXCIpKTtcblxuY29uc3QgZ2Fpbk5vZGUxID0gYWMuY3JlYXRlR2FpbigpO1xuY29uc3QgZ2Fpbk5vZGUyID0gYWMuY3JlYXRlR2FpbigpO1xuXG50cmFjazEuY29ubmVjdChnYWluTm9kZTEpLmNvbm5lY3QoYWMuZGVzdGluYXRpb24pO1xudHJhY2syLmNvbm5lY3QoZ2Fpbk5vZGUyKS5jb25uZWN0KGFjLmRlc3RpbmF0aW9uKTtcblxuY29uc3QgY3Jvc3NmYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3Jvc3NmYWRlclwiKTtcblxuY3Jvc3NmYWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZSA9PiB7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gIGdhaW5Ob2RlMS5nYWluLnZhbHVlID0gMS4wIC0gaW5wdXRWYWx1ZTtcbiAgZ2Fpbk5vZGUyLmdhaW4udmFsdWUgPSBpbnB1dFZhbHVlO1xufSk7XG5cbmNvbnN0IHNwZWVkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BlZWQxXCIpO1xuY29uc3Qgc3BlZWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGVlZDJcIik7XG5cbnNwZWVkMS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZSA9PiB7XG4gIGNoYW5nZVNwZWVkKDEsIGUuY3VycmVudFRhcmdldC52YWx1ZSk7XG59KTtcblxuc3BlZWQyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBlID0+IHtcbiAgY2hhbmdlU3BlZWQoMiwgZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbn0pO1xuXG5jb25zdCBjaGFuZ2VTcGVlZCA9IChuLCBzcGVlZCkgPT4ge1xuICBjb25zdCBhdWRpbyA9IG4gPT09IDEgPyB0cmFjazEubWVkaWFFbGVtZW50IDogdHJhY2syLm1lZGlhRWxlbWVudDtcbiAgYXVkaW8ucGxheWJhY2tSYXRlID0gc3BlZWQ7XG59XG5cbmNvbnN0IHBsYXlPclBhdXNlID0gKG4pID0+IHtcbiAgY29uc3QgcHBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHBCdXR0b24ke259YCk7XG4gIGNvbnN0IGF1ZGlvID0gbiA9PT0gMSA/IHRyYWNrMS5tZWRpYUVsZW1lbnQgOiB0cmFjazIubWVkaWFFbGVtZW50O1xuICBpZiAoYXVkaW8ucGF1c2VkKSB7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHBwQnV0dG9uLmlubmVySFRNTCA9IFwicGF1c2VcIjtcbiAgfSBlbHNlIHtcbiAgICBhdWRpby5wYXVzZSgpO1xuICAgIHBwQnV0dG9uLmlubmVySFRNTCA9IFwicGxheVwiO1xuICB9XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJzb3VyY2VSb290IjoiIn0=