import { encode } from '@/utils/encode';

function evaluate(code: string) {
  const transformed = code.replace(/^export\s+default/, 'return');
  const wrapped = `(function() { ${transformed} })()`;

  return eval(wrapped);
}

export const plugin = (code: string): string => {
  const data = evaluate(code);

  if (!data || !Array.isArray(data)) {
    return `export default ${code}`;
  }

  const encoded = encode(data);
  return `
    import { decode } from 'vite-plugin-conceal';
    export default decode(${JSON.stringify(encoded)});
  `;
}
