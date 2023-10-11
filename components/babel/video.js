import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";

var VideoComponent = function VideoComponent(_ref) {
   var productId = _ref.productId;

   var _useState = useState({ image_path: '' }),
       _useState2 = _slicedToArray(_useState, 2),
       productVideo = _useState2[0],
       setProductVideo = _useState2[1];

   var getProductMedia = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
         var resp, json, parsedBody;
         return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
               switch (_context.prev = _context.next) {
                  case 0:
                     _context.next = 2;
                     return fetch("/products?get_video=true&id=" + productId);

                  case 2:
                     resp = _context.sent;
                     _context.next = 5;
                     return resp.json();

                  case 5:
                     json = _context.sent;
                     parsedBody = JSON.parse(json.body);

                     if (parsedBody) {
                        setProductVideo(parsedBody);
                     }

                  case 8:
                  case "end":
                     return _context.stop();
               }
            }
         }, _callee, _this);
      }));

      return function getProductMedia() {
         return _ref2.apply(this, arguments);
      };
   }();

   useEffect(function () {
      getProductMedia();
   }, []);

   return React.createElement(
      "div",
      { className: "video-player" },
      React.createElement(
         "video",
         { width: "750", height: "500", controls: true },
         React.createElement("source", { src: productVideo.image_path, type: "video/mp4" })
      )
   );
};

export default VideoComponent;