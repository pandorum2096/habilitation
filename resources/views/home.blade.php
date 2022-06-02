@extends('layouts.dash')

@section('content')
<div class="container">
    <div class="row">
        <div class="form-group col-6">
            <label>Code</label>
            <input type="text" class="form-control" placeholder="Entrer code du profil">
            <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
        </div>
        <div class="form-group col-6">
            <label>Libellé</label>
            <input type="text" class="form-control" placeholder="Entrer libellé du profil">
            <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
        </div>
    </div>
    <table></table>
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