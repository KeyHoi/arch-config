// Generated by CoffeeScript 1.12.7
(function() {
  var Frame, GrabBackFocus, bgLog, checkEnabledAfterURLChange, checkIfEnabledForUrl, flashFrame, focusThisFrame, frameId, initializeOnDomReady, initializeOnEnabledStateKnown, initializePreDomReady, installListener, installListeners, installModes, isEnabledForUrl, isIncognitoMode, normalMode, onFocus, root, setScrollPosition, windowIsFocused,
    slice = [].slice,
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  root = typeof exports !== "undefined" && exports !== null ? exports : (window.root != null ? window.root : window.root = {});

  DomUtils.documentReady(function() {
    if (typeof extend === "undefined" || extend === null) {
      return root.extend(window, root);
    }
  });

  isEnabledForUrl = true;

  isIncognitoMode = chrome.extension.inIncognitoContext;

  normalMode = null;

  windowIsFocused = (function() {
    var windowHasFocus;
    windowHasFocus = null;
    DomUtils.documentReady(function() {
      return windowHasFocus = document.hasFocus();
    });
    window.addEventListener("focus", forTrusted(function(event) {
      if (event.target === window) {
        windowHasFocus = true;
      }
      return true;
    }));
    window.addEventListener("blur", forTrusted(function(event) {
      if (event.target === window) {
        windowHasFocus = false;
      }
      return true;
    }));
    return function() {
      return windowHasFocus;
    };
  })();

  frameId = null;

  bgLog = function() {
    var arg, args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    args = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = args.length; i < len; i++) {
        arg = args[i];
        results.push(arg.toString());
      }
      return results;
    })();
    return Frame.postMessage("log", {
      message: args.join(" ")
    });
  };

  GrabBackFocus = (function(superClass) {
    extend1(GrabBackFocus, superClass);

    function GrabBackFocus() {
      var exitEventHandler, listener;
      exitEventHandler = (function(_this) {
        return function() {
          return _this.alwaysContinueBubbling(function() {
            _this.exit();
            return chrome.runtime.sendMessage({
              handler: "sendMessageToFrames",
              message: {
                name: "userIsInteractingWithThePage"
              }
            });
          });
        };
      })(this);
      GrabBackFocus.__super__.constructor.call(this, {
        name: "grab-back-focus",
        keydown: exitEventHandler
      });
      this.push({
        _name: "grab-back-focus-mousedown",
        mousedown: exitEventHandler
      });
      Settings.use("grabBackFocus", (function(_this) {
        return function(grabBackFocus) {
          if (_this.modeIsActive) {
            if (grabBackFocus) {
              _this.push({
                _name: "grab-back-focus-focus",
                focus: function(event) {
                  return _this.grabBackFocus(event.target);
                }
              });
              if (document.activeElement) {
                return _this.grabBackFocus(document.activeElement);
              }
            } else {
              return _this.exit();
            }
          }
        };
      })(this));
      chrome.runtime.onMessage.addListener(listener = (function(_this) {
        return function(arg1) {
          var name;
          name = arg1.name;
          if (name === "userIsInteractingWithThePage") {
            chrome.runtime.onMessage.removeListener(listener);
            if (_this.modeIsActive) {
              _this.exit();
            }
          }
          return false;
        };
      })(this));
    }

    GrabBackFocus.prototype.grabBackFocus = function(element) {
      if (!DomUtils.isFocusable(element)) {
        return this.continueBubbling;
      }
      element.blur();
      return this.suppressEvent;
    };

    return GrabBackFocus;

  })(Mode);

  handlerStack.push({
    _name: "GrabBackFocus-pushState-monitor",
    click: function(event) {
      var ref, target;
      if (DomUtils.isFocusable(document.activeElement)) {
        return true;
      }
      target = event.target;
      while (target) {
        if (target.tagName === "A" && target.origin === document.location.origin && (target.pathName !== document.location.pathName || target.search !== document.location.search) && (((ref = target.target) === "" || ref === "_self") || (target.target === "_parent" && window.parent === window) || (target.target === "_top" && window.top === window))) {
          return new GrabBackFocus();
        } else {
          target = target.parentElement;
        }
      }
      return true;
    }
  });

  installModes = function() {
    normalMode = new NormalMode;
    Scroller.init();
    FindModeHistory.init();
    new InsertMode({
      permanent: true
    });
    if (isEnabledForUrl) {
      new GrabBackFocus;
    }
    return normalMode;
  };

  initializeOnEnabledStateKnown = function(isEnabledForUrl) {
    if (!normalMode) {
      installModes();
    }
    if (isEnabledForUrl) {
      if (!(Utils.isFirefox() && document.documentElement.namespaceURI !== "http://www.w3.org/1999/xhtml")) {
        if (DomUtils.isTopFrame()) {
          DomUtils.documentComplete(Vomnibar.init.bind(Vomnibar));
        }
      }
      return initializeOnEnabledStateKnown = function() {};
    }
  };

  initializePreDomReady = function() {
    var requestHandlers;
    installListeners();
    Frame.init();
    checkIfEnabledForUrl(document.hasFocus());
    requestHandlers = {
      focusFrame: function(request) {
        if (frameId === request.frameId) {
          return focusThisFrame(request);
        }
      },
      getScrollPosition: function(ignoredA, ignoredB, sendResponse) {
        if (frameId === 0) {
          return sendResponse({
            scrollX: window.scrollX,
            scrollY: window.scrollY
          });
        }
      },
      setScrollPosition: setScrollPosition,
      frameFocused: function() {},
      checkEnabledAfterURLChange: checkEnabledAfterURLChange,
      runInTopFrame: function(arg1) {
        var registryEntry, sourceFrameId;
        sourceFrameId = arg1.sourceFrameId, registryEntry = arg1.registryEntry;
        if (DomUtils.isTopFrame()) {
          return NormalModeCommands[registryEntry.command](sourceFrameId, registryEntry);
        }
      },
      linkHintsMessage: function(request) {
        return HintCoordinator[request.messageType](request);
      }
    };
    return chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      var ref, ref1;
      request.isTrusted = true;
      if (!(request.handler && !request.name)) {
        if ((ref = request.name) !== "userIsInteractingWithThePage") {
          if (isEnabledForUrl || ((ref1 = request.name) === "checkEnabledAfterURLChange" || ref1 === "runInTopFrame")) {
            requestHandlers[request.name](request, sender, sendResponse);
          }
        }
      }
      return false;
    });
  };

  installListener = function(element, event, callback) {
    return element.addEventListener(event, forTrusted(function() {
      if (typeof extend === "undefined" || extend === null) {
        root.extend(window, root);
      }
      if (isEnabledForUrl) {
        return callback.apply(this, arguments);
      } else {
        return true;
      }
    }), true);
  };

  installListeners = Utils.makeIdempotent(function() {
    var fn, i, len, ref, type;
    ref = ["keydown", "keypress", "keyup", "click", "focus", "blur", "mousedown", "scroll"];
    fn = function(type) {
      return installListener(window, type, function(event) {
        return handlerStack.bubbleEvent(type, event);
      });
    };
    for (i = 0, len = ref.length; i < len; i++) {
      type = ref[i];
      fn(type);
    }
    return installListener(document, "DOMActivate", function(event) {
      return handlerStack.bubbleEvent('DOMActivate', event);
    });
  });

  onFocus = forTrusted(function(event) {
    if (event.target === window) {
      chrome.runtime.sendMessage({
        handler: "frameFocused"
      });
      return checkIfEnabledForUrl(true);
    }
  });

  window.addEventListener("focus", onFocus);

  window.addEventListener("hashchange", checkEnabledAfterURLChange);

  initializeOnDomReady = function() {
    return Frame.postMessage("domReady");
  };

  Frame = {
    port: null,
    listeners: {},
    addEventListener: function(handler, callback) {
      return this.listeners[handler] = callback;
    },
    postMessage: function(handler, request) {
      if (request == null) {
        request = {};
      }
      return this.port.postMessage(extend(request, {
        handler: handler
      }));
    },
    linkHintsMessage: function(request) {
      return HintCoordinator[request.messageType](request);
    },
    registerFrameId: function(arg1) {
      var chromeFrameId, focusHandler, postRegisterFrame, resizeHandler;
      chromeFrameId = arg1.chromeFrameId;
      frameId = root.frameId = window.frameId = chromeFrameId;
      if (windowIsFocused() || !DomUtils.windowIsTooSmall()) {
        return Frame.postMessage("registerFrame");
      } else {
        postRegisterFrame = function() {
          window.removeEventListener("focus", focusHandler);
          window.removeEventListener("resize", resizeHandler);
          return Frame.postMessage("registerFrame");
        };
        window.addEventListener("focus", focusHandler = forTrusted(function(event) {
          if (event.target === window) {
            return postRegisterFrame();
          }
        }));
        return window.addEventListener("resize", resizeHandler = forTrusted(function(event) {
          if (!DomUtils.windowIsTooSmall()) {
            return postRegisterFrame();
          }
        }));
      }
    },
    init: function() {
      var disconnect;
      this.port = chrome.runtime.connect({
        name: "frames"
      });
      this.port.onMessage.addListener((function(_this) {
        return function(request) {
          var ref;
          if (typeof extend === "undefined" || extend === null) {
            root.extend(window, root);
          }
          return ((ref = _this.listeners[request.handler]) != null ? ref : _this[request.handler])(request);
        };
      })(this));
      this.port.onDisconnect.addListener(disconnect = Utils.makeIdempotent((function(_this) {
        return function() {
          return _this.disconnect();
        };
      })(this)));
      return window.addEventListener("unload", forTrusted(disconnect));
    },
    disconnect: function() {
      try {
        this.postMessage("unregisterFrame");
      } catch (error) {}
      try {
        this.port.disconnect();
      } catch (error) {}
      this.postMessage = this.disconnect = function() {};
      this.port = null;
      this.listeners = {};
      HintCoordinator.exit({
        isSuccess: false
      });
      handlerStack.reset();
      isEnabledForUrl = false;
      window.removeEventListener("focus", onFocus);
      return window.removeEventListener("hashchange", checkEnabledAfterURLChange);
    }
  };

  setScrollPosition = function(arg1) {
    var scrollX, scrollY;
    scrollX = arg1.scrollX, scrollY = arg1.scrollY;
    return DomUtils.documentReady(function() {
      if (DomUtils.isTopFrame()) {
        window.focus();
        document.body.focus();
        if (0 < scrollX || 0 < scrollY) {
          Marks.setPreviousPosition();
          return window.scrollTo(scrollX, scrollY);
        }
      }
    });
  };

  flashFrame = function() {};

  DomUtils.documentReady(function() {
    var _frameEl, _shadowDOM, _styleSheet, highlightedFrameElement, ref;
    highlightedFrameElement = DomUtils.createElement("div");
    _shadowDOM = (ref = typeof highlightedFrameElement.createShadowRoot === "function" ? highlightedFrameElement.createShadowRoot() : void 0) != null ? ref : highlightedFrameElement;
    _styleSheet = DomUtils.createElement("style");
    _styleSheet.innerHTML = "@import url(\"" + (chrome.runtime.getURL("content_scripts/vimium.css")) + "\");";
    _shadowDOM.appendChild(_styleSheet);
    _frameEl = DomUtils.createElement("div");
    _frameEl.className = "vimiumReset vimiumHighlightedFrame";
    _shadowDOM.appendChild(_frameEl);
    return flashFrame = function() {
      document.documentElement.appendChild(highlightedFrameElement);
      return setTimeout((function() {
        return highlightedFrameElement.remove();
      }), 200);
    };
  });

  focusThisFrame = function(request) {
    var ref;
    if (!request.forceFocusThisFrame) {
      if (DomUtils.windowIsTooSmall() || ((ref = document.body) != null ? ref.tagName.toLowerCase() : void 0) === "frameset") {
        chrome.runtime.sendMessage({
          handler: "nextFrame"
        });
        return;
      }
    }
    window.focus();
    if (document.activeElement.tagName.toLowerCase() === "iframe") {
      document.activeElement.blur();
    }
    if (request.highlight) {
      return flashFrame();
    }
  };

  root.lastFocusedInput = (function() {
    var recentlyFocusedElement;
    recentlyFocusedElement = null;
    window.addEventListener("focus", forTrusted(function(event) {
      var DomUtils, ref;
      DomUtils = (ref = window.DomUtils) != null ? ref : root.DomUtils;
      if (DomUtils.isEditable(event.target)) {
        return recentlyFocusedElement = event.target;
      }
    }), true);
    return function() {
      return recentlyFocusedElement;
    };
  })();

  checkIfEnabledForUrl = (function() {
    Frame.addEventListener("isEnabledForUrl", function(response) {
      var frameIsFocused, isFirefox, passKeys;
      isEnabledForUrl = response.isEnabledForUrl, passKeys = response.passKeys, frameIsFocused = response.frameIsFocused, isFirefox = response.isFirefox;
      Utils.isFirefox = function() {
        return isFirefox;
      };
      initializeOnEnabledStateKnown(isEnabledForUrl);
      normalMode.setPassKeys(passKeys);
      if (!isEnabledForUrl) {
        return HUD.hide(true, false);
      }
    });
    return function(frameIsFocused) {
      if (frameIsFocused == null) {
        frameIsFocused = windowIsFocused();
      }
      return Frame.postMessage("isEnabledForUrl", {
        frameIsFocused: frameIsFocused,
        url: window.location.toString()
      });
    };
  })();

  checkEnabledAfterURLChange = forTrusted(function() {
    if (windowIsFocused()) {
      return checkIfEnabledForUrl();
    }
  });

  if (root.HelpDialog == null) {
    root.HelpDialog = {
      helpUI: null,
      isShowing: function() {
        var ref;
        return (ref = this.helpUI) != null ? ref.showing : void 0;
      },
      abort: function() {
        if (this.isShowing()) {
          return this.helpUI.hide(false);
        }
      },
      toggle: function(request) {
        DomUtils.documentComplete((function(_this) {
          return function() {
            return _this.helpUI != null ? _this.helpUI : _this.helpUI = new UIComponent("pages/help_dialog.html", "vimiumHelpDialogFrame", function() {});
          };
        })(this));
        if ((this.helpUI != null) && this.isShowing()) {
          return this.helpUI.hide();
        } else if (this.helpUI != null) {
          return this.helpUI.activate(extend(request, {
            name: "activate",
            focus: true
          }));
        }
      }
    };
  }

  initializePreDomReady();

  DomUtils.documentReady(initializeOnDomReady);

  root.handlerStack = handlerStack;

  root.frameId = frameId;

  root.Frame = Frame;

  root.windowIsFocused = windowIsFocused;

  root.bgLog = bgLog;

  extend(root, {
    focusThisFrame: focusThisFrame
  });

  extend(root, {
    installModes: installModes
  });

  if (typeof exports === "undefined" || exports === null) {
    extend(window, root);
  }

}).call(this);
