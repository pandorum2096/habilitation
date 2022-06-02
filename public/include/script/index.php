<?php
if(isset($_GET['lang'])) $lang = $_GET['lang'];
else $lang = 'fr';
// les sessions sont nettoyees en cas de timeout
// mais il reste le cas de changement d'Url
// on inclut la partie pour les constantes
include("configuration_w/constantesPHP.conf.php");
include("interface/session/principal/include/str_rand.inc.php");
include ("configuration/label_".$lang.".conf");
//nom du serveur -> slt pendant le developpement..
$POS_SERVEUR = POS_SERVEUR;
$POS_PORT = POS_PORT;
ini_set("session.cookie_path", URL_SITE);
session_start(); 
$_SESSION["sess_crypt_key"] = str_makerand(6, 10, true, true, true);
//var_dump($_SESSION);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<HTML>

<HEAD>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<!--ABASS META-->
	<meta name="keywords" content="sesin">
	<meta name="HandheldFriendly" content="true" />
	<meta name="apple-mobile-web-app-capable" content="YES" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no" />
	<!--ABASS META-->
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
	<link rel="shortcut icon" type="image/x-icon" href="include/assets/img/favicon.ico">
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet">
	<!-- style de seke -->
	<link rel="stylesheet" type="text/css" href="include/ui/assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="include/ui/assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="include/ui/assets/css/style.css">
	<!-- style pour designe du font-end -->
	<link rel="stylesheet" type="text/css" href="include/responsives/css/style_index_php.scss">
	<!-- fin -->
	<TITLE>APPNGSYS</TITLE>
	<!-- script seke bootstrap5 -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
	<!-- script poseidon -->
	<script src="include/script/md5.js"></script>
	<script src="include/script/cryptor.js"></script>
	<SCRIPT language="javascript" src="include/script/yui/build/yuiloader/yuiloader-min.js"></script>
	<SCRIPT language="javascript" src="include/script/yui/build/yahoo-dom-event/yahoo-dom-event.js"></script>
	<SCRIPT language="javascript" src="include/script/yui/build/container/container-min.js"></script>
	<!-- js message -->
	<script type="text/javascript" src="include/ui/assets/js/jquery-3.2.1.min.js"></script>
	<script src="include/Passets/js/message.alert.js"></script>
	<script src="include/script/accueil.js"></script>
	<script>
		var langURL = '<?php echo $_SERVER['REQUEST_URI']; ?>';
		var szCleCrypt = '<?php echo $_SESSION["sess_crypt_key"]; ?>';
		function onEnterProfil(event) {
			if (event.keyCode == 13) {
				document.principal.submit();
			}
		}
	</script>
</HEAD>

