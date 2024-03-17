export async function GET(req: Request) {
    // const data = await HTTPHelper.get(`${USER_API}/health`)
    return new Response('User UI is up and running')
}