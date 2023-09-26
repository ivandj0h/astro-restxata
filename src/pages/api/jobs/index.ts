import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

const client = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
});


// GET /api/jobs
export async function GET() {
    try {
        // const jobs = await client.db.job.getAll();
        const jobs = await client.db.job
            .select(["id", "location", "link", "company", "title", "type"])
            .getPaginated({
                pagination: {
                    size: 2,
                },
            });
        return new Response(JSON.stringify(jobs.records), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error: unknown) {
        return new Response(JSON.stringify({ message: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

// POST /api/jobs
export const POST: APIRoute = async ({ request }) => {
    const job = await request.json();
    const createdJob = await client.db.job.create(job);
    return new Response(JSON.stringify(createdJob), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    })
}