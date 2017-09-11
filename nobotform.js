/**
 * NoBotForm v1.2
 * Validation to humans submit form
 * 
 * Author: Wallace Rio <wallrio@gmail.com>
 * 
 */

(function(){

	this.checklabel = "Select the checkbox";
	this.msgalert = "Select the checkbox";
	this.success = null;
	this.error = null;

	/**
	 * [addEvent description]
	 * 
	 */
	this.addEvent  = function(objs,event,callback,mode,par1,par2){		
		if(mode == undefined)
			mode = true;

		if(objs == undefined)
			objs = window; 
		if(objs.addEventListener){ 				
			return objs.addEventListener(event,function(e){
				if(callback)
					return callback(e,objs,par1,par2);
			},mode); 
		}else if(objs.attachEvent){
			return objs.attachEvent('on'+event,function(e){
				if(callback)
					return callback(e,objs,par1,par2);
			}); 
		}
	};

	/**
	 * [__construct description]
	 * @return {[type]} [description]
	 */
	this.__construct = function(){
		this.addEvent(window,'load',function(){
			var nobotformAll = document.querySelectorAll('.nobotform');			
			for (var i = 0; i < nobotformAll.length; i++) {
				
				var inputValidate = document.createElement('input');
				inputValidate.type="hidden";
				inputValidate.className="inputValidate";
				nobotformAll[i].appendChild(inputValidate);

				

				var checklabel = nobotformAll[i].getAttribute('data-checklabel');

				var labelCheck = document.createElement('label');				
				labelCheck.className="labelCheck";
				var labelCheckId = 'labelCheck'+i;
				labelCheck.setAttribute('for',labelCheckId);
				labelCheck.innerHTML = '<input id="'+labelCheckId+'" type="checkbox" class="inputCheck" ><span class="spanCheck"></span>'+(checklabel || nobotform.checklabel);
				nobotformAll[i].appendChild(labelCheck);

				nobotformAll[i].querySelector('.inputCheck').calcValidate1 = Math.random();
				nobotformAll[i].querySelector('.inputCheck').calcValidate2 = Math.random();

				nobotformAll[i].querySelector('.inputCheck').onclick = function(e){
					var calcValidate1 = this.calcValidate1;	
					var calcValidate2 = this.calcValidate2;	

					var inputValidate= this.parentNode.parentNode.querySelector('.inputValidate');
					if(this.checked == true){
						inputValidate.value = calcValidate1 + calcValidate2;
						return;
					}					
					inputValidate.value = "";					
				}	

				nobotformAll[i].onsubmit = function(){
					var inputValidate= this.querySelector('.inputValidate');
					var value = inputValidate.value;
					var msgalert = this.getAttribute('data-msgalert');
					var inputCheck = this.querySelector('.inputCheck');
					var valCheck = this.querySelector('.inputCheck').id;

					var calcValidate1 = this.querySelector('.inputCheck').calcValidate1;	
					var calcValidate2 = this.querySelector('.inputCheck').calcValidate2;	

					if( inputCheck.checked != true || value != (calcValidate1+calcValidate2) ){								
						if(nobotform.error){
							nobotform.error.call(this,msgalert || nobotform.msgalert);
						}else{
							alert(msgalert || nobotform.msgalert);
						}
						return false;	
					}else{
						if(nobotform.success){
							var result = nobotform.success.call(this);
							
							if(result === false)
								return false;
						}
					}

					
				}
			};
		});
	}

	this.__construct();

	window.nobotform = this;

})();

