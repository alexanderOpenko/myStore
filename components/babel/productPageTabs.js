import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import TabBarItem from "./tabs/TabBarItem";
import TabBar from "./tabs/tabBar";

var ProductPageTabs = function ProductPageTabs(_ref) {
   var info = _ref.info,
       productId = _ref.productId;

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
      TabBar,
      null,
      React.createElement(
         TabBarItem,
         { label: "\u043E\u043F\u0438\u0441" },
         React.createElement(
            "div",
            { className: "flex-row flex-column-mobile align-start flex-between" },
            React.createElement(
               "div",
               { className: "flex-row wrap-grid tabs-text-columns" },
               React.createElement(
                  "div",
                  { className: "three-desc-grid full-mob-grid" },
                  React.createElement(
                     "div",
                     { className: "tab-column-wrapper" },
                     React.createElement(
                        "div",
                        { className: "info-label primary-label body1" },
                        info.collection
                     ),
                     React.createElement(
                        "h2",
                        { className: "info-label bold-label" },
                        info.producer
                     ),
                     React.createElement(
                        "div",
                        { className: "info-label body1" },
                        info.name
                     )
                  )
               ),
               info.compound && React.createElement(
                  "div",
                  { className: "three-desc-grid full-mob-grid" },
                  React.createElement(
                     "div",
                     { clasName: "tab-column-wrapper" },
                     React.createElement(
                        "h4",
                        { className: "body1" },
                        "\u0421\u043A\u043B\u0430\u0434"
                     ),
                     React.createElement(
                        "p",
                        { className: "body1" },
                        info.compound
                     )
                  )
               ),
               info.description && React.createElement(
                  "div",
                  { className: "three-desc-grid full-mob-grid" },
                  React.createElement(
                     "div",
                     { className: "tab-column-wrapper" },
                     React.createElement(
                        "h4",
                        { className: "body1" },
                        "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0456\u0448\u0435 \u043F\u0440\u043E \u0442\u043E\u0432\u0430\u0440"
                     ),
                     React.createElement(
                        "p",
                        { className: "body1" },
                        info.description
                     )
                  )
               ),
               info.measure && React.createElement(
                  "div",
                  { className: "three-desc-grid full-mob-grid" },
                  React.createElement(
                     "div",
                     { clasName: "tab-column-wrapper" },
                     React.createElement(
                        "h4",
                        { className: "body1" },
                        "\u0417\u0430\u043C\u0456\u0440\u0438"
                     ),
                     React.createElement(
                        "p",
                        { className: "body1" },
                        info.measure.split(';').map(function (el) {
                           return React.createElement(
                              "p",
                              null,
                              el
                           );
                        })
                     )
                  )
               ),
               React.createElement(
                  "div",
                  { className: "three-desc-grid full-mob-grid" },
                  React.createElement(
                     "div",
                     { className: "tab-column-wrapper" },
                     React.createElement(
                        "h4",
                        { className: "body1" },
                        "\u0410\u0440\u0442\u0438\u043A\u0443\u043B \u0442\u043E\u0432\u0430\u0440\u0443"
                     ),
                     React.createElement(
                        "p",
                        { className: "body1" },
                        info.sku
                     )
                  )
               )
            ),
            !!productVideo.image_path && React.createElement(
               "div",
               { className: "tabs-video video-player" },
               React.createElement(
                  "video",
                  { controls: true },
                  React.createElement("source", { src: productVideo.image_path, type: "video/mp4" })
               )
            )
         )
      ),
      React.createElement(
         TabBarItem,
         { label: "\u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0442\u0430 \u043E\u0431\u043C\u0456\u043D" },
         React.createElement(
            "div",
            { className: "flex-row wrap-grid" },
            React.createElement(
               "div",
               { className: "three-desc-grid full-mob-grid" },
               React.createElement(
                  "div",
                  { className: "tab-column-wrapper" },
                  React.createElement(
                     "h4",
                     null,
                     "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"
                  ),
                  React.createElement(
                     "p",
                     { className: "body1" },
                     "\u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u0431\u0440\u0430\u0442\u0438 \u0441\u0432\u043E\u0454 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432 \u043D\u0430\u0448\u043E\u043C\u0443 \u043E\u0444\u0456\u0441\u0456 \u0432 \u043C. \u0412\u0456\u043D\u043D\u0438\u0446\u044F \u0443 \u0437\u0440\u0443\u0447\u043D\u0438\u0439 \u0434\u043B\u044F \u0432\u0430\u0441 \u0447\u0430\u0441. \u0410\u0431\u043E \u043C\u0438 \u043C\u043E\u0436\u0435\u043C\u043E \u0432\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438 \u0439\u043E\u0433\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0454\u044E \u041D\u043E\u0432\u0430 \u041F\u043E\u0448\u0442\u0430 \u0434\u043E \u0432\u0438\u0431\u0440\u0430\u043D\u043E\u0433\u043E \u0432\u0430\u043C\u0438 \u0432\u0456\u0434\u0434\u0456\u043B\u0435\u043D\u043D\u044F \u0430\u0431\u043E \u0430\u0434\u0440\u0435\u0441\u0438. \u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0437\u0430\u043B\u0435\u0436\u0438\u0442\u044C \u0432\u0456\u0434 \u0442\u0430\u0440\u0438\u0444\u0456\u0432 \u043F\u0435\u0440\u0435\u0432\u0456\u0437\u043D\u0438\u043A\u0430 \u0442\u0430 \u0432\u0430\u0433\u0438 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F. \u042F\u043A\u0449\u043E \u0432\u0438 \u0432\u0438\u0431\u0440\u0430\u043B\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443 \u043A\u0443\u0440\u2019\u0454\u0440\u043E\u043C, \u0442\u043E \u043A\u0443\u0440\u2019\u0454\u0440 \u0437\u0432\u2019\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0437 \u0432\u0430\u043C\u0438 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u043D\u044F \u0447\u0430\u0441\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438."
                  )
               )
            ),
            React.createElement(
               "div",
               { className: "three-desc-grid full-mob-grid" },
               React.createElement(
                  "div",
                  { className: "tab-column-wrapper" },
                  React.createElement(
                     "h4",
                     null,
                     "\u0427\u0430\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
                  ),
                  React.createElement(
                     "p",
                     { className: "body1" },
                     "\u0422\u0435\u0440\u043C\u0456\u043D \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 - 1-3 \u0440\u043E\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0456. \u0412\u0456\u0434\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0434\u0456\u0439\u0441\u043D\u044E\u0454\u0442\u044C\u0441\u044F \u0449\u043E\u0434\u0435\u043D\u043D\u043E \u0434\u043E 18:00. \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0437 \u043C. \u0412\u0456\u043D\u043D\u0438\u0446\u044F"
                  )
               )
            ),
            React.createElement(
               "div",
               { className: "three-desc-grid full-mob-grid" },
               React.createElement(
                  "div",
                  { className: "tab-column-wrapper" },
                  React.createElement(
                     "h4",
                     null,
                     "\u041E\u043F\u043B\u0430\u0442\u0430"
                  ),
                  React.createElement(
                     "p",
                     { className: "body1" },
                     "\u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043F\u043B\u0430\u0442\u0438\u0442\u0438 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u0437\u0440\u0443\u0447\u043D\u0438\u043C \u0434\u043B\u044F \u0432\u0430\u0441 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C: \u041D\u0430\u043A\u043B\u0430\u0434\u0435\u043D\u0438\u0439 \u043F\u043B\u0430\u0442\u0456\u0436 \u0413\u0440\u043E\u0448\u043E\u0432\u0438\u043C \u043F\u0435\u0440\u0435\u043A\u0430\u0437\u043E\u043C - \u043D\u0430 \u0440\u0430\u0445\u0443\u043D\u043E\u043A \u0424\u041E\u041F \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457"
                  )
               )
            ),
            React.createElement(
               "div",
               { className: "three-desc-grid full-mob-grid" },
               React.createElement(
                  "div",
                  { className: "tab-column-wrapper" },
                  React.createElement(
                     "h4",
                     null,
                     "\u041E\u0431\u043C\u0456\u043D \u0442\u0430 \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F"
                  ),
                  React.createElement(
                     "p",
                     { className: "body1" },
                     "\u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0430\u0431\u043E \u043E\u0431\u043C\u0456\u043D\u044F\u0442\u0438 \u0442\u043E\u0432\u0430\u0440 \u043F\u0440\u043E\u0442\u044F\u0433\u043E\u043C 14 \u0434\u043D\u0456\u0432 \u0437 \u043C\u043E\u043C\u0435\u043D\u0442\u0443 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F. \u0414\u043B\u044F \u0446\u044C\u043E\u0433\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0442\u043E\u0432\u0430\u0440 \u0443 \u043F\u0435\u0440\u0432\u0438\u043D\u043D\u0456\u0439 \u0443\u043F\u0430\u043A\u043E\u0432\u0446\u0456 \u0442\u0430 \u0447\u0435\u043A. \u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0442\u043E\u0432\u0430\u0440 \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E \u0432 \u043D\u0430\u0448\u043E\u043C\u0443 \u043E\u0444\u0456\u0441\u0456 \u0432 \u043C. \u0412\u0456\u043D\u043D\u0438\u0446\u044F \u0430\u0431\u043E \u0432\u0456\u0434\u043F\u0440\u0430\u0432\u0438\u0442\u0438 \u0439\u043E\u0433\u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0454\u044E \u041D\u043E\u0432\u0430 \u041F\u043E\u0448\u0442\u0430. \u041F\u0456\u0441\u043B\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0442\u043E\u0432\u0430\u0440\u0443, \u043D\u0430\u0448 \u0442\u043E\u0432\u0430\u0440\u043E\u0437\u043D\u0430\u0432\u0435\u0446\u044C \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0438\u0442\u044C \u0439\u043E\u0433\u043E \u0441\u0442\u0430\u043D \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u0456\u0441\u0442\u044C \u043E\u043F\u0438\u0441\u0443. \u042F\u043A\u0449\u043E \u0432\u0441\u0435 \u0431\u0443\u0434\u0435 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0443, \u043C\u0438 \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043C\u043E \u0432\u0430\u043C \u0433\u0440\u043E\u0448\u0456 \u043D\u0430 \u0432\u0430\u0448\u0443 \u043A\u0430\u0440\u0442\u043A\u0443 \u0430\u0431\u043E \u043E\u0431\u043C\u0456\u043D\u044F\u0454\u043C\u043E \u0442\u043E\u0432\u0430\u0440 \u043D\u0430 \u0456\u043D\u0448\u0438\u0439 \u0437\u0430 \u0432\u0430\u0448\u0438\u043C \u0431\u0430\u0436\u0430\u043D\u043D\u044F\u043C. \u042F\u043A\u0449\u043E \u0432\u0438 \u043C\u0430\u0454\u0442\u0435 \u043F\u0438\u0442\u0430\u043D\u043D\u044F \u0449\u043E\u0434\u043E \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F \u0430\u0431\u043E \u043E\u0431\u043C\u0456\u043D\u0443, \u0437\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044F \u0434\u043E \u043D\u0430\u0448\u043E\u0433\u043E \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430 \u0437\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C +380 (67) 123-45-67."
                  )
               )
            )
         )
      )
   );
};

export default ProductPageTabs;