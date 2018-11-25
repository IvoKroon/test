module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "/y5L":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"open":"open__3ZFh8","red":"red__BAwuh","border":"border__10Tic","closed":"closed__da5Sc","buttonO":"buttonO__3L-Ce","buttonC":"buttonC__1M_zU","close":"close__1CeDy","textfieldC":"textfieldC__17Xmk","opacityOut":"opacityOut__1mHWX","textfieldO":"textfieldO__fq1br","opacity":"opacity__1cVBV"};

/***/ }),

/***/ "0c/n":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"main":"main__2Br9A"};

/***/ }),

/***/ "CYfl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"buttonHolder":"buttonHolder__2uwoC","headerHolder":"headerHolder__V8bhE","home":"home__1QMmX"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js



// import { Link } from 'preact-router';


var _ref = Object(preact_min["h"])(
	'h1',
	null,
	'Cityguidr'
);

var header_Header = function Header() {
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		_ref,
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.wow, href: '/tags' },
				'Tags'
			),
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.wow, href: '/activities' },
				'Activities'
			)
		)
	);
};
/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ./routes/tag/style.css
var tag_style = __webpack_require__("CYfl");
var tag_style_default = /*#__PURE__*/__webpack_require__.n(tag_style);

// EXTERNAL MODULE: ./components/actionButton/style.css
var actionButton_style = __webpack_require__("yZgZ");
var actionButton_style_default = /*#__PURE__*/__webpack_require__.n(actionButton_style);

// CONCATENATED MODULE: ./components/actionButton/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var actionButton__ref = Object(preact_min["h"])(
	'svg',
	{
		xmlns: 'http://www.w3.org/2000/svg',
		width: '20',
		height: '20',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' })
);

