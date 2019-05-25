////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, categoryContainer, gameContainer, resultContainer, dotsContainer, linesContainer, linesCompleteContainer, puzzleContainer, numberContainer;
var bg, logo, countTxt, timerTxt, resultTxt, resultTimerTxt, startButton, buttonReplay,iconFacebook, iconTwitter, iconGoogle, shareTxt, arrowLeft, arrowRight, categoryTxt, categoryTitleTxt;

$.puzzle={};
$.dots={};
$.dotsGuide={};
$.dotsConnect={};
$.dotsContainer={};
$.lines={};
$.linesComplete={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	categoryContainer = new createjs.Container();
	puzzleContainer = new createjs.Container();
	numberContainer = new createjs.Container();
	dotsContainer = new createjs.Container();
	linesContainer = new createjs.Container();
	linesCompleteContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Shape();
	bg.graphics.beginFill(bgColour).drawRect(0, 0, canvasW, canvasH);
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	timerTxt = new createjs.Text();
	timerTxt.font = "50px comfortaabold";
	timerTxt.color = "#ffffff";
	timerTxt.text = '00:00';
	timerTxt.textAlign = "right";
	timerTxt.textBaseline='alphabetic';
	timerTxt.x = canvasW/100*97;
	timerTxt.y = canvasH/100*8;
	
	countTxt = new createjs.Text();
	countTxt.font = "50px comfortaabold";
	countTxt.color = "#ffffff";
	countTxt.text = '';
	countTxt.textAlign = "left";
	countTxt.textBaseline='alphabetic';
	countTxt.x = canvasW/100*3;
	countTxt.y = canvasH/100*8;
	
	resultTxt = new createjs.Text();
	resultTxt.font = "50px comfortaabold";
	resultTxt.color = "#ffffff";
	resultTxt.text = resultTitleText;
	resultTxt.textAlign = "center";
	resultTxt.textBaseline='alphabetic';
	resultTxt.x = canvasW/2;
	resultTxt.y = canvasH/100*45;
	
	startButton = new createjs.Text();
	startButton.font = "30px comfortaabold";
	startButton.color = "#ffffff";
	startButton.text = startButtonText;
	startButton.textAlign = "center";
	startButton.textBaseline='alphabetic';
	startButton.x = canvasW/2;
	startButton.y = canvasH/100*75;
	
	resultTimerTxt = new createjs.Text();
	resultTimerTxt.font = "50px comfortaabold";
	resultTimerTxt.color = "#ffffff";
	resultTimerTxt.text = resultTitleText;
	resultTimerTxt.textAlign = "center";
	resultTimerTxt.textBaseline='alphabetic';
	resultTimerTxt.x = canvasW/2;
	resultTimerTxt.y = canvasH/100*53;
	
	buttonReplay = new createjs.Text();
	buttonReplay.font = "30px comfortaabold";
	buttonReplay.color = "#ffffff";
	buttonReplay.text = buttonReplayText;
	buttonReplay.textAlign = "center";
	buttonReplay.textBaseline='alphabetic';
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100*60;
	buttonReplay.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));	
	
	shareTxt = new createjs.Text();
	shareTxt.font = "30px comfortaabold";
	shareTxt.color = "#ffffff";
	shareTxt.text = shareText;
	shareTxt.textAlign = "center";
	shareTxt.textBaseline='alphabetic';
	shareTxt.x = canvasW/2;
	shareTxt.y = canvasH/100 * 72;
	
	iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'));
	iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'));
	iconGoogle = new createjs.Bitmap(loader.getResult('iconGoogle'));
	centerReg(iconFacebook);
	createHitarea(iconFacebook);
	centerReg(iconTwitter);
	createHitarea(iconTwitter);
	centerReg(iconGoogle);
	createHitarea(iconGoogle);
	iconFacebook.x = canvasW/100*40;
	iconTwitter.x = canvasW/2;
	iconGoogle.x = canvasW/100*60;
	iconFacebook.y = iconTwitter.y = iconGoogle.y = canvasH/100 * 80;
	
	for(n=0;n<puzzles_arr.length;n++){
		$.puzzle['puzzle_'+n] = new createjs.Bitmap(loader.getResult('puzzle_'+n));
		$.puzzle['puzzle_'+n].name = 'puzzle_'+n;
		numberContainer.addChild($.puzzle['puzzle_'+n]);
	}
	
	arrowLeft = new createjs.Bitmap(loader.getResult('arrow'));
	arrowRight = new createjs.Bitmap(loader.getResult('arrow'));
	centerReg(arrowLeft);
	centerReg(arrowRight);
	
	arrowLeft.x = canvasW/100 * 10;
	arrowRight.x = canvasW/100 * 90;
	arrowLeft.scaleX = -1;
	arrowLeft.y = arrowRight.y = canvasH/2;
	
	createHitarea(arrowLeft);
	createHitarea(arrowRight);
	
	categoryTxt = new createjs.Text();
	categoryTxt.font = "30px comfortaabold";
	categoryTxt.color = "#ffffff";
	categoryTxt.text = categoryText;
	categoryTxt.textAlign = "center";
	categoryTxt.textBaseline='alphabetic';
	categoryTxt.x = canvasW/2;
	categoryTxt.y = canvasH/100*70;
	
	categoryTitleTxt = new createjs.Text();
	categoryTitleTxt.font = "150px comfortaabold";
	categoryTitleTxt.color = "#ffffff";
	categoryTitleTxt.text = '';
	categoryTitleTxt.textAlign = "center";
	categoryTitleTxt.textBaseline='alphabetic';
	categoryTitleTxt.x = canvasW/2;
	categoryTitleTxt.y = canvasH/100 * 58;
	
	categoryTitleShadowTxt = new createjs.Text();
	categoryTitleShadowTxt.font = "150px comfortaabold";
	categoryTitleShadowTxt.color = "#000000";
	categoryTitleShadowTxt.text = '';
	categoryTitleShadowTxt.textAlign = "center";
	categoryTitleShadowTxt.textBaseline='alphabetic';
	categoryTitleShadowTxt.alpha = .2;
	categoryTitleShadowTxt.x = canvasW/2;
	categoryTitleShadowTxt.y = (canvasH/100 * 58)+10;
   
	mainContainer.addChild(logo, startButton);
	categoryContainer.addChild(arrowLeft, arrowRight, categoryTxt, categoryTitleShadowTxt, categoryTitleTxt);
	puzzleContainer.addChild(numberContainer, linesContainer, linesCompleteContainer, dotsContainer);
	gameContainer.addChild(puzzleContainer, countTxt, timerTxt)
	resultContainer.addChild(resultTxt, buttonReplay, resultTimerTxt);
	if(shareOption){
		resultContainer.addChild(shareTxt, iconFacebook, iconTwitter, iconGoogle);
	}
	canvasContainer.addChild(bg, mainContainer, categoryContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		//canvasContainer.scaleX=canvasContainer.scaleY=scalePercent;
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}