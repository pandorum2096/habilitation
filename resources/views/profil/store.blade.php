@extends('layouts.dash')

@section('content')
<div class="container">
    <div class="d-flex justify-content-center">
        <h1>Creation de profil</h1>
    </div>
    <hr />
    <div class="row">
        <form method="post" action="{{route('profil.store')}}">
            @csrf
            <div class="form-group col-6">
                <label>Code</label>
                <input type="text" name="code" class="form-control" placeholder="Entrer code du profil">
                <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
            </div>
            <div class="form-group col-6">
                <label>Libellé</label>
                <input type="text" name="libelle" class="form-control" placeholder="Entrer libellé du profil">
                <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
            </div>
       
    </div>
    <div class="table-responsive card">
        <table class="table table-striped custom-table">
            <thead>
                <tr>
                    <th>Menu</th>
                    <th class="text-center">Tous</th>
                    <th class="text-center">Voir</th>
                    <th class="text-center">Ajouter</th>
                    <th class="text-center">Modifier</th>
                    <th class="text-center">Activer/Desactiver</th>
                    <th class="text-center">Importer</th>
                    <th class="text-center">Exporter</th>
                    <th class="text-center">Valider</th>
                    <th class="text-center">Refuser</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Achat</td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                </tr>
                <tr>
                    <td>Finance</td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                    <td class="text-center">
                        <input type="checkbox">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="d-flex justify-content-center"> 
        <button type="submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Valider</button>
        <a href="{{route('profil.index')}}" class="btn btn-light-primary font-weight-bolder px-8 py-4 my-3 font-size-lg">
            <span class="svg-icon svg-icon-md">
            </span>Annuler</a>
    </div>
    </form>
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