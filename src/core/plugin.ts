import { encode } from '@/utils/encode';

interface Syntax {
  cjs: boolean;
  esm: boolean;
}

const evaluate = (code: string, syntax: Syntax) => {
  const pattern = syntax.cjs
    ? /\bmodule\.exports\s*=\s*/
    : /^export\s+default/;

  const transformed = code.replace(pattern, 'return');
  const wrapped = `(function() { ${transformed} })()`;

  return eval(wrapped);
}

export const plugin = (code: string): string => {
  const syntax: Syntax = {
    cjs: /\bmodule\.exports\b/.test(code),
    esm: /\bexport\s+default\b/.test(code),
  };

  const data = evaluate(code, syntax);

  /** When a module doesn't return a valid format. */
  if (!data || !Array.isArray(data)) {
    return syntax.cjs
      ? `module.exports = ${code}`
      : `export default ${code}`;
  }

  const encoded = encode(data);

  if (syntax.cjs) {
    return `
      const { decode } = require('vite-plugin-conceal');
      module.exports = decode(${JSON.stringify(encoded)});
    `;
  }

  return `
    import { decode } from 'vite-plugin-conceal';
    export default decode(${JSON.stringify(encoded)});
  `;
}
