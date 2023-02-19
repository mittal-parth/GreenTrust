import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeIpfs_Ipfs_ResolveResult,
  deserializeIpfs_Ipfs_ResolveResult,
  writeIpfs_Ipfs_ResolveResult,
  readIpfs_Ipfs_ResolveResult
} from "./serialization";
import * as Types from "../..";

export class Ipfs_Ipfs_ResolveResult {

  public static uri: string = "wrap://ens/ipfs.polywrap.eth";

  cid: string;
  provider: string;

  static toBuffer(type: Ipfs_Ipfs_ResolveResult): ArrayBuffer {
    return serializeIpfs_Ipfs_ResolveResult(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ipfs_Ipfs_ResolveResult {
    return deserializeIpfs_Ipfs_ResolveResult(buffer);
  }

  static write(writer: Write, type: Ipfs_Ipfs_ResolveResult): void {
    writeIpfs_Ipfs_ResolveResult(writer, type);
  }

  static read(reader: Read): Ipfs_Ipfs_ResolveResult {
    return readIpfs_Ipfs_ResolveResult(reader);
  }
}
