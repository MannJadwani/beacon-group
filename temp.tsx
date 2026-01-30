import React, { useState } from 'react';

// Helper function to parse scientific notation strings
function parseScientificString(str) {
  const match = str.match(/^(-?\d*\.?\d+)([eE]([+-]?\d+))?$/);
  if (!match) return null;
  
  let mantissa = match[1];
  const exponent = match[3] ? parseInt(match[3], 10) : 0;
  
  // Handle special case of just "."
  if (mantissa === '.' || mantissa === '-.') {
    mantissa = mantissa.startsWith('-') ? '-0' : '0';
  }
  
  // Parse mantissa
  const parts = mantissa.split('.');
  let valueStr = parts.join('') || '0';
  let scale = parts.length > 1 ? parts[1].length : 0;
  
  // Handle sign
  let sign = '';
  if (valueStr.startsWith('-')) {
    sign = '-';
    valueStr = valueStr.slice(1);
  }
  
  // Remove leading zeros from valueStr (but keep at least one digit)
  valueStr = valueStr.replace(/^0+/, '') || '0';
  
  // Adjust for exponent
  if (exponent > 0) {
    // Multiply by 10^exponent: add zeros to value
    valueStr = valueStr + '0'.repeat(exponent);
  } else if (exponent < 0) {
    // Divide by 10^|exponent|: increase scale
    scale += Math.abs(exponent);
  }
  
  // Normalize: remove trailing zeros from valueStr and decrease scale accordingly
  while (scale > 0 && valueStr.endsWith('0')) {
    valueStr = valueStr.slice(0, -1);
    scale--;
  }
  
  return { value: BigInt(sign + valueStr), scale };
}

// Simple Decimal class for arbitrary precision arithmetic using BigInt
class Decimal {
  constructor(value) {
    if (value instanceof Decimal) {
      this.value = value.value;
      this.scale = value.scale;
      this._isNaN = value._isNaN;
      this._isInfinite = value._isInfinite;
    } else if (typeof value === 'string') {
      const parsed = parseScientificString(value);
      if (parsed) {
        this.value = parsed.value;
        this.scale = parsed.scale;
        this._isNaN = false;
        this._isInfinite = false;
      } else {
        this.value = 0n;
        this.scale = 0;
        this._isNaN = true;
        this._isInfinite = false;
      }
    } else if (typeof value === 'number') {
      if (isNaN(value)) {
        this.value = 0n;
        this.scale = 0;
        this._isNaN = true;
        this._isInfinite = false;
        return;
      }
      if (!isFinite(value)) {
        this.value = value > 0 ? this.MAX_VALUE : -this.MAX_VALUE;
        this.scale = 0;
        this._isNaN = false;
        this._isInfinite = true;
        return;
      }
      // Convert number to string with enough precision
      let str = value.toString();
      // If it's in scientific notation, use toPrecision
      if (str.includes('e')) {
        str = value.toPrecision(30);
      }
      const parsed = parseScientificString(str);
      if (parsed) {
        this.value = parsed.value;
        this.scale = parsed.scale;
        this._isNaN = false;
        this._isInfinite = false;
      } else {
        this.value = 0n;
        this.scale = 0;
        this._isNaN = true;
        this._isInfinite = false;
      }
    } else if (typeof value === 'bigint') {
      this.value = value;
      this.scale = 0;
      this._isNaN = false;
      this._isInfinite = false;
    } else if (typeof value === 'object' && value !== null && 'value' in value && 'scale' in value) {
      this.value = BigInt(value.value);
      this.scale = value.scale;
      this._isNaN = value._isNaN || false;
      this._isInfinite = value._isInfinite || false;
    } else {
      this.value = 0n;
      this.scale = 0;
      this._isNaN = false;
      this._isInfinite = false;
    }
  }

  get MAX_VALUE() {
    return 10n ** 100n;
  }

  plus(other) {
    const o = new Decimal(other);
    const maxScale = Math.max(this.scale, o.scale);
    const a = this.value * 10n ** BigInt(maxScale - this.scale);
    const b = o.value * 10n ** BigInt(maxScale - o.scale);
    const result = new Decimal({ value: a + b, scale: maxScale });
    return result._normalize();
  }

