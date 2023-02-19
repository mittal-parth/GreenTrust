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
import * as Types from "../..";

export class Args_callContractView {
  address: string;
  method: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializecallContractViewArgs(argsBuf: ArrayBuffer): Args_callContractView {
  const context: Context = new Context("Deserializing imported module-type: callContractView Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;
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
    else if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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
  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    address: _address,
    method: _method,
    args: _args,
    connection: _connection
  };
}

export function serializecallContractViewArgs(args: Args_callContractView): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractView Args");
  const sizer = new WriteSizer(sizerContext);
  writecallContractViewArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractView Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractViewArgs(encoder, args);
  return buffer;
}

export function writecallContractViewArgs(
  writer: Write,
  args: Args_callContractView
): void {
  writer.writeMapLength(4);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
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

export function serializecallContractViewResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractView Result");
  const sizer = new WriteSizer(sizerContext);
  writecallContractViewResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractView Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractViewResult(encoder, result);
  return buffer;
}

export function writecallContractViewResult(writer: Write, result: string): void {
  writer.context().push("callContractView", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializecallContractViewResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: callContractView Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("callContractView", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_callContractStatic {
  address: string;
  method: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializecallContractStaticArgs(argsBuf: ArrayBuffer): Args_callContractStatic {
  const context: Context = new Context("Deserializing imported module-type: callContractStatic Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

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
    else if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }
  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    address: _address,
    method: _method,
    args: _args,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializecallContractStaticArgs(args: Args_callContractStatic): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractStatic Args");
  const sizer = new WriteSizer(sizerContext);
  writecallContractStaticArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractStatic Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractStaticArgs(encoder, args);
  return buffer;
}

export function writecallContractStaticArgs(
  writer: Write,
  args: Args_callContractStatic
): void {
  writer.writeMapLength(5);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
  writer.context().push("txOverrides", "Types.Ethereum_TxOverrides | null", "writing property");
  writer.writeString("txOverrides");
  if (args.txOverrides) {
    Types.Ethereum_TxOverrides.write(writer, args.txOverrides as Types.Ethereum_TxOverrides);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializecallContractStaticResult(result: Types.Ethereum_StaticTxResult): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractStatic Result");
  const sizer = new WriteSizer(sizerContext);
  writecallContractStaticResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractStatic Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractStaticResult(encoder, result);
  return buffer;
}

export function writecallContractStaticResult(writer: Write, result: Types.Ethereum_StaticTxResult): void {
  writer.context().push("callContractStatic", "Types.Ethereum_StaticTxResult", "writing property");
  Types.Ethereum_StaticTxResult.write(writer, result);
  writer.context().pop();
}

export function deserializecallContractStaticResult(buffer: ArrayBuffer): Types.Ethereum_StaticTxResult {
  const context: Context = new Context("Deserializing imported module-type: callContractStatic Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("callContractStatic", "Types.Ethereum_StaticTxResult", "reading function output");
  const object = Types.Ethereum_StaticTxResult.read(reader);
  const res: Types.Ethereum_StaticTxResult =  object;
  reader.context().pop();

  return res;
}

export class Args_getBalance {
  address: string;
  blockTag: BigInt | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetBalanceArgs(argsBuf: ArrayBuffer): Args_getBalance {
  const context: Context = new Context("Deserializing imported module-type: getBalance Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _blockTag: BigInt | null = null;
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
    else if (field == "blockTag") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _blockTag = reader.readOptionalBigInt();
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
    blockTag: _blockTag,
    connection: _connection
  };
}

export function serializegetBalanceArgs(args: Args_getBalance): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getBalance Args");
  const sizer = new WriteSizer(sizerContext);
  writegetBalanceArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getBalance Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetBalanceArgs(encoder, args);
  return buffer;
}

export function writegetBalanceArgs(
  writer: Write,
  args: Args_getBalance
): void {
  writer.writeMapLength(3);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("blockTag", "BigInt | null", "writing property");
  writer.writeString("blockTag");
  writer.writeOptionalBigInt(args.blockTag);
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

export function serializegetBalanceResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getBalance Result");
  const sizer = new WriteSizer(sizerContext);
  writegetBalanceResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getBalance Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetBalanceResult(encoder, result);
  return buffer;
}

export function writegetBalanceResult(writer: Write, result: BigInt): void {
  writer.context().push("getBalance", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializegetBalanceResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: getBalance Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getBalance", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_encodeParams {
  types: Array<string>;
  values: Array<string>;
}

export function deserializeencodeParamsArgs(argsBuf: ArrayBuffer): Args_encodeParams {
  const context: Context = new Context("Deserializing imported module-type: encodeParams Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _types: Array<string> = [];
  let _typesSet: bool = false;
  let _values: Array<string> = [];
  let _valuesSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "types") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _types = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _typesSet = true;
      reader.context().pop();
    }
    else if (field == "values") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _values = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _valuesSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_typesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'types: [String]'"));
  }
  if (!_valuesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'values: [String]'"));
  }

  return {
    types: _types,
    values: _values
  };
}

export function serializeencodeParamsArgs(args: Args_encodeParams): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: encodeParams Args");
  const sizer = new WriteSizer(sizerContext);
  writeencodeParamsArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: encodeParams Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeencodeParamsArgs(encoder, args);
  return buffer;
}

export function writeencodeParamsArgs(
  writer: Write,
  args: Args_encodeParams
): void {
  writer.writeMapLength(2);
  writer.context().push("types", "Array<string>", "writing property");
  writer.writeString("types");
  writer.writeArray(args.types, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("values", "Array<string>", "writing property");
  writer.writeString("values");
  writer.writeArray(args.values, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function serializeencodeParamsResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: encodeParams Result");
  const sizer = new WriteSizer(sizerContext);
  writeencodeParamsResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: encodeParams Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeencodeParamsResult(encoder, result);
  return buffer;
}

export function writeencodeParamsResult(writer: Write, result: string): void {
  writer.context().push("encodeParams", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializeencodeParamsResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: encodeParams Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("encodeParams", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_encodeFunction {
  method: string;
  args: Array<string> | null;
}

export function deserializeencodeFunctionArgs(argsBuf: ArrayBuffer): Args_encodeFunction {
  const context: Context = new Context("Deserializing imported module-type: encodeFunction Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    method: _method,
    args: _args
  };
}

export function serializeencodeFunctionArgs(args: Args_encodeFunction): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: encodeFunction Args");
  const sizer = new WriteSizer(sizerContext);
  writeencodeFunctionArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: encodeFunction Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeencodeFunctionArgs(encoder, args);
  return buffer;
}

export function writeencodeFunctionArgs(
  writer: Write,
  args: Args_encodeFunction
): void {
  writer.writeMapLength(2);
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function serializeencodeFunctionResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: encodeFunction Result");
  const sizer = new WriteSizer(sizerContext);
  writeencodeFunctionResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: encodeFunction Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeencodeFunctionResult(encoder, result);
  return buffer;
}

export function writeencodeFunctionResult(writer: Write, result: string): void {
  writer.context().push("encodeFunction", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializeencodeFunctionResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: encodeFunction Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("encodeFunction", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_solidityPack {
  types: Array<string>;
  values: Array<string>;
}

export function deserializesolidityPackArgs(argsBuf: ArrayBuffer): Args_solidityPack {
  const context: Context = new Context("Deserializing imported module-type: solidityPack Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _types: Array<string> = [];
  let _typesSet: bool = false;
  let _values: Array<string> = [];
  let _valuesSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "types") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _types = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _typesSet = true;
      reader.context().pop();
    }
    else if (field == "values") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _values = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _valuesSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_typesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'types: [String]'"));
  }
  if (!_valuesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'values: [String]'"));
  }

  return {
    types: _types,
    values: _values
  };
}

export function serializesolidityPackArgs(args: Args_solidityPack): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: solidityPack Args");
  const sizer = new WriteSizer(sizerContext);
  writesolidityPackArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: solidityPack Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesolidityPackArgs(encoder, args);
  return buffer;
}

export function writesolidityPackArgs(
  writer: Write,
  args: Args_solidityPack
): void {
  writer.writeMapLength(2);
  writer.context().push("types", "Array<string>", "writing property");
  writer.writeString("types");
  writer.writeArray(args.types, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("values", "Array<string>", "writing property");
  writer.writeString("values");
  writer.writeArray(args.values, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function serializesolidityPackResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: solidityPack Result");
  const sizer = new WriteSizer(sizerContext);
  writesolidityPackResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: solidityPack Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesolidityPackResult(encoder, result);
  return buffer;
}

export function writesolidityPackResult(writer: Write, result: string): void {
  writer.context().push("solidityPack", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializesolidityPackResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: solidityPack Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("solidityPack", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_solidityKeccak256 {
  types: Array<string>;
  values: Array<string>;
}

export function deserializesolidityKeccak256Args(argsBuf: ArrayBuffer): Args_solidityKeccak256 {
  const context: Context = new Context("Deserializing imported module-type: solidityKeccak256 Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _types: Array<string> = [];
  let _typesSet: bool = false;
  let _values: Array<string> = [];
  let _valuesSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "types") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _types = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _typesSet = true;
      reader.context().pop();
    }
    else if (field == "values") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _values = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _valuesSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_typesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'types: [String]'"));
  }
  if (!_valuesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'values: [String]'"));
  }

  return {
    types: _types,
    values: _values
  };
}

export function serializesolidityKeccak256Args(args: Args_solidityKeccak256): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: solidityKeccak256 Args");
  const sizer = new WriteSizer(sizerContext);
  writesolidityKeccak256Args(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: solidityKeccak256 Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesolidityKeccak256Args(encoder, args);
  return buffer;
}

export function writesolidityKeccak256Args(
  writer: Write,
  args: Args_solidityKeccak256
): void {
  writer.writeMapLength(2);
  writer.context().push("types", "Array<string>", "writing property");
  writer.writeString("types");
  writer.writeArray(args.types, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("values", "Array<string>", "writing property");
  writer.writeString("values");
  writer.writeArray(args.values, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function serializesolidityKeccak256Result(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: solidityKeccak256 Result");
  const sizer = new WriteSizer(sizerContext);
  writesolidityKeccak256Result(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: solidityKeccak256 Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesolidityKeccak256Result(encoder, result);
  return buffer;
}

export function writesolidityKeccak256Result(writer: Write, result: string): void {
  writer.context().push("solidityKeccak256", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializesolidityKeccak256Result(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: solidityKeccak256 Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("solidityKeccak256", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_soliditySha256 {
  types: Array<string>;
  values: Array<string>;
}

export function deserializesoliditySha256Args(argsBuf: ArrayBuffer): Args_soliditySha256 {
  const context: Context = new Context("Deserializing imported module-type: soliditySha256 Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _types: Array<string> = [];
  let _typesSet: bool = false;
  let _values: Array<string> = [];
  let _valuesSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "types") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _types = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _typesSet = true;
      reader.context().pop();
    }
    else if (field == "values") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _values = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _valuesSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_typesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'types: [String]'"));
  }
  if (!_valuesSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'values: [String]'"));
  }

  return {
    types: _types,
    values: _values
  };
}

export function serializesoliditySha256Args(args: Args_soliditySha256): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: soliditySha256 Args");
  const sizer = new WriteSizer(sizerContext);
  writesoliditySha256Args(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: soliditySha256 Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesoliditySha256Args(encoder, args);
  return buffer;
}

export function writesoliditySha256Args(
  writer: Write,
  args: Args_soliditySha256
): void {
  writer.writeMapLength(2);
  writer.context().push("types", "Array<string>", "writing property");
  writer.writeString("types");
  writer.writeArray(args.types, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("values", "Array<string>", "writing property");
  writer.writeString("values");
  writer.writeArray(args.values, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function serializesoliditySha256Result(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: soliditySha256 Result");
  const sizer = new WriteSizer(sizerContext);
  writesoliditySha256Result(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: soliditySha256 Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesoliditySha256Result(encoder, result);
  return buffer;
}

export function writesoliditySha256Result(writer: Write, result: string): void {
  writer.context().push("soliditySha256", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializesoliditySha256Result(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: soliditySha256 Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("soliditySha256", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_getSignerAddress {
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetSignerAddressArgs(argsBuf: ArrayBuffer): Args_getSignerAddress {
  const context: Context = new Context("Deserializing imported module-type: getSignerAddress Args");
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

export function serializegetSignerAddressArgs(args: Args_getSignerAddress): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerAddress Args");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerAddressArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerAddress Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerAddressArgs(encoder, args);
  return buffer;
}

export function writegetSignerAddressArgs(
  writer: Write,
  args: Args_getSignerAddress
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

export function serializegetSignerAddressResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerAddress Result");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerAddressResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerAddress Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerAddressResult(encoder, result);
  return buffer;
}

export function writegetSignerAddressResult(writer: Write, result: string): void {
  writer.context().push("getSignerAddress", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializegetSignerAddressResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: getSignerAddress Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getSignerAddress", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_getSignerBalance {
  blockTag: BigInt | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetSignerBalanceArgs(argsBuf: ArrayBuffer): Args_getSignerBalance {
  const context: Context = new Context("Deserializing imported module-type: getSignerBalance Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _blockTag: BigInt | null = null;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "blockTag") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _blockTag = reader.readOptionalBigInt();
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


  return {
    blockTag: _blockTag,
    connection: _connection
  };
}

export function serializegetSignerBalanceArgs(args: Args_getSignerBalance): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerBalance Args");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerBalanceArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerBalance Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerBalanceArgs(encoder, args);
  return buffer;
}

export function writegetSignerBalanceArgs(
  writer: Write,
  args: Args_getSignerBalance
): void {
  writer.writeMapLength(2);
  writer.context().push("blockTag", "BigInt | null", "writing property");
  writer.writeString("blockTag");
  writer.writeOptionalBigInt(args.blockTag);
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

export function serializegetSignerBalanceResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerBalance Result");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerBalanceResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerBalance Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerBalanceResult(encoder, result);
  return buffer;
}

export function writegetSignerBalanceResult(writer: Write, result: BigInt): void {
  writer.context().push("getSignerBalance", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializegetSignerBalanceResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: getSignerBalance Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getSignerBalance", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_getSignerTransactionCount {
  blockTag: BigInt | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetSignerTransactionCountArgs(argsBuf: ArrayBuffer): Args_getSignerTransactionCount {
  const context: Context = new Context("Deserializing imported module-type: getSignerTransactionCount Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _blockTag: BigInt | null = null;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "blockTag") {
      reader.context().push(field, "BigInt | null", "type found, reading property");
      _blockTag = reader.readOptionalBigInt();
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


  return {
    blockTag: _blockTag,
    connection: _connection
  };
}

export function serializegetSignerTransactionCountArgs(args: Args_getSignerTransactionCount): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerTransactionCount Args");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerTransactionCountArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerTransactionCount Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerTransactionCountArgs(encoder, args);
  return buffer;
}

export function writegetSignerTransactionCountArgs(
  writer: Write,
  args: Args_getSignerTransactionCount
): void {
  writer.writeMapLength(2);
  writer.context().push("blockTag", "BigInt | null", "writing property");
  writer.writeString("blockTag");
  writer.writeOptionalBigInt(args.blockTag);
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

export function serializegetSignerTransactionCountResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getSignerTransactionCount Result");
  const sizer = new WriteSizer(sizerContext);
  writegetSignerTransactionCountResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getSignerTransactionCount Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetSignerTransactionCountResult(encoder, result);
  return buffer;
}

export function writegetSignerTransactionCountResult(writer: Write, result: BigInt): void {
  writer.context().push("getSignerTransactionCount", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializegetSignerTransactionCountResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: getSignerTransactionCount Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getSignerTransactionCount", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_getGasPrice {
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetGasPriceArgs(argsBuf: ArrayBuffer): Args_getGasPrice {
  const context: Context = new Context("Deserializing imported module-type: getGasPrice Args");
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

export function serializegetGasPriceArgs(args: Args_getGasPrice): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getGasPrice Args");
  const sizer = new WriteSizer(sizerContext);
  writegetGasPriceArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getGasPrice Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetGasPriceArgs(encoder, args);
  return buffer;
}

export function writegetGasPriceArgs(
  writer: Write,
  args: Args_getGasPrice
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

export function serializegetGasPriceResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getGasPrice Result");
  const sizer = new WriteSizer(sizerContext);
  writegetGasPriceResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getGasPrice Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetGasPriceResult(encoder, result);
  return buffer;
}

export function writegetGasPriceResult(writer: Write, result: BigInt): void {
  writer.context().push("getGasPrice", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializegetGasPriceResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: getGasPrice Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getGasPrice", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_estimateTransactionGas {
  tx: Types.Ethereum_TxRequest;
  connection: Types.Ethereum_Connection | null;
}

export function deserializeestimateTransactionGasArgs(argsBuf: ArrayBuffer): Args_estimateTransactionGas {
  const context: Context = new Context("Deserializing imported module-type: estimateTransactionGas Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _tx: Types.Ethereum_TxRequest | null = null;
  let _txSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "tx") {
      reader.context().push(field, "Types.Ethereum_TxRequest", "type found, reading property");
      const object = Types.Ethereum_TxRequest.read(reader);
      _tx = object;
      _txSet = true;
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

  if (!_tx || !_txSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'tx: Ethereum_TxRequest'"));
  }

  return {
    tx: _tx,
    connection: _connection
  };
}

export function serializeestimateTransactionGasArgs(args: Args_estimateTransactionGas): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: estimateTransactionGas Args");
  const sizer = new WriteSizer(sizerContext);
  writeestimateTransactionGasArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: estimateTransactionGas Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeestimateTransactionGasArgs(encoder, args);
  return buffer;
}

export function writeestimateTransactionGasArgs(
  writer: Write,
  args: Args_estimateTransactionGas
): void {
  writer.writeMapLength(2);
  writer.context().push("tx", "Types.Ethereum_TxRequest", "writing property");
  writer.writeString("tx");
  Types.Ethereum_TxRequest.write(writer, args.tx);
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

export function serializeestimateTransactionGasResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: estimateTransactionGas Result");
  const sizer = new WriteSizer(sizerContext);
  writeestimateTransactionGasResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: estimateTransactionGas Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeestimateTransactionGasResult(encoder, result);
  return buffer;
}

export function writeestimateTransactionGasResult(writer: Write, result: BigInt): void {
  writer.context().push("estimateTransactionGas", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializeestimateTransactionGasResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: estimateTransactionGas Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("estimateTransactionGas", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_estimateContractCallGas {
  address: string;
  method: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializeestimateContractCallGasArgs(argsBuf: ArrayBuffer): Args_estimateContractCallGas {
  const context: Context = new Context("Deserializing imported module-type: estimateContractCallGas Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

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
    else if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }
  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    address: _address,
    method: _method,
    args: _args,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializeestimateContractCallGasArgs(args: Args_estimateContractCallGas): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: estimateContractCallGas Args");
  const sizer = new WriteSizer(sizerContext);
  writeestimateContractCallGasArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: estimateContractCallGas Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeestimateContractCallGasArgs(encoder, args);
  return buffer;
}

export function writeestimateContractCallGasArgs(
  writer: Write,
  args: Args_estimateContractCallGas
): void {
  writer.writeMapLength(5);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
  writer.context().push("txOverrides", "Types.Ethereum_TxOverrides | null", "writing property");
  writer.writeString("txOverrides");
  if (args.txOverrides) {
    Types.Ethereum_TxOverrides.write(writer, args.txOverrides as Types.Ethereum_TxOverrides);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializeestimateContractCallGasResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: estimateContractCallGas Result");
  const sizer = new WriteSizer(sizerContext);
  writeestimateContractCallGasResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: estimateContractCallGas Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeestimateContractCallGasResult(encoder, result);
  return buffer;
}

export function writeestimateContractCallGasResult(writer: Write, result: BigInt): void {
  writer.context().push("estimateContractCallGas", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializeestimateContractCallGasResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: estimateContractCallGas Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("estimateContractCallGas", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_checkAddress {
  address: string;
}

export function deserializecheckAddressArgs(argsBuf: ArrayBuffer): Args_checkAddress {
  const context: Context = new Context("Deserializing imported module-type: checkAddress Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;

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
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }

  return {
    address: _address
  };
}

export function serializecheckAddressArgs(args: Args_checkAddress): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: checkAddress Args");
  const sizer = new WriteSizer(sizerContext);
  writecheckAddressArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: checkAddress Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecheckAddressArgs(encoder, args);
  return buffer;
}

export function writecheckAddressArgs(
  writer: Write,
  args: Args_checkAddress
): void {
  writer.writeMapLength(1);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
}

export function serializecheckAddressResult(result: bool): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: checkAddress Result");
  const sizer = new WriteSizer(sizerContext);
  writecheckAddressResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: checkAddress Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecheckAddressResult(encoder, result);
  return buffer;
}

export function writecheckAddressResult(writer: Write, result: bool): void {
  writer.context().push("checkAddress", "bool", "writing property");
  writer.writeBool(result);
  writer.context().pop();
}

export function deserializecheckAddressResult(buffer: ArrayBuffer): bool {
  const context: Context = new Context("Deserializing imported module-type: checkAddress Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("checkAddress", "bool", "reading function output");
  const res: bool = reader.readBool();
  reader.context().pop();

  return res;
}

export class Args_toWei {
  eth: string;
}

export function deserializetoWeiArgs(argsBuf: ArrayBuffer): Args_toWei {
  const context: Context = new Context("Deserializing imported module-type: toWei Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _eth: string = "";
  let _ethSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "eth") {
      reader.context().push(field, "string", "type found, reading property");
      _eth = reader.readString();
      _ethSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_ethSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'eth: String'"));
  }

  return {
    eth: _eth
  };
}

export function serializetoWeiArgs(args: Args_toWei): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: toWei Args");
  const sizer = new WriteSizer(sizerContext);
  writetoWeiArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: toWei Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writetoWeiArgs(encoder, args);
  return buffer;
}

export function writetoWeiArgs(
  writer: Write,
  args: Args_toWei
): void {
  writer.writeMapLength(1);
  writer.context().push("eth", "string", "writing property");
  writer.writeString("eth");
  writer.writeString(args.eth);
  writer.context().pop();
}

export function serializetoWeiResult(result: BigInt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: toWei Result");
  const sizer = new WriteSizer(sizerContext);
  writetoWeiResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: toWei Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writetoWeiResult(encoder, result);
  return buffer;
}

export function writetoWeiResult(writer: Write, result: BigInt): void {
  writer.context().push("toWei", "BigInt", "writing property");
  writer.writeBigInt(result);
  writer.context().pop();
}

export function deserializetoWeiResult(buffer: ArrayBuffer): BigInt {
  const context: Context = new Context("Deserializing imported module-type: toWei Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("toWei", "BigInt", "reading function output");
  const res: BigInt = reader.readBigInt();
  reader.context().pop();

  return res;
}

export class Args_toEth {
  wei: BigInt;
}

export function deserializetoEthArgs(argsBuf: ArrayBuffer): Args_toEth {
  const context: Context = new Context("Deserializing imported module-type: toEth Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _wei: BigInt = BigInt.fromUInt16(0);
  let _weiSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "wei") {
      reader.context().push(field, "BigInt", "type found, reading property");
      _wei = reader.readBigInt();
      _weiSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_weiSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'wei: BigInt'"));
  }

  return {
    wei: _wei
  };
}

export function serializetoEthArgs(args: Args_toEth): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: toEth Args");
  const sizer = new WriteSizer(sizerContext);
  writetoEthArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: toEth Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writetoEthArgs(encoder, args);
  return buffer;
}

export function writetoEthArgs(
  writer: Write,
  args: Args_toEth
): void {
  writer.writeMapLength(1);
  writer.context().push("wei", "BigInt", "writing property");
  writer.writeString("wei");
  writer.writeBigInt(args.wei);
  writer.context().pop();
}

export function serializetoEthResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: toEth Result");
  const sizer = new WriteSizer(sizerContext);
  writetoEthResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: toEth Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writetoEthResult(encoder, result);
  return buffer;
}

export function writetoEthResult(writer: Write, result: string): void {
  writer.context().push("toEth", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializetoEthResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: toEth Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("toEth", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_awaitTransaction {
  txHash: string;
  confirmations: u32;
  timeout: u32;
  connection: Types.Ethereum_Connection | null;
}

export function deserializeawaitTransactionArgs(argsBuf: ArrayBuffer): Args_awaitTransaction {
  const context: Context = new Context("Deserializing imported module-type: awaitTransaction Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _txHash: string = "";
  let _txHashSet: bool = false;
  let _confirmations: u32 = 0;
  let _confirmationsSet: bool = false;
  let _timeout: u32 = 0;
  let _timeoutSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "txHash") {
      reader.context().push(field, "string", "type found, reading property");
      _txHash = reader.readString();
      _txHashSet = true;
      reader.context().pop();
    }
    else if (field == "confirmations") {
      reader.context().push(field, "u32", "type found, reading property");
      _confirmations = reader.readUInt32();
      _confirmationsSet = true;
      reader.context().pop();
    }
    else if (field == "timeout") {
      reader.context().push(field, "u32", "type found, reading property");
      _timeout = reader.readUInt32();
      _timeoutSet = true;
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

  if (!_txHashSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'txHash: String'"));
  }
  if (!_confirmationsSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'confirmations: UInt32'"));
  }
  if (!_timeoutSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'timeout: UInt32'"));
  }

  return {
    txHash: _txHash,
    confirmations: _confirmations,
    timeout: _timeout,
    connection: _connection
  };
}

export function serializeawaitTransactionArgs(args: Args_awaitTransaction): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: awaitTransaction Args");
  const sizer = new WriteSizer(sizerContext);
  writeawaitTransactionArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: awaitTransaction Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeawaitTransactionArgs(encoder, args);
  return buffer;
}

export function writeawaitTransactionArgs(
  writer: Write,
  args: Args_awaitTransaction
): void {
  writer.writeMapLength(4);
  writer.context().push("txHash", "string", "writing property");
  writer.writeString("txHash");
  writer.writeString(args.txHash);
  writer.context().pop();
  writer.context().push("confirmations", "u32", "writing property");
  writer.writeString("confirmations");
  writer.writeUInt32(args.confirmations);
  writer.context().pop();
  writer.context().push("timeout", "u32", "writing property");
  writer.writeString("timeout");
  writer.writeUInt32(args.timeout);
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

export function serializeawaitTransactionResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: awaitTransaction Result");
  const sizer = new WriteSizer(sizerContext);
  writeawaitTransactionResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: awaitTransaction Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeawaitTransactionResult(encoder, result);
  return buffer;
}

export function writeawaitTransactionResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("awaitTransaction", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}

export function deserializeawaitTransactionResult(buffer: ArrayBuffer): Types.Ethereum_TxReceipt {
  const context: Context = new Context("Deserializing imported module-type: awaitTransaction Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("awaitTransaction", "Types.Ethereum_TxReceipt", "reading function output");
  const object = Types.Ethereum_TxReceipt.read(reader);
  const res: Types.Ethereum_TxReceipt =  object;
  reader.context().pop();

  return res;
}

export class Args_waitForEvent {
  address: string;
  event: string;
  args: Array<string> | null;
  timeout: Box<u32> | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializewaitForEventArgs(argsBuf: ArrayBuffer): Args_waitForEvent {
  const context: Context = new Context("Deserializing imported module-type: waitForEvent Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _event: string = "";
  let _eventSet: bool = false;
  let _args: Array<string> | null = null;
  let _timeout: Box<u32> | null = null;
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
    else if (field == "event") {
      reader.context().push(field, "string", "type found, reading property");
      _event = reader.readString();
      _eventSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
      reader.context().pop();
    }
    else if (field == "timeout") {
      reader.context().push(field, "Box<u32> | null", "type found, reading property");
      _timeout = reader.readOptionalUInt32();
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
  if (!_eventSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'event: String'"));
  }

  return {
    address: _address,
    event: _event,
    args: _args,
    timeout: _timeout,
    connection: _connection
  };
}

export function serializewaitForEventArgs(args: Args_waitForEvent): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: waitForEvent Args");
  const sizer = new WriteSizer(sizerContext);
  writewaitForEventArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: waitForEvent Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writewaitForEventArgs(encoder, args);
  return buffer;
}

export function writewaitForEventArgs(
  writer: Write,
  args: Args_waitForEvent
): void {
  writer.writeMapLength(5);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("event", "string", "writing property");
  writer.writeString("event");
  writer.writeString(args.event);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("timeout", "Box<u32> | null", "writing property");
  writer.writeString("timeout");
  writer.writeOptionalUInt32(args.timeout);
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

export function serializewaitForEventResult(result: Types.Ethereum_EventNotification): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: waitForEvent Result");
  const sizer = new WriteSizer(sizerContext);
  writewaitForEventResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: waitForEvent Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writewaitForEventResult(encoder, result);
  return buffer;
}

export function writewaitForEventResult(writer: Write, result: Types.Ethereum_EventNotification): void {
  writer.context().push("waitForEvent", "Types.Ethereum_EventNotification", "writing property");
  Types.Ethereum_EventNotification.write(writer, result);
  writer.context().pop();
}

export function deserializewaitForEventResult(buffer: ArrayBuffer): Types.Ethereum_EventNotification {
  const context: Context = new Context("Deserializing imported module-type: waitForEvent Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("waitForEvent", "Types.Ethereum_EventNotification", "reading function output");
  const object = Types.Ethereum_EventNotification.read(reader);
  const res: Types.Ethereum_EventNotification =  object;
  reader.context().pop();

  return res;
}

export class Args_getNetwork {
  connection: Types.Ethereum_Connection | null;
}

export function deserializegetNetworkArgs(argsBuf: ArrayBuffer): Args_getNetwork {
  const context: Context = new Context("Deserializing imported module-type: getNetwork Args");
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

export function serializegetNetworkArgs(args: Args_getNetwork): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getNetwork Args");
  const sizer = new WriteSizer(sizerContext);
  writegetNetworkArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getNetwork Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetNetworkArgs(encoder, args);
  return buffer;
}

export function writegetNetworkArgs(
  writer: Write,
  args: Args_getNetwork
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

export function serializegetNetworkResult(result: Types.Ethereum_Network): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: getNetwork Result");
  const sizer = new WriteSizer(sizerContext);
  writegetNetworkResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: getNetwork Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writegetNetworkResult(encoder, result);
  return buffer;
}

export function writegetNetworkResult(writer: Write, result: Types.Ethereum_Network): void {
  writer.context().push("getNetwork", "Types.Ethereum_Network", "writing property");
  Types.Ethereum_Network.write(writer, result);
  writer.context().pop();
}

export function deserializegetNetworkResult(buffer: ArrayBuffer): Types.Ethereum_Network {
  const context: Context = new Context("Deserializing imported module-type: getNetwork Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("getNetwork", "Types.Ethereum_Network", "reading function output");
  const object = Types.Ethereum_Network.read(reader);
  const res: Types.Ethereum_Network =  object;
  reader.context().pop();

  return res;
}

export class Args_requestAccounts {
  connection: Types.Ethereum_Connection | null;
}

export function deserializerequestAccountsArgs(argsBuf: ArrayBuffer): Args_requestAccounts {
  const context: Context = new Context("Deserializing imported module-type: requestAccounts Args");
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

export function serializerequestAccountsArgs(args: Args_requestAccounts): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: requestAccounts Args");
  const sizer = new WriteSizer(sizerContext);
  writerequestAccountsArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: requestAccounts Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writerequestAccountsArgs(encoder, args);
  return buffer;
}

export function writerequestAccountsArgs(
  writer: Write,
  args: Args_requestAccounts
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

export function serializerequestAccountsResult(result: Array<string>): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: requestAccounts Result");
  const sizer = new WriteSizer(sizerContext);
  writerequestAccountsResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: requestAccounts Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writerequestAccountsResult(encoder, result);
  return buffer;
}

export function writerequestAccountsResult(writer: Write, result: Array<string>): void {
  writer.context().push("requestAccounts", "Array<string>", "writing property");
  writer.writeArray(result, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
}

export function deserializerequestAccountsResult(buffer: ArrayBuffer): Array<string> {
  const context: Context = new Context("Deserializing imported module-type: requestAccounts Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("requestAccounts", "Array<string>", "reading function output");
  const res: Array<string> = reader.readArray((reader: Read): string => {
    return reader.readString();
  });
  reader.context().pop();

  return res;
}

export class Args_callContractMethod {
  address: string;
  method: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializecallContractMethodArgs(argsBuf: ArrayBuffer): Args_callContractMethod {
  const context: Context = new Context("Deserializing imported module-type: callContractMethod Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

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
    else if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }
  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    address: _address,
    method: _method,
    args: _args,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializecallContractMethodArgs(args: Args_callContractMethod): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractMethod Args");
  const sizer = new WriteSizer(sizerContext);
  writecallContractMethodArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractMethod Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractMethodArgs(encoder, args);
  return buffer;
}

export function writecallContractMethodArgs(
  writer: Write,
  args: Args_callContractMethod
): void {
  writer.writeMapLength(5);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
  writer.context().push("txOverrides", "Types.Ethereum_TxOverrides | null", "writing property");
  writer.writeString("txOverrides");
  if (args.txOverrides) {
    Types.Ethereum_TxOverrides.write(writer, args.txOverrides as Types.Ethereum_TxOverrides);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializecallContractMethodResult(result: Types.Ethereum_TxResponse): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractMethod Result");
  const sizer = new WriteSizer(sizerContext);
  writecallContractMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractMethod Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractMethodResult(encoder, result);
  return buffer;
}

export function writecallContractMethodResult(writer: Write, result: Types.Ethereum_TxResponse): void {
  writer.context().push("callContractMethod", "Types.Ethereum_TxResponse", "writing property");
  Types.Ethereum_TxResponse.write(writer, result);
  writer.context().pop();
}

export function deserializecallContractMethodResult(buffer: ArrayBuffer): Types.Ethereum_TxResponse {
  const context: Context = new Context("Deserializing imported module-type: callContractMethod Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("callContractMethod", "Types.Ethereum_TxResponse", "reading function output");
  const object = Types.Ethereum_TxResponse.read(reader);
  const res: Types.Ethereum_TxResponse =  object;
  reader.context().pop();

  return res;
}

export class Args_callContractMethodAndWait {
  address: string;
  method: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
  txOverrides: Types.Ethereum_TxOverrides | null;
}

export function deserializecallContractMethodAndWaitArgs(argsBuf: ArrayBuffer): Args_callContractMethodAndWait {
  const context: Context = new Context("Deserializing imported module-type: callContractMethodAndWait Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _address: string = "";
  let _addressSet: bool = false;
  let _method: string = "";
  let _methodSet: bool = false;
  let _args: Array<string> | null = null;
  let _connection: Types.Ethereum_Connection | null = null;
  let _txOverrides: Types.Ethereum_TxOverrides | null = null;

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
    else if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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
    else if (field == "txOverrides") {
      reader.context().push(field, "Types.Ethereum_TxOverrides | null", "type found, reading property");
      let object: Types.Ethereum_TxOverrides | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ethereum_TxOverrides.read(reader);
      }
      _txOverrides = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_addressSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'address: String'"));
  }
  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }

  return {
    address: _address,
    method: _method,
    args: _args,
    connection: _connection,
    txOverrides: _txOverrides
  };
}

export function serializecallContractMethodAndWaitArgs(args: Args_callContractMethodAndWait): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractMethodAndWait Args");
  const sizer = new WriteSizer(sizerContext);
  writecallContractMethodAndWaitArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractMethodAndWait Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractMethodAndWaitArgs(encoder, args);
  return buffer;
}

export function writecallContractMethodAndWaitArgs(
  writer: Write,
  args: Args_callContractMethodAndWait
): void {
  writer.writeMapLength(5);
  writer.context().push("address", "string", "writing property");
  writer.writeString("address");
  writer.writeString(args.address);
  writer.context().pop();
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
  writer.context().pop();
  writer.context().push("connection", "Types.Ethereum_Connection | null", "writing property");
  writer.writeString("connection");
  if (args.connection) {
    Types.Ethereum_Connection.write(writer, args.connection as Types.Ethereum_Connection);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
  writer.context().push("txOverrides", "Types.Ethereum_TxOverrides | null", "writing property");
  writer.writeString("txOverrides");
  if (args.txOverrides) {
    Types.Ethereum_TxOverrides.write(writer, args.txOverrides as Types.Ethereum_TxOverrides);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializecallContractMethodAndWaitResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: callContractMethodAndWait Result");
  const sizer = new WriteSizer(sizerContext);
  writecallContractMethodAndWaitResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: callContractMethodAndWait Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecallContractMethodAndWaitResult(encoder, result);
  return buffer;
}

export function writecallContractMethodAndWaitResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("callContractMethodAndWait", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}

export function deserializecallContractMethodAndWaitResult(buffer: ArrayBuffer): Types.Ethereum_TxReceipt {
  const context: Context = new Context("Deserializing imported module-type: callContractMethodAndWait Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("callContractMethodAndWait", "Types.Ethereum_TxReceipt", "reading function output");
  const object = Types.Ethereum_TxReceipt.read(reader);
  const res: Types.Ethereum_TxReceipt =  object;
  reader.context().pop();

  return res;
}

export class Args_sendTransaction {
  tx: Types.Ethereum_TxRequest;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesendTransactionArgs(argsBuf: ArrayBuffer): Args_sendTransaction {
  const context: Context = new Context("Deserializing imported module-type: sendTransaction Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _tx: Types.Ethereum_TxRequest | null = null;
  let _txSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "tx") {
      reader.context().push(field, "Types.Ethereum_TxRequest", "type found, reading property");
      const object = Types.Ethereum_TxRequest.read(reader);
      _tx = object;
      _txSet = true;
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

  if (!_tx || !_txSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'tx: Ethereum_TxRequest'"));
  }

  return {
    tx: _tx,
    connection: _connection
  };
}

export function serializesendTransactionArgs(args: Args_sendTransaction): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendTransaction Args");
  const sizer = new WriteSizer(sizerContext);
  writesendTransactionArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendTransaction Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendTransactionArgs(encoder, args);
  return buffer;
}

export function writesendTransactionArgs(
  writer: Write,
  args: Args_sendTransaction
): void {
  writer.writeMapLength(2);
  writer.context().push("tx", "Types.Ethereum_TxRequest", "writing property");
  writer.writeString("tx");
  Types.Ethereum_TxRequest.write(writer, args.tx);
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

export function serializesendTransactionResult(result: Types.Ethereum_TxResponse): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendTransaction Result");
  const sizer = new WriteSizer(sizerContext);
  writesendTransactionResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendTransaction Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendTransactionResult(encoder, result);
  return buffer;
}

export function writesendTransactionResult(writer: Write, result: Types.Ethereum_TxResponse): void {
  writer.context().push("sendTransaction", "Types.Ethereum_TxResponse", "writing property");
  Types.Ethereum_TxResponse.write(writer, result);
  writer.context().pop();
}

export function deserializesendTransactionResult(buffer: ArrayBuffer): Types.Ethereum_TxResponse {
  const context: Context = new Context("Deserializing imported module-type: sendTransaction Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("sendTransaction", "Types.Ethereum_TxResponse", "reading function output");
  const object = Types.Ethereum_TxResponse.read(reader);
  const res: Types.Ethereum_TxResponse =  object;
  reader.context().pop();

  return res;
}

export class Args_sendTransactionAndWait {
  tx: Types.Ethereum_TxRequest;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesendTransactionAndWaitArgs(argsBuf: ArrayBuffer): Args_sendTransactionAndWait {
  const context: Context = new Context("Deserializing imported module-type: sendTransactionAndWait Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _tx: Types.Ethereum_TxRequest | null = null;
  let _txSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "tx") {
      reader.context().push(field, "Types.Ethereum_TxRequest", "type found, reading property");
      const object = Types.Ethereum_TxRequest.read(reader);
      _tx = object;
      _txSet = true;
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

  if (!_tx || !_txSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'tx: Ethereum_TxRequest'"));
  }

  return {
    tx: _tx,
    connection: _connection
  };
}

export function serializesendTransactionAndWaitArgs(args: Args_sendTransactionAndWait): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendTransactionAndWait Args");
  const sizer = new WriteSizer(sizerContext);
  writesendTransactionAndWaitArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendTransactionAndWait Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendTransactionAndWaitArgs(encoder, args);
  return buffer;
}

export function writesendTransactionAndWaitArgs(
  writer: Write,
  args: Args_sendTransactionAndWait
): void {
  writer.writeMapLength(2);
  writer.context().push("tx", "Types.Ethereum_TxRequest", "writing property");
  writer.writeString("tx");
  Types.Ethereum_TxRequest.write(writer, args.tx);
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

export function serializesendTransactionAndWaitResult(result: Types.Ethereum_TxReceipt): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendTransactionAndWait Result");
  const sizer = new WriteSizer(sizerContext);
  writesendTransactionAndWaitResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendTransactionAndWait Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendTransactionAndWaitResult(encoder, result);
  return buffer;
}

export function writesendTransactionAndWaitResult(writer: Write, result: Types.Ethereum_TxReceipt): void {
  writer.context().push("sendTransactionAndWait", "Types.Ethereum_TxReceipt", "writing property");
  Types.Ethereum_TxReceipt.write(writer, result);
  writer.context().pop();
}

export function deserializesendTransactionAndWaitResult(buffer: ArrayBuffer): Types.Ethereum_TxReceipt {
  const context: Context = new Context("Deserializing imported module-type: sendTransactionAndWait Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("sendTransactionAndWait", "Types.Ethereum_TxReceipt", "reading function output");
  const object = Types.Ethereum_TxReceipt.read(reader);
  const res: Types.Ethereum_TxReceipt =  object;
  reader.context().pop();

  return res;
}

export class Args_deployContract {
  abi: string;
  bytecode: string;
  args: Array<string> | null;
  connection: Types.Ethereum_Connection | null;
}

export function deserializedeployContractArgs(argsBuf: ArrayBuffer): Args_deployContract {
  const context: Context = new Context("Deserializing imported module-type: deployContract Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _abi: string = "";
  let _abiSet: bool = false;
  let _bytecode: string = "";
  let _bytecodeSet: bool = false;
  let _args: Array<string> | null = null;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "abi") {
      reader.context().push(field, "string", "type found, reading property");
      _abi = reader.readString();
      _abiSet = true;
      reader.context().pop();
    }
    else if (field == "bytecode") {
      reader.context().push(field, "string", "type found, reading property");
      _bytecode = reader.readString();
      _bytecodeSet = true;
      reader.context().pop();
    }
    else if (field == "args") {
      reader.context().push(field, "Array<string> | null", "type found, reading property");
      _args = reader.readOptionalArray((reader: Read): string => {
        return reader.readString();
      });
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

  if (!_abiSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'abi: String'"));
  }
  if (!_bytecodeSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'bytecode: String'"));
  }

  return {
    abi: _abi,
    bytecode: _bytecode,
    args: _args,
    connection: _connection
  };
}

export function serializedeployContractArgs(args: Args_deployContract): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: deployContract Args");
  const sizer = new WriteSizer(sizerContext);
  writedeployContractArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: deployContract Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writedeployContractArgs(encoder, args);
  return buffer;
}

export function writedeployContractArgs(
  writer: Write,
  args: Args_deployContract
): void {
  writer.writeMapLength(4);
  writer.context().push("abi", "string", "writing property");
  writer.writeString("abi");
  writer.writeString(args.abi);
  writer.context().pop();
  writer.context().push("bytecode", "string", "writing property");
  writer.writeString("bytecode");
  writer.writeString(args.bytecode);
  writer.context().pop();
  writer.context().push("args", "Array<string> | null", "writing property");
  writer.writeString("args");
  writer.writeOptionalArray(args.args, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
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

export function serializedeployContractResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: deployContract Result");
  const sizer = new WriteSizer(sizerContext);
  writedeployContractResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: deployContract Result");
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
  const context: Context = new Context("Deserializing imported module-type: deployContract Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("deployContract", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_signMessage {
  message: string;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesignMessageArgs(argsBuf: ArrayBuffer): Args_signMessage {
  const context: Context = new Context("Deserializing imported module-type: signMessage Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _message: string = "";
  let _messageSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "message") {
      reader.context().push(field, "string", "type found, reading property");
      _message = reader.readString();
      _messageSet = true;
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

  if (!_messageSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'message: String'"));
  }

  return {
    message: _message,
    connection: _connection
  };
}

export function serializesignMessageArgs(args: Args_signMessage): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: signMessage Args");
  const sizer = new WriteSizer(sizerContext);
  writesignMessageArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: signMessage Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesignMessageArgs(encoder, args);
  return buffer;
}

export function writesignMessageArgs(
  writer: Write,
  args: Args_signMessage
): void {
  writer.writeMapLength(2);
  writer.context().push("message", "string", "writing property");
  writer.writeString("message");
  writer.writeString(args.message);
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

export function serializesignMessageResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: signMessage Result");
  const sizer = new WriteSizer(sizerContext);
  writesignMessageResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: signMessage Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesignMessageResult(encoder, result);
  return buffer;
}

export function writesignMessageResult(writer: Write, result: string): void {
  writer.context().push("signMessage", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializesignMessageResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: signMessage Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("signMessage", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}

export class Args_sendRPC {
  method: string;
  params: Array<string>;
  connection: Types.Ethereum_Connection | null;
}

export function deserializesendRPCArgs(argsBuf: ArrayBuffer): Args_sendRPC {
  const context: Context = new Context("Deserializing imported module-type: sendRPC Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _method: string = "";
  let _methodSet: bool = false;
  let _params: Array<string> = [];
  let _paramsSet: bool = false;
  let _connection: Types.Ethereum_Connection | null = null;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "method") {
      reader.context().push(field, "string", "type found, reading property");
      _method = reader.readString();
      _methodSet = true;
      reader.context().pop();
    }
    else if (field == "params") {
      reader.context().push(field, "Array<string>", "type found, reading property");
      _params = reader.readArray((reader: Read): string => {
        return reader.readString();
      });
      _paramsSet = true;
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

  if (!_methodSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'method: String'"));
  }
  if (!_paramsSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'params: [String]'"));
  }

  return {
    method: _method,
    params: _params,
    connection: _connection
  };
}

export function serializesendRPCArgs(args: Args_sendRPC): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendRPC Args");
  const sizer = new WriteSizer(sizerContext);
  writesendRPCArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendRPC Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendRPCArgs(encoder, args);
  return buffer;
}

export function writesendRPCArgs(
  writer: Write,
  args: Args_sendRPC
): void {
  writer.writeMapLength(3);
  writer.context().push("method", "string", "writing property");
  writer.writeString("method");
  writer.writeString(args.method);
  writer.context().pop();
  writer.context().push("params", "Array<string>", "writing property");
  writer.writeString("params");
  writer.writeArray(args.params, (writer: Write, item: string): void => {
    writer.writeString(item);
  });
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

export function serializesendRPCResult(result: string | null): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: sendRPC Result");
  const sizer = new WriteSizer(sizerContext);
  writesendRPCResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: sendRPC Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writesendRPCResult(encoder, result);
  return buffer;
}

export function writesendRPCResult(writer: Write, result: string | null): void {
  writer.context().push("sendRPC", "string | null", "writing property");
  writer.writeOptionalString(result);
  writer.context().pop();
}

export function deserializesendRPCResult(buffer: ArrayBuffer): string | null {
  const context: Context = new Context("Deserializing imported module-type: sendRPC Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("sendRPC", "string | null", "reading function output");
  const res: string | null = reader.readOptionalString();
  reader.context().pop();

  return res;
}
