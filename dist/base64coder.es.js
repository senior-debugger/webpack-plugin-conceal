const parseObject = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(error);
    return value;
  }
};
function decode(source2) {
  if (!Array.isArray(source2)) {
    return source2;
  }
  const decoded = source2.map((item) => {
    const decodedItem = {};
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        decodedItem[key] = Buffer.from(item[key], "base64").toString("utf-8");
      }
    }
    return decodedItem;
  });
  return decoded.map((item) => {
    const parsedItem = {};
    for (const key in item) {
      const value = item[key];
      const isValidValue = typeof value === "string" && value.includes("[") && value.includes("]");
      if (isValidValue) {
        parsedItem[key] = parseObject(value);
      } else {
        parsedItem[key] = value;
      }
    }
    return parsedItem;
  });
}
function encode(source) {
  eval(source);
  if (!Array.isArray(global.base64data)) {
    return `export default ${JSON.stringify(source)}`;
  }
  const base64Array = global.base64data.reduce((acc, data) => {
    const dataBase64 = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        dataBase64[key] = Buffer.from(JSON.stringify(data[key])).toString("base64");
      }
    }
    acc.push(dataBase64);
    return acc;
  }, []);
  return `export default ${JSON.stringify(base64Array)}`;
}
export {
  decode,
  encode
};
//# sourceMappingURL=base64coder.es.js.map
