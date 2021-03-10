var app = angular.module('atelier2020',['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('ctrl', function($scope, $window, $document,  $location, $timeout, $sce) {
  $scope.model = {
    entered:false,
    started_intro: false,
    done_intro: false,
    ambient: new Audio("assets/ambient_sound_short.mp3"),
    landing: [{img: "assets/preville_cluster.png", red:"assets/preville_cluster_red.png", cur:"assets/preville_cluster.png", style:{left:'15%', top:'59%', height:'18.5vh'}},
              {img: "assets/clairon_cluster.png", red:"assets/clairon_cluster_red.png", cur:"assets/clairon_cluster.png", style:{left:'42%', top:'57.5%', height:'21.5vh'}},
              {img: "assets/oedipe_cluster.png", red:"assets/oedipe_cluster_red.png", cur:"assets/oedipe_cluster.png", style:{right:'15.5%', top:'57%', height: '18.5vh'}},
            ],

    clusters: [
      {
        steps: 6,
        images: [
          {x:"15%", y:"15vh", steps:["assets/clusters/preville/rissolle/1.png", "assets/clusters/preville/rissolle/2.png", "assets/clusters/preville/rissolle/3.png", "assets/clusters/preville/rissolle/4.png", "assets/clusters/preville/rissolle/5.png", "assets/clusters/preville/rissolle/6.png"]},
          {x:"55%", y:"15vh", steps:["assets/clusters/preville/boniface/1.png", "assets/clusters/preville/boniface/2.png", "assets/clusters/preville/boniface/3.png", "assets/clusters/preville/boniface/4.png", "assets/clusters/preville/boniface/5.png", "assets/clusters/preville/boniface/6.png"]}
        ],
        templates:[{step:1, x:"4%", y:"55vh", width: '45vw',src:"assets/clusters/preville/templates/1a.html"}, {step:1, x:"40%", y:"2vh", width: '55vw', src:"assets/clusters/preville/templates/1b.html"}, {step:2, x:"45%", y:"3vh", width:'45vw', src:"assets/clusters/preville/templates/2.html"}, {step:3, x:"5%", y:"60vh", width:'50vw', src:"assets/clusters/preville/templates/3a.html"},{step:3, x:"40%", y:"2vh", width:'50vw', src:"assets/clusters/preville/templates/3b.html"}, {x:"12.5%", y:"65vh", src:"assets/clusters/preville/templates/4.html" ,step:4, width:'75vw'}, {x:"30vw", y:"3vh", width:"65vw", src:"assets/clusters/preville/templates/5.html", step:5}, {x:"3vw", y:"4vh",width:"55vw", src:"assets/clusters/preville/templates/6.html", step:6}],
        paintings: [{x:"15%", y:"17vh", height: '60vh', src:"assets/clusters/preville/rissolle/miniature.jpeg"}, {x:"55%", y:"17vh", height: '60vh', src:"assets/clusters/preville/boniface/miniature.jpeg"}],
        audio: new Audio('assets/clusters/preville/replique.mp3'),
        transition: {src:'assets/transition_to_oedipe.png', red:'assets/transition_to_oedipe_red.png', text:"« L'âme est la première partie du comédien ; l'intelligence, la seconde ; la vérité et la chaleur du débit, la troisième ; la grâce et le dessin du corps, la quatrième. »", class:'oedipe-transition', next_index:2 }
      },
      {
        steps:5,
        images:[
          {x: "18%", y:"15vh", steps:["assets/clusters/clairon_dumesnil/phedre/1.png", "assets/clusters/clairon_dumesnil/phedre/2.png", "assets/clusters/clairon_dumesnil/phedre/3.png", "assets/clusters/clairon_dumesnil/phedre/4.png", "assets/clusters/clairon_dumesnil/phedre/5.png"]},
          {x:"55%", y:"18vh", steps:["assets/clusters/clairon_dumesnil/electre/1.png", "assets/clusters/clairon_dumesnil/electre/2.png", "assets/clusters/clairon_dumesnil/electre/3.png", "assets/clusters/clairon_dumesnil/electre/4.png", "assets/clusters/clairon_dumesnil/electre/5.png"]}
        ],
        templates:[],
        paintings:[{x:"16%", y:"18vh", height:"60vh", src:"assets/clusters/clairon_dumesnil/phedre/miniature.jpg"}, {x:"55%", y:"18vh", height:"60vh", src:"assets/clusters/clairon_dumesnil/electre/miniature.jpg"}],
        audio:new Audio("assets/clusters/clairon_dumesnil/replique.mp3"),
        transition: {src:'assets/transition_to_préville.png', red:'assets/transition_to_préville_red.png', text:'« Le don de plier son âme à des impressions contraires est encore plus nécessaire dans la comédie que dans la tragédie. »', class:'preville-transition', next_index:0 }
      },
      {
        steps: 7,
        images:[
          {x:"calc(30% + 40vh)", y:'12vh', steps:["assets/clusters/lekain_dumesnil/oedipe/1.png", "assets/clusters/lekain_dumesnil/oedipe/2.png", "assets/clusters/lekain_dumesnil/oedipe/3.png", "assets/clusters/lekain_dumesnil/oedipe/4.png", "assets/clusters/lekain_dumesnil/oedipe/5.png", "assets/clusters/lekain_dumesnil/oedipe/6.png", "assets/clusters/lekain_dumesnil/oedipe/7.png"]},
          {x:'30%', y:'17vh', steps:["assets/clusters/lekain_dumesnil/jocaste/1.png", "assets/clusters/lekain_dumesnil/jocaste/2.png", "assets/clusters/lekain_dumesnil/jocaste/3.png", "assets/clusters/lekain_dumesnil/jocaste/4.png", "assets/clusters/lekain_dumesnil/jocaste/5.png", "assets/clusters/lekain_dumesnil/jocaste/6.png", "assets/clusters/lekain_dumesnil/jocaste/7.png"]}
        ],
        templates:[],
        paintings:[{x:'28%', y:'4vh', height:'83vh', src:"assets/clusters/lekain_dumesnil/miniature.jpg"}],
        audio:new Audio('assets/clusters/lekain_dumesnil/replique.mp3'),
        transition: {src:'assets/transition_to_phèdre.png', red:'assets/transition_to_phèdre_red.png', text:"« Ces grandes affections de l'âme sont les mêmes d'un pôle à l'autre, parce qu'elles entrent dans l'organisation de l'homme, ouvrage du Créateur. »", class:'phedre-transition', next_index:1 }
      }
    ],
    active_cluster: null
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

  $scope.click_cluster = function(index, cl) {
    $scope.model.active_cluster = {
      clicks:cl,
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
    xy =  {left:elem.x, top:elem.y}
    if(elem.height) {
      xy.height = elem.height
    }
    if(elem.width) {
      xy.width = elem.width
    }
    return xy
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


     $timeout(function(){

       var ele = '<span>' + $scope.model.active_cluster.data.transition.text.split('').join('</span><span>') + '</span>';

       let cont = document.getElementById('transition-quote')
       while (cont.firstChild) {
          cont.firstChild.remove()
        }
       $(ele).hide().appendTo(cont).each(function (i) {
           $(this).delay(30 * i).css({
               display: 'inline',
               opacity: 0
           }).animate({
               opacity: 1
           }, 30);
       });
     }, 700)
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
