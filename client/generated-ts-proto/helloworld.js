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
exports.__esModule = true;
exports.GrpcWebImpl = exports.GreeterServiceStreamHellosDesc = exports.GreeterServiceItKeepsReplyingDesc = exports.GreeterServiceItKeepsTalkingDesc = exports.GreeterServiceSayHelloDesc = exports.GreeterServiceDesc = exports.GreeterServiceClientImpl = exports.HelloReply = exports.HelloRequest = exports.protobufPackage = void 0;
/* eslint-disable */
var minimal_1 = require("protobufjs/minimal");
var Long = require("long");
var grpc_web_1 = require("@improbable-eng/grpc-web");
var rxjs_1 = require("rxjs");
var browser_headers_1 = require("browser-headers");
var operators_1 = require("rxjs/operators");
var timestamp_1 = require("./google/protobuf/timestamp");
exports.protobufPackage = 'helloworld';
function createBaseHelloRequest() {
    return { name: "" };
}
exports.HelloRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseHelloRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            name: isSet(object.name)
                ? String(object.name)
                : ""
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseHelloRequest();
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        return message;
    }
};
function createBaseHelloReply() {
    return { message: "", timestamp: undefined };
}
exports.HelloReply = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.Writer.create(); }
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        if (message.timestamp !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.Reader ? input : new minimal_1.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseHelloReply();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                case 2:
                    message.timestamp = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            message: isSet(object.message)
                ? String(object.message)
                : "",
            timestamp: isSet(object.timestamp)
                ? fromJsonTimestamp(object.timestamp)
                : undefined
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.message !== undefined && (obj.message = message.message);
        message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
        return obj;
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseHelloReply();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        message.timestamp = (_b = object.timestamp) !== null && _b !== void 0 ? _b : undefined;
        return message;
    }
};
var GreeterServiceClientImpl = /** @class */ (function () {
    function GreeterServiceClientImpl(rpc) {
        this.rpc = rpc;
        this.SayHello = this.SayHello.bind(this);
        this.ItKeepsTalking = this.ItKeepsTalking.bind(this);
        this.ItKeepsReplying = this.ItKeepsReplying.bind(this);
        this.StreamHellos = this.StreamHellos.bind(this);
    }
    GreeterServiceClientImpl.prototype.SayHello = function (request, metadata) {
        return this.rpc.unary(exports.GreeterServiceSayHelloDesc, exports.HelloRequest.fromPartial(request), metadata);
    };
    GreeterServiceClientImpl.prototype.ItKeepsTalking = function (request, metadata) {
        return this.rpc.unary(exports.GreeterServiceItKeepsTalkingDesc, (0, rxjs_1.Observable)(fromPartial(request), metadata));
    };
    GreeterServiceClientImpl.prototype.ItKeepsReplying = function (request, metadata) {
        return this.rpc.invoke(exports.GreeterServiceItKeepsReplyingDesc, exports.HelloRequest.fromPartial(request), metadata);
    };
    GreeterServiceClientImpl.prototype.StreamHellos = function (request, metadata) {
        return this.rpc.invoke(exports.GreeterServiceStreamHellosDesc, (0, rxjs_1.Observable)(fromPartial(request), metadata));
    };
    return GreeterServiceClientImpl;
}());
exports.GreeterServiceClientImpl = GreeterServiceClientImpl;
exports.GreeterServiceDesc = {
    serviceName: "helloworld.GreeterService"
};
exports.GreeterServiceSayHelloDesc = {
    methodName: "SayHello",
    service: exports.GreeterServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
        serializeBinary: function () {
            return exports.HelloRequest.encode(this).finish();
        }
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, exports.HelloReply.decode(data)), { toObject: function () { return this; } });
        }
    }
};
exports.GreeterServiceItKeepsTalkingDesc = {
    methodName: "ItKeepsTalking",
    service: exports.GreeterServiceDesc,
    requestStream: false,
    responseStream: false,
    requestType: {
        serializeBinary: function () {
            return (0, rxjs_1.Observable)().encode(this).finish();
        }
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, exports.HelloReply.decode(data)), { toObject: function () { return this; } });
        }
    }
};
exports.GreeterServiceItKeepsReplyingDesc = {
    methodName: "ItKeepsReplying",
    service: exports.GreeterServiceDesc,
    requestStream: false,
    responseStream: true,
    requestType: {
        serializeBinary: function () {
            return exports.HelloRequest.encode(this).finish();
        }
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, exports.HelloReply.decode(data)), { toObject: function () { return this; } });
        }
    }
};
exports.GreeterServiceStreamHellosDesc = {
    methodName: "StreamHellos",
    service: exports.GreeterServiceDesc,
    requestStream: false,
    responseStream: true,
    requestType: {
        serializeBinary: function () {
            return (0, rxjs_1.Observable)().encode(this).finish();
        }
    },
    responseType: {
        deserializeBinary: function (data) {
            return __assign(__assign({}, exports.HelloReply.decode(data)), { toObject: function () { return this; } });
        }
    }
};
var GrpcWebImpl = /** @class */ (function () {
    function GrpcWebImpl(host, options) {
        this.host = host;
        this.options = options;
    }
    GrpcWebImpl.prototype.unary = function (methodDesc, _request, metadata) {
        var _this = this;
        var _a;
        var request = __assign(__assign({}, _request), methodDesc.requestType);
        var maybeCombinedMetadata = metadata && this.options.metadata
            ? new browser_headers_1.BrowserHeaders(__assign(__assign({}, (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata.headersMap), metadata === null || metadata === void 0 ? void 0 : metadata.headersMap))
            : metadata || this.options.metadata;
        return new Promise(function (resolve, reject) {
            grpc_web_1.grpc.unary(methodDesc, {
                request: request,
                host: _this.host,
                metadata: maybeCombinedMetadata,
                transport: _this.options.transport,
                debug: _this.options.debug,
                onEnd: function (response) {
                    if (response.status === grpc_web_1.grpc.Code.OK) {
                        resolve(response.message);
                    }
                    else {
                        var err = new Error(response.statusMessage);
                        err.code = response.status;
                        err.metadata = response.trailers;
                        reject(err);
                    }
                }
            });
        });
    };
    GrpcWebImpl.prototype.invoke = function (methodDesc, _request, metadata) {
        var _this = this;
        var _a;
        // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
        var upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15];
        var DEFAULT_TIMEOUT_TIME = 3000;
        var request = __assign(__assign({}, _request), methodDesc.requestType);
        var maybeCombinedMetadata = metadata && this.options.metadata
            ? new browser_headers_1.BrowserHeaders(__assign(__assign({}, (_a = this.options) === null || _a === void 0 ? void 0 : _a.metadata.headersMap), metadata === null || metadata === void 0 ? void 0 : metadata.headersMap))
            : metadata || this.options.metadata;
        return new rxjs_1.Observable(function (observer) {
            var upStream = (function () {
                var client = grpc_web_1.grpc.invoke(methodDesc, {
                    host: _this.host,
                    request: request,
                    transport: _this.options.streamingTransport || _this.options.transport,
                    metadata: maybeCombinedMetadata,
                    debug: _this.options.debug,
                    onMessage: function (next) { return observer.next(next); },
                    onEnd: function (code, message) {
                        if (code === 0) {
                            observer.complete();
                        }
                        else if (upStreamCodes.includes(code)) {
                            setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
                        }
                        else {
                            observer.error(new Error("Error ".concat(code, " ").concat(message)));
                        }
                    }
                });
                observer.add(function () { return client.close(); });
            });
            upStream();
        }).pipe((0, operators_1.share)());
    };
    return GrpcWebImpl;
}());
exports.GrpcWebImpl = GrpcWebImpl;
function toTimestamp(date) {
    var seconds = date.getTime() / 1000;
    var nanos = (date.getTime() % 1000) * 1000000;
    return { seconds: seconds, nanos: nanos };
}
function fromTimestamp(t) {
    var millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    (0, minimal_1.configure)();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