var _ref2 = Object(preact_min["h"])(
	'svg',
	{
		xmlns: 'http://www.w3.org/2000/svg',
		width: '20',
		height: '20',
		viewBox: '0 0 24 24'
	},
	Object(preact_min["h"])('path', { d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' }),
	Object(preact_min["h"])('path', { d: 'M0 0h24v24H0z', fill: 'none' })
);

var actionButton_Button = function (_Component) {
	_inherits(Button, _Component);

	function Button() {
		_classCallCheck(this, Button);

		var _this = _possibleConstructorReturn(this, _Component.call(this));

		_this.clickEvent = function () {
			_this.props.click();
		};

		_this.state = {
			icon: null
		};

		_this.searchIcon = actionButton__ref;
		_this.addIcon = _ref2;
		// this.clickEvent = this.clickEvent.bind(this);
		return _this;
	}

	Button.prototype.render = function render() {
		return Object(preact_min["h"])(
			'button',
			{ 'class': actionButton_style_default.a.button },
			Object(preact_min["h"])(
				'div',
				{ 'class': actionButton_style_default.a.icon },
				this.props.title === 'search' ? this.searchIcon : this.addIcon
			)
		);
	};

	return Button;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/tag/index.js






var tag__ref = Object(preact_min["h"])(
	'h1',
	null,
	'All tags'
);

var tag__ref2 = Object(preact_min["h"])(
	'table',
	null,
	Object(preact_min["h"])(
		'tr',
		null,
		Object(preact_min["h"])(
			'th',
			null,
			'ID'
		),
		Object(preact_min["h"])(
			'th',
			null,
			'TAG NAME'
		),
		Object(preact_min["h"])(
			'th',
			null,
			'TIMES USED'
		),
		Object(preact_min["h"])(
			'th',
			null,
			'CONNECTED WITH'
		)
	),
	Object(preact_min["h"])(
		'tr',
		null,
		Object(preact_min["h"])(
			'td',
			null,
			'1'
		),
		Object(preact_min["h"])(
			'td',
			null,
			Object(preact_min["h"])(
				'b',
				null,
				'Active'
			)
		),
		Object(preact_min["h"])(
			'td',
			null,
			'22'
		),
		Object(preact_min["h"])(
			'td',
			null,
			'Sport, outside'
		)
	),
	Object(preact_min["h"])(
		'tr',
		null,
		Object(preact_min["h"])(
			'td',
			null,
			'2'
		),
		Object(preact_min["h"])(
			'td',
			null,
			Object(preact_min["h"])(
				'b',
				null,
				'Active'
			)
		),
		Object(preact_min["h"])(
			'td',
			null,
			'22'
		),
		Object(preact_min["h"])(
			'td',
			null,
			'Sport, outside'
		)
	),
	Object(preact_min["h"])(
		'tr',
		null,
		Object(preact_min["h"])(
			'td',
			null,
			'3'
		),
		Object(preact_min["h"])(
			'td',
			null,
			Object(preact_min["h"])(
				'b',
				null,
				'Active'
			)
		),
		Object(preact_min["h"])(
			'td',
			null,
			'22'
		),
		Object(preact_min["h"])(
			'td',
			null,
			'Sport, outside'
		)
	)
);

/* harmony default export */ var tag = (function () {
	var add = function add() {
		console.log('add');
	};

	var search = function search() {
		console.log('search');
	};

	return Object(preact_min["h"])(
		'div',
		{ 'class': tag_style_default.a.home },
		Object(preact_min["h"])(
			'div',
			{ 'class': tag_style_default.a.headerHolder },
			tag__ref,
			Object(preact_min["h"])(
				'div',
				{ 'class': tag_style_default.a.buttonHolder },
				Object(preact_min["h"])(
					match["Link"],
					{ href: '/tags/create' },
					Object(preact_min["h"])(actionButton_Button, { click: add, title: 'add' })
				),
				Object(preact_min["h"])(actionButton_Button, { click: search, title: 'search' })
			)
		),
		tag__ref2
	);
});
// EXTERNAL MODULE: ./components/form/textfield/style.css
var textfield_style = __webpack_require__("clHf");
var textfield_style_default = /*#__PURE__*/__webpack_require__.n(textfield_style);

// CONCATENATED MODULE: ./components/form/textfield/index.js


function textfield__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function textfield__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function textfield__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var textfield_Textfield = function (_Component) {
	textfield__inherits(Textfield, _Component);

	function Textfield() {
		var _temp, _this, _ret;

		textfield__classCallCheck(this, Textfield);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = textfield__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function () {
			_this.props.onChange(event.target.value);
		}, _temp), textfield__possibleConstructorReturn(_this, _ret);
	}

	Textfield.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': textfield_style_default.a.textfieldHolder },
			Object(preact_min["h"])('input', {
				value: this.props.value,
				onChange: this.onChange,
				placeholder: this.props.placeholder,
				'class': textfield_style_default.a.textfield,
				type: this.props.type === 'pass' ? 'password' : 'text'
			})
		);
	};

	return Textfield;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/form/button/style.css
var button_style = __webpack_require__("nJvH");
var button_style_default = /*#__PURE__*/__webpack_require__.n(button_style);

// CONCATENATED MODULE: ./components/form/button/index.js




/* harmony default export */ var form_button = (function (props) {
	var clickEvent = function clickEvent() {
		return props.onClick();
	};
	return Object(preact_min["h"])(
		'button',
		{ onClick: clickEvent, 'class': button_style_default.a.button },
		props.title
	);
});
// EXTERNAL MODULE: ./components/searchButton/style.css
var searchButton_style = __webpack_require__("/y5L");
var searchButton_style_default = /*#__PURE__*/__webpack_require__.n(searchButton_style);

// CONCATENATED MODULE: ./components/searchButton/index.js


function searchButton__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function searchButton__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function searchButton__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var searchButton_SearchButton = function (_Component) {
	searchButton__inherits(SearchButton, _Component);

	function SearchButton() {
		searchButton__classCallCheck(this, SearchButton);

		var _this = searchButton__possibleConstructorReturn(this, _Component.call(this));

		_this.click = function () {
			console.log('CLICK');
			_this.setState({ state: !_this.state.state });
		};

		_this.state = {
			state: false
		};
		return _this;
	}

	SearchButton.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': this.state.state ? searchButton_style_default.a.open : searchButton_style_default.a.closed },
			Object(preact_min["h"])(
				'div',
				{ 'class': [searchButton_style_default.a.border, searchButton_style_default.a.red] },
				'test'
			),
			this.state.state && Object(preact_min["h"])('input', {
				'class': this.state.state ? searchButton_style_default.a.textfieldO : searchButton_style_default.a.textfieldC,
				type: 'text',
				placeholder: 'Search for activity'
			}),
			Object(preact_min["h"])('div', {
				'class': this.state.state ? searchButton_style_default.a.buttonO : searchButton_style_default.a.buttonC,
				onClick: this.click
			})
		);
	};

	return SearchButton;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/signIn/style.css
