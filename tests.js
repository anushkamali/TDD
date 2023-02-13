import assert from 'assert';
import { Dollar, Money, Portfolio } from './code.js';

//1
let fiver = new Dollar(5);
let tenner = fiver.times(2);
assert.strictEqual(tenner.amount, 10);

//2
let tenEuros = new Money(10, "EUR");
let tewntyEuros = tenEuros.times(2);
assert.strictEqual(tewntyEuros.amount, 20);
assert.strictEqual(tewntyEuros.currency, "EUR");

//3
let fiver1 = new Money(5, "USD");
let tenner1 = fiver1.times(2);
assert.strictEqual(tenner1.amount, 10);
assert.strictEqual(tenner1.currency, "USD");

//4
let originalMoney = new Money(4002, "KRW");
let actualMoneyAfterDivision = originalMoney.divide(4);
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);

//5
let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
assert.deepStrictEqual(fiveDollars.times(2), tenDollars);

//6
let fifteenDollars = new Money(15, "USD");
let portfolio = new Portfolio(); 
portfolio.add(fiveDollars, tenDollars); 
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);