<body class="bod">
	<div class="containers">
		<div class="navbars">
			<div class="langues  text-left">
			<a href="#" id="lang" class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle"><img src="include/assets/img/<?php echo $lang; ?>.svg" style="height: 20px;border-radius: 5px;">&nbsp;<?php echo ucfirst($lang); ?> </a>
            <div class="card mt-2 position-absolute" style="z-index:2;" id="listlang">
                <a href="#" class="d-flex col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none lang" data-h="fr"><img src="include/assets/img/fr.svg" style="height: 15px;margin-top: 5px;border-radius: 3px;">&nbsp;<?php echo CST_LIBELLE_TOOLBAR_FRANCAIS; ?></a>
                <a href="#" class="d-flex col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none lang" data-h="en"><img src="include/assets/img/en.svg" style="height: 15px;margin-top: 5px;border-radius: 3px;">&nbsp;<?php echo CST_LIBELLE_TOOLBAR_ANGLAIS; ?></a>
            </div> 
			</div>
		</div> 
		<div class="corpus">
			<div class="gauche">
					<img src="include/responsives/images/Image page acceuil.png" class="ban" />
			</div>
			<div class="droite">
				<div class="images">
					<img src="include/Passets/img/logo-finale.png" width="300px" alt="NGSER">
				</div>
				<div class="formulaires">
								
								<div id="msg-alert"></div>
								<?php include("error.php"); ?>
								<h4><?php echo CST_LOGIN; ?></h4>
								<form NAME='principal' onSubmit='return connexion();' ACTION='interface/session/principal/connexion/ident_db.php' METHOD='post'>
									<input TYPE='hidden' NAME='POS_PORT' value='<?php echo $POS_PORT;?>'>
									<input TYPE='hidden' NAME='POS_SERVEUR' value='<?php echo $POS_SERVEUR;?>'>
									<input TYPE='hidden' NAME='POS_NUM_DOC' value='<?php if(isset($_REQUEST[' POS_NUM_DOC']))
										{echo $_REQUEST['POS_NUM_DOC']; } else echo '' ; ?>'>
									<input TYPE='hidden' NAME='MODE' value='<?php if(isset($_REQUEST[' MODE'])) {echo
										$_REQUEST['MODE']; } else echo '' ; ?>'>
									<input TYPE="hidden" NAME='POS_CONNEXION_AUTO' value='0'>

									<input TYPE="hidden" NAME='POS_QUEST_NOM'
										value="<?php echo (isset($_REQUEST['question'])) ? $_REQUEST['question'] : ''; ?>">
									<input TYPE="hidden" NAME='POS_QUEST_PUBLIC' value='1'>
									<input TYPE="hidden" NAME='POS_QUEST_RES_VAR' value='1'>
									<input TYPE="hidden" NAME='POS_QUEST_NB_VAR' value='1'>
									<input TYPE="hidden" NAME='POS_VAR_RECH_1' value='<?php echo (isset($_REQUEST[' q'])) ?
										$_REQUEST['q'] : '' ; ?>'>
									
									<label for="exampleInputEmail1" class=mt-5><?php echo CST_LIBELLE_BIB_PARTAGE_UTIL; ?></label>
									<div class="input-group input-group-lg">
										<span class="input-group-text" style="padding-left:.2rem !important; padding-right:.2rem !important;background-color: #201a79;" id="inputGroup-sizing-lg"></span>
										<input type="text" class="form-control" id="user" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"  NAME="POS_UTIL" VALUE="<?php if(isset($_REQUEST["POS_UTIL"])) echo $_REQUEST["POS_UTIL"]; else echo ""; ?>" >
										<!-- NAME="POS_UTIL" -->	
										<!-- onKeyUp="javascript:onChangeUser();" onBlur="javascript:onChangeUser();"  -->
									</div>
									
									<label for="exampleInputPassword1" class=mt-3><?php echo CST_LIBELLE_PWD; ?></label>
									<div class="input-group input-group-lg">
										<span class="input-group-text" style="padding-left:.2rem !important; padding-right:.2rem !important;background-color: #201a79;"  id="inputGroup-sizing-lg"></span>
										<input NAME="POS_PASSWORD" type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"  id="exampleInputPassword1" >
										<input NAME="POS_PASSWD" type="hidden">
										<!-- NAME="POS_PASSWD" -->
									</div>
									<div id='div_profil' style='display: none' class="form-group custom-mt-form-group">
										<SELECT class="inputChampSelect" NAME=POS_PROFIL
													onkeydown="onEnterProfil(event);">
											<OPTION VALUE=""> PROFIL1 </OPTION>
										</SELECT>
										<label class="control-label">Profil</label><i class="bar"></i>
									</div>
									<div class="text-right">
										<a href="send_link.php" style="text-decoration: none;" class="small"> <?php echo CST_FORGOT_PWD; ?>?</a>
									</div>
									<div hidden class="form-group custom-mt-form-group">
										<select  NAME="POS_APPLI">
												<option value="APPNGSYS">APPNGSYS</option>
										</select>
										<label class="control-label">Application</label><i class="bar"></i>
									</div>
									<input TYPE="hidden" NAME='STYLE_THEME' value='theme_gris'>
									<div class="form-group text-center custom-mt-form-group">
										<button NAME="Valider" id='btn_valider' style="background-color: #201a79;"   class="btn btn-primary btn-block account-btn" type="submit">Connexion</button>
									</div>
								</form>
				</div>
			</div>
		</div>
		<div class="footers">
			<div class=""><a href="http://" style="text-decoration: none;"><?php echo CST_NEED_HELP; ?>?</a></div>
			<div class=""><a class="mx-2" style="text-decoration: none;" href="http://"> </a></div>
			<div class=""><a href="http://" style="text-decoration: none;"><?php echo CST_PRIVACY_POLICY; ?></a></div>
		</div>
		
	</div>
	<div class="colors"></div>
	<!-- js template -->
	<!-- <script type="text/javascript" src="include/ui/assets/js/jquery-3.2.1.min.js"></script> -->
	<script type="text/javascript" src="include/ui/assets/js/popper.min.js"></script>
	<script type="text/javascript" src="include/ui/assets/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="include/ui/assets/js/jquery.slimscroll.js"></script>
	<script type="text/javascript" src="include/ui/assets/js/app.js"></script>
	<!-- js SweetAlert -->
	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	<!-- js Langue -->
	<script src="include/Passets/js/langage.js"></script>
	<script>
		// message('#msg_alert', 'success', 'msg');
	</script>
</body>

</html>