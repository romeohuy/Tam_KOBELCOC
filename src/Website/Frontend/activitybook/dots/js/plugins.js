// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
function checkContentHeight(target){
	var stageHeight=$( window ).height();
	var newHeight = (stageHeight/2)-(target.height()/2);
	return newHeight;
}

function checkContentWidth(target){
	var stageWidth=$( window ).width();
	var newWidth = (stageWidth/2)-(target.width()/2);
	return newWidth;
}

function getDeviceVer() {
	var ua = navigator.userAgent;
	var uaindex;
	
	// determine OS
	if ( ua.match(/(iPad|iPhone|iPod touch)/) ){
		userOS = 'iOS';
		uaindex = ua.indexOf( 'OS ' );
	}else if ( ua.match(/Android/) ){
		userOS = 'Android';
		uaindex = ua.indexOf( 'Android ' );
	}else{
		userOS = 'unknown';
	}
	
	// determine version
	if ( userOS === 'iOS' && uaindex > -1 ){
		userOSver = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
	}else if ( userOS === 'Android'  &&  uaindex > -1 ){
		userOSver = ua.substr( uaindex + 8, 3 );
	}else{
		userOSver = 'unknown';
	}
	return Number(userOSver)
}

function getCenterPosition(startX, startY, endX, endY) {
    var point = {};
	point.x=(startX+endX)/2;
    point.y=(startY+endY)/2;
	
	return point;
}

function getRandomPosition(num, percent){
	var distance = (Math.random() * percent) - (percent/2);
	num += distance;
	return num;
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}