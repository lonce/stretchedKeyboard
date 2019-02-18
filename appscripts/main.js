
import sndFactory from 'https://aisound.cloud/aiSounds/StretchedHarmonics.js'
import polyWog from 'https://aisound.cloud/aisCore/polywog.js'
//import sndFactory from 'http://localhost:8000/aiSounds/StretchedHarmonics.js'
//import polyWog from 'http://localhost:8000/aisCore/polywog.js'

import aiSlider from './aiSlider.js'

//--------------------------
//var audioCtx = new AudioContext();
//var snd = sfactory(audioCtx);

var snd;
var sliderDiv=document.createElement('div');  // append later, after drawing FM tree

var lowNote=48;
var numKeys=25;
var numWhiteKeys=15;


// (for a Monophic sound):  sndFactory().then((newsnd) => {
//Polyphonic sound:
polyWog(sndFactory,numKeys).then(function(newsnd) {
  snd=newsnd; // a polywog wrapper of many instances of the sound

  let nstretchslider=aiSlider(snd, "Note Stretch")
  sliderDiv.appendChild(nstretchslider);
  sliderDiv.appendChild(document.createElement('br'));

  let hstretchslider=aiSlider(snd, "Harmonic Stretch")
  sliderDiv.appendChild(hstretchslider);

  let bothslider=document.createElement("input");
  bothslider.setAttribute('type', 'range');
  bothslider.setAttribute('min', '0');
  bothslider.setAttribute('max', '1');
  bothslider.setAttribute('step', '.01');
  bothslider.setAttribute('value', '.5');
  bothslider.style.margin="30px"

  sliderDiv.appendChild(bothslider)

  let lab= document.createElement("label")
  //lab.setAttribute('for', inp.id);
  lab.innerHTML= "Both";
  sliderDiv.appendChild(lab);

  bothslider.addEventListener("input", function(e){
    console.log("both slider")

    nstretchslider.update("Note Stretch", e.target.value)
    hstretchslider.update("Harmonic Stretch", e.target.value)

  });
/*
  for(let j=0;j<numKeys;j++){
    snd.getSndFromPoly(j).hasOwnParams=true;
  }
*/

});

//--------------------------

console.log("yo, I'm alive!");
var static_xmlns = "http://www.w3.org/2000/svg"


//document.addEventListener('DOMContentLoaded', function() {

console.log("loaded");
var bg = document.getElementById("svg_div")


// Create the svg canvas for the keyboard
var svgelmt = document.createElementNS(static_xmlns, 'svg');
svgelmt.setAttribute('width', '800');
svgelmt.setAttribute('height', '260');
svgelmt.setAttribute('id', 'svg_area');
svgelmt.setAttribute('fill', 'none');
bg.appendChild(svgelmt);

console.log("svgelmt is " + svgelmt)

var m_height = parseFloat(svgelmt.getAttribute("height"));
var m_width  = parseFloat(svgelmt.getAttribute("width"));


console.log("svgelmet width is  " + m_width);
console.log("svgelmet height is  " + m_height);

svgelmt.addEventListener("mousedown", function(ev){
        //console.log("mouse down on bg : " + ev.offsetX + "," + ev.offsetY)
});


var k_keyHeight = parseFloat(svgelmt.getAttribute("height")*5/6);
var k_whiteKeyWidth  = parseFloat(svgelmt.getAttribute("width")/numWhiteKeys);
var k_blackKeyWidth = k_whiteKeyWidth*2/5;


          //------------------------------------------
