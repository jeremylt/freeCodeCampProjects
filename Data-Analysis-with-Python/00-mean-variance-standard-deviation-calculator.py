import numpy as np


def calculate(list):
    if len(list) < 9:
        raise ValueError("List must contain nine numbers.")
    data = np.array([list[0:3], list[3:6], list[6:9]])
    computations = {}

    # mean
    mean = [
        np.mean(data, axis=0).tolist(),
        np.mean(data, axis=1).tolist(),
        np.mean(data),
    ]
    computations["mean"] = mean

    # variance
    variance = [
        np.var(data, axis=0).tolist(),
        np.var(data, axis=1).tolist(),
        np.var(data),
    ]
    computations["variance"] = variance

    # standard deviation
    std_dev = [
        np.std(data, axis=0).tolist(),
        np.std(data, axis=1).tolist(),
        np.std(data),
    ]
    computations["standard deviation"] = std_dev

    # max
    max = [
        np.max(data, axis=0).tolist(),
        np.max(data, axis=1).tolist(),
        np.max(data),
    ]
    computations["max"] = max

    # min
    min = [
        np.min(data, axis=0).tolist(),
        np.min(data, axis=1).tolist(),
        np.min(data),
    ]
    computations["min"] = min

    # sum
    sum = [
        np.sum(data, axis=0).tolist(),
        np.sum(data, axis=1).tolist(),
        np.sum(data),
    ]
    computations["sum"] = sum

    return computations