var signIn_style = __webpack_require__("VgWl");
var signIn_style_default = /*#__PURE__*/__webpack_require__.n(signIn_style);

// CONCATENATED MODULE: ./functions/fetchHelper.js
/* harmony default export */ var fetchHelper = (function () {
	var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	return (
		// Default options are marked with *s
		fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, cors, *same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				// 'Content-Type': 'application/json;'
				Accept: 'application/json',
				'Content-Type': 'application/json'
				// "Content-Type": "application/x-www-form-urlencoded",
			},
			// redirect: 'follow', // manual, *follow, error
			// referrer: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		}).then(function (response) {
			return response.text();
		})
	);
}); // parses response to JSON
// CONCATENATED MODULE: ./routes/signIn/index.js


function signIn__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function signIn__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function signIn__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var signIn__ref = Object(preact_min["h"])(searchButton_SearchButton, null);

var signIn_SignIn = function (_Component) {
	signIn__inherits(SignIn, _Component);

	function SignIn() {
		signIn__classCallCheck(this, SignIn);

		var _this = signIn__possibleConstructorReturn(this, _Component.call(this));

		_this.click = function () {
			return _this.signIn();
		};

		_this.changeEmail = function (email) {
			return _this.setState({ email: email });
		};

		_this.changePassword = function (password) {
			return _this.setState({ password: password });
		};

		_this.signIn = function () {
			console.log(_this.state);
			var url = 'https://api.cityguidr.com/users/login';
			var data = { email: _this.state.email, password: _this.state.password };
			console.log(data);

			fetchHelper(url, data).then(function (data) {
				console.log(data ? JSON.parse(data) : {});
			}).catch(function (err) {
				return console.log(err);
			});
		};

		_this.state = {
			email: null,
			password: null
		};
		return _this;
	}

	SignIn.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': signIn_style_default.a.content },
			signIn__ref,
			Object(preact_min["h"])(
				'h1',
				{ 'class': signIn_style_default.a.header },
				'Cityguidr'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': signIn_style_default.a.textfield },
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Email',
					value: this.state.email,
					onChange: this.changeEmail
				})
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': signIn_style_default.a.textfield },
				Object(preact_min["h"])(textfield_Textfield, {
					type: 'pass',
					placeholder: 'Password',
					value: this.state.password,
					onChange: this.changePassword
				})
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': signIn_style_default.a.buttonHolder },
				Object(preact_min["h"])(form_button, { title: 'Sign in', onClick: this.click })
			)
		);
	};

	return SignIn;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/createTag/style.css
var createTag_style = __webpack_require__("YmkW");
var createTag_style_default = /*#__PURE__*/__webpack_require__.n(createTag_style);

// CONCATENATED MODULE: ./components/loader/index.js



var loader__ref = Object(preact_min["h"])(
  'div',
  null,
  'Loading'
);

var Loader = function Loader() {
  return loader__ref;
};

/* harmony default export */ var loader = (Loader);
// CONCATENATED MODULE: ./routes/createTag/index.js


function createTag__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createTag__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function createTag__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var createTag__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Create tag'
);

var createTag__ref2 = Object(preact_min["h"])(loader, null);

var createTag_CreateTag = function (_Component) {
	createTag__inherits(CreateTag, _Component);

	function CreateTag() {
		createTag__classCallCheck(this, CreateTag);

		var _this = createTag__possibleConstructorReturn(this, _Component.call(this));

		_this.clickEvent = function () {
			_this.fetch();
			console.log('CLICK');
		};

		_this.fetch = function () {
			_this.setState({ loading: true });
			fetch('https://jsonplaceholder.typicode.com/todos/1').then(function (response) {
				return response.json();
			}).then(function (json) {
				_this.setState({ loading: false });
				console.log(json);
			});
		};

		_this.tagChange = function (name) {
			return _this.setState({ name: name });
		};

		_this.state = {
			name: '',
			loading: false
		};
		return _this;
	}

	CreateTag.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			null,
			!this.state.loading ? Object(preact_min["h"])(
				'div',
				{ 'class': createTag_style_default.a.home },
				Object(preact_min["h"])(
					'div',
					{ 'class': createTag_style_default.a.headerHolder },
					createTag__ref,
					Object(preact_min["h"])(textfield_Textfield, {
						placeholder: 'Tag name',
						value: this.state.title,
						onChange: this.tagChange
					}),
					Object(preact_min["h"])(form_button, { onClick: this.clickEvent, title: 'Create' })
				)
			) : createTag__ref2
		);
	};

	return CreateTag;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/createActivity/style.css
