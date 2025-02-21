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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PerformanceCalculator: function() { return /* binding */ PerformanceCalculator; }\n/* harmony export */ });\n// Polars-like DataFrame implementation for browser\nclass DataFrame {\n    select(column) {\n        if (!this.data.length) {\n            return {\n                sum: ()=>0,\n                mean: ()=>0\n            };\n        }\n        return {\n            sum: ()=>this.data.reduce((acc, row)=>acc + (row[column] || 0), 0),\n            mean: ()=>this.data.reduce((acc, row)=>acc + (row[column] || 0), 0) / this.data.length\n        };\n    }\n    static fromRecords(records) {\n        return new DataFrame(records || []);\n    }\n    constructor(data){\n        this.data = data || []; // Ensure data is never undefined\n    }\n}\nclass PerformanceCalculator {\n    calculateWithPolars(analysisResult) {\n        const { metadata, layers = [] } = analysisResult.graph || {};\n        try {\n            const df = DataFrame.fromRecords(layers);\n            // Calculate base metrics\n            const totalFlops = df.select(\"flops\").sum() || (metadata === null || metadata === void 0 ? void 0 : metadata.totalFlops) || 0;\n            const totalMemory = df.select(\"memory\").sum() || (metadata === null || metadata === void 0 ? void 0 : metadata.totalMemory) || 0;\n            const paramsPerLayer = df.select(\"parameters\").mean();\n            // Calculate CPU-specific base metrics\n            return {\n                fps: Math.min(60, 1000 / Math.max(1, totalFlops / 1e9)),\n                latency: Math.max(2.0, totalFlops / 1e9 * 3.5),\n                memory: Math.max(1.5, totalMemory / (1024 * 1024 * 1024)),\n                utilization: Math.min(95, Math.max(25, totalFlops / 1e9 * 0.8)),\n                efficiency: totalFlops / (df.select(\"parameters\").sum() || 1),\n                memoryEfficiency: totalMemory / (df.select(\"parameters\").sum() * 4 || 1)\n            };\n        } catch (e) {\n            console.warn(\"Calculations failed, falling back to simple calculations\", e);\n            return {\n                fps: Math.min(30, 1000 / Math.max(1, (metadata === null || metadata === void 0 ? void 0 : metadata.totalFlops) / 1e9 || 0)),\n                latency: Math.max(2.0, ((metadata === null || metadata === void 0 ? void 0 : metadata.totalFlops) / 1e9 || 0) * 3.5),\n                memory: Math.max(1.5, ((metadata === null || metadata === void 0 ? void 0 : metadata.totalMemory) || 0) / (1024 * 1024 * 1024)),\n                utilization: Math.min(95, ((metadata === null || metadata === void 0 ? void 0 : metadata.totalFlops) / 1e9 || 0) * 0.8),\n                efficiency: 0,\n                memoryEfficiency: 0\n            };\n        }\n    }\n    getModelCharacteristics(modelId, totalFlops, totalMemory) {\n        var _modelId_toLowerCase;\n        const id = (_modelId_toLowerCase = modelId === null || modelId === void 0 ? void 0 : modelId.toLowerCase()) !== null && _modelId_toLowerCase !== void 0 ? _modelId_toLowerCase : \"default\";\n        const flopsInTFlops = totalFlops / 1e12;\n        const memoryInGB = totalMemory / 1024 / 1024 / 1024;\n        // Base characteristics that scale with model size\n        const baseCharacteristics = {\n            minUtilization: Math.max(15, flopsInTFlops * 10),\n            tensorCoreUsage: Math.max(12, flopsInTFlops * 15),\n            memoryBandwidth: Math.max(0.3, flopsInTFlops * 0.5),\n            baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.cnn, memoryInGB * 1.2)\n        };\n        if (id.includes(\"yolo\")) {\n            return {\n                type: \"detection\",\n                batchSize: 16,\n                baseUtilization: Math.max(this.GPU_SPECS.minUtilization.detection, baseCharacteristics.minUtilization),\n                speedupFactor: 2.8,\n                memoryScale: 1.3,\n                tensorCoreUsage: baseCharacteristics.tensorCoreUsage * 1.2,\n                memoryBandwidth: baseCharacteristics.memoryBandwidth * 1.4,\n                features: [\n                    \"INT8 Quantization\",\n                    \"CUDA Graph Acceleration\"\n                ],\n                baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.detection, baseCharacteristics.baseMemory)\n            };\n        }\n        if (id.includes(\"stable\")) {\n            return {\n                type: \"generation\",\n                batchSize: 1,\n                baseUtilization: Math.max(this.GPU_SPECS.minUtilization.generation, baseCharacteristics.minUtilization),\n                speedupFactor: 2.2,\n                memoryScale: 1.5,\n                tensorCoreUsage: baseCharacteristics.tensorCoreUsage * 1.5,\n                memoryBandwidth: baseCharacteristics.memoryBandwidth * 1.8,\n                features: [\n                    \"FP16 Mixed Precision\",\n                    \"Attention Optimization\"\n                ],\n                baseMemory: Math.max(this.GPU_SPECS.minMemoryGB.generation, baseCharacteristics.baseMemory)\n            };\n        }\n        // Default CNN characteristics with realistic minimums\n        return {\n            type: \"cnn\",\n            batchSize: 32,\n            baseUtilization: Math.max(this.GPU_SPECS.minUtilization.cnn, baseCharacteristics.minUtilization),\n            speedupFactor: 2.2,\n            memoryScale: 1.2,\n            tensorCoreUsage: baseCharacteristics.tensorCoreUsage,\n            memoryBandwidth: baseCharacteristics.memoryBandwidth,\n            features: [\n                \"TensorRT Inference\",\n                \"Kernel Fusion\"\n            ],\n            baseMemory: baseCharacteristics.baseMemory\n        };\n    }\n    calculateMetrics(analysisResult, gpuEnabled) {\n        if (!(analysisResult === null || analysisResult === void 0 ? void 0 : analysisResult.graph)) {\n            return this.getDefaultMetrics();\n        }\n        const { totalFlops, totalMemory, modelId } = analysisResult.graph.metadata;\n        // Calculate base CPU performance\n        const cpuMetrics = {\n            fps: Math.min(60, 1000 / Math.max(1, totalFlops / 1e9)),\n            latency: Math.max(1.0, totalFlops / 1e9 * 2.5),\n            memory: Math.max(0.5, totalMemory / (1024 * 1024 * 1024)),\n            utilization: Math.min(98, totalFlops / 1e9 * 0.6)\n        };\n        if (!gpuEnabled) {\n            return {\n                cpuMetrics,\n                gpuMetrics: {\n                    fps: 0,\n                    latency: 0,\n                    memory: 0,\n                    utilization: 0\n                },\n                nvOptimizations: null\n            };\n        }\n        // Calculate GPU-accelerated performance\n        const gpuMetrics = {\n            fps: Math.min(2000, cpuMetrics.fps * 8),\n            latency: cpuMetrics.latency / 8,\n            memory: cpuMetrics.memory * 1.2,\n            utilization: Math.min(85, totalFlops / 1e12 * 20) // GPU utilization based on FLOPs\n        };\n        // Real NVIDIA optimizations based on model size\n        const nvOptimizations = {\n            tensorCoreUsage: \"\".concat(Math.min(95, totalFlops / 1e12 * 25), \"%\"),\n            memoryBandwidth: \"\".concat((totalFlops / 1e12).toFixed(1), \" TB/s\"),\n            speedup: \"\".concat((gpuMetrics.fps / cpuMetrics.fps).toFixed(1), \"x\"),\n            batchSize: 32\n        };\n        return {\n            cpuMetrics,\n            gpuMetrics,\n            nvOptimizations\n        };\n    }\n    getDefaultMetrics() {\n        const defaultMetrics = {\n            fps: 0,\n            latency: 0,\n            memory: 0,\n            utilization: 0\n        };\n        return {\n            cpuMetrics: defaultMetrics,\n            gpuMetrics: defaultMetrics,\n            nvOptimizations: null\n        };\n    }\n    constructor(){\n        this.GPU_SPECS = {\n            peakTflops: 312,\n            memoryBandwidth: 2048,\n            tensorCores: 432,\n            maxBatchSize: 32,\n            // Minimum utilization for active models\n            minUtilization: {\n                cnn: 15,\n                transformer: 25,\n                detection: 20,\n                generation: 35 // Stable Diffusion etc\n            },\n            // Minimum memory requirements\n            minMemoryGB: {\n                cnn: 1.5,\n                transformer: 2.8,\n                detection: 2.2,\n                generation: 3.5 // Stable Diffusion etc\n            }\n        };\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9tb2RlbC9wZXJmb3JtYW5jZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBSUEsbURBQW1EO0FBQ25ELE1BQU1BO0lBT0pDLE9BQU9DLE1BQTBCLEVBQUU7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsSUFBSSxDQUFDQyxNQUFNLEVBQUU7WUFDckIsT0FBTztnQkFDTEMsS0FBSyxJQUFNO2dCQUNYQyxNQUFNLElBQU07WUFDZDtRQUNGO1FBRUEsT0FBTztZQUNMRCxLQUFLLElBQU0sSUFBSSxDQUFDRixJQUFJLENBQUNJLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxNQUFRRCxNQUFPQyxDQUFBQSxHQUFHLENBQUNQLE9BQU8sSUFBSSxJQUFJO1lBQ3BFSSxNQUFNLElBQU0sSUFBSSxDQUFDSCxJQUFJLENBQUNJLE1BQU0sQ0FBQyxDQUFDQyxLQUFLQyxNQUFRRCxNQUFPQyxDQUFBQSxHQUFHLENBQUNQLE9BQU8sSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDQyxJQUFJLENBQUNDLE1BQU07UUFDNUY7SUFDRjtJQUVBLE9BQU9NLFlBQVlDLE9BQW1DLEVBQUU7UUFDdEQsT0FBTyxJQUFJWCxVQUFVVyxXQUFXLEVBQUU7SUFDcEM7SUFwQkFDLFlBQVlULElBQW9CLENBQUU7UUFDaEMsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLFFBQVEsRUFBRSxFQUFHLGlDQUFpQztJQUM1RDtBQW1CRjtBQUVPLE1BQU1VO0lBc0JIQyxvQkFBb0JDLGNBQThCLEVBQUU7UUFDMUQsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFNBQVMsRUFBRSxFQUFFLEdBQUdGLGVBQWVHLEtBQUssSUFBSSxDQUFDO1FBRTNELElBQUk7WUFDRixNQUFNQyxLQUFLbkIsVUFBVVUsV0FBVyxDQUFDTztZQUVqQyx5QkFBeUI7WUFDekIsTUFBTUcsYUFBYUQsR0FBR2xCLE1BQU0sQ0FBQyxTQUFTSSxHQUFHLE9BQU1XLHFCQUFBQSwrQkFBQUEsU0FBVUksVUFBVSxLQUFJO1lB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UUFDMUIsTUFBTU0saUJBQWlCO1lBQ3JCM0MsS0FBSztZQUNMSSxTQUFTO1lBQ1RDLFFBQVE7WUFDUkMsYUFBYTtRQUNmO1FBQ0EsT0FBTztZQUNMZ0MsWUFBWUs7WUFDWkosWUFBWUk7WUFDWkgsaUJBQWlCO1FBQ25CO0lBQ0Y7O2FBeEtpQmpCLFlBQVk7WUFDM0JxQixZQUFZO1lBQ1p2QixpQkFBaUI7WUFDakJ3QixhQUFhO1lBQ2JDLGNBQWM7WUFDZCx3Q0FBd0M7WUFDeEMzQixnQkFBZ0I7Z0JBQ2RNLEtBQUs7Z0JBQ0xzQixhQUFhO2dCQUNiakIsV0FBVztnQkFDWEksWUFBWSxHQUFJLHVCQUF1QjtZQUN6QztZQUNBLDhCQUE4QjtZQUM5QlYsYUFBYTtnQkFDWEMsS0FBSztnQkFDTHNCLGFBQWE7Z0JBQ2JqQixXQUFXO2dCQUNYSSxZQUFZLElBQUksdUJBQXVCO1lBQ3pDO1FBQ0Y7O0FBc0pGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2xpYi9tb2RlbC9wZXJmb3JtYW5jZS50cz9kYjU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBsIGZyb20gJ25vZGVqcy1wb2xhcnMnO1xuaW1wb3J0IHsgQ1BVX0JFTkNITUFSS1MsIE5WSURJQV9CRU5DSE1BUktTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBBbmFseXNpc1Jlc3VsdCwgTGF5ZXJNZXRyaWNzIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIFBvbGFycy1saWtlIERhdGFGcmFtZSBpbXBsZW1lbnRhdGlvbiBmb3IgYnJvd3NlclxuY2xhc3MgRGF0YUZyYW1lIHtcbiAgcHJpdmF0ZSBkYXRhOiBMYXllck1ldHJpY3NbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBMYXllck1ldHJpY3NbXSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGEgfHwgW107ICAvLyBFbnN1cmUgZGF0YSBpcyBuZXZlciB1bmRlZmluZWRcbiAgfVxuXG4gIHNlbGVjdChjb2x1bW46IGtleW9mIExheWVyTWV0cmljcykge1xuICAgIGlmICghdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VtOiAoKSA9PiAwLFxuICAgICAgICBtZWFuOiAoKSA9PiAwXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdW06ICgpID0+IHRoaXMuZGF0YS5yZWR1Y2UoKGFjYywgcm93KSA9PiBhY2MgKyAocm93W2NvbHVtbl0gfHwgMCksIDApLFxuICAgICAgbWVhbjogKCkgPT4gdGhpcy5kYXRhLnJlZHVjZSgoYWNjLCByb3cpID0+IGFjYyArIChyb3dbY29sdW1uXSB8fCAwKSwgMCkgLyB0aGlzLmRhdGEubGVuZ3RoXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmVjb3JkcyhyZWNvcmRzOiBMYXllck1ldHJpY3NbXSB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuZXcgRGF0YUZyYW1lKHJlY29yZHMgfHwgW10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQZXJmb3JtYW5jZUNhbGN1bGF0b3Ige1xuICBwcml2YXRlIHJlYWRvbmx5IEdQVV9TUEVDUyA9IHtcbiAgICBwZWFrVGZsb3BzOiAzMTIsICAgICAgICAgIC8vIEExMDAgRlAxNlxuICAgIG1lbW9yeUJhbmR3aWR0aDogMjA0OCwgICAgLy8gR0Ivc1xuICAgIHRlbnNvckNvcmVzOiA0MzIsXG4gICAgbWF4QmF0Y2hTaXplOiAzMixcbiAgICAvLyBNaW5pbXVtIHV0aWxpemF0aW9uIGZvciBhY3RpdmUgbW9kZWxzXG4gICAgbWluVXRpbGl6YXRpb246IHtcbiAgICAgIGNubjogMTUsICAgICAgICAvLyBFZmZpY2llbnQgQ05Oc1xuICAgICAgdHJhbnNmb3JtZXI6IDI1LCAvLyBUcmFuc2Zvcm1lciBtb2RlbHNcbiAgICAgIGRldGVjdGlvbjogMjAsICAvLyBZT0xPIGV0Y1xuICAgICAgZ2VuZXJhdGlvbjogMzUgIC8vIFN0YWJsZSBEaWZmdXNpb24gZXRjXG4gICAgfSxcbiAgICAvLyBNaW5pbXVtIG1lbW9yeSByZXF1aXJlbWVudHNcbiAgICBtaW5NZW1vcnlHQjoge1xuICAgICAgY25uOiAxLjUsICAgICAgIC8vIEJhc2ljIENOTnNcbiAgICAgIHRyYW5zZm9ybWVyOiAyLjgsLy8gVHJhbnNmb3JtZXIgbW9kZWxzXG4gICAgICBkZXRlY3Rpb246IDIuMiwgLy8gWU9MTyBldGNcbiAgICAgIGdlbmVyYXRpb246IDMuNSAvLyBTdGFibGUgRGlmZnVzaW9uIGV0Y1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGNhbGN1bGF0ZVdpdGhQb2xhcnMoYW5hbHlzaXNSZXN1bHQ6IEFuYWx5c2lzUmVzdWx0KSB7XG4gICAgY29uc3QgeyBtZXRhZGF0YSwgbGF5ZXJzID0gW10gfSA9IGFuYWx5c2lzUmVzdWx0LmdyYXBoIHx8IHt9O1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZiA9IERhdGFGcmFtZS5mcm9tUmVjb3JkcyhsYXllcnMpO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgYmFzZSBtZXRyaWNzXG4gICAgICBjb25zdCB0b3RhbEZsb3BzID0gZGYuc2VsZWN0KCdmbG9wcycpLnN1bSgpIHx8IG1ldGFkYXRhPy50b3RhbEZsb3BzIHx8IDA7XG4gICAgICBjb25zdCB0b3RhbE1lbW9yeSA9IGRmLnNlbGVjdCgnbWVtb3J5Jykuc3VtKCkgfHwgbWV0YWRhdGE/LnRvdGFsTWVtb3J5IHx8IDA7XG4gICAgICBjb25zdCBwYXJhbXNQZXJMYXllciA9IGRmLnNlbGVjdCgncGFyYW1ldGVycycpLm1lYW4oKTtcblxuICAgICAgLy8gQ2FsY3VsYXRlIENQVS1zcGVjaWZpYyBiYXNlIG1ldHJpY3NcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZwczogTWF0aC5taW4oNjAsIDEwMDAgLyBNYXRoLm1heCgxLCB0b3RhbEZsb3BzIC8gMWU5KSksICAvLyBDYXAgQ1BVIGF0IDYwIEZQU1xuICAgICAgICBsYXRlbmN5OiBNYXRoLm1heCgyLjAsICh0b3RhbEZsb3BzIC8gMWU5KSAqIDMuNSksICAgICAgICAgLy8gQ1BVIGhhcyBoaWdoZXIgYmFzZSBsYXRlbmN5XG4gICAgICAgIG1lbW9yeTogTWF0aC5tYXgoMS41LCB0b3RhbE1lbW9yeSAvICgxMDI0ICogMTAyNCAqIDEwMjQpKSwgLy8gQ1BVIG5lZWRzIG1vcmUgbWVtb3J5XG4gICAgICAgIHV0aWxpemF0aW9uOiBNYXRoLm1pbig5NSwgTWF0aC5tYXgoMjUsICh0b3RhbEZsb3BzIC8gMWU5KSAqIDAuOCkpLCAvLyBDUFUgdXRpbGl6YXRpb24gaXMgaGlnaGVyXG4gICAgICAgIGVmZmljaWVuY3k6IHRvdGFsRmxvcHMgLyAoZGYuc2VsZWN0KCdwYXJhbWV0ZXJzJykuc3VtKCkgfHwgMSksXG4gICAgICAgIG1lbW9yeUVmZmljaWVuY3k6IHRvdGFsTWVtb3J5IC8gKGRmLnNlbGVjdCgncGFyYW1ldGVycycpLnN1bSgpICogNCB8fCAxKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NhbGN1bGF0aW9ucyBmYWlsZWQsIGZhbGxpbmcgYmFjayB0byBzaW1wbGUgY2FsY3VsYXRpb25zJywgZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmcHM6IE1hdGgubWluKDMwLCAxMDAwIC8gTWF0aC5tYXgoMSwgbWV0YWRhdGE/LnRvdGFsRmxvcHMgLyAxZTkgfHwgMCkpLFxuICAgICAgICBsYXRlbmN5OiBNYXRoLm1heCgyLjAsIChtZXRhZGF0YT8udG90YWxGbG9wcyAvIDFlOSB8fCAwKSAqIDMuNSksXG4gICAgICAgIG1lbW9yeTogTWF0aC5tYXgoMS41LCAobWV0YWRhdGE/LnRvdGFsTWVtb3J5IHx8IDApIC8gKDEwMjQgKiAxMDI0ICogMTAyNCkpLFxuICAgICAgICB1dGlsaXphdGlvbjogTWF0aC5taW4oOTUsIChtZXRhZGF0YT8udG90YWxGbG9wcyAvIDFlOSB8fCAwKSAqIDAuOCksXG4gICAgICAgIGVmZmljaWVuY3k6IDAsXG4gICAgICAgIG1lbW9yeUVmZmljaWVuY3k6IDBcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2RlbENoYXJhY3RlcmlzdGljcyhtb2RlbElkOiBzdHJpbmcgfCB1bmRlZmluZWQsIHRvdGFsRmxvcHM6IG51bWJlciwgdG90YWxNZW1vcnk6IG51bWJlcikge1xuICAgIGNvbnN0IGlkID0gbW9kZWxJZD8udG9Mb3dlckNhc2UoKSA/PyAnZGVmYXVsdCc7XG4gICAgY29uc3QgZmxvcHNJblRGbG9wcyA9IHRvdGFsRmxvcHMgLyAxZTEyO1xuICAgIGNvbnN0IG1lbW9yeUluR0IgPSB0b3RhbE1lbW9yeSAvIDEwMjQgLyAxMDI0IC8gMTAyNDtcblxuICAgIC8vIEJhc2UgY2hhcmFjdGVyaXN0aWNzIHRoYXQgc2NhbGUgd2l0aCBtb2RlbCBzaXplXG4gICAgY29uc3QgYmFzZUNoYXJhY3RlcmlzdGljcyA9IHtcbiAgICAgIG1pblV0aWxpemF0aW9uOiBNYXRoLm1heCgxNSwgZmxvcHNJblRGbG9wcyAqIDEwKSxcbiAgICAgIHRlbnNvckNvcmVVc2FnZTogTWF0aC5tYXgoMTIsIGZsb3BzSW5URmxvcHMgKiAxNSksXG4gICAgICBtZW1vcnlCYW5kd2lkdGg6IE1hdGgubWF4KDAuMywgZmxvcHNJblRGbG9wcyAqIDAuNSksXG4gICAgICBiYXNlTWVtb3J5OiBNYXRoLm1heCh0aGlzLkdQVV9TUEVDUy5taW5NZW1vcnlHQi5jbm4sIG1lbW9yeUluR0IgKiAxLjIpXG4gICAgfTtcblxuICAgIGlmIChpZC5pbmNsdWRlcygneW9sbycpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZGV0ZWN0aW9uJyxcbiAgICAgICAgYmF0Y2hTaXplOiAxNixcbiAgICAgICAgYmFzZVV0aWxpemF0aW9uOiBNYXRoLm1heCh0aGlzLkdQVV9TUEVDUy5taW5VdGlsaXphdGlvbi5kZXRlY3Rpb24sIGJhc2VDaGFyYWN0ZXJpc3RpY3MubWluVXRpbGl6YXRpb24pLFxuICAgICAgICBzcGVlZHVwRmFjdG9yOiAyLjgsXG4gICAgICAgIG1lbW9yeVNjYWxlOiAxLjMsXG4gICAgICAgIHRlbnNvckNvcmVVc2FnZTogYmFzZUNoYXJhY3RlcmlzdGljcy50ZW5zb3JDb3JlVXNhZ2UgKiAxLjIsXG4gICAgICAgIG1lbW9yeUJhbmR3aWR0aDogYmFzZUNoYXJhY3RlcmlzdGljcy5tZW1vcnlCYW5kd2lkdGggKiAxLjQsXG4gICAgICAgIGZlYXR1cmVzOiBbJ0lOVDggUXVhbnRpemF0aW9uJywgJ0NVREEgR3JhcGggQWNjZWxlcmF0aW9uJ10sXG4gICAgICAgIGJhc2VNZW1vcnk6IE1hdGgubWF4KHRoaXMuR1BVX1NQRUNTLm1pbk1lbW9yeUdCLmRldGVjdGlvbiwgYmFzZUNoYXJhY3RlcmlzdGljcy5iYXNlTWVtb3J5KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaWQuaW5jbHVkZXMoJ3N0YWJsZScpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZ2VuZXJhdGlvbicsXG4gICAgICAgIGJhdGNoU2l6ZTogMSxcbiAgICAgICAgYmFzZVV0aWxpemF0aW9uOiBNYXRoLm1heCh0aGlzLkdQVV9TUEVDUy5taW5VdGlsaXphdGlvbi5nZW5lcmF0aW9uLCBiYXNlQ2hhcmFjdGVyaXN0aWNzLm1pblV0aWxpemF0aW9uKSxcbiAgICAgICAgc3BlZWR1cEZhY3RvcjogMi4yLFxuICAgICAgICBtZW1vcnlTY2FsZTogMS41LFxuICAgICAgICB0ZW5zb3JDb3JlVXNhZ2U6IGJhc2VDaGFyYWN0ZXJpc3RpY3MudGVuc29yQ29yZVVzYWdlICogMS41LFxuICAgICAgICBtZW1vcnlCYW5kd2lkdGg6IGJhc2VDaGFyYWN0ZXJpc3RpY3MubWVtb3J5QmFuZHdpZHRoICogMS44LFxuICAgICAgICBmZWF0dXJlczogWydGUDE2IE1peGVkIFByZWNpc2lvbicsICdBdHRlbnRpb24gT3B0aW1pemF0aW9uJ10sXG4gICAgICAgIGJhc2VNZW1vcnk6IE1hdGgubWF4KHRoaXMuR1BVX1NQRUNTLm1pbk1lbW9yeUdCLmdlbmVyYXRpb24sIGJhc2VDaGFyYWN0ZXJpc3RpY3MuYmFzZU1lbW9yeSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBDTk4gY2hhcmFjdGVyaXN0aWNzIHdpdGggcmVhbGlzdGljIG1pbmltdW1zXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdjbm4nLFxuICAgICAgYmF0Y2hTaXplOiAzMixcbiAgICAgIGJhc2VVdGlsaXphdGlvbjogTWF0aC5tYXgodGhpcy5HUFVfU1BFQ1MubWluVXRpbGl6YXRpb24uY25uLCBiYXNlQ2hhcmFjdGVyaXN0aWNzLm1pblV0aWxpemF0aW9uKSxcbiAgICAgIHNwZWVkdXBGYWN0b3I6IDIuMixcbiAgICAgIG1lbW9yeVNjYWxlOiAxLjIsXG4gICAgICB0ZW5zb3JDb3JlVXNhZ2U6IGJhc2VDaGFyYWN0ZXJpc3RpY3MudGVuc29yQ29yZVVzYWdlLFxuICAgICAgbWVtb3J5QmFuZHdpZHRoOiBiYXNlQ2hhcmFjdGVyaXN0aWNzLm1lbW9yeUJhbmR3aWR0aCxcbiAgICAgIGZlYXR1cmVzOiBbJ1RlbnNvclJUIEluZmVyZW5jZScsICdLZXJuZWwgRnVzaW9uJ10sXG4gICAgICBiYXNlTWVtb3J5OiBiYXNlQ2hhcmFjdGVyaXN0aWNzLmJhc2VNZW1vcnlcbiAgICB9O1xuICB9XG5cbiAgY2FsY3VsYXRlTWV0cmljcyhhbmFseXNpc1Jlc3VsdDogQW5hbHlzaXNSZXN1bHQgfCBudWxsLCBncHVFbmFibGVkOiBib29sZWFuKSB7XG4gICAgaWYgKCFhbmFseXNpc1Jlc3VsdD8uZ3JhcGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRNZXRyaWNzKCk7XG4gICAgfVxuXG4gICAgY29uc3QgeyB0b3RhbEZsb3BzLCB0b3RhbE1lbW9yeSwgbW9kZWxJZCB9ID0gYW5hbHlzaXNSZXN1bHQuZ3JhcGgubWV0YWRhdGE7XG5cbiAgICAvLyBDYWxjdWxhdGUgYmFzZSBDUFUgcGVyZm9ybWFuY2VcbiAgICBjb25zdCBjcHVNZXRyaWNzID0ge1xuICAgICAgZnBzOiBNYXRoLm1pbig2MCwgMTAwMCAvIE1hdGgubWF4KDEsIHRvdGFsRmxvcHMgLyAxZTkpKSxcbiAgICAgIGxhdGVuY3k6IE1hdGgubWF4KDEuMCwgKHRvdGFsRmxvcHMgLyAxZTkpICogMi41KSxcbiAgICAgIG1lbW9yeTogTWF0aC5tYXgoMC41LCB0b3RhbE1lbW9yeSAvICgxMDI0ICogMTAyNCAqIDEwMjQpKSxcbiAgICAgIHV0aWxpemF0aW9uOiBNYXRoLm1pbig5OCwgKHRvdGFsRmxvcHMgLyAxZTkpICogMC42KVxuICAgIH07XG5cbiAgICBpZiAoIWdwdUVuYWJsZWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNwdU1ldHJpY3MsXG4gICAgICAgIGdwdU1ldHJpY3M6IHtcbiAgICAgICAgICBmcHM6IDAsXG4gICAgICAgICAgbGF0ZW5jeTogMCxcbiAgICAgICAgICBtZW1vcnk6IDAsXG4gICAgICAgICAgdXRpbGl6YXRpb246IDBcbiAgICAgICAgfSxcbiAgICAgICAgbnZPcHRpbWl6YXRpb25zOiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBHUFUtYWNjZWxlcmF0ZWQgcGVyZm9ybWFuY2VcbiAgICBjb25zdCBncHVNZXRyaWNzID0ge1xuICAgICAgZnBzOiBNYXRoLm1pbigyMDAwLCBjcHVNZXRyaWNzLmZwcyAqIDgpLCAvLyBHUFUgdHlwaWNhbGx5IDQtOHggZmFzdGVyXG4gICAgICBsYXRlbmN5OiBjcHVNZXRyaWNzLmxhdGVuY3kgLyA4LCAvLyBDb3JyZXNwb25kaW5nIGxhdGVuY3kgaW1wcm92ZW1lbnRcbiAgICAgIG1lbW9yeTogY3B1TWV0cmljcy5tZW1vcnkgKiAxLjIsIC8vIEdQVXMgb2Z0ZW4gdXNlIG1vcmUgbWVtb3J5IGZvciBvcHRpbWl6YXRpb25cbiAgICAgIHV0aWxpemF0aW9uOiBNYXRoLm1pbig4NSwgKHRvdGFsRmxvcHMgLyAxZTEyKSAqIDIwKSAvLyBHUFUgdXRpbGl6YXRpb24gYmFzZWQgb24gRkxPUHNcbiAgICB9O1xuXG4gICAgLy8gUmVhbCBOVklESUEgb3B0aW1pemF0aW9ucyBiYXNlZCBvbiBtb2RlbCBzaXplXG4gICAgY29uc3QgbnZPcHRpbWl6YXRpb25zID0ge1xuICAgICAgdGVuc29yQ29yZVVzYWdlOiBgJHtNYXRoLm1pbig5NSwgKHRvdGFsRmxvcHMgLyAxZTEyKSAqIDI1KX0lYCxcbiAgICAgIG1lbW9yeUJhbmR3aWR0aDogYCR7KHRvdGFsRmxvcHMgLyAxZTEyKS50b0ZpeGVkKDEpfSBUQi9zYCxcbiAgICAgIHNwZWVkdXA6IGAkeyhncHVNZXRyaWNzLmZwcyAvIGNwdU1ldHJpY3MuZnBzKS50b0ZpeGVkKDEpfXhgLFxuICAgICAgYmF0Y2hTaXplOiAzMlxuICAgIH07XG5cbiAgICByZXR1cm4geyBjcHVNZXRyaWNzLCBncHVNZXRyaWNzLCBudk9wdGltaXphdGlvbnMgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdE1ldHJpY3MoKSB7XG4gICAgY29uc3QgZGVmYXVsdE1ldHJpY3MgPSB7XG4gICAgICBmcHM6IDAsXG4gICAgICBsYXRlbmN5OiAwLFxuICAgICAgbWVtb3J5OiAwLFxuICAgICAgdXRpbGl6YXRpb246IDBcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBjcHVNZXRyaWNzOiBkZWZhdWx0TWV0cmljcyxcbiAgICAgIGdwdU1ldHJpY3M6IGRlZmF1bHRNZXRyaWNzLFxuICAgICAgbnZPcHRpbWl6YXRpb25zOiBudWxsXG4gICAgfTtcbiAgfVxufSAiXSwibmFtZXMiOlsiRGF0YUZyYW1lIiwic2VsZWN0IiwiY29sdW1uIiwiZGF0YSIsImxlbmd0aCIsInN1bSIsIm1lYW4iLCJyZWR1Y2UiLCJhY2MiLCJyb3ciLCJmcm9tUmVjb3JkcyIsInJlY29yZHMiLCJjb25zdHJ1Y3RvciIsIlBlcmZvcm1hbmNlQ2FsY3VsYXRvciIsImNhbGN1bGF0ZVdpdGhQb2xhcnMiLCJhbmFseXNpc1Jlc3VsdCIsIm1ldGFkYXRhIiwibGF5ZXJzIiwiZ3JhcGgiLCJkZiIsInRvdGFsRmxvcHMiLCJ0b3RhbE1lbW9yeSIsInBhcmFtc1BlckxheWVyIiwiZnBzIiwiTWF0aCIsIm1pbiIsIm1heCIsImxhdGVuY3kiLCJtZW1vcnkiLCJ1dGlsaXphdGlvbiIsImVmZmljaWVuY3kiLCJtZW1vcnlFZmZpY2llbmN5IiwiZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0TW9kZWxDaGFyYWN0ZXJpc3RpY3MiLCJtb2RlbElkIiwiaWQiLCJ0b0xvd2VyQ2FzZSIsImZsb3BzSW5URmxvcHMiLCJtZW1vcnlJbkdCIiwiYmFzZUNoYXJhY3RlcmlzdGljcyIsIm1pblV0aWxpemF0aW9uIiwidGVuc29yQ29yZVVzYWdlIiwibWVtb3J5QmFuZHdpZHRoIiwiYmFzZU1lbW9yeSIsIkdQVV9TUEVDUyIsIm1pbk1lbW9yeUdCIiwiY25uIiwiaW5jbHVkZXMiLCJ0eXBlIiwiYmF0Y2hTaXplIiwiYmFzZVV0aWxpemF0aW9uIiwiZGV0ZWN0aW9uIiwic3BlZWR1cEZhY3RvciIsIm1lbW9yeVNjYWxlIiwiZmVhdHVyZXMiLCJnZW5lcmF0aW9uIiwiY2FsY3VsYXRlTWV0cmljcyIsImdwdUVuYWJsZWQiLCJnZXREZWZhdWx0TWV0cmljcyIsImNwdU1ldHJpY3MiLCJncHVNZXRyaWNzIiwibnZPcHRpbWl6YXRpb25zIiwidG9GaXhlZCIsInNwZWVkdXAiLCJkZWZhdWx0TWV0cmljcyIsInBlYWtUZmxvcHMiLCJ0ZW5zb3JDb3JlcyIsIm1heEJhdGNoU2l6ZSIsInRyYW5zZm9ybWVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/model/performance.ts\n"));

/***/ })

});