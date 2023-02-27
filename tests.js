import assert from 'assert';
import { Money, Portfolio } from './code.js';

let fiver = new Money(5, "USD");
let tenner = fiver.times(2);
assert.strictEqual(tenner.amount, 10);
assert.strictEqual(tenner.currency, "USD");

class MoneyTest {
    testMultiplication() {
        let tenEuros = new Money(10, "EUR");
        let tewntyEuros = tenEuros.times(2);
        assert.strictEqual(tewntyEuros.amount, 20);
        assert.strictEqual(tewntyEuros.currency, "EUR");
    }

    testDivision() {
        let originalMoney = new Money(4002, "KRW");
        let actualMoneyAfterDivision = originalMoney.divide(4);
        let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
        assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);
    }

    testAddition() {
        let fiveDollars = new Money(5, "USD");
        let tenDollars = new Money(10, "USD");
        let fifteenDollars = new Money(15, "USD");
        let portfolio = new Portfolio(); 
        portfolio.add(fiveDollars, tenDollars); 
        assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
    }

    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio(); 
        portfolio.add(fiveDollars, tenEuros); 
        let expectedValue = new Money(17, "USD");
        assert.deepStrictEqual(portfolio.evaluate("USD"), expectedValue);
    }

    runAllTests() {
        this.testAddition();
        this.testDivision();
        this.testMultiplication();
        this.testAdditionOfDollarsAndEuros();
    }
}

new MoneyTest().runAllTests();