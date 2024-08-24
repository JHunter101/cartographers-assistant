function smallestCommonDenominator(denominators: number[]): number {
    function gcd(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }
    
    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }
    
    let result = denominators[0];
    for (let i = 1; i < denominators.length; i++) {
        result = lcm(result, denominators[i]);
    }
    return result;
}