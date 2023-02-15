import {
  wrap_invoke_args,
  wrap_invoke,
  wrap_abort,
  InvokeArgs
} from "@polywrap/wasm-as";

import {
  getDataWrapped,
  setDataWrapped,
  deployContractWrapped,
  setIpfsDataWrapped,
  getIpfsDataWrapped
} from "./Module/wrapped";

export function _wrap_invoke(method_size: u32, args_size: u32, env_size: u32): bool {
  const args: InvokeArgs = wrap_invoke_args(
    method_size,
    args_size
  );

  if (args.method == "getData") {
    return wrap_invoke(args, env_size, getDataWrapped);
  }
  else if (args.method == "setData") {
    return wrap_invoke(args, env_size, setDataWrapped);
  }
  else if (args.method == "deployContract") {
    return wrap_invoke(args, env_size, deployContractWrapped);
  }
  else if (args.method == "setIpfsData") {
    return wrap_invoke(args, env_size, setIpfsDataWrapped);
  }
  else if (args.method == "getIpfsData") {
    return wrap_invoke(args, env_size, getIpfsDataWrapped);
  }
  else {
    return wrap_invoke(args, env_size, null);
  }
}

export function wrapAbort(
  msg: string | null,
  file: string | null,
  line: u32,
  column: u32
): void {
  wrap_abort(
    msg ? msg : "",
    file ? file : "",
    line,
    column
  );
}
