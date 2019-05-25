(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/Holiday.jpg", id:"Holiday"},
		{src:"images/Holiday_Type.png", id:"Holiday_Type"},
		{src:"images/HolidayBlank.jpg", id:"HolidayBlank"},
		{src:"images/HolidayPuzzleLines01.png", id:"HolidayPuzzleLines01"}
	]
};



// symbols:



(lib.Holiday = function() {
	this.initialize(img.Holiday);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,640);


(lib.Holiday_Type = function() {
	this.initialize(img.Holiday_Type);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,640);


(lib.HolidayBlank = function() {
	this.initialize(img.HolidayBlank);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,640);


(lib.HolidayPuzzleLines01 = function() {
	this.initialize(img.HolidayPuzzleLines01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,640);


(lib.puzzleLines = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.HolidayPuzzleLines01();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,960,640);


(lib.p15 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-534.1,-453.2)).s().p("AlzJgQgohxgGg9QgEgnAKg6QANhFAYgWQAegcBGAFQBbAHAUgFQA6gOAcgqQAagmgEgzQgEgxgfgoQgggtgygUQgtgSg+ARIhmAlQg3AUgdgJQgmgMgRhBQgWhUAah4IADgPQCPAJBpgYQBGgQADgnQABgZgjhFQgng1gOgbQgXguAmglQAbgaBIgHQAngFBGgDQBRgKASAEQAmAJALA8QAFAbgKBKQgIBBAOAmQAQAuA5AaQA1AXBGAAQBFABA5gVIAPgGIBmO5ItpBlQgMgogSgzg");
	this.shape.setTransform(53.2,70);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,106.4,140);


(lib.p14 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-439.8,-477.4)).s().p("Am9H7QALh3gJg9QgGgngZg2Qgdg/gdgQQgkgThDAXQhWAdgVAAQg8ABgmghQgigfgIgyQgJgwATgvQAUgzAsggQAngdBAABIBrAKQA8AGAZgQQAigVAAhEQAAhWg3huIgLgYIAIgGQA4gtAZgMQAlgSA0ABQBBABAUAmQAOAbgIA9QgMBgAAAIQgBA6AeAcQAgAfBogDQBlgCAmgdQAmgbgFg1QgOhAgBgjQgBiCBngqQBNgfCbARIA8AFIgEAQQgaB4AWBTQARBCAnAMQAcAJA4gVIBlglQA+gQAtASQAyAUAhAsQAeArAEAxQAFAygaAmQgcAqg6AOQgVAFhagHQhHgFgeAaQgYAXgMBEQgLA7AEAmQAHA+AoBwQASAzALApIwYB5QABggADgng");
	this.shape.setTransform(88.6,57.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177.3,115.8);


(lib.p13 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-339.1,-476.7)).s().p("AmWK0QgohwgGg+QgEgmAKg7QANhEAYgXQAegcBGAFQBbAHAUgFQA6gOAcgqQAagmgEgyQgFgxgegrQgggsgygUQgugQg9AOIhmAlQg3AVgdgJQgmgMgRhAQgWhTAZh4IAWheQB3AEBdgVQBGgQADgnQABgZgkhGQgng1gOgbQgYguAnglQAbgaBIgIQAogEBHgDQBTgLASAFQAlAJALA7QAFAcgKBKQgIBCAOAmQAhBdCEgBQB+gBBfhOIAggaIAMAYQA2BuABBWQAABEgjAVQgZAQg7gGIhsgKQg/gBgoAdQgrAggUAzQgTAvAIAwQAJAyAiAfQAmAhA7gBQAWAABVgdQBDgXAkATQAdAQAdA/QAaA2AFAnQAJA9gKB3QgEAngBAgIvABvIgCgEg");
	this.shape.setTransform(56.7,69.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,113.4,139.4);


(lib.p12 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-241.6,-500.8)).s().p("Am5HzQAKh3gJg9QgFgngag2Qgdg/gdgQQgkgUhDAXQhWAdgVABQg7ABgmgiQgigegJgyQgIgxATguQAUgzArggQAogdA/ABIBsAKQA7AGAZgQQAjgVAAhEQAAhXg3htIgVgrIAggOQBJgiAxABQBCACAUAlQAOAcgIA9QgMBgAAAJQgBA6AfAcQAhAfBogDQBlgDApgdQAkgbgFg1QgPhAAAgjQgCiDBogqQBPggCbASQAzAFAvACIgVBeQgaB4AWBTQARBCAnAMQAcAJA4gVIBlglQA+gQAtASQAyAUAgAsQAfArAEAxQAEAygZAkQgdAqg5AOQgVAFhagHQhHgFgeAcQgYAXgMBEQgLA7AEAmQAHA+AoBwIABAEIv2B2QACgiADgog");
	this.shape.setTransform(88.3,57.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,176.6,114.7);


