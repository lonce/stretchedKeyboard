/*
	Creates a GUI for aiSound parameters.
	For range pareters:
		slider, textbox (noneditable), param_name
	For text parameters:
		textbox (editable), param_name
*/
export default function(snd, pnum){
	let compObject=document.createElement("object")
	let inp=document.createElement("input")//, { type : 'button', value:'play' });
	let vbox=null

	let inplen=160;
	let vboxlen=40;
	let margin=5

	compObject.appendChild(inp)

	if (  snd.getParam(pnum,"type")=='range' ) {
		inp.setAttribute('type', 'range');
		inp.setAttribute('min', '0');
		inp.setAttribute('max', '1');
		inp.setAttribute('step', '.01');
		inp.setAttribute('value', snd.getParam(pnum,"normval"));
		inp.setAttribute('id', snd.getParam(pnum,"name"));
		inp.style.width=inplen;
		inp.style.margin=margin;

		vbox = document.createElement("input");
		vbox.setAttribute('type', 'text');
		vbox.setAttribute('readOnly', 'true');
		vbox.setAttribute('value', snd.getParam(pnum).toFixed(4));
		vbox.style.width=vboxlen;
		vbox.style.margin=margin;

		compObject.appendChild(vbox)

		inp.addEventListener('input',function(e){
			snd.setParamNorm(e.target.id, e.target.value)
			vbox.setAttribute('value', snd.getParam(pnum).toFixed(4));
		});
	} 

	if ( snd.getParam(pnum,"type")=='string' || snd.getParam(pnum,"type")=='url') {
		inp.setAttribute('type', 'text');
		inp.setAttribute('id', snd.getParam(pnum,"name"));
		inp.setAttribute('value', snd.getParam(pnum));
		inp.style.width=inplen+vboxlen+2*margin; 
		inp.style.margin=margin;

		inp.addEventListener('change',function(e){
			snd.setParam(e.target.id, e.target.value)
		});
	}

	compObject.update=function(id,val){
		inp.value=val;
		snd.setParamNorm(id, val)
		vbox.setAttribute('value', snd.getParam(pnum).toFixed(4));
	}

	let lab= document.createElement("label")
	lab.setAttribute('for', inp.id);
	lab.innerHTML= snd.getParam(pnum,"name");
	compObject.appendChild(lab);

	// getter for slider value
	Object.defineProperty(compObject, 'value', {
		get: function() {return inp.value},
		//set: function(id, v) {inp.value=v, inp.update(id, v)}
	});



	return compObject;
}