# hSlider

A responsive & touch-friendly Javascript slider, only 2.1 KB gzipped.

**TABLE OF CONTENTS**

- [Demo](#demo)
- [Features](#features)
- [How to Use](#how-to-use)
- [jQuery Extension](#jquery-extension)
- [Requirements](#requirements)
- [Credit](#credit)

## Demo

| Name | Link |
| --- | --- |
| Basic Usage | [View in Codepen](https://codepen.io/hrsetyono/pen/ebbeJJ) |

## Features

- **Responsive** - Items-per-slide can change depending on screen size.
- **Flexible** - Supports any type of content.
- **Lightweight** - Our script is only 2.1 KB gzipped.
- **No dependencies** - Just plain old JS.

## How to Use

Get the CSS and JS files from this repos's `/dist` directory.

```
hSlider( target, [args] )
```

- **target** (Node) - The wrapper element of your slider.
- **args** (obj) - Optional - Possible arguments are:

	- **index** (int) - The starting slide. Default: 0.
	- **arrows** (bool) - Show or hide the arrows. Default: true.
	- **dots** (bool) - Show or hide the pagination. Default: true.
	- **touch** (bool) - Enable or disable the swipe gesture. Default: true.

	- **itemsPerSlide** (int) - Number of items per slide. Default: 1.
	- **responsive** (obj) - Number of items when reaching certain breakpoint. Default: null.

	- **beforeChange** (fn) - Callback before moving to another slide. Parameters: `( instance, newIndex, oldIndex )`
	- **afterChange** (fn) - Callback after moving to another slide. Parameters: `( instance, newIndex, oldIndex )`

**EXAMPLE 1**

Basic usage with responsive feature. This slider is 3 items-per-slide on default. But become 2 items when the screen width is below 767px. And only 1 item when below 480px.

```html
<div class="my-gallery">
  <img src="...">
  <img src="...">
  <img src="...">
  <img src="...">
</div>
```

```js
document.addEventListener('DOMContentLoaded', () => {

  let target = document.querySelector( '.my-gallery' );
  hSlider( target, {
    itemsPerSlide: 3,
    responsive: {
      767: 2,
      480: 1
    }
  });

});
```

**EXAMPLE 2**

If you have multiple sliders with the same class name, simply use `querySelectorAll` and loop them.

```html
<div class="my-gallery"> ... </div>

<div class="my-gallery"> ... </div>

<div class="my-gallery"> ... </div>
```

```js
document.addEventListener('DOMContentLoaded', () => {

  let targets = document.querySelectorAll( '.my-gallery' );
  for( let t of targets ) {
    hSlider( t, {
      itemsPerSlide: 3,
      responsive: { 767: 2, 480: 1 }
    } );
  }

});
```

## jQuery Extension

This is only available when your website uses jQuery.

In example below, even if there are multiple `.my-gallery`, you don't need to create a loop.

```js
$( '.my-gallery' ).hSlider( {
  itemsPerSlide: 3,
  responsive: { 767: 2, 480: 1 }
} );
```


### Requirements

hSlider depends on the following browser APIs:

- [Object.assign](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign)
- [Number.isFinite](http://www.ecma-international.org/ecma-262/6.0/#sec-number.isfinite)

Some of these APIs are capable of being polyfilled in older browsers. Check the linked resources above to determine if you must polyfill to achieve your desired level of browser support.

### Credit

This is a fork of [basicSlider](https://github.com/electerious/basicSlider) with added features like Responsive and Touch-friendliness. So big thanks to [Tobias Reich](https://github.com/electerious) for creating an awesome basis for this library.