/**
 * NoBotForm v1.3
 * Validation to humans submit form
 *
 * Author: Wallace Rio <wallrio@gmail.com>
 *
 */

(function(){

	var self = {};


	this.checklabel = "Select the checkbox";
	this.msgalert = "Select the checkbox";
	this.success = null;
	this.error = null;

	if(this.validateMsg == undefined)
		self.validateMsg =  "OK";
	else
		self.validateMsg = this.validateMsg;


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

				var elementForm = nobotformAll[i].getAttribute('data-nobotform-action');
				if(elementForm != undefined){
					nobotformAll[i].setAttribute('action',elementForm);
					nobotformAll[i].removeAttribute('data-nobotform-action');
				}

				var inputValidate = document.createElement('input');
				inputValidate.type="hidden";
				inputValidate.className="inputValidate";
				nobotformAll[i].appendChild(inputValidate);



				var checklabel = nobotformAll[i].getAttribute('data-checklabel');


				var labelCheck = document.createElement('label');
				labelCheck.className="labelCheck";
				var labelCheckId = 'labelCheck'+i;
				labelCheck.formCurrent = nobotformAll[i];
				labelCheck.setAttribute('for',labelCheckId);
				labelCheck.innerHTML = '<div data-nobotform-check></div><label data-nobotform-label>'+(checklabel || nobotform.checklabel)+'</label>';
				labelCheck.onmouseup = function(){
					var status = this.getAttribute('data-status');
					var validatemsg = this.formCurrent.getAttribute('data-validatemsg') || self.validateMsg;



					if(status == 'active'){
						this.removeAttribute('data-status');
						this.querySelector('[data-nobotform-label]').innerHTML = this.querySelector('[data-nobotform-label]').contentBefore;
					}else{
						this.setAttribute('data-status','active');
						this.querySelector('[data-nobotform-label]').contentBefore = this.querySelector('[data-nobotform-label]').innerHTML;
						this.querySelector('[data-nobotform-label]').innerHTML = validatemsg;
					}
				}
				nobotformAll[i].appendChild(labelCheck);


				nobotformAll[i].onsubmit = function(){

					var inputValidate= this.querySelector('.inputValidate');
					var value = inputValidate.value;
					var msgalert = this.getAttribute('data-msgalert');

					var labelCheck = this.querySelector('.labelCheck');
					var status = labelCheck.getAttribute('data-status');
					if(status == 'active'){
						if(nobotform.success){
							var result = nobotform.success.call(this);



							if(result === false)
								return false;
						}
					}else{

						if(nobotform.error){
							nobotform.error.call(this,msgalert || nobotform.msgalert);
						}else{
							alert(msgalert || nobotform.msgalert);
						}
						return false;
					}




				}
			};
		});
	}

	this.__construct();

	window.nobotform = this;

})();
