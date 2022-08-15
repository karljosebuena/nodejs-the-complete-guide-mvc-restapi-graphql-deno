
const fs = require('fs');
const FILE_NAME = 'users.text';
const HOST = 'http://localhost:3000';

const routes = (req, res) => {
  const { url, method } = req;
  const body = [];

  if (url === '/users' && method === 'GET') {
    fs.readFile(FILE_NAME, 'utf8', function (err, data) {
      if (err && err.errno === -2) {
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(`<h2>${FILE_NAME} does not exist</h2>`);
        res.write(`<a href="${HOST}">Back to Homepage</a>`);
        return res.end();
      } else if (err && err.errno !== -2) {
        throw err;
      }

      const users = data.toString()
        .replace(/\+/g, ' ')
        .replace(/\r\n/g, '\n').split('\n');

      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(`
        <html>
        <head><title>Assignment 1</title></head>
        <body>
      `);
      res.write('<h2>List of User</h2>');
      res.write('<ul>');
      for (let user of users) {
        if (user) res.write(`<li>${user}</li>`);
      }
      res.write('</ul>');
      res.write(`<a href="${HOST}">Back to Homepage</a>`);
      res.write(`
        </body>
        </html>
      `);
      return res.end();
    });
  } else if (url === '/create-user' && method === 'POST') {
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const [, user] = parsedBody.split('=');

      fs.appendFile(FILE_NAME, `${user}\r\n`, (err) => {
        if (err) throw err;
        console.log(`${user} added to ${FILE_NAME}`);

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  } else {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(`
      <html>
        <head><title>Assignment 1</title></head>
        <body>
        <h1>Hello there!</h1>
        <p>Let's create new user :)</p>
        <form action="/create-user" method="POST">
          <input type="text" name="user" />
          <button type="submit">Create</button>
        </form>
        <p>or, <a href="${HOST}/users">View users list</a></p>
        </body>
      </html>
    `);
    return res.end();
  }
}

module.exports = routes;