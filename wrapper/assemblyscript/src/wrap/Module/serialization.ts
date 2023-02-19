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
import * as Types from "..";

export class Args_getData {
  address: string;
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetDataArgs(argsBuf: ArrayBuffer): Args_getData {
  const context: Context = new Context("Deserializing module-type: getData Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

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
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }

  return {
    address: _address,
    connection: _connection
  };
}

export function serializegetDataArgs(args: Args_getData): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getData Args");
  const sizer = new WriteSizer(sizerContext);
  writegetDataArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getData Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetDataArgs(encoder, args);
  return buffer;
}

export function writegetDataArgs(
  writer: Write,
  args: Args_getData
): void {
  writer.writeMapLength(2);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializegetDataResult(result: i32): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getData Result");
  const sizer = new WriteSizer(sizerContext);
  writegetDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getData Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetDataResult(encoder, result);
  return buffer;
}

export function writegetDataResult(writer: Write, result: i32): void {
  writer.context().push("getData", "i32", "writing property");
  writer.writeInt32(result);
  writer.context().pop();
}

export function deserializegetDataResult(buffer: ArrayBuffer): i32 {
  const context: Context = new Context("Deserializing module-type: getData Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getData", "i32", "reading function output");
  const res: i32 = reader.readInt32();
  reader.context().pop();

  return res;
}

export class Args_setData {
  address: string;
  value: u32;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesetDataArgs(argsBuf: ArrayBuffer): Args_setData {
  const context: Context = new Context("Deserializing module-type: setData Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _value: u32 = 0;
  let _valueSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

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
    else if (field == "value") {
      reader.context().push(field, "u32", "type found, reading property");
      _value = reader.readUInt32();
      _valueSet = true;
      reader.context().pop();
    }
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }
  if (!_valueSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'value: UInt32'"));
  }

  return {
    address: _address,
    value: _value,
    connection: _connection
  };
}

export function serializesetDataArgs(args: Args_setData): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: setData Args");
  const sizer = new WriteSizer(sizerContext);
  writesetDataArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: setData Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesetDataArgs(encoder, args);
  return buffer;
}

export function writesetDataArgs(
  writer: Write,
  args: Args_setData
): void {
  writer.writeMapLength(3);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("value", "u32", "writing property");
  writer.writeString("value");
  writer.writeUInt32(args.value);
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializesetDataResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: setData Result");
  const sizer = new WriteSizer(sizerContext);
  writesetDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: setData Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesetDataResult(encoder, result);
  return buffer;
}

export function writesetDataResult(writer: Write, result: string): void {
  writer.context().push("setData", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializesetDataResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing module-type: setData Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("setData", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_deployContract {
  connection: Types.Ethereum_Connection | null;
}

export function deserializedeployContractArgs(argsBuf: ArrayBuffer): Args_deployContract {
  const context: Context = new Context("Deserializing module-type: deployContract Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    reader.context().pop();
  }


  return {
    connection: _connection
  };
}

export function serializedeployContractArgs(args: Args_deployContract): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: deployContract Args");
  const sizer = new WriteSizer(sizerContext);
  writedeployContractArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: deployContract Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writedeployContractArgs(encoder, args);
  return buffer;
}

export function writedeployContractArgs(
  writer: Write,
  args: Args_deployContract
): void {
  writer.writeMapLength(1);
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializedeployContractResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: deployContract Result");
  const sizer = new WriteSizer(sizerContext);
  writedeployContractResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: deployContract Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writedeployContractResult(encoder, result);
  return buffer;
}

export function writedeployContractResult(writer: Write, result: string): void {
  writer.context().push("deployContract", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializedeployContractResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing module-type: deployContract Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("deployContract", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_setIpfsData {
  options: Types.SetIpfsDataOptions;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesetIpfsDataArgs(argsBuf: ArrayBuffer): Args_setIpfsData {
  const context: Context = new Context("Deserializing module-type: setIpfsData Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _options: Types.SetIpfsDataOptions | null = null;
  let _optionsSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "options") {
      reader.context().push(field, "Types.SetIpfsDataOptions", "type found, reading property");
      const object = Types.SetIpfsDataOptions.read(reader);
      _options = object;
      _optionsSet = true;
      reader.context().pop();
    }
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_options || !_optionsSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'options: SetIpfsDataOptions'"));
  }

  return {
    options: _options,
    connection: _connection
  };
}

export function serializesetIpfsDataArgs(args: Args_setIpfsData): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: setIpfsData Args");
  const sizer = new WriteSizer(sizerContext);
  writesetIpfsDataArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: setIpfsData Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesetIpfsDataArgs(encoder, args);
  return buffer;
}

export function writesetIpfsDataArgs(
  writer: Write,
  args: Args_setIpfsData
): void {
  writer.writeMapLength(2);
  writer.context().push("options", "Types.SetIpfsDataOptions", "writing property");
  writer.writeString("options");
  Types.SetIpfsDataOptions.write(writer, args.options);
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializesetIpfsDataResult(result: Types.SetIpfsDataResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: setIpfsData Result");
  const sizer = new WriteSizer(sizerContext);
  writesetIpfsDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: setIpfsData Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesetIpfsDataResult(encoder, result);
  return buffer;
}

export function writesetIpfsDataResult(writer: Write, result: Types.SetIpfsDataResult): void {
  writer.context().push("setIpfsData", "Types.SetIpfsDataResult", "writing property");
  Types.SetIpfsDataResult.write(writer, result);
  writer.context().pop();
}

export function deserializesetIpfsDataResult(buffer: ArrayBuffer): Types.SetIpfsDataResult {
  const context: Context = new Context("Deserializing module-type: setIpfsData Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("setIpfsData", "Types.SetIpfsDataResult", "reading function output");
  const object = Types.SetIpfsDataResult.read(reader);
  const res: Types.SetIpfsDataResult =  object;
  reader.context().pop();

  return res;
}

export class Args_getIpfsData {
  address: string;
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetIpfsDataArgs(argsBuf: ArrayBuffer): Args_getIpfsData {
  const context: Context = new Context("Deserializing module-type: getIpfsData Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

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
    else if (field == "connection") {
      reader.context().push(field, "Types.Ethereum_Connection | null", "type found, reading property");
      let object: Types.Ethereum_Connection | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_Connection.read(reader);
      }
      _connection = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }

  return {
    address: _address,
    connection: _connection
  };
}

export function serializegetIpfsDataArgs(args: Args_getIpfsData): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getIpfsData Args");
  const sizer = new WriteSizer(sizerContext);
  writegetIpfsDataArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getIpfsData Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetIpfsDataArgs(encoder, args);
  return buffer;
}

export function writegetIpfsDataArgs(
  writer: Write,
  args: Args_getIpfsData
): void {
  writer.writeMapLength(2);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializegetIpfsDataResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: getIpfsData Result");
  const sizer = new WriteSizer(sizerContext);
  writegetIpfsDataResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: getIpfsData Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetIpfsDataResult(encoder, result);
  return buffer;
}

export function writegetIpfsDataResult(writer: Write, result: string): void {
  writer.context().push("getIpfsData", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializegetIpfsDataResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing module-type: getIpfsData Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getIpfsData", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}
