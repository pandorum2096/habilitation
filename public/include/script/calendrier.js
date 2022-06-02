var champ_date = new Object();
var x,y,oldx,oldy;
var nbClick=0;
var largeurCalendrier = 165;

nbJoursMoisTableau = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var tabMois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre",
		"Octobre", "Novembre", "Décembre");
var tabJour = ["Lu","Ma","Me","Je","Ve","Sa","Di"];        
		
document.write("<DIV id='cal' style='position:absolute;top:0;left:0;visibility:hidden;z-index:1'></DIV>");

function ouvrir_calendrier(champ)
{
    if(nbClick%2 != 1)
    {
        champ_date = eval(champ);
        var xy = YAHOO.util.Dom.getXY(champ_date);
        x = xy[0] + champ_date.offsetWidth + 20;
        y = xy[1];
        // si le calendrier depasse de la page, decalage vers le bas et vers la gauche
        if (x + largeurCalendrier > document.body.clientWidth)
        {
            y += 20;
            x = document.body.clientWidth - largeurCalendrier;
        }
        charger_calendrier();
    }
    else
    {
    	document.getElementById("cal").innerHTML=s;
    	document.getElementById("cal").style.visibility="hidden";
    }
    nbClick = nbClick + 1;
}

function annee_sur_4(annee) { return (annee < 1000) ? annee + 1900 : annee; }

function charger_calendrier()
{
	if (champ_date && champ_date.value.length != 0)
	{
		reg_exp=/^(\d){2}\/(\d){2}\/(\d){4}$/;
		if(reg_exp.test(champ_date.value))
		{
			a = champ_date.value.substring(6,10);
			m = champ_date.value.substring(3,5);
			j = champ_date.value.substring(0,2);
			afficher_calendrier(a, m - 1, j);
		}
		else
			afficher_calendrier();
	}	
	else
		afficher_calendrier();
	
}

