import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

// GET /api/progress?name=PRENOM - Charger la progression d'un joueur
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) {
      return NextResponse.json({ error: 'name required' }, { status: 400 });
    }
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const data = await redis.get(`progress:${safeName}`);
    return NextResponse.json({ data: data || null });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/progress - Sauvegarder la progression d'un joueur
export async function POST(request) {
  try {
    const body = await request.json();
    const { playerName, completedLevels, levelBestScores, unlockedBadges } = body;
    if (!playerName) {
      return NextResponse.json({ error: 'playerName required' }, { status: 400 });
    }
    const safeName = playerName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const data = {
      playerName,
      completedLevels: completedLevels || [],
      levelBestScores: levelBestScores || {},
      unlockedBadges: unlockedBadges || [],
      updatedAt: new Date().toISOString(),
    };
    await redis.set(`progress:${safeName}`, JSON.stringify(data));

    // Mettre à jour aussi le classement partagé en même temps
    const totalPoints = Object.values(data.levelBestScores).reduce((a, b) => a + b, 0);
    const rankingEntry = {
      name: playerName,
      completedLevels: data.completedLevels.length,
      totalPoints,
      perfectLevels: Object.values(data.levelBestScores).filter(s => s === 10).length,
      updatedAt: data.updatedAt,
    };
    await redis.set(`ranking:${safeName}`, JSON.stringify(rankingEntry));

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE /api/progress?name=PRENOM - Supprimer la progression
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    if (!name) {
      return NextResponse.json({ error: 'name required' }, { status: 400 });
    }
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    await redis.del(`progress:${safeName}`);
    await redis.del(`ranking:${safeName}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
