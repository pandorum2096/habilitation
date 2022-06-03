<?php

namespace App\Http\Controllers;

use App\Menus;
use App\Permission;
use App\Action;
use Illuminate\Http\Request;
use Auth;

class MenusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Menus  $menus
     * @return \Illuminate\Http\Response
     */
    public function show(Menus $menus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Menus  $menus
     * @return \Illuminate\Http\Response
     */
    public function edit(Menus $menus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Menus  $menus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menus $menus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Menus  $menus
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menus $menus)
    {

    }

    public function achat()
    {
        $user = Auth::user()->profil_id;

        $permissions = Permission::join('menuses', 'menuses.id', 'permissions.menu_id')
                                    ->join('actions', 'actions.id', 'permissions.action_id')
                                    ->where('menuses.libelle','Achat')->where('permissions.profil_id', $user)
                                    ->select('actions.*')->orderBy("actions.position")->get();

        return view("achat.index", compact('permissions'));
    }

    public function finance()
    {
        $user = Auth::user()->profil_id;

        $permissions = Permission::join('menuses', 'menuses.id', 'permissions.menu_id')
                                    ->join('actions', 'actions.id', 'permissions.action_id')
                                    ->where('menuses.libelle','Finance')->where('permissions.profil_id', $user)
                                    ->select('actions.*')->orderBy("actions.position")->get();

        return view("finance.index", compact('permissions'));
    }

    public function commercial()
    {
        $user = Auth::user()->profil_id;

        $permissions = Permission::join('menuses', 'menuses.id', 'permissions.menu_id')
                                    ->join('actions', 'actions.id', 'permissions.action_id')
                                    ->where('menuses.libelle','Commercial')->where('permissions.profil_id', $user)
                                    ->select('actions.*')->orderBy("actions.position")->get();

        return view("commercial.index", compact('permissions'));
    }
}
