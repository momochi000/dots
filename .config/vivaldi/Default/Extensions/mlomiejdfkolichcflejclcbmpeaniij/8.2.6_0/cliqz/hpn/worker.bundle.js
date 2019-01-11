!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("b", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* eslint no-underscore-dangle: off */
  /* eslint no-param-reassign: off */
  class LRU {
    constructor(size) {
      this.maxSize = size;

      // LRU structure
      this.reset = () => {
        this.cache = new Map();
        this.head = null;
        this.tail = null;
        this.size = 0;
      };
      this.reset();
    }

    /*
     * Check if value associated with `key` is stored in cache.
     * Does not update position of the entry.
     *
     * @param key
     */
    has(key) {
      return this.cache.has(key);
    }

    /* Retrieve value associated with `key` from cache. If it doesn't
     * exist, return `undefined`, otherwise, update position of the
     * entry to "most recent seen".
     *
     * @param key - Key of value we want to get.
     */
    get(key) {
      const node = this.cache.get(key);

      if (node) {
        this._touch(node);
        return node.value;
      }
      return undefined;
    }

    /* Associate a new `value` to `key` in cache. If `key` isn't already
     * present in cache, create a new node at the position "most recent seen".
     * Otherwise, change the value associated with `key` and refresh the
     * position of the entry to "most recent seen".
     *
     * @param key   - Key add to the cache.
     * @param value - Value associated with key.
     */
    set(key, value) {
      let node = this.cache.get(key);

      if (node) {
        // Hit - update value
        node.value = value;
        this._touch(node);
      } else {
        // Miss - Create a new node
        node = this._newNode(key, value);

        // Forget about oldest node
        if (this.size >= this.maxSize) {
          this.cache.delete(this.tail.key);
          this._remove(this.tail);
        }

        this.cache.set(key, node);
        this._pushFront(node);
      }
    }

    // Private interface (Linked List)

    /* Create a new node (key, value) to store in the cache */
    _newNode(key, value) {
      return {
        prev: null,
        next: null,
        key,
        value
      };
    }

    /* Refresh timestamp of `node` by moving it to the front of the list.
     * It the becomes the (key, value) seen most recently.
     */
    _touch(node) {
      this._remove(node);
      this._pushFront(node);
    }

    /* Remove `node` from the list. */
    _remove(node) {
      if (node) {
        // Update previous node
        if (node.prev === null) {
          this.head = node.next;
        } else {
          node.prev.next = node.next;
        }

        // Update next node
        if (node.next === null) {
          this.tail = node.prev;
        } else {
          node.next.prev = node.prev;
        }

        this.size -= 1;
      }
    }

    /* Add `node` in front of the list (most recent element). */
    _pushFront(node) {
      if (node) {
        // Replace first node of the list
        node.prev = null;
        node.next = this.head;

        if (this.head !== null) {
          this.head.prev = node;
        }

        this.head = node;

        // Case: List was empty
        if (this.tail === null) {
          this.tail = node;
        }

        this.size += 1;
      }
    }
  }
  exports.default = LRU;
});
$__System.registerDynamic('c', ['b'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _LRU = $__require('b');

  var _LRU2 = _interopRequireDefault(_LRU);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /* Fixed length lookup cache. Allows expensive operations to be cached for later lookup. Once
   * the cache limit is exceeded, least recently used values are removed.
   */
  class FixedSizeCache {
    /* @param {function} buildValue - used to build a new value from key in case of cache miss.
     * @param {number} size - maximum elements stored in cache.
     * @param {function} buildKey - [Optional] used to extract key from argument.
     */
    constructor(buildValue, size, buildKey) {
      this._buildValue = buildValue;
      this._buildKey = buildKey;
      this._maxKeySize = 1000;

      // Statistics
      this._hitCounter = 0;
      this._missCounter = 0;

      this.lru = new _LRU2.default(size);
    }

    /* Try to retrieve the value associated with `key` from the cache. If it's
     * not present, build it using `buildValue` and store it in the cache.
     *
     * This method always returns a value either from the LRU cache, or from a
     * direct call to `buildValue`.
     */
    get(argument) {
      const key = this._buildKey ? this._buildKey(argument) : argument;
      let value = this.lru.get(key);

      if (value !== undefined) {
        // Cache hit
        this._hitCounter += 1;
        return value;
      }
      // Cache miss
      this._missCounter += 1;

      // Compute value
      value = this._buildValue(argument);

      // if key is large, don't cache
      if (!key || key.length > this._maxKeySize) {
        return value;
      }

      this.lru.set(key, value);
      return value;
    }
  }
  exports.default = FixedSizeCache;
});
$__System.registerDynamic('d', ['c'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cachedMD5;

  var _fixedSizeCache = $__require('c');

  var _fixedSizeCache2 = _interopRequireDefault(_fixedSizeCache);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /**
   * Largely based on js-md5 (https://github.com/emn178/js-md5)
   * by Chen, Yi-Cyuan [emn178@gmail.com]
   */
  /* eslint-disable no-mixed-operators, no-bitwise, no-plusplus */

  const state = new Int32Array(4);
  const buffer = new ArrayBuffer(68);
  const buffer8 = new Uint8Array(buffer);
  const blocks = new Uint32Array(buffer);
  const extra = new Int32Array([128, 32768, 8388608, -2147483648]);
  const hexChars = '0123456789abcdef'.split('');

  let finalized = false;
  let first = true;
  let hashed = false;
  let bytes = 0;
  let start = 0;
  let lastByteIndex;

  function add32(a, b) {
    return a + b & 0xFFFFFFFF;
  }

  function ff(a, b, c, d, x, s, t) {
    const n = a + (b & c | ~b & d) + (x >>> 0) + t | 0;
    return (n << s | n >>> 32 - s) + b | 0;
  }
  function gg(a, b, c, d, x, s, t) {
    const n = a + (b & d | c & ~d) + (x >>> 0) + t | 0;
    return (n << s | n >>> 32 - s) + b | 0;
  }
  function hh(a, b, c, d, x, s, t) {
    const n = a + (b ^ c ^ d) + (x >>> 0) + t | 0;
    return (n << s | n >>> 32 - s) + b | 0;
  }
  function ii(a, b, c, d, x, s, t) {
    const n = a + (c ^ (b | ~d)) + (x >>> 0) + t | 0;
    return (n << s | n >>> 32 - s) + b | 0;
  }

  function hash() {
    let a;
    let b;
    let c;
    let d;

    if (first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = state[0];
      b = state[1];
      c = state[2];
      d = state[3];
      a = ff(a, b, c, d, blocks[0], 7, -680876936);
      d = ff(d, a, b, c, blocks[1], 12, -389564586);
      c = ff(c, d, a, b, blocks[2], 17, 606105819);
      b = ff(b, c, d, a, blocks[3], 22, -1044525330);
    }

    a = ff(a, b, c, d, blocks[4], 7, -176418897);
    d = ff(d, a, b, c, blocks[5], 12, 1200080426);
    c = ff(c, d, a, b, blocks[6], 17, -1473231341);
    b = ff(b, c, d, a, blocks[7], 22, -45705983);
    a = ff(a, b, c, d, blocks[8], 7, 1770035416);
    d = ff(d, a, b, c, blocks[9], 12, -1958414417);
    c = ff(c, d, a, b, blocks[10], 17, -42063);
    b = ff(b, c, d, a, blocks[11], 22, -1990404162);
    a = ff(a, b, c, d, blocks[12], 7, 1804603682);
    d = ff(d, a, b, c, blocks[13], 12, -40341101);
    c = ff(c, d, a, b, blocks[14], 17, -1502002290);
    b = ff(b, c, d, a, blocks[15], 22, 1236535329);

    a = gg(a, b, c, d, blocks[1], 5, -165796510);
    d = gg(d, a, b, c, blocks[6], 9, -1069501632);
    c = gg(c, d, a, b, blocks[11], 14, 643717713);
    b = gg(b, c, d, a, blocks[0], 20, -373897302);
    a = gg(a, b, c, d, blocks[5], 5, -701558691);
    d = gg(d, a, b, c, blocks[10], 9, 38016083);
    c = gg(c, d, a, b, blocks[15], 14, -660478335);
    b = gg(b, c, d, a, blocks[4], 20, -405537848);
    a = gg(a, b, c, d, blocks[9], 5, 568446438);
    d = gg(d, a, b, c, blocks[14], 9, -1019803690);
    c = gg(c, d, a, b, blocks[3], 14, -187363961);
    b = gg(b, c, d, a, blocks[8], 20, 1163531501);
    a = gg(a, b, c, d, blocks[13], 5, -1444681467);
    d = gg(d, a, b, c, blocks[2], 9, -51403784);
    c = gg(c, d, a, b, blocks[7], 14, 1735328473);
    b = gg(b, c, d, a, blocks[12], 20, -1926607734);

    a = hh(a, b, c, d, blocks[5], 4, -378558);
    d = hh(d, a, b, c, blocks[8], 11, -2022574463);
    c = hh(c, d, a, b, blocks[11], 16, 1839030562);
    b = hh(b, c, d, a, blocks[14], 23, -35309556);
    a = hh(a, b, c, d, blocks[1], 4, -1530992060);
    d = hh(d, a, b, c, blocks[4], 11, 1272893353);
    c = hh(c, d, a, b, blocks[7], 16, -155497632);
    b = hh(b, c, d, a, blocks[10], 23, -1094730640);
    a = hh(a, b, c, d, blocks[13], 4, 681279174);
    d = hh(d, a, b, c, blocks[0], 11, -358537222);
    c = hh(c, d, a, b, blocks[3], 16, -722521979);
    b = hh(b, c, d, a, blocks[6], 23, 76029189);
    a = hh(a, b, c, d, blocks[9], 4, -640364487);
    d = hh(d, a, b, c, blocks[12], 11, -421815835);
    c = hh(c, d, a, b, blocks[15], 16, 530742520);
    b = hh(b, c, d, a, blocks[2], 23, -995338651);

    a = ii(a, b, c, d, blocks[0], 6, -198630844);
    d = ii(d, a, b, c, blocks[7], 10, 1126891415);
    c = ii(c, d, a, b, blocks[14], 15, -1416354905);
    b = ii(b, c, d, a, blocks[5], 21, -57434055);
    a = ii(a, b, c, d, blocks[12], 6, 1700485571);
    d = ii(d, a, b, c, blocks[3], 10, -1894986606);
    c = ii(c, d, a, b, blocks[10], 15, -1051523);
    b = ii(b, c, d, a, blocks[1], 21, -2054922799);
    a = ii(a, b, c, d, blocks[8], 6, 1873313359);
    d = ii(d, a, b, c, blocks[15], 10, -30611744);
    c = ii(c, d, a, b, blocks[6], 15, -1560198380);
    b = ii(b, c, d, a, blocks[13], 21, 1309151649);
    a = ii(a, b, c, d, blocks[4], 6, -145523070);
    d = ii(d, a, b, c, blocks[11], 10, -1120210379);
    c = ii(c, d, a, b, blocks[2], 15, 718787259);
    b = ii(b, c, d, a, blocks[9], 21, -343485551);

    if (first) {
      state[0] = add32(a, 1732584193);
      state[1] = add32(b, -271733879);
      state[2] = add32(c, -1732584194);
      state[3] = add32(d, +271733878);
      first = false;
    } else {
      state[0] = add32(state[0], a);
      state[1] = add32(state[1], b);
      state[2] = add32(state[2], c);
      state[3] = add32(state[3], d);
    }
  }

  function init() {
    blocks.fill(0);
    state.fill(0);
    bytes = 0;
    start = 0;
    finalized = false;
    first = true;
    hashed = false;
  }

  function update(message) {
    if (finalized) {
      return;
    }
    const length = message.length;
    let code;
    let index = 0;
    let i;

    while (index < length) {
      if (hashed) {
        hashed = false;
        blocks[0] = blocks[16];
        blocks[1] = 0;
        blocks[2] = 0;
        blocks[3] = 0;
        blocks[4] = 0;
        blocks[5] = 0;
        blocks[6] = 0;
        blocks[7] = 0;
        blocks[8] = 0;
        blocks[9] = 0;
        blocks[10] = 0;
        blocks[11] = 0;
        blocks[12] = 0;
        blocks[13] = 0;
        blocks[14] = 0;
        blocks[15] = 0;
        blocks[16] = 0;
      }

      for (i = start; index < length && i < 64; ++index) {
        code = message.charCodeAt(index);
        if (code < 0x80) {
          buffer8[i++] = code;
        } else if (code < 0x800) {
          buffer8[i++] = 0xc0 | code >> 6;
          buffer8[i++] = 0x80 | code & 0x3f;
        } else if (code < 0xd800 || code >= 0xe000) {
          buffer8[i++] = 0xe0 | code >> 12;
          buffer8[i++] = 0x80 | code >> 6 & 0x3f;
          buffer8[i++] = 0x80 | code & 0x3f;
        } else {
          code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
          buffer8[i++] = 0xf0 | code >> 18;
          buffer8[i++] = 0x80 | code >> 12 & 0x3f;
          buffer8[i++] = 0x80 | code >> 6 & 0x3f;
          buffer8[i++] = 0x80 | code & 0x3f;
        }
      }
      lastByteIndex = i;
      bytes += i - start;
      if (i >= 64) {
        start = i - 64;
        hash();
        hashed = true;
      } else {
        start = i;
      }
    }
  }

  function finalize() {
    if (finalized) {
      return;
    }
    finalized = true;
    const i = lastByteIndex;
    blocks[i >> 2] |= extra[i & 3];
    if (i >= 56) {
      if (!hashed) {
        hash();
      }
      blocks[0] = blocks[16];
      blocks[1] = 0;
      blocks[2] = 0;
      blocks[3] = 0;
      blocks[4] = 0;
      blocks[5] = 0;
      blocks[6] = 0;
      blocks[7] = 0;
      blocks[8] = 0;
      blocks[9] = 0;
      blocks[10] = 0;
      blocks[11] = 0;
      blocks[12] = 0;
      blocks[13] = 0;
      blocks[14] = 0;
      blocks[15] = 0;
      blocks[16] = 0;
    }
    blocks[14] = bytes << 3;
    hash();
  }

  function hex(x) {
    const h0 = x[0];
    const h1 = x[1];
    const h2 = x[2];
    const h3 = x[3];
    return hexChars[h0 >> 4 & 0x0F] + hexChars[h0 & 0x0F] + hexChars[h0 >> 12 & 0x0F] + hexChars[h0 >> 8 & 0x0F] + hexChars[h0 >> 20 & 0x0F] + hexChars[h0 >> 16 & 0x0F] + hexChars[h0 >> 28 & 0x0F] + hexChars[h0 >> 24 & 0x0F] + hexChars[h1 >> 4 & 0x0F] + hexChars[h1 & 0x0F] + hexChars[h1 >> 12 & 0x0F] + hexChars[h1 >> 8 & 0x0F] + hexChars[h1 >> 20 & 0x0F] + hexChars[h1 >> 16 & 0x0F] + hexChars[h1 >> 28 & 0x0F] + hexChars[h1 >> 24 & 0x0F] + hexChars[h2 >> 4 & 0x0F] + hexChars[h2 & 0x0F] + hexChars[h2 >> 12 & 0x0F] + hexChars[h2 >> 8 & 0x0F] + hexChars[h2 >> 20 & 0x0F] + hexChars[h2 >> 16 & 0x0F] + hexChars[h2 >> 28 & 0x0F] + hexChars[h2 >> 24 & 0x0F] + hexChars[h3 >> 4 & 0x0F] + hexChars[h3 & 0x0F] + hexChars[h3 >> 12 & 0x0F] + hexChars[h3 >> 8 & 0x0F] + hexChars[h3 >> 20 & 0x0F] + hexChars[h3 >> 16 & 0x0F] + hexChars[h3 >> 28 & 0x0F] + hexChars[h3 >> 24 & 0x0F];
  }

  function md5(message) {
    init();
    update(message);
    finalize();
    return hex(state);
  }

  const md5Cache = new _fixedSizeCache2.default(md5, 1600);

  function cachedMD5(s) {
    if (!s) return '';
    return md5Cache.get(s);
  }
});
$__System.registerDynamic('e', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createProxyList = createProxyList;
  exports.getProxyVerifyUrl = getProxyVerifyUrl;
  /**
   * @param routingTable  array of proxy information (keys: dns, ip, ssl)
   * @returns the proxy list (unique proxies in the routing table)
   */
  function createProxyList(routeTable) {
    const proxyList = [];
    const seenProxies = new Set();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = routeTable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const proxy = _step.value;

        const key = [proxy.dns, proxy.ip];
        if (!seenProxies[key]) {
          seenProxies[key] = proxy;
          proxyList.push(proxy);
        }
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

    return proxyList;
  }

  function getProxyVerifyUrl(args) {
    const schema = args.supportsHttps ? 'https' : 'http';
    const host = args.host || args.ip;
    if (!host) {
      throw new Error('Missing host');
    }
    return `${schema}://${host}/v2/verify`;
  }
});
$__System.registerDynamic('f', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getRouteHash = getRouteHash;
  exports.createPayloadBlindSignature = createPayloadBlindSignature;
  exports.createPayloadProxy = createPayloadProxy;
  /*
  Function to clean string for calculating route hash
  */
  const punctuation = '!"\'()*,-./:;?[\\]^_`{|}~%$=&+#';
  const regex = new RegExp(`[${punctuation}]`, 'g');
  function cleanStr(_s) {
    // Replace all spaces

    // Because in some telemetry message we only create uniqu based on anti-duplicate.
    // Anti-duplicate is not a string, hence converting it to string.
    let s = `${_s}`;

    // Decode uri component
    // Need to find lua equivalent

    try {
      s = decodeURIComponent(s);
    } catch (e) {
      // pass
    }

    s = s.replace(/\s+/g, '');

    // Convert to lower
    s = s.toLowerCase();

    // Trim
    s = s.trim();

    // Clean the URL
    s = s.replace(/^http:\/\//, '');
    s = s.replace(/^https:\/\//, '');
    s = s.replace(/^www\./, '');

    // Remove all punctuation marks
    s = s.replace(regex, '');

    return s;
  }

  function getField(obj, path) {
    return path.split(/[.[\]]+/).filter(x => x).reduce((o, i) => o[i], obj);
  }

  function orderedStringify(t, res, onlyKeys) {
    if (!t || typeof t !== 'object') {
      if (t === undefined) {
        throw new Error('Found undefined field when trying to calculate msg routehash');
      }
      res.push(cleanStr(t));
    } else {
      const keys = Object.keys(t);
      keys.sort();
      const isArray = Array.isArray(t);
      keys.forEach(k => {
        if (!isArray) {
          res.push(cleanStr(k));
        }
        if (!onlyKeys) {
          orderedStringify(t[k], res);
        }
      });
    }
  }

  /* This method will return the string based on mapping of which keys to use to hash for routing.
  */
  function getRouteHash(obj, sourceMap) {
    const action = obj.action;
    const keys = sourceMap[action].keys;
    const staticKeys = sourceMap[action].static || [];
    const res = [];
    keys.forEach(k => orderedStringify(getField(obj, k), res, staticKeys.some(sk => k.endsWith(sk))));
    return res.join('');
  }

  /**
   * Method to create payload to send for blind signature.
   * The payload needs to consist of <uPK,
                                      {mP}*r1, // BM1
                                      {mP, uPK}*r2, // BM2
                                      {DmC, uPK} * r3, // BM3
                                      SIG(uPK;bm1;bm2;bm3)
                                      >
   * @returns string with payload created.
  */

  function createPayloadBlindSignature(uPK, bm1, bm2, bm3, sig) {
    const payload = {};
    payload.uPK = uPK;
    payload.bm1 = bm1;
    payload.bm2 = bm2;
    payload.bm3 = bm3;
    payload.sig = sig;
    return payload;
  }

  /**
   * Method to create payload to send to proxy.
   * The payload needs to consist of <uPK,
                                      dmC,
                                      {H{mP}*r1}Dsk, // BlindSigned1
                                      {H(mP, uPK)}Dsk, // BlindSigned2
                                      {H(mP, dmC)}Dsk, // BlindSigned3
                                      SIG(uPK;dmC;bs1;bs2;bs3)
                                      >
   * @returns string with payload created.
   */

  function createPayloadProxy(uPK, suPK, mP, dmC, bs1, bs2, bs3, sig) {
    const payload = {};
    payload.uPK = uPK;
    payload.suPK = suPK;
    payload.mP = mP;
    payload.dmC = dmC;
    payload.bs1 = bs1;
    payload.bs2 = bs2;
    payload.bs3 = bs3;
    payload.sig = sig;
    return payload;
  }
});
$__System.registerDynamic('10', ['d', '11', 'e', '12', '13', 'f', '14', '15', '16'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _md = $__require('d');

  var _md2 = _interopRequireDefault(_md);

  var _userPk = $__require('11');

  var _userPk2 = _interopRequireDefault(_userPk);

  var _routing = $__require('e');

  var _utils = $__require('12');

  var _encoding = $__require('13');

  var _utils2 = $__require('f');

  var _blindSignature = $__require('14');

  var _httpWorker = $__require('15');

  var _httpWorker2 = _interopRequireDefault(_httpWorker);

  var _crypto = $__require('16');

  var _crypto2 = _interopRequireDefault(_crypto);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  const BlindSignContext = _blindSignature.blindSignContext;

  /* This method will ensure that we have the same length for all the mesages
  */
  /**
  * Creates object for message recieved+
  * Only excepts valid JSON messages with the following fields:
  * Type : Humanweb / Antitracking etc.
  * Actions : Valid actions like Page, query etc.
  * @returns string with payload created.
  */

  function padMessage(msg) {
    const mxLen = 14000;
    const padLen = mxLen - msg.length + 1;
    if (padLen < 0) {
      throw new Error(`msgtoobig (size=${msg.length} exceeds limit=${mxLen}, ` + `<message>${msg.substr(0, 100)}<...rest is skipped>)`);
    }
    return msg + new Array(padLen).join('\n');
  }

  function isJson(str) {
    // If can be parsed that means it's a str.
    // If cannot be parsed and is an object then it's a JSON.
    try {
      JSON.parse(str);
    } catch (e) {
      if (typeof str === 'object') return true;
    }
    return false;
  }

  function hexToBinary(s) {
    let ret = '';
    // let i, k, part, ret = '';
    // lookup table for easier conversion. '0' characters are padded for '1' to '7'
    const lookupTable = {
      0: '0000',
      1: '0001',
      2: '0010',
      3: '0011',
      4: '0100',
      5: '0101',
      6: '0110',
      7: '0111',
      8: '1000',
      9: '1001',
      a: '1010',
      b: '1011',
      c: '1100',
      d: '1101',
      e: '1110',
      f: '1111',
      A: '1010',
      B: '1011',
      C: '1100',
      D: '1101',
      E: '1110',
      F: '1111'
    };
    for (let i = 0; i < s.length; i += 1) {
      if (Object.prototype.hasOwnProperty.call(lookupTable, s[i])) {
        ret += lookupTable[s[i]];
      } else {
        return { valid: false };
      }
    }
    return { valid: true, result: ret };
  }

  class MessageContext {
    constructor(msg, CliqzSecureMessage) {
      let logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { log: () => {}, error: () => {} };

      this.noJSONKeys = ['noJSONKeys', 'csm', 'logger'];
      this.csm = CliqzSecureMessage;
      this.logger = logger;
      // FIXME: isJson is called 3 times on same object
      // TODO: don't use isJSON - try / catch should be sufficient
      if (!msg || !isJson(msg)) return;
      this.orgMessage = isJson(msg) ? JSON.stringify(msg) : msg;
      this.jMessage = isJson(msg) ? msg : JSON.parse(msg);
      this.signed = null;
      this.encrypted = null;
      this.routeHash = null;
      this.type = this.jMessage.type || null;
      this.action = this.jMessage.action || null;
      this.sha256 = null;
      this.interval = null;
      this.rateLimit = null;
      this.endPoint = null;
      this.mE = null;
      this.mK = null;
      this.mP = null;
      this.dm = null;
      this.proxyValidators = null;
    }

    toJSON() {
      const obj = {};
      Object.keys(this).forEach(x => {
        if (this.noJSONKeys.indexOf(x) === -1) {
          obj[x] = this[x];
        }
      });
      return obj;
    }

    log() {
      this.logger.log(...arguments);
    }

    error() {
      this.logger.error(...arguments);
    }

    getproxyCoordinator() {
      const msg = this.jMessage;
      this.endPoint = this.csm.sourceMap[this.action].endpoint;
      this.md5Hash = (0, _md2.default)(this.action);
      const promise = new Promise((resolve, reject) => {
        try {
          const stringRouteHash = (0, _utils2.getRouteHash)(msg, this.csm.sourceMap);
          (0, _utils.sha1)(stringRouteHash).then(hashM => {
            this.sha1 = hashM;
            const dmC = hexToBinary(hashM).result.slice(0, 13);
            const routeHash = parseInt(dmC, 2);
            this.fullHash = hashM;
            this.dmC = dmC;
            const totalProxies = 4096;
            const modRoute = routeHash % totalProxies;
            const proxy = this.csm.routeTable[modRoute];
            const proxyUrl = (0, _routing.getProxyVerifyUrl)({
              host: proxy.dns,
              ip: proxy.ip,
              supportsHttps: proxy.ssl
            });
            this.proxyCoordinator = proxyUrl;
            resolve(this);
          }).catch(err => {
            this.log(`ERROR >> ${err}`);
            reject(err);
          });
        } catch (e) {
          reject(e);
        }
      });
      return promise;
    }

    /**
     * Method to generate an AES-CBC 128 bit key.
     * @returns crypto object of AES KEY.
     */
    aesGenerateKey() {
      return _crypto2.default.subtle.generateKey({
        name: 'AES-CBC',
        length: 128
      }, true, ['encrypt', 'decrypt']).catch(err => {
        this.log(`Error in generating key: ${err}`);
        throw err;
      });
    }

    /**
     * Method to generate an AES-CBC 128 bit key.
     * @returns crypto object of AES KEY.
     */
    aesExportKey(key) {
      return _crypto2.default.subtle.exportKey('raw', key).then(result => {
        this.aesKey = (0, _encoding.toHex)(new Uint8Array(result));
        return key;
      }).catch(err => {
        this.log(`Error in exporting key: ${err}`);
        throw err;
      });
    }
    /**
     * Method to parse a message and encrypt with AES.
     * @throws {string} Will throw 'msgtoobig' if message size exceeds a threshold.
     * @returns string of AES encrypted message.
     */
    aesEncryption(key, _iv, msgEncrypt) {
      return _crypto2.default.subtle.encrypt({
        name: 'AES-CBC',
        iv: _iv
      }, key, (0, _encoding.toUTF8)(msgEncrypt) // ArrayBuffer of data you want to encrypt
      ).catch(err => {
        this.log(`Error in aes encryption: ${err}`);
        throw err;
      });
    }

    rsaEncrypt(msg) {
      const publicKey = this.csm.secureLogger.publicKeyB64;
      return _crypto2.default.subtle.importKey('spki', (0, _encoding.fromBase64)(publicKey), {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-1' }
      }, false, ['encrypt']).then(key => _crypto2.default.subtle.encrypt({ name: 'RSA-OAEP' }, key, (0, _encoding.toUTF8)(msg))).then(_encoding.toBase64).catch(err => {
        this.error(`Error during rsa encryption: ${err}`);
        throw err;
      });
    }
    /**
     * Method to parse a message and encrypt with AES.
     * @throws {string} Will throw 'msgtoobig' if message size exceeds a threshold.
     * @returns string of AES encrypted message.
     */
    aesEncrypt(type) {
      const promise = new Promise((resolve, reject) => {
        const _iv = _crypto2.default.getRandomValues(new Uint8Array(16));
        const eventID = (0, _encoding.toHex)(_iv).substring(0, 5);

        this.eventID = eventID;
        this.iv = (0, _encoding.toHex)(_iv);
        this.mID = eventID;
        this.oiv = _iv;

        this.aesGenerateKey().then(key => this.aesExportKey(key)).then(key => {
          const encryptionPaylod = {};
          encryptionPaylod.msg = this.orgMessage;
          encryptionPaylod.endpoint = this.endPoint;
          let msgEncrypt = JSON.stringify(encryptionPaylod);
          if (type === 'telemetry') {
            try {
              msgEncrypt = padMessage(JSON.stringify(encryptionPaylod));
            } catch (e) {
              reject(`padMessage failed (message type: ${type}): ${e}`);
              return;
            }
          }

          this.aesEncryption(key, _iv, msgEncrypt).then(encryptedResult => {
            this.mE = (0, _encoding.toBase64)(new Uint8Array(encryptedResult));
            resolve(this.mE);
          });
        });
      });
      return promise;
    }

    /**
     * Method to parse a message and decrypt with AES.
     * @returns string of AES decrypted message.
     */
    aesDecrypt(msg) {
      const promise = new Promise((resolve /* , reject */) => {
        const _msg = (0, _encoding.fromBase64)(msg.split(';')[1]);
        const hashKey = this.aesKey;
        const _iv = this.iv;
        _crypto2.default.subtle.importKey('raw', (0, _encoding.fromHex)(hashKey), 'AES-CBC', false, ['decrypt']).then(key => {
          _crypto2.default.subtle.decrypt({
            name: 'AES-CBC',
            iv: (0, _encoding.fromHex)(_iv)
          }, key, _msg).then(decrypted => {
            // returns an ArrayBuffer containing the decrypted data
            // console.log("Decrypted>>> " + fromUTF8(new Uint8Array(decrypted)));
            resolve((0, _encoding.fromUTF8)(new Uint8Array(decrypted)));
          }).catch(err => {
            this.error(err);
          });
        }).catch(err => {
          this.error(err);
        });
      });

      return promise;
    }

    /**
     * Method to sign the AES encryptiong key with Aggregator Public key.
     * Calculate mK = {AESKey;iv;endPoint}
     * @returns string of encrypted key.
     */
    signKey() {
      const promise = new Promise((resolve, reject) => {
        try {
          // To protect from padding oracle attacks, we need to send the hash of
          // mE.
          const mI = (0, _md2.default)(this.mE); // replace it with web-crypto md5.
          const messageToSign = `${this.aesKey};${this.iv};endPoint;${mI}`;
          this.rsaEncrypt(messageToSign).then(encryptedResponse => {
            this.signedKey = encryptedResponse;
            this.mK = encryptedResponse;
            resolve(encryptedResponse);
          });
        } catch (e) {
          reject(e);
        }
      });
      return promise;
    }

    /**
     * Method to create MP
     * Calculate mP = <mID, mK, mE>
     * @returns string called mP.
     */
    getMP() {
      const mP = `${this.mID};${this.mK};${this.mE}`;
      this.mP = mP;
      return mP;
    }

    checkLocalUniq() {
      const promise = new Promise((resolve, reject) => {
        // Check for local temporal uniquness
        const uniqKey = this.dmC;
        const localTemporalUniq = this.csm.localTemporalUniq;
        if (localTemporalUniq && Object.keys(localTemporalUniq).indexOf(uniqKey) > -1) {
          if (localTemporalUniq[uniqKey].fullhash) {
            if (this.fullHash === localTemporalUniq[uniqKey].fullhash) {
              reject('exact-duplicate');
            } else {
              reject('collision');
            }
          }
        } else {
          resolve(true);
        }
      });
      return promise;
    }

    blindMessage() {
      const promise = new Promise((resolve /* , reject */) => {
        // After the message is SIGNED, we need to start the blind signature.
        this.getMP();

        const uPK = this.csm.uPK.publicKeyB64;

        // Messages to be blinded.
        this.m1 = this.mP;
        this.m2 = `${this.mP};${uPK}`;
        this.m3 = `${this.mP};${this.dmC}`; // + ";" + uPK;

        const _bm1 = new BlindSignContext(this.m1, this.logger);
        const _bm2 = new BlindSignContext(this.m2, this.logger);
        const _bm3 = new BlindSignContext(this.m3, this.logger);

        this.r1 = _bm1.getBlindingNonce();
        this.r2 = _bm2.getBlindingNonce();
        this.r3 = _bm3.getBlindingNonce();

        const e = this.csm.dsPK.e;
        const n = this.csm.dsPK.n;

        // Get Unblinder - to unblind the message
        this.u1 = _bm1.getUnBlinder(n);
        this.u2 = _bm2.getUnBlinder(n);
        this.u3 = _bm3.getUnBlinder(n);

        // Blind the message
        _bm1.blindMessage(e, n).then(bm1 => {
          this.bm1 = bm1;
          return _bm2.blindMessage(e, n);
        }).then(bm2 => {
          this.bm2 = bm2;
          return _bm3.blindMessage(e, n);
        }).then(bm3 => {
          this.bm3 = bm3;
          resolve(this);
        });
      });
      return promise;
    }

    userSign() {
      const promise = new Promise((resolve /* , reject */) => {
        const uPK = this.csm.uPK.publicKeyB64;
        const payloadMsg = `${uPK};${this.bm1};${this.bm2};${this.bm3}`;
        const _uPK = new _userPk2.default(this.csm, this.logger);
        return _uPK.sign(payloadMsg).then(signedData => {
          this.signedData = signedData;
          resolve(this);
        });
      });
      return promise;
    }

    sendBlindPayload() {
      const promise = new Promise((resolve, reject) => {
        const payload = (0, _utils2.createPayloadBlindSignature)(this.csm.uPK.publicKeyB64, this.bm1, this.bm2, this.bm3, this.signedData);
        return (0, _httpWorker2.default)(this.csm.BLIND_SIGNER).post(JSON.stringify(payload)).then(response => {
          this.bsResponse = JSON.parse(response);
          resolve(this);
        }).catch(reject);
      });
      return promise;
    }

    unBlindMessage() {
      const promise = new Promise((resolve /* , reject */) => {
        const res = this.bsResponse;
        // Capture the response
        const bs1 = res.bs1;
        const bs2 = res.bs2;
        const bs3 = res.bs3;
        const suPK = res.suPK;

        // Unblind the message to get the signature.
        const n = this.csm.dsPK.n;
        this.us1 = (0, _blindSignature.unBlindMessage)(bs1, this.u1, n);
        this.us2 = (0, _blindSignature.unBlindMessage)(bs2, this.u2, n);
        this.us3 = (0, _blindSignature.unBlindMessage)(bs3, this.u3, n);
        this.suPK = suPK;
        resolve(this);
      });
      return promise;
    }

    signUnblindedMessage() {
      const promise = new Promise((resolve /* , reject */) => {
        const payload = `${this.csm.uPK.publicKeyB64};${this.mP};${this.dmC};${this.us1};${this.us2};${this.us3}`;
        const _uPK = new _userPk2.default(this.csm, this.logger);
        _uPK.sign(payload).then(signedMessageProxy => {
          this.signedMessageProxy = signedMessageProxy;
          resolve(this);
        });
      });
      return promise;
    }

    sendMessageProxy() {
      const promise = new Promise((resolve, reject) => {
        const payload = (0, _utils2.createPayloadProxy)(this.csm.uPK.publicKeyB64, this.suPK, this.mP, this.dmC, this.us1, this.us2, this.us3, this.signedMessageProxy);
        return (0, _httpWorker2.default)(this.proxyCoordinator).post(JSON.stringify(payload)).then(() => resolve(this)).catch(err => {
          reject(err);
        });
      });
      return promise;
    }

    saveLocalCheckTable() {
      const promise = new Promise((resolve /* , reject */) => {
        // Save the hash in temporal unique queue.
        const tt = new Date().getTime();
        const localTemporalUniq = this.csm.localTemporalUniq;
        localTemporalUniq[this.dmC] = { ts: tt, fullhash: this.fullHash };
        resolve(this);
      });
      return promise;
    }
    query(queryProxyUrl) {
      return this.aesEncrypt().then(() => this.signKey()).then(() => {
        const data = { mP: this.getMP() };
        return (0, _httpWorker2.default)(queryProxyUrl).post(JSON.stringify(data), 'instant');
      }).then(res =>
      // Got response, let's decrypt it.
      this.aesDecrypt(JSON.parse(res).data)).catch(err => {
        this.log('query failed:', queryProxyUrl, ', reason:', err);
        return Promise.reject(err);
      });
    }

    encryptedTelemetry() {
      const promise = new Promise((resolve, reject) => {
        try {
          this.getproxyCoordinator().then(() => this.checkLocalUniq()).then(() => this.aesEncrypt('telemetry')).then(() => this.signKey()).then(() => this.blindMessage()).then(() => this.userSign()).then(() => this.sendBlindPayload()).then(() => this.unBlindMessage()).then(() => this.signUnblindedMessage()).then(() => this.sendMessageProxy()).then(() => this.saveLocalCheckTable()).then(() => resolve(true)).catch(err => {
            this.log(err);
            reject(err);
          });
        } catch (err) {
          this.log(`Error creating mc: ${err}`);
          reject(err);
        }
      });
      return promise;
    }
  }
  exports.default = MessageContext;
});
$__System.registerDynamic("12", ["16", "13", "17"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.signRSA = exports.generateRSAKeypair = exports.exportPublicKey = exports.exportPrivateKey = exports.sha1 = exports.deriveAESKey = exports.randomBytes = exports.decryptStringRSA = exports.decryptRSA = exports.encryptRSA = exports.rawEncryptRSA = exports.encryptStringRSA = exports.unwrapAESKey = exports.wrapAESKey = exports.importRSAKey = exports.importAESKey = exports.exportAESKey = exports.generateAESKey = exports.decryptStringAES = exports.decryptAES = exports.encryptStringAES = exports.encryptAES = exports.toArrayBuffer = exports.fromArrayBuffer = exports.toByteArray = exports.fromByteArray = exports.sha256 = exports.hash = undefined;

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

  let hash = (() => {
    var _ref = _asyncToGenerator(function* (algo, str) {
      let format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'hex';

      return _crypto2.default.subtle.digest(algo, typeof str === 'string' ? (0, _encoding.toUTF8)(str) : str).then(function (h) {
        return fromArrayBuffer(h, format);
      });
    });

    return function hash(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

  let sha256 = (() => {
    var _ref2 = _asyncToGenerator(function* (str) {
      let format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hex';

      return hash('SHA-256', str, format);
    });

    return function sha256(_x4) {
      return _ref2.apply(this, arguments);
    };
  })();

  let importAESKey = (() => {
    var _ref3 = _asyncToGenerator(function* (key) {
      return _crypto2.default.subtle.importKey('raw', toArrayBuffer(key, 'hex'), { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    });

    return function importAESKey(_x6) {
      return _ref3.apply(this, arguments);
    };
  })();

  let encryptAES = (() => {
    var _ref4 = _asyncToGenerator(function* (data, key, iv) {
      return Promise.all([iv || _crypto2.default.getRandomValues(new Uint8Array(12)), typeof key === 'string' ? importAESKey(key) : key]).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2);

        let _iv = _ref6[0],
            _key = _ref6[1];
        return _crypto2.default.subtle.encrypt({ name: 'AES-GCM', iv: _iv }, _key, data).then(function (encrypted) {
          return [fromArrayBuffer(_iv, 'b64'), fromArrayBuffer(encrypted, 'b64')];
        });
      });
    });

    return function encryptAES(_x7, _x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  })();
  // Returns [IV, encryptedData]


  let encryptStringAES = (() => {
    var _ref7 = _asyncToGenerator(function* (txt, key, iv) {
      return encryptAES((0, _encoding.toUTF8)(txt).buffer, key, iv);
    });

    return function encryptStringAES(_x10, _x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  })();

  let decryptAES = (() => {
    var _ref8 = _asyncToGenerator(function* (encrypted, key) {
      let iv = encrypted[0];
      let encryptedMsg = encrypted[1];
      iv = new Uint8Array(toArrayBuffer(iv, 'b64'));
      encryptedMsg = toArrayBuffer(encryptedMsg, 'b64');
      return Promise.resolve().then(function () {
        return typeof key === 'string' ? importAESKey(key) : key;
      }).then(function (importedKey) {
        return _crypto2.default.subtle.decrypt({ name: 'AES-GCM', iv }, importedKey, encryptedMsg);
      });
    });

    return function decryptAES(_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  })();

  let decryptStringAES = (() => {
    var _ref9 = _asyncToGenerator(function* (encrypted, key) {
      return decryptAES(encrypted, key).then(function (decrypted) {
        return (0, _encoding.fromUTF8)(new Uint8Array(decrypted));
      });
    });

    return function decryptStringAES(_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  })();

  let generateAESKey = (() => {
    var _ref10 = _asyncToGenerator(function* () {
      return _crypto2.default.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    });

    return function generateAESKey() {
      return _ref10.apply(this, arguments);
    };
  })();

  let exportAESKey = (() => {
    var _ref11 = _asyncToGenerator(function* (key) {
      return _crypto2.default.subtle.exportKey('raw', key).then(function (_key) {
        return fromArrayBuffer(_key, 'hex');
      });
    });

    return function exportAESKey(_x17) {
      return _ref11.apply(this, arguments);
    };
  })();

  let importRSAKey = (() => {
    var _ref12 = _asyncToGenerator(function* (pk) {
      let pub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      let h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'SHA-256';
      let algorithm = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'RSA-OAEP';

      let uses;
      if (pub) {
        if (algorithm === 'RSA-OAEP') {
          uses = ['wrapKey', 'encrypt'];
        } else {
          uses = ['verify'];
        }
      } else if (algorithm === 'RSA-OAEP') {
        uses = ['unwrapKey', 'decrypt'];
      } else {
        uses = ['sign'];
      }
      return _crypto2.default.subtle.importKey(pub ? 'spki' : 'pkcs8', (0, _encoding.fromBase64)(pk), {
        name: algorithm,
        hash: { name: h }
      }, true, uses);
    });

    return function importRSAKey(_x18) {
      return _ref12.apply(this, arguments);
    };
  })();

  let wrapAESKey = (() => {
    var _ref13 = _asyncToGenerator(function* (aesKey, publicKey) {
      return Promise.resolve(typeof publicKey === 'string' ? importRSAKey(publicKey, true) : publicKey).then(function (pk) {
        return _crypto2.default.subtle.wrapKey('raw', aesKey, pk, { name: 'RSA-OAEP', hash: { name: 'SHA-256' } });
      }).then(function (wrapped) {
        return (0, _encoding.toBase64)(wrapped);
      });
    });

    return function wrapAESKey(_x22, _x23) {
      return _ref13.apply(this, arguments);
    };
  })();

  let unwrapAESKey = (() => {
    var _ref14 = _asyncToGenerator(function* (aesKey, privateKey) {
      return Promise.resolve(typeof privateKey === 'string' ? importRSAKey(privateKey, false) : privateKey).then(function (pk) {
        return _crypto2.default.subtle.unwrapKey('raw', (0, _encoding.fromBase64)(aesKey), pk, {
          name: 'RSA-OAEP',
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: { name: 'SHA-256' }
        }, {
          name: 'AES-GCM',
          length: 256
        }, true, ['encrypt', 'decrypt']);
      });
    });

    return function unwrapAESKey(_x24, _x25) {
      return _ref14.apply(this, arguments);
    };
  })();

  let encryptStringRSA = (() => {
    var _ref15 = _asyncToGenerator(function* (txt, publicKey) {
      return generateAESKey().then(function (aesKey) {
        let promise;
        if (Array.isArray(publicKey)) {
          promise = Promise.all(publicKey.map(function (x) {
            return wrapAESKey(aesKey, x);
          }));
        } else {
          promise = wrapAESKey(aesKey, publicKey);
        }
        return Promise.all([encryptStringAES(txt, aesKey), promise]);
      });
    });

    return function encryptStringRSA(_x26, _x27) {
      return _ref15.apply(this, arguments);
    };
  })();

  let rawEncryptRSA = (() => {
    var _ref16 = _asyncToGenerator(function* (data, publicKey) {
      return importRSAKey(publicKey, true, 'SHA-1').then(function (key) {
        return _crypto2.default.subtle.encrypt({ name: 'RSA-OAEP' }, key, data);
      }).then(function (d) {
        return new Uint8Array(d);
      });
    });

    return function rawEncryptRSA(_x28, _x29) {
      return _ref16.apply(this, arguments);
    };
  })();

  let _encryptRSA = (() => {
    var _ref17 = _asyncToGenerator(function* (data, pubKey, aesKey) {
      const wrapPromise = Array.isArray(pubKey) ? Promise.all(pubKey.map(function (x) {
        return wrapAESKey(aesKey, x);
      })) : wrapAESKey(aesKey, pubKey);
      return Promise.all([encryptAES(data, aesKey), wrapPromise]);
    });

    return function _encryptRSA(_x30, _x31, _x32) {
      return _ref17.apply(this, arguments);
    };
  })();

  let encryptRSA = (() => {
    var _ref18 = _asyncToGenerator(function* (data, publicKey, aesKey) {
      if (aesKey) {
        return _encryptRSA(data, publicKey, aesKey);
      }
      return generateAESKey().then(function (k) {
        return _encryptRSA(data, publicKey, k);
      });
    });

    return function encryptRSA(_x33, _x34, _x35) {
      return _ref18.apply(this, arguments);
    };
  })();

  let decryptRSA = (() => {
    var _ref19 = _asyncToGenerator(function* (data, privateKey) {
      var _data2 = _slicedToArray(data, 2);

      const encrypted = _data2[0],
            wrappedKey = _data2[1];

      return unwrapAESKey(wrappedKey, privateKey).then(function (aesKey) {
        return decryptAES(encrypted, aesKey);
      });
    });

    return function decryptRSA(_x36, _x37) {
      return _ref19.apply(this, arguments);
    };
  })();

  let decryptStringRSA = (() => {
    var _ref20 = _asyncToGenerator(function* (data, privateKey) {
      var _data3 = _slicedToArray(data, 2);

      const encrypted = _data3[0],
            wrappedKey = _data3[1];

      return unwrapAESKey(wrappedKey, privateKey).then(function (aesKey) {
        return decryptStringAES(encrypted, aesKey);
      });
    });

    return function decryptStringRSA(_x38, _x39) {
      return _ref20.apply(this, arguments);
    };
  })();

  let deriveAESKey = (() => {
    var _ref21 = _asyncToGenerator(function* (bytes) {
      return sha256(bytes, 'raw').then(function (h) {
        return _crypto2.default.subtle.importKey('raw', h, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
      });
    });

    return function deriveAESKey(_x40) {
      return _ref21.apply(this, arguments);
    };
  })();

  let sha1 = (() => {
    var _ref22 = _asyncToGenerator(function* (s) {
      return hash('SHA-1', s);
    });

    return function sha1(_x41) {
      return _ref22.apply(this, arguments);
    };
  })();

  let generateRSAKeypair = (() => {
    var _ref23 = _asyncToGenerator(function* () {
      let bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2048;

      return _crypto2.default.subtle.generateKey({
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: bits,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' }
      }, true, ['sign', 'verify']).then(function (key) {
        return Promise.all([_crypto2.default.subtle.exportKey('spki', key.publicKey).then(_encoding.toBase64), _crypto2.default.subtle.exportKey('pkcs8', key.privateKey).then(_encoding.toBase64)]);
      });
    });

    return function generateRSAKeypair() {
      return _ref23.apply(this, arguments);
    };
  })();

  let signRSA = (() => {
    var _ref24 = _asyncToGenerator(function* (privateKey, data) {
      const _data = typeof data === 'string' ? (0, _encoding.toUTF8)(data) : data;
      return _crypto2.default.subtle.sign({ name: 'RSASSA-PKCS1-v1_5' }, privateKey, _data).then(_encoding.toHex);
    });

    return function signRSA(_x43, _x44) {
      return _ref24.apply(this, arguments);
    };
  })();

  var _crypto = $__require("16");

  var _crypto2 = _interopRequireDefault(_crypto);

  var _encoding = $__require("13");

  var _pkcsConversion = $__require("17");

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

  function fromByteArray(data, format) {
    if (format === 'hex') {
      return (0, _encoding.toHex)(data);
    } else if (format === 'b64') {
      return (0, _encoding.toBase64)(data);
    }
    return data;
  }
  function toByteArray(data, format) {
    if (format === 'hex') {
      return (0, _encoding.fromHex)(data);
    } else if (format === 'b64') {
      return (0, _encoding.fromBase64)(data);
    }
    return data;
  }
  function fromArrayBuffer(data, format) {
    return fromByteArray(new Uint8Array(data), format);
  }
  function toArrayBuffer(data, format) {
    return toByteArray(data, format).buffer;
  }

  function randomBytes(numBytes) {
    return _crypto2.default.getRandomValues(new Uint8Array(numBytes));
  }

  exports.hash = hash;
  exports.sha256 = sha256;
  exports.fromByteArray = fromByteArray;
  exports.toByteArray = toByteArray;
  exports.fromArrayBuffer = fromArrayBuffer;
  exports.toArrayBuffer = toArrayBuffer;
  exports.encryptAES = encryptAES;
  exports.encryptStringAES = encryptStringAES;
  exports.decryptAES = decryptAES;
  exports.decryptStringAES = decryptStringAES;
  exports.generateAESKey = generateAESKey;
  exports.exportAESKey = exportAESKey;
  exports.importAESKey = importAESKey;
  exports.importRSAKey = importRSAKey;
  exports.wrapAESKey = wrapAESKey;
  exports.unwrapAESKey = unwrapAESKey;
  exports.encryptStringRSA = encryptStringRSA;
  exports.rawEncryptRSA = rawEncryptRSA;
  exports.encryptRSA = encryptRSA;
  exports.decryptRSA = decryptRSA;
  exports.decryptStringRSA = decryptStringRSA;
  exports.randomBytes = randomBytes;
  exports.deriveAESKey = deriveAESKey;
  exports.sha1 = sha1;
  exports.exportPrivateKey = _pkcsConversion.exportPrivateKey;
  exports.exportPublicKey = _pkcsConversion.exportPublicKey;
  exports.generateRSAKeypair = generateRSAKeypair;
  exports.signRSA = signRSA;
});
$__System.registerDynamic('18', ['13'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _encoding = $__require('13');

  /* eslint-disable no-bitwise */

  /**
   * @class DynamicDataView
   *
   * This abstraction allows to serialize efficiently low-level values of types:
   * String, uint8, uint16, uint32 while hiding the complexity of managing the
   * current offset and growing. If initialized with a big enough `length`, it
   * might also not require any resize (thus enabling serializationg with a single
   * memory allocation).
   *
   * This class is also more efficient than the built-in `DataView`.
   *
   * The way this is used in practice is that you write pairs of function to
   * serialize (respectively) deserialize a given structure/class (with code being
   * pretty symetrical). In the serializer you `pushX` values, and in the
   * deserializer you use `getX` functions to get back the values.
   */
  class DynamicDataView {
    constructor(length) {
      this.buffer = new Uint8Array(length);
      this.pos = 0;
    }

    seek() {
      let pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.pos = pos;
    }

    crop() {
      return this.buffer.subarray(0, this.pos);
    }

    set(buffer) {
      this.buffer = new Uint8Array(buffer);
      this.seek(0);
    }

    pushBytes(bytes) {
      this.checkShouldResize(bytes.byteLength);
      this.buffer.set(bytes, this.pos);
      this.pos += bytes.byteLength;
    }

    pushByte(octet) {
      this.pushUint8(octet);
    }

    pushUint8(uint8) {
      this.checkShouldResize(1);
      this.buffer[this.pos] = uint8;
      this.pos += 1;
    }

    pushUint16(uint16) {
      this.checkShouldResize(2);
      this.buffer[this.pos] = uint16 >>> 8;
      this.buffer[this.pos + 1] = uint16;
      this.pos += 2;
    }

    pushUint32(uint32) {
      this.checkShouldResize(4);
      this.buffer[this.pos] = uint32 >>> 24;
      this.buffer[this.pos + 1] = uint32 >>> 16;
      this.buffer[this.pos + 2] = uint32 >>> 8;
      this.buffer[this.pos + 3] = uint32;
      this.pos += 4;
    }

    pushUTF8(str) {
      const buffer = (0, _encoding.toUTF8)(str);
      this.pushUint16(buffer.byteLength);
      this.pushBytes(buffer);
    }

    /**
     * This method is very optimistic and will assume that by default every string
     * is ascii only, but fallback to a slower utf-8 method if a non-ascii char is
     * encountered in the process of pushing the string.
     *
     * WARNING: Currently only strings of size <= 65k can be stored.
     */
    pushStr(str) {
      // Keep track of original position to be able to fallback
      // to pushUTF8 if we encounter non-ascii characters.
      const originalPos = this.pos;
      let foundUnicode = false;

      this.checkShouldResize(2 + str.length);
      this.pushUint16(str.length);

      const offset = this.pos;
      const buffer = this.buffer;
      for (let i = 0; i < str.length && !foundUnicode; i += 1) {
        const ch = str.charCodeAt(i);
        buffer[offset + i] = ch;
        foundUnicode = foundUnicode || ch > 127;
      }

      if (foundUnicode) {
        // Fallback to a slower utf-8 text encoder
        this.pos = originalPos;
        this.pushUTF8(str);
      } else {
        this.pos += str.length;
      }
    }

    // Read next value

    getBytes(n) {
      const bytes = this.buffer.subarray(this.pos, this.pos + n);
      this.pos += n;
      return bytes;
    }

    getByte() {
      return this.getUint8();
    }

    getUint8() {
      const uint8 = this.buffer[this.pos];
      this.pos += 1;
      return uint8;
    }

    getUint16() {
      const uint16 = (this.buffer[this.pos] << 8 | this.buffer[this.pos + 1]) >>> 0;
      this.pos += 2;
      return uint16;
    }

    getUint32() {
      const uint32 = (this.buffer[this.pos] << 24 >>> 0) + (this.buffer[this.pos + 1] << 16 | this.buffer[this.pos + 2] << 8 | this.buffer[this.pos + 3]) >>> 0;
      this.pos += 4;
      return uint32;
    }

    getUTF8() {
      return (0, _encoding.fromUTF8)(this.getBytes(this.getUint16()));
    }

    getStr() {
      // Keep track of original position to be able to fallback
      // to getUTF8 if we encounter non-ascii characters.
      const originalPos = this.pos;
      const size = this.getUint16();

      // Check if there is a non-ascii character in the string.
      let i = 0;
      for (; i < size && this.buffer[this.pos + i] <= 127; i += 1) {
        /* empty */
      }

      if (i < size) {
        this.pos = originalPos;
        return this.getUTF8();
      }

      return String.fromCharCode.apply(null, this.getBytes(size));
    }

    checkShouldResize(n) {
      if (this.pos + n >= this.buffer.byteLength) {
        this.resize(n);
      }
    }

    resize() {
      let n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      const newBuffer = new Uint8Array(Math.floor((this.pos + n) * 1.5));
      newBuffer.set(this.buffer);
      this.buffer = newBuffer;
    }
  }
  exports.default = DynamicDataView; /* eslint-enable no-bitwise */
});
$__System.registerDynamic('17', ['13', '18'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.exportPublicKeySimple = exports.privateKeytoKeypair = exports.importPrivateKey = exports.importPublicKey = exports.exportPublicKeySPKI = exports.exportPublicKey = exports.exportPrivateKey = exports.exportPrivateKeyPKCS8 = exports.importPrivateKeyPKCS8 = undefined;

  var _encoding = $__require('13');

  var _dynamicDataView = $__require('18');

  var _dynamicDataView2 = _interopRequireDefault(_dynamicDataView);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /* eslint-disable no-bitwise */
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-plusplus */

  function bytesToEncode(len) {
    let sum = len + 1;
    if (len < 1 << 7) {
      sum += 1;
    } else if (len < 1 << 8) {
      sum += 2;
    } else if (len < 1 << 16) {
      sum += 3;
    } else if (len < 1 << 24) {
      sum += 4;
    } else if (len < 1 << 32) {
      sum += 5;
    } else {
      throw new Error(`value too big ${len}`);
    }
    return sum;
  }

  function pushLength(buffer, len) {
    if (len < 1 << 7) {
      buffer.pushByte(len);
    } else if (len < 1 << 8) {
      buffer.pushByte(0x81);
      buffer.pushByte(len);
    } else if (len < 1 << 16) {
      buffer.pushByte(0x82);
      buffer.pushByte(len >> 8);
      buffer.pushByte(len & 0xFF);
    } else if (len < 1 << 24) {
      buffer.pushByte(0x83);
      buffer.pushByte(len >> 16);
      buffer.pushByte(len >> 8 & 0xFF);
      buffer.pushByte(len & 0xFF);
    } else if (len < 1 << 32) {
      buffer.pushByte(0x84);
      buffer.pushByte(len >> 24);
      buffer.pushByte(len >> 16 & 0xFF);
      buffer.pushByte(len >> 8 & 0xFF);
      buffer.pushByte(len & 0xFF);
    } else {
      throw new Error(`value too big ${len}`);
    }
  }

  function fromBase64url(data) {
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    const pads = (4 - data.length % 4) % 4;
    if (pads === 3) {
      throw new Error(`illegal base64 string: ${data}`);
    }
    for (let i = 0; i < pads; i++) {
      data += '=';
    }
    return data;
  }

  function toBase64url(data) {
    data = data.replace(/\+/g, '-').replace(/\//g, '_');
    for (let i = 0; i < 2; ++i) {
      if (data[data.length - 1] === '=') {
        data = data.substring(0, data.length - 1);
      }
    }
    return data;
  }

  function padIfSigned(array) {
    if (array[0] & 0x80) {
      const newArray = new Uint8Array(array.length + 1);
      newArray[0] = 0;
      newArray.set(array, 1);
      return newArray;
    }
    return array;
  }
  /* RSAPrivateKey ::= SEQUENCE {
    version           0,
    modulus           INTEGER,  -- n
    publicExponent    INTEGER,  -- e
    privateExponent   INTEGER,  -- d
    prime1            INTEGER,  -- p
    prime2            INTEGER,  -- q
    exponent1         INTEGER,  -- d mod (p-1)
    exponent2         INTEGER,  -- d mod (q-1)
    coefficient       INTEGER,  -- (inverse of q) mod p
  } */

  /* RSAPublicKey ::= SEQUENCE {
      modulus           INTEGER,  -- n
      publicExponent    INTEGER   -- e
  } */
  function exportPrivateKey(key) {
    const origValues = ['AA==', key.n, key.e, key.d, key.p, key.q, key.dp, key.dq, key.qi];
    const values = origValues.map(x => padIfSigned((0, _encoding.fromBase64)(fromBase64url(x))));
    const buffer = new _dynamicDataView2.default(2000);

    buffer.pushByte(0x30); // SEQUENCE
    const numBytes = values.reduce((a, x) => a + bytesToEncode(x.length), 0);
    pushLength(buffer, numBytes);

    values.forEach(x => {
      buffer.pushByte(0x02); // INTEGER
      pushLength(buffer, x.length);
      buffer.pushBytes(x);
    });
    return (0, _encoding.toBase64)(buffer.crop());
  }
  function exportPublicKeySimple(key) {
    const origValues = [key.n, key.e];
    const values = origValues.map(x => padIfSigned((0, _encoding.fromBase64)(fromBase64url(x))));
    const buffer = new _dynamicDataView2.default(2000);

    buffer.pushByte(0x30); // SEQUENCE
    const numBytes = values.reduce((a, x) => a + bytesToEncode(x.length), 0);
    pushLength(buffer, numBytes);

    values.forEach(x => {
      buffer.pushByte(0x02); // INTEGER
      pushLength(buffer, x.length);
      buffer.pushBytes(x);
    });
    return (0, _encoding.toBase64)(buffer.crop());
  }
  /* RSAPublicKey ::= SEQUENCE {
      modulus           INTEGER,  -- n
      publicExponent    INTEGER   -- e
  } */

  /* SEQUENCE(2 elem)
      SEQUENCE(2 elem)
          OBJECT IDENTIFIER 1.2.840.113549.1.1.1
          NULL
      BIT STRING(1 elem)
          SEQUENCE(2 elem)
              INTEGER(2048 bit) n
              INTEGER e
  */
  function exportPublicKey(key) {
    const origValues = [key.n, key.e];
    const values = origValues.map(x => padIfSigned((0, _encoding.fromBase64)(fromBase64url(x))));
    const numBytes = values.reduce((a, x) => a + bytesToEncode(x.length), 0);

    const buffer = new _dynamicDataView2.default(2000);

    buffer.pushByte(0x30); // SEQUENCE
    pushLength(buffer, bytesToEncode(bytesToEncode(numBytes) + 1) + 15);

    buffer.pushBytes(new Uint8Array([0x30, 0x0D, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01, 0x05, 0x00]));
    buffer.pushByte(0x03); // BIT STRING
    pushLength(buffer, bytesToEncode(numBytes) + 1);
    buffer.pushByte(0x00);

    buffer.pushByte(0x30); // SEQUENCE
    pushLength(buffer, numBytes);

    values.forEach(x => {
      buffer.pushByte(0x02); // INTEGER
      pushLength(buffer, x.length);
      buffer.pushBytes(x);
    });
    return (0, _encoding.toBase64)(buffer.crop());
  }

  function exportPublicKeySPKI(key) {
    return exportPublicKey(key);
  }

  function exportPrivateKeyPKCS8(key) {
    const origValues = ['AA==', key.n, key.e, key.d, key.p, key.q, key.dp, key.dq, key.qi];
    const values = origValues.map(x => padIfSigned((0, _encoding.fromBase64)(fromBase64url(x))));
    const numBytes = values.reduce((a, x) => a + bytesToEncode(x.length), 0);

    const buffer = new _dynamicDataView2.default(2000);

    buffer.pushByte(0x30); // SEQUENCE
    pushLength(buffer, 3 + 15 + bytesToEncode(bytesToEncode(numBytes)));
    buffer.pushBytes(new Uint8Array([0x02, 0x01, 0x00]));
    buffer.pushBytes(new Uint8Array([0x30, 0x0D, 0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01, 0x05, 0x00]));
    buffer.pushByte(0x04); // OCTET STRING
    pushLength(buffer, bytesToEncode(numBytes));

    buffer.pushByte(0x30); // SEQUENCE
    pushLength(buffer, numBytes);

    values.forEach(x => {
      buffer.pushByte(0x02); // INTEGER
      pushLength(buffer, x.length);
      buffer.pushBytes(x);
    });
    return (0, _encoding.toBase64)(buffer.crop());
  }

  function readLength(buffer) {
    const first = buffer.getByte();
    if (first & 0x80) {
      let numBytes = first & 0x7F;
      let res = 0;
      while (numBytes--) {
        res = res << 8 | buffer.getByte();
      }
      return res;
    }
    return first;
  }

  function readInteger(buffer) {
    const tag = buffer.getByte();
    if (tag !== 0x02) {
      throw new Error('invalid tag for integer value');
    }
    const len = readLength(buffer);
    let val = buffer.getBytes(len);
    if (val[0] === 0) {
      // Remove padding?
      val = val.subarray(1);
    }
    return val;
  }

  function __importKey(buffer, values) {
    const key = {};
    if (buffer.getByte() === 0x30) {
      readLength(buffer);
      for (let i = 0; i < values.length; ++i) {
        let val = readInteger(buffer);
        val = toBase64url((0, _encoding.toBase64)(val));
        key[values[i]] = val;
      }
    } else {
      throw new Error('first value not correct');
    }

    key.alg = 'RS256';
    key.ext = true;
    key.kty = 'RSA';
    return key;
  }

  function _importKey(data, values) {
    const buffer = new _dynamicDataView2.default(0);
    buffer.set((0, _encoding.fromBase64)(data));
    return __importKey(buffer, values);
  }

  function importPublicKey(data) {
    const buffer = new _dynamicDataView2.default(0);
    buffer.set((0, _encoding.fromBase64)(data));
    if (buffer.getByte() === 0x30) {
      readLength(buffer);
      buffer.getBytes(15);
      if (buffer.getByte() !== 0x03) {
        throw new Error('format not correct');
      }
      readLength(buffer);
      if (buffer.getByte() !== 0x00) {
        throw new Error('format not correct');
      }
    } else {
      throw new Error('format not correct');
    }
    return __importKey(buffer, ['n', 'e']);
  }

  function importPrivateKeyPKCS8(data) {
    const buffer = new _dynamicDataView2.default(0);
    buffer.set((0, _encoding.fromBase64)(data));
    buffer.getByte();
    readLength(buffer);
    buffer.getBytes(3);
    buffer.getBytes(15);
    buffer.getByte();
    readLength(buffer);
    const res = __importKey(buffer, ['version', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi']);
    delete res.version;
    return res;
  }

  function importPrivateKey(data) {
    const res = _importKey(data, ['version', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi']);
    delete res.version;
    return res;
  }

  function privateKeytoKeypair(privateKey) {
    const key = importPrivateKey(privateKey);
    return [exportPublicKeySPKI(key), exportPrivateKeyPKCS8(key)];
  }

  exports.importPrivateKeyPKCS8 = importPrivateKeyPKCS8;
  exports.exportPrivateKeyPKCS8 = exportPrivateKeyPKCS8;
  exports.exportPrivateKey = exportPrivateKey;
  exports.exportPublicKey = exportPublicKey;
  exports.exportPublicKeySPKI = exportPublicKeySPKI;
  exports.importPublicKey = importPublicKey;
  exports.importPrivateKey = importPrivateKey;
  exports.privateKeytoKeypair = privateKeytoKeypair;
  exports.exportPublicKeySimple = exportPublicKeySimple;
});
$__System.registerDynamic('15', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (url) {
    return {
      post(data) {
        let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'delayed';

        return fetch(url, {
          method: 'POST',
          body: data,
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
            'x-type': type,
            'Content-Type': 'application/json;charset=utf-8',
            'User-Agent': ' ',
            'Accept-Language': ' '
          },
          referrerPolicy: 'no-referrer'
        }).then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        });
      }
    };
  };
});
$__System.registerDynamic('11', ['17', '13', '15', '16'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _pkcsConversion = $__require('17');

  var _encoding = $__require('13');

  var _httpWorker = $__require('15');

  var _httpWorker2 = _interopRequireDefault(_httpWorker);

  var _crypto = $__require('16');

  var _crypto2 = _interopRequireDefault(_crypto);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  class UserPk {
    constructor(CliqzSecureMessage) {
      let logger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { log: () => {}, error: () => {} };

      this.privateKey = '';
      this.publicKey = '';
      this.logger = logger;
      this.csm = CliqzSecureMessage;
    }

    log() {
      this.logger.log(...arguments);
    }

    /**
     * Method to sign the str using userSK.
     * @returns signature in hex format.
     */
    sign(msg) {
      const promise = new Promise((resolve, reject) => {
        const ppk = (0, _pkcsConversion.privateKeytoKeypair)(this.csm.uPK.privateKey);
        _crypto2.default.subtle.importKey('pkcs8', (0, _encoding.fromBase64)(ppk[1]), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']).then(privateKey => {
          const documentBytes = (0, _encoding.toUTF8)(msg);
          _crypto2.default.subtle.sign({ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, privateKey, documentBytes).then(signatureBuffer => {
            const signatureBytes = new Uint8Array(signatureBuffer);
            const signatureHex = (0, _encoding.toHex)(signatureBytes);
            resolve(signatureHex);
          }).catch(err => reject(err));
        }).catch(err => reject(err));
      });
      return promise;
    }

    verify(sig, msg) {
      const promise = new Promise((resolve /* , reject */) => {
        const ppk = (0, _pkcsConversion.privateKeytoKeypair)(this.csm.uPK.privateKey);
        _crypto2.default.subtle.importKey('spki', (0, _encoding.fromBase64)(ppk[0]), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']).then(publicKey => {
          const signatureBytes = (0, _encoding.fromHex)(sig);
          const documentBytes = (0, _encoding.toUTF8)(msg);
          _crypto2.default.subtle.verify({ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, publicKey, signatureBytes, documentBytes).then(validSignature => {
            resolve(validSignature);
          }).catch(err => this.log(err));
        });
      });
      return promise;
    }

    generateKey() {
      const promise = new Promise((resolve, reject) => {
        _crypto2.default.subtle.generateKey({
          name: 'RSASSA-PKCS1-v1_5',
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: { name: 'SHA-256' }
        }, true, ['sign', 'verify']).then(key => _crypto2.default.subtle.exportKey('jwk', key.privateKey)).then(key => {
          const returnData = {};
          returnData.privKeyB64 = (0, _pkcsConversion.exportPrivateKey)(key);
          returnData.publicKeyB64 = (0, _pkcsConversion.exportPublicKey)(key);
          this.privateKey = returnData.privKeyB64;
          this.publicKey = returnData.publicKeyB64;
          return returnData;
        }).then(keys => (0, _httpWorker2.default)(this.csm.USER_REG).post(JSON.stringify({ pk: keys.publicKeyB64 }))).then(() => resolve({ success: true, privateKey: this.privateKey, publicKey: this.publicKey })).catch(e => reject({ success: false, error: e.message }));
      });
      return promise;
    }
  }
  exports.default = UserPk;
});
$__System.registerDynamic('19', [], true, function ($__require, exports, module) {
  var global = this || self,
      GLOBAL = global;
  // Vjeux: Customized bigInt2str and str2bigInt in order to accept custom base.

  ////////////////////////////////////////////////////////////////////////////////////////
  // Big Integer Library v. 5.5
  // Created 2000, last modified 2013
  // Leemon Baird
  // www.leemon.com
  //
  // Version history:
  // v 5.5  17 Mar 2013
  //   - two lines of a form like "if (x<0) x+=n" had the "if" changed to "while" to 
  //     handle the case when x<-n. (Thanks to James Ansell for finding that bug)
  // v 5.4  3 Oct 2009
  //   - added "var i" to greaterShift() so i is not global. (Thanks to P�ter Szab� for finding that bug)
  //
  // v 5.3  21 Sep 2009
  //   - added randProbPrime(k) for probable primes
  //   - unrolled loop in mont_ (slightly faster)
  //   - millerRabin now takes a bigInt parameter rather than an int
  //
  // v 5.2  15 Sep 2009
  //   - fixed capitalization in call to int2bigInt in randBigInt
  //     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
  //
  // v 5.1  8 Oct 2007 
  //   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
  //   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
  //   - fixed a bug found by Rob Visser (see comment with his name below)
  //   - improved comments
  //
  // This file is public domain.   You can use it for any purpose without restriction.
  // I do not guarantee that it is correct, so use it at your own risk.  If you use 
  // it for something interesting, I'd appreciate hearing about it.  If you find 
  // any bugs or make any improvements, I'd appreciate hearing about those too.
  // It would also be nice if my name and URL were left in the comments.  But none 
  // of that is required.
  //
  // This code defines a bigInt library for arbitrary-precision integers.
  // A bigInt is an array of integers storing the value in chunks of bpe bits, 
  // little endian (buff[0] is the least significant word).
  // Negative bigInts are stored two's complement.  Almost all the functions treat
  // bigInts as nonnegative.  The few that view them as two's complement say so
  // in their comments.  Some functions assume their parameters have at least one 
  // leading zero element. Functions with an underscore at the end of the name put
  // their answer into one of the arrays passed in, and have unpredictable behavior 
  // in case of overflow, so the caller must make sure the arrays are big enough to 
  // hold the answer.  But the average user should never have to call any of the 
  // underscored functions.  Each important underscored function has a wrapper function 
  // of the same name without the underscore that takes care of the details for you.  
  // For each underscored function where a parameter is modified, that same variable 
  // must not be used as another argument too.  So, you cannot square x by doing 
  // multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
  // Or simply use the multMod(x,x,n) function without the underscore, where
  // such issues never arise, because non-underscored functions never change
  // their parameters; they always allocate new memory for the answer that is returned.
  //
  // These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
  // For most functions, if it needs a BigInt as a local variable it will actually use
  // a global, and will only allocate to it only when it's not the right size.  This ensures
  // that when a function is called repeatedly with same-sized parameters, it only allocates
  // memory on the first call.
  //
  // Note that for cryptographic purposes, the calls to Math.random() must 
  // be replaced with calls to a better pseudorandom number generator.
  //
  // In the following, "bigInt" means a bigInt with at least one leading zero element,
  // and "integer" means a nonnegative integer less than radix.  In some cases, integer 
  // can be negative.  Negative bigInts are 2s complement.
  // 
  // The following functions do not modify their inputs.
  // Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
  // Those returning a boolean will return the integer 0 (false) or 1 (true).
  // Those returning boolean or int will not allocate memory except possibly on the first 
  // time they're called with a given parameter size.
  // 
  // bigInt  add(x,y)               //return (x+y) for bigInts x and y.  
  // bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
  // string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
  // int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
  // bigInt  dup(x)                 //return a copy of bigInt x
  // boolean equals(x,y)            //is the bigInt x equal to the bigint y?
  // boolean equalsInt(x,y)         //is bigint x equal to integer y?
  // bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
  // Array   findPrimes(n)          //return array of all primes less than integer n
  // bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
  // boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
  // boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
  // bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
  // bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
  // int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
  // boolean isZero(x)              //is the bigInt x equal to zero?
  // boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
  // boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
  // bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
  // int     modInt(x,n)            //return x mod n for bigInt x and integer n.
  // bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
  // bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
  // boolean negative(x)            //is bigInt x negative?
  // bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
  // bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
  // bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
  // bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
  // bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
  // bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
  // bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
  //
  //
  // The following functions each have a non-underscored version, which most users should call instead.
  // These functions each write to a single parameter, and the caller is responsible for ensuring the array 
  // passed in is large enough to hold the result. 
  //
  // void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
  // void    add_(x,y)             //do x=x+y for bigInts x and y
  // void    copy_(x,y)            //do x=y on bigInts x and y
  // void    copyInt_(x,n)         //do x=n on bigInt x and integer n
  // void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
  // boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
  // void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
  // void    mult_(x,y)            //do x=x*y for bigInts x and y.
  // void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
  // void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
  // void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
  // void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
  // void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
  //
  // The following functions do NOT have a non-underscored version. 
  // They each write a bigInt result to one or more parameters.  The caller is responsible for
  // ensuring the arrays passed in are large enough to hold the results. 
  //
  // void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
  // void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
  // void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
  // int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
  // void eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
  // void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
  // void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
  // void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
  // void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
  // void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the function is defined)
  // void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
  // void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
  // void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
  // void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
  //
  // The following functions are based on algorithms from the _Handbook of Applied Cryptography_
  //    powMod_()           = algorithm 14.94, Montgomery exponentiation
  //    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
  //    GCD_()              = algorothm 14.57, Lehmer's algorithm
  //    mont_()             = algorithm 14.36, Montgomery multiplication
  //    divide_()           = algorithm 14.20  Multiple-precision division
  //    squareMod_()        = algorithm 14.16  Multiple-precision squaring
  //    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
  //    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
  //
  // Profiling shows:
  //     randTruePrime_() spends:
  //         10% of its time in calls to powMod_()
  //         85% of its time in calls to millerRabin()
  //     millerRabin() spends:
  //         99% of its time in calls to powMod_()   (always with a base of 2)
  //     powMod_() spends:
  //         94% of its time in calls to mont_()  (almost always with x==y)
  //
  // This suggests there are several ways to speed up this library slightly:
  //     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
  //         -- this should especially focus on being fast when raising 2 to a power mod n
  //     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
  //     - tune the parameters in randTruePrime_(), including c, m, and recLimit
  //     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
  //       within the loop when all the parameters are the same length.
  //
  // There are several ideas that look like they wouldn't help much at all:
  //     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
  //     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
  //     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
  //       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
  //       method would be slower.  This is unfortunate because the code currently spends almost all of its time
  //       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
  //       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
  //       sentences that seem to imply it's faster to do a non-modular square followed by a single
  //       Montgomery reduction, but that's obviously wrong.
  ////////////////////////////////////////////////////////////////////////////////////////
  (function (factory) {
    if (typeof exports === 'object') {
      // CommonJS
      factory($__require, exports, module);
    } else if (typeof undefined === 'function') {
      // AMD requirejs
      define(factory);
    } else {
      // Plain script tag
      var _module = {};
      _module.exports = {};
      var _require = function (name) {
        throw new Error("can't require");
      };
      factory(_require, _module.exports, _module);
      window.BigInt = _module.exports;
    }
  })(function (require, exports, module) {
    "use strict";

    var trueRandom = function () {
      return Math.random();
    };

    function setRandom(random) {
      trueRandom = random;
    }

    //globals
    var bpe = 0; //bits stored per array element
    var mask = 0; //AND this with an array element to chop it down to bpe bits
    var radix = mask + 1; //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

    //the digits for converting to different bases
    var digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

    //initialize the global variables
    for (bpe = 0; 1 << bpe + 1 > 1 << bpe; bpe++); //bpe=number of bits in the mantissa on this platform
    bpe >>= 1; //bpe=number of bits in one element of the array representing the bigInt
    mask = (1 << bpe) - 1; //AND the mask with an integer to get its bpe least significant bits
    radix = mask + 1; //2^bpe.  a single 1 bit to the left of the first bit of mask
    var one = int2bigInt(1, 1, 1); //constant used in powMod_()

    //the following global variables are scratchpad memory to
    //reduce dynamic memory allocation in the inner loop
    var t = new Array(0);
    var ss = t; //used in mult_()
    var s0 = t; //used in multMod_(), squareMod_()
    var s1 = t; //used in powMod_(), multMod_(), squareMod_()
    var s2 = t; //used in powMod_(), multMod_()
    var s3 = t; //used in powMod_()
    var s4 = t,
        s5 = t; //used in mod_()
    var s6 = t; //used in bigInt2str()
    var s7 = t; //used in powMod_()
    var T = t; //used in GCD_()
    var sa = t; //used in mont_()
    var mr_x1 = t,
        mr_r = t,
        mr_a = t; //used in millerRabin()
    var eg_v = t,
        eg_u = t,
        eg_A = t,
        eg_B = t,
        eg_C = t,
        eg_D = t; //used in eGCD_(), inverseMod_()
    var md_q1 = t,
        md_q2 = t,
        md_q3 = t,
        md_r = t,
        md_r1 = t,
        md_r2 = t,
        md_tt = t; //used in mod_()

    var primes = t,
        pows = t,
        s_i = t,
        s_i2 = t,
        s_R = t,
        s_rm = t,
        s_q = t,
        s_n1 = t;
    var s_a = t,
        s_r2 = t,
        s_n = t,
        s_b = t,
        s_d = t,
        s_x1 = t,
        s_x2 = t,
        s_aa = t; //used in randTruePrime_()

    var rpprb = t; //used in randProbPrimeRounds() (which also uses "primes")

    ////////////////////////////////////////////////////////////////////////////////////////


    //return array of all primes less than integer n
    function findPrimes(n) {
      var i, s, p, ans;
      s = new Array(n);
      for (i = 0; i < n; i++) s[i] = 0;
      s[0] = 2;
      p = 0; //first p elements of s are primes, the rest are a sieve
      for (; s[p] < n;) {
        //s[p] is the pth prime
        for (i = s[p] * s[p]; i < n; i += s[p]) //mark multiples of s[p]
        s[i] = 1;
        p++;
        s[p] = s[p - 1] + 1;
        for (; s[p] < n && s[s[p]]; s[p]++); //find next prime (where s[p]==0)
      }
      ans = new Array(p);
      for (i = 0; i < p; i++) ans[i] = s[i];
      return ans;
    }

    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x is a bigInt, and b is an integer, with b<x
    function millerRabinInt(x, b) {
      if (mr_x1.length != x.length) {
        mr_x1 = dup(x);
        mr_r = dup(x);
        mr_a = dup(x);
      }

      copyInt_(mr_a, b);
      return millerRabin(x, mr_a);
    }

    //does a single round of Miller-Rabin base b consider x to be a possible prime?
    //x and b are bigInts with b<x
    function millerRabin(x, b) {
      var i, j, k, s;

      if (mr_x1.length != x.length) {
        mr_x1 = dup(x);
        mr_r = dup(x);
        mr_a = dup(x);
      }

      copy_(mr_a, b);
      copy_(mr_r, x);
      copy_(mr_x1, x);

      addInt_(mr_r, -1);
      addInt_(mr_x1, -1);

      //s=the highest power of two that divides mr_r
      k = 0;
      for (i = 0; i < mr_r.length; i++) for (j = 1; j < mask; j <<= 1) if (x[i] & j) {
        s = k < mr_r.length + bpe ? k : 0;
        i = mr_r.length;
        j = mask;
      } else k++;

      if (s) rightShift_(mr_r, s);

      powMod_(mr_a, mr_r, x);

      if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
        j = 1;
        while (j <= s - 1 && !equals(mr_a, mr_x1)) {
          squareMod_(mr_a, x);
          if (equalsInt(mr_a, 1)) {
            return 0;
          }
          j++;
        }
        if (!equals(mr_a, mr_x1)) {
          return 0;
        }
      }
      return 1;
    }

    //returns how many bits long the bigInt is, not counting leading zeros.
    function bitSize(x) {
      var j, z, w;
      for (j = x.length - 1; x[j] == 0 && j > 0; j--);
      for (z = 0, w = x[j]; w; w >>= 1, z++);
      z += bpe * j;
      return z;
    }

    //return a copy of x with at least n elements, adding leading zeros if needed
    function expand(x, n) {
      var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
      copy_(ans, x);
      return ans;
    }

    //return a k-bit true random prime using Maurer's algorithm.
    function randTruePrime(k) {
      var ans = int2bigInt(0, k, 0);
      randTruePrime_(ans, k);
      return trim(ans, 1);
    }

    //return a k-bit random probable prime with probability of error < 2^-80
    function randProbPrime(k) {
      if (k >= 600) return randProbPrimeRounds(k, 2); //numbers from HAC table 4.3
      if (k >= 550) return randProbPrimeRounds(k, 4);
      if (k >= 500) return randProbPrimeRounds(k, 5);
      if (k >= 400) return randProbPrimeRounds(k, 6);
      if (k >= 350) return randProbPrimeRounds(k, 7);
      if (k >= 300) return randProbPrimeRounds(k, 9);
      if (k >= 250) return randProbPrimeRounds(k, 12); //numbers from HAC table 4.4
      if (k >= 200) return randProbPrimeRounds(k, 15);
      if (k >= 150) return randProbPrimeRounds(k, 18);
      if (k >= 100) return randProbPrimeRounds(k, 27);
      return randProbPrimeRounds(k, 40); //number from HAC remark 4.26 (only an estimate)
    }

    //return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)
    function randProbPrimeRounds(k, n) {
      var ans, i, divisible, B;
      B = 30000; //B is largest prime to use in trial division
      ans = int2bigInt(0, k, 0);

      //optimization: try larger and smaller B to find the best limit.

      if (primes.length == 0) primes = findPrimes(30000); //check for divisibility by primes <=30000

      if (rpprb.length != ans.length) rpprb = dup(ans);

      for (;;) {
        //keep trying random values for ans until one appears to be prime
        //optimization: pick a random number times L=2*3*5*...*p, plus a
        //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
        //   This can reduce the amount of random number generation.

        randBigInt_(ans, k, 0); //ans = a random odd number to check
        ans[0] |= 1;
        divisible = 0;

        //check ans for divisibility by small primes up to B
        for (i = 0; i < primes.length && primes[i] <= B; i++) if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {
          divisible = 1;
          break;
        }

        //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.

        //do n rounds of Miller Rabin, with random bases less than ans
        for (i = 0; i < n && !divisible; i++) {
          randBigInt_(rpprb, k, 0);
          while (!greater(ans, rpprb)) //pick a random rpprb that's < ans
          randBigInt_(rpprb, k, 0);
          if (!millerRabin(ans, rpprb)) divisible = 1;
        }

        if (!divisible) return ans;
      }
    }

    //return a new bigInt equal to (x mod n) for bigInts x and n.
    function mod(x, n) {
      var ans = dup(x);
      mod_(ans, n);
      return trim(ans, 1);
    }

    //return (x+n) where x is a bigInt and n is an integer.
    function addInt(x, n) {
      var ans = expand(x, x.length + 1);
      addInt_(ans, n);
      return trim(ans, 1);
    }

    //return x*y for bigInts x and y. This is faster when y<x.
    function mult(x, y) {
      var ans = expand(x, x.length + y.length);
      mult_(ans, y);
      return trim(ans, 1);
    }

    //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
    function powMod(x, y, n) {
      var ans = expand(x, n.length);
      powMod_(ans, trim(y, 2), trim(n, 2), 0); //this should work without the trim, but doesn't
      return trim(ans, 1);
    }

    //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
    function sub(x, y) {
      var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
      sub_(ans, y);
      return trim(ans, 1);
    }

    //return (x+y) for bigInts x and y.
    function add(x, y) {
      var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);
      add_(ans, y);
      return trim(ans, 1);
    }

    //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
    function inverseMod(x, n) {
      var ans = expand(x, n.length);
      var s;
      s = inverseMod_(ans, n);
      return s ? trim(ans, 1) : null;
    }

    //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
    function multMod(x, y, n) {
      var ans = expand(x, n.length);
      multMod_(ans, y, n);
      return trim(ans, 1);
    }

    //generate a k-bit true random prime using Maurer's algorithm,
    //and put it into ans.  The bigInt ans must be large enough to hold it.
    function randTruePrime_(ans, k) {
      var c, m, pm, dd, j, r, B, divisible, z, zz, recSize;

      if (primes.length == 0) primes = findPrimes(30000); //check for divisibility by primes <=30000

      if (pows.length == 0) {
        pows = new Array(512);
        for (j = 0; j < 512; j++) {
          pows[j] = Math.pow(2, j / 511. - 1.);
        }
      }

      //c and m should be tuned for a particular machine and value of k, to maximize speed
      c = 0.1; //c=0.1 in HAC
      m = 20; //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
      var recLimit = 20; //stop recursion when k <=recLimit.  Must have recLimit >= 2

      if (s_i2.length != ans.length) {
        s_i2 = dup(ans);
        s_R = dup(ans);
        s_n1 = dup(ans);
        s_r2 = dup(ans);
        s_d = dup(ans);
        s_x1 = dup(ans);
        s_x2 = dup(ans);
        s_b = dup(ans);
        s_n = dup(ans);
        s_i = dup(ans);
        s_rm = dup(ans);
        s_q = dup(ans);
        s_a = dup(ans);
        s_aa = dup(ans);
      }

      if (k <= recLimit) {
        //generate small random primes by trial division up to its square root
        pm = (1 << (k + 2 >> 1)) - 1; //pm is binary number with all ones, just over sqrt(2^k)
        copyInt_(ans, 0);
        for (dd = 1; dd;) {
          dd = 0;
          ans[0] = 1 | 1 << k - 1 | Math.floor(trueRandom() * (1 << k)); //random, k-bit, odd integer, with msb 1
          for (j = 1; j < primes.length && (primes[j] & pm) == primes[j]; j++) {
            //trial division by all primes 3...sqrt(2^k)
            if (0 == ans[0] % primes[j]) {
              dd = 1;
              break;
            }
          }
        }
        carry_(ans);
        return;
      }

      B = c * k * k; //try small primes up to B (or all the primes[] array if the largest is less than B).
      if (k > 2 * m) //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
        for (r = 1; k - k * r <= m;) r = pows[Math.floor(trueRandom() * 512)]; //r=Math.pow(2,Math.random()-1);
      else r = .5;

      //simulation suggests the more complex algorithm using r=.333 is only slightly faster.

      recSize = Math.floor(r * k) + 1;

      randTruePrime_(s_q, recSize);
      copyInt_(s_i2, 0);
      s_i2[Math.floor((k - 2) / bpe)] |= 1 << (k - 2) % bpe; //s_i2=2^(k-2)
      divide_(s_i2, s_q, s_i, s_rm); //s_i=floor((2^(k-1))/(2q))

      z = bitSize(s_i);

      for (;;) {
        for (;;) {
          //generate z-bit numbers until one falls in the range [0,s_i-1]
          randBigInt_(s_R, z, 0);
          if (greater(s_i, s_R)) break;
        } //now s_R is in the range [0,s_i-1]
        addInt_(s_R, 1); //now s_R is in the range [1,s_i]
        add_(s_R, s_i); //now s_R is in the range [s_i+1,2*s_i]

        copy_(s_n, s_q);
        mult_(s_n, s_R);
        multInt_(s_n, 2);
        addInt_(s_n, 1); //s_n=2*s_R*s_q+1

        copy_(s_r2, s_R);
        multInt_(s_r2, 2); //s_r2=2*s_R

        //check s_n for divisibility by small primes up to B
        for (divisible = 0, j = 0; j < primes.length && primes[j] < B; j++) if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {
          divisible = 1;
          break;
        }

        if (!divisible) //if it passes small primes check, then try a single Miller-Rabin base 2
          if (!millerRabinInt(s_n, 2)) //this line represents 75% of the total runtime for randTruePrime_
            divisible = 1;

        if (!divisible) {
          //if it passes that test, continue checking s_n
          addInt_(s_n, -3);
          for (j = s_n.length - 1; s_n[j] == 0 && j > 0; j--); //strip leading zeros
          for (zz = 0, w = s_n[j]; w; w >>= 1, zz++);
          zz += bpe * j; //zz=number of bits in s_n, ignoring leading zeros
          for (;;) {
            //generate z-bit numbers until one falls in the range [0,s_n-1]
            randBigInt_(s_a, zz, 0);
            if (greater(s_n, s_a)) break;
          } //now s_a is in the range [0,s_n-1]
          addInt_(s_n, 3); //now s_a is in the range [0,s_n-4]
          addInt_(s_a, 2); //now s_a is in the range [2,s_n-2]
          copy_(s_b, s_a);
          copy_(s_n1, s_n);
          addInt_(s_n1, -1);
          powMod_(s_b, s_n1, s_n); //s_b=s_a^(s_n-1) modulo s_n
          addInt_(s_b, -1);
          if (isZero(s_b)) {
            copy_(s_b, s_a);
            powMod_(s_b, s_r2, s_n);
            addInt_(s_b, -1);
            copy_(s_aa, s_n);
            copy_(s_d, s_b);
            GCD_(s_d, s_n); //if s_b and s_n are relatively prime, then s_n is a prime
            if (equalsInt(s_d, 1)) {
              copy_(ans, s_aa);
              return; //if we've made it this far, then s_n is absolutely guaranteed to be prime
            }
          }
        }
      }
    }

    //Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
    function randBigInt(n, s) {
      var a, b;
      a = Math.floor((n - 1) / bpe) + 2; //# array elements to hold the BigInt with a leading 0 element
      b = int2bigInt(0, 0, a);
      randBigInt_(b, n, s);
      return b;
    }

    //Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
    //Array b must be big enough to hold the result. Must have n>=1
    function randBigInt_(b, n, s) {
      var i, a;
      for (i = 0; i < b.length; i++) b[i] = 0;
      a = Math.floor((n - 1) / bpe) + 1; //# array elements to hold the BigInt
      for (i = 0; i < a; i++) {
        b[i] = Math.floor(trueRandom() * (1 << bpe - 1));
      }
      b[a - 1] &= (2 << (n - 1) % bpe) - 1;
      if (s == 1) b[a - 1] |= 1 << (n - 1) % bpe;
    }

    //Return the greatest common divisor of bigInts x and y (each with same number of elements).
    function GCD(x, y) {
      var xc, yc;
      xc = dup(x);
      yc = dup(y);
      GCD_(xc, yc);
      return xc;
    }

    //set x to the greatest common divisor of bigInts x and y (each with same number of elements).
    //y is destroyed.
    function GCD_(x, y) {
      var i, xp, yp, A, B, C, D, q, sing;
      if (T.length != x.length) T = dup(x);

      sing = 1;
      while (sing) {
        //while y has nonzero elements other than y[0]
        sing = 0;
        for (i = 1; i < y.length; i++) //check if y has nonzero elements other than 0
        if (y[i]) {
          sing = 1;
          break;
        }
        if (!sing) break; //quit when y all zero elements except possibly y[0]

        for (i = x.length; !x[i] && i >= 0; i--); //find most significant element of x
        xp = x[i];
        yp = y[i];
        A = 1;B = 0;C = 0;D = 1;
        while (yp + C && yp + D) {
          q = Math.floor((xp + A) / (yp + C));
          var qp = Math.floor((xp + B) / (yp + D));
          if (q != qp) break;
          t = A - q * C;A = C;C = t; //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)
          t = B - q * D;B = D;D = t;
          t = xp - q * yp;xp = yp;yp = t;
        }
        if (B) {
          copy_(T, x);
          linComb_(x, y, A, B); //x=A*x+B*y
          linComb_(y, T, D, C); //y=D*y+C*T
        } else {
          mod_(x, y);
          copy_(T, x);
          copy_(x, y);
          copy_(y, T);
        }
      }
      if (y[0] == 0) return;
      t = modInt(x, y[0]);
      copyInt_(x, y[0]);
      y[0] = t;
      while (y[0]) {
        x[0] %= y[0];
        t = x[0];x[0] = y[0];y[0] = t;
      }
    }

    //do x=x**(-1) mod n, for bigInts x and n.
    //If no inverse exists, it sets x to zero and returns 0, else it returns 1.
    //The x array must be at least as large as the n array.
    function inverseMod_(x, n) {
      var k = 1 + 2 * Math.max(x.length, n.length);

      if (!(x[0] & 1) && !(n[0] & 1)) {
        //if both inputs are even, then inverse doesn't exist
        copyInt_(x, 0);
        return 0;
      }

      if (eg_u.length != k) {
        eg_u = new Array(k);
        eg_v = new Array(k);
        eg_A = new Array(k);
        eg_B = new Array(k);
        eg_C = new Array(k);
        eg_D = new Array(k);
      }

      copy_(eg_u, x);
      copy_(eg_v, n);
      copyInt_(eg_A, 1);
      copyInt_(eg_B, 0);
      copyInt_(eg_C, 0);
      copyInt_(eg_D, 1);
      for (;;) {
        while (!(eg_u[0] & 1)) {
          //while eg_u is even
          halve_(eg_u);
          if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
            //if eg_A==eg_B==0 mod 2
            halve_(eg_A);
            halve_(eg_B);
          } else {
            add_(eg_A, n);halve_(eg_A);
            sub_(eg_B, x);halve_(eg_B);
          }
        }

        while (!(eg_v[0] & 1)) {
          //while eg_v is even
          halve_(eg_v);
          if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
            //if eg_C==eg_D==0 mod 2
            halve_(eg_C);
            halve_(eg_D);
          } else {
            add_(eg_C, n);halve_(eg_C);
            sub_(eg_D, x);halve_(eg_D);
          }
        }

        if (!greater(eg_v, eg_u)) {
          //eg_v <= eg_u
          sub_(eg_u, eg_v);
          sub_(eg_A, eg_C);
          sub_(eg_B, eg_D);
        } else {
          //eg_v > eg_u
          sub_(eg_v, eg_u);
          sub_(eg_C, eg_A);
          sub_(eg_D, eg_B);
        }

        if (equalsInt(eg_u, 0)) {
          while (negative(eg_C)) //make sure answer is nonnegative
          add_(eg_C, n);
          copy_(x, eg_C);

          if (!equalsInt(eg_v, 1)) {
            //if GCD_(x,n)!=1, then there is no inverse
            copyInt_(x, 0);
            return 0;
          }
          return 1;
        }
      }
    }

    //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
    function inverseModInt(x, n) {
      var a = 1,
          b = 0,
          t;
      for (;;) {
        if (x == 1) return a;
        if (x == 0) return 0;
        b -= a * Math.floor(n / x);
        n %= x;

        if (n == 1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
        if (n == 0) return 0;
        a -= b * Math.floor(x / n);
        x %= n;
      }
    }

    //this deprecated function is for backward compatibility only.
    function inverseModInt_(x, n) {
      return inverseModInt(x, n);
    }

    //Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
    //     v = GCD_(x,y) = a*x-b*y
    //The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
    function eGCD_(x, y, v, a, b) {
      var g = 0;
      var k = Math.max(x.length, y.length);
      if (eg_u.length != k) {
        eg_u = new Array(k);
        eg_A = new Array(k);
        eg_B = new Array(k);
        eg_C = new Array(k);
        eg_D = new Array(k);
      }
      while (!(x[0] & 1) && !(y[0] & 1)) {
        //while x and y both even
        halve_(x);
        halve_(y);
        g++;
      }
      copy_(eg_u, x);
      copy_(v, y);
      copyInt_(eg_A, 1);
      copyInt_(eg_B, 0);
      copyInt_(eg_C, 0);
      copyInt_(eg_D, 1);
      for (;;) {
        while (!(eg_u[0] & 1)) {
          //while u is even
          halve_(eg_u);
          if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {
            //if A==B==0 mod 2
            halve_(eg_A);
            halve_(eg_B);
          } else {
            add_(eg_A, y);halve_(eg_A);
            sub_(eg_B, x);halve_(eg_B);
          }
        }

        while (!(v[0] & 1)) {
          //while v is even
          halve_(v);
          if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {
            //if C==D==0 mod 2
            halve_(eg_C);
            halve_(eg_D);
          } else {
            add_(eg_C, y);halve_(eg_C);
            sub_(eg_D, x);halve_(eg_D);
          }
        }

        if (!greater(v, eg_u)) {
          //v<=u
          sub_(eg_u, v);
          sub_(eg_A, eg_C);
          sub_(eg_B, eg_D);
        } else {
          //v>u
          sub_(v, eg_u);
          sub_(eg_C, eg_A);
          sub_(eg_D, eg_B);
        }
        if (equalsInt(eg_u, 0)) {
          while (negative(eg_C)) {
            //make sure a (C) is nonnegative
            add_(eg_C, y);
            sub_(eg_D, x);
          }
          multInt_(eg_D, -1); ///make sure b (D) is nonnegative
          copy_(a, eg_C);
          copy_(b, eg_D);
          leftShift_(v, g);
          return;
        }
      }
    }

    //is bigInt x negative?
    function negative(x) {
      return x[x.length - 1] >> bpe - 1 & 1;
    }

    //is (x << (shift*bpe)) > y?
    //x and y are nonnegative bigInts
    //shift is a nonnegative integer
    function greaterShift(x, y, shift) {
      var i,
          kx = x.length,
          ky = y.length;
      var k = kx + shift < ky ? kx + shift : ky;
      for (i = ky - 1 - shift; i < kx && i >= 0; i++) if (x[i] > 0) return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
      for (i = kx - 1 + shift; i < ky; i++) if (y[i] > 0) return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
      for (i = k - 1; i >= shift; i--) if (x[i - shift] > y[i]) return 1;else if (x[i - shift] < y[i]) return 0;
      return 0;
    }

    //is x > y? (x and y both nonnegative)
    function greater(x, y) {
      var i;
      var k = x.length < y.length ? x.length : y.length;

      for (i = x.length; i < y.length; i++) if (y[i]) return 0; //y has more digits

      for (i = y.length; i < x.length; i++) if (x[i]) return 1; //x has more digits

      for (i = k - 1; i >= 0; i--) if (x[i] > y[i]) return 1;else if (x[i] < y[i]) return 0;
      return 0;
    }

    //divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
    //x must have at least one leading zero element.
    //y must be nonzero.
    //q and r must be arrays that are exactly the same length as x. (Or q can have more).
    //Must have x.length >= y.length >= 2.
    function divide_(x, y, q, r) {
      var kx, ky;
      var i, j, y1, y2, c, a, b;
      copy_(r, x);
      for (ky = y.length; y[ky - 1] == 0; ky--); //ky is number of elements in y, not including leading zeros

      //normalize: ensure the most significant element of y has its highest bit set
      b = y[ky - 1];
      for (a = 0; b; a++) b >>= 1;
      a = bpe - a; //a is how many bits to shift so that the high order bit of y is leftmost in its array element
      leftShift_(y, a); //multiply both by 1<<a now, then divide both by that at the end
      leftShift_(r, a);

      //Rob Visser discovered a bug: the following line was originally just before the normalization.
      for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--); //kx is number of elements in normalized x, not including leading zeros

      copyInt_(q, 0); // q=0
      while (!greaterShift(y, r, kx - ky)) {
        // while (leftShift_(y,kx-ky) <= r) {
        subShift_(r, y, kx - ky); //   r=r-leftShift_(y,kx-ky)
        q[kx - ky]++; //   q[kx-ky]++;
      } // }

      for (i = kx - 1; i >= ky; i--) {
        if (r[i] == y[ky - 1]) q[i - ky] = mask;else q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);

        //The following for(;;) loop is equivalent to the commented while loop,
        //except that the uncommented version avoids overflow.
        //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
        //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
        //    q[i-ky]--;
        for (;;) {
          y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
          c = y2 >> bpe;
          y2 = y2 & mask;
          y1 = c + q[i - ky] * y[ky - 1];
          c = y1 >> bpe;
          y1 = y1 & mask;

          if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i]) q[i - ky]--;else break;
        }

        linCombShift_(r, y, -q[i - ky], i - ky); //r=r-q[i-ky]*leftShift_(y,i-ky)
        if (negative(r)) {
          addShift_(r, y, i - ky); //r=r+leftShift_(y,i-ky)
          q[i - ky]--;
        }
      }

      rightShift_(y, a); //undo the normalization step
      rightShift_(r, a); //undo the normalization step
    }

    //do carries and borrows so each element of the bigInt x fits in bpe bits.
    function carry_(x) {
      var i, k, c, b;
      k = x.length;
      c = 0;
      for (i = 0; i < k; i++) {
        c += x[i];
        b = 0;
        if (c < 0) {
          b = -(c >> bpe);
          c += b * radix;
        }
        x[i] = c & mask;
        c = (c >> bpe) - b;
      }
    }

    //return x mod n for bigInt x and integer n.
    function modInt(x, n) {
      var i,
          c = 0;
      for (i = x.length - 1; i >= 0; i--) c = (c * radix + x[i]) % n;
      return c;
    }

    //convert the integer t into a bigInt with at least the given number of bits.
    //the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
    //Pad the array with leading zeros so that it has at least minSize elements.
    //There will always be at least one leading 0 element.
    function int2bigInt(t, bits, minSize) {
      var i, k;
      k = Math.ceil(bits / bpe) + 1;
      k = minSize > k ? minSize : k;
      var buff = new Array(k);
      copyInt_(buff, t);
      return buff;
    }

    //return the bigInt given a string representation in a given base.
    //Pad the array with leading zeros so that it has at least minSize elements.
    //If base=-1, then it reads in a space-separated list of array elements in decimal.
    //The array will always have at least one leading zero, unless base=-1.
    function str2bigInt(s, b, minSize) {
      var d, i, j, base, str, x, y, kk;
      if (typeof b === 'string') {
        base = b.length;
        str = b;
      } else {
        base = b;
        str = digitsStr;
      }
      var k = s.length;
      if (base == -1) {
        //comma-separated list of array elements in decimal
        x = new Array(0);
        for (;;) {
          y = new Array(x.length + 1);
          for (i = 0; i < x.length; i++) y[i + 1] = x[i];
          y[0] = parseInt(s, 10);
          x = y;
          d = s.indexOf(',', 0);
          if (d < 1) break;
          s = s.substring(d + 1);
          if (s.length == 0) break;
        }
        if (x.length < minSize) {
          y = new Array(minSize);
          copy_(y, x);
          return y;
        }
        return x;
      }

      x = int2bigInt(0, base * k, 0);
      for (i = 0; i < k; i++) {
        d = str.indexOf(s.substring(i, i + 1), 0);
        if (base <= 36 && d >= 36) {
          //convert lowercase to uppercase if base<=36
          d -= 26;
        }
        if (d >= base || d < 0) {
          //ignore illegal characters
          continue;
        }
        multInt_(x, base);
        addInt_(x, d);
      }

      for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
      k = minSize > k + 1 ? minSize : k + 1;
      y = new Array(k);
      kk = k < x.length ? k : x.length;
      for (i = 0; i < kk; i++) y[i] = x[i];
      for (; i < k; i++) y[i] = 0;
      return y;
    }

    //is bigint x equal to integer y?
    //y must have less than bpe bits
    function equalsInt(x, y) {
      var i;
      if (x[0] != y) return 0;
      for (i = 1; i < x.length; i++) if (x[i]) return 0;
      return 1;
    }

    //are bigints x and y equal?
    //this works even if x and y are different lengths and have arbitrarily many leading zeros
    function equals(x, y) {
      var i;
      var k = x.length < y.length ? x.length : y.length;
      for (i = 0; i < k; i++) if (x[i] != y[i]) return 0;
      if (x.length > y.length) {
        for (; i < x.length; i++) if (x[i]) return 0;
      } else {
        for (; i < y.length; i++) if (y[i]) return 0;
      }
      return 1;
    }

    //is the bigInt x equal to zero?
    function isZero(x) {
      var i;
      for (i = 0; i < x.length; i++) if (x[i]) return 0;
      return 1;
    }

    //convert a bigInt into a string in a given base, from base 2 up to base 95.
    //Base -1 prints the contents of the array representing the number.
    function bigInt2str(x, b) {
      var i,
          t,
          base,
          str,
          s = "";
      if (typeof b === 'string') {
        base = b.length;
        str = b;
      } else {
        base = b;
        str = digitsStr;
      }

      if (s6.length != x.length) s6 = dup(x);else copy_(s6, x);

      if (base == -1) {
        //return the list of array contents
        for (i = x.length - 1; i > 0; i--) s += x[i] + ',';
        s += x[0];
      } else {
        //return it in the given base
        while (!isZero(s6)) {
          t = divInt_(s6, base); //t=s6 % base; s6=floor(s6/base);
          s = str.substring(t, t + 1) + s;
        }
      }
      if (s.length == 0) s = str[0];
      return s;
    }

    //returns a duplicate of bigInt x
    function dup(x) {
      var i;
      var buff = new Array(x.length);
      copy_(buff, x);
      return buff;
    }

    //do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
    function copy_(x, y) {
      var i;
      var k = x.length < y.length ? x.length : y.length;
      for (i = 0; i < k; i++) x[i] = y[i];
      for (i = k; i < x.length; i++) x[i] = 0;
    }

    //do x=y on bigInt x and integer y.
    function copyInt_(x, n) {
      var i, c;
      for (c = n, i = 0; i < x.length; i++) {
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x+n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function addInt_(x, n) {
      var i, k, c, b;
      x[0] += n;
      k = x.length;
      c = 0;
      for (i = 0; i < k; i++) {
        c += x[i];
        b = 0;
        if (c < 0) {
          b = -(c >> bpe);
          c += b * radix;
        }
        x[i] = c & mask;
        c = (c >> bpe) - b;
        if (!c) return; //stop carrying as soon as the carry is zero
      }
    }

    //right shift bigInt x by n bits.  0 <= n < bpe.
    function rightShift_(x, n) {
      var i;
      var k = Math.floor(n / bpe);
      if (k) {
        for (i = 0; i < x.length - k; i++) //right shift x by k elements
        x[i] = x[i + k];
        for (; i < x.length; i++) x[i] = 0;
        n %= bpe;
      }
      for (i = 0; i < x.length - 1; i++) {
        x[i] = mask & (x[i + 1] << bpe - n | x[i] >> n);
      }
      x[i] >>= n;
    }

    //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
    function halve_(x) {
      var i;
      for (i = 0; i < x.length - 1; i++) {
        x[i] = mask & (x[i + 1] << bpe - 1 | x[i] >> 1);
      }
      x[i] = x[i] >> 1 | x[i] & radix >> 1; //most significant bit stays the same
    }

    //left shift bigInt x by n bits.
    function leftShift_(x, n) {
      var i;
      var k = Math.floor(n / bpe);
      if (k) {
        for (i = x.length; i >= k; i--) //left shift x by k elements
        x[i] = x[i - k];
        for (; i >= 0; i--) x[i] = 0;
        n %= bpe;
      }
      if (!n) return;
      for (i = x.length - 1; i > 0; i--) {
        x[i] = mask & (x[i] << n | x[i - 1] >> bpe - n);
      }
      x[i] = mask & x[i] << n;
    }

    //do x=x*n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    function multInt_(x, n) {
      var i, k, c, b;
      if (!n) return;
      k = x.length;
      c = 0;
      for (i = 0; i < k; i++) {
        c += x[i] * n;
        b = 0;
        if (c < 0) {
          b = -(c >> bpe);
          c += b * radix;
        }
        x[i] = c & mask;
        c = (c >> bpe) - b;
      }
    }

    //do x=floor(x/n) for bigInt x and integer n, and return the remainder
    function divInt_(x, n) {
      var i,
          r = 0,
          s;
      for (i = x.length - 1; i >= 0; i--) {
        s = r * radix + x[i];
        x[i] = Math.floor(s / n);
        r = s % n;
      }
      return r;
    }

    //do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
    //x must be large enough to hold the answer.
    function linComb_(x, y, a, b) {
      var i, c, k, kk;
      k = x.length < y.length ? x.length : y.length;
      kk = x.length;
      for (c = 0, i = 0; i < k; i++) {
        c += a * x[i] + b * y[i];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; i < kk; i++) {
        c += a * x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
    //x must be large enough to hold the answer.
    function linCombShift_(x, y, b, ys) {
      var i, c, k, kk;
      k = x.length < ys + y.length ? x.length : ys + y.length;
      kk = x.length;
      for (c = 0, i = ys; i < k; i++) {
        c += x[i] + b * y[i - ys];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; c && i < kk; i++) {
        c += x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x+(y<<(ys*bpe)) for bigInts x and y, and integer ys.
    //x must be large enough to hold the answer.
    function addShift_(x, y, ys) {
      var i, c, k, kk;
      k = x.length < ys + y.length ? x.length : ys + y.length;
      kk = x.length;
      for (c = 0, i = ys; i < k; i++) {
        c += x[i] + y[i - ys];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; c && i < kk; i++) {
        c += x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x-(y<<(ys*bpe)) for bigInts x and y, and integer ys.
    //x must be large enough to hold the answer.
    function subShift_(x, y, ys) {
      var i, c, k, kk;
      k = x.length < ys + y.length ? x.length : ys + y.length;
      kk = x.length;
      for (c = 0, i = ys; i < k; i++) {
        c += x[i] - y[i - ys];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; c && i < kk; i++) {
        c += x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x-y for bigInts x and y.
    //x must be large enough to hold the answer.
    //negative answers will be 2s complement
    function sub_(x, y) {
      var i, c, k, kk;
      k = x.length < y.length ? x.length : y.length;
      for (c = 0, i = 0; i < k; i++) {
        c += x[i] - y[i];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; c && i < x.length; i++) {
        c += x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x+y for bigInts x and y.
    //x must be large enough to hold the answer.
    function add_(x, y) {
      var i, c, k, kk;
      k = x.length < y.length ? x.length : y.length;
      for (c = 0, i = 0; i < k; i++) {
        c += x[i] + y[i];
        x[i] = c & mask;
        c >>= bpe;
      }
      for (i = k; c && i < x.length; i++) {
        c += x[i];
        x[i] = c & mask;
        c >>= bpe;
      }
    }

    //do x=x*y for bigInts x and y.  This is faster when y<x.
    function mult_(x, y) {
      var i;
      if (ss.length != 2 * x.length) ss = new Array(2 * x.length);
      copyInt_(ss, 0);
      for (i = 0; i < y.length; i++) if (y[i]) linCombShift_(ss, x, y[i], i); //ss=1*ss+y[i]*(x<<(i*bpe))
      copy_(x, ss);
    }

    //do x=x mod n for bigInts x and n.
    function mod_(x, n) {
      if (s4.length != x.length) s4 = dup(x);else copy_(s4, x);
      if (s5.length != x.length) s5 = dup(x);
      divide_(s4, n, s5, x); //x = remainder of s4 / n
    }

    //do x=x*y mod n for bigInts x,y,n.
    //for greater speed, let y<x.
    function multMod_(x, y, n) {
      var i;
      if (s0.length != 2 * x.length) s0 = new Array(2 * x.length);
      copyInt_(s0, 0);
      for (i = 0; i < y.length; i++) if (y[i]) linCombShift_(s0, x, y[i], i); //s0=1*s0+y[i]*(x<<(i*bpe))
      mod_(s0, n);
      copy_(x, s0);
    }

    //do x=x*x mod n for bigInts x,n.
    function squareMod_(x, n) {
      var i, j, d, c, kx, kn, k;
      for (kx = x.length; kx > 0 && !x[kx - 1]; kx--); //ignore leading zeros in x
      k = kx > n.length ? 2 * kx : 2 * n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
      if (s0.length != k) s0 = new Array(k);
      copyInt_(s0, 0);
      for (i = 0; i < kx; i++) {
        c = s0[2 * i] + x[i] * x[i];
        s0[2 * i] = c & mask;
        c >>= bpe;
        for (j = i + 1; j < kx; j++) {
          c = s0[i + j] + 2 * x[i] * x[j] + c;
          s0[i + j] = c & mask;
          c >>= bpe;
        }
        s0[i + kx] = c;
      }
      mod_(s0, n);
      copy_(x, s0);
    }

    //return x with exactly k leading zero elements
    function trim(x, k) {
      var i, y;
      for (i = x.length; i > 0 && !x[i - 1]; i--);
      y = new Array(i + k);
      copy_(y, x);
      return y;
    }

    //do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
    //this is faster when n is odd.  x usually needs to have as many elements as n.
    function powMod_(x, y, n) {
      var k1, k2, kn, np;
      if (s7.length != n.length) s7 = dup(n);

      //for even modulus, use a simple square-and-multiply algorithm,
      //rather than using the more complex Montgomery algorithm.
      if ((n[0] & 1) == 0) {
        copy_(s7, x);
        copyInt_(x, 1);
        while (!equalsInt(y, 0)) {
          if (y[0] & 1) multMod_(x, s7, n);
          divInt_(y, 2);
          squareMod_(s7, n);
        }
        return;
      }

      //calculate np from n for the Montgomery multiplications
      copyInt_(s7, 0);
      for (kn = n.length; kn > 0 && !n[kn - 1]; kn--);
      np = radix - inverseModInt(modInt(n, radix), radix);
      s7[kn] = 1;
      multMod_(x, s7, n); // x = x * 2**(kn*bp) mod n

      if (s3.length != x.length) s3 = dup(x);else copy_(s3, x);

      for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--); //k1=first nonzero element of y
      if (y[k1] == 0) {
        //anything to the 0th power is 1
        copyInt_(x, 1);
        return;
      }
      for (k2 = 1 << bpe - 1; k2 && !(y[k1] & k2); k2 >>= 1); //k2=position of first 1 bit in y[k1]
      for (;;) {
        if (!(k2 >>= 1)) {
          //look at next bit of y
          k1--;
          if (k1 < 0) {
            mont_(x, one, n, np);
            return;
          }
          k2 = 1 << bpe - 1;
        }
        mont_(x, x, n, np);

        if (k2 & y[k1]) //if next bit is a 1
          mont_(x, s3, n, np);
      }
    }

    //do x=x*y*Ri mod n for bigInts x,y,n,
    //  where Ri = 2**(-kn*bpe) mod n, and kn is the
    //  number of elements in the n array, not
    //  counting leading zeros.
    //x array must have at least as many elemnts as the n array
    //It's OK if x and y are the same variable.
    //must have:
    //  x,y < n
    //  n is odd
    //  np = -(n^(-1)) mod radix
    function mont_(x, y, n, np) {
      var i, j, c, ui, t, ks;
      var kn = n.length;
      var ky = y.length;

      if (sa.length != kn) sa = new Array(kn);

      copyInt_(sa, 0);

      for (; kn > 0 && n[kn - 1] == 0; kn--); //ignore leading zeros of n
      for (; ky > 0 && y[ky - 1] == 0; ky--); //ignore leading zeros of y
      ks = sa.length - 1; //sa will never have more than this many nonzero elements.

      //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
      for (i = 0; i < kn; i++) {
        t = sa[0] + x[i] * y[0];
        ui = (t & mask) * np & mask; //the inner "& mask" was needed on Safari (but not MSIE) at one time
        c = t + ui * n[0] >> bpe;
        t = x[i];

        //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
        j = 1;
        for (; j < ky - 4;) {
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
        }
        for (; j < ky;) {
          c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;
        }
        for (; j < kn - 4;) {
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
        }
        for (; j < kn;) {
          c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;
        }
        for (; j < ks;) {
          c += sa[j];sa[j - 1] = c & mask;c >>= bpe;j++;
        }
        sa[j - 1] = c & mask;
      }

      if (!greater(n, sa)) sub_(sa, n);
      copy_(x, sa);
    }

    module.exports = {
      'add': add,
      'addInt': addInt,
      'bigInt2str': bigInt2str,
      'bitSize': bitSize,
      'dup': dup,
      'equals': equals,
      'equalsInt': equalsInt,
      'expand': expand,
      'findPrimes': findPrimes,
      'GCD': GCD,
      'greater': greater,
      'greaterShift': greaterShift,
      'int2bigInt': int2bigInt,
      'inverseMod': inverseMod,
      'inverseModInt': inverseModInt,
      'isZero': isZero,
      'millerRabin': millerRabin,
      'millerRabinInt': millerRabinInt,
      'mod': mod,
      'modInt': modInt,
      'mult': mult,
      'multMod': multMod,
      'negative': negative,
      'powMod': powMod,
      'randBigInt': randBigInt,
      'randTruePrime': randTruePrime,
      'randProbPrime': randProbPrime,
      'str2bigInt': str2bigInt,
      'sub': sub,
      'trim': trim,
      'addInt_': addInt_,
      'add_': add_,
      'copy_': copy_,
      'copyInt_': copyInt_,
      'GCD_': GCD_,
      'inverseMod_': inverseMod_,
      'mod_': mod_,
      'mult_': mult_,
      'multMod_': multMod_,
      'powMod_': powMod_,
      'randBigInt_': randBigInt_,
      'randTruePrime_': randTruePrime_,
      'sub_': sub_,
      'addShift_': addShift_,
      'carry_': carry_,
      'divide_': divide_,
      'divInt_': divInt_,
      'eGCD_': eGCD_,
      'halve_': halve_,
      'leftShift_': leftShift_,
      'linComb_': linComb_,
      'linCombShift_': linCombShift_,
      'mont_': mont_,
      'multInt_': multInt_,
      'rightShift_': rightShift_,
      'squareMod_': squareMod_,
      'subShift_': subShift_
    };
  });
});
$__System.registerDynamic('1a', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = typeof TextEncoder !== 'undefined' ? TextEncoder : undefined;
});
$__System.registerDynamic('1b', [], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = typeof TextDecoder !== 'undefined' ? TextDecoder : undefined;
});
$__System.registerDynamic('13', ['1a', '1b'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toByteArray = exports.fromUTF8 = exports.toUTF8 = exports.fromHex = exports.toHex = exports.fromBase64 = exports.toBase64 = undefined;

  var _textEncoder = $__require('1a');

  var _textEncoder2 = _interopRequireDefault(_textEncoder);

  var _textDecoder = $__require('1b');

  var _textDecoder2 = _interopRequireDefault(_textDecoder);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /* eslint-disable no-bitwise */
  /* eslint-disable no-param-reassign */
  /* eslint-disable no-plusplus */
  /* eslint-disable no-sparse-arrays */

  function toByteArray(data) {
    if (data.buffer) {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
    return new Uint8Array(data);
  }

  function _toString(data) {
    const CHUNK_SIZE = 32767;
    const c = [];
    const len = data.length;
    for (let i = 0; i < len; i += CHUNK_SIZE) {
      c.push(String.fromCharCode.apply(null, data.subarray(i, i + CHUNK_SIZE)));
    }
    return c.join('');
  }

  function _fromString(data) {
    const res = new Uint8Array(data.length);
    const len = data.length;
    for (let i = 0; i < len; i += 1) {
      res[i] = data.charCodeAt(i);
    }
    return res;
  }

  /* Encodes a Uint8Array as a base64 string */
  function toBase64Fast(data) {
    return btoa(_toString(toByteArray(data)));
  }

  /* Decodes a base64 string as a Uint8Array */
  function fromBase64Fast(data) {
    return _fromString(atob(data));
  }

  /* toBase64 without using btoa */
  function toBase64Slow(data) {
    data = toByteArray(data);
    const modtable = [0, 2, 1];
    const enctable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const inlength = data.byteLength;
    const outlength = 4 * Math.floor((inlength + 2) / 3);

    const encdata = new Array(outlength);

    for (let i = 0, j = 0; i < inlength;) {
      const octa = i < inlength ? data[i++] : 0;
      const octb = i < inlength ? data[i++] : 0;
      const octc = i < inlength ? data[i++] : 0;

      const triple = (octa << 0x10) + (octb << 0x08) + octc;

      encdata[j++] = enctable[triple >> 3 * 6 & 0x3F];
      encdata[j++] = enctable[triple >> 2 * 6 & 0x3F];
      encdata[j++] = enctable[triple >> 1 * 6 & 0x3F];
      encdata[j++] = enctable[triple >> 0 * 6 & 0x3F];
    }

    for (let i = 0; i < modtable[inlength % 3]; i++) {
      encdata[outlength - 1 - i] = '=';
    }

    return encdata.join('');
  }

  /* fromBase64 without using atob */
  function fromBase64Slow(data) {
    const dectable = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, 62,,,, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,,,,,,,, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,,,,,,, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];

    const inlength = data.length;
    if (inlength % 4 !== 0) {
      return null;
    }

    let outlength = Math.floor(inlength / 4) * 3;
    if (data[inlength - 1] === '=') {
      outlength--;
    }
    if (data[inlength - 2] === '=') {
      outlength--;
    }

    const decdata = new Uint8Array(outlength);
    for (let i = 0, j = 0; i < inlength;) {
      const sexta = data[i] === '=' ? 0 & i++ : dectable[data[i++].charCodeAt()];
      const sextb = data[i] === '=' ? 0 & i++ : dectable[data[i++].charCodeAt()];
      const sextc = data[i] === '=' ? 0 & i++ : dectable[data[i++].charCodeAt()];
      const sextd = data[i] === '=' ? 0 & i++ : dectable[data[i++].charCodeAt()];

      const triple = (sexta << 3 * 6) + (sextb << 2 * 6) + (sextc << 1 * 6) + (sextd << 0 * 6);
      if (j < outlength) {
        decdata[j++] = triple >> 2 * 8 & 0xFF;
      }
      if (j < outlength) {
        decdata[j++] = triple >> 1 * 8 & 0xFF;
      }
      if (j < outlength) {
        decdata[j++] = triple >> 0 * 8 & 0xFF;
      }
    }
    return decdata;
  }

  /* Encodes a Uint8Array as an hex string */
  function toHex(data) {
    data = toByteArray(data);
    const enctablehex = '0123456789abcdef';
    const inlength = data.byteLength;
    const encdata = [];
    for (let i = 0; i < inlength; ++i) {
      encdata[2 * i] = enctablehex[data[i] >> 4];
      encdata[2 * i + 1] = enctablehex[data[i] & 0x0F];
    }
    return encdata.join('');
  }

  /* Decodes an hex string as a Uint8Array */
  function fromHex(data) {
    const dectablehex = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, 10, 11, 12, 13, 14, 15];

    data = data.toLowerCase();
    if (data.length % 2 !== 0) {
      throw new Error(`fromHex: ${data} has odd length`);
    }
    const outlength = data.length / 2;
    const decdata = new Uint8Array(outlength);
    for (let i = 0; i < outlength; i++) {
      decdata[i] = dectablehex[data[2 * i].charCodeAt()] << 4 | dectablehex[data[2 * i + 1].charCodeAt()];
    }
    return decdata;
  }

  // http://ecmanaut.blogspot.de/2006/07/encoding-decoding-utf8-in-javascript.html
  function _toUTF8(s) {
    return _fromString(unescape(encodeURIComponent(s)));
  }

  function _fromUTF8(s) {
    return decodeURIComponent(escape(_toString(s)));
  }

  /* Returns a string given a Uint8Array UTF-8 encoding */
  const decoder = _textDecoder2.default ? new _textDecoder2.default() : { decode: _fromUTF8 };
  function fromUTF8(bytes) {
    return decoder.decode(toByteArray(bytes));
  }

  /* Returns a Uint8Array UTF-8 encoding of the given string */
  const encoder = _textEncoder2.default ? new _textEncoder2.default() : { encode: _toUTF8 };
  function toUTF8(str) {
    return encoder.encode(str);
  }

  const toBase64 = typeof btoa !== 'undefined' ? toBase64Fast : toBase64Slow;
  const fromBase64 = typeof atob !== 'undefined' ? fromBase64Fast : fromBase64Slow;
  exports.toBase64 = toBase64;
  exports.fromBase64 = fromBase64;
  exports.toHex = toHex;
  exports.fromHex = fromHex;
  exports.toUTF8 = toUTF8;
  exports.fromUTF8 = fromUTF8;
  exports.toByteArray = toByteArray;
});
$__System.registerDynamic("16", [], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* eslint no-undef: 'off' */

  exports.default = crypto;
});
$__System.registerDynamic('14', ['19', '13', '16'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.blindSignContext = undefined;
  exports.h2d = h2d;
  exports.parseDSKey = parseDSKey;
  exports.unBlindMessage = unBlindMessage;

  var _BigInt = $__require('19');

  var _BigInt2 = _interopRequireDefault(_BigInt);

  var _encoding = $__require('13');

  var _crypto = $__require('16');

  var _crypto2 = _interopRequireDefault(_crypto);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function base64UrlDecode(_str) {
    const str = atob(_str.replace(/-/g, '+').replace(/_/g, '/'));
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i += 1) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer;
  } /* eslint-disable no-bitwise */

  function add(x, y) {
    const lenX = x.length;
    const lenY = y.length;
    let posX = lenX - 1;
    let posY = lenY - 1;
    const charCode0 = '0'.charCodeAt(0);

    let carry = 0;
    const result = [];
    while (posX >= 0 && posY >= 0) {
      const currX = x.charCodeAt(posX) - charCode0;
      const currY = y.charCodeAt(posY) - charCode0;
      const s = currX + currY + carry;
      posX -= 1;
      posY -= 1;

      result.unshift(s < 10 ? s : s - 10);
      carry = s < 10 ? 0 : 1;
    }

    while (posX >= 0) {
      const currX = x.charCodeAt(posX) - charCode0;
      const s = currX + carry;
      posX -= 1;

      result.unshift(s < 10 ? s : s - 10);
      carry = s < 10 ? 0 : 1;
    }

    while (posY >= 0) {
      const currY = y.charCodeAt(posY) - charCode0;
      const s = currY + carry;
      posY -= 1;

      result.unshift(s < 10 ? s : s - 10);
      carry = s < 10 ? 0 : 1;
    }

    if (carry) {
      result.unshift(carry);
    }
    return result.join('');
  }

  function h2d(s) {
    let dec = '0';
    const len = s.length;
    for (let i = 0; i < len; i += 1) {
      const chr = s.charAt(i);
      const n = parseInt(chr, 16);
      for (let t = 8; t; t >>= 1) {
        dec = add(dec, dec);
        if (n & t) {
          dec = add(dec, '1');
        }
      }
    }
    return dec;
  }

  function parseDSKey(pubKeyB64) {
    // Parse key contents.
    return _crypto2.default.subtle.importKey('spki', (0, _encoding.fromBase64)(pubKeyB64), {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-1' }
    }, true, ['encrypt']).then(key => _crypto2.default.subtle.exportKey('jwk', key)).then(key => {
      // base64url-decode modulus
      const modulus = base64UrlDecode(key.n);
      // base64url-decode exponent
      const exponent = base64UrlDecode(key.e);
      // modulus and exponent are now Uint8Arrays
      return { n: h2d((0, _encoding.toHex)(modulus)), e: `${h2d((0, _encoding.toHex)(exponent))}` };
    });
  }

  function unBlindMessage(blindSignedMessage, unBlinder, n) {
    // Unblind the message before sending it for verification.
    // s = u*(bs) mod n
    const _us = _BigInt2.default.multMod(unBlinder, _BigInt2.default.str2bigInt(blindSignedMessage, 16), _BigInt2.default.str2bigInt(n, 10));
    const us = _BigInt2.default.bigInt2str(_us, 10, 0);
    return us;
  }

  // Set the context for blind signatures right.
  class blindSignContext {
    constructor(msg) {
      let logger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { log: () => {}, error: () => {} };

      /*
      Initialize it with the following:
      1. Signer Public Key
      2. Signer Public Exponent
      3. Signer Public Modulous
      */

      // this.keyObj = new JSEncrypt();
      this.randomNumber = null;
      this.blindingNonce = null;
      this.blinder = null;
      this.unblinder = null;
      this.keySize = 2048;
      this.hashedMessage = '';
      this.bm = '';
      this.signedMessage = '';
      this.msg = msg;
      this.logger = logger;
    }

    exponent() {
      // Return the public exponent
      return this.e;
    }

    modulus() {
      return this.n;
    }

    log(msg) {
      this.logger.log(msg, 'Blind Signature');
    }

    error() {
      this.logger.error(...arguments);
    }

    hashMessage() {
      // Need sha256 digest the message.
      return _crypto2.default.subtle.digest('SHA-256', (0, _encoding.toUTF8)(this.msg)).then(_encoding.toHex);
    }

    getBlindingNonce() {
      // Create a random value.
      const randomHex = (0, _encoding.toHex)(_crypto2.default.getRandomValues(new Uint8Array(this.keySize / 8)));
      const randomNumber = _BigInt2.default.str2bigInt(randomHex, 16);
      this.blindingNonce = randomNumber;
      return randomNumber;
    }

    getBlinder(e, n) {
      // Calculate blinder.
      // b = r ^ e mod n
      const b = _BigInt2.default.powMod(this.blindingNonce, _BigInt2.default.str2bigInt(e, 10), _BigInt2.default.str2bigInt(n, 10));
      this.blinder = b;
      return b;
    }

    getUnBlinder(n) {
      // Calculate blinder.
      // b = r ^ e mod n
      const u = _BigInt2.default.inverseMod(this.blindingNonce, _BigInt2.default.str2bigInt(n, 10));
      this.unblinder = u;
      return u;
    }

    blindMessage(e, n) {
      // Blind the message before sending it for signing.
      // bm = b*m mod n
      const promise = new Promise(resolve => /* reject */{
        this.hashMessage().then(hashMessage => {
          // var rnd = this.getBlindingNonce();
          const blinder = this.getBlinder(e, n);
          const bm = _BigInt2.default.multMod(blinder, _BigInt2.default.str2bigInt(hashMessage, 16), _BigInt2.default.str2bigInt(n, 10));
          this.bm = _BigInt2.default.bigInt2str(bm, 10);
          resolve(this.bm);
        });
      });
      return promise;
    }

    verify() {
      // Verify the message to see, the signer is not the problem.
      // m = s^e mod n
      return new Promise(resolve => /* reject */{
        const messageSigned = _BigInt2.default.bigInt2str(_BigInt2.default.powMod(_BigInt2.default.str2bigInt(this.signedMessage, 10, 0), _BigInt2.default.str2bigInt(this.e, 10), _BigInt2.default.str2bigInt(this.n, 10)), 10);
        const originalMessage = _BigInt2.default.bigInt2str(_BigInt2.default.str2bigInt(this.hashedMessage, 16), 10);
        // var original_message = _this.hashedMessage;
        this.log(`Org message ${originalMessage}`);
        this.log(`Sign message: ${messageSigned}`);
        if (originalMessage === messageSigned.toLowerCase()) {
          resolve(true);
        } else {
          // Need to replace this with reject.
          resolve(false);
        }
      });
    }
  }
  exports.blindSignContext = blindSignContext;
});
$__System.registerDynamic("1c", [], true, function ($__require, exports, module) {
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
$__System.registerDynamic('1d', ['10', '12', '11', '14', '1c'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _messageContext = $__require('10');

  var _messageContext2 = _interopRequireDefault(_messageContext);

  var _utils = $__require('12');

  var _userPk = $__require('11');

  var _userPk2 = _interopRequireDefault(_userPk);

  var _blindSignature = $__require('14');

  var _config = $__require('1c');

  var _config2 = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  if (typeof crypto === 'undefined') {
    throw new Error('hpn-worker: crypto not present in this platform');
  }

  // Global variables
  // FIXME: remove this
  /* eslint no-console: off */

  const CliqzSecureMessage = {
    localTemporalUniq: {}
  };

  CliqzSecureMessage.BLIND_SIGNER = _config2.default.settings.ENDPOINT_BLIND_SIGNER;
  CliqzSecureMessage.USER_REG = _config2.default.settings.ENDPOINT_USER_REG;

  const logger = {
    log: console.log.bind(console),
    error: console.error.bind(console)
  };

  self.onmessage = e => {
    try {
      const msgType = e.data.type;

      if (msgType === 'instant') {
        const msg = e.data.msg;
        const uid = e.data.uid;
        const response = {};
        CliqzSecureMessage.sourceMap = e.data.sourcemap;
        CliqzSecureMessage.uPK = e.data.upk;
        const queryProxyUrl = e.data.queryProxyUrl;
        if (!queryProxyUrl) {
          throw new Error(`Could not send instant message (action=${msg.action}), as the queryProxyUrl is missing`);
        }

        CliqzSecureMessage.dsPK = e.data.dspk;
        CliqzSecureMessage.secureLogger = e.data.sspk;

        const mc = new _messageContext2.default(msg, CliqzSecureMessage, logger);
        mc.query(queryProxyUrl).then(result => {
          response.res = result;
          response.uid = uid;
          response.type = 'instant';
          postMessage(response);
        }).catch(postMessage);
        return;
      }

      if (msgType === 'telemetry') {
        const msg = e.data.msg;
        const response = {};
        response.type = 'telemetry';
        CliqzSecureMessage.sourceMap = e.data.sourcemap;
        CliqzSecureMessage.uPK = e.data.upk;
        CliqzSecureMessage.dsPK = e.data.dspk;
        CliqzSecureMessage.secureLogger = e.data.sspk;
        CliqzSecureMessage.routeTable = e.data.routetable;
        CliqzSecureMessage.localTemporalUniq = e.data.localTemporalUniq;

        let mc;
        try {
          mc = new _messageContext2.default(msg, CliqzSecureMessage, logger);
        } catch (err) {
          response.localTemporalUniq = CliqzSecureMessage.localTemporalUniq;
          postMessage(response);
          return;
        }

        (0, _blindSignature.parseDSKey)(CliqzSecureMessage.dsPK.pubKeyB64).then(keys => {
          CliqzSecureMessage.dsPK.e = keys.e;
          CliqzSecureMessage.dsPK.n = keys.n;
        }).then(() => mc.encryptedTelemetry()).then(() => /* result */{
          response.localTemporalUniq = CliqzSecureMessage.localTemporalUniq;
          postMessage(response);
        }).catch(() => /* err */{
          response.localTemporalUniq = CliqzSecureMessage.localTemporalUniq;
          postMessage(response);
        });
        return;
      }

      if (msgType === 'user-key') {
        const upk = new _userPk2.default(CliqzSecureMessage, logger);
        upk.generateKey().then(_e => {
          postMessage(_e);
        }).catch(postMessage);
        return;
      }

      if (msgType === 'test') {
        const msg = e.data.msg;
        const response = {};
        response.type = 'test';
        CliqzSecureMessage.sourceMap = e.data.sourcemap;
        CliqzSecureMessage.uPK = e.data.upk;
        CliqzSecureMessage.dsPK = e.data.dspk;
        CliqzSecureMessage.routeTable = e.data.routetable;
        CliqzSecureMessage.localTemporalUniq = e.data.localTemporalUniq;

        const mc = new _messageContext2.default(msg, CliqzSecureMessage, logger);
        mc.getproxyCoordinator().then(() => /* e */{
          response.mc = mc.toJSON();
          postMessage(response);
        }).catch(_e => {
          console.error('hpn-worker test', _e);
          postMessage({
            type: 'test',
            error: true
          });
        });
        return;
      }

      if (msgType === 'test-sha1' || msgType === 'hw-sha1') {
        (0, _utils.sha1)(e.data.msg).then(result => {
          const response = {};
          response.result = result;
          postMessage(response);
        }).catch(postMessage);
        return;
      }

      if (msgType === 'test-rsa-sign') {
        const msg = e.data.msg;
        const response = {};
        CliqzSecureMessage.uPK = { privateKey: e.data.upk };
        const uPK = new _userPk2.default(CliqzSecureMessage, logger);

        uPK.sign(msg).then(result => {
          response.result = result;
          postMessage(response);
        }).catch(() => /* err */{
          response.result = false;
          postMessage(response);
        });
        return;
      }

      if (msgType === 'test-rsa-verify') {
        const signature = e.data.sig;
        const msg = e.data.msg;
        const response = {};

        CliqzSecureMessage.uPK = { privateKey: e.data.upk };
        const uPK = new _userPk2.default(CliqzSecureMessage, logger);

        uPK.verify(signature, msg).then(result => {
          response.result = result;
          postMessage(response);
        }).catch(() => /* err */{
          response.result = false;
          postMessage(response);
        });
        return;
      }

      throw new Error(`Unknown message type ${msgType}`);
    } catch (err) {
      console.log(err);
      try {
        postMessage(`${err}: ${err.stack}`);
      } catch (err2) {
        // Protection against 'DataCloneError: The object could not be cloned' errors
        console.error('Failed to serialize message:', err);
        postMessage('Unknown error: failed to serialize message');
      }
    }
  };

  exports.default = CliqzSecureMessage;
});
$__System.registerDynamic('a', ['1d'], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  $__require('1d');
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