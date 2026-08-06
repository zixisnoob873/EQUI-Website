<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\PricingTier;
use App\Models\PcTier;
use App\Models\Console;
use App\Models\Contact;
use App\Models\GalleryImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@equigaming.pk'],
            [
                'name' => 'EQUI Admin',
                'password' => Hash::make('admin123'),
            ]
        );

        // Branch 1: Gulberg 3
        $g3 = Branch::updateOrCreate(
            ['slug' => 'gulberg-3'],
            [
                'name' => 'Gulberg 3',
                'address' => 'Main Boulevard, Gulberg III, Lahore, Punjab, Pakistan',
                'city' => 'Lahore',
                'phone' => '+92 321 1234567',
                'maps_lat' => 31.5204,
                'maps_lng' => 74.3587,
                'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2spk!4v1',
                'description' => 'Our flagship branch in the heart of Gulberg, featuring 30+ premium gaming stations, VIP lounges, and tournament-ready setups.',
                'image_url' => '/images/branch-gulberg.jpg',
            ]
        );

        // Branch 2: Airline Society
        $as = Branch::updateOrCreate(
            ['slug' => 'airline-society'],
            [
                'name' => 'Airline Society',
                'address' => 'Block B, Airline Housing Society, Lahore, Punjab, Pakistan',
                'city' => 'Lahore',
                'phone' => '+92 333 7654321',
                'maps_lat' => 31.5156,
                'maps_lng' => 74.3966,
                'maps_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.8!2d74.3966!3d31.5156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzU2LjIiTiA3NMKwMjMnNDcuOCJF!5e0!3m2!1sen!2spk!4v1',
                'description' => 'Our newest branch with cutting-edge hardware, spacious gaming zones, and a dedicated PS5 arena.',
                'image_url' => '/images/branch-airline.jpg',
            ]
        );

        // Pricing: Gulberg 3
        PricingTier::where('branch_id', $g3->id)->delete();
        PricingTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 1', 'type' => 'pc', 'hourly_rate' => 200, 'daily_rate' => 1500, 'features' => ['i5 13th Gen', 'RTX 3060', '144Hz Monitor', 'Basic Peripherals'], 'sort_order' => 1]);
        PricingTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 2', 'type' => 'pc', 'hourly_rate' => 350, 'daily_rate' => 2500, 'features' => ['i7 13th Gen', 'RTX 4070', '165Hz Monitor', 'Premium Peripherals', 'Ergonomic Chair'], 'sort_order' => 2]);
        PricingTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 3', 'type' => 'pc', 'hourly_rate' => 500, 'daily_rate' => 3500, 'features' => ['i9 14th Gen', 'RTX 4090', '240Hz Monitor', 'Pro Peripherals', 'VIP Zone', 'Complimentary Drinks'], 'sort_order' => 3]);
        PricingTier::create(['branch_id' => $g3->id, 'tier_name' => 'PS5', 'type' => 'console', 'hourly_rate' => 300, 'daily_rate' => 2000, 'features' => ['PS5 Digital/Disc', '4K Display', 'DualSense Controller', '200+ Games Library'], 'sort_order' => 4]);

        // Pricing: Airline Society
        PricingTier::where('branch_id', $as->id)->delete();
        PricingTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 1', 'type' => 'pc', 'hourly_rate' => 180, 'daily_rate' => 1400, 'features' => ['i5 12th Gen', 'RTX 3060', '144Hz Monitor', 'Standard Peripherals'], 'sort_order' => 1]);
        PricingTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 2', 'type' => 'pc', 'hourly_rate' => 320, 'daily_rate' => 2300, 'features' => ['i7 13th Gen', 'RTX 4060 Ti', '165Hz Monitor', 'Premium Peripherals', 'RGB Setup'], 'sort_order' => 2]);
        PricingTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 3', 'type' => 'pc', 'hourly_rate' => 480, 'daily_rate' => 3200, 'features' => ['i9 13th Gen', 'RTX 4080', '240Hz Monitor', 'Pro Peripherals', 'Private Booth', 'Snack Bar Access'], 'sort_order' => 3]);
        PricingTier::create(['branch_id' => $as->id, 'tier_name' => 'PS5', 'type' => 'console', 'hourly_rate' => 280, 'daily_rate' => 1800, 'features' => ['PS5 Disc Edition', '55" 4K TV', 'DualSense Controller', '150+ Games Library'], 'sort_order' => 4]);

        // PC Tiers: Gulberg 3
        PcTier::where('branch_id', $g3->id)->delete();
        PcTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 1', 'cpu' => 'Intel Core i5-13400F', 'gpu' => 'NVIDIA GeForce RTX 3060 12GB', 'ram' => '16GB DDR4 3200MHz', 'monitor' => '24" 144Hz IPS 1080p', 'peripherals' => ['Keyboard' => 'Mechanical RGB', 'Mouse' => 'Gaming Mouse 12000 DPI', 'Headset' => 'Stereo Gaming Headset', 'Chair' => 'Standard Gaming Chair'], 'description' => 'Perfect for casual gaming and esports titles. Smooth 144fps gameplay on competitive settings.', 'sort_order' => 1]);
        PcTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 2', 'cpu' => 'Intel Core i7-13700KF', 'gpu' => 'NVIDIA GeForce RTX 4070 12GB', 'ram' => '32GB DDR5 5200MHz', 'monitor' => '27" 165Hz IPS 1440p', 'peripherals' => ['Keyboard' => 'Mechanical Hot-Swap RGB', 'Mouse' => 'Wireless Gaming Mouse 25K DPI', 'Headset' => '7.1 Surround Sound Headset', 'Chair' => 'Ergonomic Premium Chair'], 'description' => 'High-performance setup for AAA gaming and content creation. Ultra settings at 1440p.', 'sort_order' => 2]);
        PcTier::create(['branch_id' => $g3->id, 'tier_name' => 'Tier 3', 'cpu' => 'Intel Core i9-14900KS', 'gpu' => 'NVIDIA GeForce RTX 4090 24GB', 'ram' => '64GB DDR5 6000MHz', 'monitor' => '27" 240Hz IPS 1440p', 'peripherals' => ['Keyboard' => 'Custom Mechanical 75%', 'Mouse' => 'Pro Wireless 30K DPI', 'Headset' => 'Studio-Grade Gaming Headset', 'Chair' => 'Secretlab Titan Evo', 'Extra' => 'Stream Deck, Webcam, Ring Light'], 'description' => 'The ultimate experience. No compromises. 4K gaming, streaming, and professional-grade hardware.', 'sort_order' => 3]);

        // PC Tiers: Airline Society
        PcTier::where('branch_id', $as->id)->delete();
        PcTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 1', 'cpu' => 'Intel Core i5-12400F', 'gpu' => 'NVIDIA GeForce RTX 3060 12GB', 'ram' => '16GB DDR4 3200MHz', 'monitor' => '24" 144Hz VA 1080p', 'peripherals' => ['Keyboard' => 'Membrane RGB Keyboard', 'Mouse' => 'Gaming Mouse 8000 DPI', 'Headset' => 'Over-Ear Gaming Headset', 'Chair' => 'Comfort Gaming Chair'], 'description' => 'Entry-level gaming that still packs a punch. Great for esports and online gaming.', 'sort_order' => 1]);
        PcTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 2', 'cpu' => 'Intel Core i7-13700F', 'gpu' => 'NVIDIA GeForce RTX 4060 Ti 8GB', 'ram' => '32GB DDR4 3600MHz', 'monitor' => '27" 165Hz IPS 1440p', 'peripherals' => ['Keyboard' => 'Mechanical RGB Full-Size', 'Mouse' => 'Wireless Gaming Mouse 20K DPI', 'Headset' => 'Virtual 7.1 Headset', 'Chair' => 'Premium Ergonomic Chair'], 'description' => 'Balanced performance for modern gaming. Handles any game at high settings smoothly.', 'sort_order' => 2]);
        PcTier::create(['branch_id' => $as->id, 'tier_name' => 'Tier 3', 'cpu' => 'Intel Core i9-13900KF', 'gpu' => 'NVIDIA GeForce RTX 4080 16GB', 'ram' => '64GB DDR5 5600MHz', 'monitor' => '27" 240Hz IPS 1440p', 'peripherals' => ['Keyboard' => 'Custom Mechanical TKL', 'Mouse' => 'Pro Wireless 25K DPI', 'Headset' => 'Planar Magnetic Gaming Headset', 'Chair' => 'Herman Miller x Logitech', 'Extra' => 'USB-C Hub, Monitor Light Bar'], 'description' => 'Top-tier hardware in a private booth setting. Built for serious gamers and streamers.', 'sort_order' => 3]);

        // Consoles
        Console::where('branch_id', $g3->id)->delete();
        Console::create([
            'branch_id' => $g3->id,
            'console_type' => 'PS5',
            'setup_description' => 'Immerse yourself in our PS5 zone featuring 4K displays, surround sound, and comfortable seating for up to 4 players. Perfect for FIFA tournaments, racing games, and co-op sessions.',
            'games_available' => ['FIFA 25', 'God of War Ragnarök', 'Spider-Man 2', 'Gran Turismo 7', 'Call of Duty MW3', 'GTA V', 'Tekken 8', 'Elden Ring', 'Hogwarts Legacy', 'Horizon Forbidden West', 'The Last of Us Part I', 'Mortal Kombat 1', 'NBA 2K25', 'FC 25', 'Fortnite'],
            'hourly_rate' => 300,
        ]);

        Console::where('branch_id', $as->id)->delete();
        Console::create([
            'branch_id' => $as->id,
            'console_type' => 'PS5',
            'setup_description' => 'Our Airline Society PS5 arena features a 55-inch 4K Smart TV setup with premium sound, DualSense controllers, and a cozy lounge vibe. Ideal for group gaming sessions.',
            'games_available' => ['FIFA 25', 'Spider-Man 2', 'God of War Ragnarök', 'Tekken 8', 'Call of Duty MW3', 'GTA V', 'Gran Turismo 7', 'Elden Ring', 'Mortal Kombat 1', 'NBA 2K25', 'Astro Bot', 'Ratchet & Clank'],
            'hourly_rate' => 280,
        ]);

        // Contacts
        Contact::where('branch_id', $g3->id)->delete();
        Contact::create([
            'branch_id' => $g3->id,
            'phone_primary' => '+92 321 1234567',
            'phone_secondary' => '+92 42 35761234',
            'email' => 'gulberg@equigaming.pk',
            'whatsapp' => '+923211234567',
            'operating_hours' => [
                'schedule' => '24 / 7 / 365 DAYS',
                'status' => 'OPEN 24 HOURS • 7 DAYS A WEEK • 365 DAYS A YEAR',
            ],
        ]);

        Contact::where('branch_id', $as->id)->delete();
        Contact::create([
            'branch_id' => $as->id,
            'phone_primary' => '+92 333 7654321',
            'phone_secondary' => '+92 42 35889876',
            'email' => 'airline@equigaming.pk',
            'whatsapp' => '+923337654321',
            'operating_hours' => [
                'schedule' => '24 / 7 / 365 DAYS',
                'status' => 'OPEN 24 HOURS • 7 DAYS A WEEK • 365 DAYS A YEAR',
            ],
        ]);

        // Gallery
        GalleryImage::where('branch_id', $g3->id)->delete();
        GalleryImage::create(['branch_id' => $g3->id, 'image_url' => 'https://placehold.co/800x600/1a1a2e/f5a623?text=Gaming+Zone+G3', 'thumbnail_url' => 'https://placehold.co/400x300/1a1a2e/f5a623?text=Gaming+Zone', 'caption' => 'Main gaming floor — Gulberg 3', 'category' => 'setup', 'sort_order' => 1, 'is_featured' => true]);
        GalleryImage::create(['branch_id' => $g3->id, 'image_url' => 'https://placehold.co/800x600/1a1a2e/ffd700?text=VIP+Lounge+G3', 'thumbnail_url' => 'https://placehold.co/400x300/1a1a2e/ffd700?text=VIP+Lounge', 'caption' => 'VIP lounge area', 'category' => 'setup', 'sort_order' => 2, 'is_featured' => false]);
        GalleryImage::create(['branch_id' => $g3->id, 'image_url' => 'https://placehold.co/800x600/0a0a0a/f5a623?text=Tournament+G3', 'thumbnail_url' => 'https://placehold.co/400x300/0a0a0a/f5a623?text=Tournament', 'caption' => 'Weekly tournament night', 'category' => 'events', 'sort_order' => 3, 'is_featured' => true]);

        GalleryImage::where('branch_id', $as->id)->delete();
        GalleryImage::create(['branch_id' => $as->id, 'image_url' => 'https://placehold.co/800x600/1a1a2e/f5a623?text=Gaming+Zone+AS', 'thumbnail_url' => 'https://placehold.co/400x300/1a1a2e/f5a623?text=Gaming+Zone', 'caption' => 'Open gaming floor — Airline Society', 'category' => 'setup', 'sort_order' => 1, 'is_featured' => true]);
        GalleryImage::create(['branch_id' => $as->id, 'image_url' => 'https://placehold.co/800x600/2d2d3f/ffd700?text=Lounge+AS', 'thumbnail_url' => 'https://placehold.co/400x300/2d2d3f/ffd700?text=Lounge', 'caption' => 'Relaxation lounge', 'category' => 'ambiance', 'sort_order' => 2, 'is_featured' => false]);
        GalleryImage::create(['branch_id' => $as->id, 'image_url' => 'https://placehold.co/800x600/0a0a0a/f5a623?text=LAN+Party+AS', 'thumbnail_url' => 'https://placehold.co/400x300/0a0a0a/f5a623?text=LAN+Party', 'caption' => 'LAN party event', 'category' => 'events', 'sort_order' => 3, 'is_featured' => true]);
    }
}
