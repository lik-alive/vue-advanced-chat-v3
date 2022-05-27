<?php

namespace App\Events\MessageCenter;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageUpdate implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $queue = 'mc-echo';

  protected $user_id;
  protected $messageResource;

  /**
   * Create a new event instance
   *
   * @return void
   */
  public function __construct($user_id, $messageResource)
  {
    $this->user_id = $user_id;
    $this->messageResource = $messageResource;
  }

  /**
   * Get the channels the event should broadcast on
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn()
  {
    return new PrivateChannel("user.$this->user_id");
  }

  /**
   * Get the data to broadcast.
   *
   * @return array
   */
  public function broadcastWith()
  {
    return ['message' => $this->messageResource];
  }
}