(lib.p11 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-143.5,-497.9)).s().p("Aoek/QA5ACAzALQBVASAagVQAVgRgPgwQgGgRgjhMQgcg7gBgdQgCgwApgpQAmglA7gSQA7gSAzALQA3ALAWAsQAOAbgHBEQgJBIANAfQAXA3AjAUQAlAUBCgEQBrgGCBgjQASgFBCgeIAVArQA3BtAABXQAABEgjAVQgZAQg7gGIhsgKQg/gBgoAdQgrAggUAyQgTAvAIAxQAJAyAiAeQAmAiA7gBQAVgBBWgdQBDgXAkAUQAdAQAdA/QAaA2AFAnQAJA9gKB3QgDAogCAiIuwBtg");
	this.shape.setTransform(54.4,71.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,108.8,142.4);


(lib.p10 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-512.5,-365.5)).s().p("AkpIoQAMg1AGgdQAMg5ABgqQACg5gTgtQgYg5gvgOQgtgNgeAIQgwAOgVABQhmAEgihrQgOgtAEgxQAFgvAWgiQAYgkAcgEQAPgBAhALQAfAKAQgFQAZgJAVgsQAehDgWiJQgIg3gPg5QAhgSAQgGIAXgJQAhgIAvABQA0ABAWApQAQAeAFBEQAGBkACANQAKA+AeAcQAkAiCDgFQCJgFAngwQAmgagGg0QgNhAgBgjQgBiBBwgqQBKgcCCAKIByQvIgPAGQg6AVhEgBQhHAAg0gXQg5gagRguQgNgmAIhBQAJhKgFgbQgKg8gngJQgSgEhSAKQhGADgoAFQhGAHgbAaQgmAlAYAuQAOAbAmA1QAiBFgCAZQgCAnhEAQQhMARhfAAQglAAgogCg");
	this.shape.setTransform(64.6,55.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,129.3,111);


(lib.p9 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-424.6,-378.7)).s().p("AhrMPQgegcABg6QAAgJANhfQAHg9gOgcQgTglhCgCQg0gBgkASQgZAMg5AtIgIAHQg+h+gKggQgQg2AHgxQAJg9ArgZQAqgZBEgIIBtgOQBjgVAHhxQACgtgQguQgRgugegcQgggdg6AFQgeAChRAVQhJATgmAAQg4gBgfgmQgwg7gFh8QgBgWAAgWIAcAEQBGAIBfgKQBRgIBTgTQBIgRAKgmQAJgfghg/QgYgvACgmQACgvAqgoQAggfAbgNQAagMAsgFQBYgLAeAFQA7AJALA7QAEAWABBPQABBAAPAnQAcBPB3g/QAagNBHgsIAfgTQAOA5AJA3QAVCJgeBDQgUAsgZAJQgRAFgegKQgigLgPABQgcAEgXAkQgWAigFAxQgFAxAOAtQAjBpBlgEQAWgBAvgOQAegIAtANQAwAOAYA5QATAtgCA5QgCAqgMA5QgFAdgNA1Ig8gGQiagRhOAgQhnApACCDQAAAjAOBAQAFA1glAaQgpAdhlADIgRAAQhXAAgegcg");
	this.shape.setTransform(61.2,81.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,122.5,162.3);


