////////////////////////////////////////////////////////////
// EDIT TRACKS
////////////////////////////////////////////////////////////
var editDot;
var dotsArr = [];
var editShape;
var addNum = 0;
var editDotWidth = 15;
var colourDot = '#ff7f00';
var colourEdit = '#ff0000';
var curDot = 0;
var editContainer;

/*!
 * 
 * EDIT READY
 * 
 */
$(function() {
	 $.editor.enable = true;
});

function loadEditPage(){
	$.get('editTools.html', function(data){
		$('body').prepend(data);
		buildEditButtons();
		buildEditMode();
		loadPuzzle();
	});		
}

function buildEditButtons(){
	editContainer = new createjs.Container();
	canvasContainer.addChild(editContainer);
	
	for(n=0;n<puzzles_arr.length;n++){
		puzzleSelect_arr.push(n);
	}
	
	$('#puzzleList').empty();
	for(n=0;n<puzzles_arr.length;n++){
		$('#puzzleList').append($("<option/>", {
			value: n,
			text: 'Puzzle '+(n+1)
		}));
	}
	
	$('#add').click(function(){
		addDot();
	});
	
	$('#addselected').click(function(){
		addDot(true);
	});
	
	$('#remove').click(function(){
		removeDot();
	});
	
	$('#mouseAdd').click(function(){
		toggleMouseClick();
	});
	
	$('#prevPoint').click(function(){
		checkMouseClick();
		if(dotsArr.length > 0){
			curDot--;
			curDot = curDot < 0 ? 0 : curDot;
			toggleEditDot(dotsArr[curDot].x, dotsArr[curDot].y, curDot);
		}
	});
	
	$('#nextPoint').click(function(){
		checkMouseClick();
		if(dotsArr.length > 0){
			curDot++;
			curDot = curDot >= dotsArr.length ? dotsArr.length-1 : curDot;
			toggleEditDot(dotsArr[curDot].x, dotsArr[curDot].y, curDot);
		}
	});
	
	$('#generate').click(function(){
		checkMouseClick();
		var output = '';
		for(n=0;n<dotsArr.length;n++){
			output += '{x:'+dotsArr[n].x+', y:'+dotsArr[n].y+'}, ';
		}
		$('#output').val('['+output+']');
	});
	
	$('#remove').hide();
	$('#editWrapper').show();
	
	$("#puzzleList").change(function() {
		checkMouseClick();
		if($(this).val() != ''){
			dotNum = $(this).val();
			dotsArr = [];
			dotsArr = puzzles_arr[dotNum].dots;
			loadPuzzle();
			buildEditMode();
			$('#remove').hide();
			$('#addSelected').hide();
		}
	});
	
	$("#dotsList").change(function() {
		checkMouseClick();
		if($(this).val() != ''){
			curDot = $(this).val();
			toggleEditDot(dotsArr[$(this).val()].x, dotsArr[$(this).val()].y, $(this).val());
		}
	});
	
	curDot = 0;
	$('#addSelected').hide();
	dotsArr = [];
	dotsArr = puzzles_arr[dotNum].dots;
	
	stage.addEventListener("mousedown", handlerEditMethod);
}

function handlerEditMethod(evt) {
	 switch (evt.type){
		 case 'mousedown':
			 if(mouseClick){
				$('#newpointX').val(Math.round(evt.stageX));
				$('#newpointY').val(Math.round(evt.stageY)); 
				addDot();
			 }
		 break;
	 }
}

/*!
 * 
 * BUILD EDIT MODE - This is the function that runs to build edit mode
 * 
 */
function buildEditMode(){
	editDot = new createjs.Shape();
	editDot.alpha = .5;
	editDot.graphics.beginFill(colourEdit).drawCircle(0, 0, editDotWidth+5);
	editDot.visible = false;
	editShape = new createjs.Shape();
	
	resetEditStage();
	drawEditDots();
	redrawEdit();
}

/*!
 * 
 * RESET STAGE - This is the function that runs to reset stage
 * 
 */
function resetEditStage(){
	editContainer.removeAllChildren();
	editContainer.addChild(editDot, editShape);	
}

/*!
 * 
 * REDRAW POINT - This is the function that runs to redraw point
 * 
 */
