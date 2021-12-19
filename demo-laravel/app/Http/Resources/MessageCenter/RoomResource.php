<?php

namespace App\Http\Resources\MessageCenter;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'roomId' => $this->id,
            'roomName' => $this->name,
            'unreadCount' => $this->unread_count,
            'updated_at' => $this->updated_at,
            'lastMessage' => new MessageResource($this->lastMessage),
            'readonly' => (bool)$this->readonly,
            'userIds' => $this->user_ids,
            'visited_at' => $this->visited_at
        ];
    }
}
