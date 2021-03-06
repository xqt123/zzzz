/**
 * Created by admin on 2017/6/8.
 */
import queryString from 'query-string';
import _ from 'lodash';
import config from './config';
let request = {};
request.get = function (url, params) {
  if (params) {
    url += '?' + queryString.stringify(params);
  }
  return fetch(url)
    .then((response) => response.json())
    
}
request.post = function (url, body) {
  let options = _.extend(config.header, {
    body: JSON.stringify(body)
  })
  return fetch(url, options)
    .then((response) => response.json())
}
module.exports = request;