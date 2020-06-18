({
    showSpinner : function(component) {
        var spinner = component.find('spinner');
		$A.util.removeClass(spinner, "slds-hide");
    },
    hideSpinner : function(component) {
        var spinner = component.find('spinner');
		$A.util.addClass(spinner, "slds-hide"); 
    },
    validateInputs: function(component)
    {
    	var contactWrap = component.get("v.contactWrap");
        /** Just added console to verify lookup value binding **/
        console.log('====contactWrap.accLkp.id===',contactWrap.accLkp.id);
        console.log('====contactWrap.accLkp.label===',contactWrap.accLkp.label);
        
        var isValid = true;
      	var lastNmCmp = component.find("ln")
        var lastNmVal = lastNmCmp.get("v.value");

        // is last name empty?
        if ($A.util.isEmpty(lastNmVal)) 
        {
            isValid = false;
            lastNmCmp.set("v.errors", [{message:"You must enter a value"}]);
        } 
        else 
        {
            lastNmCmp.set("v.errors", null);
        }
        // if Id is empty
        if(isValid && $A.util.isEmpty(contactWrap.accLkp.id))
        {
            isValid = false;
            /* if Id is empty but label is not empty => user has typed something in search box 
             * but not selected any value or not closed the searchbox, throw error */
            if(!$A.util.isEmpty(contactWrap.accLkp.label))
            {
                this.fireErrorEvent("accLkp", "Please select value from lookup menu");
            }
            /* if Id is empty & label is empty => required field validation */
            else
            {
                this.fireErrorEvent("accLkp", "You must enter a value");
            }
        } 
        return(isValid);
	},
    fireErrorEvent : function(aljsId, errorMsg)
    {
    	var errorEvt = $A.get("e.c:ALJSErrorEvent");
        errorEvt.setParams({
            "errorMsg" : errorMsg, 
            "aljsId" : aljsId
    	});     
    	errorEvt.fire(); 
	},
    saveRecord : function(component) {
		if(this.validateInputs(component))
        {
            this.showSpinner(component);
            var action = component.get("c.updateContact");
			var contactWrap = component.get("v.contactWrap");
			
            action.setParams({
                "jsonCon" : JSON.stringify(contactWrap), 
            });
			
            action.setCallback(this, function(response) {
                 //store state of response
                 var state = response.getState();
                    
                 if (state === "SUCCESS") { 
                    component.set("v.successMsg","Contact updated successfully");
                    // close the Modal 
                    window.setTimeout(
                        $A.getCallback(function() { 
                            if (component.isValid()) {
                                 var navEvt = $A.get("e.force:navigateToSObject");
                                 if(navEvt != undefined)
                                 {
                                     navEvt.setParams({
                                     "recordId": response.getReturnValue(),
                                     "slideDevName": "related"
                                     });
                                     navEvt.fire(); 
                                 } 
                            }
                        }), 1000
                    );
                }
              else 
              {
                  component.set("v.errorMsgs", response.getError()[0].message);
              }
              this.hideSpinner(component);
          });
           $A.enqueueAction(action);
        }
	},
    
    fetchContact : function(component)
    {
        this.showSpinner(component);
    	var action = component.get("c.getContact");
        var conId = component.get("v.recordId");
        console.log('==conId=',conId);
        action.setParams({
            "conId" : conId
        });
        action.setCallback(this, function(response) {
             //store state of response
             var state = response.getState();
                
             if (state === "SUCCESS") { 
                 var respParsed = JSON.parse(response.getReturnValue());
                 console.log('==Success==', respParsed);
				 component.set("v.contactWrap", respParsed); 	
                 component.set("v.afterLoad", true);  
         	}
          else 
          {
              component.set("v.errorMsgs", response.getError()[0].message);
          }
          this.hideSpinner(component);
      });
        $A.enqueueAction(action); 
	},
    
})