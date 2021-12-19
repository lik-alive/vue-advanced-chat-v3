<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMcParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mc_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained('mc_rooms');
            $table->foreignId('user_id')->constrained('users');
            $table->timestamp('visited_at')->default('1970-01-02 00:00:01');
            $table->timestamp('notified_at')->default('1970-01-02 00:00:01');
            $table->unique(['room_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mc_participants');
    }
}
