const express = require('express'),
      http = require('http'),
      app = express(),
      port = process.env.PORT || 8000;

app.use((req, res) => {
    const query = req.url.substr(1);
    if (isNaN(new Date(parseInt(query)).getTime()) === false) {
        const date = new Date(parseInt(query)),
              data = {
                  "unix": date.getTime(),
                  "natural": (function(date) {
                      let month;
                      switch(date.getMonth()) {
                          case 0:
                            month = 'January';
                            break;
                          case 1:
                            month = 'February';
                            break;
                          case 2:
                            month = 'March';
                            break;
                          case 3:
                            month = 'April';
                            break;
                          case 4:
                            month = 'May';
                            break;
                          case 5:
                            month = 'June';
                            break;
                          case 6:
                            month = 'July';
                            break;
                          case 7:
                            month = 'August';
                            break;
                          case 8:
                            month = 'September';
                            break;
                          case 9:
                            month = 'October';
                            break;
                          case 10:
                            month = 'November';
                            break;
                          case 11:
                            month = 'December';
                            break;
                      }

                      return month + ' ' + date.getDate() + ', ' + date.getFullYear();
                  })(date)
              };

        // res.writeHead(200, 'Content-Type: text/json');
        res.json(data);
    } else {
        res.end('invalid date');
    }
});

app.listen(port);