!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('b', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.normalizeAclkUrl = normalizeAclkUrl;
  /* eslint-disable import/prefer-default-export */

  /**
   * Google pagead aclk look like this:
   * https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjNi5bcsbPWAhUW4BsKHUePBAwYABARGgJ3bA&ohost=www.google.de&cid=CAASEuRo7v8yDlI1j5_Xe3oAtyANqQ&sig=AOD64_0I3As2z06whZRtfqOC3PGdhk9SIQ&ctype=5&q=&ved=0ahUKEwjc7JLcsbPWAhVLuhQKHQWpCRcQ9aACCKIB&adurl=
   *
   * This function takes such an url and returns a normalized string
   * (which is no longer an url). Links to identical ads should be
   * normalized to the same string while links to different ads
   * should be mapped to different keys.
   */
  function normalizeAclkUrl(url) {
    const parts = url.split('aclk?');
    if (parts.length !== 2) {
      throw new Error(`Expected Google pagead "aclk" URL. Instead got: ${url}`);
    }

    // Ignore the "ved" code, as it seems to change between clicks.
    //
    // For background information about the "ved" code, see
    // https://deedpolloffice.com/blog/articles/decoding-ved-parameter
    const noVed = parts[1].replace(/ved=.*&/, '');

    // TODO: hack, needs to be replaced by a more robust solution
    return noVed.replace(/&q=&adurl=$/, '').replace(/&adurl=&q=$/, '');
  }
});
$__System.registerDynamic('c', ['d', 'e', 'b'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.parseDom = parseDom;

  var _helpers = $__require('d');

  var _decorators = $__require('e');

  var _adDetection = $__require('b');

  function logException(e) {
    window.console.error('[human-web] Exception caught:', e);
  } /* eslint import/prefer-default-export: 'off' */

  function parseDom(url, window, hw) {
    const document = window.document;

    // Let's try and get META refresh to detect javascript redirects.
    try {
      let jsRef = null;
      jsRef = document.querySelector('script');
      if (jsRef && jsRef.innerHTML.indexOf('location.replace') > -1) {
        const location = document.querySelector('title').textContent;
        chrome.runtime.sendMessage({
          module: 'human-web',
          action: 'jsRedirect',
          args: [{
            message: {
              location,
              url: document.location.href
            }
          }]
        });
      }
    } catch (ee) {
      logException(ee);
    }

    try {
      let _ad = '';
      let _h = false;

      if (document.querySelector('#s0p1c0')) {
        _ad = document.querySelector('#s0p1c0').href;
      }

      if (document.querySelector('#tads .ads-ad')) {
        if (document.querySelector('#tads .ads-ad').offsetParent === null) _h = true;
      }

      const additionalInfo = {
        type: 'dom',
        ad: _ad,
        hidden: _h
      };

      hw.action('contentScriptTopAds', {
        message: additionalInfo
      });
    } catch (ee) {
      logException(ee);
    }

    // We need to get all the ADS from this page.
    try {
      const adDetails = {};
      const doc = window.document;
      let noAdsOnThisPage = 0;
      const detectAdRules = {
        query: {
          element: '#ires',
          attribute: 'data-async-context'
        },
        adSections: ['.ads-ad', '.pla-unit-container', '.pla-hovercard-content-ellip', '.cu-container tr'],
        0: {
          cu: ".ad_cclk h3 a[id^='s0p'],.ad_cclk h3 a[id^='n1s0p'],.ad_cclk h3 a[id^='s3p']",
          fu: ".ad_cclk h3 a[id^='vs0p'],.ad_cclk h3 a[id^='vn1s0p'],.ad_cclk h3 a[id^='vs3p']"
        },
        1: {
          cu: "a[id^='plaurlg']",
          fu: "a[id^='vplaurlg']"
        },
        2: {
          cu: "a[id^='plaurlh']",
          fu: "a[id^='vplaurlh']"
        },
        3: {
          cu: "a[id^='plaurlt']",
          fu: "a[id^='vplaurlt']"
        }
      };

      // We need to scrape the query too.
      const queryElement = doc.querySelector(detectAdRules.query.element);
      let query = '';

      if (queryElement) {
        query = queryElement.getAttribute(detectAdRules.query.attribute).replace('query:', '');

        try {
          query = decodeURIComponent(query);
        } catch (ee) {
          // empty
        }
      }

      // Let's iterate over each possible section of the ads.
      detectAdRules.adSections.forEach((eachAdSection, idx) => {
        const adNodes = Array.prototype.slice.call(doc.querySelectorAll(eachAdSection));

        adNodes.forEach(eachAd => {
          const cuRule = detectAdRules[idx].cu;
          const fuRule = detectAdRules[idx].fu;

          const clink = eachAd.querySelector(cuRule);
          const flink = eachAd.querySelector(fuRule);

          if (clink && flink) {
            const clickPattern = (0, _adDetection.normalizeAclkUrl)(clink.href);

            adDetails[clickPattern] = {
              ts: Date.now(),
              query,
              furl: [flink.getAttribute('data-preconnect-urls'), flink.href] // At times there is a redirect chain, we only want the final domain.
            };

            noAdsOnThisPage += 1;
          }
        });
      });

      if (noAdsOnThisPage > 0) {
        hw.action('adClick', {
          ads: adDetails
        });
      }
    } catch (ee) {
      logException(ee);
    }
  }

  (0, _helpers.registerContentScript)('human-web', 'http*', (window, chrome, CLIQZ) => {
    const url = window.location.href;
    const hw = CLIQZ.app.modules['human-web'];

    // Only add for main pages.
    if (window.top === window) {
      window.addEventListener('DOMContentLoaded', () => {
        parseDom(url, window, hw);
      });
    }

    function proxyWindowEvent(action) {
      return ev => {
        hw.action(action, {
          target: {
            baseURI: ev.target.baseURI
          }
        });
      };
    }

    const onKeyPress = (0, _decorators.throttle)(window, proxyWindowEvent('hw:keypress'), 250);
    const onMouseMove = (0, _decorators.throttle)(window, proxyWindowEvent('hw:mousemove'), 250);
    const onScroll = (0, _decorators.throttle)(window, proxyWindowEvent('hw:scroll'), 250);
    const onCopy = (0, _decorators.throttle)(window, proxyWindowEvent('hw:copy'), 250);

    window.addEventListener('keypress', onKeyPress);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('copy', onCopy);

    function stop(ev) {
      if (ev && ev.target !== window.document) {
        return;
      }

      // detect dead windows
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Errors/Dead_object
      try {
        String(window);
      } catch (e) {
        return;
      }

      window.removeEventListener('keypress', onKeyPress);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('copy', onCopy);
    }

    window.addEventListener('unload', stop);
  });
});
$__System.registerDynamic('f', ['d'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _helpers = $__require('d');

  // TODO: not this
  // import { sameGeneralDomain } from '../core/tlds';

  // override of documentcookie based on privacy badger clobbercookie implementation
  // https://github.com/EFForg/privacybadger/blob/master/src/js/contentscripts/clobbercookie.js
  function isNotHtml(window) {
    const document = window.document;
    return document instanceof window.HTMLDocument === false && (document instanceof window.XMLDocument === false || document.createElement('div') instanceof window.HTMLDivElement === false);
  } /* eslint no-restricted-properties: 'off' */

  function clobberCookie() {
    document.__defineSetter__('cookie', () => {});
    document.__defineGetter__('cookie', () => '');
  }

  function insertCookieOverride(document) {
    const code = `(${clobberCookie.toString()})();`;
    const parent = document.documentElement;
    const script = document.createElement('script');

    script.text = code;
    script.async = false;

    parent.insertBefore(script, parent.firstChild);
    parent.removeChild(script);
  }

  function getGeneralDomain(hostname) {
    // a very bad implementation of general domain
    if (!hostname) {
      return '';
    }
    const hostParts = hostname.split('.');
    const gd = hostParts.slice(Math.max(0, hostParts.length - 2), hostParts.length).join('.');
    return gd;
  }

  (0, _helpers.registerContentScript)('antitracking', 'http*', (window, chrome, CLIQZ) => {
    const attrack = CLIQZ.app.modules.antitracking;
    if (!attrack.isEnabled || !attrack.state.cookieBlockingEnabled || !attrack.state.compatibilityList) {
      return;
    }
    // ghostery pause
    if (CLIQZ.app.modules.ghostery && (CLIQZ.app.modules.ghostery.state.paused || CLIQZ.app.modules.ghostery.state.whitelisted.indexOf(window.self.location.hostname) !== -1)) {
      return;
    }
    if (window.self !== window.top) {
      try {
        const refererHost = new URL(document.referrer).hostname;
        const parentGd = getGeneralDomain(refererHost);
        const selfGd = getGeneralDomain(window.self.location.hostname);
        if (selfGd === parentGd || isNotHtml(window) || attrack.state.compatibilityList[selfGd] && attrack.state.compatibilityList[selfGd].indexOf(parentGd) !== -1) {
          return;
        }
      } catch (e) {
        // if referer is not a url, assume third-party
      }
      insertCookieOverride(window.document);
    }
  });
});
$__System.registerDynamic('10', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * This helper class will contain the form we assume is related to the voucher
   * basically the { input, button } + some handy functions
   */
  class CouponForm {
    constructor(_ref) {
      let input = _ref.input,
          button = _ref.button,
          onClick = _ref.onClick;

      this._clickCb = event => {
        if (!event || event.type !== 'click') {
          return;
        }
        // now we perform the real callback
        const couponCode = this.input ? this.input.value : '';
        if (this.onClick) {
          this.onClick(couponCode);
        }
      };

      this.input = input;
      this.button = button;
      this.onClick = onClick;

      if (this.button) {
        this.button.addEventListener('click', this._clickCb);
      }
    }

    unload() {
      if (this.button) {
        this.button.removeEventListener('click', this._clickCb);
      }
      this.button = null;
      this.input = null;
      this.onClick = null;
      this._clickCb = null;
    }

    fillCode(code) {
      if (this.input && this.input.value.length === 0 && code) {
        this.input.value = code;
      }
    }

  }
  exports.default = CouponForm;
});
$__System.registerDynamic('11', ['10', '12'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _form = $__require('10');

  var _form2 = _interopRequireDefault(_form);

  var _utils = $__require('12');

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /**
   * This class will find the form and listen for any webpage modification to get the
   * forms we think are associated to the vouchers and perform the associated
   * actions.
   */
  /**
   * Module containing the code that will be injected on the web page to identify the
   * coupon fields (textbox + button).
   * General algorithm logic:
   *  - for every T (target = all "form" elements, also the ones detected on mutations)
   *    - check if we have a input field that matches one of the list.
   *    - check if we have a button field in the same form
   *  - pick the ones that match the conditions and assume it is the voucher.
   *  - listen for click events
   */

  class CouponFormObserver {
    constructor(_ref) {
      let window = _ref.window,
          onClick = _ref.onClick,
          offerInfo = _ref.offerInfo,
          onFindCouponApplication = _ref.onFindCouponApplication;

      this.offerInfo = offerInfo;
      this.couponValue = '';
      this.onClick = onClick;
      this.onFindCouponApplication = onFindCouponApplication;
      this.coupon = null;
      this._onMutations = this._onMutations.bind(this);
      this._onClick = this._onClick.bind(this);

      this.mutationObserver = new window.MutationObserver(this._onMutations);
      this.mutationObserver.observe(window.document, { childList: true, subtree: true });
    }

    _onClick(couponValue) {
      this.couponValue = couponValue;
      this.onClick(couponValue);
    }

    unload() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
      if (this.coupon) {
        this.coupon.unload();
      }
      this.coupon = null;
      this.mutationObserver = null;
      this.offerInfo = null;
      this.onClick = null;
      this.onFindCouponApplication = null;
      this._onMutations = null;
    }

    _onMutations(mutations) {
      // TODO: improve here the way we can filter mutations.
      // - probably we can check if the current mutation is the form itself (if we have
      // one) then we just check that one, otherwise we check all the full mutations
      if (this.offerInfo && this.offerInfo.autoFillField) {
        const forms = new Set(mutations.map(m => m.target).filter(t => t && t.tagName && t.tagName.toLowerCase() === 'form'));
        this.processForms([...forms]);
      }
      [...mutations].forEach(m => [...m.addedNodes].forEach(node => this.seekForCouponApplication(node, true)));
    }

    seekForCouponApplication(node) {
      let onMutation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      const code = this.offerInfo && this.offerInfo.code;
      if (!code) {
        return;
      }
      if (onMutation && code !== this.couponValue) {
        return;
      }
      const result = (0, _utils.findCouponApplication)(node, code, { strategy: onMutation ? 'full' : 'code' });
      this.onFindCouponApplication(result);
    }

    processForms(targets) {
      var _getCouponsForm = (0, _utils.getCouponsForm)(targets);

      const input = _getCouponsForm.input,
            button = _getCouponsForm.button,
            ok = _getCouponsForm.ok;

      if (!ok) {
        return;
      }

      if (this.offerInfo && this.offerInfo.autoFillField) {
        const tmp = new _form2.default({ input, button, onClick: this._onClick });
        if (this.coupon) {
          this.coupon.unload();
        }
        this.coupon = tmp;
      }
    }
  }
  exports.default = CouponFormObserver;
});
$__System.registerDynamic("12", [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /* eslint-disable import/prefer-default-export */

  // the keywords we want to check to identify for input fields
  const couponKeyWords = ['voucher', 'discount', 'coupon', 'rabatt', 'gutschein', 'promo'];
  const buyButtonKeyWords = ['buy', 'kaufen', 'bestellen', 'order'];

  const COUPON_APPLICATION_KEYWORDS = ['code', 'gutschein', 'rabatt', 'rabattcode', 'coupon', 'discount'];
  /**
   * this method will retrieve all the potential fields that we thing that are for
   * inserting coupon codes.
   */
  function _getInputFieldsFromTarget(target) {
    const inputFileds = target.querySelectorAll('input');
    const includes = (str, substr) => str && str.toLowerCase().includes(substr);
    return [...inputFileds].filter(x => x.type !== 'hidden' && x.type !== 'password' && couponKeyWords.some(key => includes(x.name, key) || includes(x.id, key)));
  }

  function _getButtonFieldsFromTarget(target) {
    // for some cases we have buttons, for some others we have
    // <input class="btn" data-action="save" value="Einlösen" type="submit">
    const buttons = [...target.querySelectorAll('button')] || [];
    const inputs = ([...target.querySelectorAll('input')] || []).filter(t => t && t.type && t.type.toLowerCase() === 'submit');
    return buttons.concat(inputs);
  }

  function _predicate(form) {
    // the way it work, probably we need to improve this is:
    // for each form:
    //  - get input fields that seems to be associated to voucher
    //  - get associated buttons (submit)
    //  - if none or more than one input field => discard?
    //  - if none button or more than one => discard result completely
    const inputFields = _getInputFieldsFromTarget(form);
    if (inputFields.length !== 1) {
      // continue with the next one, note that actually here we may want
      // to choose the most probable one instead of none, for now none is fine
      return { ok: false, input: null, button: null };
    }
    const buttons = _getButtonFieldsFromTarget(form);
    if (buttons.length !== 1) {
      return { ok: false, input: null, button: null };
    }
    return { ok: true, input: inputFields[0], button: buttons[0] };
  }

  /**
   * Will get the list of buttons, inputFields targets from a list of forms we see
   * on the page and filtering those ones that we consider they are to an .
   */
  function getCouponsForm(forms) {
    const result = forms.reduce((acc, form) => {
      if (!form) {
        return acc;
      }
      if (acc.ok) {
        return acc;
      }
      return _predicate(form);
    }, { ok: false, input: null, button: null });

    return result;
  }

  function _findResultOfCouponApplication(classList) {
    const matcher = keys => cls => keys.some(k => cls.toLowerCase().indexOf(k) !== -1);
    const isError = classList.some(matcher(['error']));
    if (isError) {
      return [true, 'error'];
    }
    const isSuccess = classList.some(matcher(['success', 'voucher']));
    if (isSuccess) {
      return [true, 'success'];
    }
    return [false, 'notfound'];
  }

  function _tryGuessResultCouponApplication(domNode) {
    const maxDepth = 5;
    let depth = 0;
    let node = domNode;
    while (node && depth < maxDepth) {
      const classList = node.classList || [];

      var _findResultOfCouponAp = _findResultOfCouponApplication([...classList]),
          _findResultOfCouponAp2 = _slicedToArray(_findResultOfCouponAp, 2);

      const ok = _findResultOfCouponAp2[0],
            result = _findResultOfCouponAp2[1];

      if (ok) {
        return result;
      }
      node = node.parentNode;
      depth += 1;
    }
    return 'notfound';
  }

  function _isCouponApplicationNode(node, keywords) {
    if (node.nodeType !== node.TEXT_NODE) {
      return [false, null];
    }
    const areLookingForCouponCode = keywords.length === 1;
    const content = areLookingForCouponCode ? node.textContent : node.textContent.toLowerCase();
    return keywords.some(value => content.indexOf(value) !== -1) ? [true, node] : [false, null];
  }

  function _findCouponApplicationNode(node, acc, keywords) {
    if (acc.done) {
      return;
    }

    var _isCouponApplicationN = _isCouponApplicationNode(node, keywords),
        _isCouponApplicationN2 = _slicedToArray(_isCouponApplicationN, 2);

    const ok = _isCouponApplicationN2[0],
          couponApplicationNode = _isCouponApplicationN2[1];

    if (ok) {
      acc.done = true;
      acc.node = couponApplicationNode;
      return;
    }
    if (node.hasChildNodes() && node.tagName !== 'IFRAME') {
      node.childNodes.forEach(x => _findCouponApplicationNode(x, acc, keywords));
    }
  }

  function _findCouponApplication(node, keywords) {
    const acc = {};
    _findCouponApplicationNode(node, acc, keywords);
    if (!acc.done) {
      return '';
    }
    const result = _tryGuessResultCouponApplication(acc.node);
    return result;
  }

  function findCouponApplication(node, code, _ref) {
    var _ref$strategy = _ref.strategy;
    let strategy = _ref$strategy === undefined ? 'full' : _ref$strategy;

    const result = _findCouponApplication(node, [code]);
    if (strategy === 'code') {
      return result;
    }
    return result || _findCouponApplication(node, COUPON_APPLICATION_KEYWORDS);
  }

  function hasValidText(element) {
    let text = element.value || element.textContent;
    if (text.length === 0 && element.parentElement) {
      // Try to get text from parent element,
      // This happens mostly with Amazon
      text = element.parentElement.value || element.parentElement.textContent;
    }
    if (!text) {
      return false;
    }
    text = text.trim().toLowerCase();
    // This is arbitrary, but the buy button should not be this long
    if (text.length > 50) {
      return false;
    }
    let words = text.split(/\s+/);
    words = words.filter(word => buyButtonKeyWords.indexOf(word) > -1);
    return words.length > 0;
  }

  const getPurchaseButtons = window => {
    const document = window.document;
    const candidates = [];
    const selector = ['button', 'input[type="button"]', 'input[type="submit"]', 'a[href*="checkout"]'].join(', ');
    document.querySelectorAll(selector).forEach(e => candidates.push(e));
    return candidates.filter(e => !e.hidden).filter(e => e.offsetHeight > 20).filter(hasValidText);
  };

  exports.getCouponsForm = getCouponsForm;
  exports.findCouponApplication = findCouponApplication;
  exports.getPurchaseButtons = getPurchaseButtons;
});
$__System.registerDynamic('13', ['d', '11', '12'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _helpers = $__require('d');

  var _observer = $__require('11');

  var _observer2 = _interopRequireDefault(_observer);

  var _utils = $__require('12');

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function couponsHandlingScript(window, chrome, CLIQZ) {
    if (window.parent !== window) {
      return;
    }

    const backgroundAction = function backgroundAction(action) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      CLIQZ.app.modules['offers-v2'].action(action, ...args);
    };

    const url = window.location.href;
    let couponObserver = null;

    const isForThisScriptMessage = msg => msg && msg.response && msg.response.module === 'offers-v2' && msg.response.url === url;

    const activateCouponObserver = offerInfo => {
      if (!couponObserver) {
        couponObserver = new _observer2.default({
          offerInfo,
          window,
          onClick: couponValue => {
            backgroundAction('couponFormUsed', { offerInfo, couponValue, url });
          },
          onFindCouponApplication: value => {
            const m = {
              success: 'coupon_autofill_field_success_use',
              error: 'coupon_autofill_field_error_use',
              notfound: 'coupon_autofill_field_application_not_found'
            };
            const couponValue = m[value];
            if (!couponValue) {
              return;
            }
            backgroundAction('couponFormUsed', { offerInfo, couponValue, url });
          }
        });
      }
      couponObserver.processForms([...window.document.querySelectorAll('form')]);
      couponObserver.seekForCouponApplication(window.document.body);
    };

    const deactivateCouponObserver = () => {
      if (couponObserver) {
        couponObserver.unload();
        couponObserver = null;
      }
    };

    /**
     * Receive messages from core and proxy them to the copunHandler
     */
    const onMessage = msg => {
      // check if if it is a message for us
      if (!isForThisScriptMessage(msg)) {
        return;
      }

      if (msg.response.activate) {
        activateCouponObserver(msg.response.offerInfo);
      } else {
        deactivateCouponObserver();
      }
    };

    const onBuyButtonClicked = () => {
      backgroundAction('onContentSignal', { action: 'purchase', state: 'attempted' });
    };

    const onLoad = () => {
      // after we load we check if we should inject (activate) the script here
      backgroundAction('activateCouponDetectionOnUrl', url);

      // Check if there is a purchase button
      // TODO: This does not work with dynamic page content yet
      const buyButtons = (0, _utils.getPurchaseButtons)(window);
      if (buyButtons.length > 0) {
        buyButtons.forEach(button => {
          button.addEventListener('click', onBuyButtonClicked);
        });
      }
    };

    const onUnload = () => {
      if (couponObserver) {
        couponObserver.unload();
        couponObserver = null;
      }
      chrome.runtime.onMessage.removeListener(onMessage);
      window.removeEventListener('unload', onUnload);
      window.removeEventListener('load', onLoad);
    };

    window.addEventListener('load', onLoad);
    window.addEventListener('unload', onUnload);
    chrome.runtime.onMessage.addListener(onMessage);
  } /**
     * This content script will be activated on particular urls depending if we have an offer
     * that contains a unique coupon or not and we have the proper monitors (coupon monitor)
     * for the offer.
     * If we have then we will basically search for the form associated to the voucher and
     * listen whenever the button is clicked to retrieve the value of the coupon field.
     * As additional we can insert the value of the voucher directly on the field to
     * facilitate the user the work :).
     */

  (0, _helpers.registerContentScript)('offers-v2', 'http*', couponsHandlingScript);
});
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : 'function' === 'function' && true ? $__System.registerDynamic('14', [], false, function ($__require, $__exports, $__module) {
        if (typeof factory === 'function') {
            return factory.call($__exports, $__exports);
        } else {
            return factory;
        }
    }) : factory(global.adblocker = {});
})(this, function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
      See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o),
            r,
            ar = [],
            e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        } catch (error) {
            e = { error: error };
        } finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
                if (e) throw e.error;
            }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function injectCSSRule(rule, doc) {
        var css = doc.createElement('style');
        css.type = 'text/css';
        css.id = 'cliqz-adblokcer-css-rules';
        var parent = doc.head || doc.documentElement;
        parent.appendChild(css);
        css.appendChild(doc.createTextNode(rule));
    }
    function injectScript(s, doc) {
        var autoRemoveScript = "\n    try {\n      " + s + "\n    } catch (ex) { }\n\n    (function() {\n      var currentScript = document.currentScript;\n      var parent = currentScript && currentScript.parentNode;\n\n      if (parent) {\n        parent.removeChild(currentScript);\n      }\n    })();\n  ";
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.id = 'cliqz-adblocker-script';
        script.appendChild(doc.createTextNode(autoRemoveScript));
        var parent = doc.head || doc.documentElement;
        parent.appendChild(script);
    }
    function blockScript(filter, doc) {
        var filterRE = new RegExp(filter);
        doc.addEventListener('beforescriptexecute', function (ev) {
            var target = ev.target;
            if (target.textContent && filterRE.test(target.textContent)) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        });
    }
    function overrideUserAgent() {
        var script = function () {
            Object.defineProperty(navigator, 'userAgent', {
                get: function () {
                    return 'Mozilla/5.0 Gecko Firefox';
                }
            });
        };
        injectScript("(" + script.toString() + ")()", window.document);
    }
    var CosmeticInjection = function () {
        function CosmeticInjection(window, backgroundAction, useMutationObserver) {
            if (useMutationObserver === void 0) {
                useMutationObserver = true;
            }
            this.window = window;
            this.backgroundAction = backgroundAction;
            this.mutationObserver = null;
            this.injectedRules = new Set();
            this.injectedScripts = new Set();
            this.blockedScripts = new Set();
            this.observedNodes = new Set();
            this.backgroundAction('getCosmeticsForDomain');
            if (useMutationObserver) {
                this.onMutation([{ target: this.window.document.body }]);
                this.startObserving();
            }
        }
        CosmeticInjection.prototype.unload = function () {
            if (this.mutationObserver) {
                try {
                    this.mutationObserver.disconnect();
                } catch (e) {}
            }
        };
        CosmeticInjection.prototype.handleResponseFromBackground = function (_a) {
            var active = _a.active,
                scripts = _a.scripts,
                blockedScripts = _a.blockedScripts,
                styles = _a.styles;
            if (!active) {
                this.unload();
                return;
            }
            for (var i = 0; i < scripts.length; i += 1) {
                var script = scripts[i];
                if (!this.injectedScripts.has(script)) {
                    injectScript(script, this.window.document);
                    this.injectedScripts.add(script);
                }
            }
            for (var i = 0; i < blockedScripts.length; i += 1) {
                var script = blockedScripts[i];
                if (!this.blockedScripts.has(script)) {
                    blockScript(script, this.window.document);
                    this.blockedScripts.add(script);
                }
            }
            this.handleRules(styles);
        };
        CosmeticInjection.prototype.handleRules = function (rules) {
            var rulesToInject = [];
            for (var i = 0; i < rules.length; i += 1) {
                var rule = rules[i];
                if (!this.injectedRules.has(rule)) {
                    try {
                        if (!this.window.document.querySelector(rule)) {
                            continue;
                        }
                    } catch (e) {
                        continue;
                    }
                    this.injectedRules.add(rule);
                    rulesToInject.push(" :root " + rule);
                }
            }
            if (rulesToInject.length > 0) {
                injectCSSRule(rulesToInject.join(' ,') + " {display:none !important;}", this.window.document);
            }
        };
        CosmeticInjection.prototype.onMutation = function (mutations) {
            var _this = this;
            var targets = new Set(mutations.map(function (m) {
                return m.target;
            }).filter(function (t) {
                return t;
            }));
            if (targets.size > 100) {
                targets = new Set([this.window.document.body]);
            }
            if (targets.size === 0) {
                return;
            }
            var nodeInfo = new Set();
            targets.forEach(function (target) {
                var nodes = target.querySelectorAll('*');
                for (var i = 0; i < nodes.length; i += 1) {
                    var node = nodes[i];
                    if (node.hidden) {
                        continue;
                    }
                    if (node.id) {
                        var selector = "#" + node.id;
                        if (!_this.observedNodes.has(selector)) {
                            nodeInfo.add(selector);
                            _this.observedNodes.add(selector);
                        }
                    }
                    if (node.tagName) {
                        var selector = node.tagName;
                        if (!_this.observedNodes.has(selector)) {
                            nodeInfo.add(selector);
                            _this.observedNodes.add(selector);
                        }
                    }
                    if (node.className && node.className.split) {
                        node.className.split(' ').forEach(function (name) {
                            var selector = "." + name;
                            if (!_this.observedNodes.has(selector)) {
                                nodeInfo.add(selector);
                                _this.observedNodes.add(selector);
                            }
                        });
                    }
                }
            });
            if (nodeInfo.size > 0) {
                this.backgroundAction('getCosmeticsForNodes', [__spread(nodeInfo)]);
            }
        };
        CosmeticInjection.prototype.startObserving = function () {
            var _this = this;
            if (this.window.MutationObserver !== undefined) {
                this.mutationObserver = new this.window.MutationObserver(function (mutations) {
                    return _this.onMutation(mutations);
                });
                this.mutationObserver.observe(this.window.document, {
                    childList: true,
                    subtree: true
                });
            }
        };
        return CosmeticInjection;
    }();

    exports.CosmeticsInjection = CosmeticInjection;
    exports.overrideUserAgent = overrideUserAgent;

    Object.defineProperty(exports, '__esModule', { value: true });
});
$__System.registerDynamic('15', ['14'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _adblockerCosmetics = $__require('14');

  var adblockerCosmetics = _interopRequireWildcard(_adblockerCosmetics);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  exports.default = adblockerCosmetics;
});
$__System.registerDynamic('16', ['d', '15'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _helpers = $__require('d');

  var _adblockerCosmetics = $__require('15');

  var _adblockerCosmetics2 = _interopRequireDefault(_adblockerCosmetics);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  (0, _helpers.registerContentScript)('adblocker', 'http*', (window, chrome, CLIQZ) => {
    const url = window.location.href;
    if (!url) {
      return;
    }

    /**
     * Helper used to trigger action from the adblocker's background:
     * @param {string} action - name of the action found in the background.
     * @param {array} args - arguments to forward to the action.
     */
    let cosmeticsInjection;

    /* eslint no-use-before-define: 'off' */
    const backgroundAction = function backgroundAction(action) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      CLIQZ.app.modules.adblocker.action(action, ...args).then(response => cosmeticsInjection.handleResponseFromBackground(response));
    };

    const isMobile = window.navigator.userAgent.toLowerCase().indexOf('mobile') > -1;
    /**
     * This class is in charge of managing the adblocking in content script:
     * - Script injection.
     * - Script blocking.
     * - CSS injection.
     * - Observing mutations in the page.
     */
    cosmeticsInjection = new _adblockerCosmetics2.default.CosmeticsInjection(window, backgroundAction, !isMobile);

    // ------------------ //
    // Register listeners //
    // ------------------ //

    const onMessage = msg => {
      if (msg.module === 'adblocker') {
        const response = msg.args[0];
        if (msg.action === 'update') {
          // handle push message
          cosmeticsInjection.handleResponseFromBackground(response);
          if (response.moduleDisabled || response.active === false) {
            cosmeticsInjection.unload();
          }
        }
      }
    };

    const onUnload = () => {
      cosmeticsInjection.unload();
      window.removeEventListener('unload', onUnload);
      chrome.runtime.onMessage.removeListener(onMessage);
    };

    window.addEventListener('unload', onUnload);
    chrome.runtime.onMessage.addListener(onMessage);
  });
});
$__System.registerDynamic('17', ['d'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _helpers = $__require('d');

  // TODO: this has to be a resource:// url
  const WARNINGURL = 'chrome://cliqz/content/anti-phishing/phishing-warning.html?u='; /* eslint no-param-reassign: 'off' */

  (0, _helpers.registerContentScript)('anti-phishing', 'http*', (window, chrome) => {
    chrome.runtime.onMessage.addListener(msg => {
      if (msg.module !== 'anti-phishing' || msg.action !== 'block') {
        return;
      }

      var _msg$args$ = msg.args[0];
      const block = _msg$args$.block,
            type = _msg$args$.type;

      if (block && type === 'phishingURL') {
        window.location = WARNINGURL + encodeURIComponent(window.location);
      }
    });
  });
});
$__System.registerDynamic('18', ['d'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _helpers = $__require('d');

  const MAX_TOP_OFFSET = 250;
  const MODULE_NAME = 'myoffrz-helper';

  // To collect categories, two kinds of messages will be
  // sent from content scripts
  // 1. Asking collection (css) rules about a url (domain)
  // 2. Send back collected categories

  class CategoryHelper {
    constructor(window, backgroundModule) {
      this.window = window;
      this.document = window.document;
      this.backgroundModule = backgroundModule;
      this.categoriesRules = [];
      this.refetchUrl = null;
    }

    onBackgroundMsg(msg) {
      if (msg.module !== MODULE_NAME) {
        // There can be push messages from different modules
        return;
      }

      if (msg.action === 'rulesFromBackground') {
        const payload = msg.args[0];
        this.handleRules(payload);
      }
    }

    sendToBackground(_ref) {
      let categories = _ref.categories,
          titles = _ref.titles,
          links = _ref.links,
          productId = _ref.productId,
          prefix = _ref.prefix,
          price = _ref.price;

      if (categories.length > 0 || titles.length > 0 || links.length > 0 || this.refetchUrl) {
        this.backgroundModule.action('handleCategories', {
          categories,
          titles,
          linkIds: links,
          productId,
          fromContent: true,
          prefix,
          fetchUrl: this.refetchUrl,
          rules: this.categoriesRules,
          price
        });
      }
    }

    extractCategroyFromElement(e, shouldFetch, ignoreHidden) {
      if (!e) {
        return [];
      }
      const separator = new RegExp(`[${String.fromCharCode(8250)}|>|\n]`); // Something looks like a '>'
      const goBack = String.fromCharCode(8249); // Something looks like a '<'

      // the element should be somewhere in the top left part of the page
      if (!ignoreHidden && (e.hidden || e.offsetTop > MAX_TOP_OFFSET)) {
        return [];
      }

      // This is a hack to get Amazon / Ebay category levels
      // e.g. Electronics & Photo › Mobile Phones & Communication › Accessories
      const text = e.textContent.trim();
      // Filter the "go back to search term" (after serach within amazon)
      // we might need to refetch the page with
      if (text.indexOf(goBack) > -1) {
        if (shouldFetch && !this.refetchUrl) {
          this.refetchUrl = document.head.querySelector("link[rel='canonical']").getAttribute('href');
        }
        return [];
      }

      // extract the text
      let categroy = text.split(separator).map(part => part.trim()).filter(part => part !== '').join(' > ');
      if (categroy.indexOf('in') === 0) {
        categroy = categroy.slice(3);
      }
      return [categroy];
    }

    getCategories(selector, shouldFetch) {
      const elements = this.document.querySelectorAll(selector);
      let categories = [];
      elements.forEach(element => {
        categories = categories.concat(this.extractCategroyFromElement(element, shouldFetch, false));
      });
      categories = categories.reduce((acc, val) => acc.concat(val), []);
      return [...new Set(categories)];
    }

    getTitles(selector) {
      const titles = [];
      const elements = this.document.querySelectorAll(selector);
      elements.forEach(element => {
        titles.push(element.textContent.trim());
      });
      return titles;
    }

    getLinks(selector, regex) {
      const links = [];
      const elements = this.document.querySelectorAll(selector);
      elements.forEach(element => {
        const link = element.href;
        if (regex) {
          const match = new RegExp(regex).exec(link);
          if (match) {
            links.push(match[1]);
            return;
          }
        }
        links.push(link);
      });
      return links;
    }

    getPrice(selector) {
      const element = this.document.querySelector(selector);
      const price = element.textContent.trim().match(/[\d,.]+/g);
      if (price && price.length > 0) {
        // always use "." as decimal point
        const parts = price[0].split(/[,.]/);
        if (parts.length > 1 && parts[parts.length - 1].length === 2) {
          parts[parts.length - 1] = `.${parts[parts.length - 1]}`;
        }
        return parts.join('');
      }
      return null;
    }

    handleRules(_ref2) {
      let rules = _ref2.rules,
          productId = _ref2.productId,
          prefix = _ref2.prefix;

      /* eslint no-param-reassign: off */
      const _handleRules = () => {
        let categories = [];
        let titles = [];
        let links = [];
        let price = null;
        this.categoriesRules = rules.category;
        if (rules.category && rules.category.length > 0) {
          categories = rules.category.map(rule => this.getCategories(rule, rules.refetch));
          categories = categories.reduce((acc, val) => acc.concat(val), []);
          categories = [...new Set(categories)];
        }
        if (rules.title && rules.title.length > 0) {
          rules.title.forEach(rule => {
            titles = titles.concat(this.getTitles(rule));
          });
        }
        if (rules.link && rules.link.length > 0) {
          rules.link.forEach(rule => {
            links = links.concat(this.getLinks(rule, rules.linkIdRegex));
          });
        }
        if (rules.price && rules.price.length > 0) {
          rules.price.some(rule => {
            price = this.getPrice(rule);
            return !!price;
          });
        }
        // We simply send prefix and productId back as metadata
        this.sendToBackground({ categories, titles, links, productId, prefix, price });
      };
      if (rules) {
        if (rules.waitForLoad && this.document.readyState !== 'complete') {
          // The document is not fully loaded and the rules ask to wait
          // After some testing, most sites work well without wait for `load`
          this.window.addEventListener('load', () => {
            _handleRules();
          });
        } else {
          _handleRules();
        }
      }
    }
  }

  (0, _helpers.registerContentScript)(MODULE_NAME, 'http*', (window, chrome, CLIQZ) => {
    if (window.top === window) {
      // We need only top window (no iframes)
      const backgroundModule = CLIQZ.app.modules[MODULE_NAME];
      const categoryHelper = new CategoryHelper(window, backgroundModule);
      const callback = categoryHelper.onBackgroundMsg.bind(categoryHelper);
      chrome.runtime.onMessage.addListener(callback);

      const onUnload = () => {
        chrome.runtime.onMessage.removeListener(callback);
        window.removeEventListener('unload', onUnload);
      };

      window.addEventListener('unload', onUnload);
    }
  });
});
$__System.registerDynamic('19', ['1a'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.preShowActions = exports.onApplyActions = undefined;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  }; /* eslint-disable import/prefer-default-export */
  /* eslint object-curly-spacing: off */

  var _utils = $__require('1a');

  const onApplyActions = key => {
    const m = {
      'insert-coupon-form': function insertCouponForm(window) {
        let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        const result = (0, _utils.getCouponsForm)([...window.document.querySelectorAll('form')]);
        const ok = result.ok,
              input = result.input,
              button = result.button;

        if (!ok && !config.code) {
          return;
        }
        input.value = config.code;
        if (button.click) {
          button.click();
        }
      }
    };
    return m[key] || (() => {});
  };

  const preShowActions = key => {
    const m = {
      'try-to-find-coupon': (window, config) => {
        const result = (0, _utils.getCouponsForm)([...window.document.querySelectorAll('form')]);
        const ok = result.ok,
              input = result.input;

        const shouldPreventRender = ok && Boolean(input.value);
        const newConfig = _extends({}, config, { shouldHideButtons: !ok, shouldPreventRender });
        return { ok, config: newConfig };
      }
    };
    return m[key] || ((w, config) => ({ ok: true, config }));
  };

  exports.onApplyActions = onApplyActions;
  exports.preShowActions = preShowActions;
});
$__System.registerDynamic('1b', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* eslint-disable import/prefer-default-export */

  const pop = (CLIQZ, data) => CLIQZ.app.modules['popup-notification'].action('pop', data);
  const log = (CLIQZ, data) => CLIQZ.app.modules['popup-notification'].action('log', data);
  exports.pop = pop;
  exports.log = log;
});
$__System.registerDynamic("1c", [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.divertImages = divertImages;
  exports.getImageDiverterCallerFunc = getImageDiverterCallerFunc;
  // Continued from "../image-diverter.es"
  /**
   * The content scripts run in the context of the user's html page.
   * If such a script load images, then third-party privacy extensions
   * might categorize the images as trackers and blacklist Cliqz.
   *
   * If a content script needs an image, it should ask the background
   * context to load it.
   *
   * See also {{#crossLink "core.ImageDiverterBackground"}}{{/crossLink}}
   *
   * @class ImageDiverter
   * @static
   */

  /**
   * @method divertImages
   * @param {DOM_element} rootElement
   * @param {map_string,string} classToImage
   *   For each CSS class name to the corresponding background image url
   * @param {(string)=>Promise_string} contentReader
   *   Promise-wrapped version of `ImageDiverterBackground::readContentAsDataUrl`.
   *   Expected is a cross-context call from a content script to the
   *   background context.
   *   Content reader should return an empty string in case of an error,
   *   see the comment to `ImageDiverterBackground::handleReadContentAsDataUrl`.
   * @returns {Promise_arr}  Content readers in action
   */
  function divertImages(rootElement, classToImage, contentReader) {
    const asyncActions = [];
    if (!rootElement) {
      return asyncActions;
    }
    // If `rootElement` is an iframe, unwrap it
    const searchRoot = rootElement.contentDocument || rootElement.contentWindow && rootElement.contentWindow.document || rootElement;

    Object.entries(classToImage).forEach(_ref => {
      var _ref2 = _slicedToArray(_ref, 2);

      let className = _ref2[0],
          imageUrl = _ref2[1];

      const els = searchRoot.getElementsByClassName(className);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          const el = _step.value;

          const action = contentReader(imageUrl).then(dataUrl => {
            el.style.backgroundImage = dataUrl ? `url("${dataUrl}")` : '';
          }).catch(() => {/* can't do anything */});
          asyncActions.push(action); // eslint-disable-line no-loop-func
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
    return asyncActions;
  }

  /**
   * Helper for content scripts. Create a function, which will call
   * `readContentAsDataUrl` in the background context.
   *
   * @method getImageDiverterCallerFunc
   * @param {object} CLIQZ  Original parameter to the content script
   * @returns {(string)=>Promise_string}
   */
  function getImageDiverterCallerFunc(CLIQZ) {
    return contentUrl => CLIQZ.app.modules.core.action('readContentAsDataUrl', contentUrl);
  }
});
$__System.registerDynamic("1d", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "platform": "webextension",
    "brocfile": "Brocfile.node.js",
    "baseURL": "/cliqz/",
    "pack": "npm pack",
    "publish": "aws s3 cp browser-core-$PACKAGE_VERSION.tgz s3://cdncliqz/update/edge/ghostery/$BRANCH_NAME/$VERSION.${GIT_COMMIT:0:7}.tgz --acl public-read && aws s3 cp s3://cdncliqz/update/edge/ghostery/$BRANCH_NAME/$VERSION.${GIT_COMMIT:0:7}.tgz s3://cdncliqz/update/edge/ghostery/$BRANCH_NAME/latest.tgz --acl public-read",
    "sourceMaps": true,
    "format": "common",
    "settings": {
      "ANOLYSIS_BACKEND_URL": "https://anolysis.privacy.ghostery.net",
      "ANOLYSIS_STAGING_BACKEND_URL": "https://anolysis-staging.privacy.ghostery.net",
      "BACKGROUND_IMAGE_URL": "https://cdn.ghostery.net/brands-database/database/",
      "BW_URL": "https://antiphishing.ghostery.net/api/bwlist?md5=",
      "CAMPAIGN_SERVER": "https://fec.ghostery.net/message/",
      "CDN_BASEURL": "https://cdn.ghostery.net",
      "CDN_CONTENTSCRIPT_BASEURL": "https://cdn3.ghostery.net",
      "CLIQZ_SAVE_URL": "https://ghostery.net/q=",
      "CONFIG_PROVIDER": "https://api.ghostery.net/api/v1/config",
      "ENDPOINT_ANONPATTERNSURL": "https://cdn2.ghostery.com/human-web-chromium/patterns-anon.gz",
      "ENDPOINT_BLIND_SIGNER": "https://ghostery-sign.ghostery.com/sign",
      "ENDPOINT_CONFIGURL": "https://safe-browsing.ghostery.net/config",
      "ENDPOINT_HPNV2_COLLECTOR": "https://collector-hpn.ghostery.net",
      "ENDPOINT_HPNV2_CONFIG": "https://collector-hpn.ghostery.net/config",
      "ENDPOINT_HPNV2_JOIN": "https://collector-hpn.ghostery.net/join",
      "ENDPOINT_KEYS_PROVIDER": "https://ghostery-collector.ghostery.com/signerKey",
      "ENDPOINT_LOOKUP_TABLE_PROVIDER": "https://ghostery-collector.ghostery.com/v2/lookuptable",
      "ENDPOINT_PATTERNSURL": "https://cdn2.ghostery.com/human-web-chromium/patterns.gz",
      "ENDPOINT_SAFE_QUORUM_ENDPOINT": "https://safe-browsing-quorum.ghostery.com/",
      "ENDPOINT_SAFE_QUORUM_PROVIDER": "https://safe-browsing-quorum.ghostery.com/config",
      "ENDPOINT_SOURCE_MAP_PROVIDER": "https://ghostery-collector.ghostery.com/sourcemapjson",
      "ENDPOINT_USER_REG": "https://ghostery-sign.ghostery.com/register",
      "FEEDBACK": "https://ghostery.net/feedback/",
      "HB_NEWS": "hb-news.ghostery.net",
      "HOMPAGE_URL": "https://ghostery.net/",
      "INVENTORY_URL": "https://cdn.ghostery.net/browser-f/fun-demo/inventoryv2.txt.gz",
      "JOBS_URL": "https://ghostery.net/jobs/",
      "OFFERS_BE_BASE_URL": "https://offers-api.ghostery.net",
      "PRIVACY_SCORE_URL": "https://anti-tracking.ghostery.net/api/v1/score?",
      "RESULTS_PROVIDER": "https://api.ghostery.net/api/v2/results?nrh=1&q=",
      "RESULTS_PROVIDER_LOG": "https://api.ghostery.net/api/v1/logging?q=",
      "RESULTS_PROVIDER_PING": "https://api.ghostery.net/ping",
      "RICH_HEADER": "https://api.ghostery.net/api/v2/rich-header?path=/v2/map",
      "RICH_HEADER_PROXY_URL": "hb-news.ghostery.net",
      "ROTATED_TOP_NEWS": "rotated-top-news.ghostery.net",
      "SAFE_BROWSING": "https://safe-browsing.ghostery.net",
      "STATISTICS": "https://stats.ghostery.net",
      "SUGGESTIONS_URL": "https://ghostery.net/search?q=",
      "TELEMETRY_ENDPOINT": "https://safebrowsing-experiment.ghostery.net",
      "TRACKER_PROXY_PROXY_PEERS_DEFAULT": "https://p2p-signaling-proxypeer.ghostery.net/peers",
      "TRACKER_PROXY_PROXY_PEERS_EXIT_DEFAULT": "https://p2p-signaling-proxypeer.ghostery.net/exitNodes",
      "TRACKER_PROXY_PROXY_SIGNALING_DEFAULT": "wss://p2p-signaling-proxypeer.ghostery.net",
      "UNINSTALL": "https://ghostery.net/home/offboarding",
      "SUPPORT_URL": "https://ghostery.zendesk.com/hc/en-us",
      "TEAM_URL": "https://cliqz.com/team/",
      "TRIQZ_URL": "https://cliqz.com/tips",
      "PRIVACY_POLICY_URL": "https://www.ghostery.com/about-ghostery/privacy-statements/",
      "LOCATION_SHARING_URL": "https://cliqz.com/support/local-results",
      "MYOFFRZ_URL": "https://cliqz.com/myoffrz",
      "REPORT_SITE_URL": "https://cliqz.com/report-url",
      "channel": "CH80",
      "MSGCHANNEL": "web-extension",
      "KEY_DS_PUBKEY": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwXo4hXvboKHCggNJ0UNFvZQfDWi0jNcF1kBHthxilMu6LB/hFrSMQ+/FgTqVE36cCezWE0K1UcwmYGVsuqxcvql82RfCmYUVBroJ3UFG8qnetYfU5FOk43C555p5l5HzlF8QilcCUBCO4SCj9lEZ3/8FJboCupTqxEUq7nwUgaNZOiGKMdDUBZJO1tW4LSH4lj9IAZccEJ5HKVmJKopQ3hmzWgDqowxni4NQz+0DnsSfCGAupKaJDxjfajJosX5i674rgdHbZGtgHB3M9jhc6HFNPcmtUgLwgtUtRwMhSnya6q/O06euouNi1h0m5eRrWeMRlJSdUnelLSU8QNy7LQIDAQAB",
      "KEY_SECURE_LOGGER_PUBKEY": "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAh5HhcRAn6+6woXQXl/NtZ+fOooNglZct/HSpYuqkcmrPauHW7EuOSq5bvpBZRTDROjR/kUPomqVZIzqhdCFPA8BwXSCz7hAel2Q157vtBvh9sngMMLXb5Fgzef5N4EuKO8pL5KrS+I9tfZac41vFJSdpgAirZYhh+tdcQQ1z0Qv/Rw0zOXjfvddCz3gEv2gB9KsLMVnTS1J4YOOgfza2adg9Ebz1z99DiF4vtCwn0IUwH/3ToTBwJLbMnC3Ol43yBNk8rgK2mkgCi614vOSD3hnVmio+iW6+AUklM8VPl6l7hEK9cljJY+9UsMVmTrvaFbMPwS6AdZCXKTmNdaMJcy3zSOXu5zvzihoQLwAu9LM3l2eVk0Mw0K7JXOP20fc8BtzWCOLYVP32r4R0BNuhTtvGqjHNZHPJN5OwaxkLpn2dujL9uDWGjRiOItKMVq/nOqmNGghrbf8IOaKT7VQhqOU4cXRkB/uF1UjYETBavwUZAxx9Wd/cMcAGmKiDxighxxQ29jDufl+2WG065tmJz+zCxmgrPh6Zb3KFUxPTe6yksAhWJhmGShA9v20t84M5c6NpZXoUsFcVja6XxzHeSB8dWq9Uu5QcZ83Gz/ronwdEjT2OGTtBgOFeTDqLYUgphC1gcUEHOCnTNXRMQOXqGwBfZHp+Mq61QcMq2rNS7xECAwEAAQ==",
      "HPN_CHANNEL": "ghostery",
      "OFFERS_CHANNEL": "ghostery",
      "ATTRACK_TELEMETRY_PROVIDER": "hpn",
      "HW_CHANNEL": "ghostery",
      "ALLOWED_COUNTRY_CODES": ["de", "at", "ch", "es", "us", "fr", "nl", "gb", "it", "be", "se", "dk", "fi", "cz", "gr", "hu", "ro", "no", "ca", "au", "ru", "ua", "in", "pl", "jp", "br", "mx", "cn", "ar"],
      "antitrackingPlaceholder": "ghostery",
      "antitrackingHeader": "Ghostery-AntiTracking",
      "frameScriptWhitelist": []
    },
    "default_prefs": {
      "modules.human-web.enabled": true,
      "modules.offers-v2.enabled": true,
      "modules.message-center.enabled": false,
      "modules.antitracking.enabled": true,
      "modules.anti-phishing.enabled": false,
      "modules.adblocker.enabled": true,
      "offersLogsEnabled": true,
      "showConsoleLogs": false,
      "cliqz-adb": true,
      "cliqz-adb-abtest": true,
      "attrackBloomFilter": true,
      "humanWeb": true,
      "cliqz-anti-phishing": true,
      "cliqz-anti-phishing-enabled": true,
      "attrackRemoveQueryStringTracking": false,
      "attrackTelemetryMode": 1,
      "attrackDefaultAction": "placeholder",
      "sendAntiTrackingHeader": false,
      "telemetry": false,
      "attrackCookieTrustReferers": true
    },
    "bundles": ["core/content-script.bundle.js", "hpn/worker.bundle.js"],
    "modules": ["core", "message-center", "human-web", "hpn", "antitracking", "webrequest-pipeline", "static", "offers-v2", "adblocker", "anolysis", "anti-phishing", "myoffrz-helper", "popup-notification"],
    "system": {
      "map": {
        "BigInt": "node_modules/BigInt/src/BigInt.js"
      },
      "meta": {
        "BigInt": {
          "format": "cjs"
        }
      }
    },
    "subprojects": [],
    "environment": "production",
    "debugPages": false,
    "EXTENSION_VERSION": "7.31.2",
    "VERSION": "7.31.2",
    "instrumentFunctions": ""
  };
});
$__System.registerDynamic("1e", ["1d"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.popupStyles = exports.PARANJA_STYLES = exports.styleImages = exports.styles = undefined;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }(); /* eslint-disable import/prefer-default-export */

  var _config = $__require("1d");

  var _config2 = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function styles() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ghostery = _ref.ghostery;

    let ghostery = _ref$ghostery === undefined ? false : _ref$ghostery,
        logoClass = _ref.logo_class;
    var _ref$styles = _ref.styles;
    _ref$styles = _ref$styles === undefined ? {} : _ref$styles;
    let headlineColor = _ref$styles.headline_color;

    const offerLogoSize = ghostery ? '111px' : '20px';

    var _ref2 = ghostery ? ['#930194', '#920094', '#850587'] : ['#00AEF0', '#0078CA', '#0078CA'],
        _ref3 = _slicedToArray(_ref2, 3);

    const mainColor = _ref3[0],
          secondaryColor = _ref3[1],
          tertiaryColor = _ref3[2];

    const sizesByClass = { square: '30px', short: '55px', normal: '70px', long: '105px' };
    const logoSize = sizesByClass[logoClass] || '70px';
    return `
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #fff;
      z-index: 2147483646;
      text-align: center;
      border-radius: 5px;

      display: flex;
      flex-direction: column;
      font-family: "-mac-system", "-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .header {
      height: 45px;
      border-bottom: 1px solid #DEDEDE;
      background-color: #F2F2F2;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .header > .offer-logo {
      height: 100%;
      font-size: 16.5px;
      font-weight: 500;
      color: #363636;
      text-align: left;
      padding-left: ${offerLogoSize};
      margin-left: 16px;
      background-repeat: no-repeat;
      /* background-image */
      background-position: center;
    }

    .header > .btn-close {
      width: 14px;
      height: 14px;
      opacity: 0.6;
      cursor: pointer;
      padding-right: 22px;
      margin-top: -2px;
      background-repeat: no-repeat;
      /* background-image */
    }

    .header > .billet {
      display: block;
      min-height: 46px;
      width: 99%;
    }

    .sub-header > .billet {
      display: block;
      width: 100%;
    }

    .sub-header > .billet:last-child {
      display: block;
      width: 1px;
      padding-right: 32px;
    }

    .header > .btn-close:hover {
      opacity: 1;
    }

    .sub-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 12px;
    }

    .sub-header > .labels {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
      margin-left: 35px;
    }

    .sub-header > .labels > .exclusive{
      /* background-image */
    }

    .sub-header > .labels > .best_offer{
      /* background-image */
    }

    .sub-header > .labels > .offer_of_the_week{
      /* background-image */
    }

    .sub-header > .labels > .label {
      padding-left: 14px;
      color: #B2B2B2;
      font-family: 'Arial Narrow', 'Impact';
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 8.5px;
      font-weight: 400;
      background-size: 12px 10px;
      background-repeat: no-repeat;
      background-position: left center;
      margin-bottom: 2px;
    }

    .sub-header > .wrapper {
      display: inline-block;
      min-width: ${logoSize};
      height: 32px;
    }

    .sub-header > .wrapper > .logo {
      display: inline-block;
      background-color: transparent;
      padding: 0;
      min-width: 100%;
      min-height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      /* background-image */
    }


    .benefit {
      font-size: 32px;
      font-weight: 500;
      color: #494949;
      padding: 7px 0 9px 0;
      overflow: hidden;
    }

    .headline {
      padding: 0 30px;
      font-size: 19px;
      font-weight: 350;
      padding-bottom: 21px;
      color: ${headlineColor || 'black'};
    }

    .code-wrapper {
      background-color: #F2F2F2;
      border: 1px solid #DADADA;
      height: 32px;
      margin: 0 18px;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    .code-wrapper > .promo-code {
      border: none;
      color: transparent;
      text-shadow: 0 0 0 #000;
      font-size: 13px;
      background-color: transparent;
      font-weight: 600;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 16px;
      padding-right: 37%;
    }

    .code-wrapper > .copy-code {
      cursor: pointer;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      color: #687E90;
      white-space: nowrap;
      margin-right: 14px;
    }

    .code-wrapper > .copy-code:hover {
      color: ${mainColor};
    }

    .footer {
      background-color: #fff;
      border-radius: 0 0 5px 5px;
    }

    .footer > button {
      margin-top: 31px;
      margin-left: 5px;
      margin-right: 5px;
      padding: 12px 8px;
      letter-spacing: 0.5px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 150px;
      cursor: pointer;
      text-transform: uppercase;
      background-color: #fff;
    }

    .footer > button.btn-cancel:hover {
      color: ${secondaryColor};
      border-color: ${secondaryColor};
    }

    .footer > button.btn-apply {
      background-color: ${mainColor};
      border-color: ${mainColor};
      color: #fff;
    }

    .footer > button.btn-apply:hover {
      background-color: ${tertiaryColor};
      border-color: ${tertiaryColor};
    }

    .none {
      display: none;
    }

    .middle {
      background-color: #fff;
    }

    .footer-billet {
      padding-bottom: 20px;
    }`;
  }

  function styleImages() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$ghostery = _ref4.ghostery;

    let ghostery = _ref4$ghostery === undefined ? false : _ref4$ghostery,
        logoUrl = _ref4.logo_url;

    const rewardIconPath = ghostery ? 'ghostery-rewards-beta.svg' : 'offers-cc-icon.svg';
    const baseUrl = _config2.default.settings.CDN_CONTENTSCRIPT_BASEURL;
    return {
      'offer-logo': `${baseUrl}/extension/offers/popup_notification/${rewardIconPath}`,
      'btn-close': `${baseUrl}/extension/offers/popup_notification/close-icon.svg`,
      exclusive: `${baseUrl}/extension/offers/popup_notification/exclusive.svg`,
      best_offer: `${baseUrl}/extension/offers/popup_notification/best_offer.svg`,
      offer_of_the_week: `${baseUrl}/extension/offers/popup_notification/offer_of_the_week.svg`,
      logo: logoUrl.replace(_config2.default.settings.CDN_BASEURL, baseUrl)
    };
  }

  function popupStyles(_ref5) {
    var _ref5$shouldHideButto = _ref5.shouldHideButtons;
    let shouldHideButtons = _ref5$shouldHideButto === undefined ? false : _ref5$shouldHideButto;
    var _ref5$headline = _ref5.headline;
    let headline = _ref5$headline === undefined ? '' : _ref5$headline;

    const halfOfLine = 32;
    let containerHeight = headline.length > halfOfLine ? '360px' : '336px';
    if (shouldHideButtons) {
      containerHeight = '260px';
    }
    return {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
      'box-shadow': '0px 10px 24px -7px rgba(0, 0, 0, 0.75);',
      width: '450px',
      height: containerHeight,
      transition: 'all 200ms ease-in',
      opacity: '0',
      'z-index': 2147483647,
      'line-height': 1
    };
  }

  const PARANJA_STYLES = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    'background-color': 'rgba(0,0,0,0.5)',
    'z-index': 2147483645,
    transition: 'all 200ms ease-in',
    opacity: '0'
  };

  exports.styles = styles;
  exports.styleImages = styleImages;
  exports.PARANJA_STYLES = PARANJA_STYLES;
  exports.popupStyles = popupStyles;
});
$__System.registerDynamic('1f', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = escape;
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/.
   *
   * This file incorporates work covered by the following copyright and
   * permission notice:
   *
   *   The MIT License
   *
   *   Copyright JS Foundation and other contributors <https://js.foundation/>
   *
   *   Based on Underscore.js, copyright Jeremy Ashkenas,
   *   DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
   *
   *   This software consists of voluntary contributions made by many
   *   individuals. For exact contribution history, see the revision history
   *   available at https://github.com/lodash/lodash
   *
   *   The following license applies to all parts of this software except as
   *   documented below:
   *
   *   ====
   *
   *   Permission is hereby granted, free of charge, to any person obtaining
   *   a copy of this software and associated documentation files (the
   *   "Software"), to deal in the Software without restriction, including
   *   without limitation the rights to use, copy, modify, merge, publish,
   *   distribute, sublicense, and/or sell copies of the Software, and to
   *   permit persons to whom the Software is furnished to do so, subject to
   *   the following conditions:
   *
   *   The above copyright notice and this permission notice shall be
   *   included in all copies or substantial portions of the Software.
   *
   *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   *   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   *   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   *   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   *   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   *   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   *   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   *   ====
   *
   *   Copyright and related rights for sample code are waived via CC0. Sample
   *   code is defined as all source code displayed within the prose of the
   *   documentation.
   *
   *   CC0: http://creativecommons.org/publicdomain/zero/1.0/
   *
   *   ====
   *
   *   Files located in the node_modules and vendor directories are externally
   *   maintained libraries used by this software which have their own
   *   licenses; we recommend you read them, as their terms may differ from the
   *   terms above.
   */

  const htmlEscapes = {
    '&': '&amp',
    '<': '&lt',
    '>': '&gt',
    '"': '&quot',
    "'": '&#39'
  };

  const reUnescapedHtml = /[&<>"']/g;
  const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  function escape(string) {
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr]) : string;
  }
});
$__System.registerDynamic('20', ['1f'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getTemplate = undefined;

  var _escape = $__require('1f');

  var _escape2 = _interopRequireDefault(_escape);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _getLabelsTemplate(chrome) {
    let labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    const locale = key => chrome.i18n.getMessage(key);
    return labels.map(label => `
    <div class="label ${label}">${locale(`offers_${label}`)}</div>
  `).join('');
  } /* eslint-disable import/prefer-default-export */

  function getTemplate(chrome, _ref) {
    let ghostery = _ref.ghostery,
        logoText = _ref.logoText,
        benefit = _ref.benefit,
        headline = _ref.headline,
        code = _ref.code,
        labels = _ref.labels,
        shouldHideButtons = _ref.shouldHideButtons;

    return `
    <div class="content">
      <div class="header">
        <div class="offer-logo"></div>
        <div class="offer-logo-text">${logoText}</div>
        <div class="billet"></div>
        <div class="btn-close"></div>
      </div>
      <div class="sub-header">
        <div class="labels">${_getLabelsTemplate(chrome, ghostery ? [] : labels)} </div>
        <div class="billet"></div>
        <div class="wrapper">
          <div class="logo"></div>
        </div>
        <div class="billet"></div>
      </div>
      <div class="middle">
        <div class="benefit">${(0, _escape2.default)(benefit)}</div>
        <div class="headline">${(0, _escape2.default)(headline)}</div>
      </div>
      <div class="footer">
        <div class="code-wrapper">
          <input
            class="promo-code"
            value="${(0, _escape2.default)(code)}"
            readonly="readonly"
            type="text">
          <span class="copy-code">${chrome.i18n.getMessage('offers_hub_copy_btn')}</span>
        </div>
        <button class="btn-cancel ${shouldHideButtons ? 'none' : ''}">
          ${chrome.i18n.getMessage('popup_cancel_button')}
        </button>
        <button class="btn-apply ${shouldHideButtons ? 'none' : ''}">
          ${chrome.i18n.getMessage('popup_apply_code_button')}
        </button>
        <div class="footer-billet"></div>
      </div>
    </div>`;
  }

  exports.getTemplate = getTemplate;
});
$__System.registerDynamic('21', ['20', '1a'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  exports.default = subview;

  var _template = $__require('20');

  var _utils = $__require('1a');

  function subview(_ref) {
    let chrome = _ref.chrome,
        window = _ref.window,
        config = _ref.config,
        onCancel = _ref.onCancel,
        onApply = _ref.onApply,
        onCopyCode = _ref.onCopyCode;

    const container = (0, _utils.createElement)(window, { tag: 'div', className: 'container' });
    container.innerHTML = (0, _template.getTemplate)(chrome, _extends({}, config, {
      logoText: config.ghostery ? '&nbsp;' : 'MyOffrz'
    }));

    ['btn-close', 'btn-cancel'].forEach(cls => {
      container.getElementsByClassName(cls)[0].addEventListener('click', () => {
        onCancel(cls === 'btn-cancel' ? 'cancel' : 'x');
      });
    });

    container.getElementsByClassName('btn-apply')[0].addEventListener('click', () => {
      onApply();
    });

    container.getElementsByClassName('content')[0].addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    const codeCopied = chrome.i18n.getMessage('offers_code_copied');
    container.getElementsByClassName('copy-code')[0].addEventListener('click', function onClick() {
      const promo = container.getElementsByClassName('promo-code')[0];
      promo.select();
      const success = (0, _utils.copySelectedText)(window);
      if (success) {
        this.textContent = codeCopied;
        onCopyCode();
      }
    });

    return container;
  }
});
$__System.registerDynamic('22', ['1c', '1e', '21', '1a'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.render = undefined;

  var _imageDiverter = $__require('1c');

  var _styles = $__require('1e');

  var _subview = $__require('21');

  var _subview2 = _interopRequireDefault(_subview);

  var _utils = $__require('1a');

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /* eslint-disable import/prefer-default-export */
  const DEBUG = false;

  function render(_ref) {
    let chrome = _ref.chrome,
        window = _ref.window,
        _onApply = _ref.onApply,
        _onCancel = _ref.onCancel,
        onCopyCode = _ref.onCopyCode;
    var _ref$config = _ref.config;
    let config = _ref$config === undefined ? {} : _ref$config,
        readContentAsDataUrl = _ref.readContentAsDataUrl;

    const modalId = 'cliqz-offer-modal';
    if (window.document.getElementById(modalId)) {
      window.console.warn('an attempt to render popup twice');
      return;
    }

    const paranja = (0, _utils.createElement)(window, { tag: 'div' });
    paranja.id = modalId;
    Object.assign(paranja.style, _styles.PARANJA_STYLES);

    const head = window.document.head;
    const isShadow = head.createShadowRoot || head.attachShadow;

    let popup = null;
    let shadow = null;
    if (isShadow) {
      shadow = paranja.attachShadow({ mode: DEBUG ? 'open' : 'closed' });
      popup = (0, _utils.createElement)(window, { tag: 'div' });
    } else {
      popup = (0, _utils.createElement)(window, { tag: 'iframe', id: 'cliqz-offers-iframe' });
      popup.frameBorder = 0;
    }
    Object.assign(popup.style, (0, _styles.popupStyles)(config));

    const container = (0, _subview2.default)({
      chrome,
      window,
      config,
      onCancel: type => {
        paranja.remove();
        popup.remove();
        _onCancel(type);
      },
      onApply: () => {
        paranja.remove();
        popup.remove();
        _onApply();
      },
      onCopyCode
    });

    paranja.addEventListener('click', () => {
      _onCancel('outside');
      paranja.remove();
      popup.remove();
    });

    const style = (0, _utils.createElement)(window, { tag: 'style', textContent: (0, _styles.styles)(config) });
    window.setTimeout(() => {
      paranja.style.opacity = 1;
      popup.style.opacity = 1;
      if (isShadow) {
        popup.appendChild(container);
        shadow.appendChild(style);
        shadow.appendChild(popup);
      } else {
        popup.contentDocument.body.appendChild(container);
        popup.contentDocument.head.append(style);
      }
      (0, _imageDiverter.divertImages)(popup, (0, _styles.styleImages)(config), readContentAsDataUrl);
    }, 1500);
    window.document.body.appendChild(paranja);
    window.document.body.appendChild(isShadow ? shadow : popup);
  }

  exports.render = render;
});
$__System.registerDynamic('1a', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* eslint-disable import/prefer-default-export */

  const COUPON_KEYWORDS = ['voucher', 'discount', 'coupon', 'rabatt', 'gutschein', 'promo'];

  function createElement(window, _ref) {
    let tag = _ref.tag,
        className = _ref.className,
        textContent = _ref.textContent,
        id = _ref.id;

    const element = window.document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    if (textContent) {
      element.textContent = textContent;
    }
    if (id) {
      element.id = id;
    }
    return element;
  }

  function copySelectedText(window) {
    let copysuccess = false;
    try {
      copysuccess = window.document.execCommand('copy');
    } catch (err) {
      copysuccess = false;
    }
    return copysuccess;
  }

  function once(f) {
    let done = false;
    return function wrapper() {
      if (!done) {
        done = true;

        for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }

        f.apply(this, rest);
      }
    };
  }

  /**
   * this method will retrieve all the potential fields that we thing that are for
   * inserting coupon codes.
   */
  function _getInputFieldsFromTarget(target) {
    const inputFileds = target.querySelectorAll('input');
    const includes = (str, substr) => str && str.toLowerCase().includes(substr);
    return [...inputFileds].filter(x => x.type !== 'hidden' && x.type !== 'password' && COUPON_KEYWORDS.some(key => includes(x.name, key) || includes(x.id, key)));
  }

  function _getButtonFieldsFromTarget(target) {
    // for some cases we have buttons, for some others we have
    // <input class="btn" data-action="save" value="Einlösen" type="submit">
    const buttons = [...target.querySelectorAll('button')] || [];
    const inputs = ([...target.querySelectorAll('input')] || []).filter(t => t && t.type && t.type.toLowerCase() === 'submit');
    return buttons.concat(inputs);
  }

  function _predicate(form) {
    // the way it work, probably we need to improve this is:
    // for each form:
    //  - get input fields that seems to be associated to voucher
    //  - get associated buttons (submit)
    //  - if none or more than one input field => discard?
    //  - if none button or more than two => discard result completely
    const inputFields = _getInputFieldsFromTarget(form);
    if (inputFields.length !== 1) {
      // continue with the next one, note that actually here we may want
      // to choose the most probable one instead of none, for now none is fine
      return { ok: false, input: null, button: null };
    }
    const buttons = _getButtonFieldsFromTarget(form);
    if (![1, 2].includes(buttons.length)) {
      return { ok: false, input: null, button: null };
    }
    return { ok: true, input: inputFields[0], button: buttons[0] };
  }

  /**
   * __copied__ from offers-v2 module
   *
   * Will get the list of buttons, inputFields targets from a list of forms we see
   * on the page and filtering those ones that we consider they are to an .
   */
  function getCouponsForm(forms) {
    const result = forms.reduce((acc, form) => {
      if (!form) {
        return acc;
      }
      if (acc.ok) {
        return acc;
      }
      return _predicate(form);
    }, { ok: false, input: null, button: null });

    return result;
  }

  exports.once = once;
  exports.createElement = createElement;
  exports.copySelectedText = copySelectedText;
  exports.getCouponsForm = getCouponsForm;
});
$__System.registerDynamic('23', ['d', '1c', '19', '1b', '22', '1a'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  }; /* eslint object-curly-spacing: off */

  var _helpers = $__require('d');

  var _imageDiverter = $__require('1c');

  var _processing = $__require('19');

  var _transport = $__require('1b');

  var _view = $__require('22');

  var _utils = $__require('1a');

  const renderPopup = (window, chrome, CLIQZ, renderOnce) => msg => {
    const action = msg.action,
          module = msg.module;
    var _msg$target = msg.target;
    const target = _msg$target === undefined ? 'nobody' : _msg$target;
    var _msg$data = msg.data;
    const data = _msg$data === undefined ? {} : _msg$data,
          url = msg.url;

    const href = window.location.href;
    if (url !== href || module !== 'popup-notification' || action !== 'push') {
      return;
    }

    var _data$config = data.config;
    const config = _data$config === undefined ? {} : _data$config;
    var _data$onApply = data.onApply;

    const _onApply = _data$onApply === undefined ? '' : _data$onApply;

    var _data$preShow = data.preShow;
    const preShow = _data$preShow === undefined ? '' : _data$preShow,
          back = data.back;

    var _preShowActions = (0, _processing.preShowActions)(preShow)(window, config);

    const ok = _preShowActions.ok,
          newConfig = _preShowActions.config;

    const info = { back, url: href };
    (0, _transport.log)(CLIQZ, { target, data: _extends({}, info, { type: 'pre-show', ok }) });
    if (newConfig.shouldPreventRender) {
      return;
    }

    renderOnce({
      chrome,
      window,
      onApply: () => {
        (0, _processing.onApplyActions)(_onApply)(window, config);
        (0, _transport.pop)(CLIQZ, { target, data: _extends({}, info, { ok: true }) });
      },
      onCancel: type => (0, _transport.pop)(CLIQZ, { target, data: _extends({}, info, { ok: false, type }) }),
      onCopyCode: () => (0, _transport.log)(CLIQZ, { target, data: _extends({}, info, { type: 'copy-code', ok: true }) }),
      config: newConfig,
      readContentAsDataUrl: (0, _imageDiverter.getImageDiverterCallerFunc)(CLIQZ)
    });
    (0, _transport.log)(CLIQZ, { target, data: _extends({}, info, { type: 'show', ok: true }) });
  };

  (0, _helpers.registerContentScript)('popup-notification', 'http*', (window, chrome, CLIQZ) => {
    const renderOnce = (0, _utils.once)(_view.render);
    const onMessage = renderPopup(window, chrome, CLIQZ, renderOnce);
    if (window.top === window) {
      window.addEventListener('DOMContentLoaded', () => {
        chrome.runtime.onMessage.addListener(onMessage);
      });
      window.addEventListener('unload', () => {
        chrome.runtime.onMessage.removeListener(onMessage);
      });
    }
  });
});
$__System.registerDynamic('24', ['c', 'f', '13', '16', '17', '18', '23'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  $__require('c');

  $__require('f');

  $__require('13');

  $__require('16');

  $__require('17');

  $__require('18');

  $__require('23');
});
$__System.registerDynamic('25', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = globToRegexp;
  /* eslint-disable */
  /*
   Copyright (c) 2013, Nick Fitzgerald
  
    All rights reserved.
  
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
        Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  
        Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  // https://developer.chrome.com/extensions/content_scripts#match-patterns-globs
  // source: https://github.com/fitzgen/glob-to-regexp
  function globToRegexp(glob, opts) {
    if (typeof glob !== 'string') {
      throw new TypeError('Expected a string');
    }

    var str = String(glob);

    // The regexp we are building, as a string.
    var reStr = "";

    // Whether we are matching so called "extended" globs (like bash) and should
    // support single character matching, matching ranges of characters, group
    // matching, etc.
    var extended = opts ? !!opts.extended : false;

    // When globstar is _false_ (default), '/foo/*' is translated a regexp like
    // '^\/foo\/.*$' which will match any string beginning with '/foo/'
    // When globstar is _true_, '/foo/*' is translated to regexp like
    // '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
    // which does not have a '/' to the right of it.
    // E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
    // these will not '/foo/bar/baz', '/foo/bar/baz.txt'
    // Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
    // globstar is _false_
    var globstar = opts ? !!opts.globstar : false;

    // If we are doing extended matching, this boolean is true when we are inside
    // a group (eg {*.html,*.js}), and false otherwise.
    var inGroup = false;

    // RegExp flags (eg "i" ) to pass in to RegExp constructor.
    var flags = opts && typeof opts.flags === "string" ? opts.flags : "";

    var c;
    for (var i = 0, len = str.length; i < len; i++) {
      c = str[i];

      switch (c) {
        case "\\":
        case "/":
        case "$":
        case "^":
        case "+":
        case ".":
        case "(":
        case ")":
        case "=":
        case "!":
        case "|":
          reStr += "\\" + c;
          break;

        case "?":
          if (extended) {
            reStr += ".";
            break;
          }

        case "[":
        case "]":
          if (extended) {
            reStr += c;
            break;
          }

        case "{":
          if (extended) {
            inGroup = true;
            reStr += "(";
            break;
          }

        case "}":
          if (extended) {
            inGroup = false;
            reStr += ")";
            break;
          }

        case ",":
          if (inGroup) {
            reStr += "|";
            break;
          }
          reStr += "\\" + c;
          break;

        case "*":
          // Move over all consecutive "*"'s.
          // Also store the previous and next characters
          var prevChar = str[i - 1];
          var starCount = 1;
          while (str[i + 1] === "*") {
            starCount++;
            i++;
          }
          var nextChar = str[i + 1];

          if (!globstar) {
            // globstar is disabled, so treat any number of "*" as one
            reStr += ".*";
          } else {
            // globstar is enabled, so determine if this is a globstar segment
            var isGlobstar = starCount > 1 // multiple "*"'s
            && (prevChar === "/" || prevChar === undefined) // from the start of the segment
            && (nextChar === "/" || nextChar === undefined); // to the end of the segment

            if (isGlobstar) {
              // it's a globstar, so match zero or more path segments
              reStr += "((?:[^/]*(?:\/|$))*)";
              i++; // move over the "/"
            } else {
              // it's not a globstar, so only match one path segment
              reStr += "([^/]*)";
            }
          }
          break;

        default:
          reStr += c;
      }
    }

    // When regexp 'g' flag is specified don't
    // constrain the regular expression with ^ & $
    if (!flags || !~flags.indexOf('g')) {
      reStr = "^" + reStr + "$";
    }

    return new RegExp(reStr, flags);
  };
  /* eslint-enable */
});
$__System.registerDynamic('d', ['25'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.registerContentScript = registerContentScript;
  exports.runContentScripts = runContentScripts;
  exports.isTopWindow = isTopWindow;

  var _glob = $__require('25');

  var _glob2 = _interopRequireDefault(_glob);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  const CONTENT_SCRIPTS = {};

  function registerContentScript(moduleName, urlPattern, script) {
    CONTENT_SCRIPTS[urlPattern] = CONTENT_SCRIPTS[urlPattern] || [];
    CONTENT_SCRIPTS[urlPattern].push({ moduleName, contentScript: script });
  }

  function runContentScripts(window, chrome, CLIQZ) {
    const currentUrl = window.location.href;
    const matchingPatterns = Object.keys(CONTENT_SCRIPTS).filter(pattern => {
      const regexp = (0, _glob2.default)(pattern);
      return regexp.test(currentUrl);
    });
    matchingPatterns.forEach(pattern => {
      CONTENT_SCRIPTS[pattern].filter(_ref => {
        let moduleName = _ref.moduleName;
        return (CLIQZ.app.modules[moduleName] || {}).isEnabled;
      }).forEach(_ref2 => {
        let contentScript = _ref2.contentScript;

        try {
          contentScript(window, chrome, CLIQZ);
        } catch (e) {
          window.console.error(`CLIQZ content-script failed: ${e} ${e.stack}`);
        }
      });
    });
  }

  function isTopWindow(window) {
    return window.self === window.top;
  }
});
$__System.registerDynamic("e", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.throttle = throttle;
  exports.nextTick = nextTick;
  function throttle(window, fn, threshhold) {
    let last;
    let timer;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      const now = Date.now();
      if (last && now < last + threshhold) {
        // reset timeout
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          last = now;
          fn(...args);
        }, threshhold);
      } else {
        last = now;
        fn(...args);
      }
    };
  }

  function nextTick(fn) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return Promise.resolve().then(() => fn(...args));
  }
});
$__System.registerDynamic('26', ['27'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = setTimeoutInterval;
  exports.setTimeoutIntervalInstant = setTimeoutIntervalInstant;

  var _timers = $__require('27');

  var timers = _interopRequireWildcard(_timers);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);var value = info.value;
          } catch (error) {
            reject(error);return;
          }if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }return step("next");
      });
    };
  }

  /**
   * setInterval implementation using setTimeout as base method. This helper was
   * created with the intention of solving the multiple calls that can happen
   * using the setInterval function (if computer goes to sleep for example).
   *
   * To create an interval:
   * const timer = setTimeoutInterval(() => console.log('x'), 1000);
   *
   * To stop it:
   * timer.stop();
   *
   */
  function setTimeoutIntervalImpl(f, timeoutMS, args, instantStart) {
    let enabled = true;
    let timeout = null;

    const runTimeout = (() => {
      var _ref = _asyncToGenerator(function* () {
        if (enabled) {
          // Call `f` and make sure we wait for it to terminate before we trigger
          // the next timeout (even if the function is async).
          try {
            yield f(...args);
          } catch (ex) {/* Ignore */}
        }

        if (enabled) {
          timeout = timers.setTimeout(runTimeout, timeoutMS);
        }
      });

      return function runTimeout() {
        return _ref.apply(this, arguments);
      };
    })();

    const stop = () => {
      enabled = false;
      timers.clearTimeout(timeout);
    };

    // Start running
    timeout = timers.setTimeout(runTimeout, instantStart ? 0 : timeoutMS);

    return {
      stop
    };
  }

  function setTimeoutInterval(f, timeoutMS) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return setTimeoutIntervalImpl(f, timeoutMS, args, false);
  }

  function setTimeoutIntervalInstant(f, timeoutMS) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return setTimeoutIntervalImpl(f, timeoutMS, args, true);
  }
});
$__System.registerDynamic('27', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const _setTimeout = function _setTimeout() {
    return (typeof setTimeout === 'undefined' ? window.setTimeout.bind(window) : setTimeout)(...arguments);
  };
  const _setInterval = function _setInterval() {
    return (typeof setInterval === 'undefined' ? window.setInterval.bind(window) : setInterval)(...arguments);
  };
  const _clearTimeout = function _clearTimeout() {
    return (typeof clearTimeout === 'undefined' ? window.clearTimeout.bind(window) : clearTimeout)(...arguments);
  };
  const _clearInterval = function _clearInterval() {
    return (typeof clearInterval === 'undefined' ? window.clearInterval.bind(window) : clearInterval)(...arguments);
  };

  exports.setTimeout = _setTimeout;
  exports.setInterval = _setInterval;
  exports.clearTimeout = _clearTimeout;
  exports.clearInterval = _clearInterval;
});
$__System.registerDynamic('28', ['26', '27'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.waitFor = waitFor;
  exports.wait = wait;

  var _timeout = $__require('26');

  var _timers = $__require('27');

  var timers = _interopRequireWildcard(_timers);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);var value = info.value;
          } catch (error) {
            reject(error);return;
          }if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }return step("next");
      });
    };
  }

  function waitForImpl(fn, timeout) {
    let error;
    let resolve;
    let reject;

    let timeoutId;
    let interval;

    // Clean-up resources
    const stop = () => {
      timers.clearTimeout(timeoutId);
      interval.stop();
    };

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const check = (() => {
      var _ref = _asyncToGenerator(function* () {
        try {
          const result = yield fn();
          // In case of truthy result, we stop
          if (result) {
            stop();
            resolve(result);
            return;
          }
        } catch (ex) {
          error = ex;
        }
      });

      return function check() {
        return _ref.apply(this, arguments);
      };
    })();

    // Start check at regular interval until one of the following conditions is met:
    // * `timeout` ms elapsed
    // * `fn` eventually results into a truthy values
    interval = (0, _timeout.setTimeoutIntervalInstant)(check, 50);

    // Reject after `timeout` ms
    timeoutId = timers.setTimeout(() => {
      stop();
      reject(error ? `waitFor timeout: ${error}` : 'waitFor timeout');
    }, timeout);

    return promise;
  }

  function waitFor(fn) {
    let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20000;

    return waitForImpl(fn, timeout);
  }

  function wait(time) {
    return new Promise(resolve => timers.setTimeout(resolve, time));
  }
});
$__System.registerDynamic("29", ["2a"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _helpers = $__require("2a");

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class = function () {
    function _class() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$actions = _ref.actions,
          actions = _ref$actions === undefined ? {} : _ref$actions,
          _ref$respond = _ref.respond,
          respond = _ref$respond === undefined ? function () /* res, req */{} : _ref$respond,
          _ref$respondWithError = _ref.respondWithError,
          respondWithError = _ref$respondWithError === undefined ? function () /* err, req */{} : _ref$respondWithError,
          _ref$filter = _ref.filter,
          filter = _ref$filter === undefined ? function () {
        return true;
      } : _ref$filter,
          _ref$transform = _ref.transform,
          transform = _ref$transform === undefined ? function (r) {
        return r;
      } : _ref$transform,
          errorLogger = _ref.errorLogger,
          _ref$onTerminate = _ref.onTerminate,
          onTerminate = _ref$onTerminate === undefined ? function () {} : _ref$onTerminate;

      _classCallCheck(this, _class);

      this.actions = actions;
      this.onTerminate = onTerminate;
      this.dispatch = this.dispatch.bind(this);
      this.filter = filter;
      this.transform = transform;
      this.respond = respond;
      this.respondWithError = respondWithError;
      this.errorLogger = errorLogger;
    }

    _createClass(_class, [{
      key: 'dispatch',
      value: function dispatch(request) {
        var _this = this;

        if (!this.filter || !this.filter(request)) {
          return false;
        }

        var _transform = this.transform(request),
            _transform$args = _transform.args,
            args = _transform$args === undefined ? [] : _transform$args,
            action = _transform.action;

        if (!(0, _helpers.has)(this.actions, action)) {
          return false;
        }

        var res = void 0;

        try {
          var _actions;

          res = (_actions = this.actions)[action].apply(_actions, _toConsumableArray(args));
        } catch (e) {
          this.respondWithError(e.message, request);
          return true;
        }

        if (!(res instanceof Promise)) {
          res = Promise.resolve(res);
        }

        res.then(function (response) {
          return _this.respond(response, request);
        }, function (error) {
          return _this.respondWithError(error, request);
        });

        return true;
      }
    }, {
      key: 'terminate',
      value: function terminate() {
        this.onTerminate();
      }
    }]);

    return _class;
  }();

  exports.default = _class;
});
$__System.registerDynamic('2b', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('');
  };
});
$__System.registerDynamic("2a", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // eslint-disable-next-line
  var has = exports.has = function has(o, p) {
    return Object.prototype.hasOwnProperty.call(o, p);
  };
});
$__System.registerDynamic("2c", ["29", "2b", "2a"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _server = $__require("29");

  var _server2 = _interopRequireDefault(_server);

  var _uuid = $__require("2b");

  var _uuid2 = _interopRequireDefault(_uuid);

  var _helpers = $__require("2a");

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // eslint-disable-next-line
  var getDefaultLogger = function getDefaultLogger() {
    return console.error.bind(console);
  };

  var Spanan = function () {
    function Spanan(sendFunction) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          errorLogger = _ref.errorLogger;

      _classCallCheck(this, Spanan);

      this.sendFunction = sendFunction;
      this.callbacks = new Map();
      this.errorLogger = errorLogger || getDefaultLogger();
      this.listeners = [this];
    }

    _createClass(Spanan, [{
      key: 'send',
      value: function send(action) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var resolver = void 0;
        var rejecter = void 0;
        var id = (0, _uuid2.default)();
        var promise = new Promise(function (resolve, reject) {
          resolver = resolve;
          rejecter = reject;
        });
        this.callbacks.set(id, {
          resolver: resolver,
          rejecter: rejecter
        });
        this.sendFunction({
          action: action,
          args: args,
          uuid: id
        });
        return promise;
      }
    }, {
      key: 'createProxy',
      value: function createProxy() {
        return new Proxy(this, {
          get: function get(target, key) {
            return target.send.bind(target, key);
          }
        });
      }
    }, {
      key: 'dispatch',
      value: function dispatch() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var callback = this.callbacks.get(message.uuid);

        if (!callback) {
          return false;
        }

        if ((0, _helpers.has)(message, 'response')) {
          callback.resolver(message.response);
        } else if ((0, _helpers.has)(message, 'error')) {
          callback.rejecter(message.error);
        } else {
          return false;
        }

        this.callbacks.delete(message.uuid);
        return true;
      }
    }, {
      key: 'handleMessage',
      value: function handleMessage(message) {
        return this.listeners.some(function (listener) {
          try {
            return listener.dispatch(message);
          } catch (e) {
            listener.errorLogger('Spanan dispatch error', e);
            return false;
          }
        });
      }
    }, {
      key: 'export',
      value: function _export(actions) {
        var _this = this;

        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            filter = _ref2.filter,
            transform = _ref2.transform,
            respond = _ref2.respond,
            respondWithError = _ref2.respondWithError,
            errorLogger = _ref2.errorLogger;

        var server = new _server2.default({
          actions: actions,
          respond: respond,
          respondWithError: respondWithError,
          filter: filter,
          transform: transform,
          errorLogger: errorLogger || getDefaultLogger(),
          onTerminate: function onTerminate() {
            _this.listeners = _this.listeners.filter(function (listener) {
              return listener !== server;
            });
          }
        });

        this.listeners.push(server);

        return server;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.listeners = [];
      }
    }]);

    return Spanan;
  }();

  exports.default = Spanan;
});
$__System.registerDynamic('2d', ['2c'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createSpananForModule;

  var _spanan = $__require('2c');

  var _spanan2 = _interopRequireDefault(_spanan);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function createSpananForModule(moduleName) {
    const spanan = new _spanan2.default(_ref => {
      let uuid = _ref.uuid,
          action = _ref.action,
          args = _ref.args;

      const message = {
        module: moduleName,
        action,
        requestId: uuid,
        args
      };

      chrome.runtime.sendMessage(message, response => {
        if (!response) {
          return;
        }
        spanan.handleMessage({
          uuid,
          response: response.response
        });
      });
    });

    chrome.runtime.onMessage.addListener(_ref2 => {
      let requestId = _ref2.requestId,
          response = _ref2.response;
      return spanan.handleMessage({
        uuid: requestId,
        response
      });
    });

    return spanan;
  }
});
$__System.registerDynamic('2e', ['1d', '24', 'd', 'e', '28', '2d'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  }; /* global window, chrome */

  // Load content scripts from modules


  var _config = $__require('1d');

  var _config2 = _interopRequireDefault(_config);

  $__require('24');

  var _helpers = $__require('d');

  var _decorators = $__require('e');

  var _wait = $__require('28');

  var _spananModuleWrapper = $__require('2d');

  var _spananModuleWrapper2 = _interopRequireDefault(_spananModuleWrapper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function getContextHTML(ev) {
    let target = ev.target,
        count = 0,
        html;

    try {
      while (true) {
        html = target.innerHTML;

        if (html.indexOf('http://') !== -1 || html.indexOf('https://') !== -1) {
          return html;
        }

        target = target.parentNode;

        count += 1;
        if (count > 4) break;
      }
    } catch (ee) {}
  }

  const whitelist = ['chrome://cliqz/', 'resource://cliqz/'].concat(_config2.default.settings.frameScriptWhitelist);

  (0, _helpers.registerContentScript)('core', '*', (window, chrome, CLIQZ) => {
    const currentURL = () => window.location.href;

    function onCallback(msg) {
      if (isDead()) {
        return;
      }

      if (!whitelist.some(url => currentURL().indexOf(url) === 0)) {
        return;
      }

      if (msg.origin === 'content') {
        window.postMessage(JSON.stringify({
          target: 'cliqz',
          type: 'response',
          response: msg.response,
          action: msg.action,
          module: msg.module,
          requestId: msg.requestId
        }), '*');
      }
    }

    const fns = {
      postMessage(message) {
        window.postMessage(message, '*');
        return null;
      },
      getHTML() {
        return window.document.documentElement.outerHTML;
      },
      click(selector) {
        const el = window.document.querySelector(selector);
        try {
          el.click();
          return true;
        } catch (e) {
          return false;
        }
      },
      queryHTML(selector, attribute) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$shadowRootSelect = _ref.shadowRootSelector;

        let shadowRootSelector = _ref$shadowRootSelect === undefined ? null : _ref$shadowRootSelect;
        var _ref$attributeType = _ref.attributeType;
        let attributeType = _ref$attributeType === undefined ? 'property' : _ref$attributeType;

        const root = shadowRootSelector ? window.document.querySelector(shadowRootSelector).shadowRoot : window.document;
        const attributes = attribute.split(',');

        const getAttr = (el, attr) => {
          if (attributeType === 'property') {
            return el[attr];
          }

          return el.getAttribute(attr);
        };

        const ret = Array.prototype.map.call(root.querySelectorAll(selector), el => {
          if (attributes.length > 1) {
            return attributes.reduce((hash, attr) => _extends({}, hash, {
              [attr]: getAttr(el, attr)
            }), {});
          }
          return getAttr(el, attribute);
        });

        return ret;
      },
      queryComputedStyle(selector) {
        const root = shadowRootSelector ? window.document.querySelector(shadowRootSelector).shadowRoot : window.document;

        const ret = Array.prototype.map.call(root.querySelectorAll(selector), el => {
          return window.getComputedStyle(el);
        });
        return ret;
      },
      getCookie() {
        try {
          return window.document.cookie;
        } catch (e) {
          if (e instanceof DOMException && e.name == 'SecurityError') {
            return null;
          }
          throw e; // let others bubble up
        }
      }
    };

    function onCore(msg) {
      let payload;
      if (isDead()) {
        return;
      }

      if (msg.action === 'unload') {
        stop();
        return;
      }

      const url = currentURL();

      let matchesCurrentUrl = msg.url === url;
      // wild card for cliqz URLS
      if (msg.url && (msg.url.indexOf('resource://cliqz') === 0 || msg.url.indexOf('chrome://cliqz') === 0)) {
        if (url.indexOf(msg.url) === 0) {
          matchesCurrentUrl = true;
        }
      }

      if (!matchesCurrentUrl) {
        return;
      }

      if (!(msg.action in fns)) {
        return;
      }

      try {
        payload = fns[msg.action].apply(null, msg.args || []);
        if (payload === null) {
          return;
        }
      } catch (e) {
        window.console.error('cliqz framescript:', e);
      }
      chrome.runtime.sendMessage({
        response: payload,
        requestId: msg.requestId
      });
    }

    function proxyWindowEvent(action) {
      return function (ev) {
        CLIQZ.app.modules.core.action(action, {
          target: {
            baseURI: ev.target.baseURI
          }
        });
      };
    }

    const onMouseDown = function onMouseDown(ev) {
      const linksSrc = [];
      if (window.parent !== window) {
        // collect srcipt links only for frames
        if (window.document && window.document.scripts) {
          for (let i = 0; i < window.document.scripts.length; i += 1) {
            const src = window.document.scripts[i].src;
            if (src.startsWith('http')) {
              linksSrc.push(src);
            }
          }
        }
      }

      let node = ev.target;
      if (node.nodeType !== 1) {
        node = node.parentNode;
      }

      let href = null;

      if (node.closest('a[href]')) {
        href = node.closest('a[href]').getAttribute('href');
      }

      const event = {
        target: {
          baseURI: ev.target.baseURI,
          value: ev.target.value,
          href: ev.target.href,
          parentNode: {
            href: ev.target.parentNode ? ev.target.parentNode.href : null
          },
          linksSrc
        }
      };
      CLIQZ.app.modules.core.action('recordMouseDown', event, getContextHTML(ev), href);
    };

    const onReady = function onReady() {
      // ReportLang
      const lang = window.document.getElementsByTagName('html').item(0).getAttribute('lang');
      // don't analyse language for (i)frames
      if (!(0, _helpers.isTopWindow)(window)) {
        return;
      }

      const title = window.document.querySelector('title');
      const description = window.document.querySelector('meta[name=description]');
      const ogTitle = window.document.querySelector('meta[property="og:title"]');
      const ogDescription = window.document.querySelector('meta[property="og:description"]');
      const ogImage = window.document.querySelector('meta[property="og:image"]');

      CLIQZ.app.modules.core.action('recordMeta', currentURL(), {
        title: title && title.innerHTML,
        description: description && description.content,
        ogTitle: ogTitle && ogTitle.content,
        ogDescription: ogDescription && ogDescription.content,
        ogImage: ogImage && ogImage.content,
        lang
      });
    };

    function onBackgroundMessage(message) {
      // messages with windowId are responses to actions being called by content scripts
      // TODO: use chrome.runtime.sendMessage callbacks instead
      if (message.windowId) {
        onCallback(message);
      } else {
        onCore(message);
      }
    }

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('DOMContentLoaded', onReady);
    chrome.runtime.onMessage.addListener(onBackgroundMessage);

    function stop(ev) {
      if (ev && ev.target !== window.document) {
        return;
      }

      // detect dead windows
      // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Errors/Dead_object
      try {
        String(window);
      } catch (e) {
        return;
      }

      chrome.runtime.onMessage.removeListener(onBackgroundMessage);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('DOMContentLoaded', onReady);
    }

    function isDead() {
      try {
        currentURL();
        return false;
      } catch (e) {
        stop();
        return true;
      }
    }

    window.addEventListener('unload', stop);
  });

  (function () {
    // we only handle HTML documents for now
    if (window.document.documentElement.nodeName.toLowerCase() !== 'html') {
      return;
    }

    let hasRun = false;
    const actionWrappers = [];

    function runOnce(cliqz) {
      if (hasRun) {
        return;
      }

      hasRun = true;
      // augment CLIQZ global to add action support
      Object.keys(cliqz.app.modules).forEach(moduleName => {
        const mod = cliqz.app.modules[moduleName];
        const wrapper = (0, _spananModuleWrapper2.default)(moduleName);
        mod.action = wrapper.send.bind(wrapper);
        actionWrappers.push(wrapper);
      });
      chrome.runtime.onMessage.addListener(message => {
        actionWrappers.forEach(wrapper => wrapper.handleMessage(message));
      });
      (0, _helpers.runContentScripts)(window, chrome, cliqz);
    }

    if (typeof CLIQZ !== 'undefined' && CLIQZ.app) {
      runOnce(CLIQZ);
    } else {
      window.runCliqz = runOnce;

      const getApp = () => new Promise((resolve, reject) => {
        if (hasRun) {
          reject('hasRun');
          return;
        }

        chrome.runtime.sendMessage({
          module: 'core',
          action: 'status'
        }, reply => {
          if (hasRun || chrome.runtime.lastError || !reply) {
            reject('hasRun');
            return;
          }
          resolve({ app: reply.response });
        });
      });

      (0, _wait.waitFor)(getApp).then(runOnce).catch(ex => {
        window.console.error('Could not run content script', ex, currentURL());
      });
    }
  })();
});
$__System.registerDynamic('a', ['2e'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  $__require('2e');
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    CliqzGlobal = factory();
});