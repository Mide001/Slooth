"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AIAgentInterface = void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var scroll_area_1 = require("@/components/ui/scroll-area");
var react_markdown_1 = require("react-markdown");
var remark_gfm_1 = require("remark-gfm");
exports.AIAgentInterface = function (_a) {
    var _b = _a.apiEndpoint, apiEndpoint = _b === void 0 ? "/api/chat" : _b, _c = _a.title, title = _c === void 0 ? "Mode AI Agent Interface" : _c;
    var _d = react_1.useState([]), messages = _d[0], setMessages = _d[1];
    var _e = react_1.useState(""), input = _e[0], setInput = _e[1];
    var _f = react_1.useState(false), loading = _f[0], setLoading = _f[1];
    var _g = react_1.useState(""), error = _g[0], setError = _g[1];
    var scrollAreaRef = react_1.useRef(null);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var userMessage, response, data_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!input.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    setError("");
                    userMessage = {
                        type: "user",
                        content: input
                    };
                    setMessages(function (prev) { return __spreadArrays(prev, [userMessage]); });
                    setInput("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(apiEndpoint, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ prompt: input })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_1 = _a.sent();
                    if (!response.ok)
                        throw new Error(data_1.error || "Failed to get response");
                    setMessages(function (prev) { return __spreadArrays(prev, [{ type: "agent", content: data_1.text }]); });
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : "An error occurred");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);
    var MessageContent = function (_a) {
        var content = _a.content, type = _a.type;
        if (type === "user") {
            return react_1["default"].createElement("div", { className: "whitespace-pre-wrap" }, content);
        }
        return (react_1["default"].createElement(react_markdown_1["default"], { remarkPlugins: [remark_gfm_1["default"]], components: {
                p: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return react_1["default"].createElement("p", __assign({ className: "mb-4" }, props));
                },
                ul: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("ul", __assign({ className: "list-disc ml-6 mb-4" }, props)));
                },
                ol: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("ol", __assign({ className: "list-decimal ml-6 mb-4" }, props)));
                },
                h1: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("h1", __assign({ className: "text-2xl font-bold mb-4 mt-6" }, props)));
                },
                h2: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("h2", __assign({ className: "text-xl font-bold mb-3 mt-5" }, props)));
                },
                strong: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("strong", __assign({ className: "font-semibold" }, props)));
                },
                table: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("div", { className: "overflow-x-auto mb-4" },
                        react_1["default"].createElement("table", __assign({ className: "min-w-full divide-y divide-gray-200" }, props))));
                },
                th: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("th", __assign({ className: "px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500" }, props)));
                },
                td: function (_a) {
                    var node = _a.node, props = __rest(_a, ["node"]);
                    return (react_1["default"].createElement("td", __assign({ className: "px-4 py-2 text-sm" }, props)));
                },
                code: function (_a) {
                    var node = _a.node, inline = _a.inline, props = __rest(_a, ["node", "inline"]);
                    return inline ? (react_1["default"].createElement("code", __assign({ className: "px-1 py-0.5 bg-gray-100 rounded text-sm font-mono" }, props))) : (react_1["default"].createElement("pre", { className: "p-4 bg-gray-100 rounded-lg overflow-x-auto mb-4" },
                        react_1["default"].createElement("code", __assign({ className: "text-sm font-mono" }, props))));
                }
            } }, content));
    };
    return (react_1["default"].createElement(card_1.Card, { className: "w-full mx-auto border-primary/20 bg-[rgb(var(--background))] text-[rgb(var(--text-primary))] shadow-[0_0_30px_rgba(0,0,0,0.3)]" },
        react_1["default"].createElement(card_1.CardHeader, { className: "border-b border-primary/20" },
            react_1["default"].createElement(card_1.CardTitle, { className: "text-xl font-semibold flex items-center gap-2 text-primary" },
                react_1["default"].createElement(lucide_react_1.Bot, { className: "w-5 h-5" }),
                title)),
        react_1["default"].createElement(card_1.CardContent, { className: "flex-1 p-0 h-[600px]" },
            react_1["default"].createElement(scroll_area_1.ScrollArea, { className: "h-full" },
                react_1["default"].createElement("div", { className: "p-6 space-y-6" },
                    messages.map(function (message, idx) { return (react_1["default"].createElement("div", { key: idx, className: "flex " + (message.type === "user" ? "justify-end" : "justify-start") + " relative" },
                        react_1["default"].createElement("div", { className: "max-w-[80%] rounded-2xl p-4 " + (message.type === "user"
                                ? "bg-primary text-[rgb(var(--primary-foreground))] shadow-[0_4px_20px_rgba(var(--primary),0.25)]"
                                : "bg-[rgb(var(--card-background))] text-[rgb(var(--text-primary))] border-2 border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]") },
                            react_1["default"].createElement("div", { className: "absolute top-4 " + (message.type === "user"
                                    ? "right-[-8px] border-l-primary"
                                    : "left-[-8px] border-r-[rgb(var(--card-background))]") + " w-4 h-4 transform rotate-45 " + (message.type === "user"
                                    ? "bg-primary"
                                    : "bg-[rgb(var(--card-background))] border-2 border-primary/20") }),
                            react_1["default"].createElement("div", { className: "text-xs mb-1 " + (message.type === "user"
                                    ? "text-[rgb(var(--primary-foreground))]"
                                    : "text-primary") }, new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })),
                            react_1["default"].createElement("div", { className: "" + (message.type === "user" ? "font-medium" : "font-normal") },
                                react_1["default"].createElement(MessageContent, { content: message.content, type: message.type }))))); }),
                    loading && (react_1["default"].createElement("div", { className: "flex justify-center" },
                        react_1["default"].createElement("div", { className: "bg-[rgb(var(--card-background))] border-2 border-primary/20 rounded-lg p-4 flex items-center space-x-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]" },
                            react_1["default"].createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin text-primary" }),
                            react_1["default"].createElement("span", { className: "text-[rgb(var(--text-secondary))]" }, "Analyzing..."))))))),
        react_1["default"].createElement("div", { className: "p-4 border-t border-primary/20" },
            error && (react_1["default"].createElement(alert_1.Alert, { variant: "destructive", className: "mb-4 border-2 border-red-500/20 bg-red-900/10 shadow-[0_4px_20px_rgba(239,68,68,0.1)]" },
                react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "h-4 w-4" }),
                react_1["default"].createElement(alert_1.AlertDescription, null, error))),
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "flex space-x-2" },
                react_1["default"].createElement("input", { value: input, onChange: function (e) { return setInput(e.target.value); }, placeholder: "Ask about tokens, trades, or market analysis...", className: "flex-1 rounded-lg border-2 border-primary/20 bg-[rgb(var(--card-background))] p-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.1)]", disabled: loading }),
                react_1["default"].createElement(button_1.Button, { type: "submit", disabled: loading, className: "rounded-lg mt-2 bg-primary hover:bg-primary/90 text-[rgb(var(--primary-foreground))] font-medium shadow-[0_4px_20px_rgba(var(--primary),0.25)]" }, loading ? (react_1["default"].createElement(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" })) : (react_1["default"].createElement(lucide_react_1.Send, { className: "h-4 w-4" })))))));
};
