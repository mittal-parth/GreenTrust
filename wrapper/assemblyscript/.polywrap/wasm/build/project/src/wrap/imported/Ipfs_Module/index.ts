import {
  wrap_subinvoke,
  wrap_subinvokeImplementation,
  Box,
  BigInt,
  BigNumber,
  JSON,
  Result
} from "@polywrap/wasm-as";
import {
  serializecatArgs,
  deserializecatResult,
  Args_cat,
  serializeresolveArgs,
  deserializeresolveResult,
  Args_resolve,
  serializeaddFileArgs,
  deserializeaddFileResult,
  Args_addFile
} from "./serialization";
import * as Types from "../..";

export class Ipfs_Module {

  public static uri: string = "wrap://ens/ipfs.polywrap.eth";

  public static cat(
    args: Args_cat
  ): Result<ArrayBuffer, string> {
    const argsBuf = serializecatArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ipfs.polywrap.eth",
      "cat",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<ArrayBuffer, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<ArrayBuffer, string>(
      deserializecatResult(result.unwrap())
    );
  }

  public static resolve(
    args: Args_resolve
  ): Result<Types.Ipfs_Ipfs_ResolveResult | null, string> {
    const argsBuf = serializeresolveArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ipfs.polywrap.eth",
      "resolve",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ipfs_Ipfs_ResolveResult | null, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ipfs_Ipfs_ResolveResult | null, string>(
      deserializeresolveResult(result.unwrap())
    );
  }

  public static addFile(
    args: Args_addFile
  ): Result<string, string> {
    const argsBuf = serializeaddFileArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ipfs.polywrap.eth",
      "addFile",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializeaddFileResult(result.unwrap())
    );
  }
}
