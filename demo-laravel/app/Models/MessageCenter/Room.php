<?php

namespace App\Models\MessageCenter;

use Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $table = 'mc_rooms';

    protected $fillable = ['name'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $with = ['lastMessage'];

    protected $appends = ['visited_at', 'participant_ids', 'unread_count'];

    public function messages()
    {
        return $this->hasMany(Message::class)->latest('id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function lastMessage()
    {
        return $this->hasOne(Message::class)->latest('id');
    }

    public function getUserIdsAttribute()
    {
        return $this->participants->pluck('user_id')->all();
    }

    public function me()
    {
        if (is_null(Auth::user())) return null;

        return $this->hasOne(Participant::class)->where('user_id', Auth::user()->id);
    }

    public function getVisitedAtAttribute()
    {
        return optional($this->me)->visited_at;
    }

    public function getUnreadCountAttribute()
    {
        if (is_null(Auth::user())) return null;

        return $this->messages->where('participant_id', '<>', $this->me->id)->where('created_at', '>', $this->visited_at)->count();
    }
}
