import numpy as np


def calculate(list):
    if len(list) < 9:
        raise ValueError("List must contain nine numbers.")
    data = np.array(list).reshape(3,3)
    computations = {}

    # mean
    computations["mean"] = [
        np.mean(data, axis=0).tolist(),
        np.mean(data, axis=1).tolist(),
        np.mean(data),
    ]

    # variance
    computations["variance"] = [
        np.var(data, axis=0).tolist(),
        np.var(data, axis=1).tolist(),
        np.var(data),
    ]

    # standard deviation
    computations["standard deviation"] = [
        np.std(data, axis=0).tolist(),
        np.std(data, axis=1).tolist(),
        np.std(data),
    ]

    # max
    computations["max"] = [
        np.max(data, axis=0).tolist(),
        np.max(data, axis=1).tolist(),
        np.max(data),
    ]

    # min
    computations["min"] = [
        np.min(data, axis=0).tolist(),
        np.min(data, axis=1).tolist(),
        np.min(data),
    ]

    # sum
    computations["sum"] = [
        np.sum(data, axis=0).tolist(),
        np.sum(data, axis=1).tolist(),
        np.sum(data),
    ]

    return computations
