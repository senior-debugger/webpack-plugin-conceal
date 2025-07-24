import decode from 'webpack-plugin-conceal/decode.min';

import data from './data.loader';

(function showDecode() {
    console.log('showDecode', data);
})();

(function showEncode() {
    console.log('showEncode', decode(data));
})();
