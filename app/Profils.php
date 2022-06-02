<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profils extends Model
{
    protected $fillable = [
        'libelle', 'statut', 'code'
    ];
}
