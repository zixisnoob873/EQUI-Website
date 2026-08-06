<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Console extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'console_type',
        'setup_description',
        'games_available',
        'image_url',
        'hourly_rate',
    ];

    protected $casts = [
        'games_available' => 'array',
        'hourly_rate' => 'integer',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
