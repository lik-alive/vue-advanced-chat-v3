<?php

namespace App\Http\Resources\MessageCenter;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            '_id' => $this->id,
            'username' => $this->name,
            'avatar' => $this->profile_photo_url
        ];
    }
}
