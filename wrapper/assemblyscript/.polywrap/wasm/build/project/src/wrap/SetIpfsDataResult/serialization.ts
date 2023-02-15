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
import { SetIpfsDataResult } from "./";
import * as Types from "..";

export function serializeSetIpfsDataResult(type: SetIpfsDataResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: SetIpfsDataResult");
  const sizer = new WriteSizer(sizerContext);
  writeSetIpfsDataResult(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: SetIpfsDataResult");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeSetIpfsDataResult(encoder, type);
  return buffer;
}

export function writeSetIpfsDataResult(writer: Write, type: SetIpfsDataResult): void {
  writer.writeMapLength(2);
  writer.context().push("ipfsHash", "string", "writing property");
  writer.writeString("ipfsHash");
  writer.writeString(type.ipfsHash);
  writer.context().pop();
  writer.context().push("txReceipt", "string", "writing property");
  writer.writeString("txReceipt");
  writer.writeString(type.txReceipt);
  writer.context().pop();
}

export function deserializeSetIpfsDataResult(buffer: ArrayBuffer): SetIpfsDataResult {
  const context: Context = new Context("Deserializing object-type SetIpfsDataResult");
  const reader = new ReadDecoder(buffer, context);
  return readSetIpfsDataResult(reader);
}

export function readSetIpfsDataResult(reader: Read): SetIpfsDataResult {
  let numFields = reader.readMapLength();

  let _ipfsHash: string = "";
  let _ipfsHashSet: bool = false;
  let _txReceipt: string = "";
  let _txReceiptSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "ipfsHash") {
      reader.context().push(field, "string", "type found, reading property");
      _ipfsHash = reader.readString();
      _ipfsHashSet = true;
      reader.context().pop();
    }
    else if (field == "txReceipt") {
      reader.context().push(field, "string", "type found, reading property");
      _txReceipt = reader.readString();
      _txReceiptSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_ipfsHashSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'ipfsHash: String'"));
  }
  if (!_txReceiptSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'txReceipt: String'"));
  }

  return {
    ipfsHash: _ipfsHash,
    txReceipt: _txReceipt
  };
}
