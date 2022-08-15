function hello(_, res) {
  return res.send('YAHOOO U ARE AUTHENTICATED');
}

function imAdmin(_, res) {
  return res.send('YAHOOO U ARE AUTHENTICATED AS ADMIN');
}

module.exports = { hello, imAdmin };
