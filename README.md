# knack
JavaScript Image Gallery
[DEMO](http://evrybiont.github.io/knack/)

#Installation

Add images + css file from `knack/assets/stylesheets` + knack.js library to your project;
Add don't forget set height and width for image galley see example below:
```javascript
  #projector{
    height: 60%;
    width: 40%;
  }
```

#Usage

All you need to do is add div tag with 'projector' id and init it after loading page ended by jquery knack function. See example below.

```javascript
<div id="projector"></div>

$(window).load(function(){
  var images = [
    /*["image-url", "image-info"]*/
    ["assets/images/hot-rod-style.jpg", "2 hot-rod-style"],
    ["assets/images/hot-rod-style.jpg"]
  ];
    
  $('#projector').knack({data: images});
});
```


Enjoy!

If you have questions or found a bug? [Tweet at me](https://twitter.com/StadnikSasha)
