({
	doInit : function(component, event, helper) {
		helper.fetchContact(component);
	}, 
    update : function(component, event, helper) {
        helper.saveRecord(component);
    }   
})