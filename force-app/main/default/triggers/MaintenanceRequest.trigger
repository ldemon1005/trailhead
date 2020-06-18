trigger MaintenanceRequest on Case (before update, after update) {
    
    List<String> ids = new List<String>();
    
    for(case c : Trigger.New){
        
        if(c.type == 'Repair' || c.type =='Routine Maintenance'){
            
            ids.add(c.Id);
        }
    }
    
    List<case>ClosedCaseList = [SELECT Id, subject, Vehicle__c, vehicle__r.Name, equipment__c, type FROM Case WHERE status = 'closed' and id in :ids];
    
    MaintenanceRequestHelper.updateWorkOrders(ClosedCaseList);
}