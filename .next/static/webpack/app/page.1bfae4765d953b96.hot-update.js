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

/***/ "(app-pages-browser)/./components/ModelBuilder/LayerStack/LayerList.tsx":
/*!**********************************************************!*\
  !*** ./components/ModelBuilder/LayerStack/LayerList.tsx ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LayerList: function() { return /* binding */ LayerList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/Reorder/Group.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./lib/utils.ts\");\n/* harmony import */ var _LayerItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayerItem */ \"(app-pages-browser)/./components/ModelBuilder/LayerStack/LayerItem.tsx\");\n/* __next_internal_client_entry_do_not_use__ LayerList auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction LayerList(param) {\n    let { nodes, selectedNodeId, onNodeSelect, onNodesChange, onRemoveNode, powerMode, isSimulating } = param;\n    _s();\n    const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleNodeUpdate = (nodeId, updates)=>{\n        onNodesChange(nodes.map((node)=>node.id === nodeId ? {\n                ...node,\n                ...updates\n            } : node));\n    };\n    if (nodes.length === 0) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(\"flex-1 flex items-center justify-center text-sm\", powerMode ? \"text-white/50\" : \"text-gray-500\"),\n            children: \"Drag layers from the library to start building\"\n        }, void 0, false, {\n            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack/LayerList.tsx\",\n            lineNumber: 42,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.ReorderGroup, {\n        axis: \"y\",\n        values: nodes,\n        onReorder: onNodesChange,\n        className: \"flex-1 space-y-2\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.AnimatePresence, {\n            children: nodes.map((node, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_LayerItem__WEBPACK_IMPORTED_MODULE_3__.LayerItem, {\n                    node: node,\n                    isSelected: node.id === selectedNodeId,\n                    isDragging: isDragging,\n                    onDragStart: ()=>setIsDragging(true),\n                    onDragEnd: ()=>setIsDragging(false),\n                    onClick: ()=>onNodeSelect(node.id),\n                    onRemove: ()=>onRemoveNode(node.id),\n                    onUpdate: handleNodeUpdate,\n                    powerMode: powerMode,\n                    isSimulating: isSimulating,\n                    simulationDelay: index * 0.2\n                }, node.id, false, {\n                    fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack/LayerList.tsx\",\n                    lineNumber: 60,\n                    columnNumber: 11\n                }, this))\n        }, void 0, false, {\n            fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack/LayerList.tsx\",\n            lineNumber: 58,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/glendonchin/Desktop/aimodellab/components/ModelBuilder/LayerStack/LayerList.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, this);\n}\n_s(LayerList, \"VIDKbg2yfT0CLfTnlFHLO2Fjmb8=\");\n_c = LayerList;\nvar _c;\n$RefreshReg$(_c, \"LayerList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTW9kZWxCdWlsZGVyL0xheWVyU3RhY2svTGF5ZXJMaXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ3dCO0FBQ3hCO0FBRU87QUFZakMsU0FBU0ssVUFBVSxLQVFUO1FBUlMsRUFDeEJDLEtBQUssRUFDTEMsY0FBYyxFQUNkQyxZQUFZLEVBQ1pDLGFBQWEsRUFDYkMsWUFBWSxFQUNaQyxTQUFTLEVBQ1RDLFlBQVksRUFDRyxHQVJTOztJQVN4QixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR2QsK0NBQVFBLENBQUM7SUFFN0MsTUFBTWUsbUJBQW1CLENBQUNDLFFBQWdCQztRQUN4Q1IsY0FDRUgsTUFBTVksR0FBRyxDQUFDQyxDQUFBQSxPQUNSQSxLQUFLQyxFQUFFLEtBQUtKLFNBQ1I7Z0JBQUUsR0FBR0csSUFBSTtnQkFBRSxHQUFHRixPQUFPO1lBQUMsSUFDdEJFO0lBR1Y7SUFFQSxJQUFJYixNQUFNZSxNQUFNLEtBQUssR0FBRztRQUN0QixxQkFDRSw4REFBQ0M7WUFBSUMsV0FBV3BCLDhDQUFFQSxDQUNoQixtREFDQVEsWUFBWSxrQkFBa0I7c0JBQzdCOzs7Ozs7SUFJUDtJQUVBLHFCQUNFLDhEQUFDVix1REFBYTtRQUNad0IsTUFBSztRQUNMQyxRQUFRcEI7UUFDUnFCLFdBQVdsQjtRQUNYYyxXQUFVO2tCQUVWLDRFQUFDckIsMERBQWVBO3NCQUNiSSxNQUFNWSxHQUFHLENBQUMsQ0FBQ0MsTUFBTVMsc0JBQ2hCLDhEQUFDeEIsaURBQVNBO29CQUVSZSxNQUFNQTtvQkFDTlUsWUFBWVYsS0FBS0MsRUFBRSxLQUFLYjtvQkFDeEJNLFlBQVlBO29CQUNaaUIsYUFBYSxJQUFNaEIsY0FBYztvQkFDakNpQixXQUFXLElBQU1qQixjQUFjO29CQUMvQmtCLFNBQVMsSUFBTXhCLGFBQWFXLEtBQUtDLEVBQUU7b0JBQ25DYSxVQUFVLElBQU12QixhQUFhUyxLQUFLQyxFQUFFO29CQUNwQ2MsVUFBVW5CO29CQUNWSixXQUFXQTtvQkFDWEMsY0FBY0E7b0JBQ2R1QixpQkFBaUJQLFFBQVE7bUJBWHBCVCxLQUFLQyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUFpQnhCO0dBM0RnQmY7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Nb2RlbEJ1aWxkZXIvTGF5ZXJTdGFjay9MYXllckxpc3QudHN4P2ZhYjciXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVvcmRlciwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBjbiB9IGZyb20gJ0AvbGliL3V0aWxzJztcbmltcG9ydCB7IE1vZGVsTm9kZSB9IGZyb20gJ0AvbGliL21vZGVsL3R5cGVzJztcbmltcG9ydCB7IExheWVySXRlbSB9IGZyb20gJy4vTGF5ZXJJdGVtJztcblxudHlwZSBMYXllckxpc3RQcm9wcyA9IHtcbiAgbm9kZXM6IE1vZGVsTm9kZVtdO1xuICBzZWxlY3RlZE5vZGVJZDogc3RyaW5nIHwgbnVsbDtcbiAgb25Ob2RlU2VsZWN0OiAobm9kZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uTm9kZXNDaGFuZ2U6IChub2RlczogTW9kZWxOb2RlW10pID0+IHZvaWQ7XG4gIG9uUmVtb3ZlTm9kZTogKG5vZGVJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBwb3dlck1vZGU6IGJvb2xlYW47XG4gIGlzU2ltdWxhdGluZz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gTGF5ZXJMaXN0KHtcbiAgbm9kZXMsXG4gIHNlbGVjdGVkTm9kZUlkLFxuICBvbk5vZGVTZWxlY3QsXG4gIG9uTm9kZXNDaGFuZ2UsXG4gIG9uUmVtb3ZlTm9kZSxcbiAgcG93ZXJNb2RlLFxuICBpc1NpbXVsYXRpbmdcbn06IExheWVyTGlzdFByb3BzKSB7XG4gIGNvbnN0IFtpc0RyYWdnaW5nLCBzZXRJc0RyYWdnaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVOb2RlVXBkYXRlID0gKG5vZGVJZDogc3RyaW5nLCB1cGRhdGVzOiBQYXJ0aWFsPE1vZGVsTm9kZT4pID0+IHtcbiAgICBvbk5vZGVzQ2hhbmdlKFxuICAgICAgbm9kZXMubWFwKG5vZGUgPT4gXG4gICAgICAgIG5vZGUuaWQgPT09IG5vZGVJZCBcbiAgICAgICAgICA/IHsgLi4ubm9kZSwgLi4udXBkYXRlcyB9XG4gICAgICAgICAgOiBub2RlXG4gICAgICApXG4gICAgKTtcbiAgfTtcblxuICBpZiAobm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbihcbiAgICAgICAgXCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1zbVwiLFxuICAgICAgICBwb3dlck1vZGUgPyBcInRleHQtd2hpdGUvNTBcIiA6IFwidGV4dC1ncmF5LTUwMFwiXG4gICAgICApfT5cbiAgICAgICAgRHJhZyBsYXllcnMgZnJvbSB0aGUgbGlicmFyeSB0byBzdGFydCBidWlsZGluZ1xuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlb3JkZXIuR3JvdXBcbiAgICAgIGF4aXM9XCJ5XCJcbiAgICAgIHZhbHVlcz17bm9kZXN9XG4gICAgICBvblJlb3JkZXI9e29uTm9kZXNDaGFuZ2V9XG4gICAgICBjbGFzc05hbWU9XCJmbGV4LTEgc3BhY2UteS0yXCJcbiAgICA+XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7bm9kZXMubWFwKChub2RlLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxMYXllckl0ZW1cbiAgICAgICAgICAgIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgIG5vZGU9e25vZGV9XG4gICAgICAgICAgICBpc1NlbGVjdGVkPXtub2RlLmlkID09PSBzZWxlY3RlZE5vZGVJZH1cbiAgICAgICAgICAgIGlzRHJhZ2dpbmc9e2lzRHJhZ2dpbmd9XG4gICAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4gc2V0SXNEcmFnZ2luZyh0cnVlKX1cbiAgICAgICAgICAgIG9uRHJhZ0VuZD17KCkgPT4gc2V0SXNEcmFnZ2luZyhmYWxzZSl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5vZGVTZWxlY3Qobm9kZS5pZCl9XG4gICAgICAgICAgICBvblJlbW92ZT17KCkgPT4gb25SZW1vdmVOb2RlKG5vZGUuaWQpfVxuICAgICAgICAgICAgb25VcGRhdGU9e2hhbmRsZU5vZGVVcGRhdGV9XG4gICAgICAgICAgICBwb3dlck1vZGU9e3Bvd2VyTW9kZX1cbiAgICAgICAgICAgIGlzU2ltdWxhdGluZz17aXNTaW11bGF0aW5nfVxuICAgICAgICAgICAgc2ltdWxhdGlvbkRlbGF5PXtpbmRleCAqIDAuMn1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvUmVvcmRlci5Hcm91cD5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJSZW9yZGVyIiwiQW5pbWF0ZVByZXNlbmNlIiwiY24iLCJMYXllckl0ZW0iLCJMYXllckxpc3QiLCJub2RlcyIsInNlbGVjdGVkTm9kZUlkIiwib25Ob2RlU2VsZWN0Iiwib25Ob2Rlc0NoYW5nZSIsIm9uUmVtb3ZlTm9kZSIsInBvd2VyTW9kZSIsImlzU2ltdWxhdGluZyIsImlzRHJhZ2dpbmciLCJzZXRJc0RyYWdnaW5nIiwiaGFuZGxlTm9kZVVwZGF0ZSIsIm5vZGVJZCIsInVwZGF0ZXMiLCJtYXAiLCJub2RlIiwiaWQiLCJsZW5ndGgiLCJkaXYiLCJjbGFzc05hbWUiLCJHcm91cCIsImF4aXMiLCJ2YWx1ZXMiLCJvblJlb3JkZXIiLCJpbmRleCIsImlzU2VsZWN0ZWQiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VuZCIsIm9uQ2xpY2siLCJvblJlbW92ZSIsIm9uVXBkYXRlIiwic2ltdWxhdGlvbkRlbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ModelBuilder/LayerStack/LayerList.tsx\n"));

/***/ })

});