/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { grpc } from '@improbable-eng/grpc-web';
import { Observable } from 'rxjs';
import { BrowserHeaders } from 'browser-headers';
import { share } from 'rxjs/operators';
import { Timestamp } from './google/protobuf/timestamp';

export const protobufPackage = 'helloworld';

/** The request message containing the user's name. */
export interface HelloRequest {
name: string,
}

/** The response message containing the greetings */
export interface HelloReply {
message: string,
timestamp: Date | undefined,
}

function createBaseHelloRequest(): HelloRequest {
      return { name: "" };
    }

export const HelloRequest = {
            encode(
      message: HelloRequest,
      writer: Writer = Writer.create(),
    ): Writer {
if ( message.name !== "") {
          writer.uint32(10).string(message.name);
        }
return writer;
},

decode(
      input: Reader | Uint8Array,
      length?: number,
    ): HelloRequest {
      const reader = input instanceof Reader ? input : new Reader(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = createBaseHelloRequest();
while (reader.pos < end) {
      const tag = reader.uint32();
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

fromJSON(object: any): HelloRequest {
      return {
name: isSet(object.name)
          ? String(object.name)
          : "",
};
},

toJSON(message: HelloRequest): unknown {
      const obj: any = {};
message.name !== undefined && (obj.name = message.name);
return obj;
},

fromPartial<I extends Exact<DeepPartial<HelloRequest>, I>>(object: I): HelloRequest {
const message = createBaseHelloRequest();
message.name = object.name ?? "";
return message;
}
          };

function createBaseHelloReply(): HelloReply {
      return { message: "",timestamp: undefined };
    }

export const HelloReply = {
            encode(
      message: HelloReply,
      writer: Writer = Writer.create(),
    ): Writer {
if ( message.message !== "") {
          writer.uint32(10).string(message.message);
        }
if (message.timestamp !== undefined) {
          Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
        }
return writer;
},

decode(
      input: Reader | Uint8Array,
      length?: number,
    ): HelloReply {
      const reader = input instanceof Reader ? input : new Reader(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = createBaseHelloReply();
while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
case 1:
message.message = reader.string();
break;
case 2:
message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
break;
default:
        reader.skipType(tag & 7);
        break;
}
}
return message;
},

fromJSON(object: any): HelloReply {
      return {
message: isSet(object.message)
          ? String(object.message)
          : "",
timestamp: isSet(object.timestamp)
          ? fromJsonTimestamp(object.timestamp)
          : undefined,
};
},

toJSON(message: HelloReply): unknown {
      const obj: any = {};
message.message !== undefined && (obj.message = message.message);
message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
return obj;
},

fromPartial<I extends Exact<DeepPartial<HelloReply>, I>>(object: I): HelloReply {
const message = createBaseHelloReply();
message.message = object.message ?? "";
message.timestamp = object.timestamp ?? undefined;
return message;
}
          };

/** //////////////////////////////////// The greeting service definition. */
export interface GreeterService {
/**
 * ////////////////////
 * Sends a greeting //
 * //////***** /////////
 *      HELLO       //
 * //////***** /////////
 */
SayHello(request: DeepPartial<HelloRequest>,metadata?: grpc.Metadata): Promise<HelloReply>;
/**
 * Comment spanning
 * on several lines
 */
ItKeepsTalking(request: DeepPartial<Observable<HelloRequest>>,metadata?: grpc.Metadata): Promise<HelloReply>;
/** C style comments */
ItKeepsReplying(request: DeepPartial<HelloRequest>,metadata?: grpc.Metadata): Observable<HelloReply>;
/**
 * C style comments
 * on several lines
 * with non-empty heading/trailing line
 */
StreamHellos(request: DeepPartial<Observable<HelloRequest>>,metadata?: grpc.Metadata): Observable<HelloReply>;
}

export class GreeterServiceClientImpl implements GreeterService {
  
    private readonly rpc: Rpc;
    
    constructor(rpc: Rpc) {
  this.rpc = rpc;this.SayHello = this.SayHello.bind(this);this.ItKeepsTalking = this.ItKeepsTalking.bind(this);this.ItKeepsReplying = this.ItKeepsReplying.bind(this);this.StreamHellos = this.StreamHellos.bind(this);}

    SayHello(
      request: DeepPartial<HelloRequest>,
      metadata?: grpc.Metadata,
    ): Promise<HelloReply> {
      return this.rpc.unary(
        GreeterServiceSayHelloDesc,
        HelloRequest.fromPartial(request),
        metadata,
      );
    }
  
    ItKeepsTalking(
      request: DeepPartial<Observable<HelloRequest>>,
      metadata?: grpc.Metadata,
    ): Promise<HelloReply> {
      return this.rpc.unary(
        GreeterServiceItKeepsTalkingDesc,
        Observable<HelloRequest>.fromPartial(request),
        metadata,
      );
    }
  
    ItKeepsReplying(
      request: DeepPartial<HelloRequest>,
      metadata?: grpc.Metadata,
    ): Observable<HelloReply> {
      return this.rpc.invoke(
        GreeterServiceItKeepsReplyingDesc,
        HelloRequest.fromPartial(request),
        metadata,
      );
    }
  
    StreamHellos(
      request: DeepPartial<Observable<HelloRequest>>,
      metadata?: grpc.Metadata,
    ): Observable<HelloReply> {
      return this.rpc.invoke(
        GreeterServiceStreamHellosDesc,
        Observable<HelloRequest>.fromPartial(request),
        metadata,
      );
    }
  }

export const GreeterServiceDesc = {
      serviceName: "helloworld.GreeterService",
    };

export const GreeterServiceSayHelloDesc: UnaryMethodDefinitionish = {
      methodName: "SayHello",
      service: GreeterServiceDesc,
      requestStream: false,
      responseStream: false,
      requestType: {
    serializeBinary() {
      return HelloRequest.encode(this).finish();
    },
  } as any,
      responseType: {
    deserializeBinary(data: Uint8Array) {
      return { ...HelloReply.decode(data), toObject() { return this; } };
    }
  } as any,
    };

export const GreeterServiceItKeepsTalkingDesc: UnaryMethodDefinitionish = {
      methodName: "ItKeepsTalking",
      service: GreeterServiceDesc,
      requestStream: false,
      responseStream: false,
      requestType: {
    serializeBinary() {
      return Observable<HelloRequest>.encode(this).finish();
    },
  } as any,
      responseType: {
    deserializeBinary(data: Uint8Array) {
      return { ...HelloReply.decode(data), toObject() { return this; } };
    }
  } as any,
    };

export const GreeterServiceItKeepsReplyingDesc: UnaryMethodDefinitionish = {
      methodName: "ItKeepsReplying",
      service: GreeterServiceDesc,
      requestStream: false,
      responseStream: true,
      requestType: {
    serializeBinary() {
      return HelloRequest.encode(this).finish();
    },
  } as any,
      responseType: {
    deserializeBinary(data: Uint8Array) {
      return { ...HelloReply.decode(data), toObject() { return this; } };
    }
  } as any,
    };

export const GreeterServiceStreamHellosDesc: UnaryMethodDefinitionish = {
      methodName: "StreamHellos",
      service: GreeterServiceDesc,
      requestStream: false,
      responseStream: true,
      requestType: {
    serializeBinary() {
      return Observable<HelloRequest>.encode(this).finish();
    },
  } as any,
      responseType: {
    deserializeBinary(data: Uint8Array) {
      return { ...HelloReply.decode(data), toObject() { return this; } };
    }
  } as any,
    };

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> { requestStream: any; responseStream: any; }

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      request: any,
      metadata: grpc.Metadata | undefined,
    ): Promise<any>;
invoke<T extends UnaryMethodDefinitionish>(
        methodDesc: T,
        request: any,
        metadata: grpc.Metadata | undefined,
      ): Observable<any>;
}

