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
  serializecallContractViewArgs,
  deserializecallContractViewResult,
  Args_callContractView,
  serializecallContractStaticArgs,
  deserializecallContractStaticResult,
  Args_callContractStatic,
  serializegetBalanceArgs,
  deserializegetBalanceResult,
  Args_getBalance,
  serializeencodeParamsArgs,
  deserializeencodeParamsResult,
  Args_encodeParams,
  serializeencodeFunctionArgs,
  deserializeencodeFunctionResult,
  Args_encodeFunction,
  serializesolidityPackArgs,
  deserializesolidityPackResult,
  Args_solidityPack,
  serializesolidityKeccak256Args,
  deserializesolidityKeccak256Result,
  Args_solidityKeccak256,
  serializesoliditySha256Args,
  deserializesoliditySha256Result,
  Args_soliditySha256,
  serializegetSignerAddressArgs,
  deserializegetSignerAddressResult,
  Args_getSignerAddress,
  serializegetSignerBalanceArgs,
  deserializegetSignerBalanceResult,
  Args_getSignerBalance,
  serializegetSignerTransactionCountArgs,
  deserializegetSignerTransactionCountResult,
  Args_getSignerTransactionCount,
  serializegetGasPriceArgs,
  deserializegetGasPriceResult,
  Args_getGasPrice,
  serializeestimateTransactionGasArgs,
  deserializeestimateTransactionGasResult,
  Args_estimateTransactionGas,
  serializeestimateContractCallGasArgs,
  deserializeestimateContractCallGasResult,
  Args_estimateContractCallGas,
  serializecheckAddressArgs,
  deserializecheckAddressResult,
  Args_checkAddress,
  serializetoWeiArgs,
  deserializetoWeiResult,
  Args_toWei,
  serializetoEthArgs,
  deserializetoEthResult,
  Args_toEth,
  serializeawaitTransactionArgs,
  deserializeawaitTransactionResult,
  Args_awaitTransaction,
  serializewaitForEventArgs,
  deserializewaitForEventResult,
  Args_waitForEvent,
  serializegetNetworkArgs,
  deserializegetNetworkResult,
  Args_getNetwork,
  serializerequestAccountsArgs,
  deserializerequestAccountsResult,
  Args_requestAccounts,
  serializecallContractMethodArgs,
  deserializecallContractMethodResult,
  Args_callContractMethod,
  serializecallContractMethodAndWaitArgs,
  deserializecallContractMethodAndWaitResult,
  Args_callContractMethodAndWait,
  serializesendTransactionArgs,
  deserializesendTransactionResult,
  Args_sendTransaction,
  serializesendTransactionAndWaitArgs,
  deserializesendTransactionAndWaitResult,
  Args_sendTransactionAndWait,
  serializedeployContractArgs,
  deserializedeployContractResult,
  Args_deployContract,
  serializesignMessageArgs,
  deserializesignMessageResult,
  Args_signMessage,
  serializesendRPCArgs,
  deserializesendRPCResult,
  Args_sendRPC
} from "./serialization";
import * as Types from "../..";

export class Ethereum_Module {

  public static uri: string = "wrap://ens/ethereum.polywrap.eth";

