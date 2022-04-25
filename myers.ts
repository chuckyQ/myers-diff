/** This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
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