(lib.p8 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-328.1,-390.2)).s().p("AmkIjIAAgEQAMg5ACgqQACg5gTgtQgYg5gwgOQgvgOhEAJQhJAOgkABQhlAEgjhrQgOgtAFgxQAFgxAWgiQAXgiAygIQAagEBHADQBAADAegJQAwgNAUgsQAfhEgeh6QgOg3gVg0QA5gOA9gLQBjgTA4ABQBCACAXAcQAQAVgDAvIgFBTQADAwAeAcQAgAfA7gDQA1gDApgdQAkgZgdhUIgZhFQgOgmAAgWQgCh5B2AEQAmACBQAQQA/ANAmAGQAAAWABAWQAFB8AwA7QAfAmA4ABQAmAABJgTQBRgVAegCQA6gFAgAdQAeAcARAuQAQAugCAvQgHBvhjAVIhtAOQhEAIgqAZQgrAZgJA9QgHAxAQA2QAKAgA+B+IggAZQhfBOh+ABQiEABghhdQgOgmAIhCQAKhKgFgbQgLg8gngJQgSgEhTAKQhFADgoAFQhIAHgbAaQgnAlAYAvQAOAaAnA2QAkBFgBAZQgDAnhGARQhOAShhAAIglgBg");
	this.shape.setTransform(86.7,54.8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,173.4,109.6);


(lib.p7 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-225.7,-398.1)).s().p("AiAM+QgfgcABg6QAAgIAMhgQAIg+gOgbQgUgmhCgBQgxgBhJAhIggAPQg1htgJgeQgQg2AGgxQAJg9ArgaQAqgZBEgIIBtgNQBigVgHiUQgDg6gWg5QgVg5gegcQgggdgyAFQgbAChDAVQg9ATgggBQgxAAgfgnQg2hDgYhRQgGgUgEgUQAoAFAsALQBGAQCKAlQC2Ang7jdQgLgrhBhVQg8hPAAgSQgCgxAvgjQAsggBCgHQBEgHA3AZQA7AdAWA8QAHAcgZBCQgYBFAEAiQAEBEAeAlQAiAoA/gEQA3gEBxgVQBmgTA/gRIAhgJQAVA0AOA3QAeB6gfBEQgUAsgvANQgfAJhAgDQhHgDgaAEQgyAIgXAkQgWAigFAvQgEAxAOAtQAiBrBmgEQAjgBBKgOQBEgJAvAOQAvAOAYA5QATAtgCA5QgBAqgMA5IgBAEQgvgCgzgGQibgRhPAfQhoAqACCDQAAAjAPBBQAFA1gmAbQgpAdhlACIgQAAQhZAAgegcg");
	this.shape.setTransform(61.6,85.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,123.2,171.8);


(lib.p6 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-146,-413)).s().p("AnLIeQgzgLg5gDIh+vgQArgNAjgHQCIgaA3AyQAYAWAEAzQABAPgDBSQgCA/AKAgQAOAuAqAQQAdAMBIgPQA/gNAigRQAsgXAIgnQAEgWgIhCQgPh4AQgnQAZg6BugNQA8gHBJAJQADAUAGAUQAYBRA2BDQAfAnAxAAQAgABA9gTQBEgVAagCQAzgFAfAdQAeAcAWA5QAVA5ADA8QAICShiAVIhuANQhEAIgqAZQgrAagIA9QgHAxAQA2QAJAeA2BtQhDAdgSAFQiAAjhrAHQhDAEgigUQgmgVgWg2QgNggAIhHQAIhFgOgbQgXgrg3gMQgygLg7ASQg7ASgmAlQgpApACAxQABAcAbA8QAkBMAFARQAPAvgVARQgOAMggAAQgaAAgngIg");
	this.shape.setTransform(69.4,55.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,138.9,110.1);


