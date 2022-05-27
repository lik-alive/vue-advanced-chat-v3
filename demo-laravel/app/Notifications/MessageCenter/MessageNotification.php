<?php

namespace App\Notifications\MessageCenter;

use App\Actions\MessageCenter\FormatString;
use App\Notifications\ThrottleNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class MessageNotification extends Notification implements ShouldQueue
{
  use Queueable;

  protected $message;

  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct($message)
  {
    $this->message = $message;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @param  mixed  $notifiable
   * @return array
   */
  public function via($notifiable)
  {
    return ['mail'];
  }

  /**
   * Get the mail representation of the notification.
   *
   * @param  mixed  $notifiable
   * @return \Illuminate\Notifications\Messages\MailMessage
   */
  public function toMail($notifiable)
  {
    $message = $this->message;
    $html = $this->formatContent($message->content);

    return (new MailMessage)
      ->subject("[WebHelper] " . $message->room->name)
      ->greeting("Hola!")
      ->line(new HtmlString(nl2br($html)))
      ->action('Visit chat room', url('/messenger?room=' . $message->room_id));
  }

  /**
   * Convert content to HTML
   * 
   * @param string Content
   * @return string
   */
  private function formatContent($content)
  {
    $html = FormatString::Format($content);
    return $html;
  }
}
