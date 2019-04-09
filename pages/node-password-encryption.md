# Node password encryption

It might be useful to encrypt or decrypt properties before adding them to git.

This is easy using the aes256 module.

```
npm install aes256 --save
```

If the config file looks like this:
```json
{
  "dev": {
    "username": "devUser",
    "password": "myDevPassword"
  },
  "test": {
    "username": "testUser",
    "password": "myTestPassword"
  }
}
```

We can encrypt/decrypt using the following node scripts:

## encrypt-properties.js
```
const passphrase = process.argv[2];

if (!passphrase || passphrase.length < 1) {
    console.log("Passphrase required");
    process.exit();
}

const fs = require('fs'),
    aes256 = require('aes256');
    config = require('./config.json');

Object.keys(config).forEach(key => config[key].password = aes256.encrypt(passphrase, config[key].password));

fs.writeFile('config.json', JSON.stringify(config), function (err) {
    if (err) throw err;
    console.log('Properties encrypted!');
});
```

## decrypt-properties.js
```
const passphrase = process.argv[2];

if (!passphrase || passphrase.length < 1) {
    console.log("Passphrase required");
    process.exit();
}

const fs = require('fs'),
    aes256 = require('aes256');
    config = require('./config.json');

Object.keys(config).forEach(key => config[key].password = aes256.decrypt(passphrase, config[key].password));

fs.writeFile('config.json', JSON.stringify(config), function (err) {
    if (err) throw err;
    console.log('Properties decrypted!');
});
```

## Loading the passwords in the program
```
    const config = require('./config.json'),
    passphrase = process.argv[2],
    aes256 = require('aes256'),
    env = 'dev',
    password = aes256.decrypt(passphrase, config[env].password));
```
