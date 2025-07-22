export default function encode(source: string): string {
  eval(source);

  if (!Array.isArray((global as any).base64data)) {
    return `export default ${JSON.stringify(source)}`;
  }

  const base64Array = (global as any)
    .base64data
    .reduce((acc: any[], data: Record<string, any>) => {
      const dataBase64: Record<string, string> = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          dataBase64[key] = Buffer
            .from(JSON.stringify(data[key]))
            .toString('base64');
        }
      }

      acc.push(dataBase64);
      return acc;
    }, []);

  return `export default ${JSON.stringify(base64Array)}`;
}
