////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/logo.png', id:'logo'},
				{src:'assets/dot_bg.png', id:'dotBg'},
				{src:'assets/dot_connected.png', id:'dotConnected'},
				{src:'assets/dot_default.png', id:'dotDefault'},
				{src:'assets/icon_facebook.png', id:'iconFacebook'},
				{src:'assets/icon_twitter.png', id:'iconTwitter'},
				{src:'assets/icon_google.png', id:'iconGoogle'},
				{src:'assets/arrow.png', id:'arrow'}];
			
	for(n=0;n<puzzles_arr.length;n++){
		manifest.push({src:puzzles_arr[n].src, id:'puzzle_'+n});
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/button.ogg', id:'soundButton'})
		manifest.push({src:'assets/sounds/pop1.ogg', id:'soundPop1'})
		manifest.push({src:'assets/sounds/pop2.ogg', id:'soundPop2'})
		manifest.push({src:'assets/sounds/pop3.ogg', id:'soundPop3'})
		manifest.push({src:'assets/sounds/music.ogg', id:'music'})
		manifest.push({src:'assets/sounds/swipe1.ogg', id:'soundSwipe1'})
		manifest.push({src:'assets/sounds/swipe2.ogg', id:'soundSwipe2'})
		manifest.push({src:'assets/sounds/swipe3.ogg', id:'soundSwipe3'})
		manifest.push({src:'assets/sounds/swipe4.ogg', id:'soundSwipe4'})
		manifest.push({src:'assets/sounds/swipe5.ogg', id:'soundSwipe5'})
		manifest.push({src:'assets/sounds/score.ogg', id:'soundScore'})
		manifest.push({src:'assets/sounds/end.ogg', id:'soundEnd'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}