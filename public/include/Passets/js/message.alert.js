function message(elt, type, msg) {

    console.log("objAction.msg_erreur")
    let composer = '<div class="alert alert-' + type + ' alert-dismissible show fade"><div class="alert-body"><button class="close" data-dismiss="alert">x</button>' + msg + '</div></div>';
    document.getElementById(elt).innerHTML = composer;
}

// function fonctionAExecuter(user, type, msg) {
//     user.concat("", user);
//     console.log(user)
//     swal({
//         title: msg,
//         text: user,
//         icon: type,
//         button: "Fermer",
//     });
// }