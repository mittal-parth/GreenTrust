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

export class Args_cat {
  cid: string;
  options: Types.Ipfs_Ipfs_Options | null;
}

export function deserializecatArgs(argsBuf: ArrayBuffer): Args_cat {
  const context: Context = new Context("Deserializing imported module-type: cat Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _cid: string = "";
  let _cidSet: bool = false;
  let _options: Types.Ipfs_Ipfs_Options | null = null;

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
    else if (field == "options") {
      reader.context().push(field, "Types.Ipfs_Ipfs_Options | null", "type found, reading property");
      let object: Types.Ipfs_Ipfs_Options | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ipfs_Ipfs_Options.read(reader);
      }
      _options = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_cidSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'cid: String'"));
  }

  return {
    cid: _cid,
    options: _options
  };
}

export function serializecatArgs(args: Args_cat): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: cat Args");
  const sizer = new WriteSizer(sizerContext);
  writecatArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: cat Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecatArgs(encoder, args);
  return buffer;
}

export function writecatArgs(
  writer: Write,
  args: Args_cat
): void {
  writer.writeMapLength(2);
  writer.context().push("cid", "string", "writing property");
  writer.writeString("cid");
  writer.writeString(args.cid);
  writer.context().pop();
  writer.context().push("options", "Types.Ipfs_Ipfs_Options | null", "writing property");
  writer.writeString("options");
  if (args.options) {
    Types.Ipfs_Ipfs_Options.write(writer, args.options as Types.Ipfs_Ipfs_Options);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializecatResult(result: ArrayBuffer): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: cat Result");
  const sizer = new WriteSizer(sizerContext);
  writecatResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: cat Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writecatResult(encoder, result);
  return buffer;
}

export function writecatResult(writer: Write, result: ArrayBuffer): void {
  writer.context().push("cat", "ArrayBuffer", "writing property");
  writer.writeBytes(result);
  writer.context().pop();
}

export function deserializecatResult(buffer: ArrayBuffer): ArrayBuffer {
  const context: Context = new Context("Deserializing imported module-type: cat Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("cat", "ArrayBuffer", "reading function output");
  const res: ArrayBuffer = reader.readBytes();
  reader.context().pop();

  return res;
}

export class Args_resolve {
  cid: string;
  options: Types.Ipfs_Ipfs_Options | null;
}

export function deserializeresolveArgs(argsBuf: ArrayBuffer): Args_resolve {
  const context: Context = new Context("Deserializing imported module-type: resolve Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _cid: string = "";
  let _cidSet: bool = false;
  let _options: Types.Ipfs_Ipfs_Options | null = null;

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
    else if (field == "options") {
      reader.context().push(field, "Types.Ipfs_Ipfs_Options | null", "type found, reading property");
      let object: Types.Ipfs_Ipfs_Options | null = null;
      if (!reader.isNextNil()) {
        object = Types.Ipfs_Ipfs_Options.read(reader);
      }
      _options = object;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_cidSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'cid: String'"));
  }

  return {
    cid: _cid,
    options: _options
  };
}

export function serializeresolveArgs(args: Args_resolve): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: resolve Args");
  const sizer = new WriteSizer(sizerContext);
  writeresolveArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: resolve Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeresolveArgs(encoder, args);
  return buffer;
}

export function writeresolveArgs(
  writer: Write,
  args: Args_resolve
): void {
  writer.writeMapLength(2);
  writer.context().push("cid", "string", "writing property");
  writer.writeString("cid");
  writer.writeString(args.cid);
  writer.context().pop();
  writer.context().push("options", "Types.Ipfs_Ipfs_Options | null", "writing property");
  writer.writeString("options");
  if (args.options) {
    Types.Ipfs_Ipfs_Options.write(writer, args.options as Types.Ipfs_Ipfs_Options);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function serializeresolveResult(result: Types.Ipfs_Ipfs_ResolveResult | null): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: resolve Result");
  const sizer = new WriteSizer(sizerContext);
  writeresolveResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: resolve Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeresolveResult(encoder, result);
  return buffer;
}

export function writeresolveResult(writer: Write, result: Types.Ipfs_Ipfs_ResolveResult | null): void {
  writer.context().push("resolve", "Types.Ipfs_Ipfs_ResolveResult | null", "writing property");
  if (result) {
    Types.Ipfs_Ipfs_ResolveResult.write(writer, result as Types.Ipfs_Ipfs_ResolveResult);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}

export function deserializeresolveResult(buffer: ArrayBuffer): Types.Ipfs_Ipfs_ResolveResult | null {
  const context: Context = new Context("Deserializing imported module-type: resolve Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("resolve", "Types.Ipfs_Ipfs_ResolveResult | null", "reading function output");
  let object: Types.Ipfs_Ipfs_ResolveResult | null = null;
  if (!reader.isNextNil()) {
    object = Types.Ipfs_Ipfs_ResolveResult.read(reader);
  }
  const res: Types.Ipfs_Ipfs_ResolveResult | null =  object;
  reader.context().pop();

  return res;
}

export class Args_addFile {
  data: ArrayBuffer;
}

export function deserializeaddFileArgs(argsBuf: ArrayBuffer): Args_addFile {
  const context: Context = new Context("Deserializing imported module-type: addFile Args");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _data: ArrayBuffer = new ArrayBuffer(0);
  let _dataSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "data") {
      reader.context().push(field, "ArrayBuffer", "type found, reading property");
      _data = reader.readBytes();
      _dataSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_dataSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'data: Bytes'"));
  }

  return {
    data: _data
  };
}

export function serializeaddFileArgs(args: Args_addFile): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: addFile Args");
  const sizer = new WriteSizer(sizerContext);
  writeaddFileArgs(sizer, args);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: addFile Args");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeaddFileArgs(encoder, args);
  return buffer;
}

export function writeaddFileArgs(
  writer: Write,
  args: Args_addFile
): void {
  writer.writeMapLength(1);
  writer.context().push("data", "ArrayBuffer", "writing property");
  writer.writeString("data");
  writer.writeBytes(args.data);
  writer.context().pop();
}

export function serializeaddFileResult(result: string): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) imported module-type: addFile Result");
  const sizer = new WriteSizer(sizerContext);
  writeaddFileResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) imported module-type: addFile Result");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeaddFileResult(encoder, result);
  return buffer;
}

export function writeaddFileResult(writer: Write, result: string): void {
  writer.context().push("addFile", "string", "writing property");
  writer.writeString(result);
  writer.context().pop();
}

export function deserializeaddFileResult(buffer: ArrayBuffer): string {
  const context: Context = new Context("Deserializing imported module-type: addFile Result");
  const reader = new ReadDecoder(buffer, context);

  reader.context().push("addFile", "string", "reading function output");
  const res: string = reader.readString();
  reader.context().pop();

  return res;
}
