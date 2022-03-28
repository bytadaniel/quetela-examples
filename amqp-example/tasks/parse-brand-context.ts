import { ChainContext, NodeManySameContext } from "@quetela/core/build/builtins/context";
import { StartParseBrandsTask } from "./parse_brand/start_parse_brands";
import { ParseBrandLetterTask } from "./parse_brand/parse_brand_letter"
import { ParseBrandTask } from "./parse_brand/parse_brand";

export const initialContext = new ChainContext([StartParseBrandsTask])
export const brandLettersContext = new NodeManySameContext(StartParseBrandsTask, ParseBrandLetterTask)
export const brandBrandContext = new NodeManySameContext(ParseBrandLetterTask, ParseBrandTask)
