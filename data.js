const request = require('request');
const chalk = require('chalk');

//JUST FOR TESTING ~ TRANSFER TO CLIENT

function zipCodeToState(zip, callback) {
    request(`http://ziptasticapi.com/${zip}`, (err, res, body) => {
        if (err || res.statusCode!==200) {
            return console.error(chalk.red('Error sending zip code request'));
        }
        console.log(chalk.blue(`Found that the zip code ${zip} is in ${JSON.parse(body).state}`));
        callback(JSON.parse(body).state.toLowerCase());
    });
}

function getColleges(state, colleges, page, callback) {
    request(`https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=R71bocEFTjdewgncfZEvkiK9ICIJ8AqOyjuDBdST&school.state=${state.toLowerCase()}&_per_page=100&_fields=school.name,school.city,school.school_url,2016.admissions.act_scores.midpoint.cumulative&_page=${page}`,
    (err, res, body) => {
        if (err || res.statusCode !== 200) {
            return console.error(chalk.red('Error fetching college information'));
        }
        const json = JSON.parse(body);
        console.log(`Fetched page ${page} of colleges in ${state.toUpperCase()}`);
        if (!json.results[0]) {
            let returnColleges = [];
            for (i in colleges) {
                let college = colleges[i];
                if (college['2016.admissions.act_scores.midpoint.cumulative'] !== null) {
                    returnColleges.push(college);
                }
            }
            callback(returnColleges);
        } else {
            getColleges(state, colleges.concat(json.results), page + 1, callback);
        }
    });
}