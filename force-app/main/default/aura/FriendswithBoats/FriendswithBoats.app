<aura:application extends="force:slds" implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
    <lightning:layout >
        <div class="slds-grid slds-gutters">
              <div class="slds-col slds-size_2-of-3">
                <c.BoatSearch/>
              </div>
              <div class="slds-col slds-size_1-of-3">
                <span></span>
              </div>
        </div>
    </lightning:layout>
</aura:application>