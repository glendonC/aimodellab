/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/potpack";
exports.ids = ["vendor-chunks/potpack"];
exports.modules = {

/***/ "(ssr)/./node_modules/potpack/index.js":
/*!***************************************!*\
  !*** ./node_modules/potpack/index.js ***!
  \***************************************/
/***/ (function(module) {

eval("(function (global, factory) {\n true ? module.exports = factory() :\n0;\n})(this, (function () { 'use strict';\n\nfunction potpack(boxes) {\n\n    // calculate total box area and maximum box width\n    var area = 0;\n    var maxWidth = 0;\n\n    for (var i$1 = 0, list = boxes; i$1 < list.length; i$1 += 1) {\n        var box = list[i$1];\n\n        area += box.w * box.h;\n        maxWidth = Math.max(maxWidth, box.w);\n    }\n\n    // sort the boxes for insertion by height, descending\n    boxes.sort(function (a, b) { return b.h - a.h; });\n\n    // aim for a squarish resulting container,\n    // slightly adjusted for sub-100% space utilization\n    var startWidth = Math.max(Math.ceil(Math.sqrt(area / 0.95)), maxWidth);\n\n    // start with a single empty space, unbounded at the bottom\n    var spaces = [{x: 0, y: 0, w: startWidth, h: Infinity}];\n\n    var width = 0;\n    var height = 0;\n\n    for (var i$2 = 0, list$1 = boxes; i$2 < list$1.length; i$2 += 1) {\n        // look through spaces backwards so that we check smaller spaces first\n        var box$1 = list$1[i$2];\n\n        for (var i = spaces.length - 1; i >= 0; i--) {\n            var space = spaces[i];\n\n            // look for empty spaces that can accommodate the current box\n            if (box$1.w > space.w || box$1.h > space.h) { continue; }\n\n            // found the space; add the box to its top-left corner\n            // |-------|-------|\n            // |  box  |       |\n            // |_______|       |\n            // |         space |\n            // |_______________|\n            box$1.x = space.x;\n            box$1.y = space.y;\n\n            height = Math.max(height, box$1.y + box$1.h);\n            width = Math.max(width, box$1.x + box$1.w);\n\n            if (box$1.w === space.w && box$1.h === space.h) {\n                // space matches the box exactly; remove it\n                var last = spaces.pop();\n                if (i < spaces.length) { spaces[i] = last; }\n\n            } else if (box$1.h === space.h) {\n                // space matches the box height; update it accordingly\n                // |-------|---------------|\n                // |  box  | updated space |\n                // |_______|_______________|\n                space.x += box$1.w;\n                space.w -= box$1.w;\n\n            } else if (box$1.w === space.w) {\n                // space matches the box width; update it accordingly\n                // |---------------|\n                // |      box      |\n                // |_______________|\n                // | updated space |\n                // |_______________|\n                space.y += box$1.h;\n                space.h -= box$1.h;\n\n            } else {\n                // otherwise the box splits the space into two spaces\n                // |-------|-----------|\n                // |  box  | new space |\n                // |_______|___________|\n                // | updated space     |\n                // |___________________|\n                spaces.push({\n                    x: space.x + box$1.w,\n                    y: space.y,\n                    w: space.w - box$1.w,\n                    h: box$1.h\n                });\n                space.y += box$1.h;\n                space.h -= box$1.h;\n            }\n            break;\n        }\n    }\n\n    return {\n        w: width, // container width\n        h: height, // container height\n        fill: (area / (width * height)) || 0 // space utilization\n    };\n}\n\nreturn potpack;\n\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG90cGFjay9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLEtBQTREO0FBQzVELENBQ3NHO0FBQ3RHLENBQUMsdUJBQXVCOztBQUV4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLG1CQUFtQjtBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQ0FBaUMsbUJBQW1COztBQUVwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsdUNBQXVDOztBQUUxRDtBQUNBOztBQUVBLHNDQUFzQyxxQkFBcUI7QUFDM0Q7QUFDQTs7QUFFQSx3Q0FBd0MsUUFBUTtBQUNoRDs7QUFFQTtBQUNBLDBEQUEwRDs7QUFFMUQsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSx5Q0FBeUM7O0FBRXpDLGNBQWM7QUFDZCxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjO0FBQ2QsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy8uL25vZGVfbW9kdWxlcy9wb3RwYWNrL2luZGV4LmpzPzRhNmYiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbnR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbnR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4oZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwucG90cGFjayA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHBvdHBhY2soYm94ZXMpIHtcblxuICAgIC8vIGNhbGN1bGF0ZSB0b3RhbCBib3ggYXJlYSBhbmQgbWF4aW11bSBib3ggd2lkdGhcbiAgICB2YXIgYXJlYSA9IDA7XG4gICAgdmFyIG1heFdpZHRoID0gMDtcblxuICAgIGZvciAodmFyIGkkMSA9IDAsIGxpc3QgPSBib3hlczsgaSQxIDwgbGlzdC5sZW5ndGg7IGkkMSArPSAxKSB7XG4gICAgICAgIHZhciBib3ggPSBsaXN0W2kkMV07XG5cbiAgICAgICAgYXJlYSArPSBib3gudyAqIGJveC5oO1xuICAgICAgICBtYXhXaWR0aCA9IE1hdGgubWF4KG1heFdpZHRoLCBib3gudyk7XG4gICAgfVxuXG4gICAgLy8gc29ydCB0aGUgYm94ZXMgZm9yIGluc2VydGlvbiBieSBoZWlnaHQsIGRlc2NlbmRpbmdcbiAgICBib3hlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBiLmggLSBhLmg7IH0pO1xuXG4gICAgLy8gYWltIGZvciBhIHNxdWFyaXNoIHJlc3VsdGluZyBjb250YWluZXIsXG4gICAgLy8gc2xpZ2h0bHkgYWRqdXN0ZWQgZm9yIHN1Yi0xMDAlIHNwYWNlIHV0aWxpemF0aW9uXG4gICAgdmFyIHN0YXJ0V2lkdGggPSBNYXRoLm1heChNYXRoLmNlaWwoTWF0aC5zcXJ0KGFyZWEgLyAwLjk1KSksIG1heFdpZHRoKTtcblxuICAgIC8vIHN0YXJ0IHdpdGggYSBzaW5nbGUgZW1wdHkgc3BhY2UsIHVuYm91bmRlZCBhdCB0aGUgYm90dG9tXG4gICAgdmFyIHNwYWNlcyA9IFt7eDogMCwgeTogMCwgdzogc3RhcnRXaWR0aCwgaDogSW5maW5pdHl9XTtcblxuICAgIHZhciB3aWR0aCA9IDA7XG4gICAgdmFyIGhlaWdodCA9IDA7XG5cbiAgICBmb3IgKHZhciBpJDIgPSAwLCBsaXN0JDEgPSBib3hlczsgaSQyIDwgbGlzdCQxLmxlbmd0aDsgaSQyICs9IDEpIHtcbiAgICAgICAgLy8gbG9vayB0aHJvdWdoIHNwYWNlcyBiYWNrd2FyZHMgc28gdGhhdCB3ZSBjaGVjayBzbWFsbGVyIHNwYWNlcyBmaXJzdFxuICAgICAgICB2YXIgYm94JDEgPSBsaXN0JDFbaSQyXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gc3BhY2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgc3BhY2UgPSBzcGFjZXNbaV07XG5cbiAgICAgICAgICAgIC8vIGxvb2sgZm9yIGVtcHR5IHNwYWNlcyB0aGF0IGNhbiBhY2NvbW1vZGF0ZSB0aGUgY3VycmVudCBib3hcbiAgICAgICAgICAgIGlmIChib3gkMS53ID4gc3BhY2UudyB8fCBib3gkMS5oID4gc3BhY2UuaCkgeyBjb250aW51ZTsgfVxuXG4gICAgICAgICAgICAvLyBmb3VuZCB0aGUgc3BhY2U7IGFkZCB0aGUgYm94IHRvIGl0cyB0b3AtbGVmdCBjb3JuZXJcbiAgICAgICAgICAgIC8vIHwtLS0tLS0tfC0tLS0tLS18XG4gICAgICAgICAgICAvLyB8ICBib3ggIHwgICAgICAgfFxuICAgICAgICAgICAgLy8gfF9fX19fX198ICAgICAgIHxcbiAgICAgICAgICAgIC8vIHwgICAgICAgICBzcGFjZSB8XG4gICAgICAgICAgICAvLyB8X19fX19fX19fX19fX19ffFxuICAgICAgICAgICAgYm94JDEueCA9IHNwYWNlLng7XG4gICAgICAgICAgICBib3gkMS55ID0gc3BhY2UueTtcblxuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCBib3gkMS55ICsgYm94JDEuaCk7XG4gICAgICAgICAgICB3aWR0aCA9IE1hdGgubWF4KHdpZHRoLCBib3gkMS54ICsgYm94JDEudyk7XG5cbiAgICAgICAgICAgIGlmIChib3gkMS53ID09PSBzcGFjZS53ICYmIGJveCQxLmggPT09IHNwYWNlLmgpIHtcbiAgICAgICAgICAgICAgICAvLyBzcGFjZSBtYXRjaGVzIHRoZSBib3ggZXhhY3RseTsgcmVtb3ZlIGl0XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBzcGFjZXMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBzcGFjZXMubGVuZ3RoKSB7IHNwYWNlc1tpXSA9IGxhc3Q7IH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChib3gkMS5oID09PSBzcGFjZS5oKSB7XG4gICAgICAgICAgICAgICAgLy8gc3BhY2UgbWF0Y2hlcyB0aGUgYm94IGhlaWdodDsgdXBkYXRlIGl0IGFjY29yZGluZ2x5XG4gICAgICAgICAgICAgICAgLy8gfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tfFxuICAgICAgICAgICAgICAgIC8vIHwgIGJveCAgfCB1cGRhdGVkIHNwYWNlIHxcbiAgICAgICAgICAgICAgICAvLyB8X19fX19fX3xfX19fX19fX19fX19fX198XG4gICAgICAgICAgICAgICAgc3BhY2UueCArPSBib3gkMS53O1xuICAgICAgICAgICAgICAgIHNwYWNlLncgLT0gYm94JDEudztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChib3gkMS53ID09PSBzcGFjZS53KSB7XG4gICAgICAgICAgICAgICAgLy8gc3BhY2UgbWF0Y2hlcyB0aGUgYm94IHdpZHRoOyB1cGRhdGUgaXQgYWNjb3JkaW5nbHlcbiAgICAgICAgICAgICAgICAvLyB8LS0tLS0tLS0tLS0tLS0tfFxuICAgICAgICAgICAgICAgIC8vIHwgICAgICBib3ggICAgICB8XG4gICAgICAgICAgICAgICAgLy8gfF9fX19fX19fX19fX19fX3xcbiAgICAgICAgICAgICAgICAvLyB8IHVwZGF0ZWQgc3BhY2UgfFxuICAgICAgICAgICAgICAgIC8vIHxfX19fX19fX19fX19fX198XG4gICAgICAgICAgICAgICAgc3BhY2UueSArPSBib3gkMS5oO1xuICAgICAgICAgICAgICAgIHNwYWNlLmggLT0gYm94JDEuaDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgdGhlIGJveCBzcGxpdHMgdGhlIHNwYWNlIGludG8gdHdvIHNwYWNlc1xuICAgICAgICAgICAgICAgIC8vIHwtLS0tLS0tfC0tLS0tLS0tLS0tfFxuICAgICAgICAgICAgICAgIC8vIHwgIGJveCAgfCBuZXcgc3BhY2UgfFxuICAgICAgICAgICAgICAgIC8vIHxfX19fX19ffF9fX19fX19fX19ffFxuICAgICAgICAgICAgICAgIC8vIHwgdXBkYXRlZCBzcGFjZSAgICAgfFxuICAgICAgICAgICAgICAgIC8vIHxfX19fX19fX19fX19fX19fX19ffFxuICAgICAgICAgICAgICAgIHNwYWNlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogc3BhY2UueCArIGJveCQxLncsXG4gICAgICAgICAgICAgICAgICAgIHk6IHNwYWNlLnksXG4gICAgICAgICAgICAgICAgICAgIHc6IHNwYWNlLncgLSBib3gkMS53LFxuICAgICAgICAgICAgICAgICAgICBoOiBib3gkMS5oXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3BhY2UueSArPSBib3gkMS5oO1xuICAgICAgICAgICAgICAgIHNwYWNlLmggLT0gYm94JDEuaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdzogd2lkdGgsIC8vIGNvbnRhaW5lciB3aWR0aFxuICAgICAgICBoOiBoZWlnaHQsIC8vIGNvbnRhaW5lciBoZWlnaHRcbiAgICAgICAgZmlsbDogKGFyZWEgLyAod2lkdGggKiBoZWlnaHQpKSB8fCAwIC8vIHNwYWNlIHV0aWxpemF0aW9uXG4gICAgfTtcbn1cblxucmV0dXJuIHBvdHBhY2s7XG5cbn0pKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/potpack/index.js\n");

/***/ })

};
;