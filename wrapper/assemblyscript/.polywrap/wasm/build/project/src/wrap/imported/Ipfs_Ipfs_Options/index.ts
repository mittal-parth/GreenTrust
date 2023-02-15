import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeIpfs_Ipfs_Options,
  deserializeIpfs_Ipfs_Options,
  writeIpfs_Ipfs_Options,
  readIpfs_Ipfs_Options
} from "./serialization";
import * as Types from "../..";

export class Ipfs_Ipfs_Options {

  public static uri: string = "wrap://ens/ipfs.polywrap.eth";

  timeout: Box<u32> | null;
  provider: string | null;
  fallbackProviders: Array<string> | null;
  disableParallelRequests: Box<bool> | null;

  static toBuffer(type: Ipfs_Ipfs_Options): ArrayBuffer {
    return serializeIpfs_Ipfs_Options(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ipfs_Ipfs_Options {
    return deserializeIpfs_Ipfs_Options(buffer);
  }

  static write(writer: Write, type: Ipfs_Ipfs_Options): void {
    writeIpfs_Ipfs_Options(writer, type);
  }

  static read(reader: Read): Ipfs_Ipfs_Options {
    return readIpfs_Ipfs_Options(reader);
  }
}
