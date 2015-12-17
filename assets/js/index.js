var app = angular.module("hadoweb", ['angularSpinner']);


app.controller("hadowebCtrl", function($scope, $http, usSpinnerService) {

  $scope.mode = 'happy';

var myNewChart = null;
  $scope.analyze = function(search, timeout, mode) {

    $scope.loading = true;


    console.log("Search ", search);
    usSpinnerService.spin('chart-spinner');
    $http.get('/mapreduce/count/' + search + '/' + timeout + '/' + mode).then(function(value) {

        if(myNewChart){
            myNewChart.destroy();
        }

      usSpinnerService.stop('chart-spinner');

      console.log("DATA ", value);
      $scope.res = value.data;

      if (mode === 'happy') {
        $scope.pieData = $scope.res.map(function(item) {
          var color = '';
          var hlColor = '';
          if (item.word === 'Happy') {
            color = randomColor({
              hue: 'green',
              luminosity: 'light'
            });
            hlColor = randomColor({
              hue: 'green',
              luminosity: 'dark'
            });
          } else if (item.word === 'Sad') {
            color = randomColor({
              hue: 'red',
              luminosity: 'light'
            });
            hlColor = randomColor({
              hue: 'red',
              luminosity: 'dark'
            });
          }
          return {
            value: parseInt(item.count),
            label: item.word,
            color: color,
            highlight: hlColor
          };

        }).filter(function(item) {
          return item.value && item.label;
        });


        var ctx = document.getElementById("myChart").getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        myNewChart = new Chart(ctx).Pie($scope.pieData);

    } else if (mode === 'words'){
        $scope.pieData = $scope.res.map(function (item) {

            if(item.count < 5){
                return;
            }

            return {
                    value: parseInt(item.count),
                    label: item.word,
                    color: randomColor(),
                    highlight: randomColor()
            };

        }).filter(function (item) {
            return item && item.value && item.label;
        });


        var ctx = document.getElementById("myChart").getContext("2d");
        ctx.clearRect(0, 0, 400, 400);
        myNewChart = new Chart(ctx).Doughnut($scope.pieData);

    }

      $scope.loading = false;
    });
  };
});