var makeKeys=function(svgelmt){
  // first identify and assign note attributes
  let key=[]
  var i=0
  for(i=0;i<numKeys;i++){

    key[i] = document.createElementNS(static_xmlns, 'rect');

    key[i].noteNum=i+lowNote;
    // Starting on a 'C' as the 0th key, assign white and black keys
    switch(i%12){
      case 0:
      case 2:
      case 4:
      case 5:
      case 7:
      case 9:
      case 11:
        key[i].keyColor="white"
        break;
      default:
        key[i].keyColor= "black";
    }
    // all keys
    key[i].setAttributeNS(null, 'stroke', "blue"); 
    key[i].setAttributeNS(null, 'fill', key[i].keyColor); 
    key[i].setAttributeNS(null, 'stroke-width', "3px"); 
    key[i].setAttributeNS(null, 'y', -5);  // top of key just a little off screen not to show rounded corners
    key[i].setAttributeNS(null, 'rx', 8);
    key[i].setAttributeNS(null, 'ry', 8);
    key[i].setAttributeNS(null, 'id', key[i].noteNum); 

  }

  // draw the white keys
  let loc=0; // location of left side of key
  for(i=0;i<numKeys;i++){
    if (key[i].keyColor=="white"){
      //white-key specific
      key[i].setAttributeNS(null, 'x', loc);
      key[i].setAttributeNS(null, 'height', k_keyHeight);
      key[i].setAttributeNS(null, 'width', k_whiteKeyWidth);

      //key[i].setAttributeNS(null, 'style', 'fill: white; stroke: black; stroke-width: 1px;' );
      svgelmt.appendChild(key[i]);

      loc +=k_whiteKeyWidth;
    }
  }
  // now draw the black keys "on top" of the white keys
  loc=k_whiteKeyWidth; // loation ref of 1st black key
  for(i=0;i<numKeys; i++){
    if (key[i].keyColor=="black"){
      
    // black-key specific
      let leftloc=loc-k_blackKeyWidth/2;
      if (i%12==1 || i%12 == 6){
        leftloc = leftloc-k_blackKeyWidth/6
      }
      if (i%12==3 || i%12 == 10){
        leftloc = leftloc+k_blackKeyWidth/6
      }
      key[i].setAttributeNS(null, 'x', leftloc);
      key[i].setAttributeNS(null, 'height', k_keyHeight*2/3);
      key[i].setAttributeNS(null, 'width', k_blackKeyWidth);

      //key[i].setAttributeNS(null, 'style', 'fill: white; stroke: black; stroke-width: 1px;' );
      svgelmt.appendChild(key[i]);

      //key[i].setAttributeNS(null, 'style', 'fill: white; stroke: black; stroke-width: 1px;' );
      loc +=k_whiteKeyWidth;  // loc of next black key center
      if ((i%12)==3 || (i%12)==10){
        loc +=k_whiteKeyWidth;
      }
    }
  }
   

  // now add listeners to all keys
  for(i=0;i<numKeys; i++){

    var mouseDown=false;

    key[i].addEventListener("mousedown",function(e){
      //msgBox.value += "mousedown noteNum " + e.target.noteNum + " \n"
      e.target.setAttributeNS(null, 'fill', "green"); 
      e.target.setAttributeNS(null, 'stoke', '#00FF00')
      e.target.setAttributeNS(null, 'stoke-width', "1px")

      snd.setParam("Note Number", e.target.noteNum)
      e.target.snum=snd.play()
      
      mouseDown=true;
    });
    key[i].addEventListener("mouseover",function(e){
      if (mouseDown){
        e.target.setAttributeNS(null, 'fill', "green"); 
        e.target.setAttributeNS(null, 'stoke', '#00FF00')
        e.target.setAttributeNS(null, 'stoke-width', "1px")

        snd.setParam("Note Number", e.target.noteNum)
        e.target.snum=snd.play()        

      }
    });


    key[i].addEventListener("mouseup",function(e){
      e.target.setAttributeNS(null, 'fill', e.target.keyColor); 
      e.target.setAttributeNS(null, 'stoke-color', '#000000')
      e.target.setAttributeNS(null, 'stoke-width', '3px')

      snd.release(0, e.target.snum);
      mouseDown=false;
    });

    key[i].addEventListener("mouseout",function(e){
      if (mouseDown){
        e.target.setAttributeNS(null, 'fill', e.target.keyColor);
        e.target.setAttributeNS(null, 'stoke-color', '#000000')
        e.target.setAttributeNS(null, 'stoke-width', '3px')

        snd.release(0, e.target.snum);
      }
    });


    key[i].addEventListener("touchstart", function(e){
      //msgBox.value += "key press noteNum " + e.target.noteNum + " \n"
      e.preventDefault();
      e.stopImmediatePropagation();
      
      e.target.setAttributeNS(null, 'fill', "green"); 
      e.target.setAttributeNS(null, 'stoke', '#00FF00')
      e.target.setAttributeNS(null, 'stoke-width', "1px")

      snd.setParam("Note Number", e.target.noteNum);
      e.target.snum=snd.play();
      
    }, false);

    key[i].addEventListener("touchend", function(e){
      //msgBox.value += "key press noteNum " + e.target.noteNum + " \n"
      e.preventDefault();
      e.stopImmediatePropagation();

      e.target.setAttributeNS(null, 'fill', e.target.keyColor); 
      e.target.setAttributeNS(null, 'stoke-color', '#000000')
      e.target.setAttributeNS(null, 'stoke-width', '3px')

      snd.release(0, e.target.snum);
      
    }, false);

  } // for all keys
}


makeKeys(svgelmt)

bg.appendChild(sliderDiv)
//++++++++++++++++++++++++++++++++++++++++++++++++++
/*
var msgBox=document.createElement("textarea");
    //msgBox.setAttribute('type', 'text');
    msgBox.style.width="20%";
    msgBox.style.height="200px";
    msgBox.style.margin="10px";
    msgBox.style.borderColor = "red";
    //msgBox.style.stroke="2px";
sliderDiv.appendChild(msgBox)
*/
