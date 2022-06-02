<div class="row justify-content-center">
        <div class="main-wrapper">

            <div class="page-wrapper">
                <div class="content fluid-container">
                    <div class="row">
                        <div class="col-sm-18 col-md-18 col-lg-8 col-xl-9">
                            <h6 class="card-title m-b-20">Module Access</h6>
                            <div class="table-responsive">
                                <form action="{{route('home.store')}}" method="POST">
                                    @csrf
                                    <table class="table table-striped table-responsive custom-table">
                                        <tbody>

                                            @foreach ($menus as $menu)
                                                <tr>
                                                    <td>{{$menu->libelle}}</td>
                                                    <td class="text-center" id="{{$menu->id}}">
                                                        @foreach ($actions as $action)
                                                            @if($action->menu_id==$menu->id || $action->menu_id==null)
                                                                @if($action->libelle=="voir")
                                                                        <input onclick="actived(this)" @if($action->action_id != null && $action->menu_id == $menu->id && $action->profil_id == Auth::user()->profil) checked @endif class="voir" name="{{$menu->id.'|'.$action->idact}}" type="checkbox" /> {{$action->libelle}}
                                                                @else
                                                                        <input @if($action->action_id != null && $action->menu_id == $menu->id && $action->profil_id == Auth::user()->profil) checked @endif name="{{$menu->id.'|'.$action->idact}}" @if($action->action_id == null && $action->menu_id == null) disabled @endif type="checkbox" /> {{$action->libelle}}
                                                                @endif
                                                            @endif
                                                        @endforeach
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                    <input type="submit" value="submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="add_role" class="modal custom-modal fade" role="dialog">
                <div class="modal-dialog">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="modal-content modal-md">
                        <div class="modal-header">
                            <h4 class="modal-title">Add Role</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label>Role Name <span class="text-danger">*</span></label>
                                    <input class="form-control" type="text">
                                </div>
                                <div class="m-t-20 text-center">
                                    <button class="btn btn-primary btn-lg">Create Role</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="edit_role" class="modal custom-modal fade" role="dialog">
                <div class="modal-dialog">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="modal-content modal-md">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Role</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label>Role Name <span class="text-danger">*</span></label>
                                    <input class="form-control" value="Team Leader" type="text">
                                </div>
                                <div class="m-t-20 text-center">
                                    <button class="btn btn-primary btn-lg">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="delete_role" class="modal custom-modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content modal-md">
                        <div class="modal-header">
                            <h4 class="modal-title">Delete Role</h4>
                        </div>
                        <form>
                            <div class="modal-body card-box">
                                <p>Are you sure want to delete this?</p>
                                <div class="m-t-20 text-left">
                                    <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                                    <button type="submit" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>