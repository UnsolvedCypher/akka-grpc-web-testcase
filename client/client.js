"use strict";
exports.__esModule = true;
var grpc_web_node_http_transport_1 = require("@improbable-eng/grpc-web-node-http-transport");
var helloworld_1 = require("./generated-ts-proto/helloworld");
var grpc_web_1 = require("@improbable-eng/grpc-web");
var rpc = new helloworld_1.GrpcWebImpl('http://127.0.0.1:8081', {
    // Only necessary for tests running on node. Remove the
    // transport config when actually using in the browser.
    transport: (0, grpc_web_node_http_transport_1.NodeHttpTransport)(),
    debug: false,
    metadata: new grpc_web_1.grpc.Metadata({ SomeHeader: 'bar' })
});
var client = new helloworld_1.GreeterServiceClientImpl(rpc);
console.log("calling ...");
client.SayHello({ name: "some name" }).then(function (reply) { return console.log(reply.message); });