var createActivity_style = __webpack_require__("K61a");
var createActivity_style_default = /*#__PURE__*/__webpack_require__.n(createActivity_style);

// EXTERNAL MODULE: ./components/form/checkbox/style.css
var checkbox_style = __webpack_require__("akbS");
var checkbox_style_default = /*#__PURE__*/__webpack_require__.n(checkbox_style);

// CONCATENATED MODULE: ./components/form/checkbox/index.js




/* harmony default export */ var form_checkbox = (function (props) {
	var onChange = function onChange() {
		props.onChange(!props.checked);
	};

	return Object(preact_min["h"])(
		'div',
		{ 'class': checkbox_style_default.a.checkBoxHolder },
		Object(preact_min["h"])('input', {
			checked: props.checked ? 'checked' : '',
			onChange: onChange,
			'class': checkbox_style_default.a.checkbox,
			type: 'checkbox'
		}),
		Object(preact_min["h"])(
			'label',
			{ 'class': checkbox_style_default.a.label },
			props.title
		)
	);
});
// CONCATENATED MODULE: ./routes/createActivity/index.js


function createActivity__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createActivity__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function createActivity__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var createActivity__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Create activity'
);

var createActivity_CreateActivity = function (_Component) {
	createActivity__inherits(CreateActivity, _Component);

	function CreateActivity() {
		createActivity__classCallCheck(this, CreateActivity);

		var _this = createActivity__possibleConstructorReturn(this, _Component.call(this));

		_this.nameChange = function (name) {
			return _this.setState({ name: name });
		};

		_this.emailChange = function (email) {
			return _this.setState({ email: email });
		};

		_this.descriptionChange = function (description) {
			return _this.setState({ description: description });
		};

		_this.photoLinkChange = function (photoLink) {
			return _this.setState({ photoLink: photoLink });
		};

		_this.addressChange = function (address) {
			return _this.setState({ address: address });
		};

		_this.contactedChange = function (checked) {
			return _this.setState({ contacted: checked });
		};

		_this.clickEvent = function () {
			return console.log(_this.state);
		};

		_this.state = {
			name: '',
			email: '',
			description: '',
			photoLink: '',
			address: '',
			contacted: false
		};
		return _this;
	}

	CreateActivity.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': createActivity_style_default.a.home },
			Object(preact_min["h"])(
				'div',
				{ 'class': createActivity_style_default.a.headerHolder },
				createActivity__ref,
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Name',
					value: this.state.name,
					onChange: this.nameChange
				}),
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Email',
					value: this.state.email,
					onChange: this.emailChange
				}),
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Description',
					value: this.state.description,
					onChange: this.descriptionChange
				}),
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Photo link',
					value: this.state.photoLink,
					onChange: this.photoLinkChange
				}),
				Object(preact_min["h"])(textfield_Textfield, {
					placeholder: 'Address',
					value: this.state.address,
					onChange: this.addressChange
				}),
				Object(preact_min["h"])(form_checkbox, {
					checked: this.state.contacted,
					onChange: this.contactedChange,
					title: 'Contacted'
				}),
				Object(preact_min["h"])(form_button, { onClick: this.clickEvent, title: 'Create' })
			)
		);
	};

	return CreateActivity;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/activities/style.css
var activities_style = __webpack_require__("e/oc");
var activities_style_default = /*#__PURE__*/__webpack_require__.n(activities_style);

// CONCATENATED MODULE: ./routes/activities/index.js


function activities__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function activities__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function activities__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var activities__ref = Object(preact_min["h"])(
	'h1',
	null,
	'All Activities'
);

