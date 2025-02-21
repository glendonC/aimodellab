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

/***/ "(app-pages-browser)/./lib/model/analyzer.ts":
/*!*******************************!*\
  !*** ./lib/model/analyzer.ts ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModelAnalyzer: function() { return /* binding */ ModelAnalyzer; }\n/* harmony export */ });\n/* harmony import */ var _lib_huggingface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/huggingface */ \"(app-pages-browser)/./lib/huggingface.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"(app-pages-browser)/./lib/model/constants.ts\");\n/* __next_internal_client_entry_do_not_use__ ModelAnalyzer auto */ \n\nclass ModelAnalyzer {\n    async analyzeModel(modelId, onProgress) {\n        try {\n            // Loading stage\n            onProgress({\n                stage: \"loading\",\n                progress: 0,\n                message: \"Loading model information...\"\n            });\n            // Skip API call and use local architecture directly\n            const architecture = await (0,_lib_huggingface__WEBPACK_IMPORTED_MODULE_0__.getModelArchitecture)(modelId);\n            // Analysis stage\n            onProgress({\n                stage: \"analyzing\",\n                progress: 75,\n                message: \"Generating visualization...\"\n            });\n            const graph = {\n                nodes: architecture.nodes.map((node)=>({\n                        id: node.id,\n                        type: node.type,\n                        name: node.name,\n                        opType: modelId,\n                        params: node.params,\n                        flops: node.flops,\n                        memoryUsage: node.memoryUsage,\n                        inputShapes: [\n                            [\n                                1,\n                                3,\n                                224,\n                                224\n                            ]\n                        ],\n                        outputShapes: [\n                            [\n                                1,\n                                1000\n                            ]\n                        ],\n                        attributes: {}\n                    })),\n                edges: architecture.edges.map((edge)=>({\n                        id: \"\".concat(edge.source, \"-\").concat(edge.target),\n                        from: edge.source,\n                        to: edge.target,\n                        tensorShape: [\n                            1,\n                            1000\n                        ]\n                    })),\n                metadata: {\n                    framework: \"pytorch\",\n                    version: \"2.0\",\n                    totalParams: architecture.nodes.reduce((sum, node)=>sum + node.params, 0),\n                    totalFlops: architecture.nodes.reduce((sum, node)=>sum + node.flops, 0),\n                    totalMemory: architecture.nodes.reduce((sum, node)=>sum + node.memoryUsage, 0),\n                    modelId: modelId\n                }\n            };\n            // Complete\n            onProgress({\n                stage: \"complete\",\n                progress: 100,\n                message: \"Analysis complete\"\n            });\n            return {\n                graph,\n                performance: this.analyzePerformance(graph)\n            };\n        } catch (error) {\n            console.error(\"Model analysis failed:\", error);\n            throw error;\n        }\n    }\n    analyzePerformance(graph) {\n        var _graph_metadata_modelId;\n        const modelId = ((_graph_metadata_modelId = graph.metadata.modelId) === null || _graph_metadata_modelId === void 0 ? void 0 : _graph_metadata_modelId.toLowerCase()) || \"\";\n        let benchmarkKey = \"resnet-50\"; // default\n        // Map model ID to benchmark key\n        if (modelId.includes(\"yolo\")) benchmarkKey = \"yolov8\";\n        if (modelId.includes(\"stable\")) benchmarkKey = \"stable-diffusion\";\n        if (modelId.includes(\"llama\")) benchmarkKey = \"llama2\";\n        if (modelId.includes(\"gpt\")) benchmarkKey = \"gpt2\";\n        if (modelId.includes(\"bart\")) benchmarkKey = \"bart\";\n        if (modelId.includes(\"whisper\")) benchmarkKey = \"whisper\";\n        if (modelId.includes(\"vit\")) benchmarkKey = \"vit\";\n        if (modelId.includes(\"biobert\")) benchmarkKey = \"biobert\";\n        if (modelId.includes(\"dino\")) benchmarkKey = \"dinov2\";\n        const benchmarks = _constants__WEBPACK_IMPORTED_MODULE_1__.MODEL_BENCHMARKS[benchmarkKey];\n        return {\n            inferenceTime: benchmarks.cpu.latency,\n            memoryPeak: benchmarks.cpu.memoryUsage * 1024 * 1024 * 1024,\n            deviceUtilization: benchmarks.cpu.utilization / 100,\n            gpuMetrics: benchmarks.gpu\n        };\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2xpYi9tb2RlbC9hbmFseXplci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7bUVBRXlEO0FBRVY7QUFFeEMsTUFBTUU7SUFDWCxNQUFNQyxhQUNKQyxPQUFlLEVBQ2ZDLFVBQWdELEVBQ3ZCO1FBQ3pCLElBQUk7WUFDRixnQkFBZ0I7WUFDaEJBLFdBQVc7Z0JBQ1RDLE9BQU87Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFNBQVM7WUFDWDtZQUVBLG9EQUFvRDtZQUNwRCxNQUFNQyxlQUFlLE1BQU1ULHNFQUFvQkEsQ0FBQ0k7WUFFaEQsaUJBQWlCO1lBQ2pCQyxXQUFXO2dCQUNUQyxPQUFPO2dCQUNQQyxVQUFVO2dCQUNWQyxTQUFTO1lBQ1g7WUFFQSxNQUFNRSxRQUFvQjtnQkFDeEJDLE9BQU9GLGFBQWFFLEtBQUssQ0FBQ0MsR0FBRyxDQUFDQyxDQUFBQSxPQUFTO3dCQUNyQ0MsSUFBSUQsS0FBS0MsRUFBRTt3QkFDWEMsTUFBTUYsS0FBS0UsSUFBSTt3QkFDZkMsTUFBTUgsS0FBS0csSUFBSTt3QkFDZkMsUUFBUWI7d0JBQ1JjLFFBQVFMLEtBQUtLLE1BQU07d0JBQ25CQyxPQUFPTixLQUFLTSxLQUFLO3dCQUNqQkMsYUFBYVAsS0FBS08sV0FBVzt3QkFDN0JDLGFBQWE7NEJBQUM7Z0NBQUM7Z0NBQUc7Z0NBQUc7Z0NBQUs7NkJBQUk7eUJBQUM7d0JBQy9CQyxjQUFjOzRCQUFDO2dDQUFDO2dDQUFHOzZCQUFLO3lCQUFDO3dCQUN6QkMsWUFBWSxDQUFDO29CQUNmO2dCQUNBQyxPQUFPZixhQUFhZSxLQUFLLENBQUNaLEdBQUcsQ0FBQ2EsQ0FBQUEsT0FBUzt3QkFDckNYLElBQUksR0FBa0JXLE9BQWZBLEtBQUtDLE1BQU0sRUFBQyxLQUFlLE9BQVpELEtBQUtFLE1BQU07d0JBQ2pDQyxNQUFNSCxLQUFLQyxNQUFNO3dCQUNqQkcsSUFBSUosS0FBS0UsTUFBTTt3QkFDZkcsYUFBYTs0QkFBQzs0QkFBRzt5QkFBSztvQkFDeEI7Z0JBQ0FDLFVBQVU7b0JBQ1JDLFdBQVc7b0JBQ1hDLFNBQVM7b0JBQ1RDLGFBQWF6QixhQUFhRSxLQUFLLENBQUN3QixNQUFNLENBQUMsQ0FBQ0MsS0FBS3ZCLE9BQVN1QixNQUFNdkIsS0FBS0ssTUFBTSxFQUFFO29CQUN6RW1CLFlBQVk1QixhQUFhRSxLQUFLLENBQUN3QixNQUFNLENBQUMsQ0FBQ0MsS0FBS3ZCLE9BQVN1QixNQUFNdkIsS0FBS00sS0FBSyxFQUFFO29CQUN2RW1CLGFBQWE3QixhQUFhRSxLQUFLLENBQUN3QixNQUFNLENBQUMsQ0FBQ0MsS0FBS3ZCLE9BQVN1QixNQUFNdkIsS0FBS08sV0FBVyxFQUFFO29CQUM5RWhCLFNBQVNBO2dCQUNYO1lBQ0Y7WUFFQSxXQUFXO1lBQ1hDLFdBQVc7Z0JBQ1RDLE9BQU87Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFNBQVM7WUFDWDtZQUVBLE9BQU87Z0JBQ0xFO2dCQUNBNkIsYUFBYSxJQUFJLENBQUNDLGtCQUFrQixDQUFDOUI7WUFDdkM7UUFFRixFQUFFLE9BQU8rQixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQywwQkFBMEJBO1lBQ3hDLE1BQU1BO1FBQ1I7SUFDRjtJQUVRRCxtQkFBbUI5QixLQUFpQixFQUFFO1lBQzVCQTtRQUFoQixNQUFNTixVQUFVTSxFQUFBQSwwQkFBQUEsTUFBTXFCLFFBQVEsQ0FBQzNCLE9BQU8sY0FBdEJNLDhDQUFBQSx3QkFBd0JpQyxXQUFXLE9BQU07UUFDekQsSUFBSUMsZUFBZSxhQUFhLFVBQVU7UUFFMUMsZ0NBQWdDO1FBQ2hDLElBQUl4QyxRQUFReUMsUUFBUSxDQUFDLFNBQVNELGVBQWU7UUFDN0MsSUFBSXhDLFFBQVF5QyxRQUFRLENBQUMsV0FBV0QsZUFBZTtRQUMvQyxJQUFJeEMsUUFBUXlDLFFBQVEsQ0FBQyxVQUFVRCxlQUFlO1FBQzlDLElBQUl4QyxRQUFReUMsUUFBUSxDQUFDLFFBQVFELGVBQWU7UUFDNUMsSUFBSXhDLFFBQVF5QyxRQUFRLENBQUMsU0FBU0QsZUFBZTtRQUM3QyxJQUFJeEMsUUFBUXlDLFFBQVEsQ0FBQyxZQUFZRCxlQUFlO1FBQ2hELElBQUl4QyxRQUFReUMsUUFBUSxDQUFDLFFBQVFELGVBQWU7UUFDNUMsSUFBSXhDLFFBQVF5QyxRQUFRLENBQUMsWUFBWUQsZUFBZTtRQUNoRCxJQUFJeEMsUUFBUXlDLFFBQVEsQ0FBQyxTQUFTRCxlQUFlO1FBRTdDLE1BQU1FLGFBQWE3Qyx3REFBZ0IsQ0FBQzJDLGFBQWE7UUFFakQsT0FBTztZQUNMRyxlQUFlRCxXQUFXRSxHQUFHLENBQUNDLE9BQU87WUFDckNDLFlBQVlKLFdBQVdFLEdBQUcsQ0FBQzVCLFdBQVcsR0FBRyxPQUFPLE9BQU87WUFDdkQrQixtQkFBbUJMLFdBQVdFLEdBQUcsQ0FBQ0ksV0FBVyxHQUFHO1lBQ2hEQyxZQUFZUCxXQUFXUSxHQUFHO1FBQzVCO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9saWIvbW9kZWwvYW5hbHl6ZXIudHM/Yjc1OCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgZ2V0TW9kZWxBcmNoaXRlY3R1cmUgfSBmcm9tICdAL2xpYi9odWdnaW5nZmFjZSc7XG5pbXBvcnQgeyBNb2RlbEdyYXBoLCBBbmFseXNpc1Byb2dyZXNzLCBBbmFseXNpc1Jlc3VsdCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgTU9ERUxfQkVOQ0hNQVJLUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIE1vZGVsQW5hbHl6ZXIge1xuICBhc3luYyBhbmFseXplTW9kZWwoXG4gICAgbW9kZWxJZDogc3RyaW5nLFxuICAgIG9uUHJvZ3Jlc3M6IChwcm9ncmVzczogQW5hbHlzaXNQcm9ncmVzcykgPT4gdm9pZFxuICApOiBQcm9taXNlPEFuYWx5c2lzUmVzdWx0PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIExvYWRpbmcgc3RhZ2VcbiAgICAgIG9uUHJvZ3Jlc3Moe1xuICAgICAgICBzdGFnZTogJ2xvYWRpbmcnLFxuICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgbWVzc2FnZTogJ0xvYWRpbmcgbW9kZWwgaW5mb3JtYXRpb24uLi4nXG4gICAgICB9KTtcblxuICAgICAgLy8gU2tpcCBBUEkgY2FsbCBhbmQgdXNlIGxvY2FsIGFyY2hpdGVjdHVyZSBkaXJlY3RseVxuICAgICAgY29uc3QgYXJjaGl0ZWN0dXJlID0gYXdhaXQgZ2V0TW9kZWxBcmNoaXRlY3R1cmUobW9kZWxJZCk7XG5cbiAgICAgIC8vIEFuYWx5c2lzIHN0YWdlXG4gICAgICBvblByb2dyZXNzKHtcbiAgICAgICAgc3RhZ2U6ICdhbmFseXppbmcnLFxuICAgICAgICBwcm9ncmVzczogNzUsXG4gICAgICAgIG1lc3NhZ2U6ICdHZW5lcmF0aW5nIHZpc3VhbGl6YXRpb24uLi4nXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZ3JhcGg6IE1vZGVsR3JhcGggPSB7XG4gICAgICAgIG5vZGVzOiBhcmNoaXRlY3R1cmUubm9kZXMubWFwKG5vZGUgPT4gKHtcbiAgICAgICAgICBpZDogbm9kZS5pZCxcbiAgICAgICAgICB0eXBlOiBub2RlLnR5cGUgYXMgYW55LFxuICAgICAgICAgIG5hbWU6IG5vZGUubmFtZSxcbiAgICAgICAgICBvcFR5cGU6IG1vZGVsSWQsXG4gICAgICAgICAgcGFyYW1zOiBub2RlLnBhcmFtcyxcbiAgICAgICAgICBmbG9wczogbm9kZS5mbG9wcyxcbiAgICAgICAgICBtZW1vcnlVc2FnZTogbm9kZS5tZW1vcnlVc2FnZSxcbiAgICAgICAgICBpbnB1dFNoYXBlczogW1sxLCAzLCAyMjQsIDIyNF1dLFxuICAgICAgICAgIG91dHB1dFNoYXBlczogW1sxLCAxMDAwXV0sXG4gICAgICAgICAgYXR0cmlidXRlczoge31cbiAgICAgICAgfSkpLFxuICAgICAgICBlZGdlczogYXJjaGl0ZWN0dXJlLmVkZ2VzLm1hcChlZGdlID0+ICh7XG4gICAgICAgICAgaWQ6IGAke2VkZ2Uuc291cmNlfS0ke2VkZ2UudGFyZ2V0fWAsXG4gICAgICAgICAgZnJvbTogZWRnZS5zb3VyY2UsXG4gICAgICAgICAgdG86IGVkZ2UudGFyZ2V0LFxuICAgICAgICAgIHRlbnNvclNoYXBlOiBbMSwgMTAwMF1cbiAgICAgICAgfSkpLFxuICAgICAgICBtZXRhZGF0YToge1xuICAgICAgICAgIGZyYW1ld29yazogJ3B5dG9yY2gnLFxuICAgICAgICAgIHZlcnNpb246ICcyLjAnLFxuICAgICAgICAgIHRvdGFsUGFyYW1zOiBhcmNoaXRlY3R1cmUubm9kZXMucmVkdWNlKChzdW0sIG5vZGUpID0+IHN1bSArIG5vZGUucGFyYW1zLCAwKSxcbiAgICAgICAgICB0b3RhbEZsb3BzOiBhcmNoaXRlY3R1cmUubm9kZXMucmVkdWNlKChzdW0sIG5vZGUpID0+IHN1bSArIG5vZGUuZmxvcHMsIDApLFxuICAgICAgICAgIHRvdGFsTWVtb3J5OiBhcmNoaXRlY3R1cmUubm9kZXMucmVkdWNlKChzdW0sIG5vZGUpID0+IHN1bSArIG5vZGUubWVtb3J5VXNhZ2UsIDApLFxuICAgICAgICAgIG1vZGVsSWQ6IG1vZGVsSWRcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gQ29tcGxldGVcbiAgICAgIG9uUHJvZ3Jlc3Moe1xuICAgICAgICBzdGFnZTogJ2NvbXBsZXRlJyxcbiAgICAgICAgcHJvZ3Jlc3M6IDEwMCxcbiAgICAgICAgbWVzc2FnZTogJ0FuYWx5c2lzIGNvbXBsZXRlJ1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdyYXBoLFxuICAgICAgICBwZXJmb3JtYW5jZTogdGhpcy5hbmFseXplUGVyZm9ybWFuY2UoZ3JhcGgpXG4gICAgICB9O1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ01vZGVsIGFuYWx5c2lzIGZhaWxlZDonLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFuYWx5emVQZXJmb3JtYW5jZShncmFwaDogTW9kZWxHcmFwaCkge1xuICAgIGNvbnN0IG1vZGVsSWQgPSBncmFwaC5tZXRhZGF0YS5tb2RlbElkPy50b0xvd2VyQ2FzZSgpIHx8ICcnO1xuICAgIGxldCBiZW5jaG1hcmtLZXkgPSAncmVzbmV0LTUwJzsgLy8gZGVmYXVsdFxuICBcbiAgICAvLyBNYXAgbW9kZWwgSUQgdG8gYmVuY2htYXJrIGtleVxuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCd5b2xvJykpIGJlbmNobWFya0tleSA9ICd5b2xvdjgnO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCdzdGFibGUnKSkgYmVuY2htYXJrS2V5ID0gJ3N0YWJsZS1kaWZmdXNpb24nO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCdsbGFtYScpKSBiZW5jaG1hcmtLZXkgPSAnbGxhbWEyJztcbiAgICBpZiAobW9kZWxJZC5pbmNsdWRlcygnZ3B0JykpIGJlbmNobWFya0tleSA9ICdncHQyJztcbiAgICBpZiAobW9kZWxJZC5pbmNsdWRlcygnYmFydCcpKSBiZW5jaG1hcmtLZXkgPSAnYmFydCc7XG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ3doaXNwZXInKSkgYmVuY2htYXJrS2V5ID0gJ3doaXNwZXInO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCd2aXQnKSkgYmVuY2htYXJrS2V5ID0gJ3ZpdCc7XG4gICAgaWYgKG1vZGVsSWQuaW5jbHVkZXMoJ2Jpb2JlcnQnKSkgYmVuY2htYXJrS2V5ID0gJ2Jpb2JlcnQnO1xuICAgIGlmIChtb2RlbElkLmluY2x1ZGVzKCdkaW5vJykpIGJlbmNobWFya0tleSA9ICdkaW5vdjInO1xuICBcbiAgICBjb25zdCBiZW5jaG1hcmtzID0gTU9ERUxfQkVOQ0hNQVJLU1tiZW5jaG1hcmtLZXldO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBpbmZlcmVuY2VUaW1lOiBiZW5jaG1hcmtzLmNwdS5sYXRlbmN5LFxuICAgICAgbWVtb3J5UGVhazogYmVuY2htYXJrcy5jcHUubWVtb3J5VXNhZ2UgKiAxMDI0ICogMTAyNCAqIDEwMjQsXG4gICAgICBkZXZpY2VVdGlsaXphdGlvbjogYmVuY2htYXJrcy5jcHUudXRpbGl6YXRpb24gLyAxMDAsXG4gICAgICBncHVNZXRyaWNzOiBiZW5jaG1hcmtzLmdwdVxuICAgIH07XG4gIH1cbn0iXSwibmFtZXMiOlsiZ2V0TW9kZWxBcmNoaXRlY3R1cmUiLCJNT0RFTF9CRU5DSE1BUktTIiwiTW9kZWxBbmFseXplciIsImFuYWx5emVNb2RlbCIsIm1vZGVsSWQiLCJvblByb2dyZXNzIiwic3RhZ2UiLCJwcm9ncmVzcyIsIm1lc3NhZ2UiLCJhcmNoaXRlY3R1cmUiLCJncmFwaCIsIm5vZGVzIiwibWFwIiwibm9kZSIsImlkIiwidHlwZSIsIm5hbWUiLCJvcFR5cGUiLCJwYXJhbXMiLCJmbG9wcyIsIm1lbW9yeVVzYWdlIiwiaW5wdXRTaGFwZXMiLCJvdXRwdXRTaGFwZXMiLCJhdHRyaWJ1dGVzIiwiZWRnZXMiLCJlZGdlIiwic291cmNlIiwidGFyZ2V0IiwiZnJvbSIsInRvIiwidGVuc29yU2hhcGUiLCJtZXRhZGF0YSIsImZyYW1ld29yayIsInZlcnNpb24iLCJ0b3RhbFBhcmFtcyIsInJlZHVjZSIsInN1bSIsInRvdGFsRmxvcHMiLCJ0b3RhbE1lbW9yeSIsInBlcmZvcm1hbmNlIiwiYW5hbHl6ZVBlcmZvcm1hbmNlIiwiZXJyb3IiLCJjb25zb2xlIiwidG9Mb3dlckNhc2UiLCJiZW5jaG1hcmtLZXkiLCJpbmNsdWRlcyIsImJlbmNobWFya3MiLCJpbmZlcmVuY2VUaW1lIiwiY3B1IiwibGF0ZW5jeSIsIm1lbW9yeVBlYWsiLCJkZXZpY2VVdGlsaXphdGlvbiIsInV0aWxpemF0aW9uIiwiZ3B1TWV0cmljcyIsImdwdSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./lib/model/analyzer.ts\n"));

/***/ })

});