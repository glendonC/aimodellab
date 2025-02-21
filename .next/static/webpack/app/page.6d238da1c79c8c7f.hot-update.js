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

/***/ "(app-pages-browser)/./lib/model/performance.ts":
/*!**********************************!*\
  !*** ./lib/model/performance.ts ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PerformanceCalculator: function() { return /* binding */ PerformanceCalculator; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"(app-pages-browser)/./lib/model/constants.ts\");\n\nclass PerformanceCalculator {\n    calculateMetrics(analysisResult, gpuEnabled) {\n        var _analysisResult_graph_metadata, _analysisResult_graph;\n        if (!(analysisResult === null || analysisResult === void 0 ? void 0 : (_analysisResult_graph = analysisResult.graph) === null || _analysisResult_graph === void 0 ? void 0 : (_analysisResult_graph_metadata = _analysisResult_graph.metadata) === null || _analysisResult_graph_metadata === void 0 ? void 0 : _analysisResult_graph_metadata.modelId)) {\n            return this.getDefaultMetrics();\n        }\n        // Get the model type from the ID\n        const modelType = this.getModelType(analysisResult.graph.metadata.modelId);\n        const benchmarks = _constants__WEBPACK_IMPORTED_MODULE_0__.MODEL_BENCHMARKS[modelType];\n        if (!benchmarks) {\n            return this.getDefaultMetrics();\n        }\n        // Get CPU metrics\n        const cpuMetrics = {\n            fps: benchmarks.cpu.inferenceSpeed,\n            latency: benchmarks.cpu.latency,\n            memory: benchmarks.cpu.memoryUsage / 1024,\n            utilization: benchmarks.cpu.utilization\n        };\n        // If GPU is not enabled, return only CPU metrics\n        if (!gpuEnabled) {\n            return {\n                cpuMetrics,\n                gpuMetrics: null,\n                nvOptimizations: {\n                    tensorCoreUsage: benchmarks.gpu.tensorCoreUsage,\n                    memoryBandwidth: benchmarks.gpu.memoryBandwidth,\n                    speedup: benchmarks.gpu.speedup\n                }\n            };\n        }\n        // Get GPU metrics\n        const gpuMetrics = {\n            fps: benchmarks.gpu.inferenceSpeed,\n            latency: benchmarks.gpu.latency,\n            memory: benchmarks.gpu.memoryUsage / 1024,\n            utilization: benchmarks.gpu.utilization\n        };\n        return {\n            cpuMetrics,\n            gpuMetrics,\n            nvOptimizations: {\n                tensorCoreUsage: benchmarks.gpu.tensorCoreUsage,\n                memoryBandwidth: benchmarks.gpu.memoryBandwidth,\n                speedup: benchmarks.gpu.speedup\n            }\n        };\n    }\n    getModelType(modelId) {\n        modelId = modelId.toLowerCase();\n        if (modelId.includes(\"resnet\")) return \"resnet-50\";\n        if (modelId.includes(\"yolo\")) return \"yolov8\";\n        if (modelId.includes(\"stable\")) return \"stable-diffusion\";\n        if (modelId.includes(\"llama\")) return \"llama2\";\n        if (modelId.includes(\"gpt\")) return \"gpt2\";\n        if (modelId.includes(\"bart\")) return \"bart\";\n        if (modelId.includes(\"whisper\")) return \"whisper\";\n        if (modelId.includes(\"vit\")) return \"vit\";\n        if (modelId.includes(\"biobert\")) return \"biobert\";\n        if (modelId.includes(\"dino\")) return \"dinov2\";\n        // Default to resnet if no match\n        return \"resnet-50\";\n    }\n    getDefaultMetrics() {\n        // Use ResNet-50 as default\n        return this.calculateMetrics({\n            graph: {\n                metadata: {\n                    modelId: \"resnet-50\"\n                },\n                layers: []\n            }\n        }, false);\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9tb2RlbC9wZXJmb3JtYW5jZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUErQztBQXVCeEMsTUFBTUM7SUFDWEMsaUJBQWlCQyxjQUFxQyxFQUFFQyxVQUFtQixFQUFzQjtZQUMxRkQsZ0NBQUFBO1FBQUwsSUFBSSxFQUFDQSwyQkFBQUEsc0NBQUFBLHdCQUFBQSxlQUFnQkUsS0FBSyxjQUFyQkYsNkNBQUFBLGlDQUFBQSxzQkFBdUJHLFFBQVEsY0FBL0JILHFEQUFBQSwrQkFBaUNJLE9BQU8sR0FBRTtZQUM3QyxPQUFPLElBQUksQ0FBQ0MsaUJBQWlCO1FBQy9CO1FBRUEsaUNBQWlDO1FBQ2pDLE1BQU1DLFlBQVksSUFBSSxDQUFDQyxZQUFZLENBQUNQLGVBQWVFLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxPQUFPO1FBQ3pFLE1BQU1JLGFBQWFYLHdEQUFnQixDQUFDUyxVQUFVO1FBRTlDLElBQUksQ0FBQ0UsWUFBWTtZQUNmLE9BQU8sSUFBSSxDQUFDSCxpQkFBaUI7UUFDL0I7UUFFQSxrQkFBa0I7UUFDbEIsTUFBTUksYUFBYTtZQUNqQkMsS0FBS0YsV0FBV0csR0FBRyxDQUFDQyxjQUFjO1lBQ2xDQyxTQUFTTCxXQUFXRyxHQUFHLENBQUNFLE9BQU87WUFDL0JDLFFBQVFOLFdBQVdHLEdBQUcsQ0FBQ0ksV0FBVyxHQUFHO1lBQ3JDQyxhQUFhUixXQUFXRyxHQUFHLENBQUNLLFdBQVc7UUFDekM7UUFFQSxpREFBaUQ7UUFDakQsSUFBSSxDQUFDZixZQUFZO1lBQ2YsT0FBTztnQkFDTFE7Z0JBQ0FRLFlBQVk7Z0JBQ1pDLGlCQUFpQjtvQkFDZkMsaUJBQWlCWCxXQUFXWSxHQUFHLENBQUNELGVBQWU7b0JBQy9DRSxpQkFBaUJiLFdBQVdZLEdBQUcsQ0FBQ0MsZUFBZTtvQkFDL0NDLFNBQVNkLFdBQVdZLEdBQUcsQ0FBQ0UsT0FBTztnQkFDakM7WUFDRjtRQUNGO1FBRUEsa0JBQWtCO1FBQ2xCLE1BQU1MLGFBQWE7WUFDakJQLEtBQUtGLFdBQVdZLEdBQUcsQ0FBQ1IsY0FBYztZQUNsQ0MsU0FBU0wsV0FBV1ksR0FBRyxDQUFDUCxPQUFPO1lBQy9CQyxRQUFRTixXQUFXWSxHQUFHLENBQUNMLFdBQVcsR0FBRztZQUNyQ0MsYUFBYVIsV0FBV1ksR0FBRyxDQUFDSixXQUFXO1FBQ3pDO1FBRUEsT0FBTztZQUNMUDtZQUNBUTtZQUNBQyxpQkFBaUI7Z0JBQ2ZDLGlCQUFpQlgsV0FBV1ksR0FBRyxDQUFDRCxlQUFlO2dCQUMvQ0UsaUJBQWlCYixXQUFXWSxHQUFHLENBQUNDLGVBQWU7Z0JBQy9DQyxTQUFTZCxXQUFXWSxHQUFHLENBQUNFLE9BQU87WUFDakM7UUFDRjtJQUNGO0lBRVFmLGFBQWFILE9BQWUsRUFBVTtRQUM1Q0EsVUFBVUEsUUFBUW1CLFdBQVc7UUFFN0IsSUFBSW5CLFFBQVFvQixRQUFRLENBQUMsV0FBVyxPQUFPO1FBQ3ZDLElBQUlwQixRQUFRb0IsUUFBUSxDQUFDLFNBQVMsT0FBTztRQUNyQyxJQUFJcEIsUUFBUW9CLFFBQVEsQ0FBQyxXQUFXLE9BQU87UUFDdkMsSUFBSXBCLFFBQVFvQixRQUFRLENBQUMsVUFBVSxPQUFPO1FBQ3RDLElBQUlwQixRQUFRb0IsUUFBUSxDQUFDLFFBQVEsT0FBTztRQUNwQyxJQUFJcEIsUUFBUW9CLFFBQVEsQ0FBQyxTQUFTLE9BQU87UUFDckMsSUFBSXBCLFFBQVFvQixRQUFRLENBQUMsWUFBWSxPQUFPO1FBQ3hDLElBQUlwQixRQUFRb0IsUUFBUSxDQUFDLFFBQVEsT0FBTztRQUNwQyxJQUFJcEIsUUFBUW9CLFFBQVEsQ0FBQyxZQUFZLE9BQU87UUFDeEMsSUFBSXBCLFFBQVFvQixRQUFRLENBQUMsU0FBUyxPQUFPO1FBRXJDLGdDQUFnQztRQUNoQyxPQUFPO0lBQ1Q7SUFFUW5CLG9CQUF3QztRQUM5QywyQkFBMkI7UUFDM0IsT0FBTyxJQUFJLENBQUNOLGdCQUFnQixDQUFDO1lBQzNCRyxPQUFPO2dCQUNMQyxVQUFVO29CQUFFQyxTQUFTO2dCQUFZO2dCQUNqQ3FCLFFBQVEsRUFBRTtZQUNaO1FBQ0YsR0FBRztJQUNMO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL21vZGVsL3BlcmZvcm1hbmNlLnRzP2RiNTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTU9ERUxfQkVOQ0hNQVJLUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgQW5hbHlzaXNSZXN1bHQgfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFBlcmZvcm1hbmNlTWV0cmljcyB7XG4gIGNwdU1ldHJpY3M6IHtcbiAgICBmcHM6IG51bWJlcjtcbiAgICBsYXRlbmN5OiBudW1iZXI7XG4gICAgbWVtb3J5OiBudW1iZXI7XG4gICAgdXRpbGl6YXRpb246IG51bWJlcjtcbiAgfTtcbiAgZ3B1TWV0cmljczoge1xuICAgIGZwczogbnVtYmVyO1xuICAgIGxhdGVuY3k6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgICB1dGlsaXphdGlvbjogbnVtYmVyO1xuICB9O1xuICBudk9wdGltaXphdGlvbnM6IHtcbiAgICB0ZW5zb3JDb3JlVXNhZ2U6IHN0cmluZztcbiAgICBtZW1vcnlCYW5kd2lkdGg6IHN0cmluZztcbiAgICBzcGVlZHVwOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBQZXJmb3JtYW5jZUNhbGN1bGF0b3Ige1xuICBjYWxjdWxhdGVNZXRyaWNzKGFuYWx5c2lzUmVzdWx0OiBBbmFseXNpc1Jlc3VsdCB8IG51bGwsIGdwdUVuYWJsZWQ6IGJvb2xlYW4pOiBQZXJmb3JtYW5jZU1ldHJpY3Mge1xuICAgIGlmICghYW5hbHlzaXNSZXN1bHQ/LmdyYXBoPy5tZXRhZGF0YT8ubW9kZWxJZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdE1ldHJpY3MoKTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG1vZGVsIHR5cGUgZnJvbSB0aGUgSURcbiAgICBjb25zdCBtb2RlbFR5cGUgPSB0aGlzLmdldE1vZGVsVHlwZShhbmFseXNpc1Jlc3VsdC5ncmFwaC5tZXRhZGF0YS5tb2RlbElkKTtcbiAgICBjb25zdCBiZW5jaG1hcmtzID0gTU9ERUxfQkVOQ0hNQVJLU1ttb2RlbFR5cGVdO1xuXG4gICAgaWYgKCFiZW5jaG1hcmtzKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0TWV0cmljcygpO1xuICAgIH1cblxuICAgIC8vIEdldCBDUFUgbWV0cmljc1xuICAgIGNvbnN0IGNwdU1ldHJpY3MgPSB7XG4gICAgICBmcHM6IGJlbmNobWFya3MuY3B1LmluZmVyZW5jZVNwZWVkLFxuICAgICAgbGF0ZW5jeTogYmVuY2htYXJrcy5jcHUubGF0ZW5jeSxcbiAgICAgIG1lbW9yeTogYmVuY2htYXJrcy5jcHUubWVtb3J5VXNhZ2UgLyAxMDI0LCAvLyBDb252ZXJ0IHRvIEdCXG4gICAgICB1dGlsaXphdGlvbjogYmVuY2htYXJrcy5jcHUudXRpbGl6YXRpb25cbiAgICB9O1xuXG4gICAgLy8gSWYgR1BVIGlzIG5vdCBlbmFibGVkLCByZXR1cm4gb25seSBDUFUgbWV0cmljc1xuICAgIGlmICghZ3B1RW5hYmxlZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY3B1TWV0cmljcyxcbiAgICAgICAgZ3B1TWV0cmljczogbnVsbCxcbiAgICAgICAgbnZPcHRpbWl6YXRpb25zOiB7XG4gICAgICAgICAgdGVuc29yQ29yZVVzYWdlOiBiZW5jaG1hcmtzLmdwdS50ZW5zb3JDb3JlVXNhZ2UsXG4gICAgICAgICAgbWVtb3J5QmFuZHdpZHRoOiBiZW5jaG1hcmtzLmdwdS5tZW1vcnlCYW5kd2lkdGgsXG4gICAgICAgICAgc3BlZWR1cDogYmVuY2htYXJrcy5ncHUuc3BlZWR1cFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEdldCBHUFUgbWV0cmljc1xuICAgIGNvbnN0IGdwdU1ldHJpY3MgPSB7XG4gICAgICBmcHM6IGJlbmNobWFya3MuZ3B1LmluZmVyZW5jZVNwZWVkLFxuICAgICAgbGF0ZW5jeTogYmVuY2htYXJrcy5ncHUubGF0ZW5jeSxcbiAgICAgIG1lbW9yeTogYmVuY2htYXJrcy5ncHUubWVtb3J5VXNhZ2UgLyAxMDI0LCAvLyBDb252ZXJ0IHRvIEdCXG4gICAgICB1dGlsaXphdGlvbjogYmVuY2htYXJrcy5ncHUudXRpbGl6YXRpb25cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNwdU1ldHJpY3MsXG4gICAgICBncHVNZXRyaWNzLFxuICAgICAgbnZPcHRpbWl6YXRpb25zOiB7XG4gICAgICAgIHRlbnNvckNvcmVVc2FnZTogYmVuY2htYXJrcy5ncHUudGVuc29yQ29yZVVzYWdlLFxuICAgICAgICBtZW1vcnlCYW5kd2lkdGg6IGJlbmNobWFya3MuZ3B1Lm1lbW9yeUJhbmR3aWR0aCxcbiAgICAgICAgc3BlZWR1cDogYmVuY2htYXJrcy5ncHUuc3BlZWR1cFxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldE1vZGVsVHlwZShtb2RlbElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIG1vZGVsSWQgPSBtb2RlbElkLnRvTG93ZXJDYXNlKCk7XG4gICAgXG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ3Jlc25ldCcpKSByZXR1cm4gJ3Jlc25ldC01MCc7XG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ3lvbG8nKSkgcmV0dXJuICd5b2xvdjgnO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCdzdGFibGUnKSkgcmV0dXJuICdzdGFibGUtZGlmZnVzaW9uJztcbiAgICBpZiAobW9kZWxJZC5pbmNsdWRlcygnbGxhbWEnKSkgcmV0dXJuICdsbGFtYTInO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCdncHQnKSkgcmV0dXJuICdncHQyJztcbiAgICBpZiAobW9kZWxJZC5pbmNsdWRlcygnYmFydCcpKSByZXR1cm4gJ2JhcnQnO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCd3aGlzcGVyJykpIHJldHVybiAnd2hpc3Blcic7XG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ3ZpdCcpKSByZXR1cm4gJ3ZpdCc7XG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ2Jpb2JlcnQnKSkgcmV0dXJuICdiaW9iZXJ0JztcbiAgICBpZiAobW9kZWxJZC5pbmNsdWRlcygnZGlubycpKSByZXR1cm4gJ2Rpbm92Mic7XG4gICAgXG4gICAgLy8gRGVmYXVsdCB0byByZXNuZXQgaWYgbm8gbWF0Y2hcbiAgICByZXR1cm4gJ3Jlc25ldC01MCc7XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRNZXRyaWNzKCk6IFBlcmZvcm1hbmNlTWV0cmljcyB7XG4gICAgLy8gVXNlIFJlc05ldC01MCBhcyBkZWZhdWx0XG4gICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlTWV0cmljcyh7XG4gICAgICBncmFwaDoge1xuICAgICAgICBtZXRhZGF0YTogeyBtb2RlbElkOiAncmVzbmV0LTUwJyB9LFxuICAgICAgICBsYXllcnM6IFtdXG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG59Il0sIm5hbWVzIjpbIk1PREVMX0JFTkNITUFSS1MiLCJQZXJmb3JtYW5jZUNhbGN1bGF0b3IiLCJjYWxjdWxhdGVNZXRyaWNzIiwiYW5hbHlzaXNSZXN1bHQiLCJncHVFbmFibGVkIiwiZ3JhcGgiLCJtZXRhZGF0YSIsIm1vZGVsSWQiLCJnZXREZWZhdWx0TWV0cmljcyIsIm1vZGVsVHlwZSIsImdldE1vZGVsVHlwZSIsImJlbmNobWFya3MiLCJjcHVNZXRyaWNzIiwiZnBzIiwiY3B1IiwiaW5mZXJlbmNlU3BlZWQiLCJsYXRlbmN5IiwibWVtb3J5IiwibWVtb3J5VXNhZ2UiLCJ1dGlsaXphdGlvbiIsImdwdU1ldHJpY3MiLCJudk9wdGltaXphdGlvbnMiLCJ0ZW5zb3JDb3JlVXNhZ2UiLCJncHUiLCJtZW1vcnlCYW5kd2lkdGgiLCJzcGVlZHVwIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImxheWVycyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/model/performance.ts\n"));

/***/ })

});