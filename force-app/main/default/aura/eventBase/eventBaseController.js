({
	fireEvent : function(component, event, helper) {
        var compEvent = component.getEvent("eventCmp");
        compEvent.setParam('message', 'hello event');
        compEvent.fire();
	}
})