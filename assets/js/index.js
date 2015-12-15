var app = angular.module("hadoweb", ['angularSpinner']);


app.controller("hadowebCtrl", function ($scope, $http, usSpinnerService) {

    $scope.analyze = function (search, timeout) {
        console.log("Search ", search);
        usSpinnerService.spin('chart-spinner');
        $http.get('/mapreduce/count/'+search+'/'+timeout).then(function (value) {
            usSpinnerService.stop('chart-spinner');

            console.log("DATA ", value);
            $scope.res = value.data;



            $scope.pieData = $scope.res.map(function (item) {
                var color = '';
                var hlColor = '';
                if(item.word === 'Happy'){
                    color = randomColor({hue: 'green', luminosity:'light'});
                    hlColor = randomColor({hue: 'green', luminosity:'dark'});
                } else if(item.word === 'Sad'){
                    color = randomColor({hue: 'red', luminosity:'light'});
                    hlColor = randomColor({hue: 'red', luminosity:'dark'});
                }
                return {
                        value: item.count,
                        label: item.word,
                        color: color,
                        highlight: hlColor
                };

            }).filter(function (item) {
                return item.value && item.label;
            });


            var ctx = document.getElementById("myChart").getContext("2d");
            var myNewChart = new Chart(ctx).Pie($scope.pieData);
        });
    };
});
