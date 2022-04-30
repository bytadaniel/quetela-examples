import { ChainContext, NodeManySameContext } from "@quetela/core/build/builtins/context";
import { ParseTokenDateTask } from "./parse_token_stocks/parse_token_date.task";
import { ResolveParseDatesTask } from "./parse_token_stocks/resolve_parse_dates.task";
import { WebhookTask } from "./parse_token_stocks/webhook.task";

export const initialContext = new ChainContext([ResolveParseDatesTask, WebhookTask])
export const tokenDateWebhookContext = new ChainContext([ParseTokenDateTask, WebhookTask])

export const tokenDateContext = new NodeManySameContext(ResolveParseDatesTask, ParseTokenDateTask)