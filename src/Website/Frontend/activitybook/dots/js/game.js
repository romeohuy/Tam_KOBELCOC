////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
 
//Game Text
var playBackgroundMusic = false; //toggle background music
var bgColour = '#26ADE4'; //background colour
var startButtonText = 'TAP TO PLAY'; //text for start button

var categoryPage = true; //show/hide category select page
var categoryAllOption = true; //add ALL category select option
var categoryText = 'CHOOSE CATEGORY'; //text for category page
var categoryAllText = 'ALL'; //text for all category select option

var countDisplay = true; //display number of puzzle solve
var countText = '[CURRENT]/[TOTAL]'; //text for number of puzzle
var countdownMode = true; //toggle countdown mode;
var countdownSingleTimer = true; //toggle countdown timer for single puzzle
var resultTitleText = 'YOUR BEST TIME'; //text for result page title (normal timer)
var countdownTitleText = 'TIME\'S UP'; //text for result page title
var countdownCompleteTitleText = 'CONGRATULATIONS'; //text for result page title
var countdownScoreText = 'YOU SOLVED [NUMBER] PUZZLES'; //score for result page, [NUMBER] will replace with total solve puzzles
var buttonReplayText = 'PLAY AGAIN'; //text for replay button
var randomSequence = false;

var lineStroke = 10; //string stroke number
var lineColour = '#dddddd'; //string colour
var lineCompleteStroke = 15; //string complete stroke number
var lineCompleteColour = '#ffffff'; //string complete colour
var elasticTween = true; //enable/disable string elastic effect
var elasticTweenMoile = false; //enable/disable string elastic effect for mobile
var stringElasticNum = 1.8; //string elasctic number

//Social share, [SCORE] will replace with game score
var shareOption = true; //toggle share option
var shareText ='SHARE IT NOW'; //text for share instruction
var shareTitle = 'Highscore on Connect the Dots is [SCORE]';//social share score title
var shareMessage = '[SCORE] is mine new highscore on Connect the Dots! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
 
$.editor = {enable:false};
var dotNum = 0;
var firstDot = true;
var curDot = 0;
var curLine = 0;
var dotCurve_arr = [];
var finalScore;

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundButton');
		if(categoryPage){
			goPage('category');
		}else{
			categoryTitleTxt.text = categoryAllText;
			selectCategory()
			goPage('game');
		}
	});
	
	iconFacebook.cursor = "pointer";
	iconFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	iconTwitter.cursor = "pointer";
	iconTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	iconGoogle.cursor = "pointer";
	iconGoogle.addEventListener("click", function(evt) {
		share('google');
	});
}
function setupGameButton(){
	stage.cursor = "pointer";
	stage.addEventListener("click", handlerMethod);
}

function removeGameButton(){
	stage.cursor = null;
	stage.removeEventListener("click", handlerMethod);
}

function handlerMethod(evt) {
	 switch (evt.type){
		 case 'click':
		 		if(curPage=='category'){
					//category page
					var touchX = (evt.stageX);
					if(touchX < canvasW/100 * 15){
						//left
						toggleCategory(false);
					}else if(touchX > canvasW/100 * 85){
						//right
						toggleCategory(true);
					}else{
						//choose
						selectCategory();
						goPage('game');
					}
				}else{
					playSound('soundButton');
					if(categoryPage){
						goPage('category');
					}else{
						categoryTitleTxt.text = categoryAllText;
						selectCategory();
						goPage('game');
					}
				}
		 	break;
	 }
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	categoryContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	removeGameButton();
	stopAnimateButton(startButton);
	stopAnimateButton(buttonReplay);
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			if(playBackgroundMusic)
				playSound('music', true);
			
			startAnimateButton(startButton);
			setupGameButton();
		break;
		
		case 'category':
			targetContainer = categoryContainer;
			
			buildCategoryList();
			setTimeout(function() {
				setupGameButton();
			}, 200);
			
			startAnimateButton(categoryTxt);
			displayCategoryName();
		break;
		
		case 'game':
			targetContainer = gameContainer;
			if($.editor.enable){
				loadEditPage();
			}else{
				startGame();
			}
		break;
		
		case 'result':
			targetContainer = resultContainer;
			
			playSound('soundEnd');
			stopGame();
			startAnimateButton(buttonReplay);
			
			if(countdownMode){
				if(dotNum == puzzleSelect_arr.length){
					resultTxt.text = countdownCompleteTitleText;
				}else{
					resultTxt.text = countdownTitleText;	
				}
				resultTimerTxt.text = countdownScoreText.replace('[NUMBER]',dotNum);
				finalScore = dotNum;
			}else{
				finalScore = millisecondsToTime(gameTimerCount);
			}
			saveGame(finalScore);
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
 function startGame(){
	dotNum = 0;
	
	loadPuzzle();
	createDots();
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	toggleGameTimer(false);
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score){
    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}


/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:0}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=0;
	$(obj)
	.clearQueue()
	.stop(true,true);
}

