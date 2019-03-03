//load json
$.ajax({
    method: 'GET',
    url: `./public/people/person1.json`,
    timeout: 8000
})
.done((data, statusText, xhr) => {
    let json = JSON.parse(xhr.responseText);
    console.log(json);
    loadEverything(json);
})
.fail(xhr => {
    console.error(xhr.responseJSON.error);
});

function GPAfromGrades(grades) {
    let gpaValues = [];
    for (i in grades) {
        if (grades[i] >= 90) {
            gpaValues.push(4.0);
        } else if (grades[i] >= 80) {
            gpaValues.push(3.0);
        } else if (grades[i] >= 70) {
            gpaValues.push(2.0);
        } else if (grades[i] >= 60) {
            gpaValues.push(1.0);
        } else {
            gpaValues.push(0.0);
        }
    }
    let sum = 0;
    for (i in gpaValues) sum += gpaValues[i];
    return (sum / grades.length).toFixed(3);
}



function loadEverything(json) {
    var gradeYears = [];

    for (i in json.years) {
        gradeYears.push( [] );
    }

    var tempYear = [];

    for (year of json.years) {
        tempYear.push(year.year + "");
        for (classs of year.classes) {
            console.log(`${classs.className} was taught by ${classs.teacher} in ${year.year}`);

            yearr = year.year;
            year1 = json.years[0].year;
            yearDiff = yearr - year1;
            grade = classs.grade;

            gradeYears[yearDiff].push(grade);
        }
    }

    gpaYears = [];

    for (i of gradeYears) {
        gpaYears.push(GPAfromGrades(i));
    }

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tempYear,
            datasets: [{
                label: 'GPA',
                lineTension: 0,
                data: gpaYears,
                backgroundColor: [
                    'rgba(255, 178, 194, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 100, 132, 1)'
                ],
                borderWidth: 4,
                pointRadius: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};