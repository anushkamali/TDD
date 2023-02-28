
export class Dollar {
    constructor(amount) {
        this.amount = amount;
    }
    times(multiplier) {
        return new Dollar(this.amount * multiplier);
    }
}
export class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    times(multiplier) {
        return new Money(this.amount * multiplier, this.currency);
    }

    divide(divisor) {
        return new Money(this.amount / divisor, this.currency);
    }
}

export class Portfolio {

    constructor() {
        this.moneys = [];
    }

    convert(money, currency) {
        let exchangeRates = new Map();
        exchangeRates.set("EUR->USD", 1.2);
        exchangeRates.set("USD->KRW", 1100);
        if (money.currency === currency) {
            return money.amount; 
        }
        let key = money.currency + "->" + currency;
        let rate = exchangeRates.get(key);
        if (rate === undefined) {
            return undefined; 
        }
        return money.amount * rate; 
    }

    add(...moneys) {
        this.moneys = this.moneys.concat(moneys);
    }

    evaluate(bank, currency) {
        let failures = [];
        let total = this.moneys.reduce( (sum, money) => {
            try {
                let convertedMoney = bank.convert(money, currency); 1
                return sum + convertedMoney.amount;
            }
            catch (error) {
                failures.push(error.message);
                return sum;
            }
          }, 0);

        if (!failures.length) {
            return new Money(total, currency);
        }
        throw new Error("Missing exchange rate(s):[" + failures.join() + "]");
    }
}

export class Bank {
    constructor() {
        this.exchangeRates = new Map();
    }

    addExchangeRate(currencyFrom, currencyTo, rate) {
        let key = currencyFrom + "->" + currencyTo;
        this.exchangeRates.set(key, rate);
    }

    convert(money, currency) {
        if (money.currency === currency) {
            return new Money(money.amount, money.currency); 
        }
        let key = money.currency + "->" + currency;
        let rate = this.exchangeRates.get(key);
        if (rate === undefined) {
            throw new Error(key); 
        }
        return new Money(money.amount * rate, currency); 
    }
}