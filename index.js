'use strict';

const crypto = require('crypto');

function LinkSigner(secretKey, baseLink) {
  this.secretKey = secretKey;
  this.baseLink = baseLink;
}

LinkSigner.prototype.sign = function sign(params) {
  const toSign = prepareSigningString(params);
  params.signature = doSign(this.secretKey, toSign);
  return this.baseLink + '?' + prepareQueryString(params);
}

function prepareSigningString(params) {
  const keys = Object.keys(params);
  const result = keys.map(
    key => key + params[key]
  ).join('');
  return result;
}

function prepareQueryString(params) {
  const keys = Object.keys(params);
  const result = keys.map(
    key => key + '=' + encodeURIComponent(params[key])
  ).join('&');
  return result;
}

function doSign(key, data) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(data);
  return hmac.digest('base64');
}

module.exports = LinkSigner;
