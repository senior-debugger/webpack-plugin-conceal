import { parseObject } from '@utils/object';

export default function decode(source: any): any {
  if (!Array.isArray(source)) {
    return source;
  }

  const decoded = source.map((item: Record<string, string>) => {
    const decodedItem: Record<string, string> = {};

    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        decodedItem[key] = Buffer.from(item[key], 'base64').toString('utf-8');
      }
    }

    return decodedItem;
  });

  return decoded.map((item: Record<string, string>) => {
    const parsedItem: Record<string, any> = {};

    for (const key in item) {
      const value = item[key];

      const isValidValue = typeof value === 'string'
        && value.includes('[')
        && value.includes(']');

      if (isValidValue) {
        parsedItem[key] = parseObject(value);
      } else {
        parsedItem[key] = value;
      }
    }
    return parsedItem;
  });
}
