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

class PublicApiController extends Controller
{
    public function getBranches(): JsonResponse
    {
        return response()->json([
            'data' => Branch::all()
        ]);
    }

    public function getBranch(string $slug): JsonResponse
    {
        $branch = Branch::where('slug', $slug)->firstOrFail();
        return response()->json([
            'data' => $branch
        ]);
    }

    public function getPricing(Request $request): JsonResponse
    {
        $query = PricingTier::query();
        if ($request->has('branch')) {
            $branch = Branch::where('slug', $request->query('branch'))->first();
            if ($branch) {
                $query->where('branch_id', $branch->id);
            }
        }
        return response()->json([
            'data' => $query->orderBy('sort_order')->get()
        ]);
    }

    public function getPcTiers(Request $request): JsonResponse
    {
        $query = PcTier::query();
        if ($request->has('branch')) {
            $branch = Branch::where('slug', $request->query('branch'))->first();
            if ($branch) {
                $query->where('branch_id', $branch->id);
            }
        }
        return response()->json([
            'data' => $query->orderBy('sort_order')->get()
        ]);
    }

    public function getConsoles(Request $request): JsonResponse
    {
        $query = Console::query();
        if ($request->has('branch')) {
            $branch = Branch::where('slug', $request->query('branch'))->first();
            if ($branch) {
                $query->where('branch_id', $branch->id);
            }
        }
        return response()->json([
            'data' => $query->get()
        ]);
    }

    public function getContacts(Request $request): JsonResponse
    {
        $query = Contact::query();
        if ($request->has('branch')) {
            $branch = Branch::where('slug', $request->query('branch'))->first();
            if ($branch) {
                $query->where('branch_id', $branch->id);
            }
        }
        return response()->json([
            'data' => $query->first()
        ]);
    }

    public function getGallery(Request $request): JsonResponse
    {
        $query = GalleryImage::query();
        if ($request->has('branch')) {
            $branch = Branch::where('slug', $request->query('branch'))->first();
            if ($branch) {
                $query->where('branch_id', $branch->id);
            }
        }
        return response()->json([
            'data' => $query->orderBy('sort_order')->get()
        ]);
    }

    public function getPageContent(string $page): JsonResponse
    {
        $contents = PageContent::where('page_slug', $page)->get();
        return response()->json([
            'data' => $contents
        ]);
    }
}
