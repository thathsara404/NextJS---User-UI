import { HTTPHelper } from '../../../../util/httpUtil';

const USER_API = process.env.USER_API;

export async function POST(req: Request) {
    try {
        // We can consume this immediate backend to check any business requirement before user login
        const data = await req.json();
        const authHeaders = req.headers.get('authorization');
        return await HTTPHelper.post(`${USER_API}/users/login`, {}, {...data});
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}