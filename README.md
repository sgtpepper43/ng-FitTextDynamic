# ng-FitTextDynamic

### ng-FitTextDynamic makes font-sizes flexible. Use it whenever you're displaying dynamic text of different and unknown widths, or even for static text (though you might consider using ng-fitText if you only need to resize static text).

This is a fork of a rework of the original jQuery plugin which can be found here: https://github.com/davatron5000/FitText.js.
Original angular project is here: https://github.com/patrickmarabeas/ng-FitText.js

### Install and Inclusion

Grab it with Bower: `bower install ngFitTextDynamic`

Include it in your AngularJS application

    var myApp = angular.module( 'myApp', [ 'ngFitTextDynamic' ] );

Apply it to your text

    <h1 dynamic-text>FitText</h1>

There are also additional attributes which can be used.

Specifying a value for dynamic-text allows you to set an event to trigger the resize manually, like after loading data.

    <h1 dynamic-text="event name" dynamic-text-min="12" dynamic-text-max="50">ng-FitText</h1>
Then you can resize the text whenever you want using something like:

    <input type="button" ng-change="$broadcast('event name')"/>
It finds the right font size by iterating through different sizes until it breaks the line.

Note: It will not shrink strings without any spaces or anything, unless you turn word-break: all on.
# Make sure to set a max and min size!
I'm not responsible for when you don't set a max size and you make the model an empty string it just keeps increasing the font forever. I'll probably fix this but not today.

### Debounce

Debouce (limiting the rate at which DynamicFitText will be called on window resize) is available. You can pass initialization parameters to the ngDynamicFitText constructor to achieve this:

    myApp.config( function( dynamicTextConfigProvider ) {
        dynamicTextConfigProvider.config = {
            debounce: true, //default is false
            delay: 1000 //default is 250
        };

        // OR

        dynamicTextConfigProvider.config.debounce = true;
        dynamicTextConfigProvider.config.delay = 1000;
    });
