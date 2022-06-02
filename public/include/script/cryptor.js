function urlDecode(str){
    str=str.replace(new RegExp('\+','g'),' ');
    return unescape(str);
}
function urlEncode(str){
    str=escape(str);
    str=str.replace(new RegExp('\+','g'),'%2B');
    return str.replace(new RegExp('%20','g'),'+');
}

var END_OF_INPUT = -1;

var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function encodeBase64(str){
    setBase64Str(str);
    var result = '';
    var inBuffer = new Array(3);
    var lineCount = 0;
    var done = false;
    while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
        inBuffer[1] = readBase64();
        inBuffer[2] = readBase64();
        result += (base64Chars[ inBuffer[0] >> 2 ]);
        if (inBuffer[1] != END_OF_INPUT){
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
            if (inBuffer[2] != END_OF_INPUT){
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                result += (base64Chars [inBuffer[2] & 0x3F]);
            } else {
                result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                result += ('=');
                done = true;
            }
        } else {
            result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
            result += ('=');
            result += ('=');
            done = true;
        }
        lineCount += 4;
        if (lineCount >= 76){
            result += ('\n');
            lineCount = 0;
        }
    }
    return result;
}
function readReverseBase64(){   
    if (!base64Str) return END_OF_INPUT;
    while (true){      
        if (base64Count >= base64Str.length) return END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]){
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    } 
}

function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}

function decodeBase64(str){
    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT
        && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
        if (inBuffer[2] != END_OF_INPUT){
            result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
            if (inBuffer[3] != END_OF_INPUT){
                result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}

var digitArray = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
function toHex(n){
    var result = ''
    var start = true;
    for (var i=32; i>0;){
        i-=4;
        var digit = (n>>i) & 0xf;
        if (!start || digit != 0){
            start = false;
            result += digitArray[digit];
        }
    }
    return (result==''?'0':result);
}

function pad(str, len, pad){
    var result = str;
    for (var i=str.length; i<len; i++){
        result = pad + result;
    }
    return result;
}

function encodeHex(str){
    var result = "";
    for (var i=0; i<str.length; i++){
        result += pad(toHex(str.charCodeAt(i)&0xff),2,'0');
    }
    return result;
}

function decodeHex(str){
    str = str.replace(new RegExp("s/[^0-9a-zA-Z]//g"));
    var result = "";
    var nextchar = "";
    for (var i=0; i<str.length; i++){
        nextchar += str.charAt(i);
        if (nextchar.length == 2){
            result += ntos(eval('0x'+nextchar));
            nextchar = "";
        }
    }
    return result;
    
}

/********************************************************************************/

values64 = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
"P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
"p","q","r","s","t","u","v","w","x","y","z",
"0","1","2","3","4","5","6","7","8","9","+","/");

function base64_encode(tab)
{
  var resultat ="";
  for (i=0;i<tab.length+1;i+=3)
  {
    if (tab.length < (i+1)) //==i
    {
      return resultat;
    } else if (tab.length == (i+1))
    {
      resultat+=values64[tab[i] >> 2]+values64[(tab[i] << 4)&48]+"==";
      return resultat;
    } else if (tab.length == (i+2))
    {
      resultat+=values64[tab[i] >> 2]+values64[((tab[i] << 4)&48) | (tab[i+1] >> 4)]+values64[(tab[i+1] << 2)&60]+"=";
      return resultat;
    } else
    {
      resultat+=values64[tab[i] >> 2]+values64[((tab[i] << 4)&48) | (tab[i+1] >> 4)]+values64[((tab[i+1] << 2)&60) | (tab[i+2] >>6)]+values64[tab[i+2]&63];
    }
  }
}

function mc4(data,key)
{
  var tab1 = new Array();
  var tab2 = new Array();
  var resultat = new Array();
  for (i=0;i<256;i++)
  {
    tab1[i] = i;
    tab2[i] = key[i%(key.length)];
  }
  var j=0;
  for (var i=0;i<256;i++)
  {
    j= (j+ tab1[i] + tab2[j])%256;
    var temp = tab1[i];
    tab1[i] = tab1[j];
    tab1[j] = temp;
  }
  i=0;j=0;
  for (var k=0;k<data.length;k++)
  {
    i = (i+1)%256;
    j = (j+tab1[i])%256;
    var temp = tab1[i];
    tab1[i] = tab1[j];
    tab1[j] = temp;
    resultat[k] = data[k] ^ tab1[(tab1[i] + tab1[j])%256];
  }
  return resultat;
}

function octet_alea()
{
  return (Math.floor(Math.random()*256));
}

function crypt_text_64(text,password)
{

  text = decodeBase64(text)	
	
  var data = new Array();
  var key = new Array();
  var hash = new Array();
 
  for (var i=0;i<8;i++) 
  {
    data[i] = 0;
    key[i] = octet_alea();
  }
  
  for (var j=0;j<text.length;j++) data[i+j] = text.charCodeAt(j);
  for (var j=0;j<password.length;j++) key[i+j] = password.charCodeAt(j);
  hash = calcmd5(key,0); 
  data = mc4(data,hash);
  for (var i=0;i<8;i++) data[i] = key[i];
  resultat = base64_encode(data);
  return resultat;
}

function crypt_text(text,password)
{
	return crypt_text_ismd(text,password,'1');
}

function crypt_text_ismd(text,password,ismd5)
{
	
  var data = new Array();
  var key = new Array();
  var hash = new Array();
 
  for (var i=0;i<8;i++) 
  {
    data[i] = 0;
    key[i] = octet_alea();
  }
  
  for (var j=0;j<text.length;j++) data[i+j] = text.charCodeAt(j);
  for (var j=0;j<password.length;j++) key[i+j] = password.charCodeAt(j);
  if (ismd5 == 1)
  {
  	hash = calcmd5(key,0); 
  	data = mc4(data, hash);
  }
  else
  	data = mc4(data,key);
  for (var i=0;i<8;i++) data[i] = key[i];
  resultat = base64_encode(data);
  return resultat;
}
