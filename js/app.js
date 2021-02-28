var app = angular.module('atelier2020',['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('ctrl', function($scope, $window, $document,  $location, $timeout, $sce) {
  $scope.model = {
    entered:false,
    started_intro: false,
    done_intro: false,
    ambient: new Audio("assets/ambient_sound_short.mp3"),
    landing: [{img: "assets/preville_cluster.png", red:"assets/preville_cluster_red.png", cur:"assets/preville_cluster.png", style:{left:'15%', top:'59%', height:'18.5vh'}},
              {img: "assets/oedipe_cluster.png", red:"assets/oedipe_cluster_red.png", cur:"assets/oedipe_cluster.png", style:{right:'15.5%', top:'57%', height: '18.5vh'}},
              {img: "assets/clairon_cluster.png", red:"assets/clairon_cluster_red.png", cur:"assets/clairon_cluster.png", style:{left:'42%', top:'57.5%', height:'21.5vh'}}
            ],

    clusters: [
      {
        steps: 6,
        images: [
          {x:"15%", y:"15vh", steps:["/assets/clusters/préville/1/1.png", "/assets/clusters/préville/1/2.png", "/assets/clusters/préville/1/3.png", "/assets/clusters/préville/1/4.png", "/assets/clusters/préville/1/5.png", "/assets/clusters/préville/1/6.png"]},
          {x:"55%", y:"15vh", steps:["/assets/clusters/préville/2/1.png", "/assets/clusters/préville/2/2.png", "/assets/clusters/préville/2/3.png", "/assets/clusters/préville/2/4.png", "/assets/clusters/préville/2/5.png", "/assets/clusters/préville/2/6.png"]}
        ],
        templates:[{x:"4%", y:"55vh", src:"/assets/clusters/préville/templates/1.html"}, {x:"45%", y:"3vh", src:"/assets/clusters/préville/templates/2.html"}, {x:"2vh", y:"2vh", src:""}, {x:"2vh", y:"2vh", src:""}, {x:"2vh", y:"2vh", src:""}, {x:"2vh", y:"2vh", src:""}],
        paintings: [{x:"15%", y:"20vh", src:"/assets/clusters/préville/1/miniature.jpeg"}, {x:"55%", y:"20vh", src:"/assets/clusters/préville/2/miniature.jpeg"}],
        audio: new Audio('/assets/clusters/préville/replique_preville.mp3'),
        //will probably need to add something for transition
      }
    ],
    active_cluster:null
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
  }, 3))

  $scope.enter = function(){
    $scope.model.entered = true;
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

  $scope.click_cluster = function(index) {
    $scope.model.active_cluster = {
      clicks:0,
      data: $scope.model.clusters[index]
    }
    //this should never be undefined at this stage, but this check is needed to not get errors onload
    if($scope.model.ambient) {
        $scope.model.ambient.pause()
    }
  }

  $scope.puzzle_click = function(target) {
    curr = target
    while(curr) {
      if(typeof(curr.className)=="string" && curr.className.includes('info-')) {
        return
      }
      curr = curr.parentElement
    }
    if($scope.model.active_cluster && ($scope.model.active_cluster.clicks <   $scope.model.active_cluster.data.steps)) {
      $scope.model.active_cluster.clicks += 1;
    }
  }

  $scope.exit_cluster = function() {
    $scope.model.active_cluster = null
    if($scope.model.ambient) {
        $scope.model.ambient.play()
    }
  }

  $scope.elem_coords = function(elem) {
    return {left:elem.x, top:elem.y}
  }

  function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem[0].offsetLeft +(elem[0].clientWidth/2)), 2) + Math.pow(mouseY - (elem[0].offsetTop+(elem[0].clientHeight/2)), 2)));
  }

  $scope.play_cluster_audio= function() {
    $scope.model.active_cluster.data.audio.loop = false
    $scope.model.active_cluster.data.audio.play()
    $scope.model.active_cluster.audio_playing = true
    $scope.model.active_cluster.showOriginals = true

    $scope.model.active_cluster.data.audio.addEventListener("ended", function(){
     $scope.model.active_cluster.data.audio.currentTime = 0;
     $scope.model.active_cluster.audio_playing = false
     $scope.model.active_cluster.exit = true;
     $scope.$apply()
   });
  }


});

app.directive('extraInfo', function($sce) {
  return {
    restrict: 'E',
    scope: {
      image: '@',
      code: '@',
      quote: '@',
      recording: '@',
      position:'@'
    },
    templateUrl:'extra.html',
    transclude: true,
    link: function(scope, element) {
      if(scope.recording) {
        scope.audio = new Audio(scope.recording)
        scope.audio.loop = false
      }
      scope.trust = function(s) {
        return $sce.trustAsHtml(s)
      }
    }
  }
});
