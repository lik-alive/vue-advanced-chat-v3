<?php

namespace App\Actions\MessageCenter;

use App\Events\MessageCenter\MessageUpdate;
use App\Http\Resources\MessageCenter\MessageResource;
use App\Models\MessageCenter\File as RoomFile;
use App\Models\MessageCenter\Message;
use App\Models\MessageCenter\Participant;
use App\Models\MessageCenter\Room;
use App\Models\User;
use \Illuminate\Http\File as ServerFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MessageCenter
{
  /**
   * Create a room
   * 
   * @param string Room name
   * @param array Participants
   * @param boolean Readonly for users
   * @param boolean New messages are duplicated via email
   * @param boolean Contains robot among users
   * @return Room
   */
  public static function CreateRoom($name, $users = [], $readonly = false)
  {
    DB::beginTransaction();

    // Create a room
    $room = Room::forceCreate([
      'name' => $name,
      'readonly' => $readonly,
      'mailable' => true,
    ]);

    // Add participants
    foreach ($users as $user) {
      Participant::forceCreate([
        'room_id' => $room->id,
        'user_id' => $user->id
      ]);
    }

    DB::commit();

    return $room;
  }

  /**
   * Create a message
   * 
   * @param Room $room
   * @param array|string $data [content, reply_id, filename]
   * @param UploadedFile|string $file
   * @param App\Models\User $user
   * @param bool $forceMail
   * @return int $id
   */
  public static function SendMessage(Room $room, $data, $files = null, User $user)
  {
    // Convert text content to array representation
    $data = is_string($data) ? ['content' => $data] : $data;

    $participant = $room->participants->where('user_id', $user->id)->first();

    DB::beginTransaction();

    // Save message
    $message = Message::forceCreate([
      'room_id' => $room->id,
      'participant_id' => $participant->id,
      'content' => $data['content'] ?? "",
      'reply_id' => $data['reply_id'] ?? null
    ]);

    // Save file
    MessageCenter::saveFiles($message, $files);

    // Reniew room's update_at
    $room->touch();

    DB::commit();

    // Notify only if the message is from admin
    MessageCenter::notifyAll($message->fresh());

    return $message->id;
  }

  /**
   * Edit a message
   * 
   * @param Message $message
   * @param array|string $data [content, filename]
   * @param UploadedFile $file
   * @return void
   */
  public static function EditMessage(Message $message, $data, $files = null)
  {
    // Convert text content to array representation
    $data = is_string($data) ? ['content' => $data] : $data;

    DB::beginTransaction();

    // Update message
    $message->update([
      'content' => $data['content'] ?? "",
    ]);

    // Delete file
    MessageCenter::deleteFile($message, $data['files_loaded']);

    // Save file
    MessageCenter::saveFiles($message, $files);

    DB::commit();

    MessageCenter::notifyAll($message);
  }

  /**
   * Delete a message
   * 
   * @param Message $message
   * @return void
   */
  public static function DeleteMessage(Message $message)
  {
    DB::beginTransaction();

    // Set deleted flag
    $message->update([
      'deleted' => true
    ]);

    // Delete file
    MessageCenter::deleteFile($message);

    DB::commit();

    MessageCenter::notifyAll($message);
  }


  /**
   * Save a file to DB and FS
   * 
   * @param Message $message
   * @param UploadedFile|string $file
   */
  private static function saveFiles($message, $files)
  {
    if (empty($files)) return;

    foreach ($files as $file) {
      if ($file instanceof UploadedFile) {
        $path = $file->store("mc/{$message->room_id}");
      } else if (is_string($file)) {
        $path = Storage::putFile("mc/{$message->room_id}", new ServerFile($file));
      }

      RoomFile::forceCreate([
        'message_id' => $message->id,
        'name' => $file->getClientOriginalName(),
        'size' => Storage::size($path),
        'path' => $path
      ]);
    }
  }

  /**
   * Delete a file from DB and FS
   * 
   * @param Message $message
   * @param Array $except
   * @return void
   */
  private static function deleteFile($message, $except = [])
  {
    foreach ($message->files as $file) {
      if (in_array($file->id, $except, true)) continue;

      Storage::delete($file->path);
      $file->delete();
    }
  }

  /**
   * Notify all participants about changes in a message
   * 
   * @param Message $message
   * @param bool Send email notification
   * @return void
   */
  private static function notifyAll($message)
  {
    $messageResource = new MessageResource($message);

    // Websocket updates
    foreach ($message->room->participants as $participant) {
      broadcast(new MessageUpdate($participant->user_id, $messageResource))->toOthers();
    }
  }
}
