const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    while ((line = await readline())) {
        let tokens = line.split(",").map(Number);
        // let a = parseInt(tokens[0]);
        // let b = parseInt(tokens[1]);
        console.log(tokens);
        
        // let res= [];

        // while ( a.length !== 0 &&  b.length !== 0) {
        //     if (a[0] < b[0]) {
        //         res.push(a.shift());
        //     } else {
        //         res.push(b.shift());
        //     }
        // }
        // while(a.length !== 0 ) {
        //     res.push(a.shift());
        // }
        //  while(b.length !== 0 ) {
        //     res.push(b.shift());
        // }
        // return res
    }
})();