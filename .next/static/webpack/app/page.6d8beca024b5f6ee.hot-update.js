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

/***/ "(app-pages-browser)/./components/PerformanceChart.tsx":
/*!*****************************************!*\
  !*** ./components/PerformanceChart.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PerformanceChart: function() { return /* binding */ PerformanceChart; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=Line!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/cartesian/Line.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/component/ResponsiveContainer.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/chart/LineChart.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/cartesian/CartesianGrid.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/cartesian/XAxis.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/cartesian/YAxis.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/component/Tooltip.js\");\n/* harmony import */ var _barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer!=!recharts */ \"(app-pages-browser)/./node_modules/recharts/es6/component/Legend.js\");\n/* __next_internal_client_entry_do_not_use__ PerformanceChart auto */ \nvar _s = $RefreshSig$();\n\n\n\n// Add model-specific noise patterns\nconst getModelNoisePattern = (modelId, time)=>{\n    const id = modelId.toLowerCase();\n    const baseNoise = Math.sin(time * 0.5) * 0.1;\n    if (id.includes(\"yolo\")) {\n        // YOLO has more stable performance with occasional spikes\n        return baseNoise * 0.5 + (Math.random() > 0.9 ? 0.2 : 0);\n    } else if (id.includes(\"stable\")) {\n        // Stable Diffusion has cyclical patterns\n        return baseNoise * 1.5 + Math.sin(time * 0.8) * 0.15;\n    } else if (id.includes(\"llama\") || id.includes(\"gpt\")) {\n        // Language models have varying load based on sequence length\n        return baseNoise + Math.sin(time * 0.3) * 0.2;\n    }\n    // Default pattern for ResNet etc\n    return baseNoise;\n};\nfunction PerformanceChart(param) {\n    let { cpuMetrics, gpuMetrics, powerMode, modelId } = param;\n    _s();\n    const data = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{\n        return Array.from({\n            length: 20\n        }, (_, i)=>{\n            const time = i * 0.5;\n            const noise = getModelNoisePattern(modelId, time);\n            // Add model-specific performance patterns\n            const baseLatency = cpuMetrics.latency;\n            const baseMemory = cpuMetrics.memory;\n            const baseUtilization = cpuMetrics.utilization;\n            // Add realistic fluctuations\n            const cpuVariation = Math.sin(time * 0.8) * 0.15 + noise;\n            const gpuVariation = Math.sin(time * 1.2) * 0.08 + noise * 0.5;\n            return {\n                time: time.toFixed(1),\n                // CPU metrics with more variation\n                cpuLatency: baseLatency * (1 + cpuVariation),\n                cpuMemory: baseMemory * (1 + cpuVariation * 0.5),\n                cpuUtilization: Math.min(100, baseUtilization * (1 + cpuVariation)),\n                // GPU metrics with smoother performance\n                gpuLatency: gpuMetrics.latency * (1 + gpuVariation),\n                gpuMemory: gpuMetrics.memory * (1 + gpuVariation * 0.3),\n                gpuUtilization: Math.min(100, gpuMetrics.utilization * (1 + gpuVariation * 0.4))\n            };\n        });\n    }, [\n        cpuMetrics,\n        gpuMetrics,\n        modelId\n    ]);\n    const axisStyle = {\n        stroke: powerMode ? \"rgba(255,255,255,0.5)\" : \"rgba(0,0,0,0.5)\",\n        fill: powerMode ? \"rgba(255,255,255,0.7)\" : \"rgba(0,0,0,0.7)\"\n    };\n    const tooltipStyle = {\n        contentStyle: {\n            backgroundColor: powerMode ? \"rgba(17, 24, 39, 0.9)\" : \"rgba(255, 255, 255, 0.9)\",\n            border: powerMode ? \"1px solid rgba(6, 182, 212, 0.3)\" : \"1px solid rgba(0, 0, 0, 0.1)\",\n            borderRadius: \"0.5rem\",\n            color: powerMode ? \"white\" : \"black\"\n        },\n        formatter: (value, name)=>{\n            if (name.includes(\"Latency\")) {\n                return [\n                    \"\".concat(value.toFixed(2), \" ms\"),\n                    name\n                ];\n            }\n            if (name.includes(\"Memory\")) {\n                return [\n                    \"\".concat(value.toFixed(2), \" GB\"),\n                    name\n                ];\n            }\n            if (name.includes(\"Utilization\")) {\n                return [\n                    \"\".concat(value.toFixed(1), \"%\"),\n                    name\n                ];\n            }\n            return [\n                value,\n                name\n            ];\n        },\n        labelFormatter: (label)=>\"Time: \".concat(label, \"s\")\n    };\n    const legendStyle = {\n        layout: \"horizontal\",\n        verticalAlign: \"bottom\",\n        align: \"center\",\n        formatter: (value)=>{\n            const [device, metric] = value.split(\" \");\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"text-xs\",\n                children: [\n                    device === \"CPU\" ? \"CPU \" : \"GPU \",\n                    metric\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                lineNumber: 111,\n                columnNumber: 9\n            }, this);\n        },\n        wrapperStyle: {\n            color: powerMode ? \"white\" : \"black\",\n            paddingTop: \"20px\",\n            padding: \"0 10px\",\n            marginRight: \"10px\",\n            display: \"flex\",\n            justifyContent: \"center\",\n            gap: \"1rem\"\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_2__.ResponsiveContainer, {\n        width: \"100%\",\n        height: \"100%\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_3__.LineChart, {\n            data: data,\n            margin: {\n                top: 5,\n                right: 30,\n                left: 20,\n                bottom: 45\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_4__.CartesianGrid, {\n                    strokeDasharray: \"3 3\",\n                    opacity: 0.1\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 131,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_5__.XAxis, {\n                    ...axisStyle,\n                    dataKey: \"time\",\n                    label: {\n                        value: \"Time (s)\",\n                        position: \"bottom\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 132,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_6__.YAxis, {\n                    ...axisStyle,\n                    yAxisId: \"left\",\n                    label: {\n                        value: \"Latency (ms)\",\n                        angle: -90,\n                        position: \"insideLeft\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 139,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_6__.YAxis, {\n                    ...axisStyle,\n                    yAxisId: \"right\",\n                    orientation: \"right\",\n                    label: {\n                        value: \"Memory (GB) / Utilization (%)\",\n                        angle: 90,\n                        position: \"insideRight\"\n                    }\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 150,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {\n                    ...tooltipStyle\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 161,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_LineChart_XAxis_YAxis_CartesianGrid_Tooltip_Legend_ResponsiveContainer_recharts__WEBPACK_IMPORTED_MODULE_8__.Legend, {\n                    ...legendStyle\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 162,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"left\",\n                    type: \"monotone\",\n                    dataKey: \"cpuLatency\",\n                    name: \"CPU Latency\",\n                    stroke: \"#3b82f6\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 165,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"right\",\n                    type: \"monotone\",\n                    dataKey: \"cpuMemory\",\n                    name: \"CPU Memory\",\n                    stroke: \"#60a5fa\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 174,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"right\",\n                    type: \"monotone\",\n                    dataKey: \"cpuUtilization\",\n                    name: \"CPU Utilization\",\n                    stroke: \"#93c5fd\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 183,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"left\",\n                    type: \"monotone\",\n                    dataKey: \"gpuLatency\",\n                    name: \"GPU Latency\",\n                    stroke: \"#06b6d4\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 192,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"right\",\n                    type: \"monotone\",\n                    dataKey: \"gpuMemory\",\n                    name: \"GPU Memory\",\n                    stroke: \"#22d3ee\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 201,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Line_recharts__WEBPACK_IMPORTED_MODULE_9__.Line, {\n                    yAxisId: \"right\",\n                    type: \"monotone\",\n                    dataKey: \"gpuUtilization\",\n                    name: \"GPU Utilization\",\n                    stroke: \"#67e8f9\",\n                    strokeWidth: 2,\n                    dot: false\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n                    lineNumber: 210,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n            lineNumber: 130,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/PerformanceChart.tsx\",\n        lineNumber: 129,\n        columnNumber: 5\n    }, this);\n}\n_s(PerformanceChart, \"jwuu1hJIzb+z9O8CErpZ1XdXNoc=\");\n_c = PerformanceChart;\nvar _c;\n$RefreshReg$(_c, \"PerformanceChart\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvUGVyZm9ybWFuY2VDaGFydC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZ0M7QUFDQTtBQUN3RTtBQW1CeEcsb0NBQW9DO0FBQ3BDLE1BQU1TLHVCQUF1QixDQUFDQyxTQUFpQkM7SUFDN0MsTUFBTUMsS0FBS0YsUUFBUUcsV0FBVztJQUM5QixNQUFNQyxZQUFZQyxLQUFLQyxHQUFHLENBQUNMLE9BQU8sT0FBTztJQUV6QyxJQUFJQyxHQUFHSyxRQUFRLENBQUMsU0FBUztRQUN2QiwwREFBMEQ7UUFDMUQsT0FBT0gsWUFBWSxNQUFPQyxDQUFBQSxLQUFLRyxNQUFNLEtBQUssTUFBTSxNQUFNO0lBQ3hELE9BQU8sSUFBSU4sR0FBR0ssUUFBUSxDQUFDLFdBQVc7UUFDaEMseUNBQXlDO1FBQ3pDLE9BQU9ILFlBQVksTUFBTUMsS0FBS0MsR0FBRyxDQUFDTCxPQUFPLE9BQU87SUFDbEQsT0FBTyxJQUFJQyxHQUFHSyxRQUFRLENBQUMsWUFBWUwsR0FBR0ssUUFBUSxDQUFDLFFBQVE7UUFDckQsNkRBQTZEO1FBQzdELE9BQU9ILFlBQVlDLEtBQUtDLEdBQUcsQ0FBQ0wsT0FBTyxPQUFPO0lBQzVDO0lBQ0EsaUNBQWlDO0lBQ2pDLE9BQU9HO0FBQ1Q7QUFFTyxTQUFTSyxpQkFBaUIsS0FLYTtRQUxiLEVBQy9CQyxVQUFVLEVBQ1ZDLFVBQVUsRUFDVkMsU0FBUyxFQUNUWixPQUFPLEVBQ3FDLEdBTGI7O0lBTS9CLE1BQU1hLE9BQU92Qiw4Q0FBT0EsQ0FBQztRQUNuQixPQUFPd0IsTUFBTUMsSUFBSSxDQUFDO1lBQUVDLFFBQVE7UUFBRyxHQUFHLENBQUNDLEdBQUdDO1lBQ3BDLE1BQU1qQixPQUFPaUIsSUFBSTtZQUNqQixNQUFNQyxRQUFRcEIscUJBQXFCQyxTQUFTQztZQUU1QywwQ0FBMEM7WUFDMUMsTUFBTW1CLGNBQWNWLFdBQVdXLE9BQU87WUFDdEMsTUFBTUMsYUFBYVosV0FBV2Es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Ozs4QkFFUCw4REFBQzNGLHNFQUFJQTtvQkFDSHNGLFNBQVE7b0JBQ1JHLE1BQUs7b0JBQ0xMLFNBQVE7b0JBQ1I1QixNQUFLO29CQUNMVixRQUFPO29CQUNQNEMsYUFBYTtvQkFDYkMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLZjtHQW5MZ0J6RTtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1BlcmZvcm1hbmNlQ2hhcnQudHN4P2NlNTYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAncmVjaGFydHMnO1xuaW1wb3J0IHsgTGluZUNoYXJ0LCBYQXhpcywgWUF4aXMsIENhcnRlc2lhbkdyaWQsIFRvb2x0aXAsIExlZ2VuZCwgUmVzcG9uc2l2ZUNvbnRhaW5lciB9IGZyb20gJ3JlY2hhcnRzJztcbmltcG9ydCB7IGNuIH0gZnJvbSAnQC9saWIvdXRpbHMnO1xuXG50eXBlIFBlcmZvcm1hbmNlQ2hhcnRQcm9wcyA9IHtcbiAgY3B1TWV0cmljczoge1xuICAgIGZwczogbnVtYmVyO1xuICAgIGxhdGVuY3k6IG51bWJlcjtcbiAgICBtZW1vcnk6IG51bWJlcjtcbiAgICB1dGlsaXphdGlvbjogbnVtYmVyO1xuICB9O1xuICBncHVNZXRyaWNzOiB7XG4gICAgZnBzOiBudW1iZXI7XG4gICAgbGF0ZW5jeTogbnVtYmVyO1xuICAgIG1lbW9yeTogbnVtYmVyO1xuICAgIHV0aWxpemF0aW9uOiBudW1iZXI7XG4gIH07XG4gIHBvd2VyTW9kZTogYm9vbGVhbjtcbn07XG5cbi8vIEFkZCBtb2RlbC1zcGVjaWZpYyBub2lzZSBwYXR0ZXJuc1xuY29uc3QgZ2V0TW9kZWxOb2lzZVBhdHRlcm4gPSAobW9kZWxJZDogc3RyaW5nLCB0aW1lOiBudW1iZXIpID0+IHtcbiAgY29uc3QgaWQgPSBtb2RlbElkLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGJhc2VOb2lzZSA9IE1hdGguc2luKHRpbWUgKiAwLjUpICogMC4xO1xuICBcbiAgaWYgKGlkLmluY2x1ZGVzKCd5b2xvJykpIHtcbiAgICAvLyBZT0xPIGhhcyBtb3JlIHN0YWJsZSBwZXJmb3JtYW5jZSB3aXRoIG9jY2FzaW9uYWwgc3Bpa2VzXG4gICAgcmV0dXJuIGJhc2VOb2lzZSAqIDAuNSArIChNYXRoLnJhbmRvbSgpID4gMC45ID8gMC4yIDogMCk7XG4gIH0gZWxzZSBpZiAoaWQuaW5jbHVkZXMoJ3N0YWJsZScpKSB7XG4gICAgLy8gU3RhYmxlIERpZmZ1c2lvbiBoYXMgY3ljbGljYWwgcGF0dGVybnNcbiAgICByZXR1cm4gYmFzZU5vaXNlICogMS41ICsgTWF0aC5zaW4odGltZSAqIDAuOCkgKiAwLjE1O1xuICB9IGVsc2UgaWYgKGlkLmluY2x1ZGVzKCdsbGFtYScpIHx8IGlkLmluY2x1ZGVzKCdncHQnKSkge1xuICAgIC8vIExhbmd1YWdlIG1vZGVscyBoYXZlIHZhcnlpbmcgbG9hZCBiYXNlZCBvbiBzZXF1ZW5jZSBsZW5ndGhcbiAgICByZXR1cm4gYmFzZU5vaXNlICsgTWF0aC5zaW4odGltZSAqIDAuMykgKiAwLjI7XG4gIH1cbiAgLy8gRGVmYXVsdCBwYXR0ZXJuIGZvciBSZXNOZXQgZXRjXG4gIHJldHVybiBiYXNlTm9pc2U7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gUGVyZm9ybWFuY2VDaGFydCh7XG4gIGNwdU1ldHJpY3MsXG4gIGdwdU1ldHJpY3MsXG4gIHBvd2VyTW9kZSxcbiAgbW9kZWxJZFxufTogUGVyZm9ybWFuY2VDaGFydFByb3BzICYgeyBtb2RlbElkOiBzdHJpbmcgfSkge1xuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDIwIH0sIChfLCBpKSA9PiB7XG4gICAgICBjb25zdCB0aW1lID0gaSAqIDAuNTtcbiAgICAgIGNvbnN0IG5vaXNlID0gZ2V0TW9kZWxOb2lzZVBhdHRlcm4obW9kZWxJZCwgdGltZSk7XG4gICAgICBcbiAgICAgIC8vIEFkZCBtb2RlbC1zcGVjaWZpYyBwZXJmb3JtYW5jZSBwYXR0ZXJuc1xuICAgICAgY29uc3QgYmFzZUxhdGVuY3kgPSBjcHVNZXRyaWNzLmxhdGVuY3k7XG4gICAgICBjb25zdCBiYXNlTWVtb3J5ID0gY3B1TWV0cmljcy5tZW1vcnk7XG4gICAgICBjb25zdCBiYXNlVXRpbGl6YXRpb24gPSBjcHVNZXRyaWNzLnV0aWxpemF0aW9uO1xuXG4gICAgICAvLyBBZGQgcmVhbGlzdGljIGZsdWN0dWF0aW9uc1xuICAgICAgY29uc3QgY3B1VmFyaWF0aW9uID0gTWF0aC5zaW4odGltZSAqIDAuOCkgKiAwLjE1ICsgbm9pc2U7XG4gICAgICBjb25zdCBncHVWYXJpYXRpb24gPSBNYXRoLnNpbih0aW1lICogMS4yKSAqIDAuMDggKyBub2lzZSAqIDAuNTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGltZTogdGltZS50b0ZpeGVkKDEpLFxuICAgICAgICAvLyBDUFUgbWV0cmljcyB3aXRoIG1vcmUgdmFyaWF0aW9uXG4gICAgICAgIGNwdUxhdGVuY3k6IGJhc2VMYXRlbmN5ICogKDEgKyBjcHVWYXJpYXRpb24pLFxuICAgICAgICBjcHVNZW1vcnk6IGJhc2VNZW1vcnkgKiAoMSArIGNwdVZhcmlhdGlvbiAqIDAuNSksXG4gICAgICAgIGNwdVV0aWxpemF0aW9uOiBNYXRoLm1pbigxMDAsIGJhc2VVdGlsaXphdGlvbiAqICgxICsgY3B1VmFyaWF0aW9uKSksXG4gICAgICAgIC8vIEdQVSBtZXRyaWNzIHdpdGggc21vb3RoZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgZ3B1TGF0ZW5jeTogZ3B1TWV0cmljcy5sYXRlbmN5ICogKDEgKyBncHVWYXJpYXRpb24pLFxuICAgICAgICBncHVNZW1vcnk6IGdwdU1ldHJpY3MubWVtb3J5ICogKDEgKyBncHVWYXJpYXRpb24gKiAwLjMpLFxuICAgICAgICBncHVVdGlsaXphdGlvbjogTWF0aC5taW4oMTAwLCBncHVNZXRyaWNzLnV0aWxpemF0aW9uICogKDEgKyBncHVWYXJpYXRpb24gKiAwLjQpKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSwgW2NwdU1ldHJpY3MsIGdwdU1ldHJpY3MsIG1vZGVsSWRdKTtcblxuICBjb25zdCBheGlzU3R5bGUgPSB7XG4gICAgc3Ryb2tlOiBwb3dlck1vZGUgPyBcInJnYmEoMjU1LDI1NSwyNTUsMC41KVwiIDogXCJyZ2JhKDAsMCwwLDAuNSlcIixcbiAgICBmaWxsOiBwb3dlck1vZGUgPyBcInJnYmEoMjU1LDI1NSwyNTUsMC43KVwiIDogXCJyZ2JhKDAsMCwwLDAuNylcIlxuICB9O1xuXG4gIGNvbnN0IHRvb2x0aXBTdHlsZSA9IHtcbiAgICBjb250ZW50U3R5bGU6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcG93ZXJNb2RlID8gXCJyZ2JhKDE3LCAyNCwgMzksIDAuOSlcIiA6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpXCIsXG4gICAgICBib3JkZXI6IHBvd2VyTW9kZSA/IFwiMXB4IHNvbGlkIHJnYmEoNiwgMTgyLCAyMTIsIDAuMylcIiA6IFwiMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKVwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiBcIjAuNXJlbVwiLFxuICAgICAgY29sb3I6IHBvd2VyTW9kZSA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIlxuICAgIH0sXG4gICAgZm9ybWF0dGVyOiAodmFsdWU6IG51bWJlciwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAobmFtZS5pbmNsdWRlcygnTGF0ZW5jeScpKSB7XG4gICAgICAgIHJldHVybiBbYCR7dmFsdWUudG9GaXhlZCgyKX0gbXNgLCBuYW1lXTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lLmluY2x1ZGVzKCdNZW1vcnknKSkge1xuICAgICAgICByZXR1cm4gW2Ake3ZhbHVlLnRvRml4ZWQoMil9IEdCYCwgbmFtZV07XG4gICAgICB9XG4gICAgICBpZiAobmFtZS5pbmNsdWRlcygnVXRpbGl6YXRpb24nKSkge1xuICAgICAgICByZXR1cm4gW2Ake3ZhbHVlLnRvRml4ZWQoMSl9JWAsIG5hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFt2YWx1ZSwgbmFtZV07XG4gICAgfSxcbiAgICBsYWJlbEZvcm1hdHRlcjogKGxhYmVsOiBzdHJpbmcpID0+IGBUaW1lOiAke2xhYmVsfXNgXG4gIH07XG5cbiAgY29uc3QgbGVnZW5kU3R5bGUgPSB7XG4gICAgbGF5b3V0OiAnaG9yaXpvbnRhbCcsXG4gICAgdmVydGljYWxBbGlnbjogJ2JvdHRvbScsXG4gICAgYWxpZ246ICdjZW50ZXInLFxuICAgIGZvcm1hdHRlcjogKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IFtkZXZpY2UsIG1ldHJpY10gPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+XG4gICAgICAgICAge2RldmljZSA9PT0gXCJDUFVcIiA/IFwiQ1BVIFwiIDogXCJHUFUgXCJ9XG4gICAgICAgICAge21ldHJpY31cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9LFxuICAgIHdyYXBwZXJTdHlsZToge1xuICAgICAgY29sb3I6IHBvd2VyTW9kZSA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIixcbiAgICAgIHBhZGRpbmdUb3A6IFwiMjBweFwiLFxuICAgICAgcGFkZGluZzogXCIwIDEwcHhcIixcbiAgICAgIG1hcmdpblJpZ2h0OiBcIjEwcHhcIixcbiAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICBnYXA6IFwiMXJlbVwiXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgPExpbmVDaGFydCBkYXRhPXtkYXRhfSBtYXJnaW49e3sgdG9wOiA1LCByaWdodDogMzAsIGxlZnQ6IDIwLCBib3R0b206IDQ1IH19PlxuICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBvcGFjaXR5PXswLjF9IC8+XG4gICAgICAgIDxYQXhpcyBcbiAgICAgICAgICB7Li4uYXhpc1N0eWxlfSBcbiAgICAgICAgICBkYXRhS2V5PVwidGltZVwiIFxuICAgICAgICAgIGxhYmVsPXt7IHZhbHVlOiAnVGltZSAocyknLCBwb3NpdGlvbjogJ2JvdHRvbScgfX0gXG4gICAgICAgIC8+XG4gICAgICAgIFxuICAgICAgICB7LyogUHJpbWFyeSBZLWF4aXMgZm9yIGxhdGVuY3kgKi99XG4gICAgICAgIDxZQXhpcyBcbiAgICAgICAgICB7Li4uYXhpc1N0eWxlfVxuICAgICAgICAgIHlBeGlzSWQ9XCJsZWZ0XCJcbiAgICAgICAgICBsYWJlbD17eyBcbiAgICAgICAgICAgIHZhbHVlOiAnTGF0ZW5jeSAobXMpJywgXG4gICAgICAgICAgICBhbmdsZTogLTkwLCBcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnaW5zaWRlTGVmdCcgXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogU2Vjb25kYXJ5IFktYXhpcyBmb3IgbWVtb3J5IGFuZCB1dGlsaXphdGlvbiAqL31cbiAgICAgICAgPFlBeGlzIFxuICAgICAgICAgIHsuLi5heGlzU3R5bGV9XG4gICAgICAgICAgeUF4aXNJZD1cInJpZ2h0XCJcbiAgICAgICAgICBvcmllbnRhdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICBsYWJlbD17eyBcbiAgICAgICAgICAgIHZhbHVlOiAnTWVtb3J5IChHQikgLyBVdGlsaXphdGlvbiAoJSknLCBcbiAgICAgICAgICAgIGFuZ2xlOiA5MCwgXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2luc2lkZVJpZ2h0JyBcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuXG4gICAgICAgIDxUb29sdGlwIHsuLi50b29sdGlwU3R5bGV9IC8+XG4gICAgICAgIDxMZWdlbmQgey4uLmxlZ2VuZFN0eWxlfSAvPlxuXG4gICAgICAgIHsvKiBMaW5lcyB3aXRoIG1hdGNoaW5nIHlBeGlzSWQgcHJvcHMgKi99XG4gICAgICAgIDxMaW5lIFxuICAgICAgICAgIHlBeGlzSWQ9XCJsZWZ0XCJcbiAgICAgICAgICB0eXBlPVwibW9ub3RvbmVcIiBcbiAgICAgICAgICBkYXRhS2V5PVwiY3B1TGF0ZW5jeVwiIFxuICAgICAgICAgIG5hbWU9XCJDUFUgTGF0ZW5jeVwiIFxuICAgICAgICAgIHN0cm9rZT1cIiMzYjgyZjZcIiBcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBkb3Q9e2ZhbHNlfVxuICAgICAgICAvPlxuICAgICAgICA8TGluZSBcbiAgICAgICAgICB5QXhpc0lkPVwicmlnaHRcIlxuICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgIGRhdGFLZXk9XCJjcHVNZW1vcnlcIiBcbiAgICAgICAgICBuYW1lPVwiQ1BVIE1lbW9yeVwiIFxuICAgICAgICAgIHN0cm9rZT1cIiM2MGE1ZmFcIiBcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBkb3Q9e2ZhbHNlfVxuICAgICAgICAvPlxuICAgICAgICA8TGluZSBcbiAgICAgICAgICB5QXhpc0lkPVwicmlnaHRcIlxuICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgIGRhdGFLZXk9XCJjcHVVdGlsaXphdGlvblwiIFxuICAgICAgICAgIG5hbWU9XCJDUFUgVXRpbGl6YXRpb25cIiBcbiAgICAgICAgICBzdHJva2U9XCIjOTNjNWZkXCIgXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9ezJ9XG4gICAgICAgICAgZG90PXtmYWxzZX1cbiAgICAgICAgLz5cbiAgICAgICAgPExpbmUgXG4gICAgICAgICAgeUF4aXNJZD1cImxlZnRcIlxuICAgICAgICAgIHR5cGU9XCJtb25vdG9uZVwiIFxuICAgICAgICAgIGRhdGFLZXk9XCJncHVMYXRlbmN5XCIgXG4gICAgICAgICAgbmFtZT1cIkdQVSBMYXRlbmN5XCIgXG4gICAgICAgICAgc3Ryb2tlPVwiIzA2YjZkNFwiIFxuICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgIGRvdD17ZmFsc2V9XG4gICAgICAgIC8+XG4gICAgICAgIDxMaW5lIFxuICAgICAgICAgIHlBeGlzSWQ9XCJyaWdodFwiXG4gICAgICAgICAgdHlwZT1cIm1vbm90b25lXCIgXG4gICAgICAgICAgZGF0YUtleT1cImdwdU1lbW9yeVwiIFxuICAgICAgICAgIG5hbWU9XCJHUFUgTWVtb3J5XCIgXG4gICAgICAgICAgc3Ryb2tlPVwiIzIyZDNlZVwiIFxuICAgICAgICAgIHN0cm9rZVdpZHRoPXsyfVxuICAgICAgICAgIGRvdD17ZmFsc2V9XG4gICAgICAgIC8+XG4gICAgICAgIDxMaW5lIFxuICAgICAgICAgIHlBeGlzSWQ9XCJyaWdodFwiXG4gICAgICAgICAgdHlwZT1cIm1vbm90b25lXCIgXG4gICAgICAgICAgZGF0YUtleT1cImdwdVV0aWxpemF0aW9uXCIgXG4gICAgICAgICAgbmFtZT1cIkdQVSBVdGlsaXphdGlvblwiIFxuICAgICAgICAgIHN0cm9rZT1cIiM2N2U4ZjlcIiBcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBkb3Q9e2ZhbHNlfVxuICAgICAgICAvPlxuICAgICAgPC9MaW5lQ2hhcnQ+XG4gICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VNZW1vIiwiTGluZSIsIkxpbmVDaGFydCIsIlhBeGlzIiwiWUF4aXMiLCJDYXJ0ZXNpYW5HcmlkIiwiVG9vbHRpcCIsIkxlZ2VuZCIsIlJlc3BvbnNpdmVDb250YWluZXIiLCJnZXRNb2RlbE5vaXNlUGF0dGVybiIsIm1vZGVsSWQiLCJ0aW1lIiwiaWQiLCJ0b0xvd2VyQ2FzZSIsImJhc2VOb2lzZSIsIk1hdGgiLCJzaW4iLCJpbmNsdWRlcyIsInJhbmRvbSIsIlBlcmZvcm1hbmNlQ2hhcnQiLCJjcHVNZXRyaWNzIiwiZ3B1TWV0cmljcyIsInBvd2VyTW9kZSIsImRhdGEiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiaSIsIm5vaXNlIiwiYmFzZUxhdGVuY3kiLCJsYXRlbmN5IiwiYmFzZU1lbW9yeSIsIm1lbW9yeSIsImJhc2VVdGlsaXphdGlvbiIsInV0aWxpemF0aW9uIiwiY3B1VmFyaWF0aW9uIiwiZ3B1VmFyaWF0aW9uIiwidG9GaXhlZCIsImNwdUxhdGVuY3kiLCJjcHVNZW1vcnkiLCJjcHVVdGlsaXphdGlvbiIsIm1pbiIsImdwdUxhdGVuY3kiLCJncHVNZW1vcnkiLCJncHVVdGlsaXphdGlvbiIsImF4aXNTdHlsZSIsInN0cm9rZSIsImZpbGwiLCJ0b29sdGlwU3R5bGUiLCJjb250ZW50U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJjb2xvciIsImZvcm1hdHRlciIsInZhbHVlIiwibmFtZSIsImxhYmVsRm9ybWF0dGVyIiwibGFiZWwiLCJsZWdlbmRTdHlsZSIsImxheW91dCIsInZlcnRpY2FsQWxpZ24iLCJhbGlnbiIsImRldmljZSIsIm1ldHJpYyIsInNwbGl0Iiwic3BhbiIsImNsYXNzTmFtZSIsIndyYXBwZXJTdHlsZSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nIiwibWFyZ2luUmlnaHQiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJnYXAiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwibGVmdCIsImJvdHRvbSIsInN0cm9rZURhc2hhcnJheSIsIm9wYWNpdHkiLCJkYXRhS2V5IiwicG9zaXRpb24iLCJ5QXhpc0lkIiwiYW5nbGUiLCJvcmllbnRhdGlvbiIsInR5cGUiLCJzdHJva2VXaWR0aCIsImRvdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/PerformanceChart.tsx\n"));

/***/ })

});