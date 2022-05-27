<?php

namespace Database\Seeders;

use App\Actions\MessageCenter\MessageCenter;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::create([
            'name' => 'First',
            'email' => 'first@example.com',
            'password' => bcrypt('123'),
        ]);
        $user2 = User::create([
            'name' => 'Second',
            'email' => 'second@example.com',
            'password' => bcrypt('123'),
        ]);

        MessageCenter::CreateRoom('Conversation', [$user1, $user2]);

        // Multi messages
        $room = MessageCenter::CreateRoom('Readonly', [$user1, $user2], true);
        for ($i = 0; $i < 50; $i++) {
            $user = $i % 2 === 0 ? $user1 : $user2;
            MessageCenter::SendMessage($room, "Message$i", null, $user);
        }

        // Multi rooms
        for ($i = 0; $i < 50; $i++) {
            MessageCenter::CreateRoom("Room$i", [$user1, $user2]);
        }
    }
}
