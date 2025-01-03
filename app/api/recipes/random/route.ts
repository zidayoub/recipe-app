import { NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=Beef`);

    if (!response.ok) {
      throw new Error('Failed to fetch random meals');
    }

    const data = await response.json();

    const mealsSchema = z.object({
      meals: z.array(
        z.object({
          idMeal: z.string(),
          strMeal: z.string(),
          strMealThumb: z.string().url(),
        })
      ),
    });

    const validatedData = mealsSchema.parse(data);

    return NextResponse.json({
      meals: validatedData.meals,
    });
  } catch (error) {
    console.error('Error fetching random meals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random meals' },
      { status: 500 }
    );
  }
}
