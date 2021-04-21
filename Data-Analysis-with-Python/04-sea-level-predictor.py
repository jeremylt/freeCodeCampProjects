import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress


def draw_plot():
    # Read data from file
    df = pd.read_csv("epa-sea-level.csv")

    # Create scatter plot
    fig, ax = plt.subplots(figsize=(27, 9))
    df.plot.scatter(x="Year", y="CSIRO Adjusted Sea Level")

    # Create first line of best fit
    line = linregress(
        df["Year"],
        df["CSIRO Adjusted Sea Level"],
    )
    x = range(1880, 2051)
    plt.plot(x, line.intercept + line.slope * x, color="maroon", label="134 Year Trend")

    # Create second line of best fit
    df_recent = df[df.Year >= 2000]
    line_recent = linregress(
        df_recent["Year"],
        df_recent["CSIRO Adjusted Sea Level"],
    )
    x_recent = range(2000, 2051)
    plt.plot(
        x_recent,
        line_recent.intercept + line_recent.slope * x_recent,
        color="red",
        label="14 Year Trend",
    )

    # Add labels and title
    plt.xlabel("Year")
    plt.ylabel("Sea Level (inches)")
    plt.title("Rise in Sea Level")
    plt.legend()

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig("sea_level_plot.png")
    return plt.gca()

