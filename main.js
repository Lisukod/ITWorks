//Create new object to store terms
class Polynominal {
  constructor(coefficient, exponent) {
    this.coefficient = coefficient;
    this.exponent = exponent;
  }
}

function addExpressions(exprA, exprB) {
  exprA = makePolynominals(exprA);
  exprB = makePolynominals(exprB);
  if (checkVariables(exprA) === false) {
    console.error("Incorrect variable in first expression");
    return false;
  } else if (checkVariables(exprB) === false) {
    console.error("Incorrect variable in second expression");
    return false;
  }
  const exprSum = [].concat(exprA, exprB);
  // sortExpression(exprSum);
  return toString(sortExpression(exprSum));
}

function sortExpression(expression) {
  // sort expression descending
  bubbleSort(expression);
  // Sum up repeating exponent coefficients
  for (let i = 0; i < expression.length - 1; i++) {
    if (expression[i].exponent === expression[i + 1].exponent) {
      expression[i].coefficient += expression[i + 1].coefficient;
      expression.splice(i + 1, 1);
      i--;
    }
  }
  return expression
}

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = len - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j - 1].exponent < arr[j].exponent) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

//change result expression into final string
function toString(expr) {
  let stringifiedExpr = "";
  expr.forEach((element, index) => {
    if (element.exponent !== 0) {
      stringifiedExpr += element.coefficient + "x^" + element.exponent;
    } else {
      stringifiedExpr += element.coefficient;
    }
    if (index < expr.length - 1) {
      stringifiedExpr += " + ";
    }
  })
  return stringifiedExpr;
}

//Check variables
function checkVariables(expr) {
  try {
    expr.forEach((element, index) => {
      if (isNaN(element.coefficient))
        throw 'coefficient "' + element.coefficient + '" at index ' + index + ' is not a real number'
      if (isNaN(element.exponent))
        throw 'exponent "' + element.exponent + '" at index ' + index + ' is not a real number'
    })
  } catch (e) {
    console.error(e)
    return false
  }
}
//For easy creating new expressions
function makePolynominals(arr) {
  const polyArr = [];
  arr.forEach((element) => {
    polyArr.push(new Polynominal(element[0], element[1]));
  })
  return polyArr
}

//Tests
//Main Test

function mainTest(arrA, arrB, expectedResult, testName) {
  let hold;
  try {
    if ((hold = addExpressions(arrA, arrB)) !== expectedResult) {
      console.log("Obtained result: " + hold);
      console.log("Expected result: " + expectedResult);
      if (testName == undefined)
        throw 'Addition of expressions failed. Result incorrect!'
      throw 'Addition of expressions failed. Result incorrect! ' + testName
    }
  } catch (e) {
    console.error(e)
    return false
  }
  return true
}