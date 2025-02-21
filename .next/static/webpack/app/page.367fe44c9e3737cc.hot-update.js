"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/ModelComparison/PerformanceComparison.tsx":
/*!**************************************************************!*\
  !*** ./components/ModelComparison/PerformanceComparison.tsx ***!
  \**************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PerformanceComparison: function() { return /* binding */ PerformanceComparison; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _ComparisonMetric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComparisonMetric */ \"(app-pages-browser)/./components/ModelComparison/ComparisonMetric.tsx\");\n/* __next_internal_client_entry_do_not_use__ PerformanceComparison auto */ \n\nfunction PerformanceComparison(param) {\n    let { baseModel, comparisonModel, powerMode, modelAGpu, modelBGpu } = param;\n    // Calculate GPU-accelerated metrics if GPU mode is enabled\n    const getGpuAdjustedMetrics = (model, useGpu)=>{\n        var _model_graph_metadata_modelId;\n        if (!useGpu) return model.performance;\n        const modelType = ((_model_graph_metadata_modelId = model.graph.metadata.modelId) === null || _model_graph_metadata_modelId === void 0 ? void 0 : _model_graph_metadata_modelId.toLowerCase()) || \"\";\n        let speedupFactor = 2; // Default GPU speedup\n        if (modelType.includes(\"transformer\")) speedupFactor = 4;\n        else if (modelType.includes(\"cnn\")) speedupFactor = 3;\n        else if (modelType.includes(\"yolo\")) speedupFactor = 2.8;\n        return {\n            inferenceTime: model.performance.inferenceTime / speedupFactor,\n            memoryPeak: model.performance.memoryPeak * 1.2,\n            deviceUtilization: model.performance.deviceUtilization * (useGpu ? 0.8 : 1 // GPU usually more efficient\n            )\n        };\n    };\n    const modelAMetrics = getGpuAdjustedMetrics(baseModel, modelAGpu);\n    const modelBMetrics = getGpuAdjustedMetrics(comparisonModel, modelBGpu);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"p-4 space-y-4 border-t\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ComparisonMetric__WEBPACK_IMPORTED_MODULE_1__.ComparisonMetric, {\n                label: \"Inference Time\",\n                valueA: modelAMetrics.inferenceTime,\n                valueB: modelBMetrics.inferenceTime,\n                unit: \"ms\",\n                powerMode: powerMode\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelComparison/PerformanceComparison.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ComparisonMetric__WEBPACK_IMPORTED_MODULE_1__.ComparisonMetric, {\n                label: \"Memory Usage\",\n                valueA: modelAMetrics.memoryPeak / (1024 * 1024),\n                valueB: modelBMetrics.memoryPeak / (1024 * 1024),\n                unit: \"MB\",\n                powerMode: powerMode\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelComparison/PerformanceComparison.tsx\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ComparisonMetric__WEBPACK_IMPORTED_MODULE_1__.ComparisonMetric, {\n                label: \"GPU Utilization\",\n                valueA: modelAMetrics.deviceUtilization * 100,\n                valueB: modelBMetrics.deviceUtilization * 100,\n                unit: \"%\",\n                powerMode: powerMode\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelComparison/PerformanceComparison.tsx\",\n                lineNumber: 59,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelComparison/PerformanceComparison.tsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n_c = PerformanceComparison;\nvar _c;\n$RefreshReg$(_c, \"PerformanceComparison\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTW9kZWxDb21wYXJpc29uL1BlcmZvcm1hbmNlQ29tcGFyaXNvbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlzRDtBQVUvQyxTQUFTQyxzQkFBc0IsS0FNVDtRQU5TLEVBQ3BDQyxTQUFTLEVBQ1RDLGVBQWUsRUFDZkMsU0FBUyxFQUNUQyxTQUFTLEVBQ1RDLFNBQVMsRUFDa0IsR0FOUztJQU9wQywyREFBMkQ7SUFDM0QsTUFBTUMsd0JBQXdCLENBQUNDLE9BQXVCQztZQUdsQ0Q7UUFGbEIsSUFBSSxDQUFDQyxRQUFRLE9BQU9ELE1BQU1FLFdBQVc7UUFFckMsTUFBTUMsWUFBWUgsRUFBQUEsZ0NBQUFBLE1BQU1JLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxPQUFPLGNBQTVCTixvREFBQUEsOEJBQThCTyxXQUFXLE9BQU07UUFDakUsSUFBSUMsZ0JBQWdCLEdBQUcsc0JBQXNCO1FBRTdDLElBQUlMLFVBQVVNLFFBQVEsQ0FBQyxnQkFBZ0JELGdCQUFnQjthQUNsRCxJQUFJTCxVQUFVTSxRQUFRLENBQUMsUUFBUUQsZ0JBQWdCO2FBQy9DLElBQUlMLFVBQVVNLFFBQVEsQ0FBQyxTQUFTRCxnQkFBZ0I7UUFFckQsT0FBTztZQUNMRSxlQUFlVixNQUFNRSxXQUFXLENBQUNRLGFBQWEsR0FBR0Y7WUFDakRHLFlBQVlYLE1BQU1FLFdBQVcsQ0FBQ1MsVUFBVSxHQUFHO1lBQzNDQyxtQkFBbUJaLE1BQU1FLFdBQVcsQ0FBQ1UsaUJBQWlCLEdBQUlYLENBQUFBLFNBQVMsTUFBTSxFQUFHLDZCQUE2QjtZQUFoQztRQUMzRTtJQUNGO0lBRUEsTUFBTVksZ0JBQWdCZCxzQkFBc0JMLFdBQVdHO0lBQ3ZELE1BQU1pQixnQkFBZ0JmLHNCQUFzQkosaUJBQWlCRztJQUU3RCxxQkFDRSw4REFBQ2lCO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDeEIsK0RBQWdCQTtnQkFDZnlCLE9BQU07Z0JBQ05DLFFBQVFMLGNBQWNILGFBQWE7Z0JBQ25DUyxRQUFRTCxjQUFjSixhQUFhO2dCQUNuQ1UsTUFBSztnQkFDTHhCLFdBQVdBOzs7Ozs7MEJBRWIsOERBQUNKLCtEQUFnQkE7Z0JBQ2Z5QixPQUFNO2dCQUNOQyxRQUFRTCxjQUFjRixVQUFVLEdBQUksUUFBTyxJQUFHO2dCQUM5Q1EsUUFBUUwsY0FBY0gsVUFBVSxHQUFJLFFBQU8sSUFBRztnQkFDOUNTLE1BQUs7Z0JBQ0x4QixXQUFXQTs7Ozs7OzBCQUViLDhEQUFDSiwrREFBZ0JBO2dCQUNmeUIsT0FBTTtnQkFDTkMsUUFBUUwsY0FBY0QsaUJBQWlCLEdBQUc7Z0JBQzFDTyxRQUFRTCxjQUFjRixpQkFBaUIsR0FBRztnQkFDMUNRLE1BQUs7Z0JBQ0x4QixXQUFXQTs7Ozs7Ozs7Ozs7O0FBSW5CO0tBckRnQkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Nb2RlbENvbXBhcmlzb24vUGVyZm9ybWFuY2VDb21wYXJpc29uLnRzeD8wODM5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyBjbiB9IGZyb20gJ0AvbGliL3V0aWxzJztcbmltcG9ydCB7IEFuYWx5c2lzUmVzdWx0IH0gZnJvbSAnQC9saWIvbW9kZWwvdHlwZXMnO1xuaW1wb3J0IHsgQ29tcGFyaXNvbk1ldHJpYyB9IGZyb20gJy4vQ29tcGFyaXNvbk1ldHJpYyc7XG5cbnR5cGUgUGVyZm9ybWFuY2VDb21wYXJpc29uUHJvcHMgPSB7XG4gIGJhc2VNb2RlbDogQW5hbHlzaXNSZXN1bHQ7XG4gIGNvbXBhcmlzb25Nb2RlbDogQW5hbHlzaXNSZXN1bHQ7XG4gIHBvd2VyTW9kZTogYm9vbGVhbjtcbiAgbW9kZWxBR3B1OiBib29sZWFuO1xuICBtb2RlbEJHcHU6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gUGVyZm9ybWFuY2VDb21wYXJpc29uKHtcbiAgYmFzZU1vZGVsLFxuICBjb21wYXJpc29uTW9kZWwsXG4gIHBvd2VyTW9kZSxcbiAgbW9kZWxBR3B1LFxuICBtb2RlbEJHcHVcbn06IFBlcmZvcm1hbmNlQ29tcGFyaXNvblByb3BzKSB7XG4gIC8vIENhbGN1bGF0ZSBHUFUtYWNjZWxlcmF0ZWQgbWV0cmljcyBpZiBHUFUgbW9kZSBpcyBlbmFibGVkXG4gIGNvbnN0IGdldEdwdUFkanVzdGVkTWV0cmljcyA9IChtb2RlbDogQW5hbHlzaXNSZXN1bHQsIHVzZUdwdTogYm9vbGVhbikgPT4ge1xuICAgIGlmICghdXNlR3B1KSByZXR1cm4gbW9kZWwucGVyZm9ybWFuY2U7XG5cbiAgICBjb25zdCBtb2RlbFR5cGUgPSBtb2RlbC5ncmFwaC5tZXRhZGF0YS5tb2RlbElkPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgIGxldCBzcGVlZHVwRmFjdG9yID0gMjsgLy8gRGVmYXVsdCBHUFUgc3BlZWR1cFxuXG4gICAgaWYgKG1vZGVsVHlwZS5pbmNsdWRlcygndHJhbnNmb3JtZXInKSkgc3BlZWR1cEZhY3RvciA9IDQ7XG4gICAgZWxzZSBpZiAobW9kZWxUeXBlLmluY2x1ZGVzKCdjbm4nKSkgc3BlZWR1cEZhY3RvciA9IDM7XG4gICAgZWxzZSBpZiAobW9kZWxUeXBlLmluY2x1ZGVzKCd5b2xvJykpIHNwZWVkdXBGYWN0b3IgPSAyLjg7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaW5mZXJlbmNlVGltZTogbW9kZWwucGVyZm9ybWFuY2UuaW5mZXJlbmNlVGltZSAvIHNwZWVkdXBGYWN0b3IsXG4gICAgICBtZW1vcnlQZWFrOiBtb2RlbC5wZXJmb3JtYW5jZS5tZW1vcnlQZWFrICogMS4yLCAvLyBHUFUgdHlwaWNhbGx5IHVzZXMgbW9yZSBtZW1vcnlcbiAgICAgIGRldmljZVV0aWxpemF0aW9uOiBtb2RlbC5wZXJmb3JtYW5jZS5kZXZpY2VVdGlsaXphdGlvbiAqICh1c2VHcHUgPyAwLjggOiAxKSAvLyBHUFUgdXN1YWxseSBtb3JlIGVmZmljaWVudFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbW9kZWxBTWV0cmljcyA9IGdldEdwdUFkanVzdGVkTWV0cmljcyhiYXNlTW9kZWwsIG1vZGVsQUdwdSk7XG4gIGNvbnN0IG1vZGVsQk1ldHJpY3MgPSBnZXRHcHVBZGp1c3RlZE1ldHJpY3MoY29tcGFyaXNvbk1vZGVsLCBtb2RlbEJHcHUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc3BhY2UteS00IGJvcmRlci10XCI+XG4gICAgICA8Q29tcGFyaXNvbk1ldHJpY1xuICAgICAgICBsYWJlbD1cIkluZmVyZW5jZSBUaW1lXCJcbiAgICAgICAgdmFsdWVBPXttb2RlbEFNZXRyaWNzLmluZmVyZW5jZVRpbWV9XG4gICAgICAgIHZhbHVlQj17bW9kZWxCTWV0cmljcy5pbmZlcmVuY2VUaW1lfVxuICAgICAgICB1bml0PVwibXNcIlxuICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgIC8+XG4gICAgICA8Q29tcGFyaXNvbk1ldHJpY1xuICAgICAgICBsYWJlbD1cIk1lbW9yeSBVc2FnZVwiXG4gICAgICAgIHZhbHVlQT17bW9kZWxBTWV0cmljcy5tZW1vcnlQZWFrIC8gKDEwMjQgKiAxMDI0KX1cbiAgICAgICAgdmFsdWVCPXttb2RlbEJNZXRyaWNzLm1lbW9yeVBlYWsgLyAoMTAyNCAqIDEwMjQpfVxuICAgICAgICB1bml0PVwiTUJcIlxuICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgIC8+XG4gICAgICA8Q29tcGFyaXNvbk1ldHJpY1xuICAgICAgICBsYWJlbD1cIkdQVSBVdGlsaXphdGlvblwiXG4gICAgICAgIHZhbHVlQT17bW9kZWxBTWV0cmljcy5kZXZpY2VVdGlsaXphdGlvbiAqIDEwMH1cbiAgICAgICAgdmFsdWVCPXttb2RlbEJNZXRyaWNzLmRldmljZVV0aWxpemF0aW9uICogMTAwfVxuICAgICAgICB1bml0PVwiJVwiXG4gICAgICAgIHBvd2VyTW9kZT17cG93ZXJNb2RlfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsiQ29tcGFyaXNvbk1ldHJpYyIsIlBlcmZvcm1hbmNlQ29tcGFyaXNvbiIsImJhc2VNb2RlbCIsImNvbXBhcmlzb25Nb2RlbCIsInBvd2VyTW9kZSIsIm1vZGVsQUdwdSIsIm1vZGVsQkdwdSIsImdldEdwdUFkanVzdGVkTWV0cmljcyIsIm1vZGVsIiwidXNlR3B1IiwicGVyZm9ybWFuY2UiLCJtb2RlbFR5cGUiLCJncmFwaCIsIm1ldGFkYXRhIiwibW9kZWxJZCIsInRvTG93ZXJDYXNlIiwic3BlZWR1cEZhY3RvciIsImluY2x1ZGVzIiwiaW5mZXJlbmNlVGltZSIsIm1lbW9yeVBlYWsiLCJkZXZpY2VVdGlsaXphdGlvbiIsIm1vZGVsQU1ldHJpY3MiLCJtb2RlbEJNZXRyaWNzIiwiZGl2IiwiY2xhc3NOYW1lIiwibGFiZWwiLCJ2YWx1ZUEiLCJ2YWx1ZUIiLCJ1bml0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ModelComparison/PerformanceComparison.tsx\n"));

/***/ })

});