var activities__ref2 = Object(preact_min["h"])(
	match["Link"],
	{ href: '/activities/create' },
	Object(preact_min["h"])(actionButton_Button, { title: 'add' })
);

var _ref3 = Object(preact_min["h"])(actionButton_Button, { title: 'search' });

var _ref4 = Object(preact_min["h"])(
	'th',
	null,
	'NAME'
);

var _ref5 = Object(preact_min["h"])(
	'th',
	null,
	'EMAIL'
);

var _ref6 = Object(preact_min["h"])(
	'td',
	null,
	Object(preact_min["h"])(
		'b',
		null,
		'Dutch pinball museum'
	)
);

var _ref7 = Object(preact_min["h"])(
	'td',
	null,
	'info@dutchpinballmuseum.nl'
);

var _ref8 = Object(preact_min["h"])(
	'td',
	null,
	Object(preact_min["h"])(
		'b',
		null,
		'Dutch pinball museum'
	)
);

var _ref9 = Object(preact_min["h"])(
	'td',
	null,
	'info@dutchpinballmuseum.nl'
);

var _ref10 = Object(preact_min["h"])(
	'td',
	null,
	Object(preact_min["h"])(
		'b',
		null,
		'Dutch pinball museum'
	)
);

var _ref11 = Object(preact_min["h"])(
	'td',
	null,
	'info@dutchpinballmuseum.nl'
);

var _ref12 = Object(preact_min["h"])(
	'h1',
	null,
	'LOADING...'
);

var activities_Activities = function (_Component) {
	activities__inherits(Activities, _Component);

	function Activities() {
		activities__classCallCheck(this, Activities);

		var _this = activities__possibleConstructorReturn(this, _Component.call(this));

		_this.fetch = function () {
			_this.setState({ loading: true });
			fetch('https://api.cityguidr.com/users/login', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // no-referrer, *client
				body: JSON.stringify({
					email: 'ivokroo@gmail.com',
					password: 'pass1234'
				})
			}).then(function (response) {
				return response.json();
			}).then(function (json) {
				_this.setState({ loading: false });
				console.log(json);
			});
		};

		_this.state = {
			loading: false
		};
		return _this;
	}

	Activities.prototype.componentDidMount = function componentDidMount() {
		this.fetch();
		// const user = localStorage.getItem('user');
		// console.log(JSON.parse(user));
	};

	Activities.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ 'class': activities_style_default.a.home },
			!this.state.loading ? Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(
					'div',
					{ 'class': activities_style_default.a.headerHolder },
					activities__ref,
					Object(preact_min["h"])(
						'div',
						{ 'class': activities_style_default.a.buttonHolder },
						activities__ref2,
						_ref3
					)
				),
				Object(preact_min["h"])(
					'table',
					null,
					Object(preact_min["h"])(
						'tr',
						null,
						_ref4,
						_ref5,
						Object(preact_min["h"])(
							'th',
							{ 'class': activities_style_default.a.centerd },
							'CONTACTED'
						),
						Object(preact_min["h"])(
							'th',
							{ 'class': activities_style_default.a.centerd },
							'ACCEPTED'
						)
					),
					Object(preact_min["h"])(
						'tr',
						null,
						_ref6,
						_ref7,
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						),
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						)
					),
					Object(preact_min["h"])(
						'tr',
						null,
						_ref8,
						_ref9,
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						),
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						)
					),
					Object(preact_min["h"])(
						'tr',
						null,
						_ref10,
						_ref11,
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						),
						Object(preact_min["h"])(
							'td',
							{ 'class': activities_style_default.a.centerd },
							'\u2713'
						)
					)
				)
			) : _ref12
		);
	};

	return Activities;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/style.css
var components_style = __webpack_require__("0c/n");
var components_style_default = /*#__PURE__*/__webpack_require__.n(components_style);

// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var app__ref2 = Object(preact_min["h"])(header, null);

var app__ref3 = Object(preact_min["h"])(signIn_SignIn, { path: '/' });

var app__ref4 = Object(preact_min["h"])(tag, { path: '/tags' });

var app__ref5 = Object(preact_min["h"])(activities_Activities, { path: '/activities/' });

