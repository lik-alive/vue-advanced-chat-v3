<?php

namespace App\Http\Controllers\MessageCenter;

use App\Actions\MessageCenter\MessageCenter;
use App\Http\Controllers\Controller;
use App\Http\Requests\MessageCenter\MessageRequest;
use App\Http\Resources\MessageCenter\MessageCollection;
use App\Http\Resources\MessageCenter\MessageResource;
use App\Models\MessageCenter\Message;
use App\Models\MessageCenter\Room;

class MessageController extends Controller
{
    /**
     * Get a portion of room's messages
     * 
     * @param Room $room
     * @param MessageRequest $request
     * @return MessageCollection
     */
    public function index(Room $room, MessageRequest $request)
    {
        $messages = $room->messages->skip($request->offset)->take($request->limit);

        return new MessageCollection($messages);
    }

    /**
     * Get a message
     * 
     * @param Message $message
     * @param MessageRequest $request
     * @return MessageResource
     */
    public function show(Message $message, MessageRequest $request)
    {
        return new MessageResource($message);
    }

    /**
     * Create a message
     * 
     * @param Room $room
     * @param MessageRequest $request
     * @return Response
     */
    public function store(Room $room, MessageRequest $request)
    {
        return MessageCenter::SendMessage($room, $request->validated(), $request->file('files'), \Auth::user());
    }

    /**
     * Update a message
     * 
     * @param Message $message
     * @param MessageRequest $request
     * @return Response
     */
    public function update(Message $message, MessageRequest $request)
    {
        MessageCenter::EditMessage($message, $request->validated(), $request->file('files'));
        return 'Success';
    }

    /**
     * Delete a message
     * 
     * @param Message $message
     * @param MessageRequest $request
     * @return Response
     */
    public function destroy(Message $message, MessageRequest $request)
    {
        MessageCenter::DeleteMessage($message);
        return 'Success';
    }
}
