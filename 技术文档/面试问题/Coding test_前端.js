/**
  extensions is an Array and each item has such format:
  {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
  lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
**/
/**
  Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/
function sortExtensionsByName(extensions) {
  const getFullName = (extension) =>
    extension.firstName + extension.lastName + extension.ext;
  return [...extensions].sort((a, b) => {
    const fullNameA = getFullName(a);
    const fullNameB = getFullName(b);
    return fullNameA.localeCompare(fullNameB);
  });
}

/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VirtualUser < FaxUser < AO < Dept.
**/
function sortExtensionsByExtType(extensions) {
  // 初始化桶数组
  const TYPES = ["DigitalUser", "VirtualUser", "FaxUser", "AO", "Dept"];
  const buckets = Array.from({ length: TYPES.length }, () => []);

  extensions.forEach((i) => {
    const typeIndex = TYPES.indexOf(i.extType);
    buckets[typeIndex].push(i);
  });

  return buckets.reduce((acc, cur) => [...acc, ...cur], []);
}

/**
  saleItems is an Array has each item has such format:
  {
  month: n, //[1-12],
  date: n, //[1-31],
  transationId: "xxx",
  salePrice: number
  }
**/

/**
  Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
  [
    {quarter: 1, totalPrices: xxx, transactionNums: n},
    {....}
  ]
**/
function sumByQuarter(saleItems) {
  const buckets = Array.from({ length: 4 }, (_, i) => ({
    quarter: i + 1,
    totalPrices: 0,
    transactionNums: 0,
  }));
  return saleItems.reduce((acc, cur) => {
    const quarter = Math.ceil(cur.month / 3);
    acc[quarter - 1].totalPrices += cur.salePrice;
    acc[quarter - 1].transactionNums += 1;
    return acc;
  }, buckets);
}

/**
  Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
  [
    {quarter: 1, averagePrices: xxx, transactionNums: n},
    {....}
  ]
**/

function averageByQuarter(saleItems) {
  const buckets = Array.from({ length: 4 }, (_, i) => ({
    quarter: i + 1,
    totalPrices: 0,
    transactionNums: 0,
  }));
  return saleItems
    .reduce((acc, cur) => {
      const quarter = Math.ceil(cur.month / 3);
      acc[quarter - 1].totalPrices += cur.salePrice;
      acc[quarter - 1].transactionNums += 1;
      return acc;
    }, buckets)
    .map(({ quarter, totalPrices, transactionNums }) => ({
      quarter,
      averagePrices: totalPrices ? totalPrices / transactionNums : 0,
      transactionNums,
    }));
}

/**
  Question 5: please create a tool to generate Sequence
  Expected to be used like:
  var sequence1 = new Sequence();
  sequence1.next() --> return 1;
  sequence1.next() --> return 2;
  
  in another module:
  var sequence2 = new Sequence();
  sequence2.next() --> 3;
  sequence2.next() --> 4;
**/

/**
    Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

function getUnUsedKeys(allKeys, usedKeys) {
  return allKeys.filter(function (e) {
    return this.indexOf(e) < 0;
  }, usedKeys);
}