(lib.p5 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-512.2,-281.9)).s().p("AiNKhQgegcgKg+QgCgNgGhlQgFhDgQgeQgWgqg0gBQgvgBghAJIgXAJQgQAFghATQgLgqgOgqQgriHAShAQAZhXCMADQApABBBAVQA3AKArglQAjghACgxQACgjgQg0QgTg+gYgcQgigng5ACQgbABhHAbQg9AXgqgHQhngQgCiSQAAgaAGhcQACgiAAgXIO8hvIBpPZQiCgKhKAbQhwAqABCCQABAiANBAQAGA0gmAbQgnAviJAGIgfABQhoAAgggeg");
	this.shape.setTransform(53.6,70.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,107.2,140.6);


(lib.p4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-415.6,-281.2)).s().p("AntJGIgcgEQABhPARhGQAkiMgIgyQgPhdiCAlQgXAHgdAQIgtAZQgzAYgzgcQgqgXgPguQgKgiADg3QADhAAQgfQAWgvA4gMQAbgFBLAIQBBAGAmgQQBggqgiiNQgGgagdhYQgRgygEgdIP1h0QABAXgDAiQgGBcAAAaQADCSBnAQQApAHA+gXQBGgbAbgBQA6gCAhAnQAYAcATA+QAQA0gBAjQgDAxgjAfQgqAng4gKQhBgVgogBQiNgEgYBYQgSBAArCHQAOAqALAqIgfASQhHAtgaANQh3A+gchOQgPgogBhAQgBhPgEgWQgLg6g7gKQgegFhaALQgrAFgZANQgbAMggAfQgqApgCAvQgCAlAYAvQAhA/gJAfQgKAmhIARQhTAThRAJQg1AFgtAAQgkAAgfgDg");
	this.shape.setTransform(88.5,58.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,177.1,117.2);


(lib.p3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-314.1,-304.2)).s().p("AACKeQgcgcgDgwIAFhTQADgvgQgVQgXgchCgCQg4gBhjATQg9ALg5AOQgQglgTgkQg6hpAMhGQAQhbCMADQAoACBBAKQA2ACAsgpQAjggADgxQABghgQg1QgTg+gYgbQgigog5ADQgbABhGAaQg+AXgpgGQhngRgDi+QAAgkAGhyQADgsgBgdIPIhvQAEAdARAyQAdBYAGAZQAiCNhgAqQgmARhBgHQhLgIgbAGQg4AMgWAuQgQAhgDBBQgDA3AKAhQAPAvAqAXQAzAaAzgZIAtgXQAdgQAXgGQCCgmAPBbQAIAygkCNQgRBFgBBPQgmgGg/gNQhQgQgmgCQh2gEACB5QAAAWAOAmIAZBFQAdBUgkAZQgpAdg3ADIgJAAQg0AAgegcg");
	this.shape.setTransform(53.9,69.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,107.9,139.7);


(lib.p2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-217.4,-305.7)).s().p("AjwJUQiJglhGgQQgsgLgogFQgMg+AOg3QAchwgThHQgXhZheAaQgXAHgaAQIgmAZQgpAYgygcQgqgWgPgvQgLgiADg2QADg/AQghQAXguA4gMQAbgGBKAIQBCAHAmgRQBggqgiiNQgHgagdhYQgQgwgEgdIPuh0QABAdgDAsQgGByAAAkQADC+BnARQApAGA+gXQBGgaAbgBQA5gDAiAoQAYAbATA+QAQA1gBAjQgDAvgjAgQgsApg2gCQhBgKgogCQiMgDgQBbQgMBGA6BpQATAkAQAlIghAJQg/ARhmATQhxAVg4AEQg+AEgjgoQgfglgEhEQgEgiAahFQAYhCgHgcQgVg8g+gdQg0gZhEAHQhCAHgsAgQgwAjACAxQABASA8BPQBABVAMArQAxC8h8AAQgWAAgbgGg");
	this.shape.setTransform(88.2,60.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,176.4,120.5);