/*!
 * 
 * load puzzle image - This is the function that runs to load puzzle image
 * 
 */

function loadPuzzle(){
	puzzleComplete = false;
	for(n=0;n<puzzles_arr.length;n++){
		if(puzzleSelect_arr[dotNum] == n){
			$.puzzle['puzzle_'+n].visible = true;
		}else{
			$.puzzle['puzzle_'+n].visible = false;
		}
	}
}

/*!
 * 
 * select category puzzle - This is the function that runs to select category puzzle
 * 
 */
var puzzleSelect_arr=[];
function selectCategory(){
	puzzleSelect_arr = [];
	countdownTimer = 0;
	for(n=0;n<puzzles_arr.length;n++){
		if(categoryTitleTxt.text == categoryAllText){
			//all
			puzzleSelect_arr.push(n);
			countdownTimer += puzzles_arr[n].timer;
		}else if(categoryTitleTxt.text == puzzles_arr[n].category){
			puzzleSelect_arr.push(n);
			countdownTimer += puzzles_arr[n].timer;
		}
	}
}

/*!
 * 
 * create connect dots - This is the function that runs create connect dots
 * 
 */
var joinLastDot = true;
var firstDotID = 0;

function createDots(){
	toggleGameTimer(true);
	if(countdownSingleTimer){
		countdownTimer = puzzles_arr[puzzleSelect_arr[dotNum]].timer;
	}
	
	var countTextString = countText.replace('[CURRENT]', dotNum+1);
	countTextString = countTextString.replace('[TOTAL]', puzzleSelect_arr.length);
	countTxt.text = countTextString;
	
	resetGame();
	joinLastDot = puzzles_arr[puzzleSelect_arr[dotNum]].joinLastDot;
	
	var delayNum=.5;
	for(n=0;n<puzzles_arr[puzzleSelect_arr[dotNum]].dots.length;n++){
		dotCurve_arr.push({x:puzzles_arr[puzzleSelect_arr[dotNum]].dots[n].x, y:puzzles_arr[puzzleSelect_arr[dotNum]].dots[n].y});
		drawDot(n, puzzles_arr[puzzleSelect_arr[dotNum]].dots[n].x, puzzles_arr[puzzleSelect_arr[dotNum]].dots[n].y);
		
		var dotPosition = {x:$.dotsContainer[n].x, y:$.dotsContainer[n].y};
		$.dotsContainer[n].alpha=0;
		$.dotsContainer[n].x = dotPosition.x - 20;
		$.dotsContainer[n].y = dotPosition.y - 80;
		
		if(n == puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1){
			TweenMax.to($.dotsContainer[n], 0, {delay:delayNum, x:dotPosition.x, y:dotPosition.y, alpha:1, overwrite:true, onComplete:function(){
				TweenMax.to(numberContainer, .5, {alpha:1, overwrite:true});
				setupLineDirection();
			}, onStart:function(){
				var randomPop = Math.round(Math.random()*2)+1;
				playSound('soundPop'+randomPop);	
			}});
		}else{
			TweenMax.to($.dotsContainer[n], 0, {delay:delayNum, x:dotPosition.x, y:dotPosition.y, alpha:1, overwrite:true, onStart:function(){
				var randomPop = Math.round(Math.random()*2)+1;
				playSound('soundPop'+randomPop);	
			}});
		}
		
		delayNum+=.15;
	}
}

/*!
 * 
 * reset game - This is the function that runs to reset game
 * 
 */
