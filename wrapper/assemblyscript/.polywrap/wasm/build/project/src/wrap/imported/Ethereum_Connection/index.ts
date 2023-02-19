import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeEthereum_Connection,
  deserializeEthereum_Connection,
  writeEthereum_Connection,
  readEthereum_Connection
} from "./serialization";
import * as Types from "../..";

export class Ethereum_Connection {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  node: string | null;
  networkNameOrChainId: string | null;

  static toBuffer(type: Ethereum_Connection): ArrayBuffer {
    return serializeEthereum_Connection(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ethereum_Connection {
    return deserializeEthereum_Connection(buffer);
  }

  static write(writer: Write, type: Ethereum_Connection): void {
    writeEthereum_Connection(writer, type);
  }

  static read(reader: Read): Ethereum_Connection {
    return readEthereum_Connection(reader);
  }
}
