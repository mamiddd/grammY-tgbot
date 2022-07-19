import { webhookCallback } from "https://deno.land/x/grammy@v1.9.1/mod.ts";
import { serve } from "https://deno.land/x/sift@0.5.0/mod.ts";
// 你可以将其修改为正确的方式来导入你的 `Bot` 对象。
import bot from "./bot.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve({
  ["/" + Deno.env.get("TOKEN")]: async (req) => {
    if (req.method == "POST") {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
    return new Response();
  },
  "/": () => {
    return new Response("Hello world!");
  },
});
