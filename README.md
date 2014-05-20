# ng-FitTextDynamic

### ng-FitTextDyanmic makes font-sizes flexible. Use this AngularJS directive in your fluid or responsive layout to achieve scalable headlines that fill the width of a parent element.

This is a fork of a rework of the original jQuery plugin which can be found here: https://github.com/davatron5000/FitText.js.
Original angular project is here: https://github.com/patrickmarabeas/ng-FitText.js

### Install and Inclusion

Grab it with Bower: `bower install ngFitTextDynamic`

Include it in your AngularJS application

    var myApp = angular.module( 'myApp', [ 'ngFitTextDynamic' ] );

Apply it to your text

    <h1 data-fittext>FitText</h1>

There are also additional attributes which can be used.

Specifying a value for data-fittext allows you to fine tune the text size. The default is 1. Increasing this number (ie 1.5) will resize the text more aggressively. Decreasing this number (ie 0.5) will reduce the aggressiveness of resize. data-fittext-min and data-fittext-max allow you to set upper and lower limits.

    <h1 data-fittext=".315" data-fittext-min="12" data-fittext-max="50">ng-FitText</h1>

The element needs to either be a block element or an inline-block element with a width specified (% or px).

### Dynamic Text
To make sure the text all fits on one line when you're using dynamic and not static text, specify an event:

    data-fittext-event="event name"

Then wherever your model is changing or loading, broadcast that event, like in this example:

    <input ng-change="$broadcast('event name')"/>
It finds the right font size by iterating through different sizes until it breaks the line.

Note: It will not shrink strings without any spaces or anything, unless you turn word-break: all on.
# Make sure to set a max and min size!
I'm not responsible for when you don't set a max size and you make the model an empty string it just keeps increasing the font forever. I'll probably fix this but not today.

### Debounce

Debouce (limiting the rate at which FitText will be called on window resize) is available. You can pass initialization parameters to the ngFitText constructor to achieve this:

    myApp.config( function( fitTextConfigProvider ) {
        fitTextConfigProvider.config = {
            debounce: true, //default is false
            delay: 1000 //default is 250
        };

        // OR

        fitTextConfigProvider.config.debounce = true;
        fitTextConfigProvider.config.delay = 1000;
    });
