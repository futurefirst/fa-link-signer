'use strict';

const crypto = require('crypto');

function LinkSigner(secretKey, baseLink) {
  this.secretKey = secretKey;
  this.baseLink = baseLink;
}

LinkSigner.prototype.sign = function sign(params) {
  const hmac = crypto.createHmac('sha256', this.secretKey);
  const toSign = prepareToSign(params);
  hmac.update(toSign);
  params.signature = encodeURIComponent(hmac.digest('base64'));
  return this.baseLink + prepareQuery(params);
}

function prepareToSign(params) {
  let result = '';
  for (let key in params) {
    if (!params.hasOwnProperty(key)) { continue; }
    result += key;
    result += params[key];
  }
  return result;
}

function prepareQuery(params) {
  let result = '';
  for (let key in params) {
    if (!params.hasOwnProperty(key)) { continue; }
    result += '&';
    result += key;
    result += '=';
    result += params[key];
  }
  if (result) { result[0] = '?'; }
  return result;
}

module.exports = LinkSigner;