var app__ref6 = Object(preact_min["h"])(createActivity_CreateActivity, { path: '/activities/create' });

var app__ref7 = Object(preact_min["h"])(createTag_CreateTag, { path: '/tags/create' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(
				match_default.a,
				{ path: '/' },
				function (_ref) {
					var matches = _ref.matches,
					    path = _ref.path,
					    url = _ref.url;
					return !matches && app__ref2;
				},
				'} }}'
			),
			Object(preact_min["h"])(
				'div',
				{ 'class': components_style_default.a.main },
				Object(preact_min["h"])(
					preact_router_es["Router"],
					{ onChange: this.handleRoute },
					app__ref3,
					app__ref4,
					app__ref5,
					app__ref6,
					app__ref7
				)
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "K61a":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__3_HzJ"};

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = M;for (i = arguments.length; i-- > 2;) {
      T.push(arguments[i]);
    }t && null != t.children && (T.length || T.push(t.children), delete t.children);while (T.length) {
      if ((o = T.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        T.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === M ? l = [o] : l.push(o), n = r;
    }var a = new S();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== L.vnode && L.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function o(e) {
    !e.__d && (e.__d = !0) && 1 == D.push(e) && (L.debounceRendering || P)(r);
  }function r() {
    var e,
        t = D;D = [];while (e = t.pop()) {
      e.__d && C(e);
    }
  }function i(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function l(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function a(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function p(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function s(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function u(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === W.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, c, l) : e.removeEventListener(t, c, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) {
        try {
          e[t] = null == o ? "" : o;
        } catch (e) {}null != o && !1 !== o || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var a = r && t !== (t = t.replace(/^xlink:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function c(e) {
    return this.__l[e.type](L.event && L.event(e) || e);
  }function _() {
    var e;while (e = E.pop()) {
      L.afterMount && L.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    V++ || (A = null != r && void 0 !== r.ownerSVGElement, H = null != e && !("__preactattr_" in e));var l = f(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --V || (H = !1, i || _()), l;
  }function f(e, t, n, o, r) {
    var i = e,
        a = A;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0))), i.__preactattr_ = !0, i;var s = t.nodeName;if ("function" == typeof s) return x(e, t, n, o);if (A = "svg" === s || "foreignObject" !== s && A, s += "", (!e || !l(e, s)) && (i = p(s, A), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), m(e, !0);
    }var u = i.firstChild,
        c = i.__preactattr_,
        _ = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var d = i.attributes, f = d.length; f--;) {
        c[d[f].name] = d[f].value;
      }
    }return !H && _ && 1 === _.length && "string" == typeof _[0] && null != u && void 0 !== u.splitText && null == u.nextSibling ? u.nodeValue != _[0] && (u.nodeValue = _[0]) : (_ && _.length || null != u) && h(i, _, n, o, H || null != c.dangerouslySetInnerHTML), b(i, t.attributes, c), A = a, i;
  }function h(e, t, n, o, r) {
    var l,
        a,
        p,
        u,
        c,
        _ = e.childNodes,
        d = [],
        h = {},
        v = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (v++, h[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (d[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      u = t[C], c = null;var k = u.key;if (null != k) v && void 0 !== h[k] && (c = h[k], h[k] = void 0, v--);else if (b < g) for (l = b; l < g; l++) {
        if (void 0 !== d[l] && i(a = d[l], u, r)) {
          c = a, d[l] = void 0, l === g - 1 && g--, l === b && b++;break;
        }
      }c = f(c, u, n, o), p = _[C], c && c !== e && c !== p && (null == p ? e.appendChild(c) : c === p.nextSibling ? s(p) : e.insertBefore(c, p));
    }if (v) for (var C in h) {
      void 0 !== h[C] && m(h[C], !1);
    }while (b <= g) {
      void 0 !== (c = d[g--]) && m(c, !1);
    }
  }function m(e, t) {
    var n = e._component;n ? N(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || s(e), v(e));
  }function v(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;m(e, !0), e = t;
    }
  }function b(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || u(e, o, n[o], n[o] = void 0, A);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || u(e, o, n[o], n[o] = t[o], A);
    }
  }function y(e, t, n) {
    var o,
        r = B.length;e.prototype && e.prototype.render ? (o = new e(t, n), k.call(o, t, n)) : (o = new k(t, n), o.constructor = e, o.render = g);while (r--) {
      if (B[r].constructor === e) return o.__b = B[r].__b, B.splice(r, 1), o;
    }return o;
  }function g(e, t, n) {
    return this.constructor(e, n);
  }function w(e, t, n, r, i) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.__c || (e.__c = e.context), e.context = r), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === L.syncComponentUpdates && e.base ? o(e) : C(e, 1, i)), e.__r && e.__r(e));
  }function C(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          p,
          s = e.props,
          u = e.state,
          c = e.context,
          f = e.__p || s,
          h = e.__s || u,
          v = e.__c || c,
          b = e.base,
          g = e.__b,
          x = b || g,
          k = e._component,
          U = !1,
          S = v;if (e.constructor.getDerivedStateFromProps && (u = t(t({}, u), e.constructor.getDerivedStateFromProps(s, u)), e.state = u), b && (e.props = f, e.state = h, e.context = v, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, u, c) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(s, u, c), e.props = s, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(s, u, c), e.getChildContext && (c = t(t({}, c), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(f, h));var T,
            M,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = a(i);l = k, l && l.constructor === P && W.key == l.__k ? w(l, W, 1, c, !1) : (T = l, e._component = l = y(P, W, c), l.__b = l.__b || g, l.__u = e, w(l, W, 0, c, !1), C(l, 1, o, !0)), M = l.base;
        } else p = x, T = k, T && (p = e._component = null), (x || 1 === n) && (p && (p._component = null), M = d(p, i, c, o || !b, x && x.parentNode, !0));if (x && M !== x && l !== k) {
          var D = x.parentNode;D && M !== D && (D.replaceChild(M, x), T || (x._component = null, m(x, !1)));
        }if (T && N(T), e.base = M, M && !r) {
          var A = e,
              H = e;while (H = H.__u) {
            (A = H).base = M;
          }M._component = A, M._componentConstructor = A.constructor;
        }
      }!b || o ? E.unshift(e) : U || (e.componentDidUpdate && e.componentDidUpdate(f, h, S), L.afterUpdate && L.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }V || r || _();
    }
  }function x(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        p = r && e._componentConstructor === t.nodeName,
        s = p,
        u = a(t);while (r && !s && (r = r.__u)) {
      s = r.constructor === t.nodeName;
    }return r && s && (!o || r._component) ? (w(r, u, 3, n, o), e = r.base) : (i && !p && (N(i), e = l = null), r = y(t.nodeName, u, n), e && !r.__b && (r.__b = e, l = null), w(r, u, 1, n, o), e = r.base, l && e !== l && (l._component = null, m(l, !1))), e;
  }function N(e) {
    L.beforeUnmount && L.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? N(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, s(t), B.push(e), v(t)), e.__r && e.__r(null);
  }function k(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function U(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }var S = function S() {},
      L = {},
      T = [],
      M = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      W = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      D = [],
      E = [],
      V = 0,
      A = !1,
      H = !1,
      B = [];t(k.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), o(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), C(this, 2);
    }, render: function render() {} });var F = { h: e, createElement: e, cloneElement: n, Component: k, render: U, rerender: r, options: L }; true ? module.exports = F : self.preact = F;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "VgWl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3W39W","content":"content__UuVou","textfield":"textfield__3bHCT","buttonHolder":"buttonHolder__2kk5N"};

/***/ }),

/***/ "YmkW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1ZwmS"};

/***/ }),

/***/ "akbS":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"checkBoxHolder":"checkBoxHolder__2qTL7","label":"label__3U8B6","checkbox":"checkbox__1GmBd"};

/***/ }),

/***/ "clHf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"textfield":"textfield__tJ4rP"};

/***/ }),

/***/ "e/oc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"buttonHolder":"buttonHolder__2xARL","headerHolder":"headerHolder__3kS6q","home":"home__3Hnnt","centerd":"centerd__252Fk"};

/***/ }),

/***/ "nJvH":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"button":"button__2-Qej"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3QGkI","wow":"wow__3SquP"};

/***/ }),

/***/ "yZgZ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"button":"button__21EWr","icon":"icon__1BHES"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map