  public static callContractView(
    args: Args_callContractView
  ): Result<string, string> {
    const argsBuf = serializecallContractViewArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "callContractView",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializecallContractViewResult(result.unwrap())
    );
  }

  public static callContractStatic(
    args: Args_callContractStatic
  ): Result<Types.Ethereum_StaticTxResult, string> {
    const argsBuf = serializecallContractStaticArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "callContractStatic",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_StaticTxResult, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_StaticTxResult, string>(
      deserializecallContractStaticResult(result.unwrap())
    );
  }

  public static getBalance(
    args: Args_getBalance
  ): Result<BigInt, string> {
    const argsBuf = serializegetBalanceArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getBalance",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializegetBalanceResult(result.unwrap())
    );
  }

  public static encodeParams(
    args: Args_encodeParams
  ): Result<string, string> {
    const argsBuf = serializeencodeParamsArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "encodeParams",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializeencodeParamsResult(result.unwrap())
    );
  }

  public static encodeFunction(
    args: Args_encodeFunction
  ): Result<string, string> {
    const argsBuf = serializeencodeFunctionArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "encodeFunction",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializeencodeFunctionResult(result.unwrap())
    );
  }

  public static solidityPack(
    args: Args_solidityPack
  ): Result<string, string> {
    const argsBuf = serializesolidityPackArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "solidityPack",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializesolidityPackResult(result.unwrap())
    );
  }

  public static solidityKeccak256(
    args: Args_solidityKeccak256
  ): Result<string, string> {
    const argsBuf = serializesolidityKeccak256Args(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "solidityKeccak256",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializesolidityKeccak256Result(result.unwrap())
    );
  }

  public static soliditySha256(
    args: Args_soliditySha256
  ): Result<string, string> {
    const argsBuf = serializesoliditySha256Args(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "soliditySha256",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializesoliditySha256Result(result.unwrap())
    );
  }

  public static getSignerAddress(
    args: Args_getSignerAddress
  ): Result<string, string> {
    const argsBuf = serializegetSignerAddressArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getSignerAddress",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializegetSignerAddressResult(result.unwrap())
    );
  }

  public static getSignerBalance(
    args: Args_getSignerBalance
  ): Result<BigInt, string> {
    const argsBuf = serializegetSignerBalanceArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getSignerBalance",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializegetSignerBalanceResult(result.unwrap())
    );
  }

  public static getSignerTransactionCount(
    args: Args_getSignerTransactionCount
  ): Result<BigInt, string> {
    const argsBuf = serializegetSignerTransactionCountArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getSignerTransactionCount",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializegetSignerTransactionCountResult(result.unwrap())
    );
  }

  public static getGasPrice(
    args: Args_getGasPrice
  ): Result<BigInt, string> {
    const argsBuf = serializegetGasPriceArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getGasPrice",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializegetGasPriceResult(result.unwrap())
    );
  }

  public static estimateTransactionGas(
    args: Args_estimateTransactionGas
  ): Result<BigInt, string> {
    const argsBuf = serializeestimateTransactionGasArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "estimateTransactionGas",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializeestimateTransactionGasResult(result.unwrap())
    );
  }

  public static estimateContractCallGas(
    args: Args_estimateContractCallGas
  ): Result<BigInt, string> {
    const argsBuf = serializeestimateContractCallGasArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "estimateContractCallGas",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializeestimateContractCallGasResult(result.unwrap())
    );
  }

  public static checkAddress(
    args: Args_checkAddress
  ): Result<bool, string> {
    const argsBuf = serializecheckAddressArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "checkAddress",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<bool, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<bool, string>(
      deserializecheckAddressResult(result.unwrap())
    );
  }

  public static toWei(
    args: Args_toWei
  ): Result<BigInt, string> {
    const argsBuf = serializetoWeiArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "toWei",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<BigInt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<BigInt, string>(
      deserializetoWeiResult(result.unwrap())
    );
  }

  public static toEth(
    args: Args_toEth
  ): Result<string, string> {
    const argsBuf = serializetoEthArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "toEth",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializetoEthResult(result.unwrap())
    );
  }

  public static awaitTransaction(
    args: Args_awaitTransaction
  ): Result<Types.Ethereum_TxReceipt, string> {
    const argsBuf = serializeawaitTransactionArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "awaitTransaction",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_TxReceipt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_TxReceipt, string>(
      deserializeawaitTransactionResult(result.unwrap())
    );
  }

  public static waitForEvent(
    args: Args_waitForEvent
  ): Result<Types.Ethereum_EventNotification, string> {
    const argsBuf = serializewaitForEventArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "waitForEvent",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_EventNotification, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_EventNotification, string>(
      deserializewaitForEventResult(result.unwrap())
    );
  }

  public static getNetwork(
    args: Args_getNetwork
  ): Result<Types.Ethereum_Network, string> {
    const argsBuf = serializegetNetworkArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "getNetwork",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_Network, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_Network, string>(
      deserializegetNetworkResult(result.unwrap())
    );
  }

  public static requestAccounts(
    args: Args_requestAccounts
  ): Result<Array<string>, string> {
    const argsBuf = serializerequestAccountsArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "requestAccounts",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Array<string>, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Array<string>, string>(
      deserializerequestAccountsResult(result.unwrap())
    );
  }

  public static callContractMethod(
    args: Args_callContractMethod
  ): Result<Types.Ethereum_TxResponse, string> {
    const argsBuf = serializecallContractMethodArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "callContractMethod",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_TxResponse, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_TxResponse, string>(
      deserializecallContractMethodResult(result.unwrap())
    );
  }

  public static callContractMethodAndWait(
    args: Args_callContractMethodAndWait
  ): Result<Types.Ethereum_TxReceipt, string> {
    const argsBuf = serializecallContractMethodAndWaitArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "callContractMethodAndWait",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_TxReceipt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_TxReceipt, string>(
      deserializecallContractMethodAndWaitResult(result.unwrap())
    );
  }

  public static sendTransaction(
    args: Args_sendTransaction
  ): Result<Types.Ethereum_TxResponse, string> {
    const argsBuf = serializesendTransactionArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "sendTransaction",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_TxResponse, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_TxResponse, string>(
      deserializesendTransactionResult(result.unwrap())
    );
  }

  public static sendTransactionAndWait(
    args: Args_sendTransactionAndWait
  ): Result<Types.Ethereum_TxReceipt, string> {
    const argsBuf = serializesendTransactionAndWaitArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "sendTransactionAndWait",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<Types.Ethereum_TxReceipt, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Types.Ethereum_TxReceipt, string>(
      deserializesendTransactionAndWaitResult(result.unwrap())
    );
  }

  public static deployContract(
    args: Args_deployContract
  ): Result<string, string> {
    const argsBuf = serializedeployContractArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "deployContract",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializedeployContractResult(result.unwrap())
    );
  }

  public static signMessage(
    args: Args_signMessage
  ): Result<string, string> {
    const argsBuf = serializesignMessageArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "signMessage",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string, string>(
      deserializesignMessageResult(result.unwrap())
    );
  }

  public static sendRPC(
    args: Args_sendRPC
  ): Result<string | null, string> {
    const argsBuf = serializesendRPCArgs(args);
    const result = wrap_subinvoke(
      "wrap://ens/ethereum.polywrap.eth",
      "sendRPC",
      argsBuf
    );

    if (result.isErr) {
      return Result.Err<string | null, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<string | null, string>(
      deserializesendRPCResult(result.unwrap())
    );
  }
}
