<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'address',
        'city',
        'phone',
        'maps_lat',
        'maps_lng',
        'maps_embed_url',
        'description',
        'image_url',
    ];

    protected $casts = [
        'maps_lat' => 'float',
        'maps_lng' => 'float',
    ];

    public function pricingTiers(): HasMany
    {
        return $this->hasMany(PricingTier::class)->orderBy('sort_order');
    }

    public function pcTiers(): HasMany
    {
        return $this->hasMany(PcTier::class)->orderBy('sort_order');
    }

    public function consoles(): HasMany
    {
        return $this->hasMany(Console::class);
    }

    public function contact(): HasOne
    {
        return $this->hasOne(Contact::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(GalleryImage::class)->orderBy('sort_order');
    }
}
