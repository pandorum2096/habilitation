<?php

namespace App\Http\Controllers;

use App\Profils;
use Illuminate\Http\Request;

class ProfilsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profils = Profils::where("statut","=",1)->get();
        return view('profil.index')->with("profils", $profils);
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
     * @param  \App\Profils  $profils
     * @return \Illuminate\Http\Response
     */
    public function show(Profils $profils)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Profils  $profils
     * @return \Illuminate\Http\Response
     */
    public function edit(Profils $profils)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profils  $profils
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profils $profils)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profils  $profils
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profils $profils)
    {
        //
    }
}
