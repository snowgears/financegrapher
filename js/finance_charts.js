var dates = ["september_2018","october_2018","november_2018"];

dates.forEach(function(date, j) {
  d3.csv("../csv/"+date+".csv", function(data) {
    var alldata = {};

    var bars = 0;
    var transportation = 0;
    var groceries = 0;
    var utilities = 0;
    var medical = 0;
    var shopping = 0;
    var education = 0;
    var recreation = 0;
    var restaurants = 0;

    //console.log(data);

    data.forEach(function(d, i) {
      console.log(d);
      if(d.Type === "B"){
          bars += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "R"){
          restaurants += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "T"){
          transportation += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "G"){
          groceries += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "U"){
          utilities += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "M"){
          medical += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "O"){
          shopping += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "L"){
          education += Math.abs(parseInt(d.Amount));
      }
      else if(d.Type === "A"){
          recreation += Math.abs(parseInt(d.Amount));
      }

    });

    alldata["Bars"] = bars;
    alldata["Restaurants"] = restaurants;
    alldata["Transportation"] = transportation;
    alldata["Groceries"] = groceries;
    alldata["Rent/Utilities"] = utilities;
    alldata["Medical"] = medical;
    alldata["Shopping"] = shopping;
    alldata["Education"] = education;
    alldata["Recreation/Activities"] = recreation;

    var totalcost = bars + restaurants + transportation + groceries + utilities + medical + shopping + education + recreation;

    var saving = 500 - totalcost; //monthly income after taxes and health insurance in place of 500

    console.log(alldata);

    var chart = c3.generate({
      bindto: '#finance_'+date,
      title: {
          show: true,
          text: "Total spent: "+totalcost+", Total left for savings/student loans: "+saving,
          position: 'top-center'
      },
      data: {
          json: alldata,
          colors: {
              'channel1': '#9e69a9',
              'channel2': '#7bc36e',
              'channel3': '#f9a762',
          },
          type: 'pie'
      },
      pie: {
          label: {
              format: function(value, ratio, id) {
                  return value;
              }
          },
          title: ''+totalcost
      }

  });
  });
});
