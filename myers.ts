/**
 * For license, see LICENSE
 *
 * Full credit to original code written in Python.
 * https://gist.github.com/adamnew123456/37923cf53f51d6b9af32a539cdfa7cc4
 *
*/

/**
 * This function takes two arrays of strings and produces an array
 * showing which content has been added, removed, or not changed.
 * The returned array is an array of arrays (length of 2) where
 * each array has a change marker ('+' for added, '-' for removal,
 * and ' ' for no change) and the text from the respective array.
 *
 * Input:
 * var a1 = ['a', 'b', 'c', 'd', 'e']
 * var a2 = ['a', 'c', 'c', 'c', 'e']
 * console.log(myers_diff(a1, a2))
 *
 * Output:
 * [
 * [ ' ', 'a' ],
 * [ '-', 'b' ],
 * [ ' ', 'c' ],
 * [ '-', 'd' ],
 * [ '+', 'c' ],
 * [ '+', 'c' ],
 * [ ' ', 'e' ]
 * ]
*/
function myers_diff(a_lines: Array<string>, b_lines: Array<string>) {

    let frontier = {1 : {x : 0, history: []}};

    function one(idx: number) {
        return idx - 1;
    }

    let a_max = a_lines.length;
    let b_max = b_lines.length;

    for(let d = 0; d < a_max + b_max + 1; d++) {

        for(let k = -d; k < d + 1; k += 2) {

            let go_down = false

            if(k == -d) {
                go_down = true
            }
            else if (k != d && frontier[k-1].x < frontier[k + 1].x) {
                go_down = true;
            }

            if(go_down) {
                var old_x = frontier[k + 1].x
                var history = frontier[k + 1].history
                var x = old_x
            } else {
                var old_x = frontier[k - 1].x
                var history = frontier[k - 1].history
                var x = old_x + 1
            }
            history = [...history];
            var y = x - k;

            if( y >= 1 && y <= b_max && go_down) {
                history.push( ['+', b_lines[one(y)]] );
            } else if(x > 1 && x < a_max) {
                history.push( ['-', a_lines[one(x)]] );
            }

            while( x < a_max && y < b_max && a_lines[one(x+1)] == b_lines[one(y+1)] ) {
                x += 1;
                y += 1;
                history.push( [' ', a_lines[one(x)]] )
            }

            if(x >= a_max && y >= b_max) {
                return history;
            } else {
                frontier[k] = {x: x, history: [...history]};
            }
        }
    }
}
