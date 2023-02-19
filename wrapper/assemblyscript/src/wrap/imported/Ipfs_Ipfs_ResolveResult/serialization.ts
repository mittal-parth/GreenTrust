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
import { Ipfs_Ipfs_ResolveResult } from "./";
import * as Types from "../..";

export function serializeIpfs_Ipfs_ResolveResult(type: Ipfs_Ipfs_ResolveResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Ipfs_Ipfs_ResolveResult");
  const sizer = new WriteSizer(sizerContext);
  writeIpfs_Ipfs_ResolveResult(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Ipfs_Ipfs_ResolveResult");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeIpfs_Ipfs_ResolveResult(encoder, type);
  return buffer;
}

export function writeIpfs_Ipfs_ResolveResult(writer: Write, type: Ipfs_Ipfs_ResolveResult): void {
  writer.writeMapLength(2);
  writer.context().push("cid", "string", "writing property");
  writer.writeString("cid");
  writer.writeString(type.cid);
  writer.context().pop();
  writer.context().push("provider", "string", "writing property");
  writer.writeString("provider");
  writer.writeString(type.provider);
  writer.context().pop();
}

export function deserializeIpfs_Ipfs_ResolveResult(buffer: ArrayBuffer): Ipfs_Ipfs_ResolveResult {
  const context: Context = new Context("Deserializing imported object-type Ipfs_Ipfs_ResolveResult");
  const reader = new ReadDecoder(buffer, context);
  return readIpfs_Ipfs_ResolveResult(reader);
}

export function readIpfs_Ipfs_ResolveResult(reader: Read): Ipfs_Ipfs_ResolveResult {
  let numFields = reader.readMapLength();

  let _cid: string = "";
  let _cidSet: bool = false;
  let _provider: string = "";
  let _providerSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "cid") {
      reader.context().push(field, "string", "type found, reading property");
      _cid = reader.readString();
      _cidSet = true;
      reader.context().pop();
    }
    else if (field == "provider") {
      reader.context().push(field, "string", "type found, reading property");
      _provider = reader.readString();
      _providerSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_cidSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'cid: String'"));
  }
  if (!_providerSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'provider: String'"));
  }

  return {
    cid: _cid,
    provider: _provider
  };
}
