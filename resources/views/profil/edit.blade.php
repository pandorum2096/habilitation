@extends('layouts.dash')

@section('content')
<div class="container">
<div class="d-flex justify-content-center"><h1>Modification de profil</h1></div>
<hr/>
    <form method="POST" action="{{route("profil.update", $profil->id)}}">

      @csrf
    <div class="row">
        <div class="form-group col-6">
            <label>Code</label>
            <input type="text" readonly="true" class="form-control bg-secondary" name="code" placeholder="Entrer code du profil" value="{{$profil->code}}">
            <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
        </div>
        <div class="form-group col-6">
            <label>Libellé</label>
            <input type="text" class="form-control" name="libelle" placeholder="Entrer libellé du profil" value="{{$profil->libelle}}">
            <!-- <span class="form-text text-muted">We'll never share your email with anyone else.</span> -->
        </div>
    </div>
    <div class="table-responsive card">
        <table class="table table-striped custom-table">
            <thead>
                <tr>
                    <th>Menu</th>
                    <th class="text-center">Tous</th>
                    @foreach( $actions as $act)
                    <th class="text-center">{{ $act->libelle }}</th>
                    @endforeach

                </tr>
            </thead>
            <tbody>

             @foreach($all_menus as $menu)
            <tr>
                <td>{{ucwords($menu->libelle)}}</td>
                <td class="text-center">
                    <input type="checkbox" checked="">
                </td>
                @foreach( $actions as $act)
                <td class="text-center">
                    <input type="checkbox"
                           @if(in_array(array($menu->id, $act->id), $p_menu_action_ids))
                               checked=""
                          @endif
                    >
                </td>
                @endforeach

            </tr>
             @endforeach


            </tbody>
        </table>
    </div>
    <div class="d-flex justify-content-center">
        <button type="submit" id="kt_login_signin_submit" class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">Valider</button>
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
