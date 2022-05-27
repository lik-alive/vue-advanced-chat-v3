<?php

namespace App\Http\Controllers\MessageCenter;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageCenter\RoomCollection;
use App\Http\Resources\MessageCenter\RoomResource;
use App\Models\MessageCenter\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Get a portion of rooms
     * 
     * @param Request $request
     * @return RoomCollection
     */
    function index(Request $request)
    {
        $rooms = Room::whereHas('participants', function ($q) use ($request) {
            $q->where('user_id', \Auth::user()->id);
        })->latest('updated_at')->skip($request->offset)->take($request->limit)->get();

        return new RoomCollection($rooms);
    }

    /**
     * Get a room
     * 
     * @param Room $room
     * @return RoomResource
     */
    function show(Room $room)
    {
        if (is_null($room->me)) {
            abort(403);
        }

        return new RoomResource($room);
    }
}
