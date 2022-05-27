<?php

namespace App\Models\MessageCenter;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'mc_messages';

    protected $fillable = ['content', 'deleted'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $with = ['reply', 'files'];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function reply()
    {
        return $this->belongsTo(Message::class, 'reply_id');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
