# random-domains

> Return a random domain.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/mock-end/random-domains/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/mock-end/random-domains/master.svg?style=flat-square)](https://travis-ci.org/mock-end/random-domains)
[![coverage:?](https://img.shields.io/coveralls/mock-end/random-domains/master.svg?style=flat-square)](https://coveralls.io/github/mock-end/random-domains)


## Install

```
$ npm install --save random-domains
```

## Usage

> For more use-cases see the [tests](https://github.com/mock-end/random-domains/blob/master/test/spec/index.js)

```js
var randomDomains = require('random-domains');

// API
// - randomDomains([options]);

// options
// - tld
// - level
```

Return a random domain with a random [tld](https://github.com/mock-end/random-tld).

```js
randomDomains();
// => 'ase.com'
```

Optionally specify a tld and the domain will be random but the tld will not.

```js
randomDomains({ tld: 'ie' })
=> 'gotaujo.ie'
```

Optionally specify the `level` for the domain:

```js
randomDomains({ level:2 });
// => 'edfyiu.asfc.me'
```

Or combine them:

```js
randomDomains({ level: 2, tld: 'com' });
// => 'asdl.sssle.com'
```


## Related

- [random-tld](https://github.com/mock-end/random-tld) - Return a random tld(Top Level Domain).
- [random-email](https://github.com/mock-end/random-email) - Return a random email.
- [random-protocol](https://github.com/mock-end/random-protocol) - Return a random protocol.
- [random-hashtag](https://github.com/mock-end/random-tld) - Return a random hashtag.
- [random-uri](https://github.com/mock-end/random-uri.git) - Return a random url.
- [random-ipv4](https://github.com/mock-end/random-ipv4) - Return a random ipv4 address.
- [random-ipv6](https://github.com/mock-end/random-ipv6) - Return a random ipv6 address.
- [random-avatar](https://github.com/mock-end/random-avatar) - Return a URL to a random avatar from Gravatar.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/mock-end/random-domains/issues/new).
