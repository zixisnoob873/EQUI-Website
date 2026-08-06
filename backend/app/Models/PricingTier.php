<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PricingTier extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'tier_name',
        'type',
        'hourly_rate',
        'daily_rate',
        'features',
        'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
        'hourly_rate' => 'integer',
        'daily_rate' => 'integer',
        'sort_order' => 'integer',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
