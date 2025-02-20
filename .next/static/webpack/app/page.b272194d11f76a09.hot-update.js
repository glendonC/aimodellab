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

/***/ "(app-pages-browser)/./components/model/constants.ts":
/*!***************************************!*\
  !*** ./components/model/constants.ts ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LAYER_COLORS: function() { return /* binding */ LAYER_COLORS; },\n/* harmony export */   LAYER_EXPLANATIONS: function() { return /* binding */ LAYER_EXPLANATIONS; },\n/* harmony export */   LAYER_STATS: function() { return /* binding */ LAYER_STATS; }\n/* harmony export */ });\n/* __next_internal_client_entry_do_not_use__ LAYER_COLORS,LAYER_STATS,LAYER_EXPLANATIONS auto */ // Layer color definitions\nconst LAYER_COLORS = {\n    input: \"#60a5fa\",\n    cnn: \"#3b82f6\",\n    transformer: \"#9333ea\",\n    rnn: \"#22c55e\",\n    output: \"#f43f5e\",\n    mlp: \"#8b5cf6\",\n    graph: \"#06b6d4\",\n    residual: \"#f59e0b\",\n    normalization: \"#10b981\",\n    attention: \"#ec4899\",\n    pooling: \"#0ea5e9\",\n    dropout: \"#6366f1\",\n    embedding: \"#d946ef\",\n    flatten: \"#14b8a6\"\n};\n// Layer statistics\nconst LAYER_STATS = {\n    input: {\n        neurons: 150528,\n        inferenceTime: 0.1,\n        memoryUsage: 0.6,\n        activations: \"None\"\n    },\n    cnn: {\n        neurons: 32768,\n        inferenceTime: 1.5,\n        memoryUsage: 2.0,\n        filters: \"64→128→256\",\n        activations: \"ReLU\"\n    },\n    transformer: {\n        neurons: 49152,\n        inferenceTime: 4.2,\n        memoryUsage: 12.0,\n        heads: 8,\n        activations: \"GELU\"\n    },\n    rnn: {\n        neurons: 8192,\n        inferenceTime: 2.0,\n        memoryUsage: 3.2,\n        hiddenUnits: 512,\n        activations: \"Tanh\"\n    },\n    output: {\n        neurons: 1000,\n        inferenceTime: 0.2,\n        memoryUsage: 0.4,\n        activations: \"Softmax\"\n    },\n    mlp: {\n        neurons: 2048,\n        inferenceTime: 0.8,\n        memoryUsage: 1.6,\n        activations: \"ReLU\",\n        layers: \"2048→1024→512\" // More typical progression\n    },\n    graph: {\n        neurons: 1024,\n        inferenceTime: 1.8,\n        memoryUsage: 2.4,\n        activations: \"ReLU\",\n        aggregation: \"Mean\"\n    },\n    residual: {\n        neurons: 4096,\n        inferenceTime: 1.2,\n        memoryUsage: 2.4,\n        activations: \"ReLU\",\n        connections: \"Skip\"\n    },\n    normalization: {\n        neurons: 512,\n        inferenceTime: 0.2,\n        memoryUsage: 0.4,\n        type: \"BatchNorm\",\n        momentum: 0.99\n    },\n    attention: {\n        neurons: 3072,\n        inferenceTime: 1.8,\n        memoryUsage: 4.8,\n        heads: 8,\n        activations: \"Softmax\"\n    }\n};\n// Layer explanations\nconst LAYER_EXPLANATIONS = {\n    input: {\n        title: \"Input Layer\",\n        description: \"This layer processes raw input data (224\\xd7224 RGB images) and prepares it for the neural network. It applies normalization to scale pixel values between -1 and 1, making the data more suitable for deep learning.\",\n        technical: [\n            \"Input Shape: 224\\xd7224\\xd73\",\n            \"Normalization: [-1, 1]\",\n            \"Data Augmentation: Random crop, flip, rotation\"\n        ]\n    },\n    cnn: {\n        title: \"Convolutional Neural Network\",\n        description: \"The CNN block consists of 3 convolutional layers that progressively extract visual features. Each layer increases the number of filters while reducing spatial dimensions, allowing the network to learn hierarchical representations.\",\n        technical: [\n            \"3 Conv Layers: 64→128→256 filters\",\n            \"Kernel Size: 3\\xd73, Stride: 2\",\n            \"BatchNorm + ReLU activation\"\n        ]\n    },\n    transformer: {\n        title: \"Transformer Block\",\n        description: \"This block uses self-attention mechanisms to capture global relationships in the feature space. The multi-head attention allows the model to focus on different aspects of the input simultaneously.\",\n        technical: [\n            \"6 Attention Heads\",\n            \"Hidden Dim: 512\",\n            \"MLP Ratio: 4\",\n            \"LayerNorm + GELU\"\n        ]\n    },\n    rnn: {\n        title: \"Recurrent Neural Network\",\n        description: \"The RNN block processes sequential features using bidirectional LSTM cells. This allows the model to capture temporal dependencies in both forward and backward directions.\",\n        technical: [\n            \"Bidirectional LSTM\",\n            \"256 Hidden Units\",\n            \"Dropout: 0.2\",\n            \"Skip Connections\"\n        ]\n    },\n    output: {\n        title: \"Output Layer\",\n        description: \"The final layer produces class probabilities for 1000 different categories. It uses softmax activation to ensure all probabilities sum to 1, with temperature scaling for better calibration.\",\n        technical: [\n            \"1000 Output Classes\",\n            \"Softmax Activation\",\n            \"Temperature: 0.7\",\n            \"Cross-Entropy Loss\"\n        ]\n    },\n    mlp: {\n        title: \"Multi-Layer Perceptron\",\n        description: \"A fully connected neural network that transforms features through multiple dense layers. Each layer applies a linear transformation followed by non-linear activation.\",\n        technical: [\n            \"3 Dense Layers: 4096→2048→1024\",\n            \"ReLU Activation\",\n            \"Dropout: 0.5\",\n            \"Xavier Initialization\"\n        ]\n    },\n    graph: {\n        title: \"Graph Neural Network\",\n        description: \"Processes data structured as graphs, where each node aggregates information from its neighbors. Useful for molecular structures, social networks, and other graph-based data.\",\n        technical: [\n            \"Mean Aggregation\",\n            \"Edge Features\",\n            \"2-hop Neighborhood\",\n            \"Graph Attention\"\n        ]\n    },\n    residual: {\n        title: \"Residual Block\",\n        description: \"Implements skip connections that allow information to bypass layers directly. This helps mitigate the vanishing gradient problem and enables training of very deep networks.\",\n        technical: [\n            \"Identity Mapping\",\n            \"2 Conv Layers\",\n            \"Pre-activation\",\n            \"1\\xd71 Bottleneck\"\n        ]\n    },\n    normalization: {\n        title: \"Normalization Layer\",\n        description: \"Stabilizes training by normalizing feature distributions. Adapts to the statistics of each mini-batch while maintaining a running average for inference.\",\n        technical: [\n            \"Batch Normalization\",\n            \"Momentum: 0.99\",\n            \"Epsilon: 1e-5\",\n            \"Affine Transform\"\n        ]\n    },\n    attention: {\n        title: \"Attention Block\",\n        description: \"Computes dynamic weights for feature relationships. Each attention head specializes in different aspects of the input, enabling the model to capture complex dependencies.\",\n        technical: [\n            \"4 Attention Heads\",\n            \"Scaled Dot-Product\",\n            \"Key/Query Dim: 64\",\n            \"Softmax Temperature: 1.0\"\n        ]\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvbW9kZWwvY29uc3RhbnRzLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztpR0FFQSwwQkFBMEI7QUFDbkIsTUFBTUEsZUFBZTtJQUMxQkMsT0FBTztJQUNQQyxLQUFLO0lBQ0xDLGFBQWE7SUFDYkMsS0FBSztJQUNMQyxRQUFRO0lBQ1JDLEtBQUs7SUFDTEMsT0FBTztJQUNQQyxVQUFVO0lBQ1ZDLGVBQWU7SUFDZkMsV0FBVztJQUNYQyxTQUFTO0lBQ1RDLFNBQVM7SUFDVEMsV0FBVztJQUNYQyxTQUFTO0FBQ1gsRUFBRTtBQUVGLG1CQUFtQjtBQUNaLE1BQU1DLGNBQWM7SUFDekJkLE9BQU87UUFDTGUsU0FBUztRQUNUQyxlQUFlO1FBQ2ZDLGFBQWE7UUFDYkMsYUFBYTtJQUNmO0lBQ0FqQixLQUFLO1FBQ0hjLFNBQVM7UUFDVEMsZUFBZTtRQUNmQyxhQUFhO1FBQ2JFLFNBQVM7UUFDVEQsYUFBYTtJQUNmO0lBQ0FoQixhQUFhO1FBQ1hhLFNBQVM7UUFDVEMsZUFBZTtRQUNmQyxhQUFhO1FBQ2JHLE9BQU87UUFDUEYsYUFBYTtJQUNmO0lBQ0FmLEtBQUs7UUFDSFksU0FBUztRQUNUQyxlQUFlO1FBQ2ZDLGFBQWE7UUFDYkksYUFBYTtRQUNiSCxhQUFhO0lBQ2Y7SUFDQWQsUUFBUTtRQUNOVyxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiQyxhQUFhO0lBQ2Y7SUFDQWIsS0FBSztRQUNIVSxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiQyxhQUFhO1FBQ2JJLFFBQVEsZ0JBQWdCLDJCQUEyQjtJQUNyRDtJQUNBaEIsT0FBTztRQUNMUyxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiQyxhQUFhO1FBQ2JLLGFBQWE7SUFDZjtJQUNBaEIsVUFBVTtRQUNSUSxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiQyxhQUFhO1FBQ2JNLGFBQWE7SUFDZjtJQUNBaEIsZUFBZTtRQUNiTyxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiUSxNQUFNO1FBQ05DLFVBQVU7SUFDWjtJQUNBakIsV0FBVztRQUNUTSxTQUFTO1FBQ1RDLGVBQWU7UUFDZkMsYUFBYTtRQUNiRyxPQUFPO1FBQ1BGLGFBQWE7SUFDZjtBQUNGLEVBQUU7QUFFRixxQkFBcUI7QUFDZCxNQUFNUyxxQkFBcUI7SUFDaEMzQixPQUFPO1FBQ0w0QixPQUFPO1FBQ1BDLGFBQWE7UUFDYkMsV0FBVztZQUNUO1lBQ0E7WUFDQTtTQUNEO0lBQ0g7SUFDQTdCLEtBQUs7UUFDSDJCLE9BQU87UUFDUEMsYUFBYTtRQUNiQyxXQUFXO1lBQ1Q7WUFDQTtZQUNBO1NBQ0Q7SUFDSDtJQUNBNUIsYUFBYTtRQUNYMEIsT0FBTztRQUNQQyxhQUFhO1FBQ2JDLFdBQVc7WUFDVDtZQUNBO1lBQ0E7WUFDQTtTQUNEO0lBQ0g7SUFDQTNCLEtBQUs7UUFDSHlCLE9BQU87UUFDUEMsYUFBYTtRQUNiQyxXQUFXO1lBQ1Q7WUFDQTtZQUNBO1lBQ0E7U0FDRDtJQUNIO0lBQ0ExQixRQUFRO1FBQ053QixPQUFPO1FBQ1BDLGFBQWE7UUFDYkMsV0FBVztZQUNUO1lBQ0E7WUFDQTtZQUNBO1NBQ0Q7SUFDSDtJQUNBekIsS0FBSztRQUNIdUIsT0FBTztRQUNQQyxhQUFhO1FBQ2JDLFdBQVc7WUFDVDtZQUNBO1lBQ0E7WUFDQTtTQUNEO0lBQ0g7SUFDQXhCLE9BQU87UUFDTHNCLE9BQU87UUFDUEMsYUFBYTtRQUNiQyxXQUFXO1lBQ1Q7WUFDQTtZQUNBO1lBQ0E7U0FDRDtJQUNIO0lBQ0F2QixVQUFVO1FBQ1JxQixPQUFPO1FBQ1BDLGFBQWE7UUFDYkMsV0FBVztZQUNUO1lBQ0E7WUFDQTtZQUNBO1NBQ0Q7SUFDSDtJQUNBdEIsZUFBZTtRQUNib0IsT0FBTztRQUNQQyxhQUFhO1FBQ2JDLFdBQVc7WUFDVDtZQUNBO1lBQ0E7WUFDQTtTQUNEO0lBQ0g7SUFDQXJCLFdBQVc7UUFDVG1CLE9BQU87UUFDUEMsYUFBYTtRQUNiQyxXQUFXO1lBQ1Q7WUFDQTtZQUNBO1lBQ0E7U0FDRDtJQUNIO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL21vZGVsL2NvbnN0YW50cy50cz82MWM1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG4vLyBMYXllciBjb2xvciBkZWZpbml0aW9uc1xuZXhwb3J0IGNvbnN0IExBWUVSX0NPTE9SUyA9IHtcbiAgaW5wdXQ6ICcjNjBhNWZhJyxcbiAgY25uOiAnIzNiODJmNicsXG4gIHRyYW5zZm9ybWVyOiAnIzkzMzNlYScsXG4gIHJubjogJyMyMmM1NWUnLFxuICBvdXRwdXQ6ICcjZjQzZjVlJyxcbiAgbWxwOiAnIzhiNWNmNicsXG4gIGdyYXBoOiAnIzA2YjZkNCcsXG4gIHJlc2lkdWFsOiAnI2Y1OWUwYicsXG4gIG5vcm1hbGl6YXRpb246ICcjMTBiOTgxJyxcbiAgYXR0ZW50aW9uOiAnI2VjNDg5OScsXG4gIHBvb2xpbmc6ICcjMGVhNWU5JyxcbiAgZHJvcG91dDogJyM2MzY2ZjEnLFxuICBlbWJlZGRpbmc6ICcjZDk0NmVmJyxcbiAgZmxhdHRlbjogJyMxNGI4YTYnXG59O1xuXG4vLyBMYXllciBzdGF0aXN0aWNzXG5leHBvcnQgY29uc3QgTEFZRVJfU1RBVFMgPSB7XG4gIGlucHV0OiB7XG4gICAgbmV1cm9uczogMTUwNTI4LCAvLyAyMjQgKiAyMjQgKiAzIChzdGFuZGFyZCBJbWFnZU5ldCBpbnB1dClcbiAgICBpbmZlcmVuY2VUaW1lOiAwLjEsIC8vIElucHV0IHByZXByb2Nlc3NpbmcgaXMgcmVsYXRpdmVseSBmYXN0XG4gICAgbWVtb3J5VXNhZ2U6IDAuNiwgLy8gfjAuNk1CIGZvciBmbG9hdDMyIHZhbHVlc1xuICAgIGFjdGl2YXRpb25zOiAnTm9uZScsXG4gIH0sXG4gIGNubjoge1xuICAgIG5ldXJvbnM6IDMyNzY4LCAvLyBNb3JlIHJlYWxpc3RpYyBmb3IgZWFybHkgY29udiBsYXllcnNcbiAgICBpbmZlcmVuY2VUaW1lOiAxLjUsXG4gICAgbWVtb3J5VXNhZ2U6IDIuMCxcbiAgICBmaWx0ZXJzOiAnNjTihpIxMjjihpIyNTYnLCAvLyBTdGFuZGFyZCBwcm9ncmVzc2lvblxuICAgIGFjdGl2YXRpb25zOiAnUmVMVScsXG4gIH0sXG4gIHRyYW5zZm9ybWVyOiB7XG4gICAgbmV1cm9uczogNDkxNTIsIC8vIDM4NCAqIDEyOCAoc2VxdWVuY2UgbGVuZ3RoICogZW1iZWRkaW5nIGRpbSlcbiAgICBpbmZlcmVuY2VUaW1lOiA0LjIsXG4gICAgbWVtb3J5VXNhZ2U6IDEyLjAsIC8vIEhpZ2hlciBkdWUgdG8gYXR0ZW50aW9uIG1hdHJpY2VzXG4gICAgaGVhZHM6IDgsIC8vIENvbW1vbiBpbiBCRVJULWJhc2UgbGlrZSBtb2RlbHNcbiAgICBhY3RpdmF0aW9uczogJ0dFTFUnLFxuICB9LFxuICBybm46IHtcbiAgICBuZXVyb25zOiA4MTkyLCAvLyA1MTIgdW5pdHMgKiAxNiB0aW1lc3RlcHNcbiAgICBpbmZlcmVuY2VUaW1lOiAyLjAsXG4gICAgbWVtb3J5VXNhZ2U6IDMuMixcbiAgICBoaWRkZW5Vbml0czogNTEyLFxuICAgIGFjdGl2YXRpb25zOiAnVGFuaCcsXG4gIH0sXG4gIG91dHB1dDoge1xuICAgIG5ldXJvbnM6IDEwMDAsIC8vIFN0YW5kYXJkIEltYWdlTmV0IGNsYXNzZXNcbiAgICBpbmZlcmVuY2VUaW1lOiAwLjIsXG4gICAgbWVtb3J5VXNhZ2U6IDAuNCxcbiAgICBhY3RpdmF0aW9uczogJ1NvZnRtYXgnLFxuICB9LFxuICBtbHA6IHtcbiAgICBuZXVyb25zOiAyMDQ4LFxuICAgIGluZmVyZW5jZVRpbWU6IDAuOCxcbiAgICBtZW1vcnlVc2FnZTogMS42LFxuICAgIGFjdGl2YXRpb25zOiAnUmVMVScsXG4gICAgbGF5ZXJzOiAnMjA0OOKGkjEwMjTihpI1MTInIC8vIE1vcmUgdHlwaWNhbCBwcm9ncmVzc2lvblxuICB9LFxuICBncmFwaDoge1xuICAgIG5ldXJvbnM6IDEwMjQsXG4gICAgaW5mZXJlbmNlVGltZTogMS44LFxuICAgIG1lbW9yeVVzYWdlOiAyLjQsXG4gICAgYWN0aXZhdGlvbnM6ICdSZUxVJyxcbiAgICBhZ2dyZWdhdGlvbjogJ01lYW4nXG4gIH0sXG4gIHJlc2lkdWFsOiB7XG4gICAgbmV1cm9uczogNDA5NixcbiAgICBpbmZlcmVuY2VUaW1lOiAxLjIsXG4gICAgbWVtb3J5VXNhZ2U6IDIuNCxcbiAgICBhY3RpdmF0aW9uczogJ1JlTFUnLFxuICAgIGNvbm5lY3Rpb25zOiAnU2tpcCdcbiAgfSxcbiAgbm9ybWFsaXphdGlvbjoge1xuICAgIG5ldXJvbnM6IDUxMixcbiAgICBpbmZlcmVuY2VUaW1lOiAwLjIsXG4gICAgbWVtb3J5VXNhZ2U6IDAuNCxcbiAgICB0eXBlOiAnQmF0Y2hOb3JtJyxcbiAgICBtb21lbnR1bTogMC45OVxuICB9LFxuICBhdHRlbnRpb246IHtcbiAgICBuZXVyb25zOiAzMDcyLCAvLyAzODQgKiA4IGhlYWRzXG4gICAgaW5mZXJlbmNlVGltZTogMS44LFxuICAgIG1lbW9yeVVzYWdlOiA0LjgsXG4gICAgaGVhZHM6IDgsXG4gICAgYWN0aXZhdGlvbnM6ICdTb2Z0bWF4J1xuICB9XG59O1xuXG4vLyBMYXllciBleHBsYW5hdGlvbnNcbmV4cG9ydCBjb25zdCBMQVlFUl9FWFBMQU5BVElPTlMgPSB7XG4gIGlucHV0OiB7XG4gICAgdGl0bGU6IFwiSW5wdXQgTGF5ZXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGlzIGxheWVyIHByb2Nlc3NlcyByYXcgaW5wdXQgZGF0YSAoMjI0w5cyMjQgUkdCIGltYWdlcykgYW5kIHByZXBhcmVzIGl0IGZvciB0aGUgbmV1cmFsIG5ldHdvcmsuIEl0IGFwcGxpZXMgbm9ybWFsaXphdGlvbiB0byBzY2FsZSBwaXhlbCB2YWx1ZXMgYmV0d2VlbiAtMSBhbmQgMSwgbWFraW5nIHRoZSBkYXRhIG1vcmUgc3VpdGFibGUgZm9yIGRlZXAgbGVhcm5pbmcuXCIsXG4gICAgdGVjaG5pY2FsOiBbXG4gICAgICBcIklucHV0IFNoYXBlOiAyMjTDlzIyNMOXM1wiLFxuICAgICAgXCJOb3JtYWxpemF0aW9uOiBbLTEsIDFdXCIsXG4gICAgICBcIkRhdGEgQXVnbWVudGF0aW9uOiBSYW5kb20gY3JvcCwgZmxpcCwgcm90YXRpb25cIlxuICAgIF1cbiAgfSxcbiAgY25uOiB7XG4gICAgdGl0bGU6IFwiQ29udm9sdXRpb25hbCBOZXVyYWwgTmV0d29ya1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBDTk4gYmxvY2sgY29uc2lzdHMgb2YgMyBjb252b2x1dGlvbmFsIGxheWVycyB0aGF0IHByb2dyZXNzaXZlbHkgZXh0cmFjdCB2aXN1YWwgZmVhdHVyZXMuIEVhY2ggbGF5ZXIgaW5jcmVhc2VzIHRoZSBudW1iZXIgb2YgZmlsdGVycyB3aGlsZSByZWR1Y2luZyBzcGF0aWFsIGRpbWVuc2lvbnMsIGFsbG93aW5nIHRoZSBuZXR3b3JrIHRvIGxlYXJuIGhpZXJhcmNoaWNhbCByZXByZXNlbnRhdGlvbnMuXCIsXG4gICAgdGVjaG5pY2FsOiBbXG4gICAgICBcIjMgQ29udiBMYXllcnM6IDY04oaSMTI44oaSMjU2IGZpbHRlcnNcIixcbiAgICAgIFwiS2VybmVsIFNpemU6IDPDlzMsIFN0cmlkZTogMlwiLFxuICAgICAgXCJCYXRjaE5vcm0gKyBSZUxVIGFjdGl2YXRpb25cIlxuICAgIF1cbiAgfSxcbiAgdHJhbnNmb3JtZXI6IHtcbiAgICB0aXRsZTogXCJUcmFuc2Zvcm1lciBCbG9ja1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgYmxvY2sgdXNlcyBzZWxmLWF0dGVudGlvbiBtZWNoYW5pc21zIHRvIGNhcHR1cmUgZ2xvYmFsIHJlbGF0aW9uc2hpcHMgaW4gdGhlIGZlYXR1cmUgc3BhY2UuIFRoZSBtdWx0aS1oZWFkIGF0dGVudGlvbiBhbGxvd3MgdGhlIG1vZGVsIHRvIGZvY3VzIG9uIGRpZmZlcmVudCBhc3BlY3RzIG9mIHRoZSBpbnB1dCBzaW11bHRhbmVvdXNseS5cIixcbiAgICB0ZWNobmljYWw6IFtcbiAgICAgIFwiNiBBdHRlbnRpb24gSGVhZHNcIixcbiAgICAgIFwiSGlkZGVuIERpbTogNTEyXCIsXG4gICAgICBcIk1MUCBSYXRpbzogNFwiLFxuICAgICAgXCJMYXllck5vcm0gKyBHRUxVXCJcbiAgICBdXG4gIH0sXG4gIHJubjoge1xuICAgIHRpdGxlOiBcIlJlY3VycmVudCBOZXVyYWwgTmV0d29ya1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBSTk4gYmxvY2sgcHJvY2Vzc2VzIHNlcXVlbnRpYWwgZmVhdHVyZXMgdXNpbmcgYmlkaXJlY3Rpb25hbCBMU1RNIGNlbGxzLiBUaGlzIGFsbG93cyB0aGUgbW9kZWwgdG8gY2FwdHVyZSB0ZW1wb3JhbCBkZXBlbmRlbmNpZXMgaW4gYm90aCBmb3J3YXJkIGFuZCBiYWNrd2FyZCBkaXJlY3Rpb25zLlwiLFxuICAgIHRlY2huaWNhbDogW1xuICAgICAgXCJCaWRpcmVjdGlvbmFsIExTVE1cIixcbiAgICAgIFwiMjU2IEhpZGRlbiBVbml0c1wiLFxuICAgICAgXCJEcm9wb3V0OiAwLjJcIixcbiAgICAgIFwiU2tpcCBDb25uZWN0aW9uc1wiXG4gICAgXVxuICB9LFxuICBvdXRwdXQ6IHtcbiAgICB0aXRsZTogXCJPdXRwdXQgTGF5ZXJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUaGUgZmluYWwgbGF5ZXIgcHJvZHVjZXMgY2xhc3MgcHJvYmFiaWxpdGllcyBmb3IgMTAwMCBkaWZmZXJlbnQgY2F0ZWdvcmllcy4gSXQgdXNlcyBzb2Z0bWF4IGFjdGl2YXRpb24gdG8gZW5zdXJlIGFsbCBwcm9iYWJpbGl0aWVzIHN1bSB0byAxLCB3aXRoIHRlbXBlcmF0dXJlIHNjYWxpbmcgZm9yIGJldHRlciBjYWxpYnJhdGlvbi5cIixcbiAgICB0ZWNobmljYWw6IFtcbiAgICAgIFwiMTAwMCBPdXRwdXQgQ2xhc3Nlc1wiLFxuICAgICAgXCJTb2Z0bWF4IEFjdGl2YXRpb25cIixcbiAgICAgIFwiVGVtcGVyYXR1cmU6IDAuN1wiLFxuICAgICAgXCJDcm9zcy1FbnRyb3B5IExvc3NcIlxuICAgIF1cbiAgfSxcbiAgbWxwOiB7XG4gICAgdGl0bGU6IFwiTXVsdGktTGF5ZXIgUGVyY2VwdHJvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkEgZnVsbHkgY29ubmVjdGVkIG5ldXJhbCBuZXR3b3JrIHRoYXQgdHJhbnNmb3JtcyBmZWF0dXJlcyB0aHJvdWdoIG11bHRpcGxlIGRlbnNlIGxheWVycy4gRWFjaCBsYXllciBhcHBsaWVzIGEgbGluZWFyIHRyYW5zZm9ybWF0aW9uIGZvbGxvd2VkIGJ5IG5vbi1saW5lYXIgYWN0aXZhdGlvbi5cIixcbiAgICB0ZWNobmljYWw6IFtcbiAgICAgIFwiMyBEZW5zZSBMYXllcnM6IDQwOTbihpIyMDQ44oaSMTAyNFwiLFxuICAgICAgXCJSZUxVIEFjdGl2YXRpb25cIixcbiAgICAgIFwiRHJvcG91dDogMC41XCIsXG4gICAgICBcIlhhdmllciBJbml0aWFsaXphdGlvblwiXG4gICAgXVxuICB9LFxuICBncmFwaDoge1xuICAgIHRpdGxlOiBcIkdyYXBoIE5ldXJhbCBOZXR3b3JrXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUHJvY2Vzc2VzIGRhdGEgc3RydWN0dXJlZCBhcyBncmFwaHMsIHdoZXJlIGVhY2ggbm9kZSBhZ2dyZWdhdGVzIGluZm9ybWF0aW9uIGZyb20gaXRzIG5laWdoYm9ycy4gVXNlZnVsIGZvciBtb2xlY3VsYXIgc3RydWN0dXJlcywgc29jaWFsIG5ldHdvcmtzLCBhbmQgb3RoZXIgZ3JhcGgtYmFzZWQgZGF0YS5cIixcbiAgICB0ZWNobmljYWw6IFtcbiAgICAgIFwiTWVhbiBBZ2dyZWdhdGlvblwiLFxuICAgICAgXCJFZGdlIEZlYXR1cmVzXCIsXG4gICAgICBcIjItaG9wIE5laWdoYm9yaG9vZFwiLFxuICAgICAgXCJHcmFwaCBBdHRlbnRpb25cIlxuICAgIF1cbiAgfSxcbiAgcmVzaWR1YWw6IHtcbiAgICB0aXRsZTogXCJSZXNpZHVhbCBCbG9ja1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkltcGxlbWVudHMgc2tpcCBjb25uZWN0aW9ucyB0aGF0IGFsbG93IGluZm9ybWF0aW9uIHRvIGJ5cGFzcyBsYXllcnMgZGlyZWN0bHkuIFRoaXMgaGVscHMgbWl0aWdhdGUgdGhlIHZhbmlzaGluZyBncmFkaWVudCBwcm9ibGVtIGFuZCBlbmFibGVzIHRyYWluaW5nIG9mIHZlcnkgZGVlcCBuZXR3b3Jrcy5cIixcbiAgICB0ZWNobmljYWw6IFtcbiAgICAgIFwiSWRlbnRpdHkgTWFwcGluZ1wiLFxuICAgICAgXCIyIENvbnYgTGF5ZXJzXCIsXG4gICAgICBcIlByZS1hY3RpdmF0aW9uXCIsXG4gICAgICBcIjHDlzEgQm90dGxlbmVja1wiXG4gICAgXVxuICB9LFxuICBub3JtYWxpemF0aW9uOiB7XG4gICAgdGl0bGU6IFwiTm9ybWFsaXphdGlvbiBMYXllclwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YWJpbGl6ZXMgdHJhaW5pbmcgYnkgbm9ybWFsaXppbmcgZmVhdHVyZSBkaXN0cmlidXRpb25zLiBBZGFwdHMgdG8gdGhlIHN0YXRpc3RpY3Mgb2YgZWFjaCBtaW5pLWJhdGNoIHdoaWxlIG1haW50YWluaW5nIGEgcnVubmluZyBhdmVyYWdlIGZvciBpbmZlcmVuY2UuXCIsXG4gICAgdGVjaG5pY2FsOiBbXG4gICAgICBcIkJhdGNoIE5vcm1hbGl6YXRpb25cIixcbiAgICAgIFwiTW9tZW50dW06IDAuOTlcIixcbiAgICAgIFwiRXBzaWxvbjogMWUtNVwiLFxuICAgICAgXCJBZmZpbmUgVHJhbnNmb3JtXCJcbiAgICBdXG4gIH0sXG4gIGF0dGVudGlvbjoge1xuICAgIHRpdGxlOiBcIkF0dGVudGlvbiBCbG9ja1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbXB1dGVzIGR5bmFtaWMgd2VpZ2h0cyBmb3IgZmVhdHVyZSByZWxhdGlvbnNoaXBzLiBFYWNoIGF0dGVudGlvbiBoZWFkIHNwZWNpYWxpemVzIGluIGRpZmZlcmVudCBhc3BlY3RzIG9mIHRoZSBpbnB1dCwgZW5hYmxpbmcgdGhlIG1vZGVsIHRvIGNhcHR1cmUgY29tcGxleCBkZXBlbmRlbmNpZXMuXCIsXG4gICAgdGVjaG5pY2FsOiBbXG4gICAgICBcIjQgQXR0ZW50aW9uIEhlYWRzXCIsXG4gICAgICBcIlNjYWxlZCBEb3QtUHJvZHVjdFwiLFxuICAgICAgXCJLZXkvUXVlcnkgRGltOiA2NFwiLFxuICAgICAgXCJTb2Z0bWF4IFRlbXBlcmF0dXJlOiAxLjBcIlxuICAgIF1cbiAgfVxufTsiXSwibmFtZXMiOlsiTEFZRVJfQ09MT1JTIiwiaW5wdXQiLCJjbm4iLCJ0cmFuc2Zvcm1lciIsInJubiIsIm91dHB1dCIsIm1scCIsImdyYXBoIiwicmVzaWR1YWwiLCJub3JtYWxpemF0aW9uIiwiYXR0ZW50aW9uIiwicG9vbGluZyIsImRyb3BvdXQiLCJlbWJlZGRpbmciLCJmbGF0dGVuIiwiTEFZRVJfU1RBVFMiLCJuZXVyb25zIiwiaW5mZXJlbmNlVGltZSIsIm1lbW9yeVVzYWdlIiwiYWN0aXZhdGlvbnMiLCJmaWx0ZXJzIiwiaGVhZHMiLCJoaWRkZW5Vbml0cyIsImxheWVycyIsImFnZ3JlZ2F0aW9uIiwiY29ubmVjdGlvbnMiLCJ0eXBlIiwibW9tZW50dW0iLCJMQVlFUl9FWFBMQU5BVElPTlMiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidGVjaG5pY2FsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/model/constants.ts\n"));

/***/ })

});