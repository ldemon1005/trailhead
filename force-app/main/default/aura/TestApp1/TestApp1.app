<aura:application >
	    <c:Typeahead fieldLabel="Contact" 
                 objName="Contact" 
                 selectedId="{!v.contactWrap.accLkp.id}" 
                 selectedLabel="{!v.contactWrap.accLkp.label}" 
                 lookupId="accLkp" 
                 isRequired="true"
    /> 
</aura:application>