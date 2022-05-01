import { ChainContext, NodeManySameContext } from "@quetela/core/build/builtins/context";
import { FetchCatImageTask } from "./parse_cat_images/fetch-cat-image.task";
import { ProduceCatsTask } from "./parse_cat_images/produce-cats.task";
import { EmitContextTask } from "./parse_cat_images/emit-context.task";

export const producerCtx = new ChainContext([ProduceCatsTask])
export const fetcherCtx = new NodeManySameContext(ProduceCatsTask, FetchCatImageTask)
export const emitterCtx = new ChainContext([FetchCatImageTask, EmitContextTask])
