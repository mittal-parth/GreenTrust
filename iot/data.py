import os
from datetime import datetime
import random
import time


def generate_reading():
    return {
        'time': int(time.mktime(datetime.now().timetuple())),
        'data': {
            'NPK': random.random() * 20,
            'Temperature': random.random() * 45,
            'Humidity': random.random() * 100
        }
    }

def generate_series(length):
    timestamp = int(time.mktime(datetime.now().timetuple()))

    series = []
    for _ in range(length):
        reading = generate_reading()
        reading['time'] = timestamp
        series.append(reading)
        timestamp += 2 * 24 * 60 * 60
    
    return series