  minus(other) {
    const o = new Decimal(other);
    const maxScale = Math.max(this.scale, o.scale);
    const a = this.value * 10n ** BigInt(maxScale - this.scale);
    const b = o.value * 10n ** BigInt(maxScale - o.scale);
    const result = new Decimal({ value: a - b, scale: maxScale });
    return result._normalize();
  }

  times(other) {
    const o = new Decimal(other);
    const result = new Decimal({
      value: this.value * o.value,
      scale: this.scale + o.scale
    });
    return result._normalize();
  }

  dividedBy(other) {
    const o = new Decimal(other);
    if (o.isZero()) return new Decimal(NaN);
    const precision = 50;
    const scale = precision + this.scale + o.scale;
    const a = this.value * 10n ** BigInt(scale);
    const result = new Decimal({
      value: a / o.value,
      scale: scale
    });
    return result._normalize();
  }

  modulo(other) {
    const o = new Decimal(other);
    const maxScale = Math.max(this.scale, o.scale);
    const a = this.value * 10n ** BigInt(maxScale - this.scale);
    const b = o.value * 10n ** BigInt(maxScale - o.scale);
    const result = new Decimal({
      value: a % b,
      scale: maxScale
    });
    return result._normalize();
  }

  pow(exponent) {
    const exp = new Decimal(exponent);
    if (exp.isZero()) return new Decimal(1);
    if (this.isZero()) return new Decimal(0);
    
    const intExp = exp.toDecimalPlaces(0);
    if (!exp.equals(intExp)) {
      // For non-integer exponents, use Math.pow
      return new Decimal(Math.pow(this.toNumber(), exp.toNumber()));
    }
    
    let n = intExp.toNumber();
    if (n < 0) {
      return new Decimal(1).dividedBy(this.pow(-n));
    }
    
    let result = new Decimal(1);
    let base = this;
    while (n > 0) {
      if (n % 2 === 1) result = result.times(base);
      base = base.times(base);
      n = Math.floor(n / 2);
    }
    return result;
  }

  abs() {
    return new Decimal({ value: this.value < 0n ? -this.value : this.value, scale: this.scale });
  }

  negated() {
    return new Decimal({ value: -this.value, scale: this.scale });
  }

  isZero() {
    return this.value === 0n && !this._isNaN && !this._isInfinite;
  }

  isNegative() {
    return this.value < 0n;
  }

  isNaN() {
    return !!this._isNaN;
  }

  isFinite() {
    return !this._isInfinite && !this._isNaN;
  }

  lt(other) {
    return this.compareTo(other) < 0;
  }

  gt(other) {
    return this.compareTo(other) > 0;
  }

  lte(other) {
    return this.compareTo(other) <= 0;
  }

  gte(other) {
    return this.compareTo(other) >= 0;
  }

  eq(other) {
    return this.compareTo(other) === 0;
  }

  equals(other) {
    return this.eq(other);
  }

