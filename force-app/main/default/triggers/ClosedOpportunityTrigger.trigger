trigger ClosedOpportunityTrigger on Opportunity (before insert) {
    List<task> l_task = new List<Task>();
    for(Opportunity opp : Trigger.new){
        if(opp.StageName == 'Closed Won'){
            Task t = new Task();
            t.subject = 'Follow Up Test Task';
            t.WhatId = opp.Id;
            l_task.add(t);
        }
    }
    if(l_task.size() > 0){
        insert l_task;
    }
}