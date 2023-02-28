import assert from 'assert';
import { Money, Portfolio, Bank } from './code.js';

let fiver = new Money(5, "USD");
let tenner = fiver.times(2);
assert.strictEqual(tenner.amount, 10);
assert.strictEqual(tenner.currency, "USD");

class MoneyTest {
    constructor() {
        this.bank = new Bank();
        this.bank.addExchangeRate("EUR", "USD", 1.2);
        this.bank.addExchangeRate("USD", "KRW", 1100);
    }
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
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "USD"), fifteenDollars);
    }

    testAdditionOfDollarsAndEuros() {
        let fiveDollars = new Money(5, "USD");
        let tenEuros = new Money(10, "EUR");
        let portfolio = new Portfolio(); 
        portfolio.add(fiveDollars, tenEuros); 
        let expectedValue = new Money(17, "USD");
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "USD"), expectedValue);
    }

    testAdditionOfDollarsAndWons() {
        let oneDollar = new Money(1, "USD");
        let elevenHundredWon = new Money(1100, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, elevenHundredWon);
        let expectedValue = new Money(2200, "KRW");
        assert.deepStrictEqual(portfolio.evaluate(this.bank, "KRW"), expectedValue);
    }

    testAdditionWithMultipleMissingExchangeRates() {
        let oneDollar = new Money(1, "USD");
        let oneEuro = new Money(1, "EUR");
        let oneWon = new Money(1, "KRW");
        let portfolio = new Portfolio();
        portfolio.add(oneDollar, oneEuro, oneWon);
        let expectedError = new Error( 
            "Missing exchange rate(s):[USD->Kalganid,EUR->Kalganid,KRW->Kalganid]");
        assert.throws(() => portfolio.evaluate(this.bank, "Kalganid"), expectedError);
    }

    testConversion() {
        let bank = new Bank;
        bank.addExchangeRate("EUR", "USD", 1.2);
        let tenEuros = new Money(10, "EUR");
        assert.deepStrictEqual(bank.convert(tenEuros, "USD"), new Money(12, "USD"));
    }

    testConversionWithMissingExchangeRate() {
        let bank = new Bank(); 
        let tenEuros = new Money(10, "EUR");
        let expectedError = new Error("EUR->Kalganid"); 
        assert.throws(function () { bank.convert(tenEuros, "Kalganid") },
          expectedError); 
      }

    runAllTests() {
        this.testAddition();
        this.testDivision();
        this.testMultiplication();
        this.testAdditionOfDollarsAndEuros();
        this.testAdditionOfDollarsAndWons();
        this.testAdditionWithMultipleMissingExchangeRates();
        this.testConversion();
        this.testConversionWithMissingExchangeRate();
    }
}

new MoneyTest().runAllTests();