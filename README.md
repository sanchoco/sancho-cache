# sancho-cache


## Install
```
npm install --save sancho-cache
```

## Use
```
const { Cache, globalCache } = require('sancho-cache');

// const cache = globalCache; // global variable object
const cache = new Cache({ exp: 50000, interval: 5000 }); // local variable object
// (Option)
// exp: Default expired time(ms)
// interval: Check delete expired cache interval(ms)

cache.set('test', 'hello', 6000); // key: 'test', 'value': 'hello', expired(option): 6000ms
cache.get('test'); // 'hello'

// after 7000ms
cache.get('test'); // undefined
```