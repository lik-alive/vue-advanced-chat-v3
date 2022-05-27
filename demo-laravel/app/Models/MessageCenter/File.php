<?php

namespace App\Models\MessageCenter;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table = 'mc_files';

    public $timestamps = false;

    protected $fillable = [];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }
}
