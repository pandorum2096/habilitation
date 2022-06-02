
function remarques() 
{
	var chaine;
	var rien;
	chaine="<u>Remarques :</u> ";
	rien=1;

	if(document.principal.POS_TYPEDOC.value == "RAP" || document.principal.POS_TYPEDOC.value == "RAG")
	{
	  if(document.forms['principal'].elements['POS_OLD_VAL_RUB_R_R'].value != "" )  {
		chaine+=" du rédacteur";
		rien=0;
	   }
	
	  if (document.forms['principal'].elements['POS_OLD_VAL_RUB_R_A'].value != "")  {
		if (rien==0) chaine+=",";
		chaine+=" de l'ADJ CDS";
		rien=0;
	  }	  
	}

	if(document.principal.POS_TYPEDOC.value == "DEP")
	{

	  if (document.forms['principal'].elements['POS_OLD_VAL_RUB_R_O'].value != "" )  {
		if (rien==0) chaine+=",";
		chaine+=" de la Coordination";
		rien=0;
	  }
	  if (document.forms['principal'].elements['POS_OLD_VAL_RUB_R_S'].value != "" )  {
		if (rien==0) chaine+=",";
		chaine+=" du SG";
		rien=0;
	  }

	}
	

	if (rien==1 && document.principal.POS_TYPEDOC.value != "RAP" && document.principal.POS_TYPEDOC.value != "DEP")
	{
		chaine="Aucune remarque";
	}

	document.write(chaine);

}