(lib.p1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Holiday, null, new cjs.Matrix2D(1,0,0,1,-115.3,-328.6)).s().p("AgcLFQgqgQgOguQgJggACg/QAChSgBgPQgEgzgYgWQg2gyiIAaQgjAHgrANIh9vVIO+hvQAEAdARAwQAdBYAGAaQAiCNhfAqQgmARhCgHQhLgIgbAGQg4AMgWAuQgQAhgDBBQgDA2AKAiQAPAvAqAWQAyAaAqgWIAmgZQAZgQAYgHQBdgaAYBZQATBFgdBwQgNA3ALA+QhJgJg7AHQhxANgZA6QgQAnAPB4QAIBCgEAWQgHAngsAXQgjARg/ANQgoAJgaAAQgUAAgNgGg");
	this.shape.setTransform(51.3,71.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,102.6,143);


// stage content:
(lib.AC_Holiday_v3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		//*********************
		// Initialize:
		
		var numPieces = 15;
		
		for (var i = 0; i < numPieces; i++)
		{
			var pieceName = "p" + (i + 1);
			var piece = this[pieceName];
			if( piece ){
				piece.name = pieceName;
				piece.on("mousedown", function(evt) 
				{
					this.scaleX = 1;
					this.scaleY = 1;
					this.shadow = null;
					this.parent.addChild(this);// Bump to top
					this.offset = {x:this.x - evt.stageX, y:this.y - evt.stageY};
				});
				piece.on("pressmove", function(evt) 
				{
					this.x = evt.stageX + this.offset.x;
					this.y = evt.stageY + this.offset.y;
				});
				piece.on("pressup", function(evt) 
				{
					var target = this.parent["t"+this.name.substr(1)];
					if( target && hitTestInRange( target, 60) ){
						this.x = target.x;
						this.y = target.y;
					}
				});
			}
		}
		
		function hitTestInRange( target, range )
		{
			if( target.x > stage.mouseX - range &&
				target.x < stage.mouseX + range &&
				target.y > stage.mouseY - range &&
				target.y < stage.mouseY + range )
			{
				return true;
			}
			return false;
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// pieces
	this.p1 = new lib.p1();
	this.p1.setTransform(910,40,1,1,0,0,0,51.2,71.5);
	this.p1.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p8 = new lib.p8();
	this.p8.setTransform(834,100,1,1,0,0,0,86.7,54.8);
	this.p8.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p9 = new lib.p9();
	this.p9.setTransform(900,233,1,1,0,0,0,61.2,81.2);
	this.p9.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p15 = new lib.p15();
	this.p15.setTransform(525,80,1,1,0,0,0,53.2,70);
	this.p15.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p14 = new lib.p14();
	this.p14.setTransform(300,80,1,1,0,0,0,88.6,57.9);
	this.p14.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p12 = new lib.p12();
	this.p12.setTransform(915,575,1,1,0,0,0,88.3,57.4);
	this.p12.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p11 = new lib.p11();
	this.p11.setTransform(910,356.1,1,1,0,0,0,54.4,71.2);
	this.p11.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p7 = new lib.p7();
	this.p7.setTransform(190,85,1,1,0,0,0,61.6,85.9);
	this.p7.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p6 = new lib.p6();
	this.p6.setTransform(480,50.5,1,1,0,0,0,69.4,55.1);
	this.p6.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p5 = new lib.p5();
	this.p5.setTransform(750,76,1,1,0,0,0,53.6,70.3);
	this.p5.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p4 = new lib.p4();
	this.p4.setTransform(125,73,1,1,0,0,0,88.5,58.6);
	this.p4.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p3 = new lib.p3();
	this.p3.setTransform(888,465,1,1,0,0,0,54,69.9);
	this.p3.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p2 = new lib.p2();
	this.p2.setTransform(635,85,1,1,0,0,0,88.2,60.2);
	this.p2.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p10 = new lib.p10();
	this.p10.setTransform(400,90,1,1,0,0,0,64.6,55.5);
	this.p10.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.p13 = new lib.p13();
	this.p13.setTransform(50,120,1,1,0,0,0,56.6,69.7);
	this.p13.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.p13},{t:this.p10},{t:this.p2},{t:this.p3},{t:this.p4},{t:this.p5},{t:this.p6},{t:this.p7},{t:this.p11},{t:this.p12},{t:this.p14},{t:this.p15},{t:this.p9},{t:this.p8},{t:this.p1}]}).wait(1));

	// type
	this.instance = new lib.Holiday_Type();
	this.instance.setTransform(0,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// targets
	this.t15 = new lib.p15();
	this.t15.setTransform(534.1,453.7,1,1,0,0,0,53.2,70);
	this.t15.alpha = 0.199;

	this.t14 = new lib.p14();
	this.t14.setTransform(439.8,477.9,1,1,0,0,0,88.6,57.9);
	this.t14.alpha = 0.199;

	this.t13 = new lib.p13();
	this.t13.setTransform(339,477.2,1,1,0,0,0,56.6,69.7);
	this.t13.alpha = 0.199;

	this.t12 = new lib.p12();
	this.t12.setTransform(241.7,501.3,1,1,0,0,0,88.3,57.4);
	this.t12.alpha = 0.199;

	this.t11 = new lib.p11();
	this.t11.setTransform(143.6,498.4,1,1,0,0,0,54.4,71.2);
	this.t11.alpha = 0.199;

	this.t10 = new lib.p10();
	this.t10.setTransform(512.5,366,1,1,0,0,0,64.6,55.5);
	this.t10.alpha = 0.199;

	this.t9 = new lib.p9();
	this.t9.setTransform(424.6,379.2,1,1,0,0,0,61.2,81.2);
	this.t9.alpha = 0.199;

	this.t8 = new lib.p8();
	this.t8.setTransform(328.1,390.6,1,1,0,0,0,86.7,54.8);
	this.t8.alpha = 0.199;

	this.t7 = new lib.p7();
	this.t7.setTransform(225.7,398.6,1,1,0,0,0,61.6,85.9);
	this.t7.alpha = 0.199;

	this.t6 = new lib.p6();
	this.t6.setTransform(146,413.5,1,1,0,0,0,69.4,55.1);
	this.t6.alpha = 0.199;

	this.t5 = new lib.p5();
	this.t5.setTransform(512.3,282.4,1,1,0,0,0,53.6,70.3);
	this.t5.alpha = 0.199;

	this.t4 = new lib.p4();
	this.t4.setTransform(415.6,281.7,1,1,0,0,0,88.5,58.6);
	this.t4.alpha = 0.199;

	this.t3 = new lib.p3();
	this.t3.setTransform(314.2,304.7,1,1,0,0,0,54,69.9);
	this.t3.alpha = 0.199;

	this.t2 = new lib.p2();
	this.t2.setTransform(217.4,306.1,1,1,0,0,0,88.2,60.2);
	this.t2.alpha = 0.199;

	this.t1 = new lib.p1();
	this.t1.setTransform(115.3,329,1,1,0,0,0,51.2,71.5);
	this.t1.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.t1},{t:this.t2},{t:this.t3},{t:this.t4},{t:this.t5},{t:this.t6},{t:this.t7},{t:this.t8},{t:this.t9},{t:this.t10},{t:this.t11},{t:this.t12},{t:this.t13},{t:this.t14},{t:this.t15}]}).wait(1));

	// puzzle lines
	this.instance_1 = new lib.puzzleLines();
	this.instance_1.setTransform(480,320.5,1,1,0,0,0,480,320);
	this.instance_1.alpha = 0.352;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base art
	this.instance_2 = new lib.HolidayBlank();
	this.instance_2.setTransform(0,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(480,320.5,960,640);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;