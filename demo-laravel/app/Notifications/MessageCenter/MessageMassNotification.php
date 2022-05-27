<?php

namespace App\Notifications\MessageCenter;

use App\Actions\MessageCenter\FormatString;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class MessageMassNotification extends Notification implements ShouldQueue
{
  use Queueable;

  protected $messages;

  /**
   * Create a new notification instance.
   *
   * @return void
   */
  public function __construct($messages)
  {
    $this->messages = $messages;
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
    $messages = $this->messages;
    $html = "";
    foreach ($messages as $message) {
      $html .= $message->participant->username . ": " . $this->formatContent($message->content) . "\n";
    }

    return (new MailMessage)
      ->subject("[ОУС] Оповещение")
      ->greeting("Здравствуйте, $notifiable->call_name!")
      ->line('В чате появились новые сообщения:')
      ->line(new HtmlString(nl2br($html)))
      ->action('Посмотреть', url('/'));
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
