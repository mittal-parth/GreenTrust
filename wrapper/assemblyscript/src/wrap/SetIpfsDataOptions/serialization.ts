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
import { SetIpfsDataOptions } from "./";
import * as Types from "..";

export function serializeSetIpfsDataOptions(type: SetIpfsDataOptions): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) object-type: SetIpfsDataOptions");
  const sizer = new WriteSizer(sizerContext);
  writeSetIpfsDataOptions(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) object-type: SetIpfsDataOptions");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeSetIpfsDataOptions(encoder, type);
  return buffer;
}

export function writeSetIpfsDataOptions(writer: Write, type: SetIpfsDataOptions): void {
  writer.writeMapLength(2);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(type.address);
  writer.context().pop();
  writer.context().push("data", "string", "writing property");
  writer.writeString("data");
  writer.writeString(type.data);
  writer.context().pop();
}

export function deserializeSetIpfsDataOptions(buffer: ArrayBuffer): SetIpfsDataOptions {
  const context: Context = new Context("Deserializing object-type SetIpfsDataOptions");
  const reader = new ReadDecoder(buffer, context);
  return readSetIpfsDataOptions(reader);
}

export function readSetIpfsDataOptions(reader: Read): SetIpfsDataOptions {
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _data: string = "";
  let _dataSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "address") {
      reader.context().push(field, "string", "type found, reading property");
      _address = reader.readString();
      _addressSet = true;
      reader.context().pop();
    }
    else if (field == "data") {
      reader.context().push(field, "string", "type found, reading property");
      _data = reader.readString();
      _dataSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'address: String'"));
  }
  if (!_dataSet) {
    throw new Error(reader.context().printWithContext("Missing required property: 'data: String'"));
  }

  return {
    address: _address,
    data: _data
  };
}