function resetGame(){
	numberContainer.alpha = 0;
	dotsContainer.removeAllChildren();
	linesContainer.removeAllChildren();
	linesCompleteContainer.removeAllChildren();
	linesCompleteContainer.visible = false;
	
	dragCon = false;
	firstDot = true;
	curDot = curLine = 0;
	
	$.dots={};
	$.dotsGuide={};
	$.dotsConnect={};
	$.dotsContainer={};
	$.lines={};
	$.linesComplete={};
	dotCurve_arr = [];	
}

/*!
 * 
 * next puzzle - This is the function that runs to load next puzzle
 * 
 */
function startNextPuzzle(){
	resetGame();
	removeLineDirection();
	
	dotNum++;
	if(dotNum >= puzzleSelect_arr.length){
		goPage('result');
	}else{
		loadPuzzle();
		createDots();
	}
}

/*!
 * 
 * draw dot - This is the function that runs draw new dot
 * 
 */
function drawDot(n,x,y){
	$.dotsContainer[n] = new createjs.Container();
	$.dotsContainer[n].connected = false;
	$.dotsContainer[n].x = x;
	$.dotsContainer[n].y = y;
	
	$.dots[n] = new createjs.Bitmap(loader.getResult('dotBg'));
	$.dotsGuide[n] = new createjs.Bitmap(loader.getResult('dotDefault'));
	$.dotsConnect[n] = new createjs.Bitmap(loader.getResult('dotConnected'));
	$.dotsConnect[n].visible = false;
	
	centerReg($.dots[n]);
	centerReg($.dotsGuide[n]);
	centerReg($.dotsConnect[n]);
	
	$.dotsContainer[n].addChild($.dots[n], $.dotsGuide[n], $.dotsConnect[n]);
	
	$.dotsContainer[n].cursor = "pointer";
	$.dotsContainer[n].name = n;
	$.dotsContainer[n].addEventListener("mousedown", function(evt) {
		startLineConnect(evt.currentTarget.name);
	});
	
	dotsContainer.addChild($.dotsContainer[n]);
}

/*!
 * 
 * init string - This is the function that runs to draw string
 * 
 */
function startLineConnect(n){
	if(randomSequence){
		if(firstDot && $.lines[n] == undefined){
			totalConnectedDot = 0;
			curDot = curLine = firstDotID = n;
			createLine(n);
			firstDot = false;
		}else if(n == curDot){
			createLine(n);
		}
	}else{
		if(firstDot){
			if(n==0 && $.lines[n] == undefined){
				createLine(n);
				firstDot = false;
			}
		}else if(n == curDot){
			createLine(n);
		}
	}
}

/*!
 * 
 * init string - This is the function that runs to draw string
 * 
 */
function createLine(n){
	$.lines[n] = new createjs.Shape();
	linesContainer.addChild($.lines[n]);
	
	$.linesComplete[n] = new createjs.Shape();
	linesCompleteContainer.addChild($.linesComplete[n]);
}

/*!
 * 
 * prepare to draw string - This is the function that runs to prepare string
 * 
 */
function prepareDrawLine(n,x,y,con){
	if($.lines[n] != undefined && !$.dotsContainer[n].connected){
		$.dotsConnect[n].visible = true;
		
		var curvePoint = {};
		curvePoint = getCenterPosition($.dotsContainer[n].x,$.dotsContainer[n].y,x,y);
		
		if(con){
			dotCurve_arr[n].x = getRandomPosition(curvePoint.x, 80);
			dotCurve_arr[n].y = getRandomPosition(curvePoint.y, 80);	
		}
		
		if(!elasticTweenMoile){
			if($.browser.mobile || isTablet){
				elasticTween = false;
			}
		}
		
		if(!elasticTween){
			dotCurve_arr[n].x = curvePoint.x;
			dotCurve_arr[n].y = curvePoint.y;
			drawLine(n,x,y);
		}else{
			TweenMax.to(dotCurve_arr[n], stringElasticNum, {x:curvePoint.x,y:curvePoint.y, ease:Elastic.easeOut, overwrite:true, onUpdate:drawLine, onUpdateParams:[n,x,y], onComplete:function(){
				TweenMax.killTweensOf(dotCurve_arr[n]);
			}});
		}
	}
}

/*!
 * 
 * draw string - This is the function that runs to draw string
 * 
 */
