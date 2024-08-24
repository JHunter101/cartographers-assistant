"use strict";
function smallestCommonDenominator(denominators) {
    function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }
    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }
    let result = denominators[0];
    for (let i = 1; i < denominators.length; i++) {
        result = lcm(result, denominators[i]);
    }
    return result;
}
