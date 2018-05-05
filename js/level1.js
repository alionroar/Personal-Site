var mousePosition;
var offset = [0,0];
var isDown = false;
var windowe = document.querySelector('#window');
var d = new Date();
document.getElementById("date-window").innerHTML = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

windowe.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
      //calculate new cursor position
        windowe.offsetLeft - e.clientX,
        windowe.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
          //get cursor position
            x : event.clientX,
            y : event.clientY
        };
        //set element's new position in stylesheet
        windowe.style.left = (mousePosition.x + offset[0]) + 'px';
        windowe.style.top  = (mousePosition.y + offset[1]) + 'px';

        if (windowe.offsetLeft < 0) {
          windowe.style.left = 0 + 'px';
        } else if (windowe.offsetLeft + windowe.offsetWidth > document.body.clientWidth) {
            windowe.style.left = (document.body.clientWidth - windowe.offsetWidth) + 'px';
          }
          if (windowe.offsetTop < 0) {
            windowe.style.top = 0 + 'px';
          } else if (windowe.offsetTop+ windowe.offsetHeight > document.body.clientHeight) {
              windowe.style.top = (document.body.clientHeight - windowe.offsetHeight) + 'px';
            }
    }

}, true);

var FETCH_TIMEOUT = 5000;
var didTimeOut = false;

function loadPage(name) {
    new Promise(function(resolve, reject) {
        var timeout = setTimeout(function () {
            didTimeOut = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        fetch(name)
            .then(function (response) {
                //clear timeout as cleanup?
                clearTimeout(timeout);
                if (!didTimeOut) {
                    console.log('fetch worked!', response);
                }
                resolve(response.text());
            })
            .catch(function(err) {
            console.log('fetch failed!', err);
            //Rejection already happened with setTimout
                if(didTimeOut) return;
                //Reject with error
                reject(err);
        });
    })
            .then(function (text) {
                console.log('good promise, no timeout!');
                document.getElementById("filesList").innerHTML = text;
                console.log('did a thing! good promise, no timeout!');
            })
            .catch(function (response) {
                    console.log("did not fetch " + name, response);
            });
}

document.querySelector('#projects').addEventListener("click", function(){

    loadPage('/projects.textiroo');

  // var projectLinks = document.createElement("a");
  // var projectLinksNode = document.createTextNode("Hi");
  // projectLinks.appendChild(projectLinksNode);
  // projectLinks.style.height = 10 + 'rem';
  // var fileDiv = document.getElementById("filesList");// fileDiv.appendChild(projectLinks);
  // document.getElementById("filesList").innerHTML='<object type="text/html" data="projects.html" id="innerDoc"></object>';
  // var innerDoc = document.querySelector('#innerDoc').contentDocument;
  //   innerDoc.querySelector('#project-one').addEventListener("click", function(){
  //       document.getElementById("filesList").innerHTML = "";
  //       document.getElementById("filesList").innerHTML='<object type="text/html" data="project-one.html" ></object>';
  //   });

  window.history.pushState({id:'projects'} , 'projects','projects.html');

    var projectsLink = document.getElementById("projects");
    projectsLink.style.textDecoration = "underline";

    var aboutLink = document.getElementById("about");
    aboutLink.style.textDecoration = "none";

    var experienceLink = document.getElementById("experience");
    experienceLink.style.textDecoration = "none";
});

document.querySelector('#about').addEventListener("click", function(){

    loadPage('/about.textiroo');

    window.history.pushState({id:'about'} , 'about','whoami.html');

    var aboutLink = document.getElementById("about");
    aboutLink.style.textDecoration = "underline";

    var experienceLink = document.getElementById("experience");
    experienceLink.style.textDecoration = "none";

    var projectsLink = document.getElementById("projects");
    projectsLink.style.textDecoration = "none";
});

document.querySelector('#experience').addEventListener("click", function(){

    loadPage('/experience.textiroo');


  window.history.pushState({id:'experience'} , 'experience','experience.html');

    var experienceLink = document.getElementById("experience");
    experienceLink.style.textDecoration = "underline";

    var aboutLink = document.getElementById("about");
    aboutLink.style.textDecoration = "none";

    var projectsLink = document.getElementById("projects");
    projectsLink.style.textDecoration = "none";


});

document.querySelector('#btn-minimize').addEventListener("click", function(){
    var element = document.querySelector('#window');
    element.classList.add("minimise");
    console.log("click minimise");
});

document.querySelector('#btn-exit').addEventListener("click", function(){
    windowe.remove();
    console.log("click exit");
});
