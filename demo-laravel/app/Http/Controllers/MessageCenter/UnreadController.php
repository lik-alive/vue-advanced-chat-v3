<?php

namespace App\Http\Controllers\MessageCenter;

use App\Actions\MessageCenter\MessageCenter;
use App\Http\Controllers\Controller;
use App\Http\Requests\MessageCenter\MessageRequest;
use App\Http\Resources\MessageCenter\MessageCollection;
use App\Http\Resources\MessageCenter\MessageResource;
use App\Models\MessageCenter\Message;
use App\Models\MessageCenter\Room;

class UnreadController extends Controller
{
    /**
     * Get a portion of unread user's messages
     * 
     * @param MessageRequest $request
     * @return MessageCollection
     */
    public function index()
    {
        $messages = Message::whereHas('room', function ($q) {
            $q->whereHas('me', function ($q) {
                $q->whereColumn('visited_at', '<', 'mc_messages.created_at');
            });
        })->where('deleted', false)->latest('id')->limit(20)->get();;

        return new MessageCollection($messages);
    }
}
