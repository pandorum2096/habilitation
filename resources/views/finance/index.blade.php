@extends('layouts.dash')

@section('content')
<div class="container">
    <div class="d-flex justify-content-center">
        <h1>Page finance</h1>
    </div>
    <hr />

    <div class="d-flex justify-content-center">
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Ajouter</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Modifier</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Activer/Desactiver</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Importer</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Exporter</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Valider</button>
        <button type="button" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Refuser</button> 
    </div>

</div>
@endsection



@section('script')
<script type="text/javascript">
    function onload(elt) {
        const men_id = elt.name.split('|')[0];
        const old = document.querySelector("td[id='" + men_id + "']");
        console.log(old);
        if (elt.checked) {
            for (let i = 0; i < old.children.length; i++) {
                console.log(old.children);
                old.children[i].disabled = false;
            }
        } else {
            for (let i = 0; i < old.children.length; i++) {
                if (old.children[i].className != "voir") {
                    old.children[i].disabled = true;
                    old.children[i].checked = false;
                }
            }
        }
    }

    function actived(elt) {
        onload(elt);
    }

    const oldevoir = document.querySelectorAll("input[class='" + "voir" + "']:checked");
    console.log("object", oldevoir);
    for (let i = 0; i < oldevoir.length; i++) {
        onload(oldevoir[i]);
    }
</script>
@endsection