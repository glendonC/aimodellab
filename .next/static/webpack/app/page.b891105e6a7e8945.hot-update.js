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

/***/ "(app-pages-browser)/./lib/model/simulator.ts":
/*!********************************!*\
  !*** ./lib/model/simulator.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModelSimulator: function() { return /* binding */ ModelSimulator; }\n/* harmony export */ });\nclass ModelSimulator {\n    async runSimulation(nodes) {\n        var _nodes_;\n        const layerResults = [];\n        const warnings = [];\n        let currentShape = ((_nodes_ = nodes[0]) === null || _nodes_ === void 0 ? void 0 : _nodes_.inputShapes[0]) || [\n            1,\n            224,\n            224,\n            3\n        ];\n        const details = []; // Added to store simulation details\n        details.push(\"Initializing model simulation...\");\n        details.push(\"Analyzing \".concat(nodes.length, \" layers for performance characteristics\"));\n        // Simulate forward pass\n        for(let i = 0; i < nodes.length; i++){\n            const node = nodes[i];\n            const nextNode = nodes[i + 1];\n            details.push(\"Simulating layer \".concat(node.id, \": \").concat(node.name));\n            const result = this.simulateLayer(node, currentShape, details);\n            layerResults.push(result);\n            currentShape = result.outputShape;\n            // Check for incompatibilities\n            if (nextNode && !this.areShapesCompatible(result.outputShape, nextNode)) {\n                warnings.push({\n                    layerId: nextNode.id,\n                    type: \"shape_mismatch\",\n                    message: \"Shape mismatch between \".concat(node.name, \" and \").concat(nextNode.name),\n                    suggestion: this.generateShapeMismatchSuggestion(result.outputShape, nextNode)\n                });\n            }\n        }\n        // Generate performance metrics\n        const performance = this.calculatePerformanceMetrics(layerResults);\n        // Generate optimization tips\n        const optimizationTips = this.generateOptimizationTips(nodes, layerResults);\n        // Placeholder for metrics -  Needs further definition based on the animation requirements.\n        const metrics = [\n            {\n                name: \"Total FLOPS\",\n                value: performance.totalFlops\n            },\n            {\n                name: \"Total Memory\",\n                value: performance.totalMemory\n            }\n        ];\n        return {\n            layerResults,\n            performance,\n            warnings,\n            optimizationTips,\n            metrics,\n            details\n        };\n    }\n    simulateLayer(node, inputShape, details) {\n        // Simulate layer computation and shape transformation\n        details.push(\"  Input shape: \".concat(inputShape));\n        const outputShape = this.calculateOutputShape(node, inputShape);\n        const flops = this.calculateLayerFlops(node, inputShape);\n        const memoryUsage = this.calculateMemoryUsage(node, inputShape, outputShape);\n        const inferenceTime = this.estimateInferenceTime(flops);\n        details.push(\"  Output shape: \".concat(outputShape));\n        details.push(\"  FLOPS: \".concat(flops));\n        details.push(\"  Memory Usage: \".concat(memoryUsage));\n        details.push(\"  Inference Time: \".concat(inferenceTime));\n        return {\n            layerId: node.id,\n            inputShape,\n            outputShape,\n            memoryUsage,\n            flops,\n            inferenceTime,\n            isBottleneck: flops > 1000000 || memoryUsage > 1000000\n        };\n    }\n    calculateOutputShape(node, inputShape) {\n        switch(node.type){\n            case \"cnn\":\n                var _node_attributes;\n                return [\n                    inputShape[0],\n                    inputShape[1] - 2,\n                    inputShape[2] - 2,\n                    ((_node_attributes = node.attributes) === null || _node_attributes === void 0 ? void 0 : _node_attributes.filters) || 32\n                ];\n            case \"pooling\":\n                return [\n                    inputShape[0],\n                    Math.floor(inputShape[1] / 2),\n                    Math.floor(inputShape[2] / 2),\n                    inputShape[3]\n                ];\n            case \"flatten\":\n                return [\n                    inputShape[0],\n                    inputShape.slice(1).reduce((a, b)=>a * b, 1)\n                ];\n            case \"mlp\":\n                var _node_attributes1;\n                return [\n                    inputShape[0],\n                    ((_node_attributes1 = node.attributes) === null || _node_attributes1 === void 0 ? void 0 : _node_attributes1.units) || 128\n                ];\n            default:\n                return inputShape;\n        }\n    }\n    calculateLayerFlops(node, inputShape) {\n        // Simplified FLOP calculations\n        switch(node.type){\n            case \"cnn\":\n                var _node_attributes, _node_attributes1;\n                const filters = ((_node_attributes = node.attributes) === null || _node_attributes === void 0 ? void 0 : _node_attributes.filters) || 32;\n                const kernelSize = ((_node_attributes1 = node.attributes) === null || _node_attributes1 === void 0 ? void 0 : _node_attributes1.kernelSize) || 3;\n                return inputShape[1] * inputShape[2] * inputShape[3] * filters * kernelSize * kernelSize;\n            case \"mlp\":\n                var _node_attributes2;\n                const units = ((_node_attributes2 = node.attributes) === null || _node_attributes2 === void 0 ? void 0 : _node_attributes2.units) || 128;\n                return inputShape[1] * units;\n            default:\n                return 1000; // Base cost\n        }\n    }\n    calculateMemoryUsage(node, inputShape, outputShape) {\n        // Calculate memory in bytes (simplified)\n        const inputSize = inputShape.reduce((a, b)=>a * b, 1) * 4; // 4 bytes per float\n        const outputSize = outputShape.reduce((a, b)=>a * b, 1) * 4;\n        return inputSize + outputSize;\n    }\n    estimateInferenceTime(flops) {\n        // Simplified estimation: assume 1 TFLOP/s GPU\n        return flops / 1000000000;\n    }\n    areShapesCompatible(outputShape, nextNode) {\n        // Check if shapes are compatible between layers\n        if (nextNode.type === \"flatten\") return true;\n        return outputShape.length === nextNode.inputShapes[0].length;\n    }\n    generateShapeMismatchSuggestion(outputShape, node) {\n        return \"Add a reshape layer to convert \".concat(outputShape.join(\"x\"), \" to match \").concat(node.type, \" input requirements\");\n    }\n    calculatePerformanceMetrics(results) {\n        const totalFlops = results.reduce((sum, r)=>sum + r.flops, 0);\n        const totalMemory = results.reduce((sum, r)=>sum + r.memoryUsage, 0);\n        return {\n            totalFlops,\n            totalMemory,\n            estimatedFps: 1000 / Math.max(...results.map((r)=>r.inferenceTime)),\n            gpuUtilization: Math.min(totalFlops / 1000000000 * 100, 100)\n        };\n    }\n    generateOptimizationTips(nodes, results) {\n        const tips = [];\n        // Check for common optimization opportunities\n        if (!nodes.some((n)=>n.type === \"normalization\")) {\n            tips.push({\n                title: \"Add Batch Normalization\",\n                description: \"Consider adding BatchNorm layers after convolutions to improve training stability\",\n                impact: \"high\",\n                category: \"architecture\"\n            });\n        }\n        const bottlenecks = results.filter((r)=>r.isBottleneck);\n        if (bottlenecks.length > 0) {\n            tips.push({\n                title: \"Performance Bottlenecks Detected\",\n                description: \"\".concat(bottlenecks.length, \" layers showing high computation time\"),\n                impact: \"high\",\n                category: \"performance\"\n            });\n        }\n        return tips;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9tb2RlbC9zaW11bGF0b3IudHMiLCJtYXBwaW5ncyI6Ijs7OztBQTZDTyxNQUFNQTtJQUNYLE1BQU1DLGNBQWNDLEtBQWtCLEVBQTZCO1lBRzlDQTtRQUZuQixNQUFNQyxlQUFpQyxFQUFFO1FBQ3pDLE1BQU1DLFdBQWdDLEVBQUU7UUFDeEMsSUFBSUMsZUFBZUgsRUFBQUEsVUFBQUEsS0FBSyxDQUFDLEVBQUUsY0FBUkEsOEJBQUFBLFFBQVVJLFdBQVcsQ0FBQyxFQUFFLEtBQUk7WUFBQztZQUFHO1lBQUs7WUFBSztTQUFFO1FBQy9ELE1BQU1DLFVBQW9CLEVBQUUsRUFBRSxvQ0FBb0M7UUFFbEVBLFFBQVFDLElBQUksQ0FBQztRQUNiRCxRQUFRQyxJQUFJLENBQUMsYUFBMEIsT0FBYk4sTUFBTU8sTUFBTSxFQUFDO1FBRXZDLHdCQUF3QjtRQUN4QixJQUFLLElBQUlDLElBQUksR0FBR0EsSUFBSVIsTUFBTU8sTUFBTSxFQUFFQyxJQUFLO1lBQ3JDLE1BQU1DLE9BQU9ULEtBQUssQ0FBQ1EsRUFBRTtZQUNyQixNQUFNRSxXQUFXVixLQUFLLENBQUNRLElBQUksRUFBRTtZQUM3QkgsUUFBUUMsSUFBSSxDQUFDLG9CQUFnQ0csT0FBWkEsS0FBS0UsRUFBRSxFQUFDLE1BQWMsT0FBVkYsS0FBS0csSUFBSTtZQUV0RCxNQUFNQyxTQUFTLElBQUksQ0FBQ0MsYUFBYSxDQUFDTCxNQUFNTixjQUFjRTtZQUN0REosYUFBYUssSUFBSSxDQUFDTztZQUNsQlYsZUFBZVUsT0FBT0UsV0FBVztZQUVqQyw4QkFBOEI7WUFDOUIsSUFBSUwsWUFBWSxDQUFDLElBQUksQ0FBQ00sbUJBQW1CLENBQUNILE9BQU9FLFdBQVcsRUFBRUwsV0FBVztnQkFDdkVSLFNBQVNJLElBQUksQ0FBQztvQkFDWlcsU0FBU1AsU0FBU0MsRUFBRTtvQkFDcEJPLE1BQU07b0JBQ05DLFNBQVMsMEJBQTJDVCxPQUFqQkQsS0FBS0csSUFBSSxFQUFDLFNBQXFC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UyxJQUFJLEVBQUM7SUFDdkY7SUFFUUssNEJBQTRCNkIsT0FBeUIsRUFBc0I7UUFDakYsTUFBTXhCLGFBQWF3QixRQUFRUixNQUFNLENBQUMsQ0FBQ1MsS0FBS0MsSUFBTUQsTUFBTUMsRUFBRXRCLEtBQUssRUFBRTtRQUM3RCxNQUFNSCxjQUFjdUIsUUFBUVIsTUFBTSxDQUFDLENBQUNTLEtBQUtDLElBQU1ELE1BQU1DLEVBQUVwQixXQUFXLEVBQUU7UUFFcEUsT0FBTztZQUNMTjtZQUNBQztZQUNBMEIsY0FBYyxPQUFPZCxLQUFLZSxHQUFHLElBQUlKLFFBQVFLLEdBQUcsQ0FBQ0gsQ0FBQUEsSUFBS0EsRUFBRWxCLGFBQWE7WUFDakVzQixnQkFBZ0JqQixLQUFLa0IsR0FBRyxDQUFDL0IsYUFBYSxhQUFhLEtBQUs7UUFDMUQ7SUFDRjtJQUVRSCx5QkFBeUJ6QixLQUFrQixFQUFFb0QsT0FBeUIsRUFBcUI7UUFDakcsTUFBTVEsT0FBMEIsRUFBRTtRQUVsQyw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDNUQsTUFBTTZELElBQUksQ0FBQ0MsQ0FBQUEsSUFBS0EsRUFBRTVDLElBQUksS0FBSyxrQkFBa0I7WUFDaEQwQyxLQUFLdEQsSUFBSSxDQUFDO2dCQUNSeUQsT0FBTztnQkFDUEMsYUFBYTtnQkFDYkMsUUFBUTtnQkFDUkMsVUFBVTtZQUNaO1FBQ0Y7UUFFQSxNQUFNQyxjQUFjZixRQUFRZ0IsTUFBTSxDQUFDZCxDQUFBQSxJQUFLQSxFQUFFaEIsWUFBWTtRQUN0RCxJQUFJNkIsWUFBWTVELE1BQU0sR0FBRyxHQUFHO1lBQzFCcUQsS0FBS3RELElBQUksQ0FBQztnQkFDUnlELE9BQU87Z0JBQ1BDLGFBQWEsR0FBc0IsT0FBbkJHLFlBQVk1RCxNQUFNLEVBQUM7Z0JBQ25DMEQsUUFBUTtnQkFDUkMsVUFBVTtZQUNaO1FBQ0Y7UUFFQSxPQUFPTjtJQUNUO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL21vZGVsL3NpbXVsYXRvci50cz9lYTE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsTm9kZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBTaW11bGF0aW9uUmVzdWx0ID0ge1xuICBsYXllclJlc3VsdHM6IExheWVyU2ltUmVzdWx0W107XG4gIHBlcmZvcm1hbmNlOiBQZXJmb3JtYW5jZU1ldHJpY3M7XG4gIHdhcm5pbmdzOiBTaW11bGF0aW9uV2FybmluZ1tdO1xuICBvcHRpbWl6YXRpb25UaXBzOiBPcHRpbWl6YXRpb25UaXBbXTtcbiAgbWV0cmljczogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xuICB9PjtcbiAgZGV0YWlsczogc3RyaW5nW107IC8vIEFkZGVkIHRvIHN0b3JlIHNpbXVsYXRpb24gZGV0YWlsc1xufTtcblxudHlwZSBMYXllclNpbVJlc3VsdCA9IHtcbiAgbGF5ZXJJZDogc3RyaW5nO1xuICBpbnB1dFNoYXBlOiBudW1iZXJbXTtcbiAgb3V0cHV0U2hhcGU6IG51bWJlcltdO1xuICBtZW1vcnlVc2FnZTogbnVtYmVyO1xuICBmbG9wczogbnVtYmVyO1xuICBpbmZlcmVuY2VUaW1lOiBudW1iZXI7XG4gIGlzQm90dGxlbmVjazogYm9vbGVhbjtcbn07XG5cbnR5cGUgUGVyZm9ybWFuY2VNZXRyaWNzID0ge1xuICB0b3RhbE1lbW9yeTogbnVtYmVyO1xuICB0b3RhbEZsb3BzOiBudW1iZXI7XG4gIGVzdGltYXRlZEZwczogbnVtYmVyO1xuICBncHVVdGlsaXphdGlvbjogbnVtYmVyO1xufTtcblxudHlwZSBTaW11bGF0aW9uV2FybmluZyA9IHtcbiAgbGF5ZXJJZDogc3RyaW5nO1xuICB0eXBlOiAnc2hhcGVfbWlzbWF0Y2gnIHwgJ3BlcmZvcm1hbmNlX2lzc3VlJyB8ICdhcmNoaXRlY3R1cmVfd2FybmluZyc7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgc3VnZ2VzdGlvbjogc3RyaW5nO1xufTtcblxudHlwZSBPcHRpbWl6YXRpb25UaXAgPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGltcGFjdDogJ2hpZ2gnIHwgJ21lZGl1bScgfCAnbG93JztcbiAgY2F0ZWdvcnk6ICdwZXJmb3JtYW5jZScgfCAnbWVtb3J5JyB8ICdhcmNoaXRlY3R1cmUnO1xufTtcblxuZXhwb3J0IGNsYXNzIE1vZGVsU2ltdWxhdG9yIHtcbiAgYXN5bmMgcnVuU2ltdWxhdGlvbihub2RlczogTW9kZWxOb2RlW10pOiBQcm9taXNlPFNpbXVsYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBsYXllclJlc3VsdHM6IExheWVyU2ltUmVzdWx0W10gPSBbXTtcbiAgICBjb25zdCB3YXJuaW5nczogU2ltdWxhdGlvbldhcm5pbmdbXSA9IFtdO1xuICAgIGxldCBjdXJyZW50U2hhcGUgPSBub2Rlc1swXT8uaW5wdXRTaGFwZXNbMF0gfHwgWzEsIDIyNCwgMjI0LCAzXTtcbiAgICBjb25zdCBkZXRhaWxzOiBzdHJpbmdbXSA9IFtdOyAvLyBBZGRlZCB0byBzdG9yZSBzaW11bGF0aW9uIGRldGFpbHNcblxuICAgIGRldGFpbHMucHVzaCgnSW5pdGlhbGl6aW5nIG1vZGVsIHNpbXVsYXRpb24uLi4nKTtcbiAgICBkZXRhaWxzLnB1c2goYEFuYWx5emluZyAke25vZGVzLmxlbmd0aH0gbGF5ZXJzIGZvciBwZXJmb3JtYW5jZSBjaGFyYWN0ZXJpc3RpY3NgKTtcblxuICAgIC8vIFNpbXVsYXRlIGZvcndhcmQgcGFzc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgIGNvbnN0IG5leHROb2RlID0gbm9kZXNbaSArIDFdO1xuICAgICAgZGV0YWlscy5wdXNoKGBTaW11bGF0aW5nIGxheWVyICR7bm9kZS5pZH06ICR7bm9kZS5uYW1lfWApO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNpbXVsYXRlTGF5ZXIobm9kZSwgY3VycmVudFNoYXBlLCBkZXRhaWxzKTtcbiAgICAgIGxheWVyUmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICBjdXJyZW50U2hhcGUgPSByZXN1bHQub3V0cHV0U2hhcGU7XG5cbiAgICAgIC8vIENoZWNrIGZvciBpbmNvbXBhdGliaWxpdGllc1xuICAgICAgaWYgKG5leHROb2RlICYmICF0aGlzLmFyZVNoYXBlc0NvbXBhdGlibGUocmVzdWx0Lm91dHB1dFNoYXBlLCBuZXh0Tm9kZSkpIHtcbiAgICAgICAgd2FybmluZ3MucHVzaCh7XG4gICAgICAgICAgbGF5ZXJJZDogbmV4dE5vZGUuaWQsXG4gICAgICAgICAgdHlwZTogJ3NoYXBlX21pc21hdGNoJyxcbiAgICAgICAgICBtZXNzYWdlOiBgU2hhcGUgbWlzbWF0Y2ggYmV0d2VlbiAke25vZGUubmFtZX0gYW5kICR7bmV4dE5vZGUubmFtZX1gLFxuICAgICAgICAgIHN1Z2dlc3Rpb246IHRoaXMuZ2VuZXJhdGVTaGFwZU1pc21hdGNoU3VnZ2VzdGlvbihyZXN1bHQub3V0cHV0U2hhcGUsIG5leHROb2RlKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBwZXJmb3JtYW5jZSBtZXRyaWNzXG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB0aGlzLmNhbGN1bGF0ZVBlcmZvcm1hbmNlTWV0cmljcyhsYXllclJlc3VsdHMpO1xuXG4gICAgLy8gR2VuZXJhdGUgb3B0aW1pemF0aW9uIHRpcHNcbiAgICBjb25zdCBvcHRpbWl6YXRpb25UaXBzID0gdGhpcy5nZW5lcmF0ZU9wdGltaXphdGlvblRpcHMobm9kZXMsIGxheWVyUmVzdWx0cyk7XG5cbiAgICAvLyBQbGFjZWhvbGRlciBmb3IgbWV0cmljcyAtICBOZWVkcyBmdXJ0aGVyIGRlZmluaXRpb24gYmFzZWQgb24gdGhlIGFuaW1hdGlvbiByZXF1aXJlbWVudHMuXG4gICAgY29uc3QgbWV0cmljcyA9IFt7bmFtZTogXCJUb3RhbCBGTE9QU1wiLCB2YWx1ZTogcGVyZm9ybWFuY2UudG90YWxGbG9wc30sIHtuYW1lOiBcIlRvdGFsIE1lbW9yeVwiLCB2YWx1ZTogcGVyZm9ybWFuY2UudG90YWxNZW1vcnl9XTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxheWVyUmVzdWx0cyxcbiAgICAgIHBlcmZvcm1hbmNlLFxuICAgICAgd2FybmluZ3MsXG4gICAgICBvcHRpbWl6YXRpb25UaXBzLFxuICAgICAgbWV0cmljcyxcbiAgICAgIGRldGFpbHNcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzaW11bGF0ZUxheWVyKG5vZGU6IE1vZGVsTm9kZSwgaW5wdXRTaGFwZTogbnVtYmVyW10sIGRldGFpbHM6IHN0cmluZ1tdKTogTGF5ZXJTaW1SZXN1bHQge1xuICAgIC8vIFNpbXVsYXRlIGxheWVyIGNvbXB1dGF0aW9uIGFuZCBzaGFwZSB0cmFuc2Zvcm1hdGlvblxuICAgIGRldGFpbHMucHVzaChgICBJbnB1dCBzaGFwZTogJHtpbnB1dFNoYXBlfWApO1xuICAgIGNvbnN0IG91dHB1dFNoYXBlID0gdGhpcy5jYWxjdWxhdGVPdXRwdXRTaGFwZShub2RlLCBpbnB1dFNoYXBlKTtcbiAgICBjb25zdCBmbG9wcyA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJGbG9wcyhub2RlLCBpbnB1dFNoYXBlKTtcbiAgICBjb25zdCBtZW1vcnlVc2FnZSA9IHRoaXMuY2FsY3VsYXRlTWVtb3J5VXNhZ2Uobm9kZSwgaW5wdXRTaGFwZSwgb3V0cHV0U2hhcGUpO1xuICAgIGNvbnN0IGluZmVyZW5jZVRpbWUgPSB0aGlzLmVzdGltYXRlSW5mZXJlbmNlVGltZShmbG9wcyk7XG4gICAgZGV0YWlscy5wdXNoKGAgIE91dHB1dCBzaGFwZTogJHtvdXRwdXRTaGFwZX1gKTtcbiAgICBkZXRhaWxzLnB1c2goYCAgRkxPUFM6ICR7ZmxvcHN9YCk7XG4gICAgZGV0YWlscy5wdXNoKGAgIE1lbW9yeSBVc2FnZTogJHttZW1vcnlVc2FnZX1gKTtcbiAgICBkZXRhaWxzLnB1c2goYCAgSW5mZXJlbmNlIFRpbWU6ICR7aW5mZXJlbmNlVGltZX1gKTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxheWVySWQ6IG5vZGUuaWQsXG4gICAgICBpbnB1dFNoYXBlLFxuICAgICAgb3V0cHV0U2hhcGUsXG4gICAgICBtZW1vcnlVc2FnZSxcbiAgICAgIGZsb3BzLFxuICAgICAgaW5mZXJlbmNlVGltZSxcbiAgICAgIGlzQm90dGxlbmVjazogZmxvcHMgPiAxMDAwMDAwIHx8IG1lbW9yeVVzYWdlID4gMTAwMDAwMFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZU91dHB1dFNoYXBlKG5vZGU6IE1vZGVsTm9kZSwgaW5wdXRTaGFwZTogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Nubic6XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgaW5wdXRTaGFwZVswXSxcbiAgICAgICAgICBpbnB1dFNoYXBlWzFdIC0gMixcbiAgICAgICAgICBpbnB1dFNoYXBlWzJdIC0gMixcbiAgICAgICAgICBub2RlLmF0dHJpYnV0ZXM/LmZpbHRlcnMgfHwgMzJcbiAgICAgICAgXTtcbiAgICAgIGNhc2UgJ3Bvb2xpbmcnOlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIGlucHV0U2hhcGVbMF0sXG4gICAgICAgICAgTWF0aC5mbG9vcihpbnB1dFNoYXBlWzFdIC8gMiksXG4gICAgICAgICAgTWF0aC5mbG9vcihpbnB1dFNoYXBlWzJdIC8gMiksXG4gICAgICAgICAgaW5wdXRTaGFwZVszXVxuICAgICAgICBdO1xuICAgICAgY2FzZSAnZmxhdHRlbic6XG4gICAgICAgIHJldHVybiBbaW5wdXRTaGFwZVswXSwgaW5wdXRTaGFwZS5zbGljZSgxKS5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKV07XG4gICAgICBjYXNlICdtbHAnOlxuICAgICAgICByZXR1cm4gW2lucHV0U2hhcGVbMF0sIG5vZGUuYXR0cmlidXRlcz8udW5pdHMgfHwgMTI4XTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBpbnB1dFNoYXBlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlTGF5ZXJGbG9wcyhub2RlOiBNb2RlbE5vZGUsIGlucHV0U2hhcGU6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICAvLyBTaW1wbGlmaWVkIEZMT1AgY2FsY3VsYXRpb25zXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Nubic6XG4gICAgICAgIGNvbnN0IGZpbHRlcnMgPSBub2RlLmF0dHJpYnV0ZXM/LmZpbHRlcnMgfHwgMzI7XG4gICAgICAgIGNvbnN0IGtlcm5lbFNpemUgPSBub2RlLmF0dHJpYnV0ZXM/Lmtlcm5lbFNpemUgfHwgMztcbiAgICAgICAgcmV0dXJuIGlucHV0U2hhcGVbMV0gKiBpbnB1dFNoYXBlWzJdICogaW5wdXRTaGFwZVszXSAqIGZpbHRlcnMgKiBrZXJuZWxTaXplICoga2VybmVsU2l6ZTtcbiAgICAgIGNhc2UgJ21scCc6XG4gICAgICAgIGNvbnN0IHVuaXRzID0gbm9kZS5hdHRyaWJ1dGVzPy51bml0cyB8fCAxMjg7XG4gICAgICAgIHJldHVybiBpbnB1dFNoYXBlWzFdICogdW5pdHM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gMTAwMDsgLy8gQmFzZSBjb3N0XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVNZW1vcnlVc2FnZShub2RlOiBNb2RlbE5vZGUsIGlucHV0U2hhcGU6IG51bWJlcltdLCBvdXRwdXRTaGFwZTogbnVtYmVyW10pOiBudW1iZXIge1xuICAgIC8vIENhbGN1bGF0ZSBtZW1vcnkgaW4gYnl0ZXMgKHNpbXBsaWZpZWQpXG4gICAgY29uc3QgaW5wdXRTaXplID0gaW5wdXRTaGFwZS5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKSAqIDQ7IC8vIDQgYnl0ZXMgcGVyIGZsb2F0XG4gICAgY29uc3Qgb3V0cHV0U2l6ZSA9IG91dHB1dFNoYXBlLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpICogNDtcbiAgICByZXR1cm4gaW5wdXRTaXplICsgb3V0cHV0U2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgZXN0aW1hdGVJbmZlcmVuY2VUaW1lKGZsb3BzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8vIFNpbXBsaWZpZWQgZXN0aW1hdGlvbjogYXNzdW1lIDEgVEZMT1AvcyBHUFVcbiAgICByZXR1cm4gZmxvcHMgLyAxMDAwMDAwMDAwO1xuICB9XG5cbiAgcHJpdmF0ZSBhcmVTaGFwZXNDb21wYXRpYmxlKG91dHB1dFNoYXBlOiBudW1iZXJbXSwgbmV4dE5vZGU6IE1vZGVsTm9kZSk6IGJvb2xlYW4ge1xuICAgIC8vIENoZWNrIGlmIHNoYXBlcyBhcmUgY29tcGF0aWJsZSBiZXR3ZWVuIGxheWVyc1xuICAgIGlmIChuZXh0Tm9kZS50eXBlID09PSAnZmxhdHRlbicpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBvdXRwdXRTaGFwZS5sZW5ndGggPT09IG5leHROb2RlLmlucHV0U2hhcGVzWzBdLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVTaGFwZU1pc21hdGNoU3VnZ2VzdGlvbihvdXRwdXRTaGFwZTogbnVtYmVyW10sIG5vZGU6IE1vZGVsTm9kZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBBZGQgYSByZXNoYXBlIGxheWVyIHRvIGNvbnZlcnQgJHtvdXRwdXRTaGFwZS5qb2luKCd4Jyl9IHRvIG1hdGNoICR7bm9kZS50eXBlfSBpbnB1dCByZXF1aXJlbWVudHNgO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVQZXJmb3JtYW5jZU1ldHJpY3MocmVzdWx0czogTGF5ZXJTaW1SZXN1bHRbXSk6IFBlcmZvcm1hbmNlTWV0cmljcyB7XG4gICAgY29uc3QgdG90YWxGbG9wcyA9IHJlc3VsdHMucmVkdWNlKChzdW0sIHIpID0+IHN1bSArIHIuZmxvcHMsIDApO1xuICAgIGNvbnN0IHRvdGFsTWVtb3J5ID0gcmVzdWx0cy5yZWR1Y2UoKHN1bSwgcikgPT4gc3VtICsgci5tZW1vcnlVc2FnZSwgMCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG90YWxGbG9wcyxcbiAgICAgIHRvdGFsTWVtb3J5LFxuICAgICAgZXN0aW1hdGVkRnBzOiAxMDAwIC8gTWF0aC5tYXgoLi4ucmVzdWx0cy5tYXAociA9PiByLmluZmVyZW5jZVRpbWUpKSxcbiAgICAgIGdwdVV0aWxpemF0aW9uOiBNYXRoLm1pbih0b3RhbEZsb3BzIC8gMTAwMDAwMDAwMCAqIDEwMCwgMTAwKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlT3B0aW1pemF0aW9uVGlwcyhub2RlczogTW9kZWxOb2RlW10sIHJlc3VsdHM6IExheWVyU2ltUmVzdWx0W10pOiBPcHRpbWl6YXRpb25UaXBbXSB7XG4gICAgY29uc3QgdGlwczogT3B0aW1pemF0aW9uVGlwW10gPSBbXTtcblxuICAgIC8vIENoZWNrIGZvciBjb21tb24gb3B0aW1pemF0aW9uIG9wcG9ydHVuaXRpZXNcbiAgICBpZiAoIW5vZGVzLnNvbWUobiA9PiBuLnR5cGUgPT09ICdub3JtYWxpemF0aW9uJykpIHtcbiAgICAgIHRpcHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnQWRkIEJhdGNoIE5vcm1hbGl6YXRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0NvbnNpZGVyIGFkZGluZyBCYXRjaE5vcm0gbGF5ZXJzIGFmdGVyIGNvbnZvbHV0aW9ucyB0byBpbXByb3ZlIHRyYWluaW5nIHN0YWJpbGl0eScsXG4gICAgICAgIGltcGFjdDogJ2hpZ2gnLFxuICAgICAgICBjYXRlZ29yeTogJ2FyY2hpdGVjdHVyZSdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGJvdHRsZW5lY2tzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLmlzQm90dGxlbmVjayk7XG4gICAgaWYgKGJvdHRsZW5lY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRpcHMucHVzaCh7XG4gICAgICAgIHRpdGxlOiAnUGVyZm9ybWFuY2UgQm90dGxlbmVja3MgRGV0ZWN0ZWQnLFxuICAgICAgICBkZXNjcmlwdGlvbjogYCR7Ym90dGxlbmVja3MubGVuZ3RofSBsYXllcnMgc2hvd2luZyBoaWdoIGNvbXB1dGF0aW9uIHRpbWVgLFxuICAgICAgICBpbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgY2F0ZWdvcnk6ICdwZXJmb3JtYW5jZSdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aXBzO1xuICB9XG59Il0sIm5hbWVzIjpbIk1vZGVsU2ltdWxhdG9yIiwicnVuU2ltdWxhdGlvbiIsIm5vZGVzIiwibGF5ZXJSZXN1bHRzIiwid2FybmluZ3MiLCJjdXJyZW50U2hhcGUiLCJpbnB1dFNoYXBlcyIsImRldGFpbHMiLCJwdXNoIiwibGVuZ3RoIiwiaSIsIm5vZGUiLCJuZXh0Tm9kZSIsImlkIiwibmFtZSIsInJlc3VsdCIsInNpbXVsYXRlTGF5ZXIiLCJvdXRwdXRTaGFwZSIsImFyZVNoYXBlc0NvbXBhdGlibGUiLCJsYXllcklkIiwidHlwZSIsIm1lc3NhZ2UiLCJzdWdnZXN0aW9uIiwiZ2VuZXJhdGVTaGFwZU1pc21hdGNoU3VnZ2VzdGlvbiIsInBlcmZvcm1hbmNlIiwiY2FsY3VsYXRlUGVyZm9ybWFuY2VNZXRyaWNzIiwib3B0aW1pemF0aW9uVGlwcyIsImdlbmVyYXRlT3B0aW1pemF0aW9uVGlwcyIsIm1ldHJpY3MiLCJ2YWx1ZSIsInRvdGFsRmxvcHMiLCJ0b3RhbE1lbW9yeSIsImlucHV0U2hhcGUiLCJjYWxjdWxhdGVPdXRwdXRTaGFwZSIsImZsb3BzIiwiY2FsY3VsYXRlTGF5ZXJGbG9wcyIsIm1lbW9yeVVzYWdlIiwiY2FsY3VsYXRlTWVtb3J5VXNhZ2UiLCJpbmZlcmVuY2VUaW1lIiwiZXN0aW1hdGVJbmZlcmVuY2VUaW1lIiwiaXNCb3R0bGVuZWNrIiwiYXR0cmlidXRlcyIsImZpbHRlcnMiLCJNYXRoIiwiZmxvb3IiLCJzbGljZSIsInJlZHVjZSIsImEiLCJiIiwidW5pdHMiLCJrZXJuZWxTaXplIiwiaW5wdXRTaXplIiwib3V0cHV0U2l6ZSIsImpvaW4iLCJyZXN1bHRzIiwic3VtIiwiciIsImVzdGltYXRlZEZwcyIsIm1heCIsIm1hcCIsImdwdVV0aWxpemF0aW9uIiwibWluIiwidGlwcyIsInNvbWUiLCJuIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImltcGFjdCIsImNhdGVnb3J5IiwiYm90dGxlbmVja3MiLCJmaWx0ZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/model/simulator.ts\n"));

/***/ })

});