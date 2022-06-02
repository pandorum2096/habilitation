// JavaScript Document
function disableselect(e){
return false;
}

function reEnable(){
return true;
}
 
function dataToString(data) {
	
	var Chaine = "";	
	tmpChainetab = eval(data);
	for (var i in tmpChainetab){
		Chaine = tmpChainetab[i] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Chaine ;
	}
	
	return Chaine;
}
 
function compareNombres(a, b)
{
  return a - b;
}
function compareNombresReverse(a, b)
{
  return b - a;
}
// Tri de tableau associatif suivant les cles
//tri des cles du plus petit au plus grand
function ksort(w)
{
  var sArr = new Array();
  var tArr = new Array();
  var n = 0;
  for (var i in w)
  { 
    tArr[n++] = i;
  }
  tArr = tArr.sort(compareNombres);
  n = tArr.length;
  for (var i=0; i<n; i++) {
    sArr[tArr[i]] = w[tArr[i]];
  }
  return sArr;
} 
//tri des cles du plus grand au plus petit
function krsort(w)
{
  var sArr = new Array();
  var tArr = new Array();
  var n = 0;
  for (var i in w)
  {
    tArr[n++] = i;
  }
  tArr = tArr.sort(compareNombresReverse);
  n = tArr.length;
  for (var i=0; i<n; i++) {
    sArr[tArr[i]] = w[tArr[i]];
  }
  return sArr;
}
