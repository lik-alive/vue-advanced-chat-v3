<?php

namespace App\Models\MessageCenter;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $table = 'mc_participants';

    public $timestamps = false;

    protected $fillable = ['visited_at', 'notified_at'];

    protected $casts = [
        'visited_at' => 'datetime',
        'notified_at' => 'datetime'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUsernameAttribute()
    {
        return trim("{$this->user->last_name} {$this->user->first_name} {$this->user->patronymic}");
    }
}
