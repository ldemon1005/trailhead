({
    doInit : function(component, event, helper) {  
    },
    
    doSearch : function(component, event, helper) {
        var params = event.getParam('arguments');
        component.set("v.boatTypeId", params.boatTypeId);
        helper.onSearch(component);
    },
    onBoatSelect : function(component, event, helper) {
        var eve = event.getParam('boatId');
        component.set("v.selectedBoatId",eve);
    },
})