export class GrpcWebImpl {
      private host: string;
      private options: 
    {
      transport?: grpc.TransportFactory,
      streamingTransport?: grpc.TransportFactory,
      debug?: boolean,
      metadata?: grpc.Metadata,
    }
  ;
      
      constructor(host: string, options: 
    {
      transport?: grpc.TransportFactory,
      streamingTransport?: grpc.TransportFactory,
      debug?: boolean,
      metadata?: grpc.Metadata,
    }
  ) {
        this.host = host;
        this.options = options;
      }
  
    unary<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): Promise<any> {
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
        metadata && this.options.metadata
          ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
          : metadata || this.options.metadata;
      return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
          request,
          host: this.host,
          metadata: maybeCombinedMetadata,
          transport: this.options.transport,
          debug: this.options.debug,
          onEnd: function (response) {
            if (response.status === grpc.Code.OK) {
              resolve(response.message);
            } else {
              const err = new Error(response.statusMessage) as any;
              err.code = response.status;
              err.metadata = response.trailers;
              reject(err);
            }
          },
        });
      });
    }
  
    invoke<T extends UnaryMethodDefinitionish>(
      methodDesc: T,
      _request: any,
      metadata: grpc.Metadata | undefined
    ): Observable<any> {
      // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
      const upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15]; 
      const DEFAULT_TIMEOUT_TIME: number = 3_000;
      const request = { ..._request, ...methodDesc.requestType };
      const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
      return new Observable(observer => {
        const upStream = (() => {
          const client = grpc.invoke(methodDesc, {
            host: this.host,
            request,
            transport: this.options.streamingTransport || this.options.transport,
            metadata: maybeCombinedMetadata,
            debug: this.options.debug,
            onMessage: (next) => observer.next(next),
            onEnd: (code: grpc.Code, message: string) => {
              if (code === 0) {
                observer.complete();
              } else if (upStreamCodes.includes(code)) {
                setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
              } else {
                observer.error(new Error(`Error ${code} ${message}`));
              }
            },
          });
          observer.add(() => client.close());
        });
        upStream();
      }).pipe(share());
    }
  }







type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> =  T extends Builtin
        ? T
        
        : T extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
      export type Exact<P, I extends P> = P extends Builtin
        ? P
        : P &
        { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P> >, never>;







function toTimestamp(date: Date): Timestamp {
            const seconds = date.getTime() / 1_000;
            const nanos = (date.getTime() % 1_000) * 1_000_000;
            return {  seconds, nanos };
          }

function fromTimestamp(t: Timestamp): Date {
            let millis = t.seconds * 1_000;
            millis += t.nanos / 1_000_000;
            return new Date(millis);
          }

function fromJsonTimestamp(o: any): Date {
          if (o instanceof Date) {
            return o;
          } else if (typeof o === "string") {
            return new Date(o);
          } else {
            return fromTimestamp(Timestamp.fromJSON(o));
          }
        }







// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
    // add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
      if (util.Long !== Long) {
        util.Long = Long as any;
        configure();
      }





function isSet(value: any): boolean {
      return value !== null && value !== undefined;
    }