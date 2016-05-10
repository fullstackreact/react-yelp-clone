let counter = 0;
let scriptMap = new Map();

export const ScriptCache = (function(global) {
  return function ScriptCache (scripts) {
    const Cache = {}

    Cache._onLoad = function (key) {
      return (cb) => {
        let stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(() => {
            stored.error ? cb(stored.error) : cb(null, stored)
          })
        } else {
          // TODO:
        }
      }
    }

    Cache._scriptTag = (key, src) => {
      if (!scriptMap.has(key)) {
        let tag = document.createElement('script');
        let promise = new Promise((resolve, reject) => {
          let resolved = false,
              errored = false,
              body = document.getElementsByTagName('body')[0];

          tag.type = 'text/javascript';
          tag.async = false; // Load in order

          const cbName = `loaderCB${counter++}${Date.now()}`;
          let cb;

          let handleResult = (state) => {
            return (evt) => {
              let stored = scriptMap.get(key);
              if (state === 'loaded') {
                stored.resolved = true;
                resolve(src);
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = []
              } else if (state === 'error') {
                stored.errored = true;
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = [];
                reject(evt)
              }

              cleanup();
            }
          }

          const cleanup = () => {
            if (global[cbName] && typeof global[cbName] === 'function') {
              global[cbName] = null;
            }
          }

          tag.onload = handleResult('loaded');
          tag.onerror = handleResult('error')
          tag.onreadystatechange = () => {
            handleResult(tag.readyState)
          }

          // Pick off callback, if there is one
          if (src.match(/callback=CALLBACK_NAME/)) {
            src = src.replace(/(callback=)[^\&]+/, `$1${cbName}`)
            cb = window[cbName] = tag.onload;
          } else {
            tag.addEventListener('load', tag.onload)
          }
          tag.addEventListener('error', tag.onerror);

          tag.src = src;
          body.appendChild(tag);
          return tag;
        });
        let initialState = {
          loaded: false,
          error: false,
          promise: promise,
          tag
        }
        scriptMap.set(key, initialState);
      }
      return scriptMap.get(key);
    }

    Object.keys(scripts).forEach(function(key) {
      const script = scripts[key];
      Cache[key] = {
        tag:    Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      }
    })

    return Cache;
  }
})(window)

export default ScriptCache;
