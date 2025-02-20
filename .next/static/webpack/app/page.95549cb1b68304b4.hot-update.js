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

/***/ "(app-pages-browser)/./components/ModelBuilder/LayerStack.tsx":
/*!************************************************!*\
  !*** ./components/ModelBuilder/LayerStack.tsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LayerStack: function() { return /* binding */ LayerStack; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/Reorder/Group.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/Reorder/Item.mjs\");\n/* harmony import */ var _barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=X!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/x.js\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _model_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/constants */ \"(app-pages-browser)/./components/model/constants.ts\");\n/* __next_internal_client_entry_do_not_use__ LayerStack auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction LayerStack(param) {\n    let { nodes, onNodesChange, powerMode } = param;\n    _s();\n    const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedNodeId, setSelectedNodeId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleRemoveNode = (nodeId)=>{\n        onNodesChange(nodes.filter((node)=>node.id !== nodeId));\n        if (selectedNodeId === nodeId) {\n            setSelectedNodeId(null);\n        }\n    };\n    const handleNodeClick = (nodeId)=>{\n        setSelectedNodeId(nodeId);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"h-full p-4 flex flex-col gap-4\", powerMode ? \"bg-gray-900/60\" : \"bg-white\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"text-sm font-medium\", powerMode ? \"text-white/70\" : \"text-gray-600\"),\n                children: \"Model Architecture\"\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.ReorderGroup, {\n                axis: \"y\",\n                values: nodes,\n                onReorder: onNodesChange,\n                className: \"flex-1 space-y-2\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.AnimatePresence, {\n                    children: nodes.map((node)=>{\n                        const isSelected = node.id === selectedNodeId;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_6__.ReorderItem, {\n                            value: node,\n                            onDragStart: ()=>setIsDragging(true),\n                            onDragEnd: ()=>setIsDragging(false),\n                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"p-3 rounded-lg select-none transition-all duration-200\", powerMode ? \"bg-black/40\" : \"bg-gray-100\", \"border\", isSelected && powerMode && \"border-cyan-500 ring-2 ring-cyan-500\", isSelected && !powerMode && \"border-black ring-2 ring-black\", !isSelected && powerMode && \"border-white/10\", !isSelected && !powerMode && \"border-transparent\", !isDragging && \"group cursor-grab active:cursor-grabbing\"),\n                            onClick: ()=>handleNodeClick(node.id),\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center gap-3\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-3 h-3 rounded-full shrink-0\",\n                                        style: {\n                                            backgroundColor: _model_constants__WEBPACK_IMPORTED_MODULE_3__.LAYER_COLORS[node.type]\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                        lineNumber: 74,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-1 min-w-0\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"text-sm font-medium truncate\", powerMode ? \"text-white\" : \"text-black\"),\n                                                children: node.name\n                                            }, void 0, false, {\n                                                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                                lineNumber: 81,\n                                                columnNumber: 21\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"text-xs truncate\", powerMode ? \"text-white/50\" : \"text-gray-500\"),\n                                                children: node.type\n                                            }, void 0, false, {\n                                                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                                lineNumber: 87,\n                                                columnNumber: 21\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                        lineNumber: 80,\n                                        columnNumber: 19\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: (e)=>{\n                                            e.stopPropagation();\n                                            handleRemoveNode(node.id);\n                                        },\n                                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity\", powerMode ? \"hover:bg-white/10 text-white/70 hover:text-white\" : \"hover:bg-gray-300/50 text-gray-600 hover:text-black\"),\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                            className: \"w-4 h-4\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                            lineNumber: 108,\n                                            columnNumber: 21\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                        lineNumber: 96,\n                                        columnNumber: 19\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 17\n                            }, this)\n                        }, node.id, false, {\n                            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                            lineNumber: 55,\n                            columnNumber: 15\n                        }, this);\n                    })\n                }, void 0, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            nodes.length === 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"flex-1 flex items-center justify-center text-sm\", powerMode ? \"text-white/50\" : \"text-gray-500\"),\n                children: \"Drag layers from the library to start building\"\n            }, void 0, false, {\n                fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n                lineNumber: 118,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack.tsx\",\n        lineNumber: 33,\n        columnNumber: 5\n    }, this);\n}\n_s(LayerStack, \"G89WMMyBctTAEAdf8LVJTfgtGII=\");\n_c = LayerStack;\nvar _c;\n$RefreshReg$(_c, \"LayerStack\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTW9kZWxCdWlsZGVyL0xheWVyU3RhY2sudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVpQztBQUNnQztBQUNoQztBQUNBO0FBQ2lCO0FBVTNDLFNBQVNNLFdBQVcsS0FBb0Q7UUFBcEQsRUFBRUMsS0FBSyxFQUFFQyxhQUFhLEVBQUVDLFNBQVMsRUFBbUIsR0FBcEQ7O0lBQ3pCLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHWCwrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUNZLGdCQUFnQkMsa0JBQWtCLEdBQUdiLCtDQUFRQSxDQUFnQjtJQUVwRSxNQUFNYyxtQkFBbUIsQ0FBQ0M7UUFDeEJQLGNBQWNELE1BQU1TLE1BQU0sQ0FBQ0MsQ0FBQUEsT0FBUUEsS0FBS0MsRUFBRSxLQUFLSDtRQUMvQyxJQUFJSCxtQkFBbUJHLFFBQVE7WUFDN0JGLGtCQUFrQjtRQUNwQjtJQUNGO0lBRUEsTUFBTU0sa0JBQWtCLENBQUNKO1FBQ3ZCRixrQkFBa0JFO0lBQ3BCO0lBRUEscUJBQ0UsOERBQUNLO1FBQUlDLFdBQVdqQiw4Q0FBRUEsQ0FDaEIsa0NBQ0FLLFlBQVksbUJBQW1COzswQkFFL0IsOERBQUNhO2dCQUFHRCxXQUFXakIsOENBQUVBLENBQ2YsdUJBQ0FLLFlBQVksa0JBQWtCOzBCQUM3Qjs7Ozs7OzBCQUlILDhEQUFDUCx1REFBYTtnQkFDWnNCLE1BQUs7Z0JBQ0xDLFFBQVFsQjtnQkFDUm1CLFdBQVdsQjtnQkFDWGEsV0FBVTswQkFFViw0RUFBQ3BCLDBEQUFlQTs4QkFDYk0sTUFBTW9CLEdBQUcsQ0FBQyxDQUFDVjt3QkFDVixNQUFNVyxhQUFhWCxLQUFLQyxFQUFFLEtBQUtOO3dCQUUvQixxQkFDRSw4REFBQ1Ysc0RBQVk7NEJBRVg0QixPQUFPYjs0QkFDUGMsYUFBYSxJQUFNcEIsY0FBYzs0QkFDakNxQixXQUFXLElBQU1yQixjQUFjOzRCQUMvQlUsV0FBV2pCLDhDQUFFQSxDQUNYLDBEQUNBSyxZQUFZLGdCQUFnQixlQUM1QixVQUNBbUIsY0FBY25CLGFBQWEsd0NBQzNCbUIsY0FBYyxDQUFDbkIsYUFBYSxrQ0FDNUIsQ0FBQ21CLGNBQWNuQixhQUFhLG1CQUM1QixDQUFDbUIsY0FBYyxDQUFDbkIsYUFBYSxzQkFDN0IsQ0FBQ0MsY0FBYzs0QkFFakJ1QixTQUFTLElBQU1kLGdCQUFnQkYsS0FBS0MsRUFBRTtzQ0FFdEMsNEVBQUNFO2dDQUFJQyxXQUFVOztrREFFYiw4REFBQ0Q7d0NBQ0NDLFdBQVU7d0NBQ1ZhLE9BQU87NENBQUVDLGlCQUFpQjlCLDBEQUFZLENBQUNZLEtBQUttQixJQUFJLENBQUM7d0NBQUM7Ozs7OztrREFJcEQsOERBQUNoQjt3Q0FBSUMsV0FBVTs7MERBQ2IsOERBQUNnQjtnREFBRWhCLFdBQVdqQiw4Q0FBRUEsQ0FDZCxnQ0FDQUssWUFBWSxlQUFlOzBEQUUxQlEsS0FBS3FCLElBQUk7Ozs7OzswREFFWiw4REFBQ0Q7Z0RBQUVoQixXQUFXakIsOENBQUVBLENBQ2Qsb0JBQ0FLLFlBQVksa0JBQWtCOzBEQUU3QlEsS0FBS21CLElBQUk7Ozs7Ozs7Ozs7OztrREFLZCw4REFBQ0c7d0NBQ0NOLFNBQVMsQ0FBQ087NENBQ1JBLEVBQUVDLGVBQWU7NENBQ2pCM0IsaUJBQWlCRyxLQUFLQyxFQUFFO3dDQUMxQjt3Q0FDQUcsV0FBV2pCLDhDQUFFQSxDQUNYLHVFQUNBSyxZQUNJLHFEQUNBO2tEQUdOLDRFQUFDTiw2RUFBQ0E7NENBQUNrQixXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzsyQkFwRFpKLEtBQUtDLEVBQUU7Ozs7O29CQXlEbEI7Ozs7Ozs7Ozs7O1lBSUhYLE1BQU1tQyxNQUFNLEtBQUssbUJBQ2hCLDhEQUFDdEI7Z0JBQUlDLFdBQVdqQiw4Q0FBRUEsQ0FDaEIsbURBQ0FLLFlBQVksa0JBQWtCOzBCQUM3Qjs7Ozs7Ozs7Ozs7O0FBTVg7R0E5R2dCSDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL01vZGVsQnVpbGRlci9MYXllclN0YWNrLnRzeD8xODFiIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlLCBSZW9yZGVyIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBYIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGNuIH0gZnJvbSAnQC9saWIvdXRpbHMnO1xuaW1wb3J0IHsgTEFZRVJfQ09MT1JTIH0gZnJvbSAnLi4vbW9kZWwvY29uc3RhbnRzJztcbmltcG9ydCB7IExheWVyVHlwZSB9IGZyb20gJy4uL21vZGVsL3R5cGVzJztcbmltcG9ydCB7IE1vZGVsTm9kZSB9IGZyb20gJ0AvbGliL21vZGVsL3R5cGVzJztcblxudHlwZSBMYXllclN0YWNrUHJvcHMgPSB7XG4gIG5vZGVzOiBNb2RlbE5vZGVbXTtcbiAgb25Ob2Rlc0NoYW5nZTogKG5vZGVzOiBNb2RlbE5vZGVbXSkgPT4gdm9pZDtcbiAgcG93ZXJNb2RlOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIExheWVyU3RhY2soeyBub2Rlcywgb25Ob2Rlc0NoYW5nZSwgcG93ZXJNb2RlIH06IExheWVyU3RhY2tQcm9wcykge1xuICBjb25zdCBbaXNEcmFnZ2luZywgc2V0SXNEcmFnZ2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZE5vZGVJZCwgc2V0U2VsZWN0ZWROb2RlSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlTm9kZSA9IChub2RlSWQ6IHN0cmluZykgPT4ge1xuICAgIG9uTm9kZXNDaGFuZ2Uobm9kZXMuZmlsdGVyKG5vZGUgPT4gbm9kZS5pZCAhPT0gbm9kZUlkKSk7XG4gICAgaWYgKHNlbGVjdGVkTm9kZUlkID09PSBub2RlSWQpIHtcbiAgICAgIHNldFNlbGVjdGVkTm9kZUlkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVOb2RlQ2xpY2sgPSAobm9kZUlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZWxlY3RlZE5vZGVJZChub2RlSWQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NuKFxuICAgICAgXCJoLWZ1bGwgcC00IGZsZXggZmxleC1jb2wgZ2FwLTRcIixcbiAgICAgIHBvd2VyTW9kZSA/IFwiYmctZ3JheS05MDAvNjBcIiA6IFwiYmctd2hpdGVcIlxuICAgICl9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17Y24oXG4gICAgICAgIFwidGV4dC1zbSBmb250LW1lZGl1bVwiLFxuICAgICAgICBwb3dlck1vZGUgPyBcInRleHQtd2hpdGUvNzBcIiA6IFwidGV4dC1ncmF5LTYwMFwiXG4gICAgICApfT5cbiAgICAgICAgTW9kZWwgQXJjaGl0ZWN0dXJlXG4gICAgICA8L2gzPlxuXG4gICAgICA8UmVvcmRlci5Hcm91cFxuICAgICAgICBheGlzPVwieVwiXG4gICAgICAgIHZhbHVlcz17bm9kZXN9XG4gICAgICAgIG9uUmVvcmRlcj17b25Ob2Rlc0NoYW5nZX1cbiAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHNwYWNlLXktMlwiXG4gICAgICA+XG4gICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAge25vZGVzLm1hcCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IG5vZGUuaWQgPT09IHNlbGVjdGVkTm9kZUlkO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8UmVvcmRlci5JdGVtXG4gICAgICAgICAgICAgICAga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtub2RlfVxuICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoKSA9PiBzZXRJc0RyYWdnaW5nKHRydWUpfVxuICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17KCkgPT4gc2V0SXNEcmFnZ2luZyhmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgICAgICAgICAgIFwicC0zIHJvdW5kZWQtbGcgc2VsZWN0LW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwXCIsXG4gICAgICAgICAgICAgICAgICBwb3dlck1vZGUgPyBcImJnLWJsYWNrLzQwXCIgOiBcImJnLWdyYXktMTAwXCIsXG4gICAgICAgICAgICAgICAgICBcImJvcmRlclwiLFxuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCAmJiBwb3dlck1vZGUgJiYgXCJib3JkZXItY3lhbi01MDAgcmluZy0yIHJpbmctY3lhbi01MDBcIixcbiAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgJiYgIXBvd2VyTW9kZSAmJiBcImJvcmRlci1ibGFjayByaW5nLTIgcmluZy1ibGFja1wiLFxuICAgICAgICAgICAgICAgICAgIWlzU2VsZWN0ZWQgJiYgcG93ZXJNb2RlICYmIFwiYm9yZGVyLXdoaXRlLzEwXCIsXG4gICAgICAgICAgICAgICAgICAhaXNTZWxlY3RlZCAmJiAhcG93ZXJNb2RlICYmIFwiYm9yZGVyLXRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAhaXNEcmFnZ2luZyAmJiBcImdyb3VwIGN1cnNvci1ncmFiIGFjdGl2ZTpjdXJzb3ItZ3JhYmJpbmdcIlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTm9kZUNsaWNrKG5vZGUuaWQpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgey8qIExheWVyIGluZGljYXRvciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IExBWUVSX0NPTE9SU1tub2RlLnR5cGVdIH19XG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICB7LyogTGF5ZXIgaW5mbyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgICAgICAgICAgICAgICBcInRleHQtc20gZm9udC1tZWRpdW0gdHJ1bmNhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBwb3dlck1vZGUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1ibGFja1wiXG4gICAgICAgICAgICAgICAgICAgICl9PlxuICAgICAgICAgICAgICAgICAgICAgIHtub2RlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgICAgICAgICAgICAgICBcInRleHQteHMgdHJ1bmNhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBwb3dlck1vZGUgPyBcInRleHQtd2hpdGUvNTBcIiA6IFwidGV4dC1ncmF5LTUwMFwiXG4gICAgICAgICAgICAgICAgICAgICl9PlxuICAgICAgICAgICAgICAgICAgICAgIHtub2RlLnR5cGV9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUmVtb3ZlIGJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZU5vZGUobm9kZS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y24oXG4gICAgICAgICAgICAgICAgICAgICAgXCJwLTEgcm91bmRlZC1tZCBvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgdHJhbnNpdGlvbi1vcGFjaXR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgcG93ZXJNb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiaG92ZXI6Ymctd2hpdGUvMTAgdGV4dC13aGl0ZS83MCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJob3ZlcjpiZy1ncmF5LTMwMC81MCB0ZXh0LWdyYXktNjAwIGhvdmVyOnRleHQtYmxhY2tcIlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L1Jlb3JkZXIuSXRlbT5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICAgPC9SZW9yZGVyLkdyb3VwPlxuXG4gICAgICB7bm9kZXMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NuKFxuICAgICAgICAgIFwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtc21cIixcbiAgICAgICAgICBwb3dlck1vZGUgPyBcInRleHQtd2hpdGUvNTBcIiA6IFwidGV4dC1ncmF5LTUwMFwiXG4gICAgICAgICl9PlxuICAgICAgICAgIERyYWcgbGF5ZXJzIGZyb20gdGhlIGxpYnJhcnkgdG8gc3RhcnQgYnVpbGRpbmdcbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkFuaW1hdGVQcmVzZW5jZSIsIlJlb3JkZXIiLCJYIiwiY24iLCJMQVlFUl9DT0xPUlMiLCJMYXllclN0YWNrIiwibm9kZXMiLCJvbk5vZGVzQ2hhbmdlIiwicG93ZXJNb2RlIiwiaXNEcmFnZ2luZyIsInNldElzRHJhZ2dpbmciLCJzZWxlY3RlZE5vZGVJZCIsInNldFNlbGVjdGVkTm9kZUlkIiwiaGFuZGxlUmVtb3ZlTm9kZSIsIm5vZGVJZCIsImZpbHRlciIsIm5vZGUiLCJpZCIsImhhbmRsZU5vZGVDbGljayIsImRpdiIsImNsYXNzTmFtZSIsImgzIiwiR3JvdXAiLCJheGlzIiwidmFsdWVzIiwib25SZW9yZGVyIiwibWFwIiwiaXNTZWxlY3RlZCIsIkl0ZW0iLCJ2YWx1ZSIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW5kIiwib25DbGljayIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwidHlwZSIsInAiLCJuYW1lIiwiYnV0dG9uIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImxlbmd0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ModelBuilder/LayerStack.tsx\n"));

/***/ })

});