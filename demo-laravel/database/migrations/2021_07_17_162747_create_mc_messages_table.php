<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMcMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mc_messages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('room_id')->constrained('mc_rooms');
            $table->foreignId('participant_id')->constrained('mc_participants');
            $table->bigInteger('reply_id')->unsigned()->nullable();
            $table->string('content', 1024)->default("");
            $table->boolean('deleted')->default(false);
        });

        Schema::table('mc_messages', function (Blueprint $table) {
            $table->foreign('reply_id')->references('id')->on('mc_messages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mc_messages');
    }
}
