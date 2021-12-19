<?php

namespace App\Http\Controllers\MessageCenter;

use App\Http\Controllers\Controller;
use App\Models\MessageCenter\Room;
use Illuminate\Http\Request;

class VisitedAllController extends Controller
{
    /**
     * Set visited status for all unread messages
     * 
     * @param Request $request
     */
    public function store()
    {
        $rooms = Room::whereHas('me', function ($q) {
            $q->whereColumn('visited_at', '<', 'mc_rooms.updated_at');
        })->get();

        foreach ($rooms as $room) {
            $room->me->update(['visited_at' => now()]);
        }

        return 'Success';
    }
}
