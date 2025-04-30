var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


document.querySelectorAll('.portfolio-filters button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.portfolio-filters button.active').classList.remove('active');
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-item').forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  (function(){

    // Create an array of styles.
    var mapStyles = [
      { //hide all fills
        elementType: 'geometry.fill',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [
          { visibility: 'on' },
        ]
      }
    ];
  
    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
      zoom: 1,
      center: new google.maps.LatLng(55.6468, 37.581),
      styles: mapStyles,
      // The following line is essential for making the map background transparent:
      backgroundColor: 'hsla(0, 0%, 0%, 0)',
    };
    
    //create map object
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  })();
  
  // function filterSelection(category) {
  //   let items = document.getElementsByClassName("portfolio-item");
  //   for (let i = 0; i < items.length; i++) {
  //     if (category === "all" || items[i].classList.contains(category)) {
  //       items[i].style.display = "block";
  //     } else {
  //       items[i].style.display = "none";
  //     }
  //   }
  // }
  


  