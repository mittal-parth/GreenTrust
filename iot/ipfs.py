import json
import requests
import os
import time

from dotenv import load_dotenv

from data import generate_reading
from config import IPFS_HOST, IPFS_FILE_HOST


load_dotenv()

FILE_NAME = 'data.json'

def save(data):
    with open(FILE_NAME, 'w') as write_file:
        json.dump(data, write_file, indent=2)


def ipfsUri(hash):
    return f'https://{IPFS_FILE_HOST}/{hash}'

def upload(files):
    response = requests.post(f'https://{IPFS_HOST}:5001/api/v0/add', files=files, auth=(os.getenv('IPFS_PROJECT_ID'), os.getenv('IPFS_PROJECT_SECRET')))
    
    hash = json.loads(response.text)['Hash']

    return hash

def fetch(hash):
    response = requests.get(ipfsUri(hash))

    data = response.content.decode('utf-8')
    data = json.loads(data)

    return data

def main():
    prev_hash = 'QmZoeWTxygLjzSVqkxLcUwbr4mpjMxAVaASXpDbGZ5DzCs'

    i = 0
    while True:
        time.sleep(0.1 * 60)
    
        print(f"#{i}: Sending data...")

        readings = generate_reading()

        prev_readings = fetch(prev_hash)
        prev_readings.append(readings)
        
        save(prev_readings)
        files = {
            'file': open(FILE_NAME, 'rb')
        }

        prev_hash = upload(files)

        i = i + 1



if __name__ == '__main__':
    main()
