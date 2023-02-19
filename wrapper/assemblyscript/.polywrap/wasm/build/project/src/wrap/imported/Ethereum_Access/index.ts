import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeEthereum_Access,
  deserializeEthereum_Access,
  writeEthereum_Access,
  readEthereum_Access
} from "./serialization";
import * as Types from "../..";

export class Ethereum_Access {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  address: string;
  storageKeys: Array<string>;

  static toBuffer(type: Ethereum_Access): ArrayBuffer {
    return serializeEthereum_Access(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ethereum_Access {
    return deserializeEthereum_Access(buffer);
  }

  static write(writer: Write, type: Ethereum_Access): void {
    writeEthereum_Access(writer, type);
  }

  static read(reader: Read): Ethereum_Access {
    return readEthereum_Access(reader);
  }
}
