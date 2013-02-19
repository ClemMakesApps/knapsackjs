knapsackjs
==========

Compiling instructions
-------------
1. Go to nodejs.org to download nodejs
2. Install nodejs installer
3. Launch terminal or command line
4. > $ node main.js inputFile.json mode#

Command Line Input
-------------
> $ node main.js inputFile.json mode#

Knapsack Algorithm Modes
-------------
0 - Brute Force Tree
1 - Tree Optimized w/ weight optimizations
2 - Tree Optimized w/ weight optimizations + greedy upper bound optimizations
3 - Greedy

Example Input File Format (json)
-------------
{
    "limit": 13,
    "items": [
        {
            "weight": 3,
            "worth": 6,
            "name": "A"
        },
        {
            "weight": 5,
            "worth": 3,
            "name": "B"
        },
        {
            "weight": 1,
            "worth": 2,
            "name": "C"
        },
        {
            "weight": 7,
            "worth": 5,
            "name": "D"
        },
        {
            "weight": 4,
            "worth": 5,
            "name": "E"
        }
    ]
}

