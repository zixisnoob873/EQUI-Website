<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\PricingTier;
use App\Models\PcTier;
use App\Models\Console;
use App\Models\Contact;
use App\Models\GalleryImage;
use App\Models\PageContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminApiController extends Controller
{
    // Branches
    public function updateBranch(Request $request, int $id): JsonResponse
    {
        $branch = Branch::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string',
            'maps_lat' => 'sometimes|numeric',
            'maps_lng' => 'sometimes|numeric',
            'maps_embed_url' => 'sometimes|string',
            'description' => 'sometimes|string',
        ]);
        $branch->update($validated);
        return response()->json(['data' => $branch, 'message' => 'Branch updated successfully']);
    }

    // Pricing Tiers
    public function savePricingTier(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'branch_id' => 'required|integer|exists:branches,id',
            'tier_name' => 'required|string',
            'type' => 'required|in:pc,console',
            'hourly_rate' => 'required|integer',
            'daily_rate' => 'nullable|integer',
            'features' => 'required|array',
        ]);

        if (isset($validated['id'])) {
            $tier = PricingTier::findOrFail($validated['id']);
            $tier->update($validated);
        } else {
            $tier = PricingTier::create($validated);
        }

        return response()->json(['data' => $tier, 'message' => 'Pricing saved']);
    }

    public function deletePricingTier(int $id): JsonResponse
    {
        PricingTier::findOrFail($id)->delete();
        return response()->json(['message' => 'Pricing tier deleted']);
    }

    // PC Tiers
    public function savePcTier(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'branch_id' => 'required|integer|exists:branches,id',
            'tier_name' => 'required|string',
            'cpu' => 'required|string',
            'gpu' => 'required|string',
            'ram' => 'required|string',
            'monitor' => 'required|string',
            'peripherals' => 'required|array',
            'description' => 'required|string',
        ]);

        if (isset($validated['id'])) {
            $tier = PcTier::findOrFail($validated['id']);
            $tier->update($validated);
        } else {
            $tier = PcTier::create($validated);
        }

        return response()->json(['data' => $tier, 'message' => 'PC tier saved']);
    }

    public function deletePcTier(int $id): JsonResponse
    {
        PcTier::findOrFail($id)->delete();
        return response()->json(['message' => 'PC tier deleted']);
    }

    // Consoles
    public function saveConsole(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'nullable|integer',
            'branch_id' => 'required|integer|exists:branches,id',
            'setup_description' => 'required|string',
            'games_available' => 'required|array',
            'hourly_rate' => 'required|integer',
        ]);

        if (isset($validated['id'])) {
            $console = Console::findOrFail($validated['id']);
            $console->update($validated);
        } else {
            $console = Console::create($validated);
        }

        return response()->json(['data' => $console, 'message' => 'Console saved']);
    }

    // Contacts
    public function updateContact(Request $request, int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $validated = $request->validate([
            'phone_primary' => 'sometimes|string',
            'phone_secondary' => 'nullable|string',
            'email' => 'nullable|email',
            'whatsapp' => 'nullable|string',
            'operating_hours' => 'sometimes|array',
        ]);
        $contact->update($validated);
        return response()->json(['data' => $contact, 'message' => 'Contact updated']);
    }

    // Gallery
    public function addGalleryImage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'branch_id' => 'required|integer|exists:branches,id',
            'image_url' => 'required|string',
            'caption' => 'required|string',
            'category' => 'required|string',
            'is_featured' => 'boolean',
        ]);
        $validated['thumbnail_url'] = $validated['image_url'];
        $image = GalleryImage::create($validated);
        return response()->json(['data' => $image, 'message' => 'Image added to gallery']);
    }

    public function deleteGalleryImage(int $id): JsonResponse
    {
        GalleryImage::findOrFail($id)->delete();
        return response()->json(['message' => 'Image deleted']);
    }
}