function drawLine(n,x,y){
	if($.lines[n] != undefined){
		$.lines[n].graphics.clear();
		$.lines[n].graphics.beginStroke(lineColour).setStrokeStyle(lineStroke).moveTo($.dotsContainer[n].x,$.dotsContainer[n].y).curveTo(dotCurve_arr[n].x, dotCurve_arr[n].y, x, y);
		
		$.linesComplete[n].graphics.clear();
		$.linesComplete[n].graphics.beginStroke(lineCompleteColour).setStrokeStyle(lineCompleteStroke).moveTo($.dotsContainer[n].x,$.dotsContainer[n].y).curveTo(dotCurve_arr[n].x, dotCurve_arr[n].y, x, y);
	}
}

/*!
 * 
 * clear string - This is the function that runs to clear string
 * 
 */
function clearLine(n){
	if($.lines[n] != undefined){
		$.dotsConnect[n].visible = false;
		
		TweenMax.killTweensOf(dotCurve_arr[n]);
		//TweenMax.to(dotCurve_arr[n], 0, {x:$.dotsContainer[n].x, y:$.dotsContainer[n].y, overwrite:true});
		$.lines[n].graphics.clear();
		$.lines[n] = undefined;
		
		$.linesComplete[n].graphics.clear();
		$.linesComplete[n] = undefined;
	}
}

/*!
 * 
 * draw connected string - This is the function that runs to draw connected string
 * 
 */
function drawLineConnected(n, con){
	var randomPop = Math.round(Math.random()*4)+1;
	playSound('soundSwipe'+randomPop);
	
	if(randomSequence){
		if(con){
			prepareDrawLine(n, $.dotsContainer[nextDot].x, $.dotsContainer[nextDot].y, true);
		}else{
			prepareDrawLine(n, $.dotsContainer[prevDot].x, $.dotsContainer[prevDot].y, true);	
		}
	}else{
		prepareDrawLine(n, $.dotsContainer[n+1].x, $.dotsContainer[n+1].y, true);
	}
	
	$.dotsContainer[n].connected = true;
}

/*!
 * 
 * draw last connected string - This is the function that runs to draw last connected string
 * 
 */
var puzzleComplete = false;
function drawLastLineConnected(n){
	if(!puzzleComplete){
		puzzleComplete = true;
		var randomPop = Math.round(Math.random()*4)+1;
		if(randomSequence){
			if(!joinLastDot){
				prepareDrawLine(n, $.dotsContainer[lastConnectedDot].x, $.dotsContainer[lastConnectedDot].y, true);
			}else{
				prepareDrawLine(n, $.dotsContainer[firstDotID].x, $.dotsContainer[firstDotID].y, true);
			}
		}else{
			prepareDrawLine(n, $.dotsContainer[0].x, $.dotsContainer[0].y, true);	
		}
		$.dotsContainer[n].connected = true;
		
		linesCompleteContainer.alpha = 0;
		linesCompleteContainer.visible = true;
		
		animatePuzzle();
	}
}

/*!
 * 
 * animate puzzle - This is the function that runs to animate puzzle
 * 
 */
function animatePuzzle(){
	toggleGameTimer(false);
	playSound('soundScore');
	
	puzzleContainer.regX = canvasW/2;
	puzzleContainer.regY = canvasH/2;
	puzzleContainer.x = canvasW/2;
	puzzleContainer.y = canvasH/2;
	
	TweenMax.to(linesCompleteContainer, .5, {delay:0, alpha:1, ease:Linear.easeNone, overwrite:true});
	TweenMax.to(puzzleContainer, .3, {scaleX:1.02, scaleY:1.02, ease:Linear.easeNone, overwrite:true, onComplete:function(){
		TweenMax.to(puzzleContainer, .2, {scaleX:1, scaleY:1, ease:Linear.easeNone, overwrite:true, onComplete:function(){
			
		}});
	}});
	
	setTimeout(function(){
		clearLine(curDot);
		startNextPuzzle();
	}, 2000);
}

/*!
 * 
 * setup stage move - This is the function that runs to setup stage string move
 * 
 */
var dragCon = false;
function setupLineDirection(){
	stage.addEventListener("mousedown", handlerMoveMethod);
	stage.addEventListener("pressmove", handlerMoveMethod);
	stage.addEventListener("pressup", handlerMoveMethod);
}

