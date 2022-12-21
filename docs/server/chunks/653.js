"use strict";
exports.id = 653;
exports.ids = [653];
exports.modules = {

/***/ 1109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);



const baseStyles = {
    solid: 'group inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold font-size:"100px" focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
    outline: "group inline-flex <ring-2>1</ring-2> items-center justify-center rounded-full py-4 px-8 text-sm focus:outline-none"
};
const variantStyles = {
    solid: {
        slate: "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
        blue: "bg-[#508C56] text-white hover:text-slate-100 hover:bg-[#7DB282] active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
        white: "bg-white text-slate-900 hover:text-white hover:bg-[#0C790A] active:bg-[#16B012] active:text-white focus-visible:outline-white",
        green: "text-white hover:bg-[#0C790A] active:bg-[#16B012] active:text-white focus-visible:outline-white"
    },
    outline: {
        slate: "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
        white: "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white"
    }
};
function Button({ variant ="solid" , color ="slate" , className , href , ...props }) {
    className = clsx__WEBPACK_IMPORTED_MODULE_2___default()(baseStyles[variant], variantStyles[variant][color], className);
    return href ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: href,
        className: className,
        ...props
    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: className,
        ...props
    });
}


/***/ }),

/***/ 9973:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Logo() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-row justify-center mx-auto",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: "/logo.svg",
                className: "h-10 w-auto"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "my-auto pl-1 text-xl font-display",
                children: [
                    "Cacao",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-[#72C187] font-semibold",
                        children: "DAO"
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;