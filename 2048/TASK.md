# 2048

The name comes from the popular open-source implementation of this game mechanic, 2048.

## Task

Implement a 2D sliding block puzzle game where blocks with numbers are combined to add their values.

### Rules
    The rules are that on each turn the player must choose a direction   (up, down, left or right).
    All tiles move as far as possible in that direction, some move more than others.
    Two adjacent tiles (in that direction only) with matching numbers combine into one bearing the sum of those numbers.
    A move is valid when at least one tile can be moved, including by combination.
    A new tile is spawned at the end of each turn at a randomly chosen empty square   (if there is one).
    Most of the time, a new 2 is to be added, but occasionally (10% of the time), a 4.
    To win, the player must create a tile with the number 2048.
    The player loses if no valid moves are possible.

### Requirements

    "Non-greedy" movement.
    The tiles that were created by combining other tiles should not be combined again during the same turn (move).
    That is to say, that moving the tile row of:
    to the right should result in:

        ......[4][4] 

    and not:

        .........[8] 

    "Move direction priority".
    If more than one variant of combining is possible,

        ...[2][2][2] 

    to the right should result in:

        ......[2][4] 

    and not:

        ......[4][2] 

    Check for valid moves. The player shouldn't be able to gain new tile by trying a move that doesn't change the board.
    Check for a win condition.
    Check for a lose condition.
