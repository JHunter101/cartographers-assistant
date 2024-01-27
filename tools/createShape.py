import random


def random_grid():
    grid = [[0 for _ in range(3)] for _ in range(3)]
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            grid[i][j] = random.uniform(0, 1)

    return grid


def smooth_grid(grid):
    new_grid = random_grid()
    rows, cols = len(grid), len(grid[0])

    for i in range(rows):
        for j in range(cols):
            neighbors = [
                grid[x][y]
                for x in range(max(0, i - 1), min(rows, i + 2))
                for y in range(max(0, j - 1), min(cols, j + 2))
            ]
            neighbors += [grid[i][j]]
            average = sum(neighbors) / len(neighbors)

            new_grid[i][j] = average

    return new_grid


def threshold_grid(grid, threshold_count):
    new_grid = random_grid()
    rows, cols = len(grid), len(grid[0])

    flat_list = [item for sublist in grid for item in sublist]
    threshold_size = sorted(flat_list, reverse=True)[threshold_count]

    for i in range(rows):
        for j in range(cols):
            if grid[i][j] > threshold_size:
                new_grid[i][j] = 1
            else:
                new_grid[i][j] = 0

    return new_grid


def createGrid(size):
    grid = random_grid()
    grid = smooth_grid(grid)
    grid = threshold_grid(grid, size)
    return grid


types = []
result = []
size = random.choice(list(range(2, 6)))

typeChoice = random.choice([1, 2])
sizeChoice = random.choice([1, 2])

for i in range(typeChoice):
    types += [random.choice(["A", "B", "C"])]

for i in range(typeChoice):
    result += [createGrid(round(size / (i + 1)))]

for grid in result:
    print()
    for row in grid:
        print(row)
