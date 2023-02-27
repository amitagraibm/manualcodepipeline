import { handler } from "../lib/lambda-function/handler";

test('Lambda Created', async() => {
    const result = await handler("","");
    expect(result.statusCode).toEqual(200);
});
