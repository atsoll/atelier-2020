var app = angular.module('atelier2020',['ngAnimate']);

app.controller('ctrl', function($scope, $window, $document,  $location, $timeout) {
  $scope.model = {
    entered: false,
    started_intro: false,
    done_intro: false,

    landing: [{img: "assets/preville_cluster.png", red:"assets/preville_cluster_red.png", cur:"assets/preville_cluster.png", style:{left:'15%', top:'59%', height:'18.5vh'}},
              {img: "assets/oedipe_cluster.png", red:"assets/oedipe_cluster_red.png", cur:"assets/oedipe_cluster.png", style:{left:'42%', top:'57%', height: '21.75vh'}},
              {img: "assets/clairon_cluster.png", red:"assets/clairon_cluster_red.png", cur:"assets/clairon_cluster.png", style:{right:'15.5%', top:'58%', height:'18vh'}}
            ]
  }

  angular.element($window).bind('mousemove', _.throttle(function(e){
    let clusters = document.getElementsByClassName('cluster-img')
    let dists = []
    for(let i=0;i<clusters.length;i++) {
      dists.push(calculateDistance(angular.element(clusters[i]), e.pageX, e.pageY))
    }
    min = Math.min(...dists)
    if($scope.model.ambient) {
      if(min > 350) {
        $scope.model.ambient.volume= 0.08
      }
      else {
        perc = 1-min/350
        $scope.model.ambient.volume= 0.9*perc
      }
    }
  }, 10))

  $scope.enter = function(){
    $scope.model.entered = true;
    $scope.model.ambient = new Audio("assets/ambient_sound.mp3")
    $scope.model.ambient.loop = true
    $scope.model.ambient.volume= 0.08
    $scope.model.ambient.play()
  }



  $scope.play_intro = function(){
    $scope.model.started_intro = true;
    var audio = new Audio("assets/c_biet.mp3")
    audio.loop = false
    audio.onended = function(){
      $scope.model.done_intro = true
      $scope.$apply()
    }
    audio.play()
    $timeout(function(){
      var content = 'Nous sommes là comme des passeurs ; nous ne sommes pas là pour donner des modèles.';

      var ele = '<span>' + content.split('').join('</span><span>') + '</span>';

      let cont = document.getElementById('quote-container')
      $(ele).hide().appendTo(cont).each(function (i) {
          $(this).delay(88 * i).css({
              display: 'inline',
              opacity: 0
          }).animate({
              opacity: 1
          }, 88);
      });
    }, 45000)

  }

  function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem[0].offsetLeft +(elem[0].clientWidth/2)), 2) + Math.pow(mouseY - (elem[0].offsetTop+(elem[0].clientHeight/2)), 2)));
  }



  /*$(document).mousemove(function(e) {


        //distance = calculateDistance($element, mX, mY);
        //$distance.text(distance);
  });*/


});
