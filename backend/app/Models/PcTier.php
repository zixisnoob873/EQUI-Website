<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PcTier extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'tier_name',
        'cpu',
        'gpu',
        'ram',
        'monitor',
        'peripherals',
        'image_url',
        'description',
        'sort_order',
    ];

    protected $casts = [
        'peripherals' => 'array',
        'sort_order' => 'integer',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
