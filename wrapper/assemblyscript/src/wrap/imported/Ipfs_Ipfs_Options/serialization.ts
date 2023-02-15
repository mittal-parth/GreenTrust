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
import { Ipfs_Ipfs_Options } from "./";
import * as Types from "../..";

export function serializeIpfs_Ipfs_Options(type: Ipfs_Ipfs_Options): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing)  imported object-type: Ipfs_Ipfs_Options");
  const sizer = new WriteSizer(sizerContext);
  writeIpfs_Ipfs_Options(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) import object-type: Ipfs_Ipfs_Options");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeIpfs_Ipfs_Options(encoder, type);
  return buffer;
}

export function writeIpfs_Ipfs_Options(writer: Write, type: Ipfs_Ipfs_Options): void {
  writer.writeMapLength(4);
  writer.context().push("timeout", "Box<u32> | null", "writing property");
  writer.writeString("timeout");
  writer.writeOptionalUInt32(type.timeout);
  writer.context().pop();
  writer.context().push("provider", "string | null", "writing property");
  writer.writeString("provider");
  writer.writeOptionalString(type.provider);
  writer.context().pop();
  writer.context().push("fallbackProviders", "Array<string> | null", "writing property");
  writer.writeString("fallbackProviders");
  writer.writeOptionalArray(type.fallbackProviders, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("disableParallelRequests", "Box<bool> | null", "writing property");
  writer.writeString("disableParallelRequests");
  writer.writeOptionalBool(type.disableParallelRequests);
  writer.context().pop();
}

export function deserializeIpfs_Ipfs_Options(buffer: ArrayBuffer): Ipfs_Ipfs_Options {
  const context: Context = new Context("Deserializing imported object-type Ipfs_Ipfs_Options");
  const reader = new ReadDecoder(buffer, context);
  return readIpfs_Ipfs_Options(reader);
}

export function readIpfs_Ipfs_Options(reader: Read): Ipfs_Ipfs_Options {
  let numFields = reader.readMapLength();

  let _timeout: Box<u32> | null = null;
  let _provider: string | null = null;
  let _fallbackProviders: Array<string> | null = null;
  let _disableParallelRequests: Box<bool> | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "timeout") {
      reader.context().push(field, "Box<u32> | null", "type found, reading property");
      _timeout = reader.readOptionalUInt32();
      reader.context().pop();
    }
    else if (field == "provider") {
      reader.context().push(field, "string | null", "type found, reading property");
      _provider = reader.readOptionalString();
      reader.context().pop();
    }
    else if (field == "fallbackProviders") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _fallbackProviders = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
      reader.context().pop();
    }
    else if (field == "disableParallelRequests") {
      reader.context().push(field, "Box<bool> | null", "type found, reading property");
      _disableParallelRequests = reader.readOptionalBool();
      reader.context().pop();
    }
    reader.context().pop();
  }


  return {
    timeout: _timeout,
    provider: _provider,
    fallbackProviders: _fallbackProviders,
    disableParallelRequests: _disableParallelRequests
  };
}
