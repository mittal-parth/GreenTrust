import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Box,
  BigInt,
  BigNumber,
  JSON,
  Context
} from "@polywrap/wasm-as";
import { Ethereum_TxRequest } from "./";
import * as Types from "../..";

export function serializeEthereum_TxRequest(type: Ethereum_TxRequest): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Ethereum_TxRequest");
  const sizer = new WriteSizer(sizerContext);
  writeEthereum_TxRequest(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Ethereum_TxRequest");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeEthereum_TxRequest(encoder, type);
  return buffer;
}

export function writeEthereum_TxRequest(writer: Write, type: Ethereum_TxRequest): void {
  writer.writeMapLength(9);
  writer.context().push("to", "string | null", "writing property");
  writer.writeString("to");
  writer.writeOptionalString(type.to);
  writer.context().pop();
  writer.context().push("from", "string | null", "writing property");
  writer.writeString("from");
  writer.writeOptionalString(type._from);
  writer.context().pop();
  writer.context().push("nonce", "Box<u32> | null", "writing property");
  writer.writeString("nonce");
  writer.writeOptionalUInt32(type.nonce);
  writer.context().pop();
  writer.context().push("gasLimit", "BigInt | null", "writing property");
  writer.writeString("gasLimit");
  writer.writeOptionalBigInt(type.gasLimit);
  writer.context().pop();
  writer.context().push("gasPrice", "BigInt | null", "writing property");
  writer.writeString("gasPrice");
  writer.writeOptionalBigInt(type.gasPrice);
  writer.context().pop();
  writer.context().push("data", "string | null", "writing property");
  writer.writeString("data");
  writer.writeOptionalString(type.data);
  writer.context().pop();
  writer.context().push("value", "BigInt | null", "writing property");
  writer.writeString("value");
  writer.writeOptionalBigInt(type.value);
  writer.context().pop();
  writer.context().push("chainId", "BigInt | null", "writing property");
  writer.writeString("chainId");
  writer.writeOptionalBigInt(type.chainId);
  writer.context().pop();
  writer.context().push("type", "Box<u32> | null", "writing property");
  writer.writeString("type");
  writer.writeOptionalUInt32(type._type);
  writer.context().pop();
}

export function deserializeEthereum_TxRequest(buffer: ArrayBuffer): Ethereum_TxRequest {
  const context: Context = new Context("Deserializing imported object-type Ethereum_TxRequest");
  const reader = new ReadDecoder(buffer, context);
  return readEthereum_TxRequest(reader);
}

export function readEthereum_TxRequest(reader: Read): Ethereum_TxRequest {
  let numFields = reader.readMapLength();

  let _to: string | null = null;
  let _from: string | null = null;
  let _nonce: Box<u32> | null = null;
  let _gasLimit: BigInt | null = null;
  let _gasPrice: BigInt | null = null;
  let _data: string | null = null;
  let _value: BigInt | null = null;
  let _chainId: BigInt | null = null;
  let _type: Box<u32> | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "to") {
      reader.context().push(field, "string | null", "type found, reading property");
      _to = reader.readOptionalString();
      reader.context().pop();
    }
    else if (field == "from") {
      reader.context().push(field, "string | null", "type found, reading property");
      _from = reader.readOptionalString();
      reader.context().pop();
    }
    else if (field == "nonce") {
      reader.context().push(field, "Box<u32> | null", "type found, reading property");
      _nonce = reader.readOptionalUInt32();
      reader.context().pop();
    }
    else if (field == "gasLimit") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _gasLimit = reader.readOptionalBigInt();
      reader.context().pop();
    }
    else if (field == "gasPrice") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _gasPrice = reader.readOptionalBigInt();
      reader.context().pop();
    }
    else if (field == "data") {
      reader.context().push(field, "string | null", "type found, reading property");
      _data = reader.readOptionalString();
      reader.context().pop();
    }
    else if (field == "value") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _value = reader.readOptionalBigInt();
      reader.context().pop();
    }
    else if (field == "chainId") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _chainId = reader.readOptionalBigInt();
      reader.context().pop();
    }
    else if (field == "type") {
      reader.context().push(field, "Box<u32> | null", "type found, reading property");
      _type = reader.readOptionalUInt32();
      reader.context().pop();
    }
    reader.context().pop();
  }


  return {
    to: _to,
    _from: _from,
    nonce: _nonce,
    gasLimit: _gasLimit,
    gasPrice: _gasPrice,
    data: _data,
    value: _value,
    chainId: _chainId,
    _type: _type
  };
}
