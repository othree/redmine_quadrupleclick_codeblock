;(function($)
{
// https://github.com/richadams/jquery-tripleclick/blob/master/tripleclick.js
// @author Rich Adams <rich@richadams.me>

// Implements a triple-click event. Click (or touch) three times within 1s on the element to trigger.
// Modified to quadruple-click event

    // Default options
    var defaults = {
        threshold: 1200, // ms
    }

    function quadrupleHandler(event)
    {
        var $elem = jQuery(this);

        // Merge the defaults and any user defined settings.
        settings = jQuery.extend({}, defaults, event.data);

        // Get current values, or 0 if they don't yet exist.
        var clicks = $elem.data("triclick_clicks") || 0;
        var start  = $elem.data("triclick_start")  || 0;

        // If first click, register start time.
        if (clicks === 0) { start = event.timeStamp; }

        // If we have a start time, check it's within limit
        if (start != 0
            && event.timeStamp > start + settings.threshold)
        {
            // Tri-click failed, took too long.
            clicks = 0;
            start  = event.timeStamp;
        }

        // Increment counter, and do finish action.
        clicks += 1;
        if (clicks === 4)
        {
            clicks     = 0;
            start      = 0;
            event.type = "quadrupleclick";

            // Let jQuery handle the triggering of "quadrupleclick" event handlers
            if (jQuery.event.handle === undefined) {
                jQuery.event.dispatch.apply(this, arguments);
            }
            else {
                // for jQuery before 1.9
                jQuery.event.handle.apply(this, arguments);
            }
        }

        // Update object data
        $elem.data("triclick_clicks", clicks);
        $elem.data("triclick_start",  start);
    }

    var quadrupleclick = $.event.special.quadrupleclick =
    {
        setup: function(data, namespaces)
        {
            $(this).bind("touchstart click.quadruple", data, quadrupleHandler);
        },
        teardown: function(namespaces)
        {
            $(this).unbind("touchstart click.quadruple", data, quadrupleHandler);
        }
    };

// http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function SelectText(element) {
    var doc = document
        , text = element
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

$(document).on('quadrupleclick', 'pre > code', function (event) {
  SelectText(this);
  event.preventDefault();
});

})(jQuery);

