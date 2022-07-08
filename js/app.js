var app = angular.module('atelier2020',['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('ctrl', function($scope, $window, $document,  $location, $timeout, $sce, $uibModal) {
  var truth_colours = {green:'rgba(23, 150, 17, 0.4)', yellow:'rgba(235, 192, 54, 0.4)', red:'rgba(236, 12, 41, 0.4)'}
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
        paintings: [ {x:"15%", y:"17vh", height: '60vh', src:"assets/clusters/preville/rissolle/miniature.jpeg"},  {x:"55%", y:"17vh", height: '60vh', src:"assets/clusters/preville/boniface/miniature.jpeg"}],
        video: { src:"assets/clusters/preville/preville_vid.mp4", show:false, id:'vid-p'},
        transition: {src:'assets/transition_to_oedipe.png', red:'assets/transition_to_oedipe_red.png', text:"« L'âme est la première partie du comédien ; l'intelligence, la seconde ; la vérité et la chaleur du débit, la troisième ; la grâce et le dessin du corps, la quatrième. »", class:'oedipe-transition', next_index:2 }
      },
      {
        steps:6,
        images:[
          {x: "18%", y:"15vh", steps:["assets/clusters/clairon_dumesnil/phedre/1.png", "assets/clusters/clairon_dumesnil/phedre/2.png", "assets/clusters/clairon_dumesnil/phedre/3.png", "assets/clusters/clairon_dumesnil/phedre/4.png", "assets/clusters/clairon_dumesnil/phedre/5.png", "assets/clusters/clairon_dumesnil/phedre/6.png"]},
          {x:"55%", y:"15vh", steps:["assets/clusters/clairon_dumesnil/electre/1.png", "assets/clusters/clairon_dumesnil/electre/2.png", "assets/clusters/clairon_dumesnil/electre/3.png", "assets/clusters/clairon_dumesnil/electre/4.png", "assets/clusters/clairon_dumesnil/electre/5.png", "assets/clusters/clairon_dumesnil/electre/6.png"]}
        ],
        templates:[{step:1, x:"1%", y:"1vh", width: '50vw',src:"assets/clusters/clairon_dumesnil/templates/1.html"}, {step:2, x:"69%", y:"20vh", width: '30vw', src:"assets/clusters/clairon_dumesnil/templates/2.html"}, {step:3, x:"10%", y:"3vh", width:'45vw', src:"assets/clusters/clairon_dumesnil/templates/3a.html"}, {step:3, x:"40%", y:"57vh", width:'45vw', src:"assets/clusters/clairon_dumesnil/templates/3b.html"}, {step:4, x:"5%", y:"57vh", width:'45vw', src:"assets/clusters/clairon_dumesnil/templates/4a.html"}, {step:4, x:"37%", y:"1vh", width:'47vw', src:"assets/clusters/clairon_dumesnil/templates/4b.html"}, {step:5, x:"10%", y:"2vh", width:'75vw', src:"assets/clusters/clairon_dumesnil/templates/5a.html"}, {step:5, x:"10%", y:"65vh", width:'75vw', src:"assets/clusters/clairon_dumesnil/templates/5b.html"}, {step:6, x:"7%", y:"55vh", width:'50vw', src:"assets/clusters/clairon_dumesnil/templates/6a.html"}, {step:6, x:"40%", y:"3vh", width:'45vw', src:"assets/clusters/clairon_dumesnil/templates/6b.html"}],
        paintings:[{x:"16%", y:"18vh", height:"60vh", src:"assets/clusters/clairon_dumesnil/phedre/miniature.jpg"}, {x:"55%", y:"18vh", height:"60vh", src:"assets/clusters/clairon_dumesnil/electre/miniature.jpg"}],
        video: { src:"assets/clusters/clairon_dumesnil/clairon_dumesnil_vid.mp4", show:false, id:'vid-cl'},
        transition: {src:'assets/transition_to_préville.png', red:'assets/transition_to_préville_red.png', text:'« Le don de plier son âme à des impressions contraires est encore plus nécessaire dans la comédie que dans la tragédie. »', class:'preville-transition', next_index:0 }
      },
      {
        steps: 7,
        images:[
          {x:"calc(30% + 40vh)", y:'15vh', steps:["assets/clusters/lekain_dumesnil/oedipe/1.png", "assets/clusters/lekain_dumesnil/oedipe/2.png", "assets/clusters/lekain_dumesnil/oedipe/3.png", "assets/clusters/lekain_dumesnil/oedipe/4.png", "assets/clusters/lekain_dumesnil/oedipe/5.png", "assets/clusters/lekain_dumesnil/oedipe/6.png", "assets/clusters/lekain_dumesnil/oedipe/7.png"]},
          {x:'30%', y:'17vh', steps:["assets/clusters/lekain_dumesnil/jocaste/1.png", "assets/clusters/lekain_dumesnil/jocaste/2.png", "assets/clusters/lekain_dumesnil/jocaste/3.png", "assets/clusters/lekain_dumesnil/jocaste/4.png", "assets/clusters/lekain_dumesnil/jocaste/5.png", "assets/clusters/lekain_dumesnil/jocaste/6.png", "assets/clusters/lekain_dumesnil/jocaste/7.png"]}
        ],
        templates:[{step:1, x:"3%", y:"50vh", width: '60vw',src:"assets/clusters/lekain_dumesnil/templates/1a.html"}, {step:1, x:"40%", y:"2vh", width: '55vw',src:"assets/clusters/lekain_dumesnil/templates/1b.html"}, {step:2, x:"5vw", y:"1vh", width: '75vw',src:"assets/clusters/lekain_dumesnil/templates/2a.html"}, {step:2, x:"35%", y:"50vh", width: '60vw',src:"assets/clusters/lekain_dumesnil/templates/2b.html"}, {step:3, x:"2%", y:"1vh", width: '55vw',src:"assets/clusters/lekain_dumesnil/templates/3a.html"}, {step:3, x:"10%", y:"48vh", width: '85vw',src:"assets/clusters/lekain_dumesnil/templates/3b.html"}, {step:4, x:"6%", y:"57vh", width: '50vw',src:"assets/clusters/lekain_dumesnil/templates/4a.html"}, {step:4, x:"48%", y:"2vh", width: '40vw',src:"assets/clusters/lekain_dumesnil/templates/4b.html"}, {step:5, x:"12vw", y:"2vh", width: '76vw',src:"assets/clusters/lekain_dumesnil/templates/5a.html"}, {step:5, x:"12vw", y:"58vh", width: '76vw',src:"assets/clusters/lekain_dumesnil/templates/5b.html"}, {step:6, x:"5%", y:"4vh", width: '50vw',src:"assets/clusters/lekain_dumesnil/templates/6a.html"}, {step:6, x:"47%", y:"70vh", width: '45vw',src:"assets/clusters/lekain_dumesnil/templates/6b.html"}, {step:7, x:"3%", y:"2vh", width: '46vw',src:"assets/clusters/lekain_dumesnil/templates/7a.html"}, {step:7, x:"55%", y:"46vh", width: '42vw',src:"assets/clusters/lekain_dumesnil/templates/7b.html"}],
        paintings:[{x:'28%', y:'4vh', height:'83vh', src:"assets/clusters/lekain_dumesnil/miniature.jpg"}],
        video: { src:"assets/clusters/lekain_dumesnil/lekain_dumesnil_vid.mp4", show:false, id:"vid-ld"},
        transition: {src:'assets/transition_to_phèdre.png', red:'assets/transition_to_phèdre_red.png', text:"« Ces grandes affections de l'âme sont les mêmes d'un pôle à l'autre, parce qu'elles entrent dans l'organisation de l'homme, ouvrage du Créateur. »", class:'phedre-transition', next_index:1 }
      }
    ],
    active_cluster: null,
    truthiness: {}
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
        $scope.model.ambient.volume= 0.1
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
    $scope.model.ambient.volume= 0.1
    $scope.model.ambient.play()
    $scope.model.intro_audio.pause()
  }



  $scope.play_intro = function(){
    $scope.model.started_intro = true;
    $scope.model.intro_audio = new Audio("assets/c_biet.mp3")
    $scope.model.intro_audio.loop = false
    $scope.model.intro_audio.onended = function(){
      $scope.model.done_intro = true
      $scope.$apply()
    }
    $scope.model.intro_audio.play()
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
    if($scope.model.clusters[index].videos) {
      for(let i=0;i<$scope.model.clusters[index].videos.length;i++) {
        $scope.model.clusters[index].videos[i].show = false
      }
    }

    $scope.model.active_cluster = {
      clicks:cl,
      data: $scope.model.clusters[index],
      exit: false
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

  $scope.elem_coords = function(elem, ind) {
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


  //hack, b/c video durations are being weird
  $scope.activate_cluster= async function() {
    $scope.model.active_cluster.playing = true
    $scope.model.active_cluster.data.video.show = true
    vid = document.getElementById($scope.model.active_cluster.data.video.id)
    vid.play()
    await new Promise(r => setTimeout(r, vid.duration*1000-200));
    $scope.model.active_cluster.data.video.show=false
    $scope.model.active_cluster.showOriginals = true;
    $('#cluster-blip').addClass('invisible')
    $scope.model.active_cluster.exit = true;
    $timeout(function(){

      var ele = '<span>' + $scope.model.active_cluster.data.transition.text.split('').join('</span><span>') + '</span>';

      let cont = document.getElementById('transition-quotation')
      console.log(cont)
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
    }, 3000)
  }



  $scope.update_truthiness = function(elem_id, val) {

    if(!$scope.model.truthiness[elem_id]) {
      $scope.model.truthiness[elem_id] = {}
    }
      $scope.model.truthiness[elem_id][val] = $scope.model.truthiness[elem_id][val]? false : true //should accound for nulls
      new_col = $scope.model.truthiness[elem_id][val] ? truth_colours[val] : 'rgba(0,0,0,0)'
      full = new_col.replace("0.4", "1")
      console.log(  $(`#${elem_id}`))
      $(`#${elem_id} .truth-${val}`).css('background-color', new_col)
      $(`#${elem_id} .tb-${val}`).css("box-shadow", `0px 0px 10px 2px ${full}`)
      $(`#${elem_id} .tb-${val}`).css("-webkit-box-shadow", `0px 0px 10px 2px ${full}`)
      $(`#${elem_id} .tb-${val}`).css("-moz-box-shadow", `0px 0px 10px 2px ${full}`)
  }

  $scope.openModal = function(url) {
    $scope.model.modalInstance = $uibModal.open({
       templateUrl: url,
       scope: $scope,
       size: 'lg'
     });
  }

  $scope.closeModal = function() {
    $scope.model.modalInstance.close();
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
