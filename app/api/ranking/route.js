import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

// GET /api/ranking - Récupérer le classement complet
export async function GET() {
  try {
    // Lister toutes les clés "ranking:*"
    let cursor = 0;
    const allKeys = [];
    do {
      const result = await redis.scan(cursor, { match: 'ranking:*', count: 100 });
      cursor = result[0];
      allKeys.push(...result[1]);
    } while (cursor !== 0);

    // Récupérer toutes les entrées en parallèle
    const entries = [];
    if (allKeys.length > 0) {
      const values = await redis.mget(...allKeys);
      for (const value of values) {
        if (value) {
          // Upstash retourne déjà l'objet parsé si c'est du JSON
          const entry = typeof value === 'string' ? JSON.parse(value) : value;
          entries.push(entry);
        }
      }
    }

    // Trier : niveaux complétés desc, puis points desc
    entries.sort((a, b) => {
      if (b.completedLevels !== a.completedLevels) return b.completedLevels - a.completedLevels;
      return b.totalPoints - a.totalPoints;
    });

    return NextResponse.json({ ranking: entries }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      }
    });
  } catch (e) {
    return NextResponse.json({ ranking: [], error: e.message }, { status: 500 });
  }
}