function removeLineDirection(){
	stage.removeEventListener("mousedown", handlerMoveMethod);
	stage.removeEventListener("pressmove", handlerMoveMethod);
	stage.removeEventListener("pressup", handlerMoveMethod);
}

function handlerMoveMethod(evt) {
	 switch (evt.type){
		 case 'mousedown':
		 	dragCon = true;
			stagePosition.scalex = (evt.stageX);
			stagePosition.scaley = (evt.stageY);
			stagePosition.x = (evt.stageX);
			stagePosition.y = (evt.stageY);
		 	prepareDrawLine(curDot, (evt.stageX), (evt.stageY), false);
		 break;
			
		 case 'pressmove':
		 	dragCon = true;
			stagePosition.scalex = (evt.stageX);
			stagePosition.scaley = (evt.stageY);
			stagePosition.x = (evt.stageX);
			stagePosition.y = (evt.stageY);
		 	
			/*prepareDrawLine(curDot, stagePosition.scalex, stagePosition.scaley, false);
		
			for(n=0;n<puzzles_arr[dotNum].dots.length;n++){
				var pointDot = $.dotsContainer[n].globalToLocal(stagePosition.x, stagePosition.y);
				if(curDot == puzzles_arr[dotNum].dots.length-1 && n == 0){
					if($.dotsContainer[n].hitTest(pointDot.x, pointDot.y)){
						checkConnectDot(n);
					};
				}else if(n == curDot+1){
					if($.dotsContainer[n].hitTest(pointDot.x, pointDot.y)){
						checkConnectDot(n);
					};
				}
			}*/
		 break;
		 
		 case 'pressup':
		 	dragCon = false;
		 	clearLine(curDot);
		 break;
	 }
}

var stagePosition = {scalex:0, scaley:0, x:0, y:0};
function updateGame(){
	if(dragCon){
		prepareDrawLine(curDot, stagePosition.scalex, stagePosition.scaley, false);
		
		for(n=0;n<puzzles_arr[puzzleSelect_arr[dotNum]].dots.length;n++){
			var pointDot = $.dotsContainer[n].globalToLocal(stagePosition.x, stagePosition.y);
			if(randomSequence){
				var nextDot = curDot+1;
				nextDot = nextDot > puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 ? 0 : nextDot;
				var prevDot = curDot-1;
				prevDot = prevDot < 0 ? puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 : prevDot;
				
				if(n == nextDot || n == prevDot){
					if($.dotsContainer[n].hitTest(pointDot.x, pointDot.y)){
						checkConnectDot(n);
					};
				}
			}else{
				if(curDot == puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 && n == 0){
					if($.dotsContainer[n].hitTest(pointDot.x, pointDot.y)){
						checkConnectDot(n);
					};
				}else if(n == curDot+1){
					if($.dotsContainer[n].hitTest(pointDot.x, pointDot.y)){
						checkConnectDot(n);
					};
				}	
			}
		}
	}
}

/*!
 * 
 * check connected dot - This is the function that runs to check connected dot
 * 
 */
var nextDot
var prevDot
var lastConnectedDot = 0;
var totalConnectedDot = 0;
var linearSequence = false;

