/**
 * hSlider v2.4.0
 * https://github.com/hrsetyono/hSlider
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicSlider=e()}}(function(){return function o(a,d,l){function u(n,e){if(!d[n]){if(!a[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(c)return c(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var i=d[n]={exports:{}};a[n][0].call(i.exports,function(e){return u(a[n][1][e]||e)},i,i.exports,o,a,d,l)}return d[n].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)u(l[e]);return u}({1:[function(e,n,t){"use strict";n.exports=function(n,e,t){var r=e-n+1,i=t-n;return function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return 0<=(i=(i+e)%r)&&(i=0+i),i<0&&(i=r+i),n+i}}},{}],2:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=void 0;var r,i=e("count-between"),v=(r=i)&&r.__esModule?r:{default:r};var h="left",g=function(e){"function"==typeof e.stopPropagation&&e.stopPropagation(),"function"==typeof e.preventDefault&&e.preventDefault()},E=function(e,n){var t=document.createElement("button");return e=e===h?"left":"right",t.classList.add("hSlider-arrow"),t.classList.add("hSlider-arrow--"+e),t.onclick=function(e){n(),g(e)},t},b=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",n=document.createElement("div");return n.classList.add("hSlider-slide"),n.innerHTML=e,n},_=function(e,n,t,r){ var tx=(100/r)*t; n.style.transform="translateX(-"+tx+"%)";
  e.forEach(function(e){return e.classList.remove("active")}),e[t].classList.add("active")},u=function(e,n,i,t){var r,o,a,d,l,u,c,s,f,p=(0,v.default)(0,i.length()-1,t.index),m={};return m.slideElems=n.map(b),m.dotElems=n.map(function(e,n){return t=i.goto.bind(null,n),(r=document.createElement("button")).classList.add("hSlider-dot"),r.onclick=function(e){t(),g(e)},r;var t,r}),m.dotsElem=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],n=document.createElement("div");return n.classList.add("hSlider-dots"),e.forEach(function(e){return n.appendChild(e)}),n}(m.dotElems),m.slidesElem=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],n=document.createElement("div");return n.classList.add("hSlider-slides"),n.style.width=100*e.length+"%",e.forEach(function(e){return n.appendChild(e)}),n}(m.slideElems),m.containerElem=(r=m.slidesElem,(o=document.createElement("div")).classList.add("hSlider-container"),o.appendChild(r),o),m.arrowLeftElem=E(h,i.prev),m.arrowRightElem=E("right",i.next),_(m.dotElems,m.slidesElem,p(),i.length()),a=e,l=t,u=(d=m).arrowLeftElem,c=d.arrowRightElem,s=d.dotsElem,f=d.containerElem,a.classList.add("hSlider"),a.innerHTML="",a.appendChild(f),!0===l.arrows&&(a.appendChild(u),a.appendChild(c)),!0===l.dots&&a.appendChild(s),{c:p,refs:m}};t.create=function(e,n,t){t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return e=Object.assign({},e),!1===Number.isFinite(e.index)&&(e.index=0),!1!==e.arrows&&(e.arrows=!0),!1!==e.dots&&(e.dots=!0),"function"!=typeof e.beforeChange&&(e.beforeChange=function(){}),"function"!=typeof e.afterChange&&(e.afterChange=function(){}),e}(t);var r=null,i=null,o=function(){return n.length},a=function(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:r();if(!1===t.beforeChange(d,e,n))return!1;r=(0,v.default)(0,o()-1,e),_(i.dotElems,i.slidesElem,r(),o()),t.afterChange(d,e,n)},d={element:function(){return e},length:o,current:function(){return r()},goto:a,prev:function(){var e=r(),n=r(-1);a(n,e)},next:function(){var e=r(),n=r(1);a(n,e)}},l=u(e,n,d,t);return r=l.c,i=l.refs,d}},{"count-between":1}]},{},[2])(2)});

/*
  basicSlider with extra features like being Responsive and Touch-friendly.

  @param target (Node) - slider wrapper element, from querySelector()
  @param args (obj) -  slider configuration

  EXAMPLE

    hSlider( document.querySelector('.my-slider'), {
      itemsPerSlide: 3,
      touch: true
    } );
*/
function hSlider( target, args = {} ) {
  if( !target ) {
    console.error( "hSlider Error: Target element not found" );
    return false;
  }
  
  // constructor
  let instance = null;
  let currentIPS = null;
  let rawContent = Array.prototype.map.call( target.children, (slide, i) => slide.outerHTML );
  let ips = calcIPS();

  initSlider( ips );
  
  if( args.responsive ) {
    onResize();
  }

  return instance;

  /////

  function initSlider( ips ) {
    currentIPS = ips;
    let content = groupContent( rawContent, ips );
    instance = createInstance( content );

    // Add "per-slide-x" class to wrapper
    let slides = instance.element().querySelector( '.hSlider-slides' );
    slides.className += ' per-slide-' + currentIPS;

    // Set touch event
    if( args.touch == null || args.touch ) {
      onTouch( instance );
    }
  }

  
  /*
    Calculate items per slide, check for responsiveness too

    @return int - Number of items per slide at current screen's width
  */
  function calcIPS() {
    let breakpoints = args.responsive;
    let defaultIPS = args.itemsPerSlide;

    // if responsive
    if( breakpoints ) {
      let width = window.innerWidth || window.outerWidth;
      let bpKeys = Object.keys( breakpoints );

      // check if current width already below the breakpoint
      for( var i = 0, len = bpKeys.length; i < len; i++ ) {
        if( width < bpKeys[i] ) {
          return breakpoints[ bpKeys[i] ];
        }
      }
    }

    // if not responsive or above any breakpoint
    return defaultIPS || 1;
  }


  /*
    Group the content of slider based on itemsPerSlide

    @param raw (str) - The raw HTML content
    @param ips (int) - Number of items per slide
    @return array - Grouped slides
  */
  function groupContent( raw, ips ) {
    return raw.reduce( ( groups, item, i ) => {

      let group = Math.floor( i / ips );
      let existing = groups[ group ] == null ? '' : groups[ group ];

      groups[ group ] = existing + item;
      return groups;
    }, []);
  }


  /*
    Create slider instance

    @param content (array) - Each array is the content of a slide.
    @return (obj) basicSlider instance.
  */
  function createInstance( content ) {
    let instance = basicSlider.create( target, content, args );

    return instance;
  }


  /*
    Recreate the slider when window is resized
  */
  function onResize() {
    let timer = null;

    window.addEventListener('resize', () => {
      clearTimeout( timer );
      timer = setTimeout( () => {
        // recalculate IPS, if different, recreate slider
        let ips = calcIPS();
        if( currentIPS === ips ) { return false; }
        
        initSlider( ips );
      }, 100 );
    });
  }

  
  /*
    Enable swipe gesture.

    @param instance (obj) - basicSlider object
  */
  function onTouch( instance ) {
    let slides = instance.element().querySelector( '.hSlider-slides' );

    // drag variable
    let posX1 = 0;
    let posX2 = 0;
    let posInitial;
    let posEnd;
    let slidesWidth = slides.offsetWidth;
    let threshold = (slidesWidth / instance.length() ) / 100;
    this.isDrag = true;
    
    slides.onmousedown = dragStart;
    slides.addEventListener( 'touchstart', dragStart );
    slides.addEventListener( 'touchend', dragEnd );
    slides.addEventListener( 'touchmove', dragMove );

    // When touch start, record the coordinate position
    function dragStart( e ) {
      e = e || window.event();

      // Disable drag with mouse
      // if( e.type.indexOf('mouse') !== -1 ) { return false; }

      posInitial = _getPos();
      
      if( e.type == 'touchstart' ) { // if touch
        posX1 = _percent( e.touches[0].clientX );
      }
      else { // if drag with mouse
        e.preventDefault();

        posX1 = _percent( e.clientX );
        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
      }
    }

    // When dragging, calculate the distance and apply it to the slider
    function dragMove( e ) {
      e = e || window.event;

      if( e.type == 'touchmove' ) { // if touch
        posX2 = posX1 - _percent( e.touches[0].clientX );
        posX1 = _percent( e.touches[0].clientX );
      }
      else { // if mouse drag
        posX2 = posX1 - _percent( e.clientX );
        posX1 = _percent( e.clientX );

        this.isDrag = true;
      }

      _setPos( _getPos() - posX2 );
    }

    // When dragging stops, decide whether to move to Prev / Next slide or just stay.
    function dragEnd( e ) {
      posEnd = _getPos();

      let isLastSlide = instance.current() == instance.length() - 1;
      let isFirstSlide = instance.current() == 0;
      
      // if the drag is longer than threshold, move to next/prev
      if( posEnd - posInitial < -threshold && !isLastSlide ) {
        instance.next();
      } else if( posEnd - posInitial > threshold && !isFirstSlide ) {
        instance.prev();
      }
      // if the drag is shorter than threshold, stay in current slide
      else {
        _setPos( posInitial );
      }

      // prevent click if already dragging
      if( e.type == 'mouseup' ) {
        this.isDrag ?
          e.target.addEventListener( 'click', hSlider_preventClick )
          :
          e.target.removeEventListener( 'click', hSlider_preventClick );

        this.isDrag = false;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    //

    // Get current coordinate of the slider
    function _getPos() {
      let transformValue = slides.style.transform;
      return transformValue.replace(/[^-\d.]/g, '');
    }

    // Set slider to a coordinate
    function _setPos( value ) {
      slides.style.transform = `translateX(${ value }%)`;
    }
    


    // Get the touch coordinate in percentage.
    function _percent( num ) {
      return (num / slidesWidth) * 100;
    }
  } // onTouch
}

/**
 * Prevent click event to trigger when dragging 
 */
function hSlider_preventClick(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
}


/**
 * hSlider jQuery extension
 * 
 * EXAMPLE:
 * 
 *     $('.my-slider').hSlider( {
 *       itemsPerSlide: 3,
 *       touch: true
 *     } );
 */
if( window.jQuery ) {
  jQuery.fn.extend( {
    hSlider: function( args = {} ) {
      let $targets = this;

      $targets.each( function() {
        hSlider( $(this).get(0), args );
      } );
    }
  });
}