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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PerformanceCalculator: function() { return /* binding */ PerformanceCalculator; }\n/* harmony export */ });\n// Polars-like DataFrame implementation for browser\nclass DataFrame {\n    select(column) {\n        if (!this.data.length) {\n            return {\n                sum: ()=>0,\n                mean: ()=>0\n            };\n        }\n        return {\n            sum: ()=>this.data.reduce((acc, row)=>acc + (row[column] || 0), 0),\n            mean: ()=>this.data.reduce((acc, row)=>acc + (row[column] || 0), 0) / this.data.length\n        };\n    }\n    static fromRecords(records) {\n        return new DataFrame(records || []);\n    }\n    constructor(data){\n        this.data = data || []; // Ensure data is never undefined\n    }\n}\nclass PerformanceCalculator {\n    calculateWithPolars(analysisResult) {\n        const { layers = [] } = analysisResult.graph || {};\n        try {\n            const totalFlops = layers.reduce((sum, layer)=>sum + (layer.flops || 0), 0);\n            const totalMemory = layers.reduce((sum, layer)=>sum + (layer.memory || 0), 0);\n            const totalParams = layers.reduce((sum, layer)=>sum + (layer.parameters || 0), 0);\n            return {\n                fps: Math.min(60, 1000 / Math.max(1, totalFlops / 1e9)),\n                latency: Math.max(2.0, totalFlops / 1e9),\n                memory: Math.max(1.5, totalMemory / (1024 * 1024 * 1024)),\n                utilization: Math.min(95, totalFlops / 1e9),\n                efficiency: totalFlops / (totalParams || 1),\n                memoryEfficiency: totalMemory / (totalParams * 4 || 1),\n                totalFlops,\n                totalMemory,\n                totalParams\n            };\n        } catch (e) {\n            console.error(\"Layer calculation failed:\", e);\n            return {\n                fps: 0,\n                latency: 0,\n                memory: 0,\n                utilization: 0,\n                efficiency: 0,\n                memoryEfficiency: 0,\n                totalFlops: 0,\n                totalMemory: 0,\n                totalParams: 0\n            };\n        }\n    }\n    getModelCharacteristics(modelId, totalFlops, totalMemory) {\n        var _modelId_toLowerCase;\n        const id = (_modelId_toLowerCase = modelId === null || modelId === void 0 ? void 0 : modelId.toLowerCase()) !== null && _modelId_toLowerCase !== void 0 ? _modelId_toLowerCase : \"default\";\n        const flopsInTFlops = totalFlops / 1e12;\n        const memoryInGB = totalMemory / 1024 / 1024 / 1024;\n        // Base characteristics that scale with model size\n        const baseCharacteristics = {\n            minUtilization: Math.max(15, flopsInTFlops * 10),\n            tensorCoreUsage: Math.max(12, flopsInTFlops * 15),\n            memoryBandwidth: Math.max(0.3, flopsInTFlops * 0.5),\n            baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.cnn, memoryInGB * 1.2)\n        };\n        if (id.includes(\"yolo\")) {\n            return {\n                type: \"detection\",\n                batchSize: 16,\n                baseUtilization: Math.max(this.GPU_SPECS.minUtilization.detection, baseCharacteristics.minUtilization),\n                speedupFactor: 2.8,\n                memoryScale: 1.3,\n                tensorCoreUsage: baseCharacteristics.tensorCoreUsage * 1.2,\n                memoryBandwidth: baseCharacteristics.memoryBandwidth * 1.4,\n                features: [\n                    \"INT8 Quantization\",\n                    \"CUDA Graph Acceleration\"\n                ],\n                baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.detection, baseCharacteristics.baseMemory)\n            };\n        }\n        if (id.includes(\"stable\")) {\n            return {\n                type: \"generation\",\n                batchSize: 1,\n                baseUtilization: Math.max(this.GPU_SPECS.minUtilization.generation, baseCharacteristics.minUtilization),\n                speedupFactor: 2.2,\n                memoryScale: 1.5,\n                tensorCoreUsage: baseCharacteristics.tensorCoreUsage * 1.5,\n                memoryBandwidth: baseCharacteristics.memoryBandwidth * 1.8,\n                features: [\n                    \"FP16 Mixed Precision\",\n                    \"Attention Optimization\"\n                ],\n                baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.generation, baseCharacteristics.baseMemory)\n            };\n        }\n        // Default CNN characteristics with realistic minimums\n        return {\n            type: \"cnn\",\n            batchSize: 32,\n            baseUtilization: Math.max(this.GPU_SPECS.minUtilization.cnn, baseCharacteristics.minUtilization),\n            speedupFactor: 2.2,\n            memoryScale: 1.2,\n            tensorCoreUsage: baseCharacteristics.tensorCoreUsage,\n            memoryBandwidth: baseCharacteristics.memoryBandwidth,\n            features: [\n                \"TensorRT Inference\",\n                \"Kernel Fusion\"\n            ],\n            baseMemory: baseCharacteristics.baseMemory\n        };\n    }\n    calculateMetrics(analysisResult, gpuEnabled) {\n        if (!(analysisResult === null || analysisResult === void 0 ? void 0 : analysisResult.graph)) {\n            return this.getDefaultMetrics();\n        }\n        const baseMetrics = this.calculateWithPolars(analysisResult);\n        const characteristics = this.getModelCharacteristics(analysisResult.graph.metadata.modelId, baseMetrics.totalFlops, baseMetrics.totalMemory);\n        const cpuMetrics = {\n            fps: baseMetrics.fps,\n            latency: baseMetrics.latency,\n            memory: baseMetrics.memory,\n            utilization: baseMetrics.utilization\n        };\n        const gpuMetrics = {\n            fps: gpuEnabled ? cpuMetrics.fps * characteristics.speedupFactor : 0,\n            latency: gpuEnabled ? cpuMetrics.latency / characteristics.speedupFactor : 0,\n            memory: gpuEnabled ? cpuMetrics.memory * characteristics.memoryScale : 0,\n            utilization: gpuEnabled ? Math.min(85, baseMetrics.utilization * 0.6) : 0\n        };\n        return {\n            cpuMetrics,\n            gpuMetrics,\n            nvOptimizations: {\n                tensorCoreUsage: gpuEnabled ? \"\".concat(characteristics.tensorCoreUsage.toFixed(1), \"%\") : \"0%\",\n                memoryBandwidth: gpuEnabled ? \"\".concat(characteristics.memoryBandwidth.toFixed(1), \" TB/s\") : \"0 TB/s\",\n                speedup: \"\".concat(characteristics.speedupFactor.toFixed(1), \"x\"),\n                batchSize: characteristics.batchSize\n            }\n        };\n    }\n    getDefaultMetrics() {\n        const defaultMetrics = {\n            fps: 0,\n            latency: 0,\n            memory: 0,\n            utilization: 0\n        };\n        return {\n            cpuMetrics: defaultMetrics,\n            gpuMetrics: defaultMetrics,\n            nvOptimizations: null\n        };\n    }\n    constructor(){\n        this.GPU_SPECS = {\n            peakTflops: 312,\n            memoryBandwidth: 2048,\n            tensorCores: 432,\n            maxBatchSize: 32,\n            // Minimum utilization for active models\n            minUtilization: {\n                cnn: 15,\n                transformer: 25,\n                detection: 20,\n                generation: 35 // Stable Diffusion etc\n            },\n            // Minimum memory requirements\n            minMemoryGB: {\n                cnn: 1.5,\n                transformer: 2.8,\n                detection: 2.2,\n                generation: 3.5 // Stable Diffusion etc\n            }\n        };\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9tb2RlbC9wZXJmb3JtYW5jZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBSUEsbURBQW1EO0FBQ25ELE1BQU1BO0lBT0pDLE9BQU9DLE1BQTBCLEVBQUU7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLEVBQUU7WUFDckIsT0FBTztnQkFDTEMsS0FBSyxJQUFNO2dCQUNYQyxNQUFNLElBQU07WUFDZDtRQUNGO1FBRUEsT0FBTztZQUNMRCxLQUFLLElBQU0sSUFBSSxDQUFDRixJQUFJLENBQUNJLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxNQUFRRCxNQUFPQyxDQUFBQSxHQUFHLENBQUNQLE9BQU8sSUFBSSxJQUFJO1lBQ3BFSSxNQUFNLElBQU0sSUFBSSxDQUFDSCxJQUFJLENBQUNJLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxNQUFRRCxNQUFPQyxDQUFBQSxHQUFHLENBQUNQLE9BQU8sSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDQyxJQUFJLENBQUNDLE1BQU07UUFDNUY7SUFDRjtJQUVBLE9BQU9NLFlBQVlDLE9BQW1DLEVBQUU7UUFDdEQsT0FBTyxJQUFJWCxVQUFVVyxXQUFXLEVBQUU7SUFDcEM7SUFwQkFDLFlBQVlULElBQW9CLENBQUU7UUFDaEMsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLFFBQVEsRUFBRSxFQUFHLGlDQUFpQztJQUM1RDtBQW1CRjtBQWNPLE1BQU1VO0lBc0JIQyxvQkFBb0JDLGNBQThCLEVBQWdCO1FBQ3hFLE1BQU0sRUFBRUMsU0FBUyxFQUFFLEVBQUUsR0FBR0QsZUFBZUUsS0FBSyxJQUFJLENBQUM7UUFFakQsSUFBSTtZQUNGLE1BQU1DLGFBQWFGLE9BQU9ULE1BQU0sQ0FBQyxDQUFDRixLQUFLYyxRQUFVZCxNQUFPYyxDQUFBQSxNQUFNQyxLQUFLLElBQUksSUFBSTtZQUMzRSxNQUFNQyxjQUFjTCxPQUFPVCxNQUFNLENBQUMsQ0FBQ0YsS0FBS2MsUUFBVWQsTUFBT2Ms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QWdCUCxXQUFXLEdBQUc7WUFDdkUxQixhQUFhOEIsYUFBYWxDLEtBQUtDLEdBQUcsQ0FBQyxJQUFJbUMsWUFBWWhDLFdBQVcsR0FBRyxPQUFPO1FBQzFFO1FBRUEsT0FBTztZQUNMbUM7WUFDQUM7WUFDQUMsaUJBQWlCO2dCQUNmdkIsaUJBQWlCZ0IsYUFBYSxHQUE4QyxPQUEzQ0csZ0JBQWdCbkIsZUFBZSxDQUFDd0IsT0FBTyxDQUFDLElBQUcsT0FBSztnQkFDakZ2QixpQkFBaUJlLGFBQWEsR0FBOEMsT0FBM0NHLGdCQUFnQmxCLGVBQWUsQ0FBQ3VCLE9BQU8sQ0FBQyxJQUFHLFdBQVM7Z0JBQ3JGQyxTQUFTLEdBQTRDLE9BQXpDTixnQkFBZ0JSLGFBQWEsQ0FBQ2EsT0FBTyxDQUFDLElBQUc7Z0JBQ3JEaEIsV0FBV1csZ0JBQWdCWCxTQUFTO1lBQ3RDO1FBQ0Y7SUFDRjtJQUVRUyxvQkFBb0I7UUFDMUIsTUFBTVMsaUJBQWlCO1lBQ3JCN0MsS0FBSztZQUNMSSxTQUFTO1lBQ1RQLFFBQVE7WUFDUlEsYUFBYTtRQUNmO1FBQ0EsT0FBTztZQUNMbUMsWUFBWUs7WUFDWkosWUFBWUk7WUFDWkgsaUJBQWlCO1FBQ25CO0lBQ0Y7O2FBaktpQnBCLFlBQVk7WUFDM0J3QixZQUFZO1lBQ1oxQixpQkFBaUI7WUFDakIyQixhQUFhO1lBQ2JDLGNBQWM7WUFDZCx3Q0FBd0M7WUFDeEM5QixnQkFBZ0I7Z0JBQ2RNLEtBQUs7Z0JBQ0x5QixhQUFhO2dCQUNicEIsV0FBVztnQkFDWEksWUFBWSxHQUFJLHVCQUF1QjtZQUN6QztZQUNBLDhCQUE4QjtZQUM5QlYsYUFBYTtnQkFDWEMsS0FBSztnQkFDTHlCLGFBQWE7Z0JBQ2JwQixXQUFXO2dCQUNYSSxZQUFZLElBQUksdUJBQXVCO1lBQ3pDO1FBQ0Y7O0FBK0lGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2xpYi9tb2RlbC9wZXJmb3JtYW5jZS50cz9kYjU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBsIGZyb20gJ25vZGVqcy1wb2xhcnMnO1xuaW1wb3J0IHsgQ1BVX0JFTkNITUFSS1MsIE5WSURJQV9CRU5DSE1BUktTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBBbmFseXNpc1Jlc3VsdCwgTGF5ZXJNZXRyaWNzIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIFBvbGFycy1saWtlIERhdGFGcmFtZSBpbXBsZW1lbnRhdGlvbiBmb3IgYnJvd3NlclxuY2xhc3MgRGF0YUZyYW1lIHtcbiAgcHJpdmF0ZSBkYXRhOiBMYXllck1ldHJpY3NbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBMYXllck1ldHJpY3NbXSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwgW107ICAvLyBFbnN1cmUgZGF0YSBpcyBuZXZlciB1bmRlZmluZWRcbiAgfVxuXG4gIHNlbGVjdChjb2x1bW46IGtleW9mIExheWVyTWV0cmljcykge1xuICAgIGlmICghdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VtOiAoKSA9PiAwLFxuICAgICAgICBtZWFuOiAoKSA9PiAwXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdW06ICgpID0+IHRoaXMuZGF0YS5yZWR1Y2UoKGFjYywgcm93KSA9PiBhY2MgKyAocm93W2NvbHVtbl0gfHwgMCksIDApLFxuICAgICAgbWVhbjogKCkgPT4gdGhpcy5kYXRhLnJlZHVjZSgoYWNjLCByb3cpID0+IGFjYyArIChyb3dbY29sdW1uXSB8fCAwKSwgMCkgLyB0aGlzLmRhdGEubGVuZ3RoXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmVjb3JkcyhyZWNvcmRzOiBMYXllck1ldHJpY3NbXSB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuZXcgRGF0YUZyYW1lKHJlY29yZHMgfHwgW10pO1xuICB9XG59XG5cbmludGVyZmFjZSBNb2RlbE1ldHJpY3Mge1xuICBmcHM6IG51bWJlcjtcbiAgbGF0ZW5jeTogbnVtYmVyO1xuICBtZW1vcnk6IG51bWJlcjtcbiAgdXRpbGl6YXRpb246IG51bWJlcjtcbiAgZWZmaWNpZW5jeTogbnVtYmVyO1xuICBtZW1vcnlFZmZpY2llbmN5OiBudW1iZXI7XG4gIHRvdGFsRmxvcHM6IG51bWJlcjtcbiAgdG90YWxNZW1vcnk6IG51bWJlcjtcbiAgdG90YWxQYXJhbXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlQ2FsY3VsYXRvciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgR1BVX1NQRUNTID0ge1xuICAgIHBlYWtUZmxvcHM6IDMxMiwgICAgICAgICAgLy8gQTEwMCBGUDE2XG4gICAgbWVtb3J5QmFuZHdpZHRoOiAyMDQ4LCAgICAvLyBHQi9zXG4gICAgdGVuc29yQ29yZXM6IDQzMixcbiAgICBtYXhCYXRjaFNpemU6IDMyLFxuICAgIC8vIE1pbmltdW0gdXRpbGl6YXRpb24gZm9yIGFjdGl2ZSBtb2RlbHNcbiAgICBtaW5VdGlsaXphdGlvbjoge1xuICAgICAgY25uOiAxNSwgICAgICAgIC8vIEVmZmljaWVudCBDTk5zXG4gICAgICB0cmFuc2Zvcm1lcjogMjUsIC8vIFRyYW5zZm9ybWVyIG1vZGVsc1xuICAgICAgZGV0ZWN0aW9uOiAyMCwgIC8vIFlPTE8gZXRjXG4gICAgICBnZW5lcmF0aW9uOiAzNSAgLy8gU3RhYmxlIERpZmZ1c2lvbiBldGNcbiAgICB9LFxuICAgIC8vIE1pbmltdW0gbWVtb3J5IHJlcXVpcmVtZW50c1xuICAgIG1pbk1lbW9yeUdCOiB7XG4gICAgICBjbm46IDEuNSwgICAgICAgLy8gQmFzaWMgQ05Oc1xuICAgICAgdHJhbnNmb3JtZXI6IDIuOCwvLyBUcmFuc2Zvcm1lciBtb2RlbHNcbiAgICAgIGRldGVjdGlvbjogMi4yLCAvLyBZT0xPIGV0Y1xuICAgICAgZ2VuZXJhdGlvbjogMy41IC8vIFN0YWJsZSBEaWZmdXNpb24gZXRjXG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgY2FsY3VsYXRlV2l0aFBvbGFycyhhbmFseXNpc1Jlc3VsdDogQW5hbHlzaXNSZXN1bHQpOiBNb2RlbE1ldHJpY3Mge1xuICAgIGNvbnN0IHsgbGF5ZXJzID0gW10gfSA9IGFuYWx5c2lzUmVzdWx0LmdyYXBoIHx8IHt9O1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b3RhbEZsb3BzID0gbGF5ZXJzLnJlZHVjZSgoc3VtLCBsYXllcikgPT4gc3VtICsgKGxheWVyLmZsb3BzIHx8IDApLCAwKTtcbiAgICAgIGNvbnN0IHRvdGFsTWVtb3J5ID0gbGF5ZXJzLnJlZHVjZSgoc3VtLCBsYXllcikgPT4gc3VtICsgKGxheWVyLm1lbW9yeSB8fCAwKSwgMCk7XG4gICAgICBjb25zdCB0b3RhbFBhcmFtcyA9IGxheWVycy5yZWR1Y2UoKHN1bSwgbGF5ZXIpID0+IHN1bSArIChsYXllci5wYXJhbWV0ZXJzIHx8IDApLCAwKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZnBzOiBNYXRoLm1pbig2MCwgMTAwMCAvIE1hdGgubWF4KDEsIHRvdGFsRmxvcHMgLyAxZTkpKSxcbiAgICAgICAgbGF0ZW5jeTogTWF0aC5tYXgoMi4wLCB0b3RhbEZsb3BzIC8gMWU5KSxcbiAgICAgICAgbWVtb3J5OiBNYXRoLm1heCgxLjUsIHRvdGFsTWVtb3J5IC8gKDEwMjQgKiAxMDI0ICogMTAyNCkpLFxuICAgICAgICB1dGlsaXphdGlvbjogTWF0aC5taW4oOTUsIHRvdGFsRmxvcHMgLyAxZTkpLFxuICAgICAgICBlZmZpY2llbmN5OiB0b3RhbEZsb3BzIC8gKHRvdGFsUGFyYW1zIHx8IDEpLFxuICAgICAgICBtZW1vcnlFZmZpY2llbmN5OiB0b3RhbE1lbW9yeSAvICh0b3RhbFBhcmFtcyAqIDQgfHwgMSksXG4gICAgICAgIHRvdGFsRmxvcHMsXG4gICAgICAgIHRvdGFsTWVtb3J5LFxuICAgICAgICB0b3RhbFBhcmFtc1xuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMYXllciBjYWxjdWxhdGlvbiBmYWlsZWQ6JywgZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmcHM6IDAsXG4gICAgICAgIGxhdGVuY3k6IDAsXG4gICAgICAgIG1lbW9yeTogMCxcbiAgICAgICAgdXRpbGl6YXRpb246IDAsXG4gICAgICAgIGVmZmljaWVuY3k6IDAsXG4gICAgICAgIG1lbW9yeUVmZmljaWVuY3k6IDAsXG4gICAgICAgIHRvdGFsRmxvcHM6IDAsXG4gICAgICAgIHRvdGFsTWVtb3J5OiAwLFxuICAgICAgICB0b3RhbFBhcmFtczogMFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE1vZGVsQ2hhcmFjdGVyaXN0aWNzKG1vZGVsSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCwgdG90YWxGbG9wczogbnVtYmVyLCB0b3RhbE1lbW9yeTogbnVtYmVyKSB7XG4gICAgY29uc3QgaWQgPSBtb2RlbElkPy50b0xvd2VyQ2FzZSgpID8/ICdkZWZhdWx0JztcbiAgICBjb25zdCBmbG9wc0luVEZsb3BzID0gdG90YWxGbG9wcyAvIDFlMTI7XG4gICAgY29uc3QgbWVtb3J5SW5HQiA9IHRvdGFsTWVtb3J5IC8gMTAyNCAvIDEwMjQgLyAxMDI0O1xuXG4gICAgLy8gQmFzZSBjaGFyYWN0ZXJpc3RpY3MgdGhhdCBzY2FsZSB3aXRoIG1vZGVsIHNpemVcbiAgICBjb25zdCBiYXNlQ2hhcmFjdGVyaXN0aWNzID0ge1xuICAgICAgbWluVXRpbGl6YXRpb246IE1hdGgubWF4KDE1LCBmbG9wc0luVEZsb3BzICogMTApLFxuICAgICAgdGVuc29yQ29yZVVzYWdlOiBNYXRoLm1heCgxMiwgZmxvcHNJblRGbG9wcyAqIDE1KSxcbiAgICAgIG1lbW9yeUJhbmR3aWR0aDogTWF0aC5tYXgoMC4zLCBmbG9wc0luVEZsb3BzICogMC41KSxcbiAgICAgIGJhc2VNZW1vcnk6IE1hdGgubWF4KHRoaXMuR1BVX1NQRUNTLm1pbk1lbW9yeUdCLmNubiwgbWVtb3J5SW5HQiAqIDEuMilcbiAgICB9O1xuXG4gICAgaWYgKGlkLmluY2x1ZGVzKCd5b2xvJykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdkZXRlY3Rpb24nLFxuICAgICAgICBiYXRjaFNpemU6IDE2LFxuICAgICAgICBiYXNlVXRpbGl6YXRpb246IE1hdGgubWF4KHRoaXMuR1BVX1NQRUNTLm1pblV0aWxpemF0aW9uLmRldGVjdGlvbiwgYmFzZUNoYXJhY3RlcmlzdGljcy5taW5VdGlsaXphdGlvbiksXG4gICAgICAgIHNwZWVkdXBGYWN0b3I6IDIuOCxcbiAgICAgICAgbWVtb3J5U2NhbGU6IDEuMyxcbiAgICAgICAgdGVuc29yQ29yZVVzYWdlOiBiYXNlQ2hhcmFjdGVyaXN0aWNzLnRlbnNvckNvcmVVc2FnZSAqIDEuMixcbiAgICAgICAgbWVtb3J5QmFuZHdpZHRoOiBiYXNlQ2hhcmFjdGVyaXN0aWNzLm1lbW9yeUJhbmR3aWR0aCAqIDEuNCxcbiAgICAgICAgZmVhdHVyZXM6IFsnSU5UOCBRdWFudGl6YXRpb24nLCAnQ1VEQSBHcmFwaCBBY2NlbGVyYXRpb24nXSxcbiAgICAgICAgYmFzZU1lbW9yeTogTWF0aC5tYXgodGhpcy5HUFVfU1BFQ1MubWluTWVtb3J5R0IuZGV0ZWN0aW9uLCBiYXNlQ2hhcmFjdGVyaXN0aWNzLmJhc2VNZW1vcnkpXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpZC5pbmNsdWRlcygnc3RhYmxlJykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdnZW5lcmF0aW9uJyxcbiAgICAgICAgYmF0Y2hTaXplOiAxLFxuICAgICAgICBiYXNlVXRpbGl6YXRpb246IE1hdGgubWF4KHRoaXMuR1BVX1NQRUNTLm1pblV0aWxpemF0aW9uLmdlbmVyYXRpb24sIGJhc2VDaGFyYWN0ZXJpc3RpY3MubWluVXRpbGl6YXRpb24pLFxuICAgICAgICBzcGVlZHVwRmFjdG9yOiAyLjIsXG4gICAgICAgIG1lbW9yeVNjYWxlOiAxLjUsXG4gICAgICAgIHRlbnNvckNvcmVVc2FnZTogYmFzZUNoYXJhY3RlcmlzdGljcy50ZW5zb3JDb3JlVXNhZ2UgKiAxLjUsXG4gICAgICAgIG1lbW9yeUJhbmR3aWR0aDogYmFzZUNoYXJhY3RlcmlzdGljcy5tZW1vcnlCYW5kd2lkdGggKiAxLjgsXG4gICAgICAgIGZlYXR1cmVzOiBbJ0ZQMTYgTWl4ZWQgUHJlY2lzaW9uJywgJ0F0dGVudGlvbiBPcHRpbWl6YXRpb24nXSxcbiAgICAgICAgYmFzZU1lbW9yeTogTWF0aC5tYXgodGhpcy5HUFVfU1BFQ1MubWluTWVtb3J5R0IuZ2VuZXJhdGlvbiwgYmFzZUNoYXJhY3RlcmlzdGljcy5iYXNlTWVtb3J5KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IENOTiBjaGFyYWN0ZXJpc3RpY3Mgd2l0aCByZWFsaXN0aWMgbWluaW11bXNcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2NubicsXG4gICAgICBiYXRjaFNpemU6IDMyLFxuICAgICAgYmFzZVV0aWxpemF0aW9uOiBNYXRoLm1heCh0aGlzLkdQVV9TUEVDUy5taW5VdGlsaXphdGlvbi5jbm4sIGJhc2VDaGFyYWN0ZXJpc3RpY3MubWluVXRpbGl6YXRpb24pLFxuICAgICAgc3BlZWR1cEZhY3RvcjogMi4yLFxuICAgICAgbWVtb3J5U2NhbGU6IDEuMixcbiAgICAgIHRlbnNvckNvcmVVc2FnZTogYmFzZUNoYXJhY3RlcmlzdGljcy50ZW5zb3JDb3JlVXNhZ2UsXG4gICAgICBtZW1vcnlCYW5kd2lkdGg6IGJhc2VDaGFyYWN0ZXJpc3RpY3MubWVtb3J5QmFuZHdpZHRoLFxuICAgICAgZmVhdHVyZXM6IFsnVGVuc29yUlQgSW5mZXJlbmNlJywgJ0tlcm5lbCBGdXNpb24nXSxcbiAgICAgIGJhc2VNZW1vcnk6IGJhc2VDaGFyYWN0ZXJpc3RpY3MuYmFzZU1lbW9yeVxuICAgIH07XG4gIH1cblxuICBjYWxjdWxhdGVNZXRyaWNzKGFuYWx5c2lzUmVzdWx0OiBBbmFseXNpc1Jlc3VsdCB8IG51bGwsIGdwdUVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoIWFuYWx5c2lzUmVzdWx0Py5ncmFwaCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdE1ldHJpY3MoKTtcbiAgICB9XG5cbiAgICBjb25zdCBiYXNlTWV0cmljcyA9IHRoaXMuY2FsY3VsYXRlV2l0aFBvbGFycyhhbmFseXNpc1Jlc3VsdCk7XG4gICAgY29uc3QgY2hhcmFjdGVyaXN0aWNzID0gdGhpcy5nZXRNb2RlbENoYXJhY3RlcmlzdGljcyhcbiAgICAgIGFuYWx5c2lzUmVzdWx0LmdyYXBoLm1ldGFkYXRhLm1vZGVsSWQsXG4gICAgICBiYXNlTWV0cmljcy50b3RhbEZsb3BzLFxuICAgICAgYmFzZU1ldHJpY3MudG90YWxNZW1vcnlcbiAgICApO1xuXG4gICAgY29uc3QgY3B1TWV0cmljcyA9IHtcbiAgICAgIGZwczogYmFzZU1ldHJpY3MuZnBzLFxuICAgICAgbGF0ZW5jeTogYmFzZU1ldHJpY3MubGF0ZW5jeSxcbiAgICAgIG1lbW9yeTogYmFzZU1ldHJpY3MubWVtb3J5LFxuICAgICAgdXRpbGl6YXRpb246IGJhc2VNZXRyaWNzLnV0aWxpemF0aW9uXG4gICAgfTtcblxuICAgIGNvbnN0IGdwdU1ldHJpY3MgPSB7XG4gICAgICBmcHM6IGdwdUVuYWJsZWQgPyBjcHVNZXRyaWNzLmZwcyAqIGNoYXJhY3RlcmlzdGljcy5zcGVlZHVwRmFjdG9yIDogMCxcbiAgICAgIGxhdGVuY3k6IGdwdUVuYWJsZWQgPyBjcHVNZXRyaWNzLmxhdGVuY3kgLyBjaGFyYWN0ZXJpc3RpY3Muc3BlZWR1cEZhY3RvciA6IDAsXG4gICAgICBtZW1vcnk6IGdwdUVuYWJsZWQgPyBjcHVNZXRyaWNzLm1lbW9yeSAqIGNoYXJhY3RlcmlzdGljcy5tZW1vcnlTY2FsZSA6IDAsXG4gICAgICB1dGlsaXphdGlvbjogZ3B1RW5hYmxlZCA/IE1hdGgubWluKDg1LCBiYXNlTWV0cmljcy51dGlsaXphdGlvbiAqIDAuNikgOiAwXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBjcHVNZXRyaWNzLFxuICAgICAgZ3B1TWV0cmljcyxcbiAgICAgIG52T3B0aW1pemF0aW9uczoge1xuICAgICAgICB0ZW5zb3JDb3JlVXNhZ2U6IGdwdUVuYWJsZWQgPyBgJHtjaGFyYWN0ZXJpc3RpY3MudGVuc29yQ29yZVVzYWdlLnRvRml4ZWQoMSl9JWAgOiBcIjAlXCIsXG4gICAgICAgIG1lbW9yeUJhbmR3aWR0aDogZ3B1RW5hYmxlZCA/IGAke2NoYXJhY3RlcmlzdGljcy5tZW1vcnlCYW5kd2lkdGgudG9GaXhlZCgxKX0gVEIvc2AgOiBcIjAgVEIvc1wiLFxuICAgICAgICBzcGVlZHVwOiBgJHtjaGFyYWN0ZXJpc3RpY3Muc3BlZWR1cEZhY3Rvci50b0ZpeGVkKDEpfXhgLFxuICAgICAgICBiYXRjaFNpemU6IGNoYXJhY3RlcmlzdGljcy5iYXRjaFNpemVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZWZhdWx0TWV0cmljcygpIHtcbiAgICBjb25zdCBkZWZhdWx0TWV0cmljcyA9IHtcbiAgICAgIGZwczogMCxcbiAgICAgIGxhdGVuY3k6IDAsXG4gICAgICBtZW1vcnk6IDAsXG4gICAgICB1dGlsaXphdGlvbjogMFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIGNwdU1ldHJpY3M6IGRlZmF1bHRNZXRyaWNzLFxuICAgICAgZ3B1TWV0cmljczogZGVmYXVsdE1ldHJpY3MsXG4gICAgICBudk9wdGltaXphdGlvbnM6IG51bGxcbiAgICB9O1xuICB9XG59ICJdLCJuYW1lcyI6WyJEYXRhRnJhbWUiLCJzZWxlY3QiLCJjb2x1bW4iLCJkYXRhIiwibGVuZ3RoIiwic3VtIiwibWVhbiIsInJlZHVjZSIsImFjYyIsInJvdyIsImZyb21SZWNvcmRzIiwicmVjb3JkcyIsImNvbnN0cnVjdG9yIiwiUGVyZm9ybWFuY2VDYWxjdWxhdG9yIiwiY2FsY3VsYXRlV2l0aFBvbGFycyIsImFuYWx5c2lzUmVzdWx0IiwibGF5ZXJzIiwiZ3JhcGgiLCJ0b3RhbEZsb3BzIiwibGF5ZXIiLCJmbG9wcyIsInRvdGFsTWVtb3J5IiwibWVtb3J5IiwidG90YWxQYXJhbXMiLCJwYXJhbWV0ZXJzIiwiZnBzIiwiTWF0aCIsIm1pbiIsIm1heCIsImxhdGVuY3kiLCJ1dGlsaXphdGlvbiIsImVmZmljaWVuY3kiLCJtZW1vcnlFZmZpY2llbmN5IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImdldE1vZGVsQ2hhcmFjdGVyaXN0aWNzIiwibW9kZWxJZCIsImlkIiwidG9Mb3dlckNhc2UiLCJmbG9wc0luVEZsb3BzIiwibWVtb3J5SW5HQiIsImJhc2VDaGFyYWN0ZXJpc3RpY3MiLCJtaW5VdGlsaXphdGlvbiIsInRlbnNvckNvcmVVc2FnZSIsIm1lbW9yeUJhbmR3aWR0aCIsImJhc2VNZW1vcnkiLCJHUFVfU1BFQ1MiLCJtaW5NZW1vcnlHQiIsImNubiIsImluY2x1ZGVzIiwidHlwZSIsImJhdGNoU2l6ZSIsImJhc2VVdGlsaXphdGlvbiIsImRldGVjdGlvbiIsInNwZWVkdXBGYWN0b3IiLCJtZW1vcnlTY2FsZSIsImZlYXR1cmVzIiwiZ2VuZXJhdGlvbiIsImNhbGN1bGF0ZU1ldHJpY3MiLCJncHVFbmFibGVkIiwiZ2V0RGVmYXVsdE1ldHJpY3MiLCJiYXNlTWV0cmljcyIsImNoYXJhY3RlcmlzdGljcyIsIm1ldGFkYXRhIiwiY3B1TWV0cmljcyIsImdwdU1ldHJpY3MiLCJudk9wdGltaXphdGlvbnMiLCJ0b0ZpeGVkIiwic3BlZWR1cCIsImRlZmF1bHRNZXRyaWNzIiwicGVha1RmbG9wcyIsInRlbnNvckNvcmVzIiwibWF4QmF0Y2hTaXplIiwidHJhbnNmb3JtZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/model/performance.ts\n"));

/***/ })

});