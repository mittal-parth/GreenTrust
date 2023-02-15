import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeEthereum_Log,
  deserializeEthereum_Log,
  writeEthereum_Log,
  readEthereum_Log
} from "./serialization";
import * as Types from "../..";

export class Ethereum_Log {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  blockNumber: BigInt;
  blockHash: string;
  transactionIndex: u32;
  removed: bool;
  address: string;
  data: string;
  topics: Array<string>;
  transactionHash: string;
  logIndex: u32;

  static toBuffer(type: Ethereum_Log): ArrayBuffer {
    return serializeEthereum_Log(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ethereum_Log {
    return deserializeEthereum_Log(buffer);
  }

  static write(writer: Write, type: Ethereum_Log): void {
    writeEthereum_Log(writer, type);
  }

  static read(reader: Read): Ethereum_Log {
    return readEthereum_Log(reader);
  }
}
