<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('address');
            $table->string('city')->default('Lahore');
            $table->string('phone');
            $table->decimal('maps_lat', 10, 6);
            $table->decimal('maps_lng', 10, 6);
            $table->text('maps_embed_url');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        Schema::create('pricing_tiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->string('tier_name');
            $table->enum('type', ['pc', 'console']);
            $table->integer('hourly_rate');
            $table->integer('daily_rate')->nullable();
            $table->json('features');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('pc_tiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->string('tier_name');
            $table->string('cpu');
            $table->string('gpu');
            $table->string('ram');
            $table->string('monitor');
            $table->json('peripherals');
            $table->string('image_url')->nullable();
            $table->text('description');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('consoles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->string('console_type')->default('PS5');
            $table->text('setup_description');
            $table->json('games_available');
            $table->string('image_url')->nullable();
            $table->integer('hourly_rate');
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->string('phone_primary');
            $table->string('phone_secondary')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp')->nullable();
            $table->json('operating_hours');
            $table->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->onDelete('cascade');
            $table->string('image_url');
            $table->string('thumbnail_url')->nullable();
            $table->string('caption');
            $table->string('category')->default('setup');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('page_slug');
            $table->string('section_key');
            $table->json('content');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
        Schema::dropIfExists('gallery_images');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('consoles');
        Schema::dropIfExists('pc_tiers');
        Schema::dropIfExists('pricing_tiers');
        Schema::dropIfExists('branches');
    }
};
