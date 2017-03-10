FormAssembly Link Signer
========================

Provides signed links to [FormAssembly](https://www.formassembly.com/) forms that prefill with secure parameters. Send out links to surveys automatically prefilled with the contact's information from Salesforce.

The signature protects your survey against tampering, such as changing the contact ID in the link to gain access to another contact's information. An optional expiry date/time can be specified.

See [here](https://help.formassembly.com/help/508885-prefill-lookups-using-secure-parameters) for FormAssembly's own information on generating these links, with example code in Apex. Please note that using the Salesforce prefill connector requires at least FormAssembly's Premier plan.

### Example
```javascript
const LinkSigner = require('fa-link-signer');
const signer = new LinkSigner(
  'secret-key-here',
  'http://base-link-here.example.com'
);

console.log(signer.sign({
  cid: '000111222AAABBB',
  expire: 1489138711
}));
```
will give you
`http://base-link-here.example.com?cid=000111222AAABBB&expire=1489138711&signature=uWivceem3io9zoSkDHT4W461e96S3KGF1P53x35ITCs%3D`

### Usage
The module exports a constructor which takes 2 parameters:
* the secret key, which can be found at the bottom of the configuration page for your form's prefill connector
* the base link to your form, which may be `https://www.tfaforms.com/<form id>` if publishing on FormAssembly's domain, or an address in your own domain if publishing using another method such as a [server-side script](https://help.formassembly.com/help/340360-use-a-server-side-script-api)

The constructed object has one public method, `sign`. This takes an object containing parameter names and values which will form part of the signed link, and returns the link as a string. Parameters should *not* be supplied urlencoded. The process of producing the link will do that for you. If you want to specify a date and time for your link to expire, include an `expire` parameter with a [UNIX timestamp](http://www.unixtimestamp.com/) in seconds.

This module should not be used client-side in a page accessible by untrusted users, as it needs to know your form's secret key!
