import json
import os

from web3 import Web3, HTTPProvider
from dotenv import load_dotenv

from data import generate_reading, generate_series
from ipfs import save, upload


load_dotenv()

RPC_ENDPOINT = 'https://rpc.testnet.mantle.xyz/'
CONTRACT_ADDRESS = '0x60B19871c5DbF423240BE920EcB4BA68010059D4'
CHAIN_ID = 5001

w3 = Web3(HTTPProvider(RPC_ENDPOINT))

with open('abi.json', 'r') as file:
    abi = json.loads(file.read())

private_key = str(os.getenv('PRIVATE_KEY'))
account = w3.eth.account.from_key(private_key)
address = account.address

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

def txBuildData():
    return {
        'chainId': CHAIN_ID,
        'from': address,
        'nonce': w3.eth.get_transaction_count(address),
        'gasPrice': w3.eth.gas_price
    }

def sendTx(sensorId, hash):
    print(txBuildData())
    call_function = contract.functions.addSensorData(sensorId, hash).buildTransaction(txBuildData())
    signed_tx = w3.eth.account.sign_transaction(call_function, private_key=private_key)
    send_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_tx)
    print(tx_receipt)

def main():
    data = generate_series(10)
    # with open('data.json', 'r') as file:
    #     data = json.loads(file.read())
    # data = generate_series(10)
    save(data)
    hash = upload({
        'file': open('data.json', 'rb')
    })
    sendTx(1, hash)


if __name__ == '__main__':
    main()