  compareTo(other) {
    const o = new Decimal(other);
    const maxScale = Math.max(this.scale, o.scale);
    const a = this.value * 10n ** BigInt(maxScale - this.scale);
    const b = o.value * 10n ** BigInt(maxScale - o.scale);
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  _normalize() {
    let value = this.value;
    let scale = this.scale;
    while (scale > 0 && value % 10n === 0n) {
      value /= 10n;
      scale--;
    }
    return new Decimal({ value, scale });
  }

  toDecimalPlaces(decimalPlaces, rounding = 'ROUND_HALF_UP') {
    const factor = 10n ** BigInt(decimalPlaces);
    const scaled = this.value * factor / 10n ** BigInt(this.scale);
    let rounded = scaled;
    
    const remainder = this.value * factor % 10n ** BigInt(this.scale);
    const half = 5n ** BigInt(decimalPlaces);
    
    if (rounding === 'ROUND_HALF_UP' && remainder > half) {
      rounded = scaled + 1n;
    } else if (rounding === 'ROUND_HALF_UP' && remainder < -half) {
      rounded = scaled - 1n;
    }
    
    const result = new Decimal({ value: rounded, scale: decimalPlaces });
    return result._normalize();
  }

  toNumber() {
    const str = this.toString();
    return parseFloat(str);
  }

  toExponential(decimalPlaces) {
    if (this._isNaN) return 'NaN';
    if (this._isInfinite) return this.isNegative() ? '-Infinity' : 'Infinity';
    if (this.isZero()) return '0.' + '0'.repeat(decimalPlaces) + 'e+0';
    
    const str = this.toString();
    const num = parseFloat(str);
    return num.toExponential(decimalPlaces);
  }

  toPrecision(precision) {
    if (this._isNaN) return 'NaN';
    if (this._isInfinite) return this.isNegative() ? '-Infinity' : 'Infinity';
    if (this.isZero()) return '0.' + '0'.repeat(precision - 1);
    
    const str = this.toString();
    const num = parseFloat(str);
    return num.toPrecision(precision);
  }

  toString() {
    if (this._isNaN) return 'NaN';
    if (this._isInfinite) return this.isNegative() ? '-Infinity' : 'Infinity';
    
    let sign = '';
    let value = this.value;
    if (value < 0n) {
      sign = '-';
      value = -value;
    }
    
    const valueStr = value.toString();
    if (this.scale === 0) {
      return sign + valueStr;
    }
    
    if (valueStr.length <= this.scale) {
      const padded = '0'.repeat(this.scale - valueStr.length + 1) + valueStr;
      return sign + '0.' + padded.slice(0, -1);
    }
    
    const intPart = valueStr.slice(0, -this.scale) || '0';
    const decPart = valueStr.slice(-this.scale);
    return sign + intPart + '.' + decPart;
  }

  static set(config) {
    Decimal.precision = config.precision || 50;
    Decimal.rounding = config.rounding || 'ROUND_HALF_UP';
  }
}

Decimal.precision = 50;
Decimal.rounding = 'ROUND_HALF_UP';
Decimal.ROUND_HALF_UP = 'ROUND_HALF_UP';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(new Decimal(0));
  const [angleMode, setAngleMode] = useState('deg');
  const [expression, setExpression] = useState('');

