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

/***/ "(app-pages-browser)/./components/model/LayerStats.tsx":
/*!*****************************************!*\
  !*** ./components/model/LayerStats.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LayerStats: function() { return /* binding */ LayerStats; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs\");\n/* harmony import */ var _barrel_optimize_names_Layers_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Layers!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/layers.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ \"(app-pages-browser)/./components/model/constants.ts\");\n/* __next_internal_client_entry_do_not_use__ LayerStats auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n// Add this component definition before the LayerStats component\nfunction StatBar(param) {\n    let { label, value, percentage, powerMode, color } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n        initial: {\n            opacity: 0,\n            y: 20\n        },\n        animate: {\n            opacity: 1,\n            y: 0\n        },\n        transition: {\n            duration: 0.3\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-between text-sm mb-1\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: powerMode ? \"text-white/70\" : \"text-gray-600\",\n                        children: label\n                    }, void 0, false, {\n                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                        lineNumber: 57,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: powerMode ? \"text-white\" : \"text-black\",\n                        children: value\n                    }, void 0, false, {\n                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                lineNumber: 56,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"h-2 rounded-full overflow-hidden\", powerMode ? \"bg-\".concat(color, \"-500/20\") : \"bg-\".concat(color, \"-500/10\")),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n                    initial: {\n                        width: 0\n                    },\n                    animate: {\n                        width: \"\".concat(percentage, \"%\")\n                    },\n                    transition: {\n                        duration: 0.5,\n                        ease: \"easeOut\"\n                    },\n                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"h-full rounded-full\", \"bg-\".concat(color, \"-500\"))\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                    lineNumber: 68,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n        lineNumber: 51,\n        columnNumber: 5\n    }, this);\n}\n_c = StatBar;\nfunction LayerStats(param) {\n    let { type, powerMode, isHighlighted, analysisData } = param;\n    _s();\n    // Update the getModelStats function to return the correct type\n    const getModelStats = ()=>{\n        if (!analysisData) {\n            // Get current model type\n            const modelType = window.location.pathname.includes(\"yolo\") ? \"yolov8\" : window.location.pathname.includes(\"gpt\") ? \"gpt2\" : window.location.pathname.includes(\"transformer\") ? \"transformer\" : \"resnet\";\n            // Check if this layer type exists in the model-specific stats\n            if (_constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_STATS[modelType] && _constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_STATS[modelType][type]) {\n                console.log(\"Found model-specific stats:\", modelType, type);\n                return _constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_STATS[modelType][type];\n            }\n            // If not, check for generic layer stats\n            if (_constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_STATS[type]) {\n                console.log(\"Found generic stats:\", type);\n                return _constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_STATS[type];\n            }\n            console.log(\"Using default stats for:\", type);\n            return {\n                neurons: 1024,\n                inferenceTime: 1.0,\n                memoryUsage: 1.0,\n                activations: \"ReLU\"\n            };\n        }\n        // Convert analysisData to match LayerStats type\n        return {\n            neurons: analysisData.params || 1024,\n            inferenceTime: analysisData.inferenceTime || 1.0,\n            memoryUsage: analysisData.memoryUsage || 1.0,\n            activations: \"ReLU\",\n            ...analysisData\n        };\n    };\n    const stats = getModelStats();\n    const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n        initial: {\n            opacity: 0,\n            x: -20\n        },\n        animate: {\n            opacity: 1,\n            x: 0\n        },\n        exit: {\n            opacity: 0,\n            x: -20\n        },\n        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"fixed left-4 rounded-lg backdrop-blur-md w-72 transition-all duration-300\", \"z-50\", powerMode ? \"bg-black/80 border border-white/20\" : \"bg-white/95 border border-border\", isHighlighted && (powerMode ? \"border-cyan-500/50\" : \"border-primary\")),\n        style: {\n            top: \"50%\",\n            transform: \"translateY(-50%)\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {\n                className: \"p-4 border-b transition-colors duration-300\",\n                initial: false,\n                animate: {\n                    borderColor: powerMode ? isHighlighted ? \"rgba(6, 182, 212, 0.5)\" : \"rgba(255, 255, 255, 0.2)\" : \"\"\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"text-lg font-bold mb-1 flex items-center gap-2\", powerMode ? \"text-white\" : \"text-black\"),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Layers_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"w-5 h-5\", powerMode && \"text-cyan-400\")\n                            }, void 0, false, {\n                                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                                lineNumber: 165,\n                                columnNumber: 11\n                            }, this),\n                            type.charAt(0).toUpperCase() + type.slice(1),\n                            \" Layer\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                        lineNumber: 161,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"text-sm\", powerMode ? \"text-white/70\" : \"text-gray-600\"),\n                        children: \"Layer-specific performance metrics and configuration\"\n                    }, void 0, false, {\n                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                        lineNumber: 171,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                lineNumber: 150,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-4 space-y-4\",\n                children: analysisData ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"Parameters\",\n                            value: stats.params.toLocaleString(),\n                            percentage: stats.params / 150528 * 100,\n                            powerMode: powerMode,\n                            color: \"cyan\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 183,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"FLOPs\",\n                            value: \"\".concat((stats.flops / 1e6).toFixed(1), \"M\"),\n                            percentage: stats.flops / 1e9 * 100,\n                            powerMode: powerMode,\n                            color: \"yellow\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 191,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"Memory\",\n                            value: \"\".concat((stats.memoryUsage / (1024 * 1024)).toFixed(1), \" MB\"),\n                            percentage: stats.memoryUsage / (1024 * 1024 * 100) * 100,\n                            powerMode: powerMode,\n                            color: \"purple\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 199,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"Neurons\",\n                            value: stats.neurons.toLocaleString(),\n                            percentage: stats.neurons / 150528 * 100,\n                            powerMode: powerMode,\n                            color: \"cyan\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 209,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"Inference Time\",\n                            value: \"\".concat(stats.inferenceTime, \" ms\"),\n                            percentage: stats.inferenceTime / 3.5 * 100,\n                            powerMode: powerMode,\n                            color: \"yellow\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 217,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StatBar, {\n                            label: \"Memory Usage\",\n                            value: \"\".concat(stats.memoryUsage, \" MB\"),\n                            percentage: stats.memoryUsage / 8.6 * 100,\n                            powerMode: powerMode,\n                            color: \"purple\"\n                        }, void 0, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                            lineNumber: 225,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n                lineNumber: 180,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/model/LayerStats.tsx\",\n        lineNumber: 132,\n        columnNumber: 5\n    }, this);\n}\n_s(LayerStats, \"FPNvbbHVlWWR4LKxxNntSxiIS38=\");\n_c1 = LayerStats;\nvar _c, _c1;\n$RefreshReg$(_c, \"StatBar\");\n$RefreshReg$(_c1, \"LayerStats\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvbW9kZWwvTGF5ZXJTdGF0cy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUV3RDtBQUNMO0FBQ2xCO0FBQ0E7QUFDUztBQXlDMUMsZ0VBQWdFO0FBQ2hFLFNBQVNLLFFBQVEsS0FBNEQ7UUFBNUQsRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEVBQUVDLFVBQVUsRUFBRUMsU0FBUyxFQUFFQyxLQUFLLEVBQWdCLEdBQTVEO0lBQ2YscUJBQ0UsOERBQUNWLGlEQUFNQSxDQUFDVyxHQUFHO1FBQ1RDLFNBQVM7WUFBRUMsU0FBUztZQUFHQyxHQUFHO1FBQUc7UUFDN0JDLFNBQVM7WUFBRUYsU0FBUztZQUFHQyxHQUFHO1FBQUU7UUFDNUJFLFlBQVk7WUFBRUMsVUFBVTtRQUFJOzswQkFFNUIsOERBQUNOO2dCQUFJTyxXQUFVOztrQ0FDYiw4REFBQ0M7d0JBQUtELFdBQVdULFlBQVksa0JBQWtCO2tDQUM1Q0g7Ozs7OztrQ0FFSCw4REFBQ2E7d0JBQUtELFdBQVdULFlBQVksZUFBZTtrQ0FDekNGOzs7Ozs7Ozs7Ozs7MEJBR0wsOERBQUNJO2dCQUFJTyxXQUFXZiw4Q0FBRUEsQ0FDaEIsb0NBQ0FNLFlBQVksTUFBWSxPQUFOQyxPQUFNLGFBQVcsTUFBWSxPQUFOQSxPQUFNOzBCQUUvQyw0RUFBQ1YsaURBQU1BLENBQUNXLEdBQUc7b0JBQ1RDLFNBQVM7d0JBQUVRLE9BQU87b0JBQUU7b0JBQ3BCTCxTQUFTO3dCQUFFSyxPQUFPLEdBQWMsT0FBWFosWUFBVztvQkFBRztvQkFDbkNRLFlBQVk7d0JBQUVDLFVBQVU7d0JBQUtJLE1BQU07b0JBQVU7b0JBQzdDSCxXQUFXZiw4Q0FBRUEsQ0FDWCx1QkFDQSxNQUFZLE9BQU5PLE9BQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXhCO0tBL0JTTDtBQWlDRixTQUFTaUIsV0FBVyxLQUtUO1FBTFMsRUFDekJDLElBQUksRUFDSmQsU0FBUyxFQUNUZSxhQUFhLEVBQ2JDLFlB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QUN6Qy9DLFlBQVksTUFBTzhDLEtBQUssR0FBRyxNQUFPOzRCQUNsQzdDLFdBQVdBOzRCQUNYQyxPQUFNOzs7Ozs7c0NBR1IsOERBQUNMOzRCQUNDQyxPQUFNOzRCQUNOQyxPQUFPLEdBQWtELE9BQS9DLENBQUNnQyxNQUFNSCxXQUFXLEdBQUksUUFBTyxJQUFHLENBQUMsRUFBR21CLE9BQU8sQ0FBQyxJQUFHOzRCQUN6RC9DLFlBQVksTUFBTzRCLFdBQVcsR0FBSSxRQUFPLE9BQU8sR0FBRSxJQUFNOzRCQUN4RDNCLFdBQVdBOzRCQUNYQyxPQUFNOzs7Ozs7O2lEQUlWOztzQ0FDRSw4REFBQ0w7NEJBQ0NDLE9BQU07NEJBQ05DLE9BQU9nQyxNQUFNTCxPQUFPLENBQUNtQixjQUFjOzRCQUNuQzdDLFlBQVksTUFBTzBCLE9BQU8sR0FBRyxTQUFVOzRCQUN2Q3pCLFdBQVdBOzRCQUNYQyxPQUFNOzs7Ozs7c0NBR1IsOERBQUNMOzRCQUNDQyxPQUFNOzRCQUNOQyxPQUFPLEdBQXVCLE9BQXBCZ0MsTUFBTUosYUFBYSxFQUFDOzRCQUM5QjNCLFlBQVksTUFBTzJCLGFBQWEsR0FBRyxNQUFPOzRCQUMxQzFCLFdBQVdBOzRCQUNYQyxPQUFNOzs7Ozs7c0NBR1IsOERBQUNMOzRCQUNDQyxPQUFNOzRCQUNOQyxPQUFPLEdBQXFCLE9BQWxCZ0MsTUFBTUgsV0FBVyxFQUFDOzRCQUM1QjVCLFlBQVksTUFBTzRCLFdBQVcsR0FBRyxNQUFPOzRCQUN4QzNCLFdBQVdBOzRCQUNYQyxPQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT3BCO0dBM0pnQlk7TUFBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9tb2RlbC9MYXllclN0YXRzLnRzeD85MjZmIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ2ZyYW1lci1tb3Rpb24nO1xuaW1wb3J0IHsgTGF5ZXJzLCBDaGV2cm9uRG93biB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNuIH0gZnJvbSAnQC9saWIvdXRpbHMnO1xuaW1wb3J0IHsgTEFZRVJfU1RBVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBMYXllclR5cGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE1vZGVsTm9kZSB9IGZyb20gJ0AvbGliL21vZGVsL3R5cGVzJztcblxudHlwZSBMYXllclN0YXRzUHJvcHMgPSB7XG4gIHR5cGU6IExheWVyVHlwZTtcbiAgcG93ZXJNb2RlOiBib29sZWFuO1xuICBpc0hpZ2hsaWdodGVkOiBib29sZWFuO1xuICBhbmFseXNpc0RhdGE/OiBNb2RlbE5vZGU7XG59O1xuXG4vLyBSZW1vdmUgdGhlIGNvbXBsZXggdHlwZSBkZWZpbml0aW9ucyBhbmQgcmVwbGFjZSB3aXRoOlxudHlwZSBNb2RlbFR5cGVzID0gJ3Jlc25ldCcgfCAneW9sb3Y4JyB8ICdncHQyJyB8ICd0cmFuc2Zvcm1lcic7XG5cbi8vIFVwZGF0ZSB0aGUgdHlwZSBkZWZpbml0aW9uXG50eXBlIExheWVyU3RhdHMgPSB7XG4gIG5ldXJvbnM6IG51bWJlcjtcbiAgaW5mZXJlbmNlVGltZTogbnVtYmVyO1xuICBtZW1vcnlVc2FnZTogbnVtYmVyO1xuICBmaWx0ZXJzPzogc3RyaW5nO1xuICBhY3RpdmF0aW9uczogc3RyaW5nO1xuICBwYXJhbXM/OiBudW1iZXI7XG4gIGZsb3BzPzogbnVtYmVyO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG50eXBlIExheWVyU3RhdHNUeXBlID0ge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgW2tleTogc3RyaW5nXTogTGF5ZXJTdGF0cztcbiAgfTtcbn07XG5cbi8vIEFkZCB0aGVzZSB0eXBlIGRlZmluaXRpb25zIGF0IHRoZSB0b3Agd2l0aCB0aGUgb3RoZXIgdHlwZXNcbnR5cGUgU3RhdEJhclByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBwZXJjZW50YWdlOiBudW1iZXI7XG4gIHBvd2VyTW9kZTogYm9vbGVhbjtcbiAgY29sb3I6ICdjeWFuJyB8ICd5ZWxsb3cnIHwgJ3B1cnBsZSc7XG59O1xuXG4vLyBBZGQgdGhpcyBjb21wb25lbnQgZGVmaW5pdGlvbiBiZWZvcmUgdGhlIExheWVyU3RhdHMgY29tcG9uZW50XG5mdW5jdGlvbiBTdGF0QmFyKHsgbGFiZWwsIHZhbHVlLCBwZXJjZW50YWdlLCBwb3dlck1vZGUsIGNvbG9yIH06IFN0YXRCYXJQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uZGl2XG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDIwIH19XG4gICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMyB9fVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbSBtYi0xXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cG93ZXJNb2RlID8gXCJ0ZXh0LXdoaXRlLzcwXCIgOiBcInRleHQtZ3JheS02MDBcIn0+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17cG93ZXJNb2RlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtYmxhY2tcIn0+XG4gICAgICAgICAge3ZhbHVlfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgXCJoLTIgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiLFxuICAgICAgICBwb3dlck1vZGUgPyBgYmctJHtjb2xvcn0tNTAwLzIwYCA6IGBiZy0ke2NvbG9yfS01MDAvMTBgXG4gICAgICApfT5cbiAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19XG4gICAgICAgICAgYW5pbWF0ZT17eyB3aWR0aDogYCR7cGVyY2VudGFnZX0lYCB9fVxuICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNSwgZWFzZTogXCJlYXNlT3V0XCIgfX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NuKFxuICAgICAgICAgICAgXCJoLWZ1bGwgcm91bmRlZC1mdWxsXCIsXG4gICAgICAgICAgICBgYmctJHtjb2xvcn0tNTAwYFxuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L21vdGlvbi5kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYXllclN0YXRzKHsgXG4gIHR5cGUsIFxuICBwb3dlck1vZGUsIFxuICBpc0hpZ2hsaWdodGVkLFxuICBhbmFseXNpc0RhdGEgXG59OiBMYXllclN0YXRzUHJvcHMpIHtcbiAgLy8gVXBkYXRlIHRoZSBnZXRNb2RlbFN0YXRzIGZ1bmN0aW9uIHRvIHJldHVybiB0aGUgY29ycmVjdCB0eXBlXG4gIGNvbnN0IGdldE1vZGVsU3RhdHMgPSAoKTogTGF5ZXJTdGF0cyA9PiB7XG4gICAgaWYgKCFhbmFseXNpc0RhdGEpIHtcbiAgICAgIC8vIEdldCBjdXJyZW50IG1vZGVsIHR5cGVcbiAgICAgIGNvbnN0IG1vZGVsVHlwZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygneW9sbycpID8gJ3lvbG92OCcgOlxuICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoJ2dwdCcpID8gJ2dwdDInIDpcbiAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKCd0cmFuc2Zvcm1lcicpID8gJ3RyYW5zZm9ybWVyJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICdyZXNuZXQnO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIGxheWVyIHR5cGUgZXhpc3RzIGluIHRoZSBtb2RlbC1zcGVjaWZpYyBzdGF0c1xuICAgICAgaWYgKExBWUVSX1NUQVRTW21vZGVsVHlwZV0gJiYgTEFZRVJfU1RBVFNbbW9kZWxUeXBlXVt0eXBlXSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQgbW9kZWwtc3BlY2lmaWMgc3RhdHM6JywgbW9kZWxUeXBlLCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIExBWUVSX1NUQVRTW21vZGVsVHlwZV1bdHlwZV07XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5vdCwgY2hlY2sgZm9yIGdlbmVyaWMgbGF5ZXIgc3RhdHNcbiAgICAgIGlmIChMQVlFUl9TVEFUU1t0eXBlXSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRm91bmQgZ2VuZXJpYyBzdGF0czonLCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIExBWUVSX1NUQVRTW3R5cGVdO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygnVXNpbmcgZGVmYXVsdCBzdGF0cyBmb3I6JywgdHlwZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZXVyb25zOiAxMDI0LFxuICAgICAgICBpbmZlcmVuY2VUaW1lOiAxLjAsXG4gICAgICAgIG1lbW9yeVVzYWdlOiAxLjAsXG4gICAgICAgIGFjdGl2YXRpb25zOiAnUmVMVSdcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIENvbnZlcnQgYW5hbHlzaXNEYXRhIHRvIG1hdGNoIExheWVyU3RhdHMgdHlwZVxuICAgIHJldHVybiB7XG4gICAgICBuZXVyb25zOiBhbmFseXNpc0RhdGEucGFyYW1zIHx8IDEwMjQsXG4gICAgICBpbmZlcmVuY2VUaW1lOiBhbmFseXNpc0RhdGEuaW5mZXJlbmNlVGltZSB8fCAxLjAsXG4gICAgICBtZW1vcnlVc2FnZTogYW5hbHlzaXNEYXRhLm1lbW9yeVVzYWdlIHx8IDEuMCxcbiAgICAgIGFjdGl2YXRpb25zOiAnUmVMVScsXG4gICAgICAuLi5hbmFseXNpc0RhdGFcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHN0YXRzID0gZ2V0TW9kZWxTdGF0cygpO1xuICBjb25zdCBbaXNFeHBhbmRlZCwgc2V0SXNFeHBhbmRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIFxuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uZGl2XG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHg6IC0yMCB9fVxuICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB4OiAwIH19XG4gICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHg6IC0yMCB9fVxuICAgICAgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgXCJmaXhlZCBsZWZ0LTQgcm91bmRlZC1sZyBiYWNrZHJvcC1ibHVyLW1kIHctNzIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCIsXG4gICAgICAgIFwiei01MFwiLFxuICAgICAgICBwb3dlck1vZGUgXG4gICAgICAgICAgPyBcImJnLWJsYWNrLzgwIGJvcmRlciBib3JkZXItd2hpdGUvMjBcIlxuICAgICAgICAgIDogXCJiZy13aGl0ZS85NSBib3JkZXIgYm9yZGVyLWJvcmRlclwiLFxuICAgICAgICBpc0hpZ2hsaWdodGVkICYmIChwb3dlck1vZGUgPyBcImJvcmRlci1jeWFuLTUwMC81MFwiIDogXCJib3JkZXItcHJpbWFyeVwiKVxuICAgICAgKX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknXG4gICAgICB9fVxuICAgID5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgY2xhc3NOYW1lPVwicC00IGJvcmRlci1iIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgIGluaXRpYWw9e2ZhbHNlfVxuICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHBvd2VyTW9kZSBcbiAgICAgICAgICAgID8gaXNIaWdobGlnaHRlZCBcbiAgICAgICAgICAgICAgPyBcInJnYmEoNiwgMTgyLCAyMTIsIDAuNSlcIiBcbiAgICAgICAgICAgICAgOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKVwiXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT17Y24oXG4gICAgICAgICAgXCJ0ZXh0LWxnIGZvbnQtYm9sZCBtYi0xIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsXG4gICAgICAgICAgcG93ZXJNb2RlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtYmxhY2tcIlxuICAgICAgICApfT5cbiAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT17Y24oXG4gICAgICAgICAgICBcInctNSBoLTVcIixcbiAgICAgICAgICAgIHBvd2VyTW9kZSAmJiBcInRleHQtY3lhbi00MDBcIlxuICAgICAgICAgICl9IC8+XG4gICAgICAgICAge3R5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpfSBMYXllclxuICAgICAgICA8L2gzPlxuICAgICAgICA8cCBjbGFzc05hbWU9e2NuKFxuICAgICAgICAgIFwidGV4dC1zbVwiLFxuICAgICAgICAgIHBvd2VyTW9kZSA/IFwidGV4dC13aGl0ZS83MFwiIDogXCJ0ZXh0LWdyYXktNjAwXCJcbiAgICAgICAgKX0+XG4gICAgICAgICAgTGF5ZXItc3BlY2lmaWMgcGVyZm9ybWFuY2UgbWV0cmljcyBhbmQgY29uZmlndXJhdGlvblxuICAgICAgICA8L3A+XG4gICAgICA8L21vdGlvbi5kaXY+XG5cbiAgICAgIHsvKiBNYWluIFN0YXRzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc3BhY2UteS00XCI+XG4gICAgICAgIHthbmFseXNpc0RhdGEgPyAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxTdGF0QmFyXG4gICAgICAgICAgICAgIGxhYmVsPVwiUGFyYW1ldGVyc1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0cy5wYXJhbXMudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgcGVyY2VudGFnZT17KHN0YXRzLnBhcmFtcyAvIDE1MDUyOCkgKiAxMDB9XG4gICAgICAgICAgICAgIHBvd2VyTW9kZT17cG93ZXJNb2RlfVxuICAgICAgICAgICAgICBjb2xvcj1cImN5YW5cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPFN0YXRCYXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJGTE9Qc1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtgJHsoc3RhdHMuZmxvcHMgLyAxZTYpLnRvRml4ZWQoMSl9TWB9XG4gICAgICAgICAgICAgIHBlcmNlbnRhZ2U9eyhzdGF0cy5mbG9wcyAvIDFlOSkgKiAxMDB9XG4gICAgICAgICAgICAgIHBvd2VyTW9kZT17cG93ZXJNb2RlfVxuICAgICAgICAgICAgICBjb2xvcj1cInllbGxvd1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8U3RhdEJhclxuICAgICAgICAgICAgICBsYWJlbD1cIk1lbW9yeVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtgJHsoc3RhdHMubWVtb3J5VXNhZ2UgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDEpfSBNQmB9XG4gICAgICAgICAgICAgIHBlcmNlbnRhZ2U9eyhzdGF0cy5tZW1vcnlVc2FnZSAvICgxMDI0ICogMTAyNCAqIDEwMCkpICogMTAwfVxuICAgICAgICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgICAgICAgICAgY29sb3I9XCJwdXJwbGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPFN0YXRCYXJcbiAgICAgICAgICAgICAgbGFiZWw9XCJOZXVyb25zXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXRzLm5ldXJvbnMudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgcGVyY2VudGFnZT17KHN0YXRzLm5ldXJvbnMgLyAxNTA1MjgpICogMTAwfVxuICAgICAgICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgICAgICAgICAgY29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxTdGF0QmFyXG4gICAgICAgICAgICAgIGxhYmVsPVwiSW5mZXJlbmNlIFRpbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17YCR7c3RhdHMuaW5mZXJlbmNlVGltZX0gbXNgfVxuICAgICAgICAgICAgICBwZXJjZW50YWdlPXsoc3RhdHMuaW5mZXJlbmNlVGltZSAvIDMuNSkgKiAxMDB9XG4gICAgICAgICAgICAgIHBvd2VyTW9kZT17cG93ZXJNb2RlfVxuICAgICAgICAgICAgICBjb2xvcj1cInllbGxvd1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8U3RhdEJhclxuICAgICAgICAgICAgICBsYWJlbD1cIk1lbW9yeSBVc2FnZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXtgJHtzdGF0cy5tZW1vcnlVc2FnZX0gTUJgfVxuICAgICAgICAgICAgICBwZXJjZW50YWdlPXsoc3RhdHMubWVtb3J5VXNhZ2UgLyA4LjYpICogMTAwfVxuICAgICAgICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgICAgICAgICAgY29sb3I9XCJwdXJwbGVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbW90aW9uLmRpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsibW90aW9uIiwiTGF5ZXJzIiwidXNlU3RhdGUiLCJjbiIsIkxBWUVSX1NUQVRTIiwiU3RhdEJhciIsImxhYmVsIiwidmFsdWUiLCJwZXJjZW50YWdlIiwicG93ZXJNb2RlIiwiY29sb3IiLCJkaXYiLCJpbml0aWFsIiwib3BhY2l0eSIsInkiLCJhbmltYXRlIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiY2xhc3NOYW1lIiwic3BhbiIsIndpZHRoIiwiZWFzZSIsIkxheWVyU3RhdHMiLCJ0eXBlIiwiaXNIaWdobGlnaHRlZCIsImFuYWx5c2lzRGF0YSIsImdldE1vZGVsU3RhdHMiLCJtb2RlbFR5cGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIiwibmV1cm9ucyIsImluZmVyZW5jZVRpbWUiLCJtZW1vcnlVc2FnZSIsImFjdGl2YXRpb25zIiwicGFyYW1zIiwic3RhdHMiLCJpc0V4cGFuZGVkIiwic2V0SXNFeHBhbmRlZCIsIngiLCJleGl0Iiwic3R5bGUiLCJ0b3AiLCJ0cmFuc2Zvcm0iLCJib3JkZXJDb2xvciIsImgzIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInAiLCJ0b0xvY2FsZVN0cmluZyIsImZsb3BzIiwidG9GaXhlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/model/LayerStats.tsx\n"));

/***/ })

});