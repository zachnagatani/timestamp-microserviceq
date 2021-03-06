// Grab the necessary modules and grab express app
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:DATE', (req, res) => {
    const query = decodeURI(req.params.DATE);
    /**
     * @param {Object} date - a valid javascript Date object
     * @returns {Object} A javascript object containing the date converted into a unix timestamp and in natural language form (ex February 8, 2017)
     */
    function formatDate(date) {
        const data = {
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

        return data;
    }

    // Unix timestamp handling
    if (isNaN(new Date(parseInt(query)).getTime()) === false) {
        const date = new Date(parseInt(query));
        res.json(formatDate(date));
    // Natural Date handling
    } else if (isNaN(new Date(query).getTime()) === false) {
        const date = new Date(query);
        res.json(formatDate(date));
    } else {
        res.status(400);
        res.end('Invalid date. Please enter a UNIX timestamp (ex 1450137600), or a natural language date (ex January 17, 1970).');
    }
});

app.listen(port);