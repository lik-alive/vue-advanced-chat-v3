<?php

namespace App\Http\Resources\MessageCenter;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
        $res = [
            '_id' => $this->id,
            'roomId' => $this->room_id,
            'senderId' => $this->participant->user_id,
            'content' => $this->deleted ? '' : $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted' => $this->deleted,
            'subject' => $this->room->name
        ];

        if (count($this->files)) {
            $res['files'] = [];
            foreach ($this->files as $file) {
                $res['files'][] = [
                    'id' => $file->id,
                    'url' => route('api.mc.files.show', $file->id),
                    'name' => $file->name,
                    'size' => $file->size,
                ];
            }
        }

        if (isset($this->reply)) {
            $res['replyMessage'] = [
                'content' => $this->reply->content,
                'senderId' => $this->reply->participant->user_id
            ];

            if (count($this->reply->files)) {
                $file = $this->reply->files[0];
                // Append only the first file
                $res['replyMessage']['files'] = [];
                $res['replyMessage']['files'][] = [
                    'id' => $file->id,
                    'url' => route('api.mc.files.show', $file->id),
                    'name' => $file->name,
                    'size' => $file->size,
                ];
            }
        }

        return $res;
    }
}
