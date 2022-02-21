import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { GreeterServiceClientImpl, GrpcWebImpl, HelloReply } from './generated-ts-proto/helloworld';
import { grpc } from '@improbable-eng/grpc-web';

const rpc = new GrpcWebImpl('http://127.0.0.1:8081', {
  // Only necessary for tests running on node. Remove the
  // transport config when actually using in the browser.
  transport: NodeHttpTransport(),
  debug: false,
  metadata: new grpc.Metadata({ SomeHeader: 'bar' }),
});

const client = new GreeterServiceClientImpl(rpc);

console.log("calling ...");
client.SayHello({name: "some name"}).then((reply: HelloReply) => console.log(reply.message));