function checkConnectDot(n){
	if(randomSequence){
		nextDot = curDot+1;
		nextDot = nextDot > puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 ? 0 : nextDot;
		prevDot = curDot-1;
		prevDot = prevDot < 0 ? puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 : prevDot;
		
		if(!joinLastDot && totalConnectedDot == puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-2 && n == lastConnectedDot){
			drawLastLineConnected(curDot);
			curDot=puzzles_arr[puzzleSelect_arr[dotNum]].dots.length;
		}else if(totalConnectedDot == puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 && n == firstDotID){
			drawLastLineConnected(curDot);
			curDot=puzzles_arr[puzzleSelect_arr[dotNum]].dots.length;
		}else {
			if(totalConnectedDot == 0){
				if(nextDot == n && !firstDot && dragCon && $.dotsConnect[curDot].visible == true){
					if(totalConnectedDot == 0){
						linearSequence = true;
					}
					
					lastConnectedDot = firstDotID-1;
					lastConnectedDot = lastConnectedDot < 0 ? puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 : lastConnectedDot;
					
					drawLineConnected(curDot, true);
					curDot=nextDot;
					createLine(curDot);
					totalConnectedDot++;
				}else if(prevDot == n && !firstDot && dragCon && $.dotsConnect[curDot].visible == true){
					if(totalConnectedDot == 0){
						linearSequence = false;
					}
					
					lastConnectedDot = firstDotID+1;
					lastConnectedDot = lastConnectedDot > puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 ? 0 : lastConnectedDot;
					
					drawLineConnected(curDot, false);
					curDot=prevDot;
					createLine(curDot);
					totalConnectedDot++;
				}
			}else{
				if(nextDot == n && !firstDot && dragCon && $.dotsConnect[curDot].visible == true && linearSequence){
					if(totalConnectedDot == 0){
						linearSequence = true;
					}
					
					lastConnectedDot = firstDotID-1;
					lastConnectedDot = lastConnectedDot < 0 ? puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 : lastConnectedDot;
					
					drawLineConnected(curDot, true);
					curDot=nextDot;
					createLine(curDot);
					totalConnectedDot++;
				}else if(prevDot == n && !firstDot && dragCon && $.dotsConnect[curDot].visible == true && !linearSequence){
					if(totalConnectedDot == 0){
						linearSequence = false;
					}
					
					lastConnectedDot = firstDotID+1;
					lastConnectedDot = lastConnectedDot > puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1 ? 0 : lastConnectedDot;
					
					drawLineConnected(curDot, false);
					curDot=prevDot;
					createLine(curDot);
					totalConnectedDot++;
				}	
			}
		}
	}else{
		if(!joinLastDot && (curDot+1) == (puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1)){
			drawLineConnected(curDot, true);
			curDot++;
			
			linesCompleteContainer.alpha = 0;
			linesCompleteContainer.visible = true;
			
			animatePuzzle();
		}else if(curDot == puzzles_arr[puzzleSelect_arr[dotNum]].dots.length-1){
			if(n == 0){
				drawLastLineConnected(curDot);
				curDot++;
			}
		}else if(curDot+1 == n && !firstDot && dragCon && $.dotsConnect[curDot].visible == true){
			drawLineConnected(curDot, true);
			curDot++;
			createLine(curDot);
		}
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval
var gameTimerCount = 0;
var countdownTimer = 0;
function toggleGameTimer(con){
	if(con){
		gameTimerCount = 0;
		clearInterval(gameTimerInterval);
		gameTimerInterval = setInterval(function(){
			if(countdownMode){
				countdownTimer-=1000;
				countdownTimer = countdownTimer < 0 ? 0 : countdownTimer;
				resultTimerTxt.text=timerTxt.text=millisecondsToTime(countdownTimer);
				if(countdownTimer <= 0){
					goPage('result');	
				}
			}else{
				gameTimerCount+=1000;
				resultTimerTxt.text=timerTxt.text=millisecondsToTime(gameTimerCount);
			}
		}, 1000);
	}else{
		clearInterval(gameTimerInterval);
	}
}

/*!
 * 
 * SWITCH CATEGORY - This is the function that runs to select category name
 * 
 */
var category_arr=[];
var categoryNum=0;

function toggleCategory(con){
	if(con){
		categoryNum++;
		categoryNum=categoryNum>category_arr.length-1?0:categoryNum;
	}else{
		categoryNum--;
		categoryNum=categoryNum<0?category_arr.length-1:categoryNum;
	}
	displayCategoryName();
}

function displayCategoryName(){
	categoryTitleTxt.text = categoryTitleShadowTxt.text = category_arr[categoryNum];
}

function buildCategoryList(){
	if(category_arr.length == 0){
		for(n=0;n<puzzles_arr.length;n++){
			category_arr.push(puzzles_arr[n].category);
		}
		
		category_arr = unique(category_arr);
		if(categoryAllOption){
			category_arr.push(categoryAllText);
		}	
	}
}


/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  
	  if(seconds<10){
		seconds = '0'+seconds;  
	  }
	  
	  if(minutes<10){
		minutes = '0'+minutes;  
	  }
	  return minutes + ":" + seconds;
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", finalScore);
	text = shareMessage.replace("[SCORE]", finalScore);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}