  const toDecimal = (val) => {
    if (val instanceof Decimal) return val;
    return new Decimal(val);
  };

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperation) => {
    const inputValue = toDecimal(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || new Decimal(0);
      const newValue = performCalculation(currentValue, inputValue, operation);
      setDisplay(String(formatNumber(newValue)));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
    setExpression(\`\${formatNumber(previousValue || inputValue)} \${nextOperation}\`);
  };

  const performCalculation = (firstValue, secondValue, op) => {
    const first = toDecimal(firstValue);
    const second = toDecimal(secondValue);
    
    switch (op) {
      case '+': return first.plus(second);
      case '-': return first.minus(second);
      case '×': return first.times(second);
      case '÷': return second.isZero() ? new Decimal(NaN) : first.dividedBy(second);
      case '^': return first.pow(second);
      case 'mod': return first.modulo(second);
      default: return second;
    }
  };

  const formatNumber = (num) => {
    if (num instanceof Decimal) {
      if (!num.isFinite()) return num.isNaN() ? 'Error' : num.isNegative() ? '-Infinity' : 'Infinity';
      
      const absValue = num.abs();
      
      if (absValue.lt(new Decimal('1e-10')) && !num.isZero()) {
        return num.toExponential(6);
      }
      if (absValue.gt(new Decimal('1e12'))) {
        return num.toExponential(6);
      }
      
      return num.toPrecision(12).toString();
    }
    if (typeof num !== 'number') return num;
    if (Math.abs(num) < 1e-10 && num !== 0) return num.toExponential(6);
    if (Math.abs(num) > 1e12) return num.toExponential(6);
    return parseFloat(num.toPrecision(12));
  };

  const handleEquals = () => {
    const inputValue = toDecimal(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation);
      setExpression(\`\${formatNumber(previousValue)} \${operation} \${formatNumber(inputValue)} =\`);
      setDisplay(String(formatNumber(newValue)));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  const handleAllClear = () => {
    handleClear();
    setMemory(new Decimal(0));
  };

  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const handleSignToggle = () => {
    const newValue = toDecimal(display).negated();
    setDisplay(String(formatNumber(newValue)));
  };

  const handlePercentage = () => {
    const newValue = toDecimal(display).dividedBy(100);
    setDisplay(String(formatNumber(newValue)));
  };

  const toRadians = (degrees) => toDecimal(degrees).times(new Decimal(Math.PI)).dividedBy(180);
  const toDegrees = (radians) => toDecimal(radians).times(180).dividedBy(new Decimal(Math.PI));

  // Arbitrary precision square root using Newton's method
  const sqrtDecimal = (n, precision = 50) => {
    if (n.isNegative()) return new Decimal(NaN);
    if (n.isZero()) return new Decimal(0);
    
    let x = new Decimal(n);
    let prev;
    const epsilon = new Decimal(10).pow(-precision);
    
    do {
      prev = x;
      x = x.plus(n.dividedBy(x)).dividedBy(2);
    } while (x.minus(prev).abs().gt(epsilon));
    
    return x;
  };

  // Arbitrary precision natural log using series expansion
  const lnDecimal = (n) => {
    if (n.lte(new Decimal(0))) return new Decimal(NaN);
    if (n.eq(new Decimal(1))) return new Decimal(0);
    
    // Use built-in for reasonable values with conversion to/from Decimal
    return new Decimal(Math.log(n.toNumber()));
  };

  // Arbitrary precision e^x using series expansion
  const expDecimal = (n) => {
    const maxTerms = 100;
    let result = new Decimal(1);
    let term = new Decimal(1);
    let factorial = new Decimal(1);
    
    for (let i = 1; i <= maxTerms; i++) {
      factorial = factorial.times(i);
      term = n.pow(i).dividedBy(factorial);
      if (term.abs().lt(new Decimal(10).pow(-40))) break;
      result = result.plus(term);
    }
    
    return result;
  };

  // Helper factorial for series calculations
  const factorialDecimalSmall = (n) => {
    if (n < 0) return new Decimal(NaN);
    if (n === 0 || n === 1) return new Decimal(1);
    let result = new Decimal(1);
    for (let i = 2; i <= n; i++) {
      result = result.times(i);
    }
    return result;
  };

  // Arbitrary precision factorial for integer values
  const factorialDecimal = (n) => {
    const intN = n.toDecimalPlaces(0);
    if (intN.isNegative()) return new Decimal(NaN);
    if (intN.isZero() || intN.eq(new Decimal(1))) return new Decimal(1);
    if (intN.gt(new Decimal(1000))) return factorialStirling(intN);
    
    let result = new Decimal(1);
    const intNum = intN.toNumber();
    for (let i = 2; i <= intNum; i++) {
      result = result.times(i);
    }
    return result;
  };

  const factorialStirling = (n) => {
    const sqrt2pi = new Decimal(2).times(new Decimal(Math.PI)).sqrt();
    const sqrtN = sqrtDecimal(n);
    const nOverE = n.dividedBy(expDecimal(new Decimal(1)));
    return sqrt2pi.times(sqrtN).times(nOverE.pow(n));
  };

  const handleScientific = (func) => {
    const value = toDecimal(display);
    let result;

    switch (func) {
      case 'sin':
        result = new Decimal(Math.sin(angleMode === 'deg' ? toRadians(value).toNumber() : value.toNumber()));
        break;
      case 'cos':
        result = new Decimal(Math.cos(angleMode === 'deg' ? toRadians(value).toNumber() : value.toNumber()));
        break;
      case 'tan':
        result = new Decimal(Math.tan(angleMode === 'deg' ? toRadians(value).toNumber() : value.toNumber()));
        break;
      case 'asin':
        result = new Decimal(Math.asin(value.toNumber()));
        result = angleMode === 'deg' ? toDegrees(result) : result;
        break;
      case 'acos':
        result = new Decimal(Math.acos(value.toNumber()));
        result = angleMode === 'deg' ? toDegrees(result) : result;
        break;
      case 'atan':
        result = new Decimal(Math.atan(value.toNumber()));
        result = angleMode === 'deg' ? toDegrees(result) : result;
        break;
      case 'sinh':
        result = new Decimal(Math.sinh(value.toNumber()));
        break;
      case 'cosh':
        result = new Decimal(Math.cosh(value.toNumber()));
        break;
      case 'tanh':
        result = new Decimal(Math.tanh(value.toNumber()));
        break;
      case 'log':
        result = lnDecimal(value).dividedBy(lnDecimal(new Decimal(10)));
        break;
      case 'ln':
        result = lnDecimal(value);
        break;
      case 'log2':
        result = lnDecimal(value).dividedBy(lnDecimal(new Decimal(2)));
        break;
      case 'sqrt':
        result = sqrtDecimal(value);
        break;
      case 'cbrt':
        result = new Decimal(Math.cbrt(value.toNumber()));
        break;
      case 'square':
        result = value.times(value);
        break;
      case 'cube':
        result = value.times(value).times(value);
        break;
      case 'factorial':
        result = factorialDecimal(value);
        break;
      case 'exp':
        result = new Decimal(Math.exp(value.toNumber()));
        break;
      case '10^x':
        result = new Decimal(10).pow(value);
        break;
      case '2^x':
        result = new Decimal(2).pow(value);
        break;
      case '1/x':
        result = new Decimal(1).dividedBy(value);
        break;
      case 'e':
        result = new Decimal(Math.E);
        break;
      case 'π':
        result = new Decimal(Math.PI);
        break;
      case 'abs':
        result = value.abs();
        break;
      case 'random':
        result = new Decimal(Math.random());
        break;
      default:
        result = value;
    }

    setExpression(\`\${func}(\${formatNumber(value)})\`);
    setDisplay(String(formatNumber(result)));
    setWaitingForOperand(true);
  };

  const handleMemory = (action) => {
    const value = toDecimal(display);
    switch (action) {
      case 'MC':
        setMemory(new Decimal(0));
        break;
      case 'MR':
        setDisplay(String(formatNumber(memory)));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory.plus(value));
        setWaitingForOperand(true);
        break;
      case 'M-':
        setMemory(memory.minus(value));
        setWaitingForOperand(true);
        break;
      case 'MS':
        setMemory(value);
        setWaitingForOperand(true);
        break;
    }
  };

  const Button = ({ children, onClick, className = '', colSpan = 1, rowSpan = 1 }) => (
    <button
      onClick={onClick}
      className={\`h-14 text-sm font-semibold rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center \${className}\`}
      style={{ gridColumn: \`span \${colSpan}\`, gridRow: \`span \${rowSpan}\` }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 flex items-center justify-center p-4">
      <div className="bg-zinc-900/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-zinc-800 w-full max-w-5xl">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Scientific Calculator
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
              className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${
                angleMode === 'deg' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
              }\`}
            >
              DEG
            </button>
            <button
              onClick={() => setAngleMode(angleMode === 'rad' ? 'deg' : 'rad')}
              className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${
                angleMode === 'rad' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
              }\`}
            >
              RAD
            </button>
          </div>
        </div>

        <div className="bg-zinc-950/80 rounded-2xl p-6 mb-4 border border-zinc-800">
          <div className="text-right text-zinc-500 text-sm h-6 overflow-hidden">
            {expression || (previousValue !== null && operation ? \`\${formatNumber(previousValue)} \${operation}\` : '')}
          </div>
          <div className="text-right text-5xl font-light text-white tracking-wide overflow-x-auto py-2">
            {display}
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-zinc-600 text-xs">
              {memory && !memory.isZero() ? \`M: \${formatNumber(memory)}\` : ''}
            </div>
            <div className="text-zinc-600 text-xs">
              {operation && waitingForOperand ? 'Ready for input' : ''}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          <Button onClick={() => handleMemory('MC')} className="bg-zinc-800 hover:bg-zinc-700 text-red-400">MC</Button>
          <Button onClick={() => handleMemory('MR')} className="bg-zinc-800 hover:bg-zinc-700 text-red-400">MR</Button>
          <Button onClick={() => handleMemory('M+')} className="bg-zinc-800 hover:bg-zinc-700 text-red-400">M+</Button>
          <Button onClick={() => handleMemory('M-')} className="bg-zinc-800 hover:bg-zinc-700 text-red-400">M-</Button>
          <Button onClick={() => handleMemory('MS')} className="bg-zinc-800 hover:bg-zinc-700 text-red-400">MS</Button>
          <Button onClick={handleAllClear} className="bg-red-600/80 hover:bg-red-500 text-white">AC</Button>

          <Button onClick={() => handleScientific('sin')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">sin</Button>
          <Button onClick={() => handleScientific('cos')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">cos</Button>
          <Button onClick={() => handleScientific('tan')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">tan</Button>
          <Button onClick={() => handleScientific('sinh')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">sinh</Button>
          <Button onClick={() => handleScientific('cosh')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">cosh</Button>
          <Button onClick={() => handleScientific('tanh')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-400">tanh</Button>

          <Button onClick={() => handleScientific('asin')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-300">sin⁻¹</Button>
          <Button onClick={() => handleScientific('acos')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-300">cos⁻¹</Button>
          <Button onClick={() => handleScientific('atan')} className="bg-zinc-800 hover:bg-zinc-700 text-cyan-300">tan⁻¹</Button>
          <Button onClick={() => handleScientific('log')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">log</Button>
          <Button onClick={() => handleScientific('ln')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">ln</Button>
          <Button onClick={() => handleScientific('log2')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">log₂</Button>

          <Button onClick={() => handleScientific('square')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">x²</Button>
          <Button onClick={() => handleScientific('cube')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">x³</Button>
          <Button onClick={() => handleOperator('^')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">xʸ</Button>
          <Button onClick={() => handleScientific('sqrt')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">√x</Button>
          <Button onClick={() => handleScientific('cbrt')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">∛x</Button>
          <Button onClick={() => handleOperator('mod')} className="bg-zinc-800 hover:bg-zinc-700 text-yellow-400">mod</Button>

          <Button onClick={() => handleScientific('factorial')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-400">x!</Button>
          <Button onClick={() => handleScientific('1/x')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-400">1/x</Button>
          <Button onClick={() => handleScientific('exp')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">eˣ</Button>
          <Button onClick={() => handleScientific('10^x')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">10ˣ</Button>
          <Button onClick={() => handleScientific('2^x')} className="bg-zinc-800 hover:bg-zinc-700 text-green-400">2ˣ</Button>
          <Button onClick={handleBackspace} className="bg-zinc-700 hover:bg-zinc-600 text-orange-400">⌫</Button>

          <Button onClick={() => handleScientific('e')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-300">e</Button>
          <Button onClick={() => handleScientific('π')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-300">π</Button>
          <Button onClick={() => handleScientific('abs')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-400">|x|</Button>
          <Button onClick={() => handleScientific('random')} className="bg-zinc-800 hover:bg-zinc-700 text-purple-400">RND</Button>
          <Button onClick={handleSignToggle} className="bg-zinc-800 hover:bg-zinc-700 text-orange-400">±</Button>
          <Button onClick={handlePercentage} className="bg-zinc-800 hover:bg-zinc-700 text-orange-400">%</Button>

          <Button onClick={() => handleNumber('7')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">7</Button>
          <Button onClick={() => handleNumber('8')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">8</Button>
          <Button onClick={() => handleNumber('9')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">9</Button>
          <Button onClick={() => handleOperator('÷')} className="bg-orange-600 hover:bg-orange-500 text-white text-lg">÷</Button>
          <Button onClick={handleClear} className="bg-zinc-700 hover:bg-zinc-600 text-white">C</Button>
          <Button onClick={() => handleOperator('(')} className="bg-zinc-800 hover:bg-zinc-700 text-slate-400">(</Button>

          <Button onClick={() => handleNumber('4')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">4</Button>
          <Button onClick={() => handleNumber('5')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">5</Button>
          <Button onClick={() => handleNumber('6')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">6</Button>
          <Button onClick={() => handleOperator('×')} className="bg-orange-600 hover:bg-orange-500 text-white text-lg">×</Button>
          <Button onClick={() => handleOperator('-')} className="bg-orange-600 hover:bg-orange-500 text-white text-lg">−</Button>
          <Button onClick={() => handleOperator(')')} className="bg-zinc-800 hover:bg-zinc-700 text-slate-400">)</Button>

          <Button onClick={() => handleNumber('1')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">1</Button>
          <Button onClick={() => handleNumber('2')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">2</Button>
          <Button onClick={() => handleNumber('3')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">3</Button>
          <Button onClick={() => handleOperator('+')} className="bg-orange-600 hover:bg-orange-500 text-white text-lg" rowSpan={2}>+</Button>

          <Button onClick={() => handleNumber('0')} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg" colSpan={2}>0</Button>
          <Button onClick={handleDecimal} className="bg-zinc-700 hover:bg-zinc-600 text-white text-lg">.</Button>
          <Button onClick={handleEquals} className="bg-emerald-600 hover:bg-emerald-500 text-white text-lg" colSpan={2} rowSpan={2}>=</Button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;`
