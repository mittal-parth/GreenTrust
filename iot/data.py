import os
from datetime import datetime
import random


def generate_reading():
    return {
        'time': str(datetime.now()),
        'data': {
            'NPK': random.random() * 20,
            'Temperature': random.random() * 45,
            'Humidity': random.random() * 100
        }
    }

def generate_series(length):
    series = []
    for _ in range(length):
        series.append(generate_reading())
    
    return series
