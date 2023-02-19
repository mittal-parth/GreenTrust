import { wrap_load_env } from "@polywrap/wasm-as";
import {
  getData,
  setData,
  deployContract,
  setIpfsData,
  getIpfsData
} from "../../index";
import {
  deserializegetDataArgs,
  serializegetDataResult,
  deserializesetDataArgs,
  serializesetDataResult,
  deserializedeployContractArgs,
  serializedeployContractResult,
  deserializesetIpfsDataArgs,
  serializesetIpfsDataResult,
  deserializegetIpfsDataArgs,
  serializegetIpfsDataResult
} from "./serialization";
import * as Types from "..";

export function getDataWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializegetDataArgs(argsBuf);

  const result = getData(
    {
      address: args.address,
      connection: args.connection
    }
  );
  return serializegetDataResult(result);
}

export function setDataWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializesetDataArgs(argsBuf);

  const result = setData(
    {
      address: args.address,
      value: args.value,
      connection: args.connection
    }
  );
  return serializesetDataResult(result);
}

export function deployContractWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializedeployContractArgs(argsBuf);

  const result = deployContract(
    {
      connection: args.connection
    }
  );
  return serializedeployContractResult(result);
}

export function setIpfsDataWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializesetIpfsDataArgs(argsBuf);

  const result = setIpfsData(
    {
      options: args.options,
      connection: args.connection
    }
  );
  return serializesetIpfsDataResult(result);
}

export function getIpfsDataWrapped(argsBuf: ArrayBuffer, env_size: u32): ArrayBuffer {
  const args = deserializegetIpfsDataArgs(argsBuf);

  const result = getIpfsData(
    {
      address: args.address,
      connection: args.connection
    }
  );
  return serializegetIpfsDataResult(result);
}
