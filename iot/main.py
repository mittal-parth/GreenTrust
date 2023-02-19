import json
import os

from web3 import Web3, HTTPProvider
from dotenv import load_dotenv


load_dotenv()

quicknode_endpoint = 'https://rpc.testnet.mantle.xyz/'

with open("abi.json", "r") as file:
    abi = json.loads(file.read())

CONTRACT_ADDRESS = '0x899e37008cf147e32f06D6E1f2F45CA2a1C47E22'

ADDRESS = '0xF5719AF9Bb7005D0DC191745B4883e7bfb1B1455'
PRIVATE_KEY = os.getenv('PRIVATE_KEY')

CHAIN_ID = 5001

w3 = Web3(HTTPProvider(quicknode_endpoint))

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

def txBuildData():
    return {
        'chainId': CHAIN_ID,
        'from': ADDRESS,
        'nonce': w3.eth.get_transaction_count(ADDRESS)
    }

def sendTx(sensorId, hash):
    call_function = contract.functions.addSensorData(sensorId, hash).buildTransaction(txBuildData())
    signed_tx = w3.eth.account.sign_transaction(call_function, private_key=PRIVATE_KEY)
    send_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_tx)
    print(tx_receipt)

def main():
    sendTx(1, 'QmZoeWTxygLjzSVqkxLcUwbr4mpjMxAVaASXpDbGZ5DzCs')
    # value = 44
    # call_function = contract.functions.addSensorData(value).buildTransaction(txBuildData())
    # signed_tx = w3.eth.account.sign_transaction(call_function, private_key=PRIVATE_KEY)
    # send_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    # tx_receipt = w3.eth.wait_for_transaction_receipt(send_tx)
    # print(tx_receipt)

    # response = contract.functions.retrieve().call()
    # print(response)

if __name__ == '__main__':
    main()
