import {
  Read,
  Write,
  Box,
  BigInt,
  BigNumber,
  JSON
} from "@polywrap/wasm-as";
import {
  serializeEthereum_TxRequest,
  deserializeEthereum_TxRequest,
  writeEthereum_TxRequest,
  readEthereum_TxRequest
} from "./serialization";
import * as Types from "../..";

export class Ethereum_TxRequest {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  to: string | null;
  _from: string | null;
  nonce: Box<u32> | null;
  gasLimit: BigInt | null;
  gasPrice: BigInt | null;
  data: string | null;
  value: BigInt | null;
  chainId: BigInt | null;
  _type: Box<u32> | null;

  static toBuffer(type: Ethereum_TxRequest): ArrayBuffer {
    return serializeEthereum_TxRequest(type);
  }

  static fromBuffer(buffer: ArrayBuffer): Ethereum_TxRequest {
    return deserializeEthereum_TxRequest(buffer);
  }

  static write(writer: Write, type: Ethereum_TxRequest): void {
    writeEthereum_TxRequest(writer, type);
  }

  static read(reader: Read): Ethereum_TxRequest {
    return readEthereum_TxRequest(reader);
  }
}