function afficher_calendrier(annee, mois, jour)
{
    s = "";
    var cpt;
    var d = new Date();
	var today_annee = annee_sur_4(d.getYear());
	var today_mois = d.getMonth();
	var today_jour = d.getDate();
    var affiche_today = false;
    var affiche_selected = false;
        
	if (afficher_calendrier.arguments.length == 0)
	{ 
		d = new Date();
		// Gestion de l'annee systeme.
		annee = annee_sur_4(d.getYear());
		// Gestion du mois systeme.
		mois = d.getMonth();
		jour = d.getDate();
	}	
    else
    {
  	    if(oldx != 'undefined' && document.getElementById("cal").style.visibility == "visible")
        {
            x=oldx;
            y=oldy; 
        }
  	    document.getElementById("cal").innerHTML=s;
    	document.getElementById("cal").style.visibility="hidden";
    }
    
    if (today_annee == annee && today_mois == mois)
        affiche_today = true;    

	// Affichage des SELECT mois et annee par selection.
	s +="<div class='calendrier'>";
	s +="<div class='select-year-month'>&nbsp;<SELECT id='cal-mois' onChange='afficher_calendrier(document.getElementById(\"cal-annee\").options[document.getElementById(\"cal-annee\").selectedIndex].value, document.getElementById(\"cal-mois\").options[document.getElementById(\"cal-mois\").selectedIndex].value, 0)'>";
			
	for (cpt = 0; cpt < 12 ; cpt++)
	{
		select = (mois == cpt) ? " SELECTED>" : ">";
		s +="<option value=";
		s +=cpt;
		s += select;
		s += tabMois[cpt];
		s += "</option>";
	}
	s +="</SELECT>&nbsp;&nbsp;";
	s +="<SELECT id='cal-annee' onChange='afficher_calendrier(document.getElementById(\"cal-annee\").options[document.getElementById(\"cal-annee\").selectedIndex].value, document.getElementById(\"cal-mois\").options[document.getElementById(\"cal-mois\").selectedIndex].value, 0)'>";

	debutSelect = parseInt(annee) - parseInt(5);
	finSelect = parseInt(annee) + parseInt(5);
	for (cpt = debutSelect; cpt <= finSelect ; cpt++)
	{
		select = (annee == cpt) ? " SELECTED>" : ">";
		s +="<OPTION value=";
		s +=cpt;
		s += select;
		s += cpt;
		s += "</OPTION>";
	}
	s +="</SELECT>";
    s +="&nbsp;<a href='javascript:void(0);' onClick='closeCalendrier();'><img src='../../../../images/icons/close_onglet.gif' border='0'></a>";
    s +="</div>";
	// quel jour de la semaine est le premier jour du mois
	jour_semaine = new Date(annee, mois, 1).getDay();
	// conversion du dimanche pour obtenir les jours dans le meme 
	// ordre que dans le tableau
	if (jour_semaine == 0) jour_semaine = 7;
	// nombre de jour du mois
	nbJoursMois = nbJoursMoisTableau[mois];
	// correction pour le mois de fevrier
	if (mois == 1)
	{
		if (annee%4 == 0 && annee%100 !=0 || annee%400 == 0)
			nbJoursMois = (nbJoursMoisTableau[mois])+1;
	}
	  	
	s += "<TABLE class='calendrier'>\n";
	s += "<TR class='calendrier'>\n";
    for (cpt = 0; cpt < tabJour.length ; cpt++) {
        s += "<TH class='calendrier'>"+tabJour[cpt]+"</TH>";
    }
	s += "</TR>";

	// boucle sur les lignes (affichage de 7 lignes, le maximum necessaire
	// pour afficher 31 jours dans le pire des cas)
	for (i=1; i<7; i++)
	{
		s += "<TR>\n";
		// boucle sur les colonnes (nombre de jours = 7)
		for (j=1;j<8;j++)
		{
			if ((i == 1 && j<jour_semaine) || (j + (i-1)*7) >= (nbJoursMois + jour_semaine))
				s += "<TD> &nbsp; </TD>";
			// debut de l'ecriture des jours 
			else
			{
				numJour = (j + (i-1)*7) - jour_semaine + 1;
				// jour selectionne
				if (jour == numJour)
					s += "<TD class='jourSelect'>\n";
				else if (today_jour == numJour && affiche_today)
					s += "<TD class='jourToday'>\n";
				// samedi et dimanche 
				else if ((j == 6) || (j == 7))
					s += "<TD class='jourFerie'>\n";
				else
					s += "<TD class='jour'>\n";

				s += "<A HREF='javascript:valider(" + numJour + ", " + mois + "," + annee + ")'>" + numJour + "</A></TD>\n";
			}
		}

		s += "</TR>\n";
	}
	s += "</TABLE>";

    oldx=x;
    oldy=y;

    document.getElementById("cal").innerHTML=s;
	document.getElementById("cal").style.height="auto";
	document.getElementById("cal").style.left=x + "px";
	document.getElementById("cal").style.top=y + "px";
	document.getElementById("cal").style.visibility="visible";
}

function valider(jour, mois, annee)
{	
	mois+=1;
	if (mois<10)
	{
		mois="0"+mois;
	}
	
	if (jour<10)
	{
		jour="0"+jour;
	}
	
	dateFormattee = jour + "/" + mois + "/" + annee_sur_4(annee);
	
	if(champ_date.readOnly != true)
	{
        champ_date.value = dateFormattee;
		  champ_date.focus();
		  champ_date.blur();
	}

	document.getElementById("cal").innerHTML=s;
	document.getElementById("cal").style.visibility="hidden";
  	nbClick = nbClick + 1;
}

function isCalendrierOpen() {
    return document.getElementById("cal").style.visibility != "hidden";
}

function closeCalendrier() {
    if (isCalendrierOpen()) {
        document.getElementById("cal").style.visibility="hidden";
        nbClick=0;
    }
}
