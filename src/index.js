export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 尝试从绑定的 ASSETS 中获取文件
    // 注意：这里使用的是 env.ASSETS，与 wrangler.jsonc 中的 binding 对应
    let response = await env.ASSETS.fetch(request);
    
    // 如果请求的是根路径 "/" 且没找到 index.html，尝试显式请求
    if (response.status === 404 && url.pathname === '/') {
      response = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
    }
    
    return response;
  }
};
