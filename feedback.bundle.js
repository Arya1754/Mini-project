/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/feedback.js":
/*!*******************************!*\
  !*** ./assets/js/feedback.js ***!
  \*******************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\r\n    const stars = document.querySelectorAll('.stars input');\r\n    const reviewText = document.getElementById('reviewText');\r\n    const submitReviewBtn = document.getElementById('submitReview');\r\n\r\n    submitReviewBtn.addEventListener('click', function() {\r\n        const rating = getRating();\r\n        const review = reviewText.value.trim();\r\n\r\n        if (rating === 0) {\r\n            alert('Please select a rating.');\r\n            return;\r\n        }\r\n\r\n        if (review === '') {\r\n            alert('Please write your review.');\r\n            return;\r\n        }\r\n\r\n        // Here, you can submit the rating and review to your backend or perform any other action\r\n        alert('Rating: ' + rating + ', Review: ' + review);\r\n        // Clear the form after submission\r\n        resetForm();\r\n    });\r\n\r\n    function getRating() {\r\n        let rating = 0;\r\n        stars.forEach(function(star) {\r\n            if (star.checked) {\r\n                rating = parseInt(star.value);\r\n            }\r\n        });\r\n        return rating;\r\n    }\r\n\r\n    function resetForm() {\r\n        stars.forEach(function(star) {\r\n            star.checked = false;\r\n        });\r\n        reviewText.value = '';\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://mini-project/./assets/js/feedback.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/feedback.js"]();
/******/ 	
/******/ })()
;