function redrawEdit(){
	editShape.graphics.clear();
	if(dotsArr.length > 0){
		editShape.graphics.beginStroke("red").moveTo(dotsArr[0].x, dotsArr[0].y);
		for(n=0;n<dotsArr.length;n++){
			if(n<dotsArr.length-1){
				editShape.graphics.lineTo(dotsArr[n+1].x, dotsArr[n+1].y);
			}
		}
	}
	puzzles_arr[dotNum].dots = dotsArr;
}

/*!
 * 
 * ADD POINT - This is the function that runs to add point
 * 
 */
function addDot(con){
	if(con){
		var pointNum = editPointNum;
		pointNum++;
		dotsArr.splice(pointNum, 0, {x:$('#newpointX').val(), y:$('#newpointY').val()});
	}else{
		if(dotsArr.length == 0){
			dotsArr = [{x:$('#newpointX').val(), y:$('#newpointY').val()}];
		}else{
			dotsArr.push({x:$('#newpointX').val(), y:$('#newpointY').val()});
		}
	}
	
	resetEditStage();
	drawEditDots();
	redrawEdit();
}

/*!
 * 
 * DRAW ALL POINTS - This is the function that runs to draw all points
 * 
 */
function drawEditDots(){
	addNum=0;
	$('#dotsList').empty();
	$('#dotsList').append($("<option/>", {
		value: '',
		text: 'Select Dot'
	}));
	for(n=0;n<dotsArr.length;n++){
		$('#dotsList').append($("<option/>", {
			value: n,
			text: 'Dot '+(n+1)
		}));
		drawEditDot(n, dotsArr[n].x, dotsArr[n].y);
		addNum++;
	}
}

/*!
 * 
 * DRAW SINGLE POINT - This is the function that runs to draw single point
 * 
 */
function drawEditDot(n,x,y){
	var circle = new createjs.Shape();
	circle.graphics.beginFill(colourDot).drawCircle(0, 0, editDotWidth);
	circle.x = x;
	circle.y = y;
	editContainer.addChild(circle);
	
	circle.cursor = "pointer";
	circle.name = n;
	circle.addEventListener("mousedown", function(evt) {
		toggleDragEvent(evt, 'drag')
	});
	circle.addEventListener("pressmove", function(evt) {
		toggleDragEvent(evt, 'move')
	});
	circle.addEventListener("pressup", function(evt) {
		toggleDragEvent(evt, 'drop')
	});
}

/*!
 * 
 * POINT EVENT - This is the function that runs to for point event handler
 * 
 */
function toggleDragEvent(obj, con){
	checkMouseClick();
	switch(con){
		case 'drag':
			obj.target.offset = {x:obj.target.x-(obj.stageX), y:obj.target.y-(obj.stageY)};
			obj.target.alpha = .5;
			toggleEditDot(obj.target.x, obj.target.y, obj.target.name);
		break;
		
		case 'move':
			obj.target.alpha = .5;
			obj.target.x = (obj.stageX) + obj.target.offset.x;
			obj.target.y = (obj.stageY) + obj.target.offset.y;
			toggleEditDot(obj.target.x, obj.target.y, obj.target.name);
			
			dotsArr[obj.target.name].x = Math.round(obj.target.x);
			dotsArr[obj.target.name].y = Math.round(obj.target.y);
			
			redrawEdit();
		break;
		
		case 'drop':
			obj.target.alpha = 1;
		break;
	}
}

/*!
 * 
 * TOGGLE EDIT POINT - This is the function that runs to toggle edit point
 * 
 */
var editPointNum = -1;
function toggleEditDot(x, y, name){
	curDot = name;
	$('#dotsList').val(name);
	editDot.x = x;
	editDot.y = y;
	editDot.visible = true;
	$('#remove').show();
	$('#addSelected').show();
	editPointNum = name;
}

/*!
 * 
 * REMOVE POINT - This is the function that runs to remove selected point
 * 
 */
function removeDot(){
	var pointNum = editPointNum;
	dotsArr.splice(pointNum, 1);
	editDot.visible = false;
	$('#remove').hide();
	$('#addSelected').hide();
	
	resetEditStage();
	drawEditDots();
	redrawEdit();
}

var mouseClick = false;
function toggleMouseClick(){
	if(mouseClick){
		mouseClick = false;
		$('#pointWrapper').show();
		$('#mouseAdd').val('Add Point by mouse click');
	}else{
		mouseClick = true;
		$('#pointWrapper').hide();
		$('#mouseAdd').val('Cancel add point');
	}
}

function checkMouseClick(){
	if(mouseClick){
		toggleMouseClick();
	}
}