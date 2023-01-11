// Set your cloud storage bucket name as environment variable STORAGE_BUCKET
// If you want to limit CORS set the default 'Access-Control-Allow-Origin' header below.

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
    console.log(response)
    const { headers } = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return JSON.stringify(await response.json());
    }
    return response.text();
  }
  
  /**
   * @param {Request} request
   * @returns {Promise<Response>}
   */
  async function handleRequest(request, env) {
    const { pathname } = new URL(request.url);
    const init = {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        },
      };
      
  
    if (pathname.startsWith("/analytics/json/pageviews")) {
      console.log(env.STORAGE_BUCKET)
      const url = `https://storage.googleapis.com/${env.STORAGE_BUCKET}/json/pageviews/000000000000.json`
      const response = await fetch(url, init);
      const results = await gatherResponse(response);
      return new Response("["+results.trim().split(/\r?\n/)+"]", init);
    } else if (pathname.startsWith("/analytics/json/referrers")) {
      const url = `https://storage.googleapis.com/${env.STORAGE_BUCKET}/json/referrers/000000000000.json`
      const response = await fetch(url, init);
      const results = await gatherResponse(response);
      return new Response("["+results.trim().split(/\r?\n/)+"]", init);
    } else if (pathname.startsWith("/analytics/json/topposts")) {
      const url = `https://storage.googleapis.com/${env.STORAGE_BUCKET}/json/topposts/000000000000.json`
      const response = await fetch(url, init);
      const results = await gatherResponse(response);
      return new Response("["+results.trim().split(/\r?\n/)+"]", init);
    } else {
      return new Response("Not found", {status: 404})
    }
  }
  
  export default {
    async fetch(request, env) {
      return await handleRequest(request, env).catch(
        (err) => new Response(err.stack, { status: 500 })
      